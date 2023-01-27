const { response } = require('express');


const showProductsFormEdit = (req, res=response) => {
    res.render('./products/productsform',{});
}

module.exports = {
    showProductsFormEdit
}