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
        allowNull: true
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: true
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contraseña: {
        type: Sequelize.STRING,
        allowNull: true
    },
    reinicia_contraseña: {
      type: Sequelize.STRING,
      underscored: true,
      allowNull: true
    },
    reinicia_contraseña_expira: {
      type: Sequelize.DATE,
      underscored: true,
      allowNull: true
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

