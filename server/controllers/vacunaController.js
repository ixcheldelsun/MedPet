const Vacuna = require('../models/Vacuna');
const Mascota = require('../models/Mascota');

//Traer todos las mascotas
exports.findAll = (req, res) => {
  Vacuna.findAll().then(vacunas => {
    res.json(vacunas);
  });
};

//Crear una Mascota
exports.create = (req, res) => {
  let vacuna = req.body;
  Vacuna.create(vacuna).then(vacuna => {
    res.json(vacuna);
  });
};


//Editar una mascota
exports.update = (req, res) => {
  let vacuna = req.body;
  let id = req.body.id;
  Vacuna.update(vacuna, {
    where: {
      vacuna_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: "se actualizó la vacuna = " + vacuna.vacuna_id
    });
  });
};


//Eliminr una mascota
exports.delete = (req, res) => {
  const id = req.params.vacuna_id;
  Vacuna.destroy({
    where: {
      vacuna_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: 'Se eliminó la vacuna con el id = ' + vacuna.vacuna_id
    });
  });
};
