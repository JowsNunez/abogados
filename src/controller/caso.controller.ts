
import { NextFunction, Request, Response, Router } from 'express'
import { CasoDao } from '../data/dao/caso.dao';

export class CasoController {

    private casoDao: CasoDao
    constructor(casoDao: CasoDao) {
        this.casoDao = casoDao;

    }

    async getCaso(req: Request, res: Response) {
        try {
            const abogado = await this.casoDao.findById(Number.parseInt(req.params.id))
            res.json({ data: abogado })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }

    async getCasos(req: Request, res: Response) {
        try {
            const casos = await this.casoDao.findAll()
            res.json({ data: casos })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }

    async getCasosByCliente(req: Request, res: Response, next: NextFunction) {
        let { idCliente, idAbogado } = req.query

       
        if (!idCliente|| !idAbogado ) {
            return next();
        }

        try {

            const idClienteNumber: number = Number(idCliente)
            const idAbogadoNumber: number = Number(idAbogado)
            if (isNaN(idClienteNumber) || isNaN(idAbogadoNumber)) {
                return res.status(400).json({ msg: 'No se pueden convertir caracteres a digitos' })
            }
            const casos = await this.casoDao.findByClienteAndAbogado(idClienteNumber, idAbogadoNumber)

            if (casos.length == 0) return res.status(404).json({ msg: 'No se encontraron casos' })

            return res.json({ data: casos, msg: 'filtro' })


        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }

    }

}