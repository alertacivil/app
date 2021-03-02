'use strict';


let registrar_categoria_victima = async(pcategoria_victima, pdescripcion_victima,picono) => {
    
    await axios({
            method: 'post',
            url: 'https://alertacivilapi.azurewebsites.net/api/victima',
            responseType: 'json',
            data: {
                'CategoriaVictima': pcategoria_victima,
                'Descripcion': pdescripcion_victima,
                'Icono':picono,
            }                   
        }).then((res) => {
            if (res.data.resultado == false) {
                switch (res.data.err.code) {
                    case 11000:
                        Swal.fire({
                            'title': 'La categoria no pudo ser registrada',
                            //'text' : 'El usuario ya se encuentra registrado',
                            'icon': 'error'
                        });
                        break;
                }
            } else {
                Swal.fire({
                    'title': 'La categoria ha sido registrada',
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
