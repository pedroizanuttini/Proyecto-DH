const form = document.querySelector('.form');  //capturo el form.
const name = document.querySelector('#name')
const description = document.querySelector('#description')
const image = document.querySelector('#image')
const category = document.querySelector('#category')
const price = document.querySelector('#price')
const stock = document.querySelector('#stock')

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
console.log(fname);
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

fname.addEventListener('input', (event) => {
    console.log(event.target.value);
})


form.addEventListener('submit', (e) => {
    e.preventDefault(); //evito que se envie el formulario y se refresque la pagina.

    console.log(form.elements);

    //capturo elementos.
    const errors = [];  //guardo los errores para despues mostrarlos en pantalla

    if (name.value.trim() < 3) {  // ' carlos gimenez '.trim() => 'carlos gimenez'  //trim() elimina los espacios en blanco
        errors.push('El nombre tiene que tener al menos dos caracteres')          //is.valid{color:red, borde:2px solid red;}
        name.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else {
        name.classList.remove('is-invalid')
        name.classList.add('is-valid')
    }

    if (description.value.trim() <20 ) {  //trim() elimina los espacios en blanco
        errors.push('El titiulo no puede estar vacio')          //is.valid{color:red, borde:2px solid red;}
        description.classList.add('is-invalid')                 
    }
    else {
        description.classList.remove('is-invalid')
        description.classList.add('is-valid')
    }

    if (image.files[0].type.includes('.jpg') || avatar.files[0].type.includes('.png') || avatar.files[0].type.includes('.jpeg')) {
        errors.push('la extensión del archivo no es válida')          //is.valid{color:red, borde:2px solid red;}
        image.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else {
        image.classList.remove('is-invalid')
        image.classList.add('is-valid')
    }

    if (category.value.trim() == '') {
        errors.push('El email no puede estar vacio')          //is.valid{color:red, borde:2px solid red;}
        category.classList.add('is-invalid')                  //is.valid {color: green border: 2px solid green}
    }
    else {
        category.classList.remove('is-invalid')
        category.classList.add('is-valid')
    }

    

    if (errors.length > 0) return

    // si no tengo errores entonces envio el formulario
    console.log('enviando formulario...');
})