import { CubiculoDao } from "../data/dao/cubiculo.dao";
import { Request, Response } from 'express'



export class CubiculoController {

    private cubiculoDao: CubiculoDao
    constructor(cubiculoDao: CubiculoDao) {
        this.cubiculoDao = cubiculoDao;
    }


    async getCubiculo(req: Request, res: Response) {
        try {
            const cubiculo = await this.cubiculoDao.findById(Number.parseInt(req.params.id))
            res.json({ data: cubiculo })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }
    async getCubiculos(req: Request, res: Response) {
        try {
            const cubiculos = await this.cubiculoDao.findAll()
            res.json({ data: cubiculos })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }


}