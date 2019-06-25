const Usuario = require('../models/Usuario');
const Mascota = require('../models/Mascota');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//const webpush = require('web-push');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

process.env.MAILER_EMAIL_ID = 'medpet.help@gmail.com';
process.env.MAILER_PASSWORD = 'Petmed123';

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

//Olvidé mi contraseña
exports.olvide_pass = (req,res) => {
  Usuario.findOne({
    where: {
      correo:req.body.correo
    }
  })
  .then( usr => {
    if(usr){
      let token = crypto.randomBytes(20).toString('hex');
      Usuario.update(
        { reinicia_contraseña: token, reinicia_contraseña_expira: Date.now() + 86400000 },
        { where: { id_usuario: usr.id_usuario } }
      )
      .then( update => {
        res.json(token)
      })
      .catch(err => {
        res.send('error:' + err)
      })
    }
    else {
      res.json({ error: 'El usuario no existe' })
    }
  })
  .catch(err => {
    res.send('error:' + err)
  })
};

//Reinicio de la contraseña 
exports.reinicia_pass = (req, res) => {
  if(req.body.tokenValido == false){
    Usuario.findOne({
      where: {
        reinicia_contraseña: req.body.token,
        reinicia_contraseña_expira: {
          [Op.gt]: Date.now()
        }
      }  
    })
    .then( user => {
      if(user){
        res.json('Token confirmado')
      } 
      else{
        res.status(400).send()
      }
    })
    .catch(err => {
      res.send(err)
    });
  }
  else if(req.body.tokenValido){
    Usuario.update({ 
      contraseña: bcrypt.hashSync(req.body.nuevoPass, 10), 
      reinicia_contraseña: null, 
      reinicia_contraseña_expira: null 
    }, { where: { id_usuario: req.body.id } })
    .then(upd =>{
      res.json('El usuario cambió su contraseña')
    })
    .catch (err => {
      res.send(err)
    });
  }
};

exports.enviaMensaje = (req,res) => {
    let link = `http://localhost:4200/reinicia?token=${req.body.token}&id=${req.body.id}` 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'medpet.help@gmail.com', 
            pass: 'Petmed123'
        }
    });

    if(req.body.reinicia == true){
        const mailOptions = {
            from: `MedPet 🐾<medpet.help@gmail.com>`,
            to: req.body.correo, 
            subject: `Recupera tu acceso a MedPet | Reinicio de contraseña`,
            html: 
            `
            <body>
              <h2>Hola ${req.body.nombre},</h2>
              <p style="font-size: medium;">Solicitaste recuperar el acceso a tu cuenta de MedPet, por favor utiliza este <a href="${link}">link</a> 
              para reiniciar tu contraseña.</p>
              <p style="font-size: medium;">Te saluda,</p>
              <p style="font-size: medium;">El equipo de MedPet</p>
            </body>
            `
        };
     
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.send(err)
            }
            else {
              res.send(info);
            }
        });
    }
    else {
        const mailOptions = {
            from: `MedPet 🐾 <medpet.help@gmail.com>`,
            to: req.body.correo, 
            subject: `Cambio de contraseña MedPet`,
            html: 
            `
            <div>
                <h4>Hola ${req.body.nombre},</h4>
                <p>Tu cambio de contraseña fue exitoso ¡ya puedes acceder de nuevo con tu nueva contraseña! </p>
                <a href="http://localhost/4200/login">Haz click aquí</a> 
                <p>Te saluda,</p>
                <p>El equipo de MedPet</p>
            </div>
            `
        };
         
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.send(err)
            }
            else {
              res.send(info)
            }
        });
    }
}

//Perfil usuario
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

//Trae usuario sin auth
exports.buscaCorreo = (req, res) => {

  Usuario.findOne({
    where: {
      correo: req.body.correo
    }
  })
  .then( usuario =>{
    res.json(usuario);
  })
  .catch( error => res.send(error))

};

//Subscripcion a notificaciones
/*exports.subscribe = (req, res) => {
  let sub = req.body; 
  res.set('Content-Type', 'application/json'); 
  webpush.setVapidDetails(
    Usuario.correo,

  )
  
}
*/