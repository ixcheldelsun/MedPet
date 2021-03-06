const express = require('express');
const bodyParser = require("body-parser");

const whitelist = ['http://localhost:4200', 'http://127.0.0.1:8080']

const cors = require('cors');
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}

const usuarioRoutes = require('./routes/usuarioRoutes')
const mascotaRoutes = require('./routes/mascotaRoutes')
const vacunaRoutes = require('./routes/vacunaRoutes')
const celoRoutes = require('./routes/celoRoutes')
const desparasitacionRoutes = require('./routes/desparasitacionRoutes')
const consultaRoutes = require('./routes/consultaRoutes')
const observacionRoutes = require('./routes/observacionRoutes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors(corsOptions))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

//Rutas 
app.use('/usuarios', usuarioRoutes);
app.use('/mascotas', mascotaRoutes);
app.use('/vacunas', vacunaRoutes);
app.use('/celos', celoRoutes);
app.use('/desparasitaciones', desparasitacionRoutes);
app.use('/consultas', consultaRoutes);
app.use('/observaciones', observacionRoutes);


//Configuración del puerto
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


module.exports = app;
