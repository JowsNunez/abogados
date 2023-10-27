import { NextFunction, Request, Response } from "express";
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
            // validar campos
            // TODO: refactor
            // se cambia a undefined cuando entre el cliente y el abogado habra un primer encuentro
            if (data.caso_idCaso == -1) data.caso_idCaso = undefined
            //
            if (!data.cliente_idCliente || data.cliente_idCliente == -1) throw new Error('Debe seleccionar un cliente')
            if (!data.abogado_idAbogado || data.abogado_idAbogado == -1) throw new Error('Debe seleccionar un abogado')
            if (!data.estado || data.estado.match(/\d/)) throw new Error('Se debe seleccionar Estado')
            if (!data.cubiculo_idCubiculo || data.cubiculo_idCubiculo == -1) throw new Error('Se debe seleccionar cúbiculo')
            if (!data.motivo || data.motivo.match(/^\s*((^\s)?!.*)/)) throw new Error('Se debe ingresar motivo de cita')
            if (!data.fechaInicio) throw new Error('Debe seleccionar Fecha  y hora')

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
            citas.find(cita =>

                validacion.isAbogadoDisponible(cita.abogado_idAbogado, data.abogado_idAbogado)
                || validacion.isCubiculoDisponible(cita.cubiculo_idCubiculo, data.cubiculo_idCubiculo));


            const newCita: CitaDTO = await this.citaDao.create(data);
            return res.json({ msg: "succes", data: newCita })




        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }


    }

    async buscarCita(req: Request, res: Response) {
        try {
            const cita = await this.citaDao.findById(Number.parseInt(req.params.id))

            return res.json({ data: cita })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async getCitas(req: Request, res: Response) {
        const { fechaActual } = req.query

        try {
            const citas = await this.citaDao.findAll()
            return res.json({ data: citas })
        } catch (err: any) {
            return res.status(500).json({ msg: err?.message })
        }
    }

    async getCitasByFecha(req: Request, res: Response, next: NextFunction) {
        let { fechaActual } = req.query

        if (!fechaActual) { return next(); }


        try {
            // convertir a iso String
            let fechaActualInicio = fechaActual + 'T00:00:00.000Z'
            let fechaActualFin = fechaActual + 'T23:59:59.999Z'
            // convertir a DATE
            const fechaInicio = new Date(fechaActualInicio)
            const fechaFin = new Date(fechaActualFin)

            const citas = await this.citaDao.findByFechaInicioFin(fechaInicio, fechaFin)

            if (citas.length == 0) {
                return res.status(404).json({ msg: 'No se encontraron citas dentro de la fecha: ' + fechaActual })
            }

            return res.json({ data: citas, msg: 'filtro' })
        } catch (err: any) {
            return res.status(500).json({ msg: err?.message })
        }
    }

    async updateCita(req: Request, res: Response) {
        try {
            const idCita = Number.parseInt(req.params.id)
            const data = req.body.data
            
            
            if (data.fechaInicio) {

                const fecha = new Date(data.fechaInicio)

                if (!validacion.isFechaValida(fecha)) {
                    throw new Error('La fecha de inicio debe ser posterior a la hora y dia actual')
                }

                if (!validacion.isFechaLaboral(fecha)) {
                    throw new Error('La fecha debe ser dentro de días y horas laborales.')
                }

                data.fechaInicio = fecha
                data.fechaFin = validacion.incrementarTiempo(fecha)
            } else {
                const foundCita = await Cita.findByPk(idCita)
                data.fechaInicio = foundCita?.dataValues.fechaInicio
                data.fechaFin = foundCita?.dataValues.fechaFin
            }
            
            
            //Validar si existe una cita entre el rango de fecha
            const citas = await this.citaDao.findByFechaInicioFin(data.fechaInicio, data.fechaFin)
            
            
            //Validar si el cubiculo o abogado tienen una cita en el horario
            citas.find(cita =>
                 validacion.isAbogadoDisponible(cita.abogado_idAbogado, data.abogado_idAbogado)
                ||validacion.isCubiculoDisponible(cita.cubiculo_idCubiculo, data.cubiculo_idCubiculo));
            
                


            const cita = await this.citaDao.update(idCita, data)

            return res.json({ data: cita, msg: 'succes' })

        } catch (err: any) {
            return res.status(500).json({ msg: err?.message })
        }
    }

    async deleteCita(req: Request, res: Response) {
        try {
            const idCita = Number.parseInt(req.params.id)

            
            const cita = await this.citaDao.delete(idCita)

            return res.json({ data: cita })

        } catch (err: any) {
            return res.status(500).json({ msg: err?.message })
        }
    }


}