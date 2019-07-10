const Vacuna = require('../models/Vacuna');
const Mascota = require('../models/Mascota');

//Traer todos las vacunas
exports.findAll = (req, res) => {
  Vacuna.findAll().then(vacunas => {
    res.json(vacunas);
  });
};

//Crear una vacuna
exports.create = (req, res) => {
  let vacuna = req.body;
  Vacuna.create(vacuna).then(vacuna => {
    res.json(vacuna);
  });
};


//Editar una vacuna
exports.update = (req, res) => {
  let vacuna = req.body;
  let id = req.body.id_vacuna;
  Vacuna.update(vacuna, {
    where: {
      id_vacuna: id
    }
  }).then(() => {
    res.status(200).json({
      msg: "se actualizó la vacuna = " + vacuna.id_vacuna
    });
  });
};


//Eliminar una vacuna
exports.delete = (req, res) => {
  let id = req.params.id_vacuna;
  Vacuna.destroy({
    where: {
      id_vacuna: id
    }
  }).then(() => {
    res.status(200).json({
      msg: 'Se eliminó la vacuna con el id = ' + vacuna.id_vacuna
    });
  }).catch(err => {
    res.send('error:' + err)
  });
};
