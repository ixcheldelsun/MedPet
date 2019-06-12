const Sequelize = require('sequelize');
const db = require('../config/database');
const Mascota = require('../models/Mascota');

const Celo = db.define('CELO', {
  id_celo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    underscored: true
  },
  fecha_i: {
    type: Sequelize.DATE,
    allowNull: false,
    underscored: true
  },
  fecha_f: {
    type: Sequelize.DATE,
    allowNull: true,
    underscored: true
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
  tableName: 'CELO',
});

// Asociación mascota pertenece a usuario 
Celo.associate = (models) => {
  Celo.belongsTo(models.Mascota, {
    foreignKey: "id_mascota"
  });
};



module.exports = Celo;
