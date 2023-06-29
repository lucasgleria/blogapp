const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bodyParser = require("body-parser") 
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")
const {eAdmin} = require("../helpers/eAdmin")

router.get('/', eAdmin, (req,res) => {
    res.render("admin/index")
})

router.get('/posts', eAdmin, (req, res) => {
    res.send("Página de posts")
})

router.get('/categorias', eAdmin, (req, res) => {
    Categoria.find()
        .sort({ date: 'DESC'}) 
        .then((categorias) => {
            return res.render("admin/categorias",{categorias: categorias })
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias")
            res.redirect("/admin")
            res.render("admin/categorias")  
    })
})

router.get('/categorias/add', eAdmin, (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', eAdmin, (req, res) => {

    var erros = [] //array aqui

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null ){
        erros.push({texto: "Nome inválido"}) //todo array tem a função .push
    }
    
    if(!req.body.keyword || typeof req.body.keyword == undefined || req.body.keyword == null ){
        erros.push({texto: "Keyword inválido"}) 
    }

    if(req.body.nome.length < 2){
        erros.push({texto:"Nome da categoria muito pequeno"})
    }

    if (erros.length > 0) {
        res.render("admin/addcategorias", {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            keyword: req.body.keyword
        }
    
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Categoria criada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente.")
            res.redirect("/admin/categorias/add")  
        })
    }
})

router.get("/categorias/edit/:id", eAdmin, (req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render("admin/editcategorias", {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Esta categoria não existe")
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit", eAdmin, (req, res) => {
    var erros = [];
  
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
      erros.push({ texto: "Não é possível fazer essa alteração, preencha o campo Nome" });
    }
  
    if (!req.body.keyword || typeof req.body.keyword == undefined || req.body.keyword == null) {
      erros.push({ texto: "Não é possível fazer essa alteração, preencha o campo Keyword" });
    }
  
    if (req.body.nome.length < 2) {
      erros.push({ texto: "Nome da categoria muito pequeno" });
    }
  
    if (erros.length > 0) {
      Categoria.findOne({ _id: req.body.id }).then((categoria) => {
        res.render("admin/editcategorias", { erros, categoria, categoriaId: req.body.id });
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria" + err.message);
        res.redirect("/admin/categorias");
      });
    } else {
      const categoriaId = req.body.id;
  
      Categoria.findOne({ _id: categoriaId }).then((categoria) => {
        categoria.nome = req.body.nome;
        categoria.keyword = req.body.keyword;
  
        categoria.save().then(() => {
          req.flash("success_msg", "Categoria atualizada com sucesso!");
          res.redirect("/admin/categorias");
        }).catch((err) => {
          req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria" + err);
          res.redirect("/admin/categorias");
        });
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria" + err.message);
        res.redirect("/admin/categorias");
      });
    }
  });
  

router.post("/categorias/deletar", eAdmin, (req, res) => {
    Categoria.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect("/admin/categorias")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluir a categoria" + err)
        res.redirect("admin/categorias")
    })
})

router.get("/postagens", eAdmin, (req, res) => {
    Postagem.find()
      .populate({path: "categoria", options: { strictPopulate: false } })
      .sort({data: "desc" })
      .then((postagens) => {
        res.render("admin/postagens", { postagens: postagens });
      })
      .catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as postagens" + err);
        res.redirect("/admin");
      });
  });

router.get("/postagens/add", eAdmin, (req, res) => {
    Categoria.find().then((categorias) =>{
        res.render("admin/addpostagens", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao carregar o formulário")
        res.redirect("/admin")
    })
})

router.post("/postagens/nova", eAdmin, (req, res) => {
    var erros = []
    
    if(req.body.categoria == "0"){
        erros.push({texto:" Categoria inválida, selecione uma categoria"})
    }

    if(erros.length > 0){
        res.render("admin/addpostagem", {erros: erros})
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            keyword: req.body.keyword
             }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro durante o salvamento da postagem" + err)
            res.redirect("/admin/postagens")
        })
    }
})

router.get("/postagens/edit/:id", eAdmin, (req, res) => {
    Postagem.findOne({_id:req.params.id}).then((postagem) => {

        Categoria.find().then((categorias) => {
            res.render("admin/editpostagens", {categorias: categorias, postagem: postagem})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias" + err)
            res.redirect("/admin/postagens")
        })

        }).catch((err) => {
        req.flash("error_msg", "Esta postagem não existe" + err)
        res.redirect("/admin/postagens")
    })
})

router.post("/postagens/edit", eAdmin, (req, res) => {
    var erros = [];
  
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
      erros.push({ texto: "Não é possível fazer essa alteração, preencha o campo Título" });
    }
  
    if (!req.body.keyword || typeof req.body.keyword == undefined || req.body.keyword == null) {
      erros.push({ texto: "Não é possível fazer essa alteração, preencha o campo Keyword" });
    }
  
    if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
      erros.push({ texto: "Não é possível fazer essa alteração, preencha o campo Descrição" });
    }
  
    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
      erros.push({ texto: "Não é possível fazer essa alteração, preencha o campo Conteúdo" });
    }
  
    if (erros.length > 0) {
      
    //   const categoriaId = req.body.id;
  
    //   Categoria.findOne({ _id: categoriaId }).then((categoria) => {
    //     categoria.nome = req.body.nome;
    //     categoria.keyword = req.body.keyword;

      Postagem.findOne({ _id: req.body.id }).then((postagem) => {
        res.render("admin/editpostagens", { erros, postagem, postagemId: req.body.id });
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a postagem" + err);
        res.redirect("/admin/postagens");
      });
    } else {
      const postagemId = req.body.id;
      const postagemCategoriaId = req.body.categoria
      
      Postagem.findOne({ _id: postagemId }).then((postagem) => {
        postagem.titulo = req.body.titulo;
        postagem.keyword = req.body.keyword;
        postagem.descricao = req.body.descricao;
        postagem.conteudo = req.body.conteudo;
        postagem.postagem = postagemCategoriaId; // coletar id das categorias
  
        postagem.save().then(() => {
          req.flash("success_msg", "Postagem editada com sucesso!");
          res.redirect("/admin/postagens");
        }).catch((err) => {
          req.flash("error_msg", "Houve um erro interno ao salvar a edição da postagem" + err); // o erro é aqui
          res.redirect("/admin/postagens");
        });
      }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a postagem" + err);
        res.redirect("/admin/postagens");
      });
    }
  });
  

router.post("/postagens/deletar", eAdmin, (req, res) => {
    Postagem.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso!")
        res.redirect("/admin/postagens")
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao excluir a postagem" + err)
        res.redirect("admin/postagens")
    })
})


module.exports = router