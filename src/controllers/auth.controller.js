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


    const user = { ...req.body, avatar: req.file.filename };

    try {
        // validar email único
        const emailExist = await db.User.findOne({ where: {email:req.body.email} });
        // if(emailExist) return res.json({ ok: false, msg: 'Email ya registrado' });
        if(emailExist) return res.render('register', { error: 'Email ya registrado' });
        
        

        // encriptar la contraseña con bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt)


        const newUser = await db.User.create({
            ...user,
            role_id: req.body.role === 'user_role' ? 1 : req.body.role === 'admin_role' ? 2 : 0,
        });

        console.log(newUser)


        // res.json({ ok: true, user: newUser });
        return res.redirect('login');

    } catch (error) {
        console.log(error);
        // return res.json({ ok: false, msg: 'Error en servidor' });
        // return res.render('register', { error: 'Error en servidor' });
        res.send("error")
    }
}

const login = async (req, res = response) => { // se encarga de ver si el email y password son correctos

    const { email, password, reminder } = req.body;
    try {
        
        // consulto por un usuario con el email que se ingreso en el body
        // const user = await users.find( el => el.email === email);
        const user = await db.User.findOne({ where:{email}, include:[{model:db.Role, as:'role'}] }) // incluyo el rol del usuario);
        // verifico si existe un usuario con ese email, en caso contrario retorno la misma pagina de login pero con un mensaje de error
        if (!user) {
            return res.render('login', { user: null, errorMsg: 'Credenciales incorrectas' });
            // return res.json({ ok: false, msg: 'Credenciales incorrectas' });
        }

        // confirmar si el password coincide con el password encriptado
        const validPassword = bcrypt.compareSync(password, user.password);

        if (validPassword) {
            // creamos una cookie, la mandamos al navegar y luego redireccionamos a /home
            delete user.password;  //elimino contrasena.
            console.log('user: ',user.role.name);
            req.session.userLogged = user;
            return res.redirect('/home');
            
            //user es la clave y el valor es el objeto (lo que esta entre llaves).
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