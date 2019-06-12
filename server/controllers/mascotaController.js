const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');
const Vacuna = require('../models/Vacuna');
const Celo = require('../models/Celo');
const Desparasitacion = require('../models/Desparasitacion.js');
const Consulta = require('../models/Consulta');
const Observacion = require('../models/Observacion');

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
      },
      order: [
        ['fecha_i', 'ASC'],
      ]
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
      },
      order: [
        ['fecha_i', 'ASC'],
      ]
    }))
    .then(celos => {
      res.json(celos);
    })
    .catch(error => console.log(error));
};

exports.desparasitaciones = (req, res) => {
  let id = req.params.id_mascota
  Mascota.findOne({
      where: {
        id_mascota: id
      }
    })
    .then(mascota => Desparasitacion.findAll({
      where: {
        id_mascota: mascota.id_mascota
      },
      order: [
        ['fecha', 'ASC'],
      ]
    }))
    .then(desparacitaciones => {
      res.json(desparacitaciones);
    })
    .catch(error => console.log(error));
}

exports.consultas = (req, res) => {
  let id = req.params.id_mascota
  Mascota.findOne({
      where: {
        id_mascota: id
      }
    })
    .then(mascota => Consulta.findAll({
      where: {
        id_mascota: mascota.id_mascota
      },
      order: [
        ['fecha', 'ASC'],
      ]
    }))
    .then(consultas => {
      res.json(consultas);
    })
    .catch(error => console.log(error));
}

exports.observaciones = (req, res) => {
  let id = req.params.id_mascota
  Mascota.findOne({
      where: {
        id_mascota: id
      }
    })
    .then(mascota => Observacion.findAll({
      where: {
        id_mascota: mascota.id_mascota
      },
      order: [
        ['fecha', 'ASC'],
      ]
    }))
    .then(observaciones => {
      res.json(observaciones);
    })
    .catch(error => console.log(error));
}
