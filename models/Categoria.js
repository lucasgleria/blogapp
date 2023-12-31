const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },

    keyword:{
        type:String,
        required:true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("categorias", Categoria)