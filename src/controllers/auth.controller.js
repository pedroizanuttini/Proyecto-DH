const { response } = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, `../data/users.json`);

const showLogin = (req, res = response) => {

    console.log(req.cookies);
    // si en las cookies ya existe la informacion del usuario
    if (req.cookies.user) {
        return res.render('login', { user: req.cookies.user });
    }

    // si el usuario nunca antes se logueo o no selecciono el check de "recordar usuario"
    return res.render('login', { user: null });
}

const showRegister = (req, res = response) => {
    res.render('register', { error: null });
}

// funcion para crear un usuario 
const createUser = async (req, res = response) => {

    console.log(req.file, req.body)

    const types = ['jpg', 'png', 'jpeg'];
    const arrayFileName = req.file.originalname.split('.');   //Divide un string de acuerdo a una condicion
    const extension = arrayFileName[arrayFileName.length - 1];
    const extensionResult = types.includes(extension);

    if (!extensionResult) {
        return res.render('register', { error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}` })
        // return res.status(400).json({
        //     ok:false,
        //     error: `${extension} no es una extensión permitida, las extensiones válidas son:${types}`
        // })
    }

    const user = { ...req.body, avatar: `${req.file.destination}/${req.file.filename}.${extension}` }

    try {
        // Me traigo todos los usuarios existentes
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const users = await JSON.parse(data);

        const emailExist = users.some( el => el.email ===  user.email); //El some te devuelve un booleano para saber si tengo un elemento en el array.
        if (emailExist) {
            return res.render('register', { error: `${user.email} ya se encuentra vinculado a un usuario existente` })
            // return res.status(400).json({
            //     ok:false,
            //     error: `${user.email} ya se encuentra vinculado a un usuario existente`
            // })
        }
        // encriptar la contraseña con bcrypt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt)

        user.id = users.length + 1;
        users.push(user);
        await fs.promises.writeFile(filePath, JSON.stringify(users));

        res.render('login', { user: null });

    } catch (error) {
        console.log(error);
        return error;
    }
}

const login = async (req, res = response) => { // se encarga de ver si el mail y password son correctos

    const { email, password, reminder } = req.body;
    console.log(req.body)
    try {
        // me traigo todos los usuarios del json
        const data = await fs.promises.readFile(filePath, 'utf-8');
        const users = await JSON.parse(data);
        // consulto por un usuario con el email que se ingreso en el body
        const user = await users.find( el => el.email === email);
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