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
      
      for ( let i = 0; i < lista_puntos.length; i++){
        for (let x=0; x < lista_tipovictima.length; x++){
            var punto = lista_puntos[i].victima;
            var cat = lista_tipovictima[x].categoriaVictima;
            var fig= lista_catincidentes[x].icono;
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

// const tbody = document.querySelector('#tbl-asistencias tbody');
// const input_filtro = document.querySelector('#txtfiltro');
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