const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Mascota = require("../models/Mascota");

router.get('/', (req, res) => 
  Mascota.findAll()
    .then(mascotas => {
      console.log(mascotas);
      res.sendStatus(200);
    })
    .catch(err => console.log(err)));


module.exports = router;
