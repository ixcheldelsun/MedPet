const express = require("express");
const router = express.Router();


const Celo = require("../controllers/celoController");

//Traer todas los períodos de celo
router.get('/', Celo.findAll);

//Crear un período de celo
router.post('/crear', Celo.create);

//Editar un períodos de celo
router.put('/editar', Celo.update);

//Eliminar un período de celo
router.delete('/eliminar/:id_celo', Celo.delete);


module.exports = router;
