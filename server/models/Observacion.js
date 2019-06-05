const Sequelize = require('sequelize');
const db = require('../config/database');
const Mascota = require('../models/Mascota');

const Observacion = db.define('OBSERVACION', {
  observacion_id: {
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
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
    underscored: true
  },
  foto: {
    type: Sequelize.STRING,
    allowNull: true
  },
  texto: {
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
  tableName: 'OBSERVACION',
});

// Asociación mascota pertenece a usuario 
Observacion.associate = (models) => {
  Observacion.belongsTo(models.Mascota, {
    foreignKey: "id_mascota"
  });
};



module.exports = Observacion;
