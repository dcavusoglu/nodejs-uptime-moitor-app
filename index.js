/*
* Primary file for the API
*
*
*/

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string
const server = http.createServer(function(req,res){

  // Get the url
  const parsedUrl = url.parse(req.url,true);

  // get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get query string as an object
  const queryStringObject = parsedUrl.query;


  // Get the HTTP method
  const method = req.method.toLowerCase();

  // Headers
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end',function () {
    buffer += decoder.end();

    // Choose the handler this request should go to. Not found, or found.
    const chosenHandeler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send the handler
    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };

    // Route the request to the handler specified in the router
    chosenHandeler(data, function(statusCode, payload){
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the string
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log('Returning this response: ', statusCode, payloadString);

    })

  });
});

server.listen(3000, function(){
  console.log('The server is listening on post 3000 now');
})

const handlers = {};

handlers.sample = function(data, callback){
  // Callback a HTTP status code and a payload
  callback(406,{'name': 'sample_handler'});
};

handlers.notFound = function (data, callback) {
  callback(404);
};

const router = {
  'sample' : handlers.sample
};

console.log('Hello Duygu!');
