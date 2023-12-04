


const form = document.getElementById('formulario');



form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const apellidos = form.apellidos.value.split(/\s{1}/);
    const data = {
        nombre: form.nombre.value,
        apellidoPaterno: apellidos[0],
        apellidoMaterno: apellidos[1],
        correo: form.correo.value,
        telefono: form.telefono.value,
        domicilio: form.domicilio.value,
        rfc: form.rfc.value
    }
    
    const response = await httpCrearCliente(data);

    if(response.msg){
        const err =response.data._err;
        let {field}= err;
        if(field =='apellidoMaterno'|| field=='apellidoPaterno'){
            field='apellidos';
        }

        const input = document.getElementById(field);
        input.classList.add('is-invalid');
        return;
    }

    alert('cliente creado correctamente')
    form.reset();
   

})

