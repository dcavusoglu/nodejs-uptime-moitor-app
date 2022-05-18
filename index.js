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

    // A response
    res.end("Hello Node.js\n");


    // Log the request path
    console.log('This is the payload: ', buffer);
  });
});

server.listen(3000, function(){
  console.log('The server is listening on post 3000 now');
})

console.log('Hello Duygu!');
