const Desparasitacion = require('../models/Desparasitacion');
const Mascota = require('../models/Mascota');

exports.findAll = (req, res) => {
  Desparasitacion.findAll().then(desparasitaciones => {
    res.json(desparasitaciones);
  });
};

//Crear un desparasitacion
exports.create = (req, res) => {
  let desparasitacion = req.body;
  Desparasitacion.create(desparasitacion).then(desparasitacion => {
    res.json(desparasitacion);
  });
};


//Editar un desparasitacion
exports.update = (req, res) => {
  let desparasitacion = req.body;
  let id = req.body.desparasitacion_id;
  Desparasitacion.update(desparasitacion, {
    where: {
      desparasitacion_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: "se actualizó el periodo de desparasitacion = " + desparasitacion.desparasitacion_id
    });
  });
};


//Eliminar un desparasitacion
exports.delete = (req, res) => {
  const id = req.params.desparasitacion_id;
  Desparasitacion.destroy({
    where: {
      desparasitacion_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: 'Se eliminó el periodo de desparasitacion con el id = ' + desparasitacion.desparasitacion_id

    });
  });
};
