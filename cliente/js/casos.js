const form = document.getElementById('crearCaso');

const uri =window.location.search
const params=(new URLSearchParams(uri));

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(params)
    if(params.size===0){
        window.history.back();
    }
    const data = {
        nombre_demandado: form.nombre_demandado.value,
        cliente_idCliente: params.get('cliente'),
        // falta mantener  la sesión del abogado
        abogado_idAbogado: '1',
        descripcion: params.get('descripcion'),
        estado: form.estado.value,
        fecha_comienzo: Date.now()
    }
    
    const response = await httpCrearCaso(data);

    if(response.msg){
        const err =response.data._err;
        let {field}= err;
        let input;
        debugger
        if(field=='descripcion'|| field=='cliente_idCliente'){
            alert('Debe seleccionar o ingresar en el campo: '+field);
            window.history.back();
        }else{

            input = document.getElementById(field);
            console.log(input)
        }
        if(input){
            input.classList.add('is-invalid');
        }
        return;
    }

    alert('Caso creado correctamente');
    form.reset();
   

});