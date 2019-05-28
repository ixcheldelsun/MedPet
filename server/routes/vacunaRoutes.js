const express = require("express");
const router = express.Router();

const Vacuna = require("../controllers/vacunaController");

//Traer todas las vacunas
router.get('/', Vacuna.findAll);

//Crear una vacuna
router.post('/crear', Vacuna.create);

//Editar una vacuna
router.put('/editar', Vacuna.update);

//Eliminar una vacuna
router.delete('/eliminar/:vacuna_id', Vacuna.delete);


module.exports = router;
