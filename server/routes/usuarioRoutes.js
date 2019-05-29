const express = require("express");
const router = express.Router();


const Usuario = require("../controllers/usuarioController");

//Registrar un usuario
router.post('/crear', Usuario.create);

//Login de un usuario
router.post('/auth', Usuario.auth);

//Falta verificar uso
router.get('/profile', Usuario.profile);

//Buscar un usuario por correo
router.post('/buscar', Usuario.findByEmail);

//Editar un usuario
router.put('/editar/:id_usuario', Usuario.update);

//Buscar mascotas de un usuario
router.get('/:id_usuario/mascotas', Usuario.mascotas);

module.exports = router;
