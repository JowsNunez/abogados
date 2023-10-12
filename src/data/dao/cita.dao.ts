import CitaDTO from "../dto/cita.dto";
import { Cita } from "../modelo";
import { BaseDao } from "./base.dao";
import { Op } from "sequelize";


export class CitaDao implements BaseDao<CitaDTO>{

    /**
     * @method create este método crea una nueva cita 
     * @param data representa la información de la cita
     * @returns devuelve una promesa con la cita agrega o en caso contrario un error
     */
    create(data: Cita): Promise<CitaDTO> {

        return new Promise<CitaDTO>(async (resolve, reject) => {

            try {



                // // Establecer la zonahoraria 
                // const fechaInicioLocal = new Date(data.FechaInicio.getTime() - (data.FechaInicio.getTimezoneOffset() * 60000));
                // data.FechaInicio = fechaInicioLocal


                // // validar si la fecha es anterior a hoy
                let fechaActual = new Date()
                fechaActual = new Date(fechaActual.getTime() - (fechaActual.getTimezoneOffset() * 60000))

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

    /**
     * @method findById Este método se encarga de obtener una cita de acuerdo a su id
     * @param id representa el id de la cita
     * @returns devuelve una promesa con la cita encontrada o encaso contrario un error
     */
    async findById(id: number): Promise<CitaDTO> {
        try {
            const cita = await Cita.findByPk(id);
            const reqcita: CitaDTO = cita?.dataValues as CitaDTO
            if (!reqcita) throw new Error("No se encontró cita")
            return reqcita
        } catch (err) {
            throw err
        }
    }

    /**
     * @method findAll Este método obtiene todas las citas 
     * @returns devuelve una lista con todas las citas
     */
    async findAll(): Promise<CitaDTO[]> {
        try {
            const citas = await Cita.findAll();
            const citasDTO = citas.map(cita => cita as CitaDTO)
            return citasDTO
        } catch (err) {
            throw err
        }
    }

    /**
     * @method update Este método se encarga de actualizar una cita
     * @param id reprenseta el id de la cita a actualizar
     * @param data representa la nueva información de la cita
     * @returns devuelve una promesa con la cita actualizada o en caso contrario un error
     */
    async update(id: number, data: CitaDTO): Promise<CitaDTO> {
        return new Promise(async (resolve, reject) => {
            try {
                const [row, [cita]] = await Cita.update(data as Cita, { where: { idCita: id }, returning: true })

                if (row < 0) throw new Error("No se encontró cita");
                

                resolve(cita as CitaDTO)

            } catch (err) {
                reject(err)
            }
        })

    }

    /**
     * @method delete Este método elimina una cita de acuerdo a su id
     * @param id Representa el id de una cita
     * @returns devuelve una promesa con verdadero si la cita fue eliminada o falso en caso contrario
     */
    async delete(id: number): Promise<boolean> {
        try {
            const citas = await Cita.destroy({ where: { idCita: id } });
            if (citas > 0) {
                return true

            }
            return false
        } catch (err) {
            throw err
        }
    }

    /**
     * @method findByFechaInicioFin Este método busca citas entre dos fechas
     * @param FechaInicio Representa la fecha de apertura del rango a buscar
     * @param FechaFin Representa la fecha de cerradura del rango a buscar
     * @returns devuelve una lista con las citas encontradas 
     */
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