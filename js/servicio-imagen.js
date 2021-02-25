'use strict';

const boton_foto = document.querySelector('#btn-foto');
const imagen = document.querySelector('#victima-foto');

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName : 'civilalert',
    uploadPreset : 'civilalert_preset'

}, (err, result) => {
    if (!err && result && result.event === 'success') {
        console.log('Imagen subida con éxito', result.info);
        imagen.src = result.info.secure_url;
    }
});

boton_foto.addEventListener('click', () => {
    widget_cloudinary.open();
}, false);