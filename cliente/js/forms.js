

let formCrearCita = () => {
    return `
    <form class="grid-container">

                <!-- Select abogado -->
                <div class="select-container grid-item">
                    <div class="left-align">
                        <label for="abogado">Abogado:</label>
                        <select id="idAbogado" required>
                            <option selected="true" disabled="disabled">seleccione Abogado</option>

                        </select>
                    </div>
                </div>
                <!-- Select cliente -->
                <div class="select-container grid-item">
                    <div class="right-align">
                        <label for="cliente">Selecciona un Cliente:</label>
                        <select id="idCliente" required>
                            <option selected="true" disabled="disabled" value="-1">seleccione Cliente</option>

                        </select>
                    </div>
                </div>
                <!-- Select caso -->
                <div class="select-container grid-item">
                    <div class="right-align">
                        <label for="caso">Selecciona un Caso:</label>
                        <select id="idCaso" required>
                            <option selected="true" disabled="disabled" value="-1">seleccione Caso</option>

                        </select>
                    </div>
                </div>
                <!-- Select cubiculo -->
                <diV class="grid-item">
                    <div class="select-container grid-item">
                        <div class="right-align">
                            <label for="cubiculo">Selecciona un cubículo:</label>
                            <select id="numeroCubiculo" required>
                                <option selected="true" disabled="disabled" value="-1">seleccione Cubiculo</option>

                            </select>
                        </div>
                    </div>

                </diV>
                <!-- text motivo -->
                <div class="center grid-item">
                    <label for="motivo">Motivo:</label>
                    <textarea id="motivo" name="motivo" rows="4" required></textarea>
                </div>
                <!-- Select estado -->
                <diV class="grid-item">
                    <div class="select-container grid-item">
                        <div class="right-align">
                            <label for="estado">Selecciona Estado</label>
                            <select id="estadoCita" required>
                                <option selected="true" disabled="disabled" value="-1">seleccione el estado</option>
                                <option value="programada">Programada</option>
                            </select>
                        </div>
                    </div>
                </diV>
                <div class="full-width">
                    <button type="submit" class="orange-button" id="guardarCitaButton">Guardar Cita</button>
                </div>
            </form>
    `
}

let formActualizarCita = () => {
    return `
    <form class="grid-container">
    <diV class="grid-item">
        <div class="select-container grid-item">
            <div class="right-align">
                <label for="cubiculo">Selecciona un cubículo:</label>
                <select id="numeroCubiculo" required>
                    <option selected="true" disabled="disabled" value="-1">seleccione Cubiculo</option>

                </select>
            </div>
        </div>

    </diV>

      <!-- Select estado -->
      <diV class="grid-item">
        <div class="select-container grid-item">
            <div class="right-align">
                <label for="estado">Selecciona Estado</label>
                <select id="estadoCita" required>
                    <option selected="true" disabled="disabled" value="-1">seleccione el estado</option>
                    <option value="programada">Programada</option>
                    <option value="cancelada">Cancelada</option>
                    <option value="enCurso">En Curso</option>
                    <option value="concluida">Concluida</option>
                </select>
            </div>
        </div>
    </diV>
    
    <!-- text motivo -->
    <div class="full-width">
    <div class="center grid-item">
        <label for="motivo">Motivo:</label>
        <textarea id="motivo" name="motivo" rows="4" width="100px" required></textarea>
    </div>
  
    
        <button type="submit" class="orange-button" id="actualizarCitaButton">Actualizar Cita</button>
    </div>
</form>

    `
}

let listaClientes = (clientes) => {
    let head = `   <tr>
    <th>Nombre</th>
    <th>Apellido Paterno</th>
    <th>Apellido Materno</th>
    <th>Telefono</th>
    <th>Domicilio</th>
    <th>RFC</th>
    <th>Seleccion</th>
</tr>`
    let body = '';
    clientes.forEach(cliente => {
        body +=

            `<tr>
    <td>${cliente.nombre}</td>
    <td>${cliente.apellidoPaterno}</td>
    <td>${cliente.apellidoMaterno} </td>
    <td>${cliente.telefono}</td>
    <td>${cliente.domicilio}</td>
    <td>${cliente.rfc}</td>
    <td><input class='check' clientes='${cliente.idCliente}' value='${cliente.idCliente}' type="checkbox"></td>
    </tr>
`
       
    });

    return { head, body };
}

let listaCasos = (casos) => {
    const head = ` 
    <tr>
    <th>Abogado</th>
    <th>Cliente</th>
    <th>Nombre Demandado</th>
    <th>Descripción</th>
    <th>Fecha Comienzo</th>
    <th>Estado</th>
    <th>Documentación</th>
    <th>Seleccion</th>
    </tr>
`
    let body = '';
    casos.forEach(caso => {
        body += ` 
        <td>${caso.abogado.nombre} ${caso.abogado.apellidoPaterno} ${caso.abogado.apellidoMaterno}</td>
        <td>${caso.cliente.nombre} ${caso.cliente.apellidoPaterno} ${caso.cliente.apellidoMaterno}</td>
        <td>${caso.nombre_demandado} </td>
        <td>${caso.descripcion}</td>
        <td>${caso.fecha_comienzo}</td>
        <td>${caso.estado}</td>
        <td><a>waos</a></td>
        <td><input class='check' casos='${caso.idCaso}' value='${caso.idCaso}' type="checkbox"></td>
        </tr>`

    });

    return { head, body }
}

let cargarEventosChecks=(param)=> {
    const checksList = document.querySelectorAll('.check')
    const btnEditar = document.querySelector('#editar')
    const btnEliminar = document.querySelector('#eliminar')
    let checked = []
    let handleActualizar = (id) => {
        if(param=='clientes'){
            window.location.href = 'cliente/actualizar.html?id=' + id
        }
        if(param=='casos'){
            window.location.href = 'caso/actualizar.html?id=' + id
        }
        
    }
    let handleEliminar= async (id)=>{
        if(param=='clientes'){
            return await httpEliminarCliente(id)
        }
        if(param=='casos'){
           return await httpEliminarCaso(id)
            
        }
        
    }
    btnEditar.addEventListener('click', (e) => {
      if (checked.length < 1) {
        alert("Debe seleccionar una cita para modificar")
        return
      }
      handleActualizar(checked[0].id)

    })
    btnEliminar.addEventListener('click', (e) => {
      if (checked.length < 1) {
        alert('Debe seleccionar una cita para eliminar')
        return
      }
      console.log(checked)
      let selection = confirm('Desea eliminar '+ param)
      handleEliminar(checked[0].value).then((data)=>{
            console.log(data)
       })
    })


    checksList.forEach(check => {
      check.addEventListener('change', (e) => {
       
        // si no hay un check seleccionado se agrega a la lista
        if (checked.length < 1) {
            console.log(e)
          checked.push({
            value: e.target.value,
            id: e.target.attributes[param].value
          })
        } else {
          //en caso contrario si ya hay un check dentro de la lista 
          // si es igual se elimina de la lista
          if (checked[0].value == e.target.value) {
            checked.pop()
          }
          // se establece el valor del check a false 
          e.target.checked = false
        }

      })

    })
  }