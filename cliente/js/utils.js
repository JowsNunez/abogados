


function handleError(field){
  
    if(field==='cliente'){
       let input=  document.getElementById('idCliente');
        handleInput(input)
    }

    if(field==='abogado'){
        let input=  document.getElementById('idAbogado');
        handleInput(input) 
    }

    if(field==='fecha'){
        let fecha=  document.getElementById('fecha');
        let hora=  document.getElementById('hora');
        handleInput(fecha)
        handleInput(hora) 

        
    }
    if(field==='motivo'){
        let input=  document.getElementById('motivo');
        handleInput(input)

        
    }
    if(field==='estado'){
        let input=  document.getElementById('estadoCita');
        handleInput(input)

        
    }
    if(field==='cubiculo'){
        let input=  document.getElementById('numeroCubiculo');
        handleInput(input)

        
    }

}

function handleInput(input){
    
  
        input.classList.add('is-invalid');
        input.focus();
   
}

async function mostrarCliente(data){
    // renderiza clientes
    const selector = document.getElementById('idCliente');
    selector.innerHTML = `
    <option selected="true" disabled="disabled" value="-1">seleccione Cliente</option>`
    data.data.forEach(cliente => {
      selector.innerHTML += `
        <option value=${cliente.idCliente}>${cliente.nombre} ${cliente.apellidoPaterno}</option>
      `
    });

}

function bindNavbar(){
    const headers=document.getElementById('heroes')
    if(!headers) return;
    headers.innerHTML=`
    <nav>
    <ul id="button">
        <li class="rr"><a href="#">R&R ABOGADOS Y ASOCIADOS</a></li>
        <li><a href="/crearCita.html">CITAS</a></li>
        <li><a href="#">EXPEDIENTES</a></li>
    <li><a href="/casos.html">CASOS</a></li>
    <li><a href="/clientes.html">CLIENTES</a></li>   

    <li><a href="#">REPORTES</a></li>
        <li>
            <form action="#" method="post">
                <input type="text" name="search" placeholder="Búsqueda">
                <button type="submit">Buscar</button>
            </form>
        </li>
    </ul>
</nav>`
}

const formatDate = (fecha) => {
    fecha = new Date(fecha);
    let dia = fecha.getDate();
    let mes = fecha.toLocaleString('es-ES', { month: 'long' }).charAt(0).toUpperCase() + fecha.toLocaleString('es-ES', { month: 'long' }).slice(1);
    let anio = fecha.getFullYear(); 
    return `${dia} de ${mes} del ${anio}`;
  }

function handlePages(){
    const auth = localStorage.getItem('auth');
    if(!auth !== window.location.href.includes('/login.html')){
        window.location.href = '/login.html';
    }
    if(window.location.href.includes('/login.html')&&auth){
        window.location.href = '/index.html';
    }
    
}

function login(auth){
    localStorage.setItem('auth',auth);
}

function logout(){
    localStorage.removeItem('auth');
}

window.addEventListener("load",()=>{
    bindNavbar()
    handlePages()
});