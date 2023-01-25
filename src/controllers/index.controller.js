const { response } = require('express');

const showHome = (req, res=response) => {
    res.render('home',{});
}


module.exports = {
    showHome,
}