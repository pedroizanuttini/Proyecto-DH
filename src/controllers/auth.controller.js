const { response } = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db =require('../database/models');

const showLogin = (req, res = response) => {

    console.log(req.cookies);
    // si en las cookies ya existe la informacion del usuario
    try{
        if (req.cookies.user) {
            return res.render('login', { user: req.cookies.user, errorMsg: null  });
        }
    
        // si el usuario nunca antes se logueo o no selecciono el check de "recordar usuario"
        return res.render('login', { user: null, errorMsg: null });
    } catch(error){
        console.log(error);
        return res.redirect('/vistaError')
    }
    
}

const showRegister = (req, res = response) => {
    try{
        res.render('register', { error: null });        
    }
    catch(error){
        console.log(error)
        return res.redirect('vistaerror')
    }
}

// funcion para crear un usuario 
const createUser = async (req, res = response) => {

    console.log(req.file, req.body);

    const image = fs.readFileSync(req.file.path);
    
    // convertir a base64
    const imageBase64 = image.toString('base64');

    const user = { ...req.body, avatar: imageBase64 };

    try {
        // validar email único
        const emailExist = await db.User.findOne({ where: {email:req.body.email} });
        // if(emailExist) return res.json({ ok: false, msg: 'Email ya registrado' });
        if(emailExist) return res.render('register', { error: 'Email ya registrado' });
        
        // validar Role
        const role = await db.Role.findOne({ where:{ name:req.body.role } })
        // if(!role) return res.json({ ok: false, msg: 'Role no existe' });
        if(!role) return res.render('register', { error: 'Role no existe' });


        // encriptar la contraseña con bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt)

        console.log('ID DEL ROLE',role.id)

        const newUser = await db.User.create({
            ...user,
            role_id: role.id
        });
        console.log('usuario creado: ',newUser)

        fs.unlinkSync(req.file.path);

        // res.json({ ok: true, user: newUser });
        return res.redirect('/login');

    } catch (error) {
        console.log(error);
        // return res.json({ ok: false, msg: 'Error en servidor' });
        return res.render('register', { error: 'Error en servidor' });
    }
}

const login = async (req, res = response) => { // se encarga de ver si el email y password son correctos

    const { email, password, reminder } = req.body;
    console.log(req.body)
    try {
        
        // consulto por un usuario con el email que se ingreso en el body
        // const user = await users.find( el => el.email === email);
        const user = await db.User.findOne({ where:{email}, include:[{model:db.Role, as:'role'}] }) // incluyo el rol del usuario);
        console.log('user: ',user)
        // verifico si existe un usuario con ese email, en caso contrario retorno la misma pagina de login pero con un mensaje de error
        if (!user) {
            return res.render('login', { user: null, errorMsg: 'Credenciales incorrectas' });
            // return res.json({ ok: false, msg: 'Credenciales incorrectas' });
        }

        // confirmar si el password coincide con el password encriptado
        const validPassword = bcrypt.compareSync(password, user.password);

        if (validPassword) {
            // creamos una cookie, la mandamos al navegar y luego redireccionamos a /home
            req.session.userLogged = user;
            delete user.password;  //elimino contrasena.
            //user es la clave y el valor es el objeto (lo que esta entre llaves).
            return reminder ? res.cookie('user', { email }).redirect('/home') : res.redirect('/home');
            // return res.json({ ok: true, user: user });
        } else {
            console.error('Credenciales incorrectas');
            return res.render('login', { user: null, errorMsg: 'Credenciales incorrectas'});
            // return res.json({ ok: false, msg: 'Credenciales incorrectas' });
        }


    } catch (error) {
        console.log('In catch error: ',error);
        return res.render('login', { user: null, errorMsg: 'Error en servidor' });
        // return res.json({ ok: false, msg: 'Error en servidor' });
    }
}

module.exports = {
    showLogin,
    showRegister,
    createUser,
    login
}