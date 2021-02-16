'use strict';
// Apertura de google maps y captura de los datos
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDvn8DPVSYpql3UrIS5_cDfTKQonoHff38&callback=initMap&zoom=15&format=png&maptype=roadmap&libraries=&v=weekly';
script.defer = true;
script.async = true;


var map; 
let marker;
let latitud;
let longitud;
let pos;



window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'),{
      center: { lat: 9.748917, lng: -83.753428 },
      zoom:15, 
      
    });
   

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
      var posicionUsuario = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     
      var marker = new google.maps.Marker({       
          position: posicionUsuario,
          map: map,
          draggable: true,
          icon: '../images/thief1.png'
      });  
    
      let latitud=document.getElementById("txtlat");
      let longitud= document.getElementById("txtlong");
      
      latitud.value = posicionUsuario.lat(); 
      longitud.value = posicionUsuario.lng();
      map.setCenter(posicionUsuario);
         if( 'dragstart') {
          google.maps.event.addListener(marker, 'dragend', function(a) {
            console.log(a);
            
            latitud.value = a.latLng.lat(); 
            longitud.value = a.latLng.lng();

            sessionStorage.setItem('lat-fin', latitud.value);
            sessionStorage.setItem('lon-fin', longitud.value);
            
        });
         }
       
        }, function() {
        handleNoGeolocation(true);
         });
         } else {
         alert('el navegador no es compatible o no lo permite');
        handleNoGeolocation(false);
        if( 'dragstart') {
          google.maps.event.addListener(marker, 'dragend', function(a) {
            console.log(a);
            
            latitud.value = a.latLng.lat(); 
            longitud.value = a.latLng.lng();

            sessionStorage.setItem('lat-fin', latitud.value);
            sessionStorage.setItem('lon-fin', longitud.value);
            
        });
         }
        
         
      }

};
  
document.body.appendChild(script);


function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
  var content = 'Error: El servicio de geolocalización ha fallado.';
   } else {
  var content = 'Error: Tu navegador no soporta el servicio de geolocalización.';
  }

  map.setCenter(9.933, -84.08);

     };


/*------------------------------------------------------*/
const botonRegistrar= document.querySelector('btnRegistrar');
const inputFechaDelito = document.querySelector('fechaDelito');
const inputHoraDelito = document.querySelector('horaDelito');
const inputTipo = document.querySelector('tipo');
const inputVictima = document.querySelector('victima');
const inputDescripcion = document.querySelector('sustraido');
const inputLatitud = document.querySelector('txtlat');
const inputLongitud = document.querySelector('txtlong');

let validar= () =>{
  let error =false; 
  
  let elementos_requeridos = document.querySelectorAll('frm-registrar [required]');
     
  
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
    
  inputFechaDelito.value = '';
  inputHoraDelito.value = '';
  inputTipo.value = '';
  inputVictima.value = '';
  inputDescripcion.value ='';
  inputLatitud.value ='';
  inputLongitud.value ='';
}

function obtenerDatos(){
  let errorv = validar();
 
  if (errorv) {
       
      Swal.fire({
          'title':'Sus datos no se pudieron enviar',
          'text':'Por favor reviselos campos resaltados',
          'icon':'warning'
      });
  } else {
      // cambia_provincia(inputProvincia.value);
      
      let FechaDelito = inputFechaDelito.value;
      let HoraDelito = inputHoraDelito.value;
      let Tipo = inputTipo.value;
      let Victima = inputVictima.value;
      let Descripcion = inputDescripcion.value;
      let Latitud =  inputLatitud.value;
      let Longitud = inputLongitud.value;

      
      registrar_delito(FechaDelito, HoraDelito, Tipo, Victima, Descripcion, Latitud, Longitud);  
     

      Swal.fire({
          'title': 'Proceso realizado con éxito',
          'text': 'Sus datos se enviaron adecuadamente',
          'icon': 'success'
      }).then(() => {
          limpiar();
      });
  }
};
botonRegistrar.addEventListener('click',obtenerDatos);
