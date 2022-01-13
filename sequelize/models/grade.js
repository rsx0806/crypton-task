'use strict';
module.exports = (sequelize, DataTypes) => {
  let Grades = sequelize.define('Grades', {
    id: {type:DataTypes.INTEGER, allowNull: false, primaryKey:true},
    student_id: {type:DataTypes.INTEGER, allowNull: false},
    teacher_id: {type:DataTypes.INTEGER, allowNull: false},
    grade: {type:DataTypes.INTEGER, allowNull: false},
    lesson: {type:DataTypes.STRING, allowNull: false}
  },{
    sequelize, modelname: 'Grades'
  });
  Grades.associate = (models) => {
    Grades.belongsTo(models.Profiles, {foreignKey:{name: "id"}});
  }
  return Grades;
};