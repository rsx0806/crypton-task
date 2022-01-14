const { Sequelize } = require('sequelize')
'use strict'
module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define('Profiles', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false, unique: true },
    faculty: { type: DataTypes.STRING, allowNull: false },
    university: { type: DataTypes.STRING, allowNull: false },
    group: DataTypes.STRING
  }, {
    sequelize, modelname: 'Profiles'
  })
  Profiles.associate = (models) => {
    Profiles.belongsTo(models.Users, { foreignKey: { name: 'id' } })
    Profiles.hasMany(models.Grades, { foreignKey: { name: 'student_id' } })
    Profiles.hasMany(models.Grades, { foreignKey: { name: 'teacher_id' } })
  }

  return Profiles
  /* Profile.init({
     id: DataTypes.INTEGER,
     user_id: DataTypes.INTEGER,
     faculty: DataTypes.STRING,
     university: DataTypes.STRING,
     group: DataTypes.STRING
   }, {
     sequelize,
     modelName: 'Profile',
   });
   return Profile; */
}
