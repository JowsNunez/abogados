// metodo para convertir fecha a formato ISO string


// TODO: mover a otro modulo
const convertirFechaISOString = (fecha, hora) => {

  if (!fecha) throw new Error('la fecha no debe estar vacia')
  if (!hora) throw new Error('la hora no debe estar vacia')

  let fechaInicio = fecha + 'T' + hora + ':00.000Z'

  return fechaInicio


}

class Citas {
  constructor() {
    this.url = 'https://abogados.jandev.live'
    this.initialize();
    this.form = document.querySelector("form");

  }

  initialize() {

    // guarda la referencia de los selectores en la clase
    this.selectfecha = document.getElementById("fecha");
    this.selectHora = document.getElementById("hora");
    this.selectAbogado = document.getElementById("idAbogado");
    this.selectCliente = document.getElementById("idCliente");
    this.selectCaso = document.getElementById("idCaso");
    this.selectCubiculo = document.getElementById("numeroCubiculo");
    this.textAbogado = document.getElementById("motivo");
    this.selectEstado = document.getElementById("estadoCita");
    this.citasPendientes = document.getElementById("citasPendientes");
    this.citas = document.querySelector('.citas')

    // Agrega manejadores de eventos para los botones y el formulario
    const citasButton = document.getElementById("citasButton");
    const expedientesButton = document.getElementById("expedientesButton");
    const casasButton = document.getElementById("casasButton");
    const reportesButton = document.getElementById("reportesButton");
    const crearCitaButton = document.getElementById("crearCitaButton");

    // cargar datos en selectores

    const currentSelect = {}
    // citasButton.addEventListener("click", this.mostrarCitas.bind(this));
    // expedientesButton.addEventListener("click", this.mostrarExpedientes.bind(this));
    // casasButton.addEventListener("click", this.mostrarCasos.bind(this));
    // reportesButton.addEventListener("click", this.mostrarReportes.bind(this));
    this.selectCliente.addEventListener('change', async (e) => {
      const value = e.target.value
      currentSelect.idCliente = value

      if (currentSelect.idCliente != undefined && currentSelect.idAbogado != undefined) {
        await this.mostrarDatosEnSelector('casos', currentSelect.idCliente, currentSelect.idAbogado)
      }
    })
    this.selectAbogado.addEventListener('change', async (e) => {
      const value = e.target.value
      currentSelect.idAbogado = value
      if (currentSelect.idCliente != undefined && currentSelect.idAbogado != undefined) {

        await this.mostrarDatosEnSelector('casos', currentSelect.idCliente, currentSelect.idAbogado)
      }
    })
    this.cargarCitas()
    this.mostrarDatosEnSelector('abogados')
    this.mostrarDatosEnSelector('clientes')
    this.mostrarDatosEnSelector('cubiculos')
    crearCitaButton.addEventListener("click", this.crearCita.bind(this));
    this.selectfecha.addEventListener('change', (e) => {
      this.cargarCitas(e.target.value)
    })
  }

  mostrarCitas(citas, fecha) {

    if (!citas) {
      this.citas.innerHTML = 'Ver citas programadas: 0 citas'
      this.citasPendientes.innerHTML = `
      <div class="cita-main-wrapper">
      No se encontraron citas para la fecha: ${fecha}
      </div>`

      return
    }
    // Lógica para mostrar la sección de CITAS, por ejemplo, ocultar otras secciones
    let citasStr = ''
    this.citas.innerHTML = 'Ver citas programadas:  ' + citas.length + ' citas'
    citas.forEach(cita => {
      citasStr +=
        `<div class="cita-body">

        <div class="cita-descripcion">${cita.motivo}</div>
        <div class="cita-hora"> ${cita.fechaInicio.split('T')[1].split('.')[0]}</div>
        <div class="cita-cubiculo">${cita.cubiculo_idCubiculo}</div>
        <input class="cita-check" type="checkbox" value="${cita.idCita}" />

       </div>`
    })
    this.citasPendientes.innerHTML =
      `
      <div class="cita-main-wrapper" id='citas'>
                     <div class="cita-wrapper">
                        <div class="cita-body">
                          <div class="cita-descripcion"><h4>Motivo</h4></div>
                          <div class="cita-hora"><h4>Hora</div>
                          <div class="cita-cubiculo"><h4>Cubículo</div>
                          <div class="cita-check"><h4><p>Seleccionar</p></h4></div>
                      </div>
                      
                      ${citasStr}
                      </div>
                  <div class="buttons-main-wrapper">
                      <div class="buttons-wrapper">
                          <button class="button-cita" id="editar">modificar</button>
                          <button class="button-cita" id="eliminar">eliminar</button>
                      </div>
                  </div>
        </div>`

    this.cargarEventosChecks()

  }

  mostrarExpedientes() {
    // Lógica para mostrar la sección de EXPEDIENTES, por ejemplo, ocultar otras secciones
  }

  mostrarCasos() {
    // Lógica para mostrar la sección de CASOS, por ejemplo, ocultar otras secciones
  }

  mostrarReportes() {
    // Lógica para mostrar la sección de REPORTES, por ejemplo, ocultar otras secciones
  }

  /**
   * Metodo que renderiza en un selector la informacion proveniente de la respuesta
   * http con el metodo GET
   * @param {*} endpoint representa el enpoint para la peticion http
   */
  async mostrarDatosEnSelector(endpoint, ...args) {
    try {
      // se guarda el enpoint en una variable auxiliar
      let auxEndpoint = endpoint
      // validacion para endpoint /casos
      if (args.length != 0 && args.length > 1) {
        endpoint += '?idCliente=' + args[0] + '&idAbogado=' + args[1]

      }
      // se realiza una petición http para llenar el select abogados de manera dinamica
      const response = await fetch(`${this.url}/${endpoint}`, {
        method: 'GET'
      })
      // se convierte a json
      const resJson = await response.json()
      // si al respuesta fue 404 reinicia el selector de casos
      if (response.status == 404) this.mostrarCasos()

      // si la respuesta fue status 200 
      if (response.ok) {
        const data = resJson.data

        // dependiendo del endpoint se cargan los selectores

        switch (auxEndpoint) {
          case 'abogados':
            this.mostrarAbogados(data)
            break;
          case 'clientes':
            this.mostrarClientes(data)
            break;
          case 'cubiculos':
            this.mostrarCubiculos(data)
            break;
          case 'casos':
            this.mostrarCasos(data)
            break;
        }

      } else {
        throw new Error(resJson.msg)
      }

    } catch (err) {
      console.error(err)
    }
  }

  // renderiza abogados en el selector

  async mostrarAbogados(data) {
    this.selectAbogado.innerHTML = `
    <option selected="true" disabled="disabled" value="-1">seleccione Abogado</option>`
    data.forEach(abogado => {

      this.selectAbogado.innerHTML += `
            <option value=${abogado.idAbogado}>${abogado.nombre} ${abogado.apellidoPaterno}</option>
          `
    });

  }

  // renderiza clientes
  async mostrarClientes(data) {
    this.selectCliente.innerHTML = `
    <option selected="true" disabled="disabled" value="-1">seleccione Cliente</option>`
    data.forEach(cliente => {
      this.selectCliente.innerHTML += `
        <option value=${cliente.idCliente}>${cliente.nombre} ${cliente.apellidoPaterno}</option>
      `
    });

  }

  async mostrarCubiculos(data) {
    this.selectCubiculo.innerHTML = `
    <option selected="true" disabled="disabled" value="-1">seleccione Cubiculo</option>`
    data.forEach(cubiculo => {
      this.selectCubiculo.innerHTML += `
        <option value=${cubiculo.idCubiculo}>${cubiculo.nombre}</option>
      `
    });

  }


