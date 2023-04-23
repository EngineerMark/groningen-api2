require('dotenv').config();
const mysql = require(`mysql-await`);

async function getConnection(){
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: 'osu'
    });
    await connection.connect();
    return connection;
}
module.exports.getConnection = getConnection;

async function query(query){
    const connection = await getConnection();
    const result = await connection.awaitQuery(query);
    await connection.end();
    return result;
}
module.exports.query = query;