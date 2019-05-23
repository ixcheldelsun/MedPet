const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');

//Traer todos los usuarios
exports.findAll = (req, res) => {
    Usuario.findAll().then(usuarios => {
        res.json(usuarios);
    });
};

//Crear un Usuario
exports.create = (req, res) => {  
    let usuario = req.body;
    console.log(usuario);
    Usuario.create(usuario).then(usuario => {    
      res.json(usuario);
    })
    .catch(err => {
      console.log(err)
    });
  };

//Conseguir usuario por correo
exports.findByEmail = (req, res) => {
  let correo = req.body.correo;
  Usuario.findAll({
      where: {
          correo: correo
      }
  })
  .then(usuario =>{
      res.json(usuario.id_usuario)[0];
  })
  .catch(err => console.log(err));
};  

//Autenticar usuario sin servicio
exports.auth = (req, res) => {
  let correo = req.body.correo;
  let pass = req.body.contraseña;
  Usuario.findAll({
      where: {
          correo: correo,
          contraseña: pass
      }
  })
  .then(usuario =>{
    if(usuario.length > 0){
      console.log("Encontrado");
      res.json(usuario);
    }
    else{
      console.log("No encontrado");
      res.status(404).json({ text: "No existe el usuario" });
    } 
  })
  .catch(err => {
    console.log(err)
  });
};  

// Editar un usuario
exports.update = (req, res) => {
    let usuario = req.body;
    let id = req.params.id_usuario;
    Usuario.update(usuario, 
             { where: {id_usuario: id} }
             ).then(() => {
               res.status(200).json({msg:"se actualizó el usuario con correo = " + usuario.correo});
             });  
  };

//Traer las mascotas de un usuario
exports.mascotas = (req, res) => {
    let id = req.params.id_usuario
    Usuario.findOne({
        where: {
          id_usuario: id
        }
      })
      .then(usuario => Mascota.findAll({
        where: {
          id_usuario: usuario.id_usuario
        }
      }))
      .then(mascotas => {
          res.json(mascotas);
      })
      .catch(error => console.log(error));
};

   