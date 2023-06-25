const { User } = require("../models/user");

const findUserByEmail = async(email) => {
    return User.findOne({email:email})
}

module.exports = {
    findUserByEmail
}