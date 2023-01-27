const { response } = require('express');

const showLogin = (req, res=response) => {
    res.render('login',{});
}

const showRegister = (req, res=response) => {
    res.render('register',{});
}

module.exports = {
    showLogin,
    showRegister
}