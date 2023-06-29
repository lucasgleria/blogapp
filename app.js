//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require('mongoose')
const session = require("express-session") 
const flash = require("connect-flash")
const passport = require('passport')
    require("./config/auth")(passport)

    

const postagens = require("./routes/postagem")
const categorias = require("./routes/categoria")
const usuarios = require("./routes/usuario")


// Configurações
    // Sessão  
        app.use(session({
            secret: "cursodenode",
            resave: true,
            saveUninitialized: true
        }))
        
        // Passport
        app.use(passport.initialize());
        app.use(passport.session())
        app.use(flash()) // Flash sempre deve ficar abaixo da Sessão

    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            res.locals.error = req.flash("error")
            res.locals.user = req.user || null
            next()
        })

    //  Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    //  Handlebar
        app.engine('handlebars',handlebars.engine({defaultLayout:'main', runtimeOptions: {allowProtoPropertiesByDefault:true}}))
        app.set('view engine', 'handlebars')

    // Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://127.0.0.1/blogapp').then(() => {
            console.log('Conexão com o banco realizada!')
        }).catch((err) => {
            console.log('Erro' + err)
        })

    // Public
    app.use(express.static(path.join(__dirname, "public")))

// Rotas
    
    app.get('/', (req,res) => {
            res.render("index")
    })

    app.get('/404', (req, res) => {
        res.status(404).render("not-found/not-found");
      });

    app.use('/admin', admin)
    app.use('/usuarios', usuarios)
    app.use('/categorias', categorias)
    app.use('/postagens', postagens)

      // Middleware para rota não encontrada
      app.use((req, res) => {
        res.status(404).render("not-found/not-found");
      });

    // Outros
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log(`Servidor rodando`)
})