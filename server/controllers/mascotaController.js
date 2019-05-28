const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');
const Vacuna = require('../models/Vacuna');
const Celo = require('../models/Celo');

//Traer todos las mascotas
exports.findAll = (req, res) => {
  Mascota.findAll().then(mascotas => {
    res.json(mascotas);
  });
};

//Crear una Mascota
exports.create = (req, res) => {
  let mascota = req.body;
  Mascota.create(mascota).then(mascota => {
    res.json(mascota);
  });
};


//Editar una mascota
exports.update = (req, res) => {
  let mascota = req.body;
  let id = req.body.id;
  Mascota.update(mascota, {
    where: {
      id_mascota: id
    }
  }).then(() => {
    res.status(200).json({
      msg: "se actualizó la mascota = " + mascota.nombre
    });
  });
};


//Eliminr una mascota
exports.delete = (req, res) => {
  const id = req.params.id_mascota;
  Mascota.destroy({
    where: {
      id_mascota: id
    }
  }).then(() => {
    res.status(200).json({
      msg: 'Se eliminó la mascota con el id = ' + mascota.id_mascota
    });
  });
};

exports.vacunas = (req, res) => {
  let id = req.params.id_mascota
  Mascota.findOne({
      where: {
        id_mascota: id
      }
    })
    .then(mascota => Vacuna.findAll({
      where: {
        id_mascota: mascota.id_mascota
      }
    }))
    .then(vacunas => {
        res.json(vacunas);
    })
    .catch(error => console.log(error));
};

exports.celos = (req, res) => {
  let id = req.params.id_mascota
  Mascota.findOne({
      where: {
        id_mascota: id
      }
    })
    .then(mascota => Celo.findAll({
      where: {
        id_mascota: mascota.id_mascota
      }
    }))
    .then(celos => {
        res.json(celos);
    })
    .catch(error => console.log(error));
};
