const express = require("express");
const router = express.Router();


const Usuario = require("../controllers/usuarioController");

//Registrar un usuario
router.post('/crear', Usuario.create);

//Login de un usuario
router.post('/auth', Usuario.auth);

//Recuperar contraseña
router.post('/olvide_pass', Usuario.olvide_pass);

//Reinicia contraseña
router.post('/reinicia_pass', Usuario.reinicia_pass);

//Envía mensaje al usuario que solicita el cambio de contraseña
router.post('/envia_correo', Usuario.enviaMensaje);

//Traer perfil de usuario
router.get('/profile', Usuario.profile);

//Buscar un usuario por correo
router.post('/buscar', Usuario.buscaCorreo);

//Buscar mascotas de un usuario
router.get('/:id_usuario/mascotas', Usuario.mascotas);

module.exports = router;
