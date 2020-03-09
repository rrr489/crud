//dependencias

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// BD y direcciones

var router = express.Router();
var db = mongoose.connect('mongodb+srv://mongodb:mongo1234@test1-exw2w.mongodb.net/test?retryWrites=true&w=majority');

//app.use

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

//usuario clave

let usuario = {
  nombre: '',
  apellido: '',
  tipo_ID: '',
  id_Numero: 0,
  contacto: { numero1: 0,
    numero2: 0,
    numero3: 0 },
  correo:  '',
  salario_Mensual: 0
};

//respuesta

let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
};

//get de error

router.get('/', function (req, res) {
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Punto de inico'
  };
  res.send(respuesta);
});

//get de correcto

router.get('/usuarios', function (req, res) {
  respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
  };
  if(usuario.nombre === '' || usuario.apellido === '') {
    respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'El usuario no ha sido creado'
    };
  } else {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'respuesta del usuario',
      respuesta: usuario  // TODO: pedido de la base de datos
    };
  }
  res.send(respuesta);
});

//post

router.post('/usuarios', function (req, res) {
  if (!req.body.nombre || !req.body.apellido || !req.body.tipo_ID || !req.body.id_Numero || !req.body.salario_Mensual) {
    respuesta = {
      error: true,
      codigo: 503,
      mensaje: 'el campo nombre, apellido, tipo ID, ID numero y salario mensual son requeridos'
    };
  } else {
    usuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      tipo_ID: req.body.tipo_ID,
      id_Numero: req.body.id_Numero,
      contacto: { numero1: req.body.contacto.numero1,
        numero2: req.body.contacto.numero2,
        numero3: req.body.contacto.numero3 },
      correo:  req.body.correo,
      salario_Mensual: req.body.salario_Mensual
    };

    // TODO: Lanzar el usuario a la BD

    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Usuario Creado'
    };
  }
  res.send(respuesta);
});

//put

router.put('/usuarios', function (req, res) {
  if (!req.body.nombre || !req.body.apellido || !req.body.tipo_ID || !req.body.id_Numero || !req.body.salario_Mensual) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'El campo nombre y apellido son requeridos'
    };
  }else {
    usuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      tipo_ID: req.body.tipo_ID,
      id_Numero: req.body.id_Numero,
      contacto: { numero1: req.body.contacto.numero1,
        numero2: req.body.contacto.numero2,
        numero3: req.body.contacto.numero3 },
      correo:  req.body.correo,
      salario_Mensual: req.body.salario_Mensual
    };

    // TODO: lanzar la actualizacion del usuario a la bd donde el numero de id sea el mismo

    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Usuario actualizado',
      respuesta: usuario
    };
  }
res.send(respuesta);
});

//delete

router.delete('/usuarios', function (req, res) {
  if (!req.body.nombre || !req.body.apellido || !req.body.tipo_ID || !req.body.id_Numero || !req.body.salario_Mensual) {
    respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'debe introducir los datos del usuario a eliminar (nombre, apellido, tipo de id, numero de id, salio)'
    };
  }else {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'El usuario ha sido eliminado'
    };

    // TODO: mandar la sentencia de borrar a la BD

  }
  res.send(respuesta);
});
