document.addEventListener('DOMContentLoaded', function() {
    /*
    * LOADER
    */
    setTimeout(
        function(){
            $loader = document.getElementById('loader');
            $loader.classList.add('closed');
            setTimeout(function(){
                $loader.style.display = 'none';
            },1100);

            setTimeout(function(){
                initAnimations();
            },500);
    }, 500);
    
    /*
     * TOGGLE menu-movil
     */
    $menu = document.getElementById('toggle');
    $menu.addEventListener('click', function(){
        openCloseMobileMenu();
    });


});


/*
 * FUNCIONES UTILIZADAS EN LAS PAGINAS
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

//chequea si un elemento es visible
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



function sucursalesInit() {
    var windowWidth = window.innerWidth,
        titulo = document.querySelector('#title-change');

    if ( windowWidth < 769 ) {
        titulo.innerText = titulo.getAttribute('data-title-movil');
    } else {
        titulo.innerText = titulo.getAttribute('data-title');
    }

    var botones = document.querySelectorAll('.ver-mapa-btn');

    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener('click', function(){
            
            titulo.innerText = this.getAttribute('data-title');
            
            var mapa = this.parentElement.querySelector('.wrapper-map-sucursal');
            mapa.classList.add('wrapper-map-sucursal-open');
    
        });
        
    }

    if ( windowWidth < 769 ) {
        titulo.addEventListener('click', function(){
            var opens = document.querySelectorAll('.wrapper-map-sucursal-open');

            if ( opens.length > 0) {
                for (var j = 0; j < opens.length; j++) {
                    opens[j].classList.remove('wrapper-map-sucursal-open');
                }
            }

            sucursalesInit();
        });
    }
    
    window.addEventListener('resize', sucursalesInit);

}

//ejecuta las funciones del mapa en la pagina zonas de entrega
function mapaZonasInit() {
    var btnZoomIn  = document.querySelector('#zoom-in-map'),
        btnZoomOut = document.querySelector('#zoom-out-map');

        btnZoomIn.addEventListener('click', function(){
            zoomMapZona('zoomIn');
        });
        btnZoomOut.addEventListener('click', function(){
            zoomMapZona('zoomOut');
        });


    window.addEventListener('resize', mapaZonasInit);
}

//hace el zoom del mapa que es una imagen
function zoomMapZona(zoom) {
    var mapa = document.querySelector('#mapa');
    var rect = mapa.getBoundingClientRect();

    if ( window.innerWidth == rect.width) {
        return;
    }

    switch (zoom) {

        case 'zoomIn':
            if ( mapa.style.zoom == '' ) {
                mapa.style.zoom = 1.5;
            } else {
                if ( parseFloat(mapa.style.zoom) < 3 ) {
                    mapa.style.zoom = parseFloat(mapa.style.zoom) + 0.5;
                }
            }
            
        break;
    
        case 'zoomOut':
            if ( window.innerWidth == rect.width) {
                return;
            }
            if (mapa.style.zoom != '') {
                if ( parseFloat(mapa.style.zoom) > 1 ) {
                    mapa.style.zoom = parseFloat(mapa.style.zoom) - 0.5;
                }
            }
            
        break;
    }
}