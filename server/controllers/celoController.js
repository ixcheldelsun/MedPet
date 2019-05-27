const Celo = require('../models/Celo');
const Mascota = require('../models/Mascota');

//Traer todos las mascotas
exports.findAll = (req, res) => {
  Celo.findAll().then(celos => {
    res.json(celos);
  });
};

//Crear una Mascota
exports.create = (req, res) => {
  let celo = req.body;
  Celo.create(celo).then(celo => {
    res.json(celo);
  });
};


//Editar una mascota
exports.update = (req, res) => {
  let celo = req.body;
  let id = req.body.id;
  Celo.update(celo, {
    where: {
      id_celo: id
    }
  }).then(() => {
    res.status(200).json({
      msg: "se actualizó el periodo de celo = " + celo.id_celo
    });
  });
};


//Eliminr una mascota
exports.delete = (req, res) => {
  const id = req.params.id_celo;
  Celo.destroy({
    where: {
      id_celo: id
    }
  }).then(() => {
    res.status(200).json({
      msg: 'Se eliminó el periodo de celo con el id = ' + celo.id_celo
    });
  });
};
