module.exports = function (sequelize, DataTypes) {
             //1     //2    //
  return sequelize.define('user', {
      username: DataTypes.STRING,         //4
      passwordhash: DataTypes.STRING      //4
    });
};

/*
1  -  A function with a Sequelize object that calls the .define() method.
2  -  The first parameter creates/updates the 'users' table in Postgres.
3  -  This first parameter creates/updates the 'users' table in the db
        ('user' will be pluralized)
4  -  The username is entered by a user.  The passwordhash is provided
         by bcrypt using the user's entered password. 
*/


