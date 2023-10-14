

const validacion = {

    isFechaValida: (fecha: Date): Boolean => {
      
        let fechaActual = new Date()
        fechaActual = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000))

        if (fecha < fechaActual) {
            return false
        }

        return true
    },

    // const offsetHoras = fecha.getTimezoneOffset() / 60;
    // const offsetHoras2 = new Date().getTimezoneOffset() / 60;
    isFechaLaboral: (fecha: Date) => {
        let aux = 0;
        // validar si es dia laboral
        if (fecha.getDay() == 0 || fecha.getDay() == 6) {
            aux += 1
        }
        // validar si es la hora se encuentra en el rango laboral
        if (fecha.getUTCHours() >= 18 || fecha.getUTCHours() < 10) {
            
            aux += 1
        }

        return aux == 0 ? true : false

    },

    incrementarTiempo:(fecha:Date):Date=>{
        // 30 minutos en milisegundos
        const duracionEnMilisegundos = 30 * 60 * 1000;

        const fechaInicio = fecha;
        // Establecer el horario de fin de la cita agregando 30 minutos al horario inicial
        const fechaFin = new Date(fechaInicio.getTime() + duracionEnMilisegundos);
        return fechaFin
    }
}


export default validacion
