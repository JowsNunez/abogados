
# endpoints Api abogados

## Solicitudes REST **Cita**

### Eliminar Cita

- **URL**: `https://abogados.jandev.live/citas/{idCita}`
- **Método**: ***DELETE***



### Actualizar Cita

- **URL**: `https://abogados.jandev.live/citas/{idCita}`
- **Método**: ***PUT***
- **Body**:
  ```json
  {
    "data": {
      "estado": "Programada",
      "motivo": "Segunda consulta legal"
    }
  }


### Obtener lista de Citas
- **URL:**  `https://abogados.jandev.live/citas`
- **Método:** ***GET***

### Obtener lista de Citas por fecha
- **URL:**  `https://abogados.jandev.live/citas?fechaActual={fecha}`
- **Método:** ***GET***


### Crear Cita
- **URL:** `https://abogados.jandev.live/citas`
- **Método:** ***POST***
- **Body:**
    ```json 
    {
        "data":{
              "fechaInicio": "2023-10-16T13:30:00.000Z",
              "cliente_idCliente": 1,
              "abogado_idAbogado": 4,
              "caso_idCaso": 2,
              "cubiculo_idCubiculo": 2,
              "estado": "programada",
              "motivo": "Consulta legal"
           }
    }



### Obtener Cita
- **URL:** `https://abogados.jandev.live/citas/{idCita}`
- **Método:** ***GET***

## Solicitudes REST **Cliente**

### Obtener Cliente
- **URL:** `https://abogados.jandev.live/clientes/{idCliente}`
- **Método:** ***GET***

### Obtener lista de Clientes
- **URL:** `https://abogados.jandev.live/clientes`
- **Método:** ***GET***

## Solicitudes REST **Abogado**

### Obtener Abogado
- **URL:** `https://abogados.jandev.live/abogados/{idAbogado}`
- **Método:** ***GET***

### Obtener lista de Abogados
- **URL:** `https://abogados.jandev.live/abogados`
- **Método:** ***GET***

## Solicitudes REST **Cubiculo**

### Obtener Cubiculo
- **URL:** `https://abogados.jandev.live/cubiculos/{idCubiculo}`
- **Método:** ***GET***

### Obtener lista de Cubiculos
- **URL:** `https://abogados.jandev.live/cubiculos`
- **Método:** ***GET***


## Solicitudes REST **Caso**

### Obtener Caso
- **URL:** `https://abogados.jandev.live/casos/{idCasos}`
- **Método:** ***GET***

### Obtener lista de Casos
- **URL:** `https://abogados.jandev.live/casos`
- **Método:** ***GET***

### Obtener lista de casos por cliente y abogado
- **URL:** `https://abogados.jandev.live/casos?idCliente={_idCliente_}&idAbogado={_idAbogado_}
- **Método:** ***GET***


>Nota: utilizar format ISO 8601 para fechas. 