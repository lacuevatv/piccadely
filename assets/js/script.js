document.addEventListener('DOMContentLoaded', function() {
    console.log('ready')

    $menu = document.getElementById('toggle');
    $menu.addEventListener('click', function(){
        openCloseMobileMenu();
    });


});

window.addEventListener('load', function() {
    console.log('all loaded');
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