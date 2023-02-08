const { response } = require('express');
const { UserContainer } = require('../helpers/userContainer');
const userContainer=new UserContainer('users.json');


const showLogin = (req, res=response) => {
    res.render('login',{});
}

const showRegister = (req, res=response) => {
    res.render('register',{});
}

const createUser = async (req, res=response) => {
    try {
        const newUser=userContainer.createUser(req.body);
        res.render('login',{});

    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    showLogin,
    showRegister,
    createUser
}