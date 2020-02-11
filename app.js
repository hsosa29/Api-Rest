const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')

var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'next',
    password: 'next2020',
    database: 'api_rest'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.listen(8080, function (){
    console.log('App listen on port 8080')
})