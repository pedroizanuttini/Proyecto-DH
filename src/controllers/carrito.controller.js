const { response } = require('express');

const showCarrito= (req, res=response)=>{
    res.render('carrito',{});
}


module.exports = { 
    showCarrito
}