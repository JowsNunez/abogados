import { Request, Response } from "express";
import CitaDTO from "../data/dto/cita.dto";
import { CitaDao } from "../data/dao/cita.dao";
import { Cita } from "../data/modelo";

export class CitaController {

    private citaDao: CitaDao
    constructor(citaDao: CitaDao) {
        this.citaDao = citaDao;
    }

    async crearCita(req: Request, res: Response) {
        try {
            const data = req.body.data as Cita
            const fecha = new Date(data.FechaInicio)

            data.FechaInicio = fecha
            // const offsetHoras = fecha.getTimezoneOffset() / 60;
            // const offsetHoras2 = new Date().getTimezoneOffset() / 60;

            const newCita: CitaDTO = await this.citaDao.create(data);

            res.json({ msg: "Succes", data: newCita })
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

            const cita = await this.citaDao.update( idCita,data)

            res.json({ data: cita })

        } catch (err: any) {
            res.status(500).json({ msg: err?.message })
        }
    }
   
    async deleteCita(req:Request,res:Response){
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