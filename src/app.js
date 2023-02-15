const express= require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

class App {

    app;
    port;
    apiPaths = {
        home:'/home',
        cart:'/cart',
        auth:'/auth',
        products:'/products'
    };
    
    constructor(){
        this.app = express();
        this.port = 3000;

        // ejecucion de middlewares
        this.middlewares();
        // ejecucion de rutas
        this.routes();
        // ejecucion de motor de plantillas
        this.views();
    }   

    middlewares(){
        // lectura del body
        this.app.use(express.json());

        // parseo del body JSON ---> jasvascript
        this.app.use(express.urlencoded({ extended: true }));

        // parseo de las cookies
        this.app.use(cookieParser());

        // directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.home, require('./routes/index.routes'));
        this.app.use(this.apiPaths.auth, require('./routes/auth.routes'));
        this.app.use(this.apiPaths.cart, require ('./routes/carrito.routes'));
        this.app.use(this.apiPaths.products, require('./routes/products.routes'));
    }

    
    views(){
        // ubicacion de las vistas
        this.app.set("views", path.join(__dirname, "./views"));
        // definicion del motor de plantillas
        this.app.set("view engine", "ejs");
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}

module.exports = App