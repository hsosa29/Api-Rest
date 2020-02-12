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

app.get('/api/v1/publicaciones', function(request, response){
    pool.getConnection(function(error, connection){
        let query = 'SELECT * FROM publicaciones'

        connection.query(query, function(error, rows, attr){
            if(error) throw error

            response.json({data : rows})
        })

        connection.release()
    })
})

app.get('/api/v1/publicaciones?busqueda=:word', function(request, response){
    pool.getConnection(function(error, connection){
        console.log(request.params.word)
        
        const query = `SELECT * FROM publicaciones WHERE titulo LIKE '%${connection.escape(request.params.id)}%'`

        connection.query(function(error, rows, attr){
            if(error) throw error
           
            if (rows.length == 0) {
                response.status(404)
                response.json({ errors: ["Publicacion no existe con ese titulo"] })
            }
            else {
                response.json({ data: rows[0] })
            } 
        })

        connection.release()
    })
})

app.get('/api/v1/publicaciones/:id', function (request, response) {
    pool.getConnection(function (error, connection) {
      const query = `SELECT * FROM publicaciones WHERE id=${connection.escape(request.params.id)}`
      connection.query(query, function (error, rows, attr) {
        if(error) throw error

        if (rows.length == 0) {
          response.status(404)
          response.json({ errors: ["Publicacion no existe"] })
        }
        else {
          response.json({ data: rows[0] })
        }
      })
      connection.release()
    })
  })

  app.get('/api/v1/autores', function(request, response){
    pool.getConnection(function(error, connection){
        let query = 'SELECT * FROM autores'

        connection.query(query, function(error, rows, attr){
            if(error) throw error

            response.json({data : rows})
        })

        connection.release()
    })
})

app.get('/api/v1/autores/:id', function (request, response) {
    pool.getConnection(function (error, connection) {
      const query = `SELECT * FROM autores WHERE id=${connection.escape(request.params.id)}`
      connection.query(query, function (error, rows, attr) {
        if(error) throw error

        if (rows.length == 0) {
          response.status(404)
          response.json({ errors: ["Autor no existe"] })
        }
        else {
          response.json({ data: rows[0] })
        }
      })
      connection.release()
    })
  })

  app.post('/api/v1/autores', function(request, response){
    pool.getConnection(function (error, connection){
        errors = []

        if(!request.body.email || request.body.email == "")
            errors.push("Email incorrecto o vacio")
        if(!request.body.contrasena || request.body.contrasena == "")
            errors.push("Contraseña incorrecta o vacia")
        if(!request.body.pseudonimo || request.body.pseudonimo == ""){
            errors.push("Pseudonimo incorrecto o vacio")
        }else{
            const query = `SELECT * FROM autores WHERE pseudonimo=${connection.escape(request.body.pseudonimo)}`
            connection.query(query, function (error, rows, attr) {
                if(error) throw error

                if (rows.length != 0) {
                    errors.push("Pseudonimo ya existe")
                }               
            })
            connection.release()   
        }

        if(errors.length > 0){
            response.status(400)
            response.json({errors: errors})
        }
        else{
            const query = `
            INSERT
            INTO usuarios
            (email, contrasena, pseudonimo)
            VALUES
            (
              ${connection.escape(peticion.body.email)},
              ${connection.escape(peticion.body.contrasena)},
              ${connection.escape(peticion.body.pseudonimo)}
            )
          `
          connection.query(query, function(error, rows, attr){
              const newId = rows.insertId
              const queryResponse = `SELECT * FROM usuarios WHERE id=${connection.escape(newId)}`
              
              connection.query(queryResponse, function(error, rows, attr){
                  response.status(201)
                  response.json({data :  rows[0]})
              })
          })
        }
        connection.release()
    })
  })

  app.post('api/v1/publicaciones?email=:email&contrasena=:contrasena', function(request, response){
    pool.getConnection(function (error, connection){
        errors = []

        if(!request.body.email || request.body.email == "")
            errors.push("Email incorrecto o vacio")
        if(!request.body.contrasena || request.body.contrasena == ""){
            errors.push("Contraseña incorrecta o vacia")
        }else{
            const query = `SELECT * FROM autores WHERE email=${connection.escape(request.body.email)} and contrasena=${connection.escape(request.body.contrasena)}`
            connection.query(query, function (error, rows, attr) {
                if(error) throw error

                if (rows.length == 0) {
                    errors.push("Usuario o contraseña invalida")
                }else{
                    Object.keys(result).forEach(function(key) {
                        var row = result[key];
                        var autorId = row.id
                    });
                }             
            })
            connection.release()   
        }

        if(errors.length > 0){
            response.status(400)
            response.json({errors: errors})
        }
        else{
            
            const query = `
            INSERT
            INTO publicaciones
            (titulo, resumen, contenido, foto, votos, fecha_hora, autor_id)
            VALUES
            (
              ${connection.escape(peticion.body.titulo)},
              ${connection.escape(peticion.body.resumen)},
              ${connection.escape(peticion.body.contenido)},
              ${connection.escape(peticion.body.foto)},
              ${connection.escape(peticion.body.fecha_hora)}
              ${autorId}
            )
          `
          connection.query(query, function(error, rows, attr){
              const newId = rows.insertId
              const queryResponse = `SELECT * FROM publicaciones WHERE id=${connection.escape(newId)}`
              
              connection.query(queryResponse, function(error, rows, attr){
                  response.status(201)
                  response.json({data :  rows[0]})
              })
          })
        }
        connection.release()
    })
  })

  app.delete('/api/v1/publicaciones/:id?email=:email&contrasena=:contrasena', function(request, response){
    pool.getConnection(function (error, connection){
        errors = []

        if(!request.body.email || request.body.email == "")
            errors.push("Email incorrecto o vacio")
        if(!request.body.contrasena || request.body.contrasena == ""){
            errors.push("Contraseña incorrecta o vacia")
        }else{
            const query = `SELECT * FROM autores WHERE email=${connection.escape(request.body.email)} and contrasena=${connection.escape(request.body.contrasena)}`
            connection.query(query, function (error, rows, attr) {
                if(error) throw error

                if (rows.length == 0) {
                    errors.push("Usuario o contraseña invalida")
                }                         
            })
            connection.release()   
        }

        if(errors.length > 0){
            response.status(400)
            response.json({errors: errors})
        }
        else{
            
            const query = `DELETE FROM publicaciones WHERE id=${connection.escape(request.params.id)}`
            connection.query(query, function(error, rows, attr){

                  response.status(201)
                  response.json({data :  ["Publicación eliminada"]})
              })        
        }
        connection.release()
    })
  })

app.listen(8080, function (){
    console.log('App listen on port 8080')
})