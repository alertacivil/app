'use strict';

// Apertura de google maps y captura de los datos
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDvn8DPVSYpql3UrIS5_cDfTKQonoHff38&callback=initMap&zoom=15&format=png&maptype=roadmap&libraries=&v=weekly';
script.defer = true;
script.async = true;



var map; 
let lista_puntos = [];
let lista_tipovictima = [];

window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'),{
      zoom:15,  
      center: new google.maps.LatLng(9.933, -84.08),

    });
     let mostrar_mapa = async() => {

      lista_puntos = await listar_delito(); 
      lista_tipovictima = await listar_categoria_victima();
      lista_detalles=[];
      for ( let i = 0; i < lista_puntos.length; i++){
        for (let x=0; x < lista_tipovictima.length; x++){
            var punto = lista_puntos[i].victima;
            var cat = lista_tipovictima[x].categoriaVictima;
            var fig= lista_tipovictima[x].icono;
            var comp = punto.localeCompare(cat);
            lista_detalles= (lista_puntos[i].FechaDelito, lista_puntos[i].HoraDelito,lista_puntos[i].Tipo, lista_puntos[i].Victima);
            if (comp == 0) {
              
              var latLng = new google.maps.LatLng(lista_puntos[i].latitud, lista_puntos[i].longitud);
              var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              icon: fig,
              content: lista_detalles
            });

            } else if (punto === '') {
              var latLng = new google.maps.LatLng(lista_puntos[i].latitud, lista_puntos[i].longitud);
              var marker = new google.maps.Marker({
              position: latLng,
              map: map,
              icon: '../images/thief1.png',
              content: lista_detalles

            });  
            }
    
        }
      } 
      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    };
  

  mostrar_mapa();

};

document.body.appendChild(script);


/*-----------------------------------------*/
const botonFiltrar= document.querySelector('#btnFiltrar');
const inputVictima = document.querySelector('#victima');

let validar= () =>{
  let error =false; 
  
  let elementos_requeridos = document.querySelectorAll('#frm-filtrar [required]');
     
  
  for (let i = 0; i < elementos_requeridos.length; i++) {
      if (elementos_requeridos[i].value == '') {
          elementos_requeridos[i].classList.add('input-error');
          error = true;
      } else {
          elementos_requeridos[i].classList.remove('input-error');
      }
  }

  
  return error;
};


function limpiar(){
    
  inputVictima.value = '';
};


function obtenerDatos(){
  let errorv = validar();
 
  if (errorv) {
       
      Swal.fire({
          'title':'Sus datos no se pudieron enviar',
          'text':'Por favor complete todos los campos',
          'icon':'warning'
      });
  } else {
      
      
      
      let Victima = inputVictima.value;
      
      
      filtrar_listar_delito(Victima);  
     
    

      Swal.fire({
          'title': 'Proceso realizado con éxito',
          'text': 'Sus datos se enviaron adecuadamente',
          'icon': 'success'
      }).then(() => {
          limpiar();
      });

      window.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'),{
          zoom:15,  
          center: new google.maps.LatLng(9.933, -84.08),
    
        });
         let mostrar_mapa_filtrado = async() => {
    
          lista_puntos = await filtrar_listar_delito(); 
          lista_tipovictima = await listar_categoria_victima();
          
          for ( let i = 0; i < lista_puntos.length; i++){
            for (let x=0; x < lista_tipovictima.length; x++){
                var punto = lista_puntos[i].victima;
                var cat = lista_tipovictima[x].categoriaVictima;
                var fig= lista_tipovictima[x].icono;
                var comp = punto.localeCompare(cat);
    
                if (comp == 0) {
                  
                  var latLng = new google.maps.LatLng(lista_puntos[i].latitud, lista_puntos[i].longitud);
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  icon: fig,
                });
    
                } else if (punto === '') {
                  var latLng = new google.maps.LatLng(lista_puntos[i].latitud, lista_puntos[i].longitud);
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  icon: '../images/thief1.png'
                });  
                }
        
            }
          } 
        };
      
    
      mostrar_mapa_filtrado();
    
    };
  }
};






let selcaract = document.getElementById('victima');
let catVictima = [];

let caracteristicas_datos = async () => {
    let catVictima = await listar_categoria_victima();


    for (let i = 0; i < catVictima.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = catVictima[i]['categoriaVictima'];
        opt.value = catVictima[i]['categoriaVictima'];
        selcaract.appendChild(opt);

    }
};

caracteristicas_datos();
botonFiltrar.addEventListener('click',obtenerDatos);