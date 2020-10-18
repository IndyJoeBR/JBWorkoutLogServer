let express = require('express');
let router = express.Router();
let sequelizeInstance = require('../database');                   // sequelize variable imports db file
let UserInstance = sequelizeInstance.import('../models/user');    // creates an instance of the user model
const bcrypt = require('bcryptjs');                               // added for password encryption
var jwt = require('jsonwebtoken');                                // added for user authentication


// **********   Register User   **********
// PROCESS:
  // Retrieve data from body of the request
  // Use that data to craft a user
  // Save the user to the db
  // Respond with the status of the action

router.post('/register', function(request, response) {

  let username = request.body.user.username;
  let password = request.body.user.password;
  
  UserInstance.create({
    username: username,
    passwordhash: bcrypt.hashSync(password, 10)
  
  }).then(
    function createSuccess(user) {

    let usersToken = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
  
      response.json({                                       // JSONifies the reponse
        user: user,                                         // display the response in the browser window
        message: '[server] new user has been registered',   // displays a message in the browser window
        sessionToken: usersToken
      });
    },
    function createError(err) {
      response.send(500, err.message);
    }
  );
});

 



// **********   User Login   **********
  // PROCESS:
  // Retrieve the data from the body of the requrest
  // verify the user exists, and the data marches what is in the record
  // If so: respond with a token
  // If not: respond with a denial

  router.post('/login', function(request, response) {
    response.send('[server] TEST - user has been logged in - TEST')
  });
  







// Test for the user route functionality
router.get('/', function(request, response) {
  response.send('[server] userControllers are accessible.')
})

//*******************************************************************
module.exports = router;
//*******************************************************************

/*







const { Router } = require('express');    // imports Router object
const bcrypt = require('bcrypt');

const { user } = require('../models/index'); // imports the user model through the 'key' in the export statement on index.js which it gets from userModel.js

const UserControllerRouter = Router();    // creates a Router object

// CRUD code for users  
// C - Create a user by registration  (url): "/register"
// R - Read user profile              (url): "/profile", "/login"
// U - Update user information        (url): "/update"
// D - Delete the user                (url): "/terminate"

// Kinds of requests
// POST   - create/insert new data into the db
// GET    - retrieve data from the db
// PUT    - modify existing data (requires a pre-existing bucket)
// DELETE - remove data from the db

UserControllerRouter.post('/register', (request, response) => {
  // PROCESS:
  // Retrieve data from body of the request
  // Use that data to craft a user
  // Save the user to the db
  // Respond with the status of the action

  let { email, password } = request.body;      // Retrieve data from body of the request

  let newUser = user.build({                  // Use that data to craft a user
    email: email,                             //  note: 'build' does not 'save', 'create' does both
    password: bcrypt.hashSync(password, 12)
  });

  newUser.save()                              // Save the user to the db
    .then(() => {
        console.log('[server]: new user was created');
        response.json({
          message: 'User successfully created!'
        });
    })
    .catch(error => {
      console.log(error);
      response.status(500).json({
        message: 'Failed to create user',
      });
    });

  response.json({
    message: "Hello from the user Register route!"
  })

});


UserControllerRouter.post('/login', (request, response) => {
  // PROCESS:
  // Retrieve the data from the body of the requrest
  // verify the user exists, and the data marches what is in the record
  // If so: respond with a token
  // If not: respond with a denial

/*
  response.json({
    message: "Hello from the user Login route!"
  })
*/

//});