const path = require('path');
const fs = require('fs');

class UserContainer{

    filePath;

    constructor( file ){
        this.filePath = path.join(__dirname,`../data/${file}`);
    }

    async getAllUsers(){
        try{
            const data = await fs.promises.readFile(this.filePath, 'utf-8'); 
            const users = await JSON.parse(data);
            return users;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async createUser(newUser){
        try{
            const users = await this.getAllUsers();
            newUser.id=users.length +1;
            users.push(newUser);
            await fs.promises.writeFile(this.filePath, JSON.stringify(users));  //escribir la nueva lista de usuarios al json, y con el stringify lo paso a formato Json.
            return newUser;
        }catch(error){
            console.log(error);
            return null;
        }
    }


    async getUserByEmail(email){
        try {
            const users = await this.getAllUsers();
            const result = users.find( user => user.email === email );

            return result;

        } catch (error) {
            console.log(error);
            return null;
        }

    }




}

module.exports = {
    UserContainer
}


// const userContainer = new UserContainer('user.js')