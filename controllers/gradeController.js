const gradeService = require('../services/gradeService');

module.exports = {
    async getAllGrades(){
        return await gradeService.getAllGrades(); //Return all users
    },
    async createGrade(req, res){
        return await gradeService.createGrade(req, res);  //Create a user
    },
    async deleteGrade(req, res){
        return await gradeService.deleteGrade(req, res);  //Delete a user
    },
    async updateGrade(req, res){
        return await gradeService.updateGrade(req, res);  //Update a user
    }
}