// utilisation de MongoDB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// le schéma d'un document de la collection sportifs
let membreSchema = mongoose.Schema({
    id : {type : Number, required : true, unique : true},
    annee : {type : Number, required : true},
    nom : {type : String , required : true, uppercase : true},
    prenom : {type : String , required : true, uppercase : true},
    categorie : {type : String, enumValues: ['junior', 'senior']},
    sexe : {type : String, enumValues: ['Hommes', 'Femmes']},
    cnu : {type : String},
    discipline : {type : String},
    corps : {type : String},
    academie : [{ 
        code_academie : { type : Number, required : true}, 
        nom :   {type : String, required : true }
            }],
    region : [{
        code_region : {  type : Number}, 
        nom :    {type :  String}
        }] ,
    etablissement : {type : String},
});


// le model MongoDB faisant le lien avec la collection
var MembreModel = mongoose.model("membre", membreSchema);
// interface du module
module.exports = MembreModel;