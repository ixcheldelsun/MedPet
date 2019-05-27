const Sequelize = require('sequelize');
const db = require('../config/database');
const Mascota = require('../models/Mascota');

const Vacuna = db.define('VACUNA', {
    vacuna_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      underscored: true
    },
    fecha_i: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fecha_f: {
        type: Sequelize.DATE,
        allowNull: true
    },
    dosis: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    clase: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_mascota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        underscored: true,
        references: {
          model: 'Mascota',
          key: 'id_mascota'
        }
    },
  },
  {
      timestamps: false,
      freezeTableName: true,
      tableName: 'VACUNA',
  }
  );

// Asociación mascota pertenece a usuario 
  Vacuna.associate = (models) => {
    Vacuna.belongsTo(models.Mascota, {foreignKey: "id_mascota"});
  };
 


module.exports = Vacuna;

