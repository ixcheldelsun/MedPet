const Sequelize = require('sequelize');
const db = require('../config/database');
const Usuario = require('../models/Usuario')

const Mascota = db.define('MASCOTA', {
    id_mascota: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      underscored: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apodo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    especie: {
        type: Sequelize.STRING,
        allowNull: false
    },
    raza: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: Sequelize.DATE,
        allowNull: false,
        underscored: true
    },
    foto: {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        underscored: true,
        references: {
          model: 'Usuario',
          key: 'id_usuario'
        }
    },
  },
  {
      timestamps: false,
      freezeTableName: true,
      tableName: 'MASCOTA',
  }
  );

// Asociación mascota pertenece a usuario 
  Mascota.associate = (models) => {
    Mascota.belongsTo(models.Usuario, {foreignKey: "id_usuario"});
  };

// Asociación mascota tiene vacuna y celo

  Mascota.associate = (models) => {
    Mascota.hasMany(models.Vacuna, {foreignKey: "id_mascota"});
  };

  Mascota.associate = (models) => {
    Mascota.hasMany(models.Celo, {foreignKey: "id_mascota"});
  };
 


module.exports = Mascota;

