const mysql = require('mysql')

const db = mysql.createPool({
    host: 'pengray.mysql.database.azure.com',
    user: 'user',
    port: '3306',
    password: 'Kk455381381~!',
    database: 'xd_course',
})

module.exports = db