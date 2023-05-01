// variables
const form = document.querySelector('.form');  //capturo el form.
const fname = document.querySelector('#fname')
const lname = document.querySelector('#lname')
const avatar = document.querySelector('#avatar')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
console.log(fname);
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

// funciones


// eventos
fname.addEventListener('input', (event) => {
    console.log(event.target.value);
})

// ejecuciones inmediatas 

//consignas
//-Apenas cargue le formulario, debemos posicionarnos o tner el foco en 'Titulo de la pelicula' de forma automatica.
// Si se trata de enviar el formulario (presionando el boton "Agregar") estando todos o algun campo vacio -o que no cumpla con los requerimientos-, no sera posible.


form.addEventListener('submit', (e) => {
    e.preventDefault(); //evito que se envie el formulario y se refresque la pagina.

    console.log(form.elements);

    //capturo elementos.
    const errors = [];  //guardo los errores para despues mostrarlos en pantalla

    if (fname.value.trim() < 2) {  // ' carlos gimenez '.trim() => 'carlos gimenez'  //trim() elimina los espacios en blanco
        errors.push('El nombre tiene que tener al menos dos caracteres')          //is.valid{color:red, borde:2px solid red;}
        fname.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else {
        fname.classList.remove('is-invalid')
        fname.classList.add('is-valid')
    }

    if (lname.value.trim() <2 ) {  //trim() elimina los espacios en blanco
        errors.push('El titiulo no puede estar vacio')          //is.valid{color:red, borde:2px solid red;}
        lname.classList.add('is-invalid')                 
    }
    else {
        lname.classList.remove('is-invalid')
        lname.classList.add('is-valid')
    }

    if (avatar.files[0].type.includes('.jpg') || avatar.files[0].type.includes('.png') || avatar.files[0].type.includes('.jpeg')) {
        errors.push('la extensión del archivo no es válida')          //is.valid{color:red, borde:2px solid red;}
        avatar.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else {
        avatar.classList.remove('is-invalid')
        avatar.classList.add('is-valid')
    }

    if (email.value.trim() == '') {
        errors.push('El email no puede estar vacio')          //is.valid{color:red, borde:2px solid red;}
        email.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else {
        email.classList.remove('is-invalid')
        email.classList.add('is-valid')
    }

    if(!reEmail.test(email.value.trim())){ 
        errors.push('El email no es valido')          //is.valid{color:red, borde:2px solid red;}
        email.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else{
        email.classList.remove('is-invalid')
        email.classList.add('is-valid')
    }

    if (password.value.trim() <= 8) {
        errors.push('El titiulo no puede estar vacio')          //is.valid{color:red, borde:2px solid red;}
        password.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else {
        password.classList.remove('is-invalid')
        password.classList.add('is-valid')
    }

    if(!rePassword.test(password.value.trim())){
        errors.push('El password no es valido')          //is.valid{color:red, borde:2px solid red;}
        password.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else{
        password.classList.remove('is-invalid')
        password.classList.add('is-valid')
    }

    if (errors.length > 0) return

    // si no tengo errores entonces envio el formulario
    console.log('enviando formulario...')
})