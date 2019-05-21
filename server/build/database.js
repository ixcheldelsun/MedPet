const Sequelize = require('sequelize');

const sequelize = new Sequelize('b8mx1vmxorakgmsun3zz', 'uppqowimzzz6ufso', 'bBhEsJ9WSwhSptpoPMd3', {
  host: 'b8mx1vmxorakgmsun3zz-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timeStamps: false
  }
});



sequelize
  .authenticate()
  .then(() => {
    console.log('SUCCESS')
  })
  .catch(err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
  });

module.exports = sequelize;
