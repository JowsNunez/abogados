# endpoints Api abogados

## Solicitudes REST

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

