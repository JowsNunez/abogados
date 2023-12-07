
// Obtén referencias a los elementos HTML 
let btnCrearCuenta = document.querySelector("#btn-crearCuenta");
let iniciarSesionHTML = document.querySelector("#iniciarSesion");
let btnIniciarSesion = document.querySelector("#btn-iniciarSesion");
let crearCuentaHTML = document.querySelector("#crearCuenta");
let formIniciarSesion   = document.querySelector("#form_iniciarSesion");
let formCrear   = document.querySelector("#form_crear");


btnCrearCuenta.addEventListener("click", () => {
    iniciarSesionHTML.classList.add("hiddens_opciones");
    crearCuentaHTML.classList.remove("hiddens_opciones");
});

btnIniciarSesion.addEventListener("click", () => {
    crearCuentaHTML.classList.add("hiddens_opciones");
    iniciarSesionHTML.classList.remove("hiddens_opciones");
});

formIniciarSesion.addEventListener("submit", async (e) => {
    e.preventDefault();
    let nombre = formIniciarSesion.username.value;
    let contrasenia = formIniciarSesion.password.value;
    let body = {
        nombre,
        contrasenia
    }
    const data = await httpAuth(body);
    if (data) {
        const err = data._err;
        if(data.msg){
            console.log(data)
            alert("Error al iniciar sesion")
            return;
        }
        if(!err){
            login(JSON.stringify(data));
            handlePages();
        }
        let { field } = err;
        
        if (field == 'usuario') {
            document.querySelector('#iniciarSesion_username')
            .classList.add('is-invalid');
            return;
        }
        if (field == 'contrasenia') {
            document.querySelector('#iniciarSesion_password')
            .classList.add('is-invalid');
            return;
        }
        
    }
});

