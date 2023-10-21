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
    this.url = 'http://localhost:5000'
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
  }

  mostrarCitas() {
    // Lógica para mostrar la sección de CITAS, por ejemplo, ocultar otras secciones
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
      if (response.status == 404)   this.mostrarCasos()
      
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

      }  else {
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
  async cargarCitas() {
    try {
      const fechaActual = new Date()
      const fechaActualHorario = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000))
      const parse = fechaActualHorario.toISOString().split('T')
      const response = await fetch(`${this.url}/citas?fechaActual=${parse[0]}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const responseJson = await response.json()

      if (response.ok) {
        /* responseJson.data.forEach(e=>{document.getElementById('citas').innerHTML+=`
         <div>
             <span>${e.motivo}</span>
             <span>${new Date(e.fechaInicio).toUTCString()}</span>
             <span>${new Date(e.fechaFin).toUTCString()}</span>
             <span>${e.cubiculo_idCubiculo}</span>
             </div>
         `});*/
        const pendientes = responseJson.data.filter(e => e.estado == 'programada')

        console.log('citas programadas', pendientes)
      } else {
        throw new Error(responseJson.msg)
      }

    } catch (err) {
      console.error(err)
    }
  }

}



new Citas();
