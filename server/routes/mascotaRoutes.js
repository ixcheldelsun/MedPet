const express = require("express");
const router = express.Router();

const Mascota = require("../controllers/mascotaController");

//Traer todas las mascotas
router.get('/', Mascota.findAll);

//Crear una mascota
router.post('/crear', Mascota.create);

//Editar una mascota
router.put('/editar', Mascota.update);

//Eliminar una mascota
router.delete('/eliminar/:id_mascota', Mascota.delete);


module.exports = router;






   