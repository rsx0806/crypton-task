const { Sequelize } = require('sequelize')
'use strict'
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.UUID, defaultValue: Sequelize.UUIDV4, allowNull: false, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    dob: DataTypes.DATE,
    sex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users'
  })
  Users.associate = (models) => {
    Users.hasOne(models.Profiles, { foreignKey: { name: 'user_id' } })
  }
  return Users
/*
  User.init({
    id: {type:DataTypes.UUID, primaryKey:true},
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    dob: DataTypes.DATE,
    sex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User; */
}
