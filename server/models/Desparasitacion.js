const Sequelize = require('sequelize');
const db = require('../config/database');
const Mascota = require('../models/Mascota');

const Desparasitacion = db.define('DESPARASITACION', {
  desparasitacion_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    underscored: true
  },
  fecha: {
    type: Sequelize.DATE,
    allowNull: false,
    underscored: true
  },
  veterinario: {
    type: Sequelize.STRING,
    allowNull: false,
    underscored: true
  },
  centro: {
    type: Sequelize.STRING,
    allowNull: false
  },
  vencimiento: {
    type: Sequelize.DATE,
    allowNull: false
  },
  observaciones: {
    type: Sequelize.STRING,
    allowNull: true
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
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'Desparasitacion',
});

// Asociación mascota pertenece a usuario 
Desparasitacion.associate = (models) => {
  Desparasitacion.belongsTo(models.Mascota, {
    foreignKey: "id_mascota"
  });
};



module.exports = Desparasitacion;
