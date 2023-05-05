function privateMiddleware(req, res, next){
    if(!req.session.userLogged){
        return res.redirect('/auth/login') // redirecciona a loggin si no estas logueado
    }
    if(req.session.userLogged && req.session.userLogged.role.name != 'admin_role'){
        // TODO: crear una vista 404
        return res.render('./errors/notFound') // si estas logueado pero no sos admin te redirecciona a 404
    }
    next();
}

module.exports = privateMiddleware;