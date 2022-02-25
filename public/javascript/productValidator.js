function qs (element){
    return document.querySelector(element)
}

window.addEventListener('load',function (){
    let $productName = ('#productName'),
        $productErrors = ('#productErrors'),
        $productSize = ('#productSize'),
        $sizeErrors = ('#sizeErrors'),
        $perPrice = ('#perPrce'),
        $priceErrors = ('#priceErrors'),
        $productColor = ('#productColor'),
        $colorErrors = ('#colorErrors'),
        $image = ('#image'),
        $imageErrors = ('#imageErrors'),
        $form = ('#form'),
        $submitErrors = ('#submitErrors'),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExSize = /^[0-9]{7,8}$/,

    validationsErrors = false

    $productName.addEventListener('blur', function() { //blur cuando sale del campo
        switch(true){
            case !$productName.value.trim(): //Si esta vacio devuelve false
                $productErrors.innerHTML = 'El campo nombre es obligatorio';//muestre el error debajo del input
                $productName.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExAlpha.test($productName.value):
                $productErrors.innerHTML = 'Ingrese un nombre válido';//muestre el error debajo del input
                $productName.classList.add('is-invalid');
                break;
            default:
                $productName.classList.remove('is-invalid');
                $productName.classList.add('is-valid');
                $nameErrors.innerHTML = "";
                validationsErrors = false;
                break;
        }
    })

    $productSize.addEventListener('blur', function() { //blur cuando sale del campo
        switch(true){
            case !$productSize.value.trim(): //Si esta vacio devuelve false
                $sizeErrors.innerHTML = 'El talle es obligatorio';//muestre el error debajo del input
                $productSize.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExAlpha.test($productSize.value):
                $sizeErrors.innerHTML = 'Ingrese un talle válido separados por coma (,)';//muestre el error debajo del input
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

    $perPrice.addEventListener('blur', function() { //blur cuando sale del campo
        switch(true){
            case !$perPrice.value.trim(): //Si esta vacio devuelve false
                $priceErrors.innerHTML = 'El precio es obligatorio';//muestre el error debajo del input
                $perPrice.classList.add('is-invalid');
                validationsErrors = true;
                break;
            case !regExSize.test($perPrice.value):
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

    if(!$productColor.checked){
            $productColor.classList.add('is-invalid');
            $colorErrors.innerHTML = 'Ingresa al menos un color';
            error = true;
        }

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
                console.log($image.files)
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
            // PREGUNTAR EL FOR!//
        $form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let error = false;
            let elementsForm = this.elements;
    
            for (let index = 0; index< elementsForm.length - 1;index++){
                if(elementsForm[index].name ==''
                && elementsForm[index].name == ''
                && elementsForm[index].value !== 'number'  
                && elementsForm[index].value ==''
                && elementsForm[index].type !== 'file'){
                    elementsForm[index].classList.add('is-invalid');
                    $submitErrors.innerHTML = 'Los campos señalados son obligatorios';
                    error = true;
                }
            }
    
            if(!error && !validationsErrors){
                $form.submit();
            }
    
        })
}) 
