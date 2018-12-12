// utilisation de MongoDB
var mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    mail : {type : String , required : true, unique : true},
    admin : {type : Boolean , default : false},
});


// le model MongoDB faisant le lien avec la collection
var userModel = mongoose.model("user", userSchema);
// interface du module
module.exports = userModel;