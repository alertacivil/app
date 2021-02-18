'use strict';

const uri = 'https://alertacivilapi.azurewebsites.net/api/delito';

let registrar_delito = async(pfechadelito,phoradelito,ptipo,pvictima,pdescripcion,platitud,plongitud) => {


fetch(uri, {
       method: 'POST',
       data: {
        'FechaDelito': pfechadelito,
        'HoraDelito': phoradelito,
        'Tipo':ptipo,
        'Victima':pvictima,
        'Descripcion':pdescripcion,
        'Latitud':platitud,
        'Longitud':plongitud,
                 
    }, 
       
       body: JSON.stringify(data),
       headers: {
           'Accept':'application/json',
           'Content-Type': 'application/json' }                
      }).then(function(res) {
            if (res.data.resultado == false) {
                switch (res.data.err.code) {
                    case 11000:
                        Swal.fire({
                            'title':'Sus datos no se pudieron registrar',
                            'text':'Ya existe esa asistencia',
                            'icon':'warning'
                        });
                        break;
                }
            }
        })
        .catch(function(err) {
            console.log(err);
        });

    }

    // let data =    {
    //     'FechaDelito': pfechadelito,
    //     'HoraDelito': phoradelito,
    //     'Tipo':ptipo,
    //     'Victima':pvictima,
    //     'Descripcion':pdescripcion,
    //     'Latitud':platitud,
    //     'Longitud':plongitud,
                 
    // }