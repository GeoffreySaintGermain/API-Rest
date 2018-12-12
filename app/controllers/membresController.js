// utilisation du Model user pour faire le lien avec la BD
var membreModel = require('../models/membreModel');
// définition du controller sous la forme d'un objet JS avec des propriétés
var membresController = {

     // find
    liste : function(req,res){
        membreModel.find({},{_id : 0, nom : 1, prenom : 1}).sort({nom : 1})
        .then((Membre)=>res.json(Membre))
        .catch((err) => res.json(err.message));
    },

    //find a membre
    index : function(req,res){
        membreModel.find({id: req.params.id},{_id : 0, nom : 1, prenom : 1}).sort({nom : 1})
        .then((Membre)=>res.json({"status":true, "message" : Membre}))
        .catch((err) => res.json({"status":false,"message" : "membre inexistant"}))
    },

    //add a membre
    ajout : function(req,res){
        membreModel.findOne({id : req.body.id }, { _id :1 }).then((membre)=>{
            if(membre != null){
                res.json({"status":false,"message": "un membre avec cet id existe déjà" })
            }else { 
                let newMembre = new Membre( req.body);
    
                newMembre.validate().then(() => {
                    return newMembre.save();
                })
            }
        }).then(()=> res.json({"status":true, "message": "membre ajouté" }))
        .catch((err) => res.json({"status":false,"message": "membre validation failed : "+err.message }))
    },
    
    //modify a membre
    modification : function(req,res){
        membreModel.findOneAndUpdate( {id : req.body.id}, req.body,{new: true}, function(err,Membre) {
            if(Membre == null){
                res.json({"status": false, "message":"un membre avec cet id existe déjà"})
            }
        })
            .then( () => res.json({"status": true,  "membre": "membre modifié"}))
            .catch( (err) => res.json({"status": false,  "membre": "membre validation failed"+err.message}))
    },

    //remove a membre
    suppression : function(req,res){
        membreModel.findOne({id : req.params.id }, { _id :1 }).then((membre)=>{
            if(membre != null){
                res.json({"status":false,"message": "membre inexistant" })
            }else {
                membre.remove()
                    .then( () => res.json({"status": true,"membre":  "membre inexistant"}))
            }
        })  
    },

} 

// interface du module
module.exports = membresController;