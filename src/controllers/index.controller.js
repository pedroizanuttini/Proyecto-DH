const { response } = require('express');

const showHome = (req, res=response) => {

    const isLogged = req.session.userLogged ? true : false;

    res.render('home',{ isLogged });
} 


module.exports = {
    showHome,
}