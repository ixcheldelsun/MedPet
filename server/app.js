const express = require('express');
const bodyParser = require("body-parser");

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

const usuarioRoutes = require('./routes/usuarioRoutes')
const mascotaRoutes = require('./routes/mascotaRoutes')

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


//Configuración del puerto
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


module.exports = app;