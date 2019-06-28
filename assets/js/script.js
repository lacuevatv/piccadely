document.addEventListener('DOMContentLoaded', function() {
    /*
    * LOADER
    */
    setTimeout(
        function(){
            $loader = document.getElementById('loader');
            $loader.classList.add('closed');
            setTimeout(function(){
                initAnimations();
            },500);
    }, 2000);
    
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
        speed: 700,
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

//mueve el boton del footer para que no moleste a la vista del footer
function buttonFooterFelicidad() {
    var buttonWrapper = document.getElementsByClassName('button-chat-wrapper')[0];
    var mainFooter = document.getElementsByClassName('main-footer')[0];
        
    var is_visible = isVisible( mainFooter);
    if ( is_visible ) { // Es diferente de false
        buttonWrapper.classList.add('button-chat-wrapper-off');
    } else {
        buttonWrapper.classList.remove('button-chat-wrapper-off');
    }
    
}

//ejecuta animaciones agregando clase in-view a la clase animates
function initAnimations() {
    var animates = document.getElementsByClassName('animate-element');
        
    for (var index = 0; index < animates.length; index++) {
        var element = animates[index];
        var is_visible = isVisible( element );
        if ( is_visible ) { // Es diferente de false
            element.classList.add('in-view');
        }
    }
}

function isVisible ( el ) {
    var result = false;
    // Browser viewport
    var viewport_h = window.innerHeight;
    var viewport_top = window.pageYOffset;
    var viewport_bottom = viewport_top + viewport_h;
    // DOM Element
    var el_h = el.offsetHeight;                  // Height
    var el_top = el.getBoundingClientRect().top; // Top
    var el_bottom = el_top + el_h;               // Bottom
    // Is inside viewport?
    if ( el_bottom > 0 && el_top < viewport_h ) { 
      result = 1.0 - ( el_top + el_h ) / ( viewport_h + el_h );
    }
    
    return result;
}