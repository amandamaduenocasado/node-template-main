const express = require('express');
const usersRoutes = express.Router();
const usersController = require('../controllers/users.controller');

/* leer */
usersRoutes.get('/', usersController.getAllUsers);

/* encontrar usuario por id */
usersRoutes.get('/:id', usersController.getUserById);

/* crear */
usersRoutes.post('/', usersController.createNewUser);

/* actualizar los datos */
usersRoutes.patch('/:id', usersController.updateUser);

/* borrar */
usersRoutes.delete('/:id', usersController.deleteUser);

/* exportación de las rutas */
module.exports = usersRoutes;
