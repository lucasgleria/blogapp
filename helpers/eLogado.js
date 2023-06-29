module.exports = {

    eLogado: function(req, res, next) {
      if (req.isAuthenticated() && req.user.eLogado === true) {
        return next();
      }
  
      req.flash("error_msg", "Você precisa estar logado para acessar");
      res.redirect("/");
    },
  };