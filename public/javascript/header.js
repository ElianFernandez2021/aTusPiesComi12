let icon_user = document.querySelector(".icon_user_mobile");
let icon_user_desktop = document.querySelector('.icon_user_desktop');
let menu_hamburguesa = document.querySelector('#icon_menu')
let menu_mobile = document.querySelector('#options')
let user_data = document.querySelector('#user_data')
let icon_cart = document.querySelector('.fa-bag-shopping')
let cart_content = document.querySelector('#content_cart')
let ubicacionPrincipal = window.scrollY;
let navbar = document.querySelector(".aNav");

window.onload = () => {

    icon_user.addEventListener('click', () => {
        user_data.classList.toggle('_active')
        menu_mobile.classList.remove('_active')
    })

    menu_hamburguesa.addEventListener('click', () => {
        menu_mobile.classList.toggle('_active');
        user_data.classList.remove('_active')
    })  

    icon_user_desktop.addEventListener('click', () => {                                                                                                                                                                                                                                                                 
        user_data.classList.toggle('_active')
        cart_content.classList.remove('_active')
    })

    icon_cart.addEventListener('click', () => {
        cart_content.classList.toggle('_active');
        user_data.classList.remove('_active')
    })  

    function desaparecerNav() {
        let scrollTop = document.documentElement.scrollTop
        for (var i=0; i < navbar.length; i++){
            let alturaAnimado = navbar[i].offsetTop;
            if(alturaAnimado -50 < scrollTop) {
                navbar[i].style.display = none;
            }                                                                                                                                                                                                                                                                                                                                             
        }
    }
    window.addEventListener("scroll", desaparecerNav )

}



