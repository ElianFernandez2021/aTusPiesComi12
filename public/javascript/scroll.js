let animacion= document.getElementById('transparencia') /* Guardo en una variable el elemento al que quiero animar */
window.addEventListener('scroll',() => {
    if(window.scrollY >0){
        document.querySelector(".color-gradient").classList.add("header-opacity")
    }
    else{
        document.querySelector(".color-gradient").classList.remove("header-opacity")
    }
})