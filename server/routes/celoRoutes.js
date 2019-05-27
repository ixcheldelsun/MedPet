const express = require("express");
const router = express.Router();


const Celo = require("../controllers/celoController");

//Traer todas las mascotas
router.get('/', Celo.findAll);

//Crear una mascota
router.post('/crear', Celo.create);

//Editar una mascota
router.put('/editar', Celo.update);

//Eliminar una mascota
router.delete('/eliminar/:id_celo', Celo.delete);


module.exports = router;
