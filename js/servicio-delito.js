'use strict';


let registrar_delito = async(pfechadelito, phoradelito, ptipo, pvictima, pdescripcion, platitud, plongitud) => {

    await axios({
            method: 'post',
            url: 'https://alertacivilapi.azurewebsites.net/api/delito',
            responseType: 'json',
            data: {
                'FechaDelito': pfechadelito,
                'HoraDelito': phoradelito,
                'Tipo':ptipo,
                'Victima':pvictima,
                'Descripcion':pdescripcion,
                'Latitud':platitud,
                'Longitud':plongitud,
                         
            }
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
};