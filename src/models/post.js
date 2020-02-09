const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    nombre:{
        type: String,
        required: true
      },
    mensaje: {
        type: String,
        required: true
      },
    fecha: {
        type: String,
        required: true
      },
    fuente: {
        type: String,
        required: true
      },
    status: {
        type: Boolean,
        default: false
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', TaskSchema);