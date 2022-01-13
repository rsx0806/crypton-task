"use strict"
const Users = require('../sequelize/models/').Users;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
    async createUser(req, res) {
        let user;
        let hash = await bcrypt.hash(req.payload.password, SALT_ROUNDS);
        user = await Users.create({
            username: req.payload.username,
            email: req.payload.email,
            password: hash,
            phone: req.payload.phone,
            dob: req.payload.dob,
            sex: req.payload.sex
        });
        console.log("user auto-generated ID:", user.id);
        return res.response(user).code(200);
    },

    async getAllUsers(req, res) {
        let result = await Users.findAll()
        return result;
    },
    async deleteUser(req, res) {
        return await Users.destroy({
            where: {
                id: req.params.id
            }
        }).then((affectedRows) => {
            console.log(affectedRows + "rows affected");
            return Users.findAll();

        })

    },
    async updateUser(req, res) {
        let token = req.headers['authorization'];
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        let actor = JSON.parse(jsonPayload)['user']['username'];
        let toEdit = await Users.findOne({where: {id:req.params.id},raw:true});
        if(actor === toEdit.username){
            req.payload = JSON.parse(JSON.stringify(req.payload));
            let hash = await bcrypt.hash(req.payload.password, SALT_ROUNDS);
            return await Users.update(
                {
                    username: req.payload.username,
                    password: hash,
                    phone: req.payload.phone,
                    dob: req.payload.dob,
                    sex: req.payload.sex
                },
                {
                    where:
                        { id: req.params.id }
                }
            ).then((affectedRows) => {
                console.log(affectedRows + " rows affected");
                return Users.findAll();
            });
        }else{
            return { "error": "You can not edit other users." };
        }
    },
    async findUserByEmail(req, res) {
        let result = await Users.findAll({
            where: {
                email: req.payload.email
            }
        })
        return result;
    }
};