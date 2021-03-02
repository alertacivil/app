'use strict';
    const botonRegistrar= document.querySelector('#btnRegistrar');
    const inputCatVictima = document.querySelector('#categoriaVictima');
    const inputDescripcionVictima = document.querySelector('#descripcionVictima');
    const inputIcono = document.querySelector('#victima-foto')
    

let validar= () =>{
    let error =false; 
    
    let elementos_requeridos = document.querySelectorAll('#frm-registrar [required]');
       
    
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
    inputCatVictima.value = '';
    inputDescripcionVictima.value = '';
    inputIcono.src = '';
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
        let categoria_victima = inputCatVictima.value;
        let descripcion_victima = inputDescripcionVictima.value;
        let icono = inputIcono.src;
       
        registrar_categoria_victima(categoria_victima, descripcion_victima,icono);  
        
        Swal.fire({
            'title': 'Proceso realizado con éxito',
            'text': 'Sus datos se enviaron adecuadamente',
            'icon': 'success'
        }).then(() => {
            limpiar();
        });
    }
};

function cancelar() {
    window.history.back();
};

botonRegistrar.addEventListener('click', obtenerDatos);