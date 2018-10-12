// Dependencias
const mongoose = require('mongoose');


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es un campo requerido.']
    },
    apellidos: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        required: [true, 'El estado es un campo requerido.'],
        default: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);