const express = require("express");
const router = express.Router();

const Usuario = require("../controllers/usuarioController");

//Traer todos los usuarios
router.get('/', Usuario.findAll);

//Crear un usuario
router.get('/agregar', Usuario.create);

//Buscar un usuario por correo
router.get('/:correo', Usuario.findByEmail);

//Editar un usuario
router.get('/editar', Usuario.update);

//Buscar mascotas de un usuario
router.get('/:id/mascotas', Usuario.mascotas);

module.exports = router;
