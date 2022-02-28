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

    $inputName.addEventListener('blur', function () {
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = 'El campo nombre es obligatorio'
                $inputName.classList.add('is-invalid')
                validationsErrors = true
                break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = 'Ingrese un nombre válido'
                $inputName.classList.add('is-invalid')
                validationsErrors = true
                break

            default:
                $inputName.classList.remove('is-invalid')
                $inputName.classList.add('is-valid')
                $nameErrors.innerHTML = ""
                validationsErrors = false
                break;

        }
    })
    $inputLastname.addEventListener('blur', function () {

        switch (true) {
            case !$inputLastname.value.trim():
                $lastnameErrors.innerHTML = 'El campo apellido es obligatorio'
                $inputLastname.classList.add('is-invalid')
                validationsErrors = true
                break;
            case !regExAlpha.test($inputLastname.value):
                $lastnameErrors.innerHTML = 'Ingresa un apellido válido'
                $inputLastname.classList.add('is-invalid')
                validationsErrors = true
                break;
            default:
                $inputLastname.classList.remove("is-invalid");
                $inputLastname.classList.add('is-valid')
                $lastnameErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })
    
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
                $passErrors.innerHTML = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
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
    $pass2.addEventListener('blur', function () {
        switch (true) {
            case !$pass2.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio'
                $pass2.classList.add('is-invalid')
                validationsErrors = true
                break;
            case $pass2.value !== $pass.value:
                $passErrors.innerHTML = 'Las contraseñas no coinciden';
                $pass2.classList.add('is-invalid')
                validationsErrors = true
                break;
            default:
                $pass2.classList.remove("is-invalid");
                $pass2.classList.add('is-valid')
                $passErrors.innerHTML = ""
                validationsErrors = false
                break;
        }
    })

    $terms.addEventListener('click', function () {
        $terms.value = "on"
        $terms.classList.toggle('is-valid')
        $terms.classList.remove('is-invalid')
        $termsErrors.innerHTML = ""
    })

    $form.addEventListener('submit', function (event) {
        event.preventDefault();

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
    })

    $file.addEventListener('change', function fileValidation(){
        let filePath = $file.value; // Captura el valor del input
        let allowedExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i;
        if(!allowedExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $fileErrors.innerHTML = 'Archivos permitidos .jpg/.jpeg/.png/.gif'
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            //Image preview
            console.log($file.files)
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function (e) {
                    $imgPreview.innerHTML = `<img src="${e.target.result}" alt="">`
                };

                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid')
            }
        }
    })

})