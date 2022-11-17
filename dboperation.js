const config = require('./dbconfig');
const sql = require('mssql');
const { response } = require('./app');

const validateUser = async(query) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query(query);
    }
    catch(error) {
        console.log(error);
    }
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

const insertQuerySignup = async(query) => {
    try {
        let pool = await sql.connect(config);
        pool.request().query(query), async(error, res) => {
            if(error) {
                console.log(error);
            }
            if(res.length > 0) {
                response.redirect('/');
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
    validateUser : validateUser,
    insertQuerySignup : insertQuerySignup
}
