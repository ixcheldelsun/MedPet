import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize ({
    database: 'b8mx1vmxorakgmsun3zz',
    dialect: 'mysql',
    username: 'uppqowimzzz6ufso',
    password: 'bBhEsJ9WSwhSptpoPMd3',
    storage: ':memory:',
    host: 'b8mx1vmxorakgmsun3zz-mysql.services.clever-cloud.com',
    port: 3306,
    modelPaths: [__dirname + 'models']
});

sequelize.authenticate(); 