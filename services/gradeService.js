"use strict"
const Users = require("../sequelize/models").Users;
const Profiles = require("../sequelize/models").Profiles;
const Grades = require('../sequelize/models/').Grades;

module.exports = {
    async createGrade(req, res) {
        let token = req.headers['authorization'];
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        let actor = JSON.parse(jsonPayload)['user']['username'];
        let teacher = await Profiles.findOne({where: {id:req.payload.teacher_id},raw:true});
        let toCreate = await Users.findOne({where: {id:teacher.user_id},raw:true});
        let student = await Profiles.findOne({where: {id:req.payload.student_id},raw:true});
        if(actor == toCreate.username && student.faculty == teacher.faculty && student.university == teacher.university && teacher.group == null){
            let grade;
            grade = await Grades.create({
                id: req.payload.id,
                student_id: req.payload.student_id,
                teacher_id: req.payload.teacher_id,
                grade: req.payload.grade,
                lesson: req.payload.lesson
            });
            return res.response(grade).code(200);
        }else{
            return { "error": "Teacher and student faculty and university must be the same" };
        }

    },

    async getAllGrades(req, res) {
        let result = await Grades.findAll()
        return result;
    },
    async deleteGrade(req, res) {
        return await Grades.destroy({
            where: {
                id: req.params.id
            }
        }).then((affectedRows) => {
            console.log(affectedRows + "rows affected");
            return Grade.findAll();
        })

    },
    async updateGrade(req, res) {
        /*let token = req.headers['authorization'];
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        let actor = JSON.parse(jsonPayload)['user']['username'];
        let profile = await Profiles.findOne({where: {id:req.params.id},raw:true});
        let toEdit = await Users.findOne({where: {id:profile.user_id},raw:true});
        if(actor === toEdit.username) {
            req.payload = JSON.parse(JSON.stringify(req.payload)); //converting payload to json
            return await Profiles.update(
                {
                    user_id: req.payload.user_id,
                    faculty: req.payload.faculty,
                    university: req.payload.university,
                    group: req.payload.group,
                },
                {
                    where:
                        { id: req.params.id }
                }
            ).then((affectedRows) => {
                console.log(affectedRows + " rows affected");
                return Profiles.findAll();
            });
        }else{
            return { "error": "You can not edit other users profiles." };
        }

*/
    },
};