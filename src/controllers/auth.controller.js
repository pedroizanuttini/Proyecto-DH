const { response } = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db =require('../database/models');




// funcion para crear un usuario 
const createUser = async (req, res = response) => {


    const user = { ...req.body, avatar: req.file.filename };

    try {
        // validar email único
        const emailExist = await db.User.findOne({ where: {email:req.body.email} });
        // if(emailExist) return res.json({ ok: false, msg: 'Email ya registrado' });
        if(emailExist) {
            return res.json({ok: false, msg:'Email ya esta registrado'});
            //return res.render('register', { error: 'Email ya esta registrado' })
        };
        
        
        // encriptar la contraseña con bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt)


        const newUser = await db.User.create({
            ...user,
            role_id: req.body.role === 'user_role' ? 1 : req.body.role === 'admin_role' ? 2 : 0,
        });

        console.log(newUser)


        res.json({ ok: true, user: newUser });
        // return res.redirect('login');

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Error en servidor' });
        // return res.render('register', { error: 'Error en servidor' });
        // res.send("error")
    }
}

const login = async (req, res = response) => { // se encarga de ver si el email y password son correctos
    console.log("el request body en login es", req.body)
    const { email } = req.body;
    try {
        
        // consulto por un usuario con el email que se ingreso en el body
        // const user = await users.find( el => el.email === email);
        const user = await db.User.findOne({ where:{email}, include:[{model:db.Role, as:'role'}] }) // incluyo el rol del usuario);
        // verifico si existe un usuario con ese email, en caso contrario retorno la misma pagina de login pero con un mensaje de error
        if (!user) {
            return res.json({ ok: false, msg: 'Credenciales incorrectas' });
        }

        // confirmar si el password coincide con el password encriptado
        const validPassword = bcrypt.compareSync(req.body.password, user.password);

        if (validPassword) {
            console.log('user: ',user.role.name);
            req.session.userLogged = user;
            console.log(user);
            user.password = null; //elimino contrasena.
            return res.json({ ok: true, user });
            
            //return res.redirect('/home');
            //user es la clave y el valor es el objeto (lo que esta entre llaves).

        } else {
            console.error('Credenciales incorrectas');
            return res.json({ ok: false, msg: 'Credenciales incorrectas' });
             
            // return res.render('login', { user: null, errorMsg: 'Credenciales incorrectas'});
        }


    } catch (error) {
        console.log('In catch error: ',error);
        return res.json({ ok: false, msg: 'Error en servidor' });

        //return res.render('login', { user: null, errorMsg: 'Error en servidor' });
        
    }
}

module.exports = {
    createUser,
    login
}