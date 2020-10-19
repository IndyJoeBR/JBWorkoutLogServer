     //1                   //2
  module.exports = function(request, response, next) {

      //3                    //4
    response.header('access-control-allow-origin', '*');
    response.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');    //5
    response.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');  //6
  
    next();   //7
  };
  
  /*         from Headers Into (Middleware Module)
  1 - module.exports allows us to export this module to be used in another file.
  2 - req refers to the request from the client, specifically focusing on any headers present on the request object. res refers to the response and will be used to present which types of headers are allowed by the server. next will be covered more in a moment.
  3 - We call res.header so that the server will respond with what kind of headers are allowed in the request.
  4 - We use the specific access-control-allow-origin header to tell the server the specific origin locations that are allowed to communicate with the server. The * is known as a wild-card. It means that everything is allowed. In this setting, it's saying that requests originating from any location are allowed to communicate with the database.
  5 - These are the HTTP methods that the server will allow to be used. Postman allows you to send 15 different HTTP requests; our server will only accept these four.
  6 - These are specific header types that the server will accept from the client. Remember from our earlier testing we sent a Content-Type header to the server. Without this header, our request would not have worked. You can find more information on this and other headers on MDN, and we will talk about them more in the future as well.
  7 - next sends the request along to its next destination. This could be the API endpoint or another middleware function designed to do something else. Let's talk a little bit more about next.
  */