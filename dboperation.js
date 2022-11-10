const config = require('./dbconfig');
const sql = require('mssql');
const { response } = require('./app');

const getProducts = async(query) => {

}

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

const insertQuery = async(query) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query(query), async(error, res) => {
            if(error) {
                console.log(error);
            }
            if(res.length > 0) {
                response.redirect('/main');
            }
        }
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {
    getUsers : getUsers,
    insertQuery : insertQuery,
    getProducts : getProducts
}