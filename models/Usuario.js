var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usuarioSchema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  tipo_ID: { type: String, enum: ['NIT', 'CC'] },
  id_Numero: { type: Number },
  contacto: {
    type: Number,
    type: Number,
    type: Number
  },
  correo:  { type: String },
  salario_Mensual: { type: Number }
});
module.exports = mongoose.model('usuario', usuarioSchema);
