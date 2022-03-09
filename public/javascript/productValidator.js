function qs (element){
    return document.querySelector(element)
}

window.addEventListener('load',function (){
    let $productName = qs('#productName'),
        $productErrors = qs('#productErrors'),
        $productSize = qs('#productSize'),
        $sizeErrors = qs('#sizeErrors'),
        $perPrice = qs('#perPrice'),
        $priceErrors = qs('#priceErrors'),
        $productColor = document.querySelectorAll('.productColor'),
        $colorErrors = qs('#colorErrors'),
        $image = qs('#image'),
        $imageErrors = qs('#imageErrors'),
        $form = qs('#form'),
        $submitErrors = qs('#submitErrors'),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExSize = /^[0-9]+(,[0-9]+)*$/,
        regExPrice = /^[0-9]{1,10}$/,

    validationsErrors = false
    //console.log($productName)
    $productName.addEventListener('blur', function() { //blur cuando sale del campo
        switch(true){
            case !$productName.value.trim(): //Si esta vacio devuelve false
                $productErrors.innerHTML = 'El campo nombre es obligatorio';//muestre el error debajo del input
                $productName.classList.add('text-danger');
                validationsErrors = true;
                break;
            case $productName.length < 5:
                $productErrors.innerHTML = 'El nombre debe contener al menos 5 letras'
                $productName.classList.add('text-danger')
                break;
            default:
                $productName.classList.remove('text-danger');
                $productErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })
    //console.log($productSize)
    $productSize.addEventListener('blur', function() { //blur cuando sale del campo
        switch(true){
            case !$productSize.value.trim(): //Si esta vacio devuelve false
                $sizeErrors.innerHTML = 'El talle es obligatorio';//muestre el error debajo del input
                $productSize.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExSize.test($productSize.value):
                $sizeErrors.innerHTML = 'Ingrese numeros separados por coma (,)';//muestre el error debajo del input
                $productSize.classList.add('is-invalid');
                break;
            default:
                $productSize.classList.remove('is-invalid');
                $productSize.classList.add('is-valid');
                $sizeErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

        //console.log($perPrice)
        $perPrice.addEventListener('blur', function(event) { //blur cuando sale del campo
            switch(true){
            case !$perPrice.value: //Si esta vacio devuelve false
                $priceErrors.innerHTML = 'El precio es obligatorio';//muestre el error debajo del input
                $perPrice.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExPrice.test($perPrice.value):
                $priceErrors.innerHTML = 'Ingrese solo numeros';//muestre el error debajo del input
                $perPrice.classList.add('is-invalid');
                break;
            default:
                $perPrice.classList.remove('is-invalid');
                $perPrice.classList.add('is-valid');
                $priceErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })
    /* $terms.addEventListener('click', function () {
        $terms.value = "on"
        $terms.classList.toggle('is-valid')
        $terms.classList.remove('is-invalid')
        $termsErrors.innerHTML = ""
    })
    if (!$terms.checked) {
        $terms.classList.add('is-invalid')
        $termsErrors.innerHTML = 'Debes aceptar los términos y condiciones'
        error = true
    } */
    /* $productColor.forEach(color => {
        color.addEventListener('change',function(event){
            let valor = false;
            //console.log(event.target.checked) 
            // target devuelve el input 
            // target.checked devuelve true o false
            // target.value devuelve el id
            for(let i = 0 ; i< $productColor.length ; i++){
                console.log($productColor[i].checked)
                if($productColor[i].checked == true){
                    valor=true;
                }else{
                    valor=false;
                }
            }
                if(!valor){
                    $productColor.classList.add('is-invalid');
                    $colorErrors.innerHTML= 'Ingresa al menos un color';
                    validationsErrors = true;
                }else {
                    $productColor.classList.add('is-valid');
                    $colorErrors.innerHTML= '';
                    validationsErrors = false;
                    }
        })
    }) */
        if($image){
            $image.addEventListener('change', function fileValidation(){
                let filePath = $image.value; //Captura el value del input (imagen)
                let allowedExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i;
            if(!allowedExtensions.exec(filePath)){//El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
                $imageErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)'
                $image.value = '';
                $imgPreview.innerHTML = '';
                return false;
            } else {
                //Image preview
                //console.log($image.files)
                if($image.files && $image.files[0]){
                    let reader = new FileReader();
                    reader.onload = function(e){
                        $imgPreview.innerHTML = `<img src="${e.target.result}" alt="">`
                    }
                    reader.readAsDataURL($image.files[0]);
                    $imageErrors.innerHTML = '';
                    $image.classList.remove('is-invalid')
                }
             }
            })
        }
        //console.log($form)


        $form.addEventListener('submit', function(event) {
            event.preventDefault();
            let checked = 0
            let error = false;
            let elementsForm = this.elements;
            $productColor.forEach(color => {
              if(color.checked == true) {
                checked++
              } 
            })
            if(checked < 1) { 
              $colorErrors.innerHTML= "Debe seleccionar un color"
            } else {
              $colorErrors.innerHTML= ""
            }
    
            for (let index = 0; index< elementsForm.length - 2;index++){
                if(elementsForm[index].value ==''){
                    //console.log(elementsForm[index])Miro el valor que tiene ''
                    elementsForm[index].classList.add('is-invalid');
                    $submitErrors.innerHTML = '**Los campos señalados son obligatorios**';
                    error = true;
                }
            }
            if(!error && !validationsErrors){
                console.log(!error)
                $form.submit();
            }
    
        })
}) 