  async mostrarCasos(data) {
    console.log('Aqui ')
    this.selectCaso.innerHTML = `
    <option selected="true" value="-1">seleccione Caso</option>`
    if (data) {
      data.forEach(caso => {
        this.selectCaso.innerHTML += `
          <option value=${caso.idCaso}>${caso.descripcion}</option>
        `
      });
    }

  }

  // metodo que crea una cita 
  async crearCita(event) {
    event.preventDefault();
    const form = event.target;
    const fecha = this.selectfecha.value;
    const hora = this.selectHora.value;
    const abogado = this.selectAbogado.value;
    const cliente = this.selectCliente.value;
    const caso = this.selectCaso.value;
    const cubiculo = this.selectCubiculo.value;
    const motivo = this.textAbogado.value;
    const estado = this.selectEstado.value;

    try {
      const fechaInicio = convertirFechaISOString(fecha, hora)

      const response = await fetch(`${this.url}/citas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            fechaInicio,
            caso_idCaso: Number(caso),
            cubiculo_idCubiculo: Number(cubiculo),
            cliente_idCliente: Number(cliente),
            abogado_idAbogado: Number(abogado),
            motivo,
            estado
          }
        }),
      });

      const json = await response.json()
      if (response.ok) {

        alert("Cita creada con éxito");
        location.reload();
      } else {

        throw new Error(json.msg);
      }
    } catch (error) {
      alert(error)
    }
  }
  // mostar citas pendientes
  async cargarCitas(fecha) {
    try {
      let fechaRequest = ''
      this.onLoad()

      // si no se a seleccionado fecha, se utiliza la fecha actual y se asigna el valor a la variable fecha request
      if (!fecha) {
        const fechaActual = new Date()
        const fechaActualHorario = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000))
        let parse = fechaActualHorario.toISOString().split('T')
        fechaRequest = parse[0]
      } else {
        // en caso contrario se asigna el valor de entrada del datepicker-
        fechaRequest = fecha
      }

      // se realiza la peticion http de citas de acuerdo a la fecha especificada en la variable fechaRequest
      const response = await fetch(`${this.url}/citas?fechaActual=${fechaRequest}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const responseJson = await response.json()

      if (response.ok) {
        // se filtran solo las programadas
        const pendientes = responseJson.data.filter(e => e.estado == 'programada')
        // se muestran en pantalla
        this.mostrarCitas(pendientes)


      } else {
        // en caso contrario se muestra mensaje que no hay citas en la fecha 
        this.mostrarCitas(undefined, fechaRequest)
        throw new Error(responseJson.msg)
      }

    } catch (err) {
      console.error(err)
    } finally {
      this.onDefault()
    }
  }
  // eliminar cita
  async eliminarCita(id) {
    try {
      // se realiza una peticion http con el metodo DELETE y el parametro id
      const response = await fetch(`${this.url}/citas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const resJson = await response.json()

      if (response.ok) {

        alert('Cita eliminada exitosamente')
        location.reload()

      } else {
        throw new Error(resJson.msg)
      }

    } catch (error) {
      console.log(error)
    }

  }

  cargarEventosChecks() {
    const checksCitas = document.querySelectorAll('.cita-check')
    const btnEditar = document.querySelector('#editar')
    const btnEliminar = document.querySelector('#eliminar')
    let checked = []

    btnEditar.addEventListener('click', (e) => {
      if (checked.length < 1) {
        console.log("debe seleccionar")
        return
      }

    })
    btnEliminar.addEventListener('click', (e) => {
      if (checked.length < 1) {
        console.log('debe seleccionar ')
        return
      }

      let selection = confirm('Desea eliminar cita?')
      selection ? this.eliminarCita(checked[0].value) : console.log("")
    })


    checksCitas.forEach(check => {
      check.addEventListener('change', (e) => {
        // si no hay un check seleccionado se agrega a la lista
        if (checked.length < 1) {
          checked.push({
            value: e.target.value
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

  onLoad() {
    document.body.style.cursor = 'wait'
  }
  onDefault() {
    document.body.style.cursor = 'default'
  }
}



new Citas();
