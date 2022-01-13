//Seeders are used to populate the db, built in feature of sequelize
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Users', [
      {
        id: '6a236e65-a11a-42d6-8407-2ac4cc7002c8',
        username: 'John Doe',
        email:'jd@gmail.com',
        password:'$2b$10$Jwkk0BOgVp6tjkaoN6sXOuWkM0J9bj6xAJwWapv92RvN4OGO8POb2', //hash of test@123
        phone:'123456789',
        dob:'2021-05-08',
        sex:'male',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
