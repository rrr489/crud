var mongoose = require('mongoose');
var model = require('../models/usuario.js');
var Usuario = mongoose.model('usuario');

//GETS

exports.todosUsuarios = function (req, res) {
  Usuario.findAllUsuarios(function (err, Usuarios) {
    if (err) res.send(500, err.message);
    console.log('Get / Usuarios');
    res.status(200).jsonp(usuarios);
  });
};

exports.porIdUsuarios = function (req, res) {
  Usuario.porIdUsuarios(req, params.id, function (err, Usuario) {
    if (err) return res.send(500, err.message);
    console.log('GET / Usuario unico' + req.params.id);
    res.status(200).jsonp(Usuario);
  });
};

//POST

exports.addUsuarios = function (req, res) {
  console.log('POST');
  console.log(req.body);
  var Usuario = new Usuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tipo_ID: req.body.tipo_ID,
    id_Numero: req.body.id_Numero,
    contacto: { numero1: req.body.contacto.numero1,
      numero2: req.body.contacto.numero2,
      numero3: req.body.contacto.numero3 },
    correo:  req.body.correo,
    salario_Mensual: req.body.salario_Mensual
  });
  Usuario.save(function (err, Usuario) {
    if (err) return res.status(500).send(err.message);
    res.status(200).jsonp(Usuario);
  });
};

//PUT

exports.updateUsuarios = function (req, res) {
  Usuario.porIdUsuarios(req.params.id, function (err, Usuario) {
    Usuario.nombre = req.body.petId;
    Usuario.apellido = req.body.apellido;
    Usuario.tipo_ID = req.body.tipo_ID;
    Usuario.id_Numero = req.body.id_Numero;
    Usuario.contacto = req.body.contacto;
    Usuario.correo = req.body.correo;
    Usuario.salario_Mensual = req.body.salario_Mensual;
    Usuario.save(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(Usuario);
    });
  });
};

//DELETE

exports.deleteUsuarios = function (req, res) {
  Usuarios.porIdUsuarios(req.params.id, function (err, Usuario) {
    Usuario.remove(function (err) {
      if (err) return res.status(500).send(err.message);
      res.status(200).send();
    })
  });
}
