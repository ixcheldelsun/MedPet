const Sequelize = require('sequelize');
const db = require('../config/database');
const Mascota = require('../models/Mascota');

const Consulta = db.define('CONSULTA', {
  consulta_id: {
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
  recipe: {
    type: Sequelize.STRING,
    allowNull: true
  },
  diagnostico: {
    type: Sequelize.STRING,
    allowNull: true
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
  tableName: 'CONSULTA',
});

// Asociación mascota pertenece a usuario 
Consulta.associate = (models) => {
  Consulta.belongsTo(models.Mascota, {
    foreignKey: "id_mascota"
  });
};



module.exports = Consulta;
