module.exports = function(sequelize, DataTypes) {
  return sequelize.define('theworkoutlog', {
    description: DataTypes.STRING,
    definition: DataTypes.STRING,
    result: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  });
};

/*
The owner_id is a number - a foreign key - that is provided by the middleware and points to a user on the users table.
*/