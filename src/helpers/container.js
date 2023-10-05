const path = require('path');
const fs = require('fs');

class DatabaseContainer {
    async getAllProducts(){
        try {
            const data = await db.Product.findAll()
            return products;  
        } catch(error) {
            console.error(error);
        }
    }
}

class FileContainer {

    filePath;

    constructor( file ){
        this.filePath = path.join(__dirname,`../data/${file}`);
    }

    async getAllProducts(){
        try {
            const data = await fs.promises.readFile(this.filePath, 'utf-8');  
            const products = await JSON.parse(data);  //json.parse me lo pasa a objecto Javascript.
            return products;  
        }catch(error) {
            console.error(error);
        }
    }

    async getProductById(id){
        try {
            const products = await this.getAllProducts();
            const result = products.find( prod => prod.id == id);
            return result;
        } catch(error) {
            console.log(error);
        }
    }


    async createProduct(newProduct){
        try{
            const products = await this.getAllProducts();
            newProduct.id= products.length+1;
            newProduct.price = parseInt(newProduct.price); //parsea el numero (precio) a entero. (el precio se guarda como numero)
            products.push(newProduct);
            await fs.promises.writeFile(this.filePath, JSON.stringify(products));
            return newProduct;
        }catch (error){
            console.log(error);
            return null;
        }
    }

    async updateProduct(id, prodUpdate){
        console.log(id)
        try {
            const products = await this.getAllProducts();
            if( products.some( prod => prod.id == id ) ){          //Some: Se fija si en el array se encuentra el id que paso como parametro.
                const newArrayProducts = products.map( prod => { //Map recorre uno a uno los elementos y los va retornando. Devuelve misma cantidad de elementos si uno no pone nada.
                    if(prod.id == id){
                        prodUpdate.id = parseInt(id);    //Todo lo que viene por req params es un string, por eso lo paso a Integer(entero).
                        return prodUpdate;
                    }
                    return prod;
                });
                await fs.promises.writeFile(this.filePath, JSON.stringify(newArrayProducts));
                return newArrayProducts;

            }else{
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteProductById( id ){
        try {
            const products = await this.getAllProducts();
            if( products.some( prod => prod.id == id ) ){      //Fuction some me dice si existe o no un elemento de acuerdo a la condicion dada.
                const newArrayProducts = products.filter( prod => prod.id != id );    //Filtra(devuelve) el array de acuerdo a la condicion dada.
                await fs.promises.writeFile(this.filePath, JSON.stringify(newArrayProducts));
                return newArrayProducts;
            }else{
                return null;
            }    
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = {
    Container
}