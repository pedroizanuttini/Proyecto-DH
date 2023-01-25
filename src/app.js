const express= require('express');
const path = require('path');

class App {

    app;
    port;
    apiPaths = {
        home:'/home',
        cart:'/cart',
        auth:'/auth'
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

        // directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.home, require('./routes/index.routes'));
    }


    
    views(){
        // ubicacion de las vistas
        this.app.set("views", path.join(__dirname, "./views"));
        // definicion del motor de plantillas
        this.app.set("view engine", "ejs");
    }

    listen(){
        this.server.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}

// const express= require('express');
// const app=express();
// const path = require('path');
// app.use('static', express.static(__dirname + '/public'));
// app.use(express.static('public'));
// app.listen(3000, () => {
//     console.log('Servidor corriendo en el servidor 3000')
// });
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname + '/views/home.html'));
// });
// app.get('/login',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/login.html'));
// });
// app.get('/register',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/register.html'));
// });
// app.get('/carrito',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/views/carrito.html'));
// });