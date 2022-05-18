/*
* Primary file for the API
*
*/

// Dependencies

const http = require('http');
const url = require('url');


// The server should respond to all requests with a string

const server = http.createServer(function(req,res) {

  // Get the URL and parse it
  const parsedURL = url.parse(req.url,true);

  // Get the path
  const path = parsedURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Send the response
  res.end('Hello Node\n');

  // Log the request path
  console.log('Request received on this path: '+trimmedPath);
});

// Start the server, and have it listen on port 3000

server.listen(3000, function(){
  console.log("The server is listening on port 3000 now");
});
