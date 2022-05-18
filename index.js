/*
* Primary file for the API
*
*
*/

// Dependencies
const http = require('http');
const url = require('url');

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

  // A response
  res.end("Hello Node.js\n");


  // Log the request path
  console.log('Request path : '+trimmedPath+' Request method: '+method+' Query parametres: ', queryStringObject);
});

server.listen(3000, function(){
  console.log('The server is listening on post 3000 now');
})

console.log('Hello Duygu!');
