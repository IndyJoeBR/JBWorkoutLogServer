let express = require('express');
let router = express.Router();
let sequelizeInstance = require('../database');                   // sequelize variable imports db file
let UserInstance = sequelizeInstance.import('../models/user');    // creates an instance of the user model
let LogModel = sequelizeInstance.import('../models/log');         // creates an instance of the log model



// **********   Create Workout Log   **********
// Allows user to create a workout log with descriptions, definitions, results and own properties
  // PROCESS:
  // Retrieve data from body of the request
  // Use that data to craft a log entry
  // Save the log entry to the db
  // Respond with the status of the action

router.post('/', function(request, response) {

  //  Pull new log entry data from log and user
  let owner_id = request.user.id; // user id set in validate-session
  let description = request.body.log.description;
  let definition = request.body.log.definition;
  let result = request.body.log.result;

  LogModel            // add new row to table
    .create({//key :  proptery (from body of request)
      description: description,
      definition: definition,
      result: result,
      owner_id: owner_id
    })
    .then(            // when complete
      function createSuccess(newLogEntry) {   // if it was successful
        response.json({                            // return a JSON object
          newLogEntry: newLogEntry            // of the entry
        });
      },
      function createError(err) {             // if not successful
        response.send(500, err.message);           // return an error message
      }
    );

});


// **********   Get All Logs For Individual User   **********
// Gets all logs for an individual user
// PROCESS:

router.get('/', function(request, response) {


  let owner_id = request.user.id;

  LogModel
    .findAll({
        where: { owner_id: owner_id }
    })
    .then(
      function findAllSuccess(allLogsFromUser) {
        response.json(allLogsFromUser);
      },
      function findAllError(err) {
        response.send(500, err.message);
      }
    );

});






// **********   Gets One Log For An Individual User   **********
// Gets individual logs by id for an individual user
// PROCESS:

router.get('/:id', function(request, response) {
  let data = request.params.id;   // takes ':id' from URL
  let owner_id = request.user.id; // user id set in validate-session

  LogModel
    .findOne({
      where: { id: data, owner_id: owner_id }
    }).then(
      function findOneSuccess(theLogFromUser) {
        response.json(theLogFromUser);
      },
      function findOneError(err) {
        response.send(500, err.message);
      }
    );
});


// **********   Update Individual Log   **********
// All user to update an individual log
// PROCESS:

router.put('/:id', function(request, response) {
  let data = request.params.id;   // takes ':id' from URL
  let description = request.body.log.description; // data to replace
  let definition = request.body.log.definition;   // the current data
  let result = request.body.log.result;           // already in entry

  LogModel
    .update({     // Sequelize method to update entry, takes 2 arguments
      description: description,
      definition: definition,       // 1) object(s) holding edited value
      result: result
    },
    {where: {id: data}}             // 2) where to place the new data
    ).then(
      function updateSuccess(updatedLog) {    // Callback function if good
        response.json({
          updatedLog: updatedLog              // displays updated log
        });
      },
      function updateError(err){              // Callback function if err
        response.send(500, err.message);
      }
    )
});


// **********   Delete Individual Log   **********
// All user to delete an individual log
// PROCESS:

router.delete('/:id', function(request, response) {
  let data = request.params.id;   // takes ':id' from URL
  let owner_id = request.user.id; // user id set in validate-session

  LogModel
    .destroy({    // Sequelize method to remove an item, 
      where: { id: data, owner_id: owner_id }    //6
    }).then(
      function deleteLogSuccess(data){    //7
        response.send('[server] log entry removed');
      },
      function deleteLogError(err){   //8
        response.send(500, err.message);
      }
    );

});





// **********   Route Controller Tests   **********
// Test for the router functionality
router.get('/', function(request, response) {
  response.send('[server] logControllers are accessible.')
});

// Test for database connection
router.post('/testDB', function(request, response) {
  response.send("[server] POST successful, database accessible.");
});



//*******************************************************************
module.exports = router;
