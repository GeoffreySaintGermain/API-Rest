// utilisation d'un routeur Express
var express = require('express');
var routerUsers = express.Router();
// utilisation du controlleur de gestion des sportifs
var userController = require('../controllers/userController');


// route pour la liste des sportifs
// utilisant la méthode liste du controlleur
//routerUsers.get('/', userController.liste);
routerUsers.post('/', userController.ajout);

//jeton
routerUsers.get('/demandejeton', userController.demandejeton);

//admin
routerUsers.get('/',userController.verifJWT,userController.verifAdmin, userController.liste);
routerUsers.get('/verifAdmin', userController.verifAdmin);

// interface du module
module.exports = routerUsers;
