

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
    clientes.forEach(element => {
        body +=

            `<tr>
    <td>${element.nombre}</td>
    <td>${element.apellidoPaterno}</td>
    <td>${element.apellidoMaterno} </td>
    <td>${element.telefono}</td>
    <td>${element.domicilio}</td>
    <td>${element.rfc}</td>
    <td><input type="checkbox"></td>
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
         <td>${caso.abogado_idAbogado}</td>
        <td>${caso.cliente_idCliente}</td>
        <td>${caso.nombre_demandado} </td>
        <td>${caso.descripcion}</td>
        <td>${caso.fecha_comienzo}</td>
        <td>${caso.estado}</td>
        <td><a>waos</a></td>
        <td><input type="checkbox"></td>
        </tr>`

    });

    return { head, body }
}