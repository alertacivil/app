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
//a partir de aqui search box
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      // markers = [];
      // // For each place, get the icon, name and location.
      // const bounds = new google.maps.LatLngBounds();
      // places.forEach((place) => {
      //   if (!place.geometry || !place.geometry.location) {
      //     console.log("Returned place contains no geometry");
      //     return;
      //   }
      //   const icon = {
      //     url: place.icon,
      //     size: new google.maps.Size(71, 71),
      //     origin: new google.maps.Point(0, 0),
      //     anchor: new google.maps.Point(17, 34),
      //     scaledSize: new google.maps.Size(25, 25),
      //   };
      //   // Create a marker for each place.
      //   markers.push(
      //     new google.maps.Marker({
      //       map,
      //       icon,
      //       title: place.name,
      //       position: place.geometry.location,
      //     })
      //   );
  
      //   if (place.geometry.viewport) {
      //     // Only geocodes have viewport.
      //     bounds.union(place.geometry.viewport);
      //   } else {
      //     bounds.extend(place.geometry.location);
      //   }
      // });
      // map.fitBounds(bounds);
    });

//final search box

     let mostrar_mapa = async() => {
      lista_puntos = await listar_delito(); 
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
  

  mostrar_mapa();

};

document.body.appendChild(script);


// let lista_incidente=[];

// let mostrar_datos = async() => {
//     lista_incidente = await listar_incidente();
//     tbody.innerHTML = '';
  
//     for (let i = 0; i < lista_incidente.length; i++) {
//         let fila = tbody.insertRow();
      
//        let celda_incidente = fila.insertCell().innerHTML = lista_incidente[i]['incidente'];
//        let celda_tipo_incidente = fila.insertCell().innerHTML = lista_incidente[i]['tipo_incidente'];
//        let celda_ruta = fila.insertCell().innerHTML = lista_incidente[i]['ruta'];
//        let celda_ubicacion_incidente =  fila.insertCell().innerHTML = lista_incidente[i]['ubicacion_incidente'];
   
      
//     }

   
// };


// let filtrar_datos = () => {

//     tbody.innerHTML = '';
//     let filtro = input_filtro.value.toLowerCase();
//     let hay_coincidencias = false;

//     for (let i = 0; i < lista_incidente.length; i++) {
//         let incidente = lista_incidente[i]['ruta'].toLowerCase();
        

//         if (incidente.includes(filtro)) {
//             let fila = tbody.insertRow();

//             let celda_descripcion = fila.insertCell().innerHTML = lista_incidente[i]['incidente'];
//        let celda_incidente = fila.insertCell().innerHTML = lista_incidente[i]['tipo_incidente'];
//        let celda_ruta = fila.insertCell().innerHTML = lista_incidente[i]['ruta'];
//        let celda_direccion =  fila.insertCell().innerHTML = lista_incidente[i]['ubicacion_incidente'];

      
//             hay_coincidencias = true;
//         } else {

//         }

//     }
//     if (hay_coincidencias == false) {
//         tbody.innerHTML = 'No hay datos que mostrar';
//     }
// };
// mostrar_datos();
//input_filtro.addEventListener('keyup', filtrar_datos);
/*carga el select con datos de collection tipos de victima*/

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