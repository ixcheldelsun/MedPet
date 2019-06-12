const Consulta = require('../models/Consulta');
const Mascota = require('../models/Mascota');

exports.findAll = (req, res) => {
  Consulta.findAll().then(consultas => {
    res.json(consultas);
  });
};

//Crear un consulta
exports.create = (req, res) => {
  let consulta = req.body;
  Consulta.create(consulta).then(consulta => {
    res.json(consulta);
  });
};


//Editar un consulta
exports.update = (req, res) => {
  let consulta = req.body;
  let id = req.body.consulta_id;
  Consulta.update(consulta, {
    where: {
      consulta_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: "se actualizó el periodo de consulta = " + consulta.consulta_id
    });
  });
};


//Eliminar un consulta
exports.delete = (req, res) => {
  const id = req.params.consulta_id;
  Consulta.destroy({
    where: {
      consulta_id: id
    }
  }).then(() => {
    res.status(200).json({
      msg: 'Se eliminó el periodo de consulta con el id = ' + consulta.consulta_id

    });
  });
};
