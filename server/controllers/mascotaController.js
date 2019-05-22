const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');

//Traer todos las mascotas
exports.findAll = (req, res) => {
    Usuario.findAll().then(mascotas => {
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
    Mascota.update(mascota, 
             { where: {id_mascota: id} }
             ).then(() => {
               res.status(200).json({msg:"se actualizó la mascota = " + mascota.nombre});
             });  
  };
  

//Eliminr una mascota
exports.delete = (req, res) => {
    const id = req.params.id_mascota;
    Customer.destroy({
        where: { id_mascota: id }
    }).then(() => {
        res.status(200).json({msg:'Se eliminó la mascota con el id = ' + id});
    });
};

   