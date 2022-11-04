const config = require('./dbconfig');
const sql = require('mssql');

const getUsers = async() => {
    try {
        let pool = await sql.connect(config);
        let users = pool.request().query("SELECT * from [dbo].[user];");
        return users
    }
    catch(error) {
        console.log(error);
    }
}

const insertQuery = async(query) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query(query);
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    getUsers : getUsers,
    insertQuery : insertQuery
}