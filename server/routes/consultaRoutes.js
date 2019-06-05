const express = require("express");
const router = express.Router();


const Consulta = require("../controllers/consultaController");

//Traer todas los períodos de Consulta
router.get('/', Consulta.findAll);

//Crear un período de Consulta
router.post('/crear', Consulta.create);

//Editar un períodos de Consulta
router.put('/editar', Consulta.update);

//Eliminar un período de Consulta
router.delete('/eliminar/:consulta_id', Consulta.delete);


module.exports = router;
