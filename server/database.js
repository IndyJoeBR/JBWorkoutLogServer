const Sequelize = require('sequelize');     // Import Sequelize package       
const sequelizeInstance = new Sequelize(    // create an instance of Sequelize
  'jbworkoutlog',                           // name of database
  'postgres',                               // name of database super-user
  'dbpassword', {                           // database password
  host: 'localhost',                        // host points to the local port for Sequelize; it is 5432.
  dialect: 'postgres'                       // SQL dialect used
});


//  This should not be here because is may not finish before sequelize (it might not work) - it will be move elsewhere to a startup procedure
    //9       //10         //1
sequelizeInstance.authenticate().then(
  function() {  //12
    console.log('Connected to workoutlog postgres database');
  },
  function(err) {   //13
    console.log(err);
  }
);

/*
Concept	Analysis
9	Use the sequelize variable to access methods.
10	Call the authenticate() method.
11	authenticate() returns a promise. Use .then().
12	Fire a function that shows if we're connected.
13	Fire an error if there are any errors.

Further setup can be found at:
      https://sequelize.org/master/manual/getting-started.html#test-the-connection
*/


//*******************************************************************
module.exports = sequelizeInstance;