/*
* Primary file for the API
*
*
*/

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const _data = require('./lib/data');


//TESTING
_data.create('test', 'newFile', {'hey' : 'yey'}, function(err){
  console.log('Error: ', err);
});


// Instantiating the http server
const httpServer = http.createServer(function(req,res){
  unifiedServer(req,res);
});

// Starting the http server
httpServer.listen(config.httpPort, function(){
  console.log("The server is listening on post "+config.httpPort+" now");
})



// Instantiating the https server
const httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
}

const httpsServer = https.createServer(httpsServerOptions, function(req,res){
  unifiedServer(req,res);
});


// Starting the https server
httpsServer.listen(config.httpsPort, function(){
  console.log("The server is listening on post "+config.httpsPort+" now");
});



// All the server logic http and https
const unifiedServer = function(req, res) {

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
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log('Returning this response: ', statusCode, payloadString);

    });

  });
}

// Define handlers
const handlers = {};

handlers.ping = function(data, callback){
  // Callback a HTTP status code and a payload
  callback(200);
};

handlers.notFound = function (data, callback) {
  callback(404);
};

const router = {
  'ping' : handlers.ping
};

console.log('Hello Duygu!');
