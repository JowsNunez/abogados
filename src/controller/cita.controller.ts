import { Request, Response } from "express";
import CitaDTO from "../data/dto/cita.dto";
import { CitaDao } from "../data/dao/cita.dao";
import { Cita } from "../data/modelo";
import validacion from "../utils/validacion"; '.././utils/validacion'
export class CitaController {

    private citaDao: CitaDao
    constructor(citaDao: CitaDao) {
        this.citaDao = citaDao;
    }

    async crearCita(req: Request, res: Response) {
        try {
            const data = req.body.data as Cita
            const fecha = new Date(data.fechaInicio)

            if (!validacion.isFechaValida(fecha)) {
                throw new Error('La fecha de inicio debe ser posterior a la hora y dia actual')
            }

            if (!validacion.isFechaLaboral(fecha)) {
                throw new Error('La fecha debe ser dentro de días y horas laborales.')
            }

            data.fechaInicio = fecha
            data.fechaFin = validacion.incrementarTiempo(fecha)

            //Validar si existe una cita entre el rango de fecha
            const citas = await this.citaDao.findByFechaInicioFin(data.fechaInicio, data.fechaFin)

            //Validar si el cubiculo o abogado tienen una cita en el horario
            const citaExistente = citas.find(cita =>
                
                (cita.cubiculo_idCubiculo == data.cubiculo_idCubiculo)
                || (cita.abogado_idAbogado == data.abogado_idAbogado));

            if (!citaExistente) {
                const newCita: CitaDTO = await this.citaDao.create(data);
                res.json({ msg: "succes", data: newCita })
            }
            throw new Error('Horario no disponible para cita')


        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }


    }

    async buscarCita(req: Request, res: Response) {
        try {
            const cita = await this.citaDao.findById(Number.parseInt(req.params.id))

            res.json({ data: cita })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }

    async getCitas(req: Request, res: Response) {
        try {
            const citas = await this.citaDao.findAll()
            res.json({ data: citas })
        } catch (err: any) {
            res.status(500).json({ msg: err?.message })
        }
    }

    async updateCita(req: Request, res: Response) {
        try {
            const idCita = Number.parseInt(req.params.id)
            const data = req.body.data

            const cita = await this.citaDao.update(idCita, data)

            res.json({ data: cita })

        } catch (err: any) {
            res.status(500).json({ msg: err?.message })
        }
    }

    async deleteCita(req: Request, res: Response) {
        try {
            const idCita = Number.parseInt(req.params.id)

            console.log(idCita)
            const cita = await this.citaDao.delete(idCita)

            res.json({ data: cita })

        } catch (err: any) {
            res.status(500).json({ msg: err?.message })
        }
    }


}