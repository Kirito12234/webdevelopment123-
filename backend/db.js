const {sequelize} = require("sequelize")

const sequelize = new Sequelize('test', 'postgres', 'admin123', {

    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
});

async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('DB connection sucessful............')
    } catch (error) {
        console.error('Unable to connect to the database.......', error)
    }
}

testConnection()