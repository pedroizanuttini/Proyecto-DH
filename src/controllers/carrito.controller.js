const { response } = require('express');

const showCarrito= (req, res=response)=>{

    const isLogged = req.session.userLogged ? true : false;

    res.render('carrito',{ isLogged });
}


module.exports = { 
    showCarrito
}