const gradeService = require('../services/gradeService');

module.exports = {
    async getAllGrades(){
        return await gradeService.getAllGrades(); //Return all users
    },
    async getAverageGrade(req,res){
        let path = req.path.split('/');
        path.pop();
        let criteria = path.slice(-1).toString();
        console.log(criteria);
        switch (criteria) {
            case 'student':{
                return await gradeService.getAverageByStudent(req,res);
                break;
            }
            case 'faculty':{
                return await gradeService.getAverageByFaculty(req,res);
                break;
            }
            case 'group':{
                return await gradeService.getAverageByGroup(req,res);
                break;
            }
            case 'lesson':{
                return await gradeService.getAverageByLesson(req,res);
                break;
            }
            default:{
                return { "error": "Error in criteria case selection" };
                break;
            }
        }
    },
    async getGradesList(req, res){
        return await gradeService.getGradesList(req, res);  //Create a user
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