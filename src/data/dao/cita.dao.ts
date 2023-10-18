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
                const cita = await Cita.create(data);
                resolve(cita);
            } catch (err) {
                reject(err);
            }
        });
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

                const row = await Cita.update(data as Cita, { where: { idCita: id } })

                if (row[0] !== 1) throw new Error("Ocurrio un error al actualizar cita o no se encontró cita");
                resolve(data)
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
            throw new Error("Ocurrio un error al eliminar cita o no se encontró cita")
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

                fechaInicio: {
                    [Op.lt]: FechaFin,

                },
                fechaFin: {
                    [Op.gt]: FechaInicio
                }

            }
        })

        const citasDto: CitaDTO[] = citas.map(cita => {
            return cita as CitaDTO
        })

        return citasDto

    }

}