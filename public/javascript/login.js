function qs(element) {
    return document.querySelector(element)
}

window.addEventListener('load', function () {
    let $inputName = qs('#first_name'),
        $nameErrors = qs('#nameErrors'),
        $inputLastname = qs('#last_name'),
        $lastnameErrors = qs('#lastnameErrors'),
        $form = qs('#form'),
        $dni = qs('#dni'),
        $dniErrors = qs('#dniErrors'),
        $email = qs('#email'),
        $emailErrors = qs('#emailErrors'),
        $pass = qs('#pass1'),
        $passErrors = qs('#passErrors'),
        $pass2 = qs('#pass2'),
        $pass2Errors = qs('#pass2Errors'),
        $fecha = qs('#fecha'),
        $fechaErrors = qs('#dateErrors'),
        $sexo = qs('#sexo'),
        $sexErrors = qs('#sexErrors'),
        $terms = qs('#check'),
        $termsErrors = qs('#termsErrors'),
        $file = qs('#avatar'),
        $fileErrors = qs('#fileErrors'),
        $imgPreview = qs('#img-preview'),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExDNI = /^[0-9]{7,8}$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


    let validationsErrors = false;

    
    
    $email.addEventListener('blur', function () {
        console.log($email.value.trim())
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio'
                $email.classList.add('is-invalid')
                validationsErrors = true
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido'
                $email.classList.add('is-invalid')
                validationsErrors = true
                break;
            default:
                $email.classList.remove("is-invalid");
                $email.classList.add('is-valid')
                $emailErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })
    $pass.addEventListener('blur', function () {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio'
                $pass.classList.add('is-invalid')
                validationsErrors = true
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = 'Contraseña invalida';
                $pass.classList.add('is-invalid')
                validationsErrors = true
                break;
            default:
                $pass.classList.remove("is-invalid");
                $pass.classList.add('is-valid')
                $passErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })
    

    $form.addEventListener('submit', function (event) {
        

        let error = false;
        let elementsForm = this.elements;

        for (let index = 0; index < elementsForm.length - 1; index++) {
            if (elementsForm[index].value == ''
                //Para que los campos no sean obligatorios
                && elementsForm[index].type !== 'file'
                && elementsForm[index].type !== 'apellido'
            ) {
                elementsForm[index].classList.add('is-invalid')
                submitErrors.innerHTML = 'Los campos señalados son obligatorios';
                error = true;
            }
        }
        if (!$terms.checked) {
            $terms.classList.add('is-invalid')
            $termsErrors.innerHTML = 'Debes aceptar los términos y condiciones'
            error = true
        }
        if (!error && !validationsErrors) {
            $form.submit()
        }
        else{
            event.preventDefault();
        }
    })


})