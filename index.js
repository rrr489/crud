//dependencias

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var server = http.createServer(app);
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var controllersUsuarios = require('./controllers/usuarios');
var model = require('./models/usuario');
var jsonParser = bodyParser.json();

// BD y direcciones

var router = express.Router();
var usuarios = express.Router();
var db = mongoose.connect('mongodb+srv://mongodb:mongo1234@test1-exw2w.mongodb.net/test?retryWrites=true&w=majority');
usuarios.route('/usuarios').
get(controllersUsuarios.todosUsuarios).
post(controllersUsuarios.addUsuarios);
usuarios.route('/usuarios/:id').
get(controllersUsuarios.porIdUsuarios).
put(controllersUsuarios.updateUsuarios).
delete(controllersUsuarios.deleteUsuarios);

//app.use

app.use('/api', usuarios);
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(router);

// mensajes de servidor
/*
router.use(function (req, res, next) {
  respuesta = {
    error: true,
    codigo: 404,
    mensaje: 'URL no encontrada'
  };
  res.status(404).send(respuesta);
});
*/

//conexion
mongoose.connect('mongodb+srv://mongodb:mongo1234@test1-exw2w.mongodb.net/test?retryWrites=true&w=majority', function (err, res) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function () {
    console.log(`Api rest corriendo en el puerto 3000 (localhost:3000)`);
    if (!err) {
      console.log('logeo la bd');
    }
  });
});
