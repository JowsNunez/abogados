import CitaDTO from "../dto/cita.dto";
import { Cita } from "../modelo";
import { BaseDao } from "./base.dao";
import { Op } from "sequelize";


export class CitaDao implements BaseDao<CitaDTO>{
    create(data: Cita): Promise<CitaDTO> {

        return new Promise<CitaDTO>(async (resolve, reject) => {

            try {
            
                // Establecer la zonahoraria 
                const fechaInicioLocal = new Date(data.FechaInicio.getTime() - (data.FechaInicio.getTimezoneOffset() * 60000));
                data.FechaInicio = fechaInicioLocal

                
                // validar si la fecha es anterior a hoy
                let fechaActual = new Date()
                fechaActual =new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000))
                
                if (data.FechaInicio < fechaActual) {

                    throw new Error('La fecha de inicio debe ser posterior a la hora y dia actual')
                }
               

                // validar si es dia laboral
                if (data.FechaInicio.getDay() == 0 || data.FechaInicio.getDay() == 6) {
                    throw new Error('Sólo se pueden seleccionar dias laborales')
                }
                // validar si es la hora se encuentra en el rango laboral
                if (data.FechaInicio.getUTCHours() > 18 || data.FechaInicio.getUTCHours() < 8) {
                    throw new Error('Fuera del rango de horas laborales')
                }

                // 30 minutos en milisegundos
                const duracionEnMilisegundos = 30 * 60 * 1000;

                const fechaInicio = data.FechaInicio;
                // Establecer el horario de fin de la cita agregando 30 minutos al horario inicial
                const fechaFin = new Date(fechaInicio.getTime() + duracionEnMilisegundos);
                data.FechaFin = fechaFin

                //Validar si existe una cita entre el rango de fecha
                const citas = await this.findByFechaInicioFin(data.FechaInicio, data.FechaFin)

                //Validar si el cubiculo o abogado tienen una cita en el horario
                const citaExistente = citas.find(cita =>

                    (cita.Cubiculo_cita === data.Cubiculo_cita)
                    || (cita.Abogado_cita === data.Abogado_cita));

                if (citaExistente) {

                    throw new Error('Horario no disponible para cita')
                } else {

                    const cita = await Cita.create(data);
                    resolve(cita)
                }

            } catch (err) {
                reject(err)
            }
        })
    }

    findById(id: number): Promise<CitaDTO> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CitaDTO[]> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: CitaDTO): Promise<CitaDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async findByFechaInicioFin(FechaInicio: Date, FechaFin: Date): Promise<CitaDTO[]> {
        //TODO: refactorizar a modulos
        // Consulta de acuerdo ala fecha inicial y final de la cita
        const citas: Cita[] = await Cita.findAll({
            where: {

                FechaInicio: {
                    [Op.lt]: FechaFin,

                },
                FechaFin: {
                    [Op.gt]: FechaInicio
                }

            }
        })

        const citasDto: CitaDTO[] = citas.map(cita => {
            return {
                idCita: cita?.idCita,
                Cliente_cita: cita?.Cliente_cita,
                Abogado_cita: cita?.Abogado_cita,
                Cubiculo_cita: cita?.Cubiculo_cita,
                Demanda_cita: cita?.Demanda_cita,
                Estado: cita?.Estado,
                FechaInicio: cita?.FechaInicio,
                FechaFin: cita?.FechaFin,
                Motivo: cita?.Motivo
            } as CitaDTO
        })

        return citasDto

    }

}