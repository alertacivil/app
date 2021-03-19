'use strict';

// Apertura de google maps y captura de los datos
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDvn8DPVSYpql3UrIS5_cDfTKQonoHff38&callback=initMap&libraries=visualization&v=weekly"';
script.defer = true;
script.async = true;


var map; 
let heatmap;

window.initMap = function() {
  map = new google.maps.Map(document.getElementById('map'),{
    zoom:15,  
    center: new google.maps.LatLng(9.933, -84.08),
    mapTypeId: "satellite",
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: LatLng,
    map: map,
  });
  getPoints();
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  const gradient = [
    "rgba(0, 255, 255, 0)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 191, 255, 1)",
    "rgba(0, 127, 255, 1)",
    "rgba(0, 63, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 0, 223, 1)",
    "rgba(0, 0, 191, 1)",
    "rgba(0, 0, 159, 1)",
    "rgba(0, 0, 127, 1)",
    "rgba(63, 0, 91, 1)",
    "rgba(127, 0, 63, 1)",
    "rgba(191, 0, 31, 1)",
    "rgba(255, 0, 0, 1)",
  ];
  heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
}

function changeRadius() {
  heatmap.set("radius", heatmap.get("radius") ? null : 20);
}

function changeOpacity() {
  heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
}
let lista_puntos = [];

let getPoints = async() =>{
             let latLng = [];
            lista_puntos = await listar_delito(); 
           
            
            for ( let i = 0; i < lista_puntos.length; i++){
                    
                     latLng = new google.maps.LatLng(lista_puntos[i].latitud, lista_puntos[i].longitud);
            }
            return latLng;
          }
          document.body.appendChild(script);