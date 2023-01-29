const { response } = require('express')


const showProducts = (req, res=response) => {
    res.render('./products/productslist',{});
}

const showProductsFormEdit = (req, res=response) => {
    res.render('./products/productsform',{});
}

const showProductDetail = (req, res=response) => {
    res.render('./products/productDetail',{});
}

const createProduct = (req, res=response) => {
    return;
}

const updateProduct = (req, res=response) => {
    return;
}

const deleteProduct = (req, res=response) => {
    return;
}


module.exports = {
    showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct
}