const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 's3kre7',
    database: 'my_db'
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0], fields)
})

connection.end()