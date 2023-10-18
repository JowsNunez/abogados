class Citas {
    constructor() {
      this.initialize();
      const form = document.querySelector("form");
      form.addEventListener("submit", this.crearCita.bind(this));
  }
  
    initialize() {
      // Agrega el código HTML al cuerpo del documento utilizando template literals
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Crear Cita -- R&R Abogados y Asociados</title>
            <link rel="icon" href="img/icono.ico" type="image/x-icon">
            <link rel="stylesheet" href="crearCita.css">
        </head>
        <body>
            <header>
                <nav>
                    <ul id="button">
                        <li class="rr"><a href="#">R&R ABOGADOS Y ASOCIADOS</a></li>
                        <li><a href="#" id="citasButton">CITAS</a></li>
                        <li><a href="#" id="expedientesButton">EXPEDIENTES</a></li>
                        <li><a href="#" id="casosButton">CASOS</a></li>
                        <li><a href="#" id="reportesButton">REPORTES</a></li>
                        <li>
                            <form action="#" method="post">
                                <input type="text" name "search" placeholder="Búsqueda de citas">
                                <button type="submit">Buscar</button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </header>
            <h1>AGENDAR CITA</h1>
            <div class="main-container">
                <div class="datetime-container">
                    <h4>Selecciona fecha y hora: </h4>
                    <label for="fecha" class="datetime-label">Fecha:</label>
                    <input type="date" id="fecha" class="datetime-picker">
                    <label for="hora" class="datetime-label">Hora:</label>
                    <input type="time" id="hora" class="datetime-picker">
                </div>
                <div class="form-container">
                    <form class="grid-container">
                        <div class="select-container grid-item">
                            <div class="left-align">
                                <label for="abogado">Abogado:</label>
                                <select id="nombreAbogados" required>
                                    <option value="Claudia Patricia Davalos">Claudia Patricia Davalos</option>
                                    <option value="abogado2">Hector g</option>
                                    <option value="abogado3">Alfredo N</option>
                                </select>
                            </div>
                        </div>
                        <div class="right-align grid-item">
                            <label for="nombreCliente">Nombre del Cliente:</label>
                            <input type="text" id="nombreCliente" name="nombreCliente" required>
                        </div>
                     
                        <div class="left-align grid-item">
                            <label for="motivo">Motivo:</label>
                            <textarea id="motivo" name="motivo" rows="4" required></textarea>
                        </div>
                        <div class="select-container grid-item">
                            <div class="right-align">
                                <label for="cubiculo">Selecciona un cubículo:</label>
                                <select id="numeroCubiculo" required>
                                    <option value="1">Cubículo 1</option>
                                    <option value="2">Cubículo 2</option>
                                </select>
                            </div>
                        </div>
                        <div class="full-width">
                            <button type="submit" class="orange-button" id="crearCitaButton">Crear Cita</button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
        <footer>
            <p>Contacto</p>
            <p>rrabogados@example.com</p>
            <br>
            <p>Telefono</p>
            <p>(644) 228 9951</p>
            <p>Sistema de gestión jurídica R&R abogados y asociados</p>
        </footer>
        </html>
      `;
  
      // Agrega el HTML al cuerpo del documento
      document.body.innerHTML = html;
  
      // Agrega manejadores de eventos para los botones y el formulario
      const citasButton = document.getElementById("citasButton");
      const expedientesButton = document.getElementById("expedientesButton");
      const casasButton = document.getElementById("casasButton");
      const reportesButton = document.getElementById("reportesButton");
      const crearCitaButton = document.getElementById("crearCitaButton");
  
      citasButton.addEventListener("click", this.mostrarCitas.bind(this));
      expedientesButton.addEventListener("click", this.mostrarExpedientes.bind(this));
      casasButton.addEventListener("click", this.mostrarCasos.bind(this));
      reportesButton.addEventListener("click", this.mostrarReportes.bind(this));
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
  
    async crearCita(event) {
      event.preventDefault();
      const form = event.target;
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const abogado = document.getElementById("nombreAbogados").value;
      const cliente = document.getElementById("nombreCliente").value;
      const motivo = document.getElementById("motivo").value;
      const cubiculo = document.getElementById("numeroCubiculo").value;
  
      try {
        const response = await fetch("/api/citas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fechaInicio: fecha,
            fechaFin: fecha,
            cliente_idCliente: cliente,
            abogado_idAbogado: abogado,
            motivo,
            estado: "programada",
          }),
        });
  
        if (response.ok) {
          alert("Cita creada con éxito");
          form.reset();
        } else {
          throw new Error("Error al crear la cita");
        }
      } catch (error) {
        console.error("Error al crear la cita:", error);
      }
    }
  }
  
  new Citas();
  