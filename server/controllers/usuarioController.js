const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

process.env.SECRET_KEY = 'secret';


//Registrar un usuario con contraseña encriptada
exports.create = (req, res) => {  
  let usuario = req.body;
  console.log(usuario);

  Usuario.findOne({ //Primero busca si el correo ingresado por el usuario existe
    where: {
      correo: req.body.correo
    }
  })
  .then(usr =>{
    if(!usr) { //si el usuario no existe, procede a encriptar la contraseña para registrarlo
      const hash = bcrypt.hashSync(usuario.contraseña, 10)
      usuario.contraseña = hash
      Usuario.create(usuario) //se crea el usuario y se le asigna el token con la duración del mismo
      .then(usr => {
        let token = jwt.sign(usr.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token}); //se manda el token que se va a usar en el client side
        console.log('Usuario creado')
      })
      .catch(err => console.log(err))
    }
    else { //si el usuario existe, no se registra
      res.json({ error: 'El usuario ya existe' })
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
}; 

//Iniciar sesión con token
exports.auth = (req,res) => {
  Usuario.findOne({ //busca el usuario
    where: {
      correo: req.body.correo
    }
  })
  .then(usr => {
    if(bcrypt.compareSync(req.body.contraseña, usr.contraseña)) { //desencripta la contraseña que está en la BD para hacer la comparación con la ingresada por el usuario
      let token = jwt.sign(usr.dataValues, process.env.SECRET_KEY, { //si son iguales se crea un token para el usuario que inició sesión
        expiresIn: 1440
      })
      res.json({token: token})
      console.log('El usuario ' + usr.correo + ' ha iniciado sesión')
    }
    else { //si la contraseña no coincide o el correo no existe
      res.send('El usuario no existe o la contraseña no coincide')
    }
  })
  .catch(err => {
    res.send('error:' + err)
  })
};

//Profile
exports.profile = (req,res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY) //convierte el token del usuario en el objeto que contiene todos su datos

  Usuario.findOne({
    where: {
      id_usuario: decoded.id_usuario
    }
  })
  .then(usr => {
    if(usr) {
      res.json(usr)
    }
    else {
      res.send('El usuario no existe')
    }
  })
  .catch(err => {
    res.send('error:' + err)
  })
};


/* 
//Traer todos los usuarios
exports.findAll = (req, res) => {
    Usuario.findAll().then(usuarios => {
        res.json(usuarios);
    });
};


//Crear un Usuario sin encriptación
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
*/

//Editar un usuario
exports.update = (req, res) => {
    let usuario = req.body;
    let id = req.params.id_usuario;
    Usuario.update(usuario, 
             { where: {id_usuario: id} }
             ).then(() => {
               res.status(200).json({msg:"se actualizó el usuario con correo = " + usuario.correo});
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

   