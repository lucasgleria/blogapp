const handlebars = require('express-handlebars')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Postagem = mongoose.model("postagens")
const app = express()

require('../models/Categoria')
const Categoria = mongoose.model("categorias")

const {eLogado} = require("../helpers/eLogado")



//  Handlebar
app.engine('handlebars',handlebars.engine({defaultLayout:'main', runtimeOptions: {allowProtoPropertiesByDefault:true}}))
app.set('view engine', 'handlebars')

  






function randomColor() {
    const shades = ["#d8dee3 ", "#91a3b0", "#b2bec7", "#0D6EFD"]; // Paleta de preto e cinza
    const randomIndex = Math.floor(Math.random() * shades.length); // Índice aleatório na paleta
  
    return shades[randomIndex]; // Retorna a cor aleatória da paleta
  }
    

  
router.get('/', eLogado, (req, res) => {
    Categoria.find()
      .then((categorias) => {
        // Embaralhar a matriz de categorias
        const categoriasEmbaralhadas = categorias.sort(() => Math.random() - 0.5);
    
        // Atribuir uma cor aleatória para cada categoria
        categoriasEmbaralhadas.forEach((categoria) => {
          categoria.cor = randomColor();
        });
    
        res.render("categorias/index", {
          categorias: categoriasEmbaralhadas
        });
      })
      .catch((err) => {
        req.flash("error_msg", "Houve um erro interno ao listar as categorias: " + err);
        res.redirect("/");
      });
  });
  

  




router.get("/:keyword", eLogado, (req,res) => {
    Categoria.findOne({keyword: req.params.keyword}).then((categoria) => {
        if(categoria){

            Postagem.find({categoria: categoria._id}).then((postagens) => {
                res.render('categorias/postagens', {postagens: postagens, categoria: categoria})
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro ao listar as postagens" + err)
                res.redirect("/")
            })

        }else{
            req.flash("error_msg", "Esta categoria não existe" +err)
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar essa categoria"+err)
        res.redirect("/")
    })
})

module.exports = router