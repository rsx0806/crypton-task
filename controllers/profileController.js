const profileService = require('../services/profileService');

module.exports = {
    async getAllProfiles(){
        return await profileService.getAllProfiles(); //Return all users
    },
    async createProfile(req, res){
        return await profileService.createProfile(req, res);  //Create a user
    },
    async deleteProfile(req, res){
        return await profileService.deleteProfile(req, res);  //Delete a user
    },
    async updateProfile(req, res){
        return await profileService.updateProfile(req, res);  //Update a user
    }
}