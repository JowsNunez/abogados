


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