let jwt = require('jsonwebtoken');
let sequelizeInstance = require('../database');              // ****  no longer needed, previously require for import statement (#4)
//var User = require('../models/user');   
let UserInstance = sequelizeInstance.import('../models/user');                             //****************    The older way
//let User = require('../models/user')( sequelize, require('sequelize') );   //****************    The old way

module.exports = function(request, response, next) {
  if (request.method == 'OPTIONS') {
      next()
  } else {
    let sessionToken = request.headers.authorization;  // gets token from 'authorization' in the header
    console.log(sessionToken)                          // and displays it in the console   ************   DELETE   ************
    if (!sessionToken) return response.status(403).send({ auth: false, message: '[server] No token provided. '});  // IF NOT-token (no token) is the case, send error
    else {                                             // otherwise, go on to decode the token
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {    // verify decodes token with secret; if good, decoded is given the payload, else undefined
        if(decoded){
          UserInstance.findOne({where: { id: decoded.id}}).then(user => {     // if 'decoded' has a value, findOne looks for a matching id in the users table and passes it
            request.user = user;      // the callback sets the user value for the request
            next();                   // and moves the request on to the next stage
          },
          function(){       // if no matching id is found, an error message is thrown.
            response.status(401).send({error: '[server] Not authorized'});
        });
        } else {            // if no value for decoded, an error message is thrown
          response.status(400).send({error: '[server] Not authorized'});
        }
      });
    }
  }
};


/*
There's a lot here, so take it slow through this explanation. Additional information on the verify method can be found here (Links to an external site.).


7 - The callback sets the user value for the request as the id value passed to it then sends the request on to its next destination. This property will be necessary later in adding to the database.
8 - If no matching id is found, an error message is thrown.
9 - If no value for decoded, an error message is thrown.
*/