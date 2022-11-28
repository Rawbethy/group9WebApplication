const config = require('./dbconfig');
const sql = require('mssql');
const { response } = require('./app');

const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let users = pool.request().query("SELECT * from [dbo].[users];");
        return users
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    getUsers : getUsers
}