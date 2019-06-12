const express = require("express");
const router = express.Router();


const Desparasitacion = require("../controllers/desparasitacionController");

//Traer todas los períodos de Desparasitacion
router.get('/', Desparasitacion.findAll);

//Crear un período de Desparasitacion
router.post('/crear', Desparasitacion.create);

//Editar un períodos de Desparasitacion
router.put('/editar', Desparasitacion.update);

//Eliminar un período de Desparasitacion
router.delete('/eliminar/:desparasitacion_id', Desparasitacion.delete);


module.exports = router;
