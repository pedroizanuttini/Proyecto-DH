const form = document.querySelector('.form');  //capturo el form.
const email = document.querySelector('#email')
const password = document.querySelector('#password')

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

fname.addEventListener('input', (event) => {
    console.log(event.target.value);
})

form.addEventListener('submit', (e) => {
    e.preventDefault(); //evito que se envie el formulario y se refresque la pagina.

    console.log(form.elements);

    //capturo elementos.
    const errors = [];  //guardo los errores para despues mostrarlos en pantalla

    if (email.value.trim() == '') {
        errors.push('El email no puede estar vacio')          
        email.classList.add('is-invalid')                  
    }
    else {
        email.classList.remove('is-invalid')
        email.classList.add('is-valid')
    }

    if(!reEmail.test(email.value.trim())){ 
        errors.push('El email no es valido')          
        email.classList.add('is-invalid')                  
    }
    else{
        email.classList.remove('is-invalid')
        email.classList.add('is-valid')
    }

    if (password.value.trim() < 8) {
        errors.push('El titiulo no puede estar vacio')          
        password.classList.add('is-invalid')                  
    }
    else {
        password.classList.remove('is-invalid')
        password.classList.add('is-valid')
    }

    
    if(!rePassword.test(password.value.trim())){
        errors.push('El password no es valido')          
        password.classList.add('is-invalid')             
    }
    else{
        password.classList.remove('is-invalid')
        password.classList.add('is-valid')
    }


    if (errors.length > 0) return

    // si no tengo errores entonces envio el formulario
    console.log('enviando formulario...')

    

})