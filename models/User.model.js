// User model here

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    username: {type:String, unique: true},
    password: {type:String, required: true}
})


const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;