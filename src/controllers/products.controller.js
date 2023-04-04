const { response } = require('express')
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, `../data/products.json`);

const Product = require('../models/product.model');

const showProducts = async (req, res=response) => {      
    const data = await fs.promises.readFile(filePath, 'utf-8');  
    const products = await JSON.parse(data);
    console.log(products);
    res.render('./products/productslist',{ products });
}

// se usa para mostrar el formulario de creacion y el formulario de edicion
//http://localhost:3000/products/new  OR  //http://localhost:3000/products/:id/edit  
const showProductsFormEdit = async (req, res=response) => {
    const { id } = req.params;  //el request params es todo lo que esta con :.  Las llaves lo que hace es desestructurar una propiedad de un request params (parametros)
    
    if(id){// para editar
        const data = await fs.promises.readFile(filePath, 'utf-8');  
        const products = await JSON.parse(data);
        const product = products.find( el => el.id == id);
        res.render('./products/productsform',{ product,error:null });
    }else{// para crear
        res.render('./products/productsform',{product:null,error:null});
    }
}

const showProductDetail = async(req, res=response) => {    

    const {id} =req.params;
    try {
        //me traigo todos los productos
        const data = await fs.promises.readFile(filePath, 'utf-8');  
        const products = await JSON.parse(data);
        const product = products.find( el => el.id == id);
        res.render('./products/productDetails',{ product });
        

    } catch (error) {
        return res.status(400).json({
            error:'Producto no encontrado'
        })
    }
}


//http://localhost:3000/products
const createProduct = async (req, res=response) => {

    const image = fs.readFileSync(req.file.path);
    // convertir a base64
    const imageBase64 = image.toString('base64');
    
    const types = ['jpg', 'png', 'jpeg'];
    const arrayFileName = req.file.originalname.split('.');   //Divide un string de acuerdo a una condicion
    const extension = arrayFileName[arrayFileName.length - 1]; // ['c','documents','hefefgrwg6g1rw6g',<'jpg'>] // Obtengo la extension del archivo
    const extensionResult = types.includes(extension); // types.includes.includes('jpeg') ---> devuelve es un boolean

    if (!extensionResult) {
        return res.render('productsform', { product:null,error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}` })
        // return res.status(400).json({
        //     ok:false,
        //     error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}`
        // })
    }

    const product = { ...req.body, image: imageBase64 }
    console.log(product);
    try {
        
       product.price = parseInt(product.price);
       const newProduct = await Product.create(product);
      
       fs.unlinkSync(req.file.path); 

       return res.redirect('/products');
   } catch (error) {
    console.log(error);
       res.render('./products/productsform',{product:null, error});
   }
}

const updateProduct = async (req, res=response) => {
    console.log(req.params);
    const prodUpdate = req.body
    const { id } = req.params
    try {
        //me traigo todos los productos
        const data = await fs.promises.readFile(filePath, 'utf-8');  
        const products = await JSON.parse(data);

        if( products.some( prod => prod.id == id ) ){  //Some devuelve lo que se esta preguntando. Devuelve un booleano True o False.
            const newArrayProducts = products.map( prod => { //Map recorre uno a uno los elementos y los va retornando. Devuelve misma cantidad de elementos si uno no pone nada.
                if(prod.id == id){
                    prodUpdate.id = parseInt(id);    //Todo lo que viene por req params es un string, por eso lo paso a Integer(entero).
                    return prodUpdate;
                }
                return prod;
            });

            await fs.promises.writeFile(filePath, JSON.stringify(newArrayProducts));

            return res.render('./products/productslist',{ newArrayProducts });
        }
        else{
            
            return res.render('./products/productslist',{ products });
        }
        
    } catch (error) {
        console.log(error);
    }

}

const deleteProduct = async (req, res=response) => {

    const { id } = req.params;

    try {
        //me traigo todos los productos
        const data = await fs.promises.readFile(filePath, 'utf-8');  
        const products = await JSON.parse(data);
        
        if( products.some( prod => prod.id == id ) ){
            const newArrayProducts = products.filter( prod => prod.id != id );    //Filtra(devuelve) el array de acuerdo a la condicion dada.
            await fs.promises.writeFile(filePath, JSON.stringify(newArrayProducts));

            return res.render('./products/productslist',{ products: newArrayProducts });
        }else{
            // return res.status(500).json({
            //     ok:false,
            //     message: 'Error en el servidor'
            // })
            return res.render('./products/productslist',{ products });
        }

    } catch (error) {
        console.error(error);
    }

    
    
    
}


module.exports = {
    showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct
}