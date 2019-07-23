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

//inicializa las funciones de la pagina de checkkout
function checkoutInit() {
    var takeAway = document.querySelector('#takeaway-radio'),
        delivery = document.querySelector('#delivery-radio'),
        sectionTakeAway = document.querySelector('#section-take-away'),
        sectionDelivery = document.querySelector('#section-delivery');
        
        delivery.checked = true;

        //oculta la seccion take away
        sectionTakeAway.style.display = 'none';
        
    takeAway.addEventListener('click', function(){
        if ( this.checked ) {
            sectionTakeAway.style.display = 'block';
            sectionDelivery.style.display = 'none';
        }
    });

    delivery.addEventListener('click', function(){
        if ( this.checked ) {
            sectionTakeAway.style.display = 'none';
            sectionDelivery.style.display = 'block';
        }
    });

}

function pediPicadasInit(event) {
    
    var contenedorPicadas = document.querySelector('#contenedor-picadas');
    var botonesWrapper = document.querySelector('.wrapper-buttons-somos');
    var botones = document.querySelectorAll('.btn-picadas-somos');
    var picadas = contenedorPicadas.children;
    
    //siempre se muestran los botones
    botonesWrapper.style.display = 'flex';

    if (window.innerWidth < 992 ) {
        //version mobil

        //oculto las picadas
        for (var i = 0; i < picadas.length; i++) {
            picadas[i].style.display = 'none';
        }
        
        //asigno evento al boton, lo unico que va a hacer es mostrar las picadas por defecto
        for (var j = 0; j < botones.length; j++) {
            botones[j].addEventListener('click', function() {
                
                //oculta los botones
                botonesWrapper.style.display = 'none';

                //muestra las picadas
                for (var b = 0; b < picadas.length; b++) {
                    picadas[b].style.display = 'block';
                }
            });
        }

    } else {
        //version desktop
        //le asigna un activo como el primero
        botones[0].classList.add('activo');

        //muestra las picadas
        for (var b = 0; b < picadas.length; b++) {
            picadas[b].style.display = 'block';
        }
    }

    
}

function marketDelyInit() {

    btnResumenFixedonScroll();

    var contenedorPicadas = document.querySelector('#contenedor-picadas');
    var elementos = contenedorPicadas.children;
    var botones = document.querySelectorAll('.btn-marketdely');

    //oculta picadas y coloca el primer boton como activo
    var filtro = botones[0].getAttribute('data-filtro');
    botones[0].classList.add('activo');
            
    for (var h = 0; h < elementos.length; h++) {
        if ( !( elementos[h].classList.contains(filtro) ) ) {
            elementos[h].style.display = 'none';
        } else {
            elementos[h].style.display = 'block';
        } 
    }

    //crea eventos click en los botones
    for (var i = 0; i < botones.length; i++) {
        
        botones[i].addEventListener('click', function(e){
            //chequea el filtro que hizo click
            var filtro = this.getAttribute('data-filtro');
            
            //oculta la liasta de acuerdo al filtro
            for (var j = 0; j < elementos.length; j++) {
                if ( !( elementos[j].classList.contains(filtro) ) ) {
                    elementos[j].style.display = 'none';
                } else {
                    elementos[j].style.display = 'block';
                } 
            }

            //marca y desmarca los botones para mostrar el que esta activo
            for (var c = 0; c < botones.length; c++) {
                botones[c].classList.toggle('activo');
            }
        });
        
    }
}

function btnResumenFixedonScroll() {
    var resumen = document.querySelector('.wrapper-btns-resumen');
    var lista = document.querySelector('#contenedor-picadas');
    var footer = document.querySelector('.main-footer');
    
    resumen.style.position = 'fixed';

    document.addEventListener('scroll', function (){
        if ( isVisible(footer) ) {
            resumen.style.position = 'absolute';
        } else {
            resumen.style.position = 'fixed';
        }

        
    });
    
    
}