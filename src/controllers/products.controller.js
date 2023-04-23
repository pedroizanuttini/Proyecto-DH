const { response } = require('express')
const fs = require('fs');

const db =require('../database/models');
const sequelize=db.sequelize;


const showProducts = async (req, res=response) => {      

    try {

        const products = await db.Product.findAll({
            include:[{association:"category"}]
        })

       return res.render('./products/productslist',{ products });

    } catch (error) {
        console.error(error);
         return res.redirect('/home')
    }

}

// se usa para mostrar el formulario de creacion y el formulario de edicion
//http://localhost:3000/products/new  OR  //http://localhost:3000/products/:id/edit  
const showProductsFormEdit = async (req, res=response) => {
    try {
        const { id } = req.params;
        const categories = await db.Category.findAll(); 

        if(id){// para editar
            const product = await db.Product.findByPk(id,{include:[{association:"categories"}]});
            res.render('./products/productsform',{ product, categories, error:null});
        }else{// para crear
            console.log('categories',categories);
            res.render('./products/productsform',{product:null, categories, error:null});
        } 
        } catch (error) {
            console.log(error)
            // return res.redirect('/notFound') //return res.redirect('/vista404')
        }
    }

    // try{
    //     const { id } = req.params;  //el request params es todo lo que esta con :.  Las llaves lo que hace es desestructurar una propiedad de un request params (parametros)
    //     const product= await Product.findByPk(id,{include: [{association: "categories"}]})
    //     const allCategories= await Category.findAll()
    //     return res.render("moviesEdit",{product,allCategories}); 
    // } catch (error) {
    //     return res.status(500).json({
    //     error:'Internal server error'
    // })
    // }
    
    

    //  try {
    //     const { id } = req.params;
    //     const categories = await db.Category.findAll(); 
    //     if(id){// para editar
    //         const product = await Product.findByPk(id);
    //         res.render('./products/productsform',{ product,error:null, categories });
    //     }else{// para crear
    //         res.render('./products/productsform',{product:null,error:null, categories});
    //     } 
    //     } catch (error) {
    //         return res.status(500).json({
    //         error:'Internal server error'
    //     })
    // }


    


const showProductDetail = async(req, res=response) => {    
    try{
        const product =db.Product.findByPk(req.params.id);
    return res.render('/products/productDetails',{ product });
    }catch{
        res.redirect('/notFound');
    }
    

}


//http://localhost:3000/products
const createProduct = async (req, res=response) => {
    
    console.log('req.file',req.file);
    console.log('req.body',req.body);
    try{
       const newProduct = await db.Product.create({
              ...req.body,
                image: req.file.filename
            });

        
        return res.redirect('/products');
    }catch(e){
        console.error(e);
        // res.render('./notFound'); //aca en realidad deberia ir vista de error de codigo
          

    } 
}

    // const image = fs.readFileSync(req.file.path);
    // // convertir a base64
    // const imageBase64 = image.toString('base64');
    // console.log('base64: ',imageBase64)
    // const types = ['jpg', 'png', 'jpeg'];
    // const arrayFileName = req.file.originalname.split('.');   //Divide un string de acuerdo a una condicion
    // const extension = arrayFileName[arrayFileName.length - 1]; // ['c','documents','hefefgrwg6g1rw6g',<'jpg'>] // Obtengo la extension del archivo
    // const extensionResult = types.includes(extension); // types.includes.includes('jpeg') ---> devuelve es un boolean

    // if (!extensionResult) {
    //     return res.render('products/productsform', {product:null, error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}` })
    //     // return res.status(400).json({
    //     //     ok:false,
    //     //     error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}`
    //     // })
    // }

//     const product = { ...req.body, image: imageBase64 }
//     try {
        
//        product.price = parseInt(product.price);
//        const newProduct = await Product.create(product);
      
//        fs.unlinkSync(req.file.path); 

//        return res.redirect('/products');
//    } catch (error) {
//     console.log(error);
//        res.render('./products/productsform',{product:null, error});
//    }


const updateProduct = async (req, res=response) => {
    //preguntar en este metodo como hacer para renderizar la lista de productos actualizada
    try{
        const product= await db.Product.update({
            ...req.body
        },{where: {id:req.params.id}})
    res.redirect("./products/productslist")
    }catch(e){
        return res.redirect('./notFound')  //vista error de codigo en realidad
    }
    // if (data==0) throw new Error('Hubo un error al actualizar')
    // res.send(data)

    // console.log(req.params);
    // const prodUpdate = req.body
    // const { id } = req.params
    // try {
    //     //me traigo todos los productos
    //     const data = await fs.promises.readFile(filePath, 'utf-8');  
    //     const products = await JSON.parse(data);

    //     if( products.some( prod => prod.id == id ) ){  //Some devuelve lo que se esta preguntando. Devuelve un booleano True o False.
    //         const newArrayProducts = products.map( prod => { //Map recorre uno a uno los elementos y los va retornando. Devuelve misma cantidad de elementos si uno no pone nada.
    //             if(prod.id == id){
    //                 prodUpdate.id = parseInt(id);    //Todo lo que viene por req params es un string, por eso lo paso a Integer(entero).
    //                 return prodUpdate;
    //             }
    //             return prod;
    //         });

    //         await fs.promises.writeFile(filePath, JSON.stringify(newArrayProducts));

    //         return res.render('./products/productslist',{ newArrayProducts });
    //     }
    //     else{
            
    //         return res.render('./products/productslist',{ products });
    //     }
        
    // } catch (error) {
    //     console.log(error);
    // }

}

const deleteProduct = async (req, res=response) => {
    //Lo mismo aca quiero que me devuelva la lista con todos los productos menos el
    try{
        const product= await Product.destroy({where:{id:req.params.id}})
    return res.render('./products/productslist');
    }catch(e){
        res.redirect('./notFound')
    } //PReguntar: no le tengo que pasar el parametro products??
    
    
    
    
        // const { id } = req.params;
    // try{
    //     const product = await db.Product.destroy({where: {id:req.params.id}});
    //     res.send(product)
    // }catch(e){
    //     console.log(e)
    // }


    // try {
    //     //me traigo todos los productos
    //     const data = await fs.promises.readFile(filePath, 'utf-8');  
    //     const products = await JSON.parse(data);
        
    //     if( products.some( prod => prod.id == id ) ){
    //         const newArrayProducts = products.filter( prod => prod.id != id );    //Filtra(devuelve) el array de acuerdo a la condicion dada.
    //         await fs.promises.writeFile(filePath, JSON.stringify(newArrayProducts));

    //         return res.render('./products/productslist',{ products: newArrayProducts });
    //     }else{
    //         // return res.status(500).json({
    //         //     ok:false,
    //         //     message: 'Error en el servidor'
    //         // })
    //         return res.render('./products/productslist',{ products });
    //     }

    // } catch (error) {
    //     console.error(error);
    // }

    
    
    
}


module.exports = {
    showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct
}