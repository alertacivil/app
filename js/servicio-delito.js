'use strict'

    let registrar_delito = async(pfechadelito,phoradelito,ptipo,pvictima,pdescripcion,platitud,plongitud) => {

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
            }).then((res) => {
                if (res.data.resultado == false) {
                    switch (res.data.err.code) {
                        case 11000:
                            Swal.fire({
                                'title': 'El delito no pudo ser registrado',
                                //'text' : 'El usuario ya se encuentra registrado',
                                'icon': 'error'
                            });
                            break;
                    }
                } else {
                    Swal.fire({
                        'title': 'El delito ha sido registrado',
                        'text': 'Gracias por ser parte de Alerta Civil!',
                        'icon': 'success'
                    }).then(() => {
                        limpiar();
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
    
    };

    
let listar_delito = async() => {
    let lista_delito = [];

    await axios({
        method: 'get',
        url: 'https://alertacivilapi.azurewebsites.net/api/delito',
        responseType: 'json',
    }).then((res) => {
        lista_delito = res.data
    }).catch((err) => {
        console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
    });

    return lista_delito;
};
 
// let filtrar_listar_delito = async(Victima) => {
//     let filtra_lista_delito = [];

//     await axios({
//         method: 'get',
//         params: {victima: Victima},
//         url: 'https://alertacivilapi.azurewebsites.net/api/delito',
//         responseType: 'json'
//     }).then((res) => {
//         filtra_lista_delito = res.data
//     }).catch((err) => {
//         console.log('No se pudo establecer la comunicación con el servidor, ocurrió el siguiente error: ', err)
//     });

//     return filtra_lista_delito;
// };
