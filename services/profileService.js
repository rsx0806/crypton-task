"use strict"
const {Users} = require("../sequelize/models");
const Profiles = require('../sequelize/models/').Profiles;

module.exports = {
    async createProfile(req, res) {
        let profile;
        profile = await Profiles.create({
            user_id: req.payload.user_id,
            faculty: req.payload.faculty,
            university: req.payload.university,
            group: req.payload.group
        });
        return res.response(profile).code(200);
    },

    async getAllProfiles(req, res) {
        let result = await Profiles.findAll()
        return result;
    },
    async deleteProfile(req, res) {
        return await Profiles.destroy({
            where: {
                id: req.params.id
            }
        }).then((affectedRows) => {
            console.log(affectedRows + "rows affected");
            return Profiles.findAll();
        })

    },
    async updateProfile(req, res) {
        let token = req.headers['authorization'];
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


    },
};