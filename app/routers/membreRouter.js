// utilisation d'un routeur Express
var express = require('express');
var routerMembres = express.Router();

// utilisation du controlleur de gestion des membres
var membresController = require('../controllers/membresController');
// utilisation du controlleur de gestion des users
var userController = require('../controllers/userController');


// route pour la liste des sportifs
// utilisant la méthode liste du controlleur
routerMembres.get('/', membresController.liste);
routerMembres.get('/:id', membresController.index);
routerMembres.post('/', membresController.ajout);
routerMembres.put('/', membresController.modification);
routerMembres.delete('/:id', membresController.suppression);

//Vérification du token utilisé dans user
routerMembres.delete(userController.verifJWT);

// interface du module
module.exports = routerMembres;
