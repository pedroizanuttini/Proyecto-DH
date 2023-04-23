const { response } = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const User = require('../database/models/User');
const Role = require('../database/models/Role')

const showLogin = (req, res = response) => {

    console.log(req.cookies);
    // si en las cookies ya existe la informacion del usuario
    try{
        if (req.cookies.user) {
            return res.render('login', { user: req.cookies.user });
        }
    
        // si el usuario nunca antes se logueo o no selecciono el check de "recordar usuario"
        return res.render('login', { user: null });
    } catch(error){
        return res.redirect('/vista404')
    }
    
}

const showRegister = (req, res = response) => {
    try{
        res.render('register', { error: null });        
    }
    catch(error){
        return res.redirect('vistaerror')
    }
}

// funcion para crear un usuario 
const createUser = async (req, res = response) => {

    console.log(req.file, req.body);

    // const image = fs.readFileSync(req.file.path);
    
    // // convertir a base64
    // const imageBase64 = image.toString('base64');

    // const types = ['jpg', 'png', 'jpeg'];
    // const arrayFileName = req.file.originalname.split('.');   //Divide un string de acuerdo a una condicion
    // const extension = arrayFileName[arrayFileName.length - 1]; 
    // const extensionResult = types.includes(extension); 

    // if (!extensionResult) {
    //     return res.render('register', { error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}` })
    //     // return res.status(400).json({
    //     //     ok:false,
    //     //     error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}`
    //     // })
    // }

    // const user = { ...req.body, avatar: `${req.file.destination}/${req.file.filename}.${extension}` }
    const user = { ...req.body, avatar: imageBase64 }

    try {
        // validar email único
        const emailExist = await User.findOne({ where: {email:req.body.email} });
        if(emailExist) return res.json({error:'El email ingresado ya existe'});
        
        // validar Role
        const role = await Role.findOne({ where:{ name:req.body.role } })
        if(!role) return res.json({ error:'El role no existe' })


        // encriptar la contraseña con bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt)

        console.log('ID DEL ROLE',role.id)

        const newUser = await User.create({
            ...user,
            roleId: role.id,
        });
        console.log('usuario creado: ',newUser)

        fs.unlinkSync(req.file.path);

        res.render('login', { user: null });

    } catch (error) {
        console.log(error);
        return error;
    }
}

const login = async (req, res = response) => { // se encarga de ver si el email y password son correctos

    const { email, password, reminder } = req.body;
    console.log(req.body)
    try {
        
        // consulto por un usuario con el email que se ingreso en el body
        // const user = await users.find( el => el.email === email);
        const user = await User.findOne({ where:{email} });
        // verifico si existe un usuario con ese email, en caso contrario retorno la misma pagina de login pero con un mensaje de error
        if (!user) {
            return res.render('login', { user: null, errorMsg: 'Credenciales incorrectas' });
        }

        // confirmar si el password coincide con el password encriptado
        const validPassword = bcrypt.compareSync(password, user.password);

        if (validPassword) {
            // creamos una cookie, la mandamos al navegar y luego redireccionamos a /home
            return reminder ? res.cookie('user', { email, password }).redirect('/home') : res.redirect('/home');
            //user es la clave y el valor es el objeto (lo que esta entre llaves).
        } else {
            return res.render('login', { user: null, errorMsg: 'Credenciales incorrectas' });
        }


    } catch (error) {
        console.log(error);
        return res.render('login', { user: null, errorMsg: 'Error en servidor' });
    }
}

module.exports = {
    showLogin,
    showRegister,
    createUser,
    login
}