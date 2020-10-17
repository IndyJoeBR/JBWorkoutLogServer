var express = require('express');             // framework to allow routing/processing http request
var expressApplication = express();           // create instance of the Express package

expressApplication.listen(3000, function() {  // starts server listening for connections on localhost:3000
  console.log('[server] listening on port 3000');  // logs that the application is functioning
});                                                // app now available at http://localhost:3000/