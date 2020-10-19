require('dotenv').config();                   // Top of file, makes items in an .env package available to application

let express = require('express');             // framework to allow routing/processing http request
let expressApplication = express();           // create instance of the Express package
let logRoutes = require('./controllers/logControllers');
let userRoutes = require('./controllers/userControllers');
let sequelizeInstance = require('./database');  // sequelize variable imports db file


// **********   Middleware   **********
sequelizeInstance.sync(); // ensures that we sync all defined models to the DB

//  Tells the application that json should be used as we process the request
expressApplication.use(express.json());               // MUST STAY ABOVE any routes;
expressApplication.use(require('./middleware/headers'));   // activates headers, file read sequentially so it must come before the routes


//  AUTHENTICATION SEQUENCE - get working after all else
sequelizeInstance.authenticate().then(
  function() {  // Fire a function that shows if we're connected
    console.log('Connected to postgres database: jbworkoutlog');
  },
  function(err) {   //Fire an error if there are any errors
    console.log(err);
  }
);


// **********   Exposed Routes   **********
// Added for Postman Route Controller functionality testing
expressApplication.use('/testlogRoutes', logRoutes);
expressApplication.use('/testUserRoutes', userRoutes);
expressApplication.use('/user', userRoutes);



// **********   Protected Routes   **********
// All routes below require a token to access
expressApplication.use(require('./middleware/validate-session'));  // import validate-session middleware, which will check if the incoming request has a token
expressApplication.use('/log', logRoutes);




expressApplication.listen(3000, function() {  // starts server listening for connections on localhost:3000
  console.log('[server] listening on port 3000');  // logs that the application is functioning
});                                                // app now available at http://localhost:3000/