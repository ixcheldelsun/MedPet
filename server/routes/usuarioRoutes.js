const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Usuario = require("../models/Usuario");

router.get('/', (req, res) => 
  Usuario.findAll()
    .then(usuarios => {
      console.log(usuarios);
      res.sendStatus(200);
    })
    .catch(err => console.log(err)));



module.exports = router;
