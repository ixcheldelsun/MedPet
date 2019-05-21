const express = require("express");
const router = express.Router();

const Mascota = require("../controllers/mascotaController");

//Traer todos los usuarios
router.get('/', Mascota.findAll);

//Crear un usuario
router.get('/agregar', Mascota.create);

//Editar un usuario
router.get('/editar', Mascota.update);


module.exports = router;






   