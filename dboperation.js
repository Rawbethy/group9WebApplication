const config = require('./dbconfig');
const sql = require('mssql');

const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let users = pool.request().query("SELECT * from [dbo].[user];");
        console.log(users);
        return users
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    getUsers
}