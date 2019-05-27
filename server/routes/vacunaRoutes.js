const express = require("express");
const router = express.Router();

const Vacuna = require("../controllers/vacunaController");

//Traer todas las mascotas
router.get('/', Vacuna.findAll);

//Crear una mascota
router.post('/crear', Vacuna.create);

//Editar una mascota
router.put('/editar', Vacuna.update);

//Eliminar una mascota
router.delete('/eliminar/:vacuna_id', Vacuna.delete);


module.exports = router;
