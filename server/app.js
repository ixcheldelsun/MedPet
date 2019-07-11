const express = require('express');
const bodyParser = require("body-parser");
const webpush = require('web-push');
const path = require('path')
const whitelist = ['http://localhost:4200', 'http://localhost:3000', 'http://127.0.0.1:8080']

const PUBLIC_VAPID = "BL08R64x9116xLBFIJDICSHCROAuWA1GFMRId__9pXojPDJvc4Va4r6ZGsY7_2MWvvo7b7GNFVFU2oIukroM1D0";

const PRIVATE_VAPID = "CL79W5OZR0gL3ITEDswrJkuyo0q_XTxby0Eny7zHSY0";


const cors = require('cors');

/*const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}


const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}*/




const usuarioRoutes = require('./routes/usuarioRoutes')
const mascotaRoutes = require('./routes/mascotaRoutes')
const vacunaRoutes = require('./routes/vacunaRoutes')
const celoRoutes = require('./routes/celoRoutes')
const desparasitacionRoutes = require('./routes/desparasitacionRoutes')
const consultaRoutes = require('./routes/consultaRoutes')
const observacionRoutes = require('./routes/observacionRoutes')
//const subscriptionRoutes = require('./routes/subscriptionRoutes');
//const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());



//Rutas 
app.use('/usuarios', usuarioRoutes);
app.use('/mascotas', mascotaRoutes);
app.use('/vacunas', vacunaRoutes);
app.use('/celos', celoRoutes);
app.use('/desparasitaciones', desparasitacionRoutes);
app.use('/consultas', consultaRoutes);
app.use('/observaciones', observacionRoutes);
//app.use('/subscription', subscriptionRoutes);
//app.use('/sendNotification', notificationRoutes);

app.use(express.static('dist/MedPet'));

app.get('/*',(req,res) => {
  res.sendFile(__dirname + '/dist/MedPet/index.html')
})

//Configuración del puerto
const port = process.env.PORT || 3000;

app.post('/subscribe', (req, res) => {
  let sub = req.body;
  res.set('Content-Type', 'application/json');
  webpush.setVapidDetails('mailto: medpet.help@gmail.com', PUBLIC_VAPID, PRIVATE_VAPID);


  let payload = JSON.stringify({
    "notification": {
      "title": "Push Test",
      "body": "Gracias por subscribirse!"
    }
  });

  Promise.resolve(webpush.sendNotification(sub, payload))
    .then(() => res.status(200).json({
      message: "Notificacion enviada"
    }))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


module.exports = app;
