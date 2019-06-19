document.addEventListener('DOMContentLoaded', function() {
    
    /*
     * TOGGLE menu-movil
     */
    $menu = document.getElementById('toggle');
    $menu.addEventListener('click', function(){
        openCloseMobileMenu();
    });


});


window.addEventListener('load', function() {
    
    /*
     * SLIDER HOME
    */
    var slider = tns({
        container: '#sliderHome',
        mode: 'gallery',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayButtonOutput:false,
        controls: false,
        //nav: false,
        arrowKeys:true,
        //animateIn: 'tns-fadeIn',
        //animateOut: 'tns-fadeOut',
    });

});

/*
 * FUNCIONES
*/
function openCloseMobileMenu() {
    $toggle = document.getElementById('toggle');
    $menu = document.getElementById('navMobile');
    
    if ( $toggle.getAttribute('aria-expanded') === 'false' ) {
        //ABRIR MENU
        //modifica el aria
        $toggle.setAttribute('aria-expanded', 'true');
        //agrega la clase al toggle
        $toggle.classList.add('menu-open');
        //agrega la clase que abre el menu
        $menu.classList.add('opened');
    } else {
        //CERRAR MENU
        //modifica el aria
        $toggle.setAttribute('aria-expanded', 'false');
        //quita la clase al toggle
        $toggle.classList.remove('menu-open');
        //quita la clase al menu para que se cierre
        $menu.classList.remove('opened');
    }
}//openCloseMobileMenu()