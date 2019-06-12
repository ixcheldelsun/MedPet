const Observacion = require('../models/Observacion');
const Mascota = require('../models/Mascota');

exports.findAll = (req, res) => {
  Observacion.findAll().then(observaciones => {
    res.json(observaciones);
  });
};

//Crear un observacion
exports.create = (req, res) => {
  let observacion = req.body;
  Observacion.create(observacion).then(observacion => {
    res.json(observacion);
  });
};


//Editar un observacion
exports.update = (req, res) => {
  let observacion = req.body;
  let id = req.body.observacion_id;
  Observacion.update(observacion, {
    where: {
      observacion_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: "se actualizó el periodo de observacion = " + observacion.observacion_id
    });
  });
};


//Eliminar un observacion
exports.delete = (req, res) => {
  const id = req.params.observacion_id;
  Observacion.destroy({
    where: {
      observacion_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: 'Se eliminó el periodo de observacion con el id = ' + observacion.observacion_id

    });
  });
};
