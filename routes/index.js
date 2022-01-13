
const loginController = require('../controllers/loginController')
const userController = require('../controllers/userController')
const profileController = require('../controllers/profileController')
const gradeController = require('../controllers/gradeController')
const userService = require('../services/userService')
const Joi = require('joi');

//All the routes of the api will be defined here 
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: loginController.greetings,     //Specifying what controller to use
        config: {                               //This will be used to display attributes in swagger ui
            description: 'Welcome Route',
            tags: ['api']
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: loginController.authenticate,
        config: {
            description: 'Authenticate User',
            notes: 'Get jwt by providing email(jd@gmail.com) & password(test@123)',
            tags: ['api'],
            auth: false,        //No auth for this end point
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    email: Joi.string(),
                    password: Joi.string()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/api/users',
        handler: userController.getAllUsers,
        config: {
            tags: ['api','user'],
            auth: 'jwt',            //Specifiying the auth scheme , this is specified in server.js file
            description: 'Get All Users',
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()    //Getting auth token in headers
                }).options({ allowUnknown: true }),
            }
        }
    },
    {
        method: 'POST',
        path: '/api/user',
        handler: userController.createUser,
        config: {
            description: 'Create User',
            notes: 'Create user by sending in the data along the token in headers',
            tags: ['api','user'],
            auth: 'jwt',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                payload: Joi.object({
                    username: Joi.string(),
                    email: Joi.string(),
                    password: Joi.string(),
                    phone: Joi.number(),
                    dob: Joi.date(),
                    sex: Joi.string(),
                })
            }
        }
    },
    /*{
        method: 'DELETE',
        path: '/api/user/{id}',
        handler: userController.deleteUser,
        config: {
            description: 'Delete User',
            notes: 'Delete user by sending in the user id along the token in headers',
            tags: ['api'],
            auth: 'jwt',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                params: Joi.object({
                    id: Joi.string(),
                })
            }
        }
    },*/
    {
        method: 'PUT',
        path: '/api/user/{id}',
        handler: userController.updateUser,
        config: {
            tags: ['api','user'],
            description: 'Update user',
            notes: ['Update user in our database'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                params: {
                    id: Joi.string()
                        .required()
                        .description('ID of the user (UUID)')
                },
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                    phone: Joi.string().required(),
                    dob: Joi.date(),
                    sex: Joi.string()
                }
            }
        },
    },
    {
        method: 'GET',
        path: '/api/profile',
        handler: profileController.getAllProfiles,
        config: {
            tags: ['api','profile'],
            auth: 'jwt',            //Specifiying the auth scheme , this is specified in server.js file
            description: 'Get All Profiles',
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()    //Getting auth token in headers
                }).options({ allowUnknown: true }),
            }
        }
    },
    {
        method: 'POST',
        path: '/api/profile',
        handler: profileController.createProfile,
        config: {
            description: 'Create Profile',
            notes: 'Create profile by sending in the data along the token in headers',
            tags: ['api','profile'],
            auth: 'jwt',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                payload: Joi.object({
                    user_id: Joi.string().required(),
                    faculty: Joi.string().required(),
                    university: Joi.string().required(),
                    group: Joi.string(),
                })
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/profile/{id}',
        handler: profileController.updateProfile,
        config: {
            tags: ['api','profile'],
            description: 'Update profile',
            notes: ['Update profile in our database'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                params: {
                    id: Joi.string()
                        .required()
                        .description('ID of the profile')
                },
                payload: {
                    faculty: Joi.string().required(),
                    university: Joi.string().required(),
                    group: Joi.string(),
                }
            }
        },
    },
    {
        method: 'POST',
        path: '/api/grade',
        handler: gradeController.createGrade,
        config: {
            description: 'Create Grade',
            notes: 'Create grade by sending in the data along the token in headers',
            tags: ['api','grade'],
            auth: 'jwt',
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                payload: Joi.object({
                    id: Joi.number().required(),
                    student_id: Joi.number().required(),
                    teacher_id: Joi.number().required(),
                    grade: Joi.number().required(),
                    lesson: Joi.string().required(),
                })
            }
        }
    },
]