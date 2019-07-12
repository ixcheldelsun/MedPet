const express = require("express");
const router = express.Router();


const Observacion = require("../controllers/observacionController");
//Traer todas los períodos de Observacion
router.get('/', Observacion.findAll);

//Crear un período de Observacion
router.post('/crear', Observacion.create);

//Editar un períodos de Observacion
router.put('/editar', Observacion.update);

//Eliminar un período de Observacion
router.delete('/eliminar/:observacion_id', Observacion.delete);


module.exports = router;
