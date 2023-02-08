const { response } = require('express')
const { Container } = require('../helpers/container');

const container = new Container('products.json');

const showProducts = async (req, res=response) => {
    const products = await container.getAllProducts();
    console.log(products);
    res.render('./products/productslist',{ products });
}

// se usa para mostrar el formulario de creacion y el formulario de edicion
//http://localhost:3000/products/new  OR  //http://localhost:3000/products/:id/edit
const showProductsFormEdit = async (req, res=response) => {
    const { id } = req.params;  //el request params es todo lo que esta con :.  Las llaves lo que hace es desestructurar una propiedad de un request params (parametros)
    
    if(id){// para editar
        const product = await container.getProductById(id);
        res.render('./products/productsform',{ product });
    }else{// para crear
        res.render('./products/productsform',{product:null});
    }
}

const showProductDetail = (req, res=response) => {
    res.render('./products/productDetails',{});
}


//http://localhost:3000/products
const createProduct = async (req, res=response) => {

    const result = await container.createProduct(req.body);
    const products = await container.getAllProducts();
    
    if(result){
        // return res.status(200).json({
        //     ok: true,
        //     data: result
        // });
        return res.render('./products/productslist',{ products });
    }else {
        // return res.status(500).json({
        //     ok: false,
        //     message: 'Error en servidor'
        // });
        res.render('./products/productsform',{product:null});
    }
}

const updateProduct = async (req, res=response) => {

    console.log(req.params);

    const result = await container.updateProduct(req.params.id, req.body);
    const products = await container.getAllProducts();
    if (result){
        // return res.status(200).json({
        //     ok:true,
        //     data: result
        // })
        return res.render('./products/productslist',{ products });
    }
    else{
        // return res.status(500).json({
        //     ok:false,
        //     message: 'Error en el servidor'
        // })
        return res.render('./products/productslist',{ products });
    }
}

const deleteProduct = async (req, res=response) => {
    const result= await container.deleteProductById(req.params.id);
    if (result){
        // return res.status(200).json({
        //     ok:true,
        //     data: result
        // })
        return res.render('./products/productslist',{ products: result });
    }else{
        // return res.status(500).json({
        //     ok:false,
        //     message: 'Error en el servidor'
        // })
        return res.render('./products/productslist',{ products: result });
    }
    
    
    
}


module.exports = {
    showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct
}