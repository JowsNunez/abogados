
import { Request, Response, Router } from 'express'
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


}