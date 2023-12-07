
const url = 'http://localhost:5000';
async function httpCrearCliente(body) {
        console.log(body)
        const response = await fetch('http://localhost:5000/clientes/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json'
            }
        });
        
        const data = await response.json();
        return data;
        
   
}

async function httpActualizarCliente(id,body){
    const response = await fetch(url+'/clientes/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}

async function httpGetClientes(){
    const response = await fetch(url+'/clientes', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function httpGetCliente(id){
    const response = await fetch(url+'/clientes/'+id, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function httpEliminarCliente(id){
    const response = await fetch(url+'/clientes/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function httpCrearCaso(body) {
    const response = await fetch(url+'/casos', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}
async function httpGetCaso(id){
    const response = await fetch(url+'/casos/'+id, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}
async function httpGetCasos(){
    const response = await fetch(url+'/casos', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function httpActualizarCaso(id, body){
    const response = await fetch(url+'/casos/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}

async function httpEliminarCaso(id){
    const response = await fetch(url+'/casos/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}


async function httpAuth(body){
    const response = await fetch(url+'/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    return data;
}
