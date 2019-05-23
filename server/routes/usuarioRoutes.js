const express = require("express");
const router = express.Router();

const Usuario = require("../controllers/usuarioController");

//Traer todos los usuarios
router.get('/', Usuario.findAll);

//Crear un usuario
router.post('/crear', Usuario.create);

//Buscar un usuario por correo
router.post('/buscar', Usuario.findByEmail);

//"Autenticar" un usuario 
router.post('/auth', Usuario.auth);

//Editar un usuario
router.put('/editar/:id_usuario', Usuario.update);

//Buscar mascotas de un usuario
router.get('/:id_usuario/mascotas', Usuario.mascotas);

module.exports = router;