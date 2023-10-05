const express = require('express');
const path = require('path');
const db = require('./database/config/config');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors=require('cors');




class App {

    app;
    port;
    apiPaths = {
        home: '/home',
        cart: '/api/v1/cart',
        auth: '/api/v1/auth',
        products: '/api/v1/products',
        order:'/api/v1/order'
        // cart: '/cart',
        // auth: '/auth',
        // products: '/products'
    };

    //app.use(userLoggedMiddleware)

    constructor() {
        this.app = express();
        this.port = 3000;

        // conexion con base de datos
        // this.connectDDBB();
        // ejecucion de middlewares
        this.middlewares();
        // ejecucion de rutas
        this.routes();
        // ejecucion de motor de plantillas
        this.views();

    }

    // async connectDDBB(){
    //     try {
    //         await db.authenticate();
    //         await db.sync({ force:false }).then(()=>{
    //             // console.log('Roles table created successfully');
    //             // const roles = [ 'ADMIN_ROLE','USER_ROLE' ];
    //             // roles.forEach((role)=>{
    //             //     Role.create({name:role})
    //             // })
    //             // const categories = ['espumante','vino','cerveza']
    //             // categories.forEach((role)=>Category.create({name:role}));

    //         }).catch((error)=>{
    //             console.error('Unable to create table: ', error);
    //         })
    //         console.log('Connection has been established successfully.');
    //       } catch (error) {
    //         console.error('Unable to connect to the database:', error);
    //       }
    // }

    middlewares() {
        this.app.use(cors());

        // parseo del body JSON ---> jasvascript
        this.app.use(express.json());
        // lectura del body
        this.app.use(express.urlencoded({ extended: true}));
        // parseo de las cookies
        this.app.use(cookieParser());

        // directorio publico
        this.app.use(express.static('public'));

        // express session
        this.app.use(session({
            secret: "Shhh, it's a secret",
            resave: false,
            saveUninnitialized: false,
            cookie: {
                maxAge: 3600000
            }
        }));


    
    }

    routes() {
        this.app.use(this.apiPaths.home, require('./routes/index.routes'));
        this.app.use(this.apiPaths.auth, require('./routes/auth.routes'));
        this.app.use(this.apiPaths.cart, require('./routes/carrito.routes'));
        this.app.use(this.apiPaths.products, require('./routes/products.routes'));
        this.app.use(this.apiPaths.order, require('./routes/order.routes'));
    }


    views() {
        // ubicacion de las vistas
        this.app.set("views", path.join(__dirname, "./views"));
        // definicion del motor de plantillas
        this.app.set("view engine", "ejs");
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}

module.exports = App