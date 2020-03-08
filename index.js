//dependencias

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//app.use

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());
var router = express.Router();
app.use(router);
mongoose.connect('mongodb://localhost/Usuarios');

// mensajes de servidor

router.use(function (req, res, next) {
  respuesta = {
    error: true,
    codigo: 404,
    mensaje: 'URL no encontrada'
  };
  res.status(404).send(respuesta);
});

//conexion
mongoose.connect('mongodb://localhost/tvshows', function (err, res) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function () {
    console.log(`Api rest corriendo en el puerto 3000 (localhost:3000)`);
  });
});

//usuario clave

let usuario = {
  nombre: '',
  apellido: ''
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

router.get('/usuario', function (req, res) {
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
      respuesta: usuario
    };
  }
  res.send(respuesta);
});

//post

router.post('/usuario', function (req, res) {
  if (!req.body.nombre || !req.body.apellido) {
    respuesta = {
      error: true,
      codigo: 503,
      mensaje: 'el campo nombre y apellido son requeridos'
    };
  } else {
    if (usuario.nombre === '' || usuario.apellido === '') {
      respuesta = {
        error: false,
        codigo: 503,
        mensaje: 'El usuario ya fue creado'
      };
    }else {
      usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
      };
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario Creado'
      };
    }
  }
  res.send(respuesta);
});

//put

router.put('/usuario', function (req, res) {
  if (!req.body.nombre || !req.body.apellido) {
    respuesta = {
      error: true,
      codigo: 502,
      mensaje: 'El campo nombre y apellido son requeridos'
    };
  }else {
    if (usuario.nombre === '' || usuario.apellido === '') {
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El Usuario ya ha sido Creado.'
      };
    }else {
      usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
      };
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario actualizado',
        respuesta: usuario
      };
    }
  }
  res.send(respuesta);
});

//delete

router.delete('/usuario', function (req, res) {
  if (usuario.nombre === '' || usuario.apellido === '') {
    respuesta = {
      error: true,
      codigo: 501,
      mensaje: 'El usuairo no ha sido creado'
    };
  }else {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'El usuario ha sido eliminado'
    };
    usuario = {
      nombre: '',
      apellido: ''
    };
  }
  res.send(respuesta);
});
