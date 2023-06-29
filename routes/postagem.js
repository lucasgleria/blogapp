const handlebars = require('express-handlebars')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const app = express()

require('../models/Postagem')
const Postagem = mongoose.model("postagens")

const {eLogado} = require("../helpers/eLogado")


//  Handlebar
app.engine('handlebars',handlebars.engine({defaultLayout:'main', runtimeOptions: {allowProtoPropertiesByDefault:true}}))
app.set('view engine', 'handlebars')



router.get('/', eLogado, (req,res) =>{
    Postagem.find().populate("categoria").sort({data: 'desc'}).then((postagens) => {
        res.render("postagens/index", {postagens : postagens})
    }).catch((err) => {
        req.flash("error_msg" , "Houve um erro interno")
        res.redirect("/404")
    })
})

router.get('/:keyword', eLogado, (req, res) => {
    Postagem.findOne({ keyword: req.params.keyword }).then((postagens) => {
        res.render("postagens/postagem", { postagens: postagens });
    }).catch((err) => {
        req.flash("error_msg", "Ocorreu algum erro ao tentar carregar");
        res.redirect("/");
    });
});

module.exports = router;