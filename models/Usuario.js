const mongoose = require('mongoose')
const eLogado = require('../helpers/eLogado')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    eAdmin:{
        type: Number,
        default:0
    },
    senha:{
        type: String,
        required: true
    },
    eLogado:{
        type: Boolean,
        default: true
    }
})

mongoose.model("usuarios", Usuario)