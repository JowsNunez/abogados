

async function httpCrearCliente(data) {
    const response = await fetch('/api/clientes', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    const data = await response.json();
    return data;
}

async function httpActualizarCliente(id,data){
    const response = await fetch('/api/clientes/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    const data = await response.json();
    return data;
}

async function httpEliminarCliente(id){
    const response = await fetch('/api/clientes/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function httpCrearCaso(data) {
    const response = await fetch('/api/casos', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    const data = await response.json();
    return data;
}

async function httpActualizarCaso(id, data){
    const response = await fetch('/api/casos/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    const data = await response.json();
    return data;
}

async function httpEliminarCaso(id){
    const response = await fetch('/api/casos/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export {
    httpCrearCliente,
    httpActualizarCliente,
    httpEliminarCliente,
    httpCrearCaso,
    httpActualizarCaso,
    httpActualizarCaso
}