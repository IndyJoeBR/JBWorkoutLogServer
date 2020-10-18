let express = require('express');
let router = express.Router();
let sequelizeInstance = require('../database');




// **********   Create Workout Log   **********
// Allows user to create a workout log with descriptions, definitions, results and own properties
// PROCESS:

router.post('/', function(request, response) {
  response.send('[server] TEST - Workout Log has been created - TEST')
});


// **********   Get All Logs For Individual User   **********
// Gets all logs for an individual user
// PROCESS:

router.get('/', function(request, response) {
  response.send('[server] TEST - has returned all logs for user - TEST')
});


// **********   Gets One Log For An Individual User   **********
// Gets individual logs by id for an individual user
// PROCESS:

router.get('/:id', function(request, response) {
  response.send('[server] TEST - has returned one log for the user - TEST')
});


// **********   Update Individual Log   **********
// All user to update an individual log
// PROCESS:

router.put('/:id', function(request, response) {
  response.send('[server] TEST - has updated a log - TEST')
});


// **********   Delete Individual Log   **********
// All user to delete an individual log
// PROCESS:

router.delete('/:id', function(request, response) {
  response.send('[server] TEST - has deleted a log - TEST')
});





// **********   Route Controller Tests   **********
// Test for the router functionality
router.get('/', function(request, response) {
  response.send('[server] routeControllers are accessible.')
});

// Test for database connection
router.post('/testDB', function(request, response) {
  response.send("[server] POST successful, database accessible.");
});



//*******************************************************************
module.exports = router;
