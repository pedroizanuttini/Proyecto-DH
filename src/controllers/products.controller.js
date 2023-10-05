const { response } = require('express')
const fs = require('fs');

const db =require('../database/models');
const sequelize=db.sequelize;




const getProducts = async (req, res=response) => {
    try {
        const products = await db.Product.findAll();
        return res.status(200).json({
            ok:true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error:'Internal server error'
        })
    }
}



//http://localhost:3000/api/v1/products/:id
const getProductDetail = async(req, res=response) => {
    try{
        const product =db.Product.findByPk(req.params.id);

        const isLogged = req.session.userLogged ? true : false;
        return res.status(200).json({
            ok:true,
            data:product,
            isLogged
        })
    }catch{
        return res.status(500).json({
            error:'Internal server error'
        })
    }
}




//http://localhost:3000/api/v1/products
const createProduct = async (req, res=response) => {
    console.log(req.body);

    try{
       const newProduct = await db.Product.create({
              ...req.body
            });

        return res.status(201).json({
            ok:true,
            data:newProduct
        })
    }catch{
        return res.status(500).json({
            ok:false,
            error:'Internal server error'
        })
    }
    
}

// const otherThingHappened = () => {
//     // do other logic, update price?
//     await updateProductService("product1", { price: 50 })
// }

const mockProductRepo = {
    update: (id, body) => {
        console.log(`I will update the product ${id} with ${body}`, )
    }
}

const realProductRepo = {
    update: (id, body) => {
        return db.Product.update(body, { where: { id } })
    }
}

// const memoryProductRepo = {
    
// }


// const updateProductService = (productRepo, id, body) => {
//     const product= await productRepo.update(body, {where: { id }})
// }


const updateProduct = async (req, res=response) => {
    //preguntar si esto esta bien???
    try{ 
// body = { name: 'Beer', superSecretColumnDontTouch: 'Whoops, otherRandomProperty: 'blah }
// Product Table = { title: string, superSecretColumnDontTouch: string }

        const productRepo = isTesting ? mockProductRepo : realProductRepo
        const product = await updateProductService(productRepo, req.params.id, { title: req.body.name })
        return res.status(200).json({
            ok:true,
            data:[product]
        })
    //res.redirect("./products/productslist")
    }catch(e){
        return res.status(500).json({
            ok:false,
            error: 'Error en el servidor'})
    }
    

}

const deleteProduct = async (req, res=response) => {
    try{
        const product= await db.Product.destroy({where:{id:req.params.id}})
        console.log('se elimina archivo ',product)
        return res.json({
            ok: true,
            status: 201
        })


        
    }catch(e){
        return res.status(500).json({
            ok:false,
            message: 'Error en el servidor'
        }) 
    
}
    
 
    
}


module.exports = {
    createProduct, updateProduct, deleteProduct, getProducts, getProductDetail
}