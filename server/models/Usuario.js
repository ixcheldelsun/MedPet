const Sequelize = require('sequelize');
const db = require('../config/database');
const Mascota = require('../models/Mascota')

const Usuario = db.define('USUARIO', {
    id_usuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      underscored: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contraseña: {
        type: Sequelize.STRING,
        allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'USUARIO',
  }
  );

//Asociación usuario tiene n mascotas 

Usuario.associate = (models) => {
    Usuario.hasMany(models.Mascota, {foreignKey: "id_usuario"});
};

module.exports = Usuario;

