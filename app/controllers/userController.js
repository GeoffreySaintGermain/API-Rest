// utilisation du Model user pour faire le lien avec la BD
var userModel = require('../models/userModel');

//utilisation des modules pour le token
var jwt = require('jsonwebtoken');
var jws = require('jws');

// définition du controller sous la forme d'un objet JS avec des propriétés
var userController = {

    // find
    liste : function(req,res){
        userModel.find({},{_id : 0, name : 1, mail : 1}).sort({nom : 1})
        .then((user)=>res.json(user))
        .catch((err) => res.json(err.message));
    },

    //add a user
    ajout : function(req,res){
        userModel.findOne({mail : req.body.mail }, { _id :1 }).then((user)=>{
            if(user != null){
                res.json({"status" : false,"message" : "Ce mail est déjà utilisé" });
            }else{ 
                var newUser = new userModel(req.body);
    
                newUser.validate().then(() => {
                    return newUser.save();
                });
            }
        }).then(()=> res.json({"status" : true, "message" : "user ajouté" }))
        .catch((err) => res.json({"status" : false,"message" : "user validation failed : "+err.message }));
    },

    //demande jeton
    demandejeton : function(req,res){
        if(req.body.name == null || req.body.password == null){
            res.json({"status" : false,"message" : "name et/ou password absents"});
        }else{
            userModel.findOne(
                {name:req.body.name,password:req.body.password},
                { _id :0,name:1,password:1,admin:1 }
            ).then((user)=>{ 
                if(user == null){
                    res.json({"status" : false,"message" : "name et/ou password incorrects"})
                }else{
                    var cle = "maclesecrete"
                    var payload = {username: user.name,password : user.password,admin : user.admin}
                    var token = jwt.sign(payload ,cle,{ expiresIn: 3600});                                                               

                    res.json({"status":true,"token": token})
                }             
            });
        }
    },

    //verifier qu'un jeton est valide
    verifjeton : function(res,token){
        var correct = false;

        jwt.verify(token, "maclesecrete",function(err){  
            if(token == null){
                correct= false;
            }else{
                if(!err) 
                    correct= true;  
            }            
        });
        return correct;
    },

    //verifier qu'un jeton est valide
    verifJWT : function(req, res, next){
        if(req.body.token && userController.verifjeton(res,req.body.token))
            next();          
        else
            res.status(403).send({ status:false, "message":"no token provided"});   
    },
    
    //verifier que l'utilisateur est un administrateur
    verifAdmin : function(req,res,next){        
        let tokenDecode = jws.decode(req.body.token);
    
        if(tokenDecode.payload.admin)
            next();
        else
            res.json({"message":"L'utilisateur n'a pas les droits requis"});       
    }

} 

// interface du module
module.exports = userController;
