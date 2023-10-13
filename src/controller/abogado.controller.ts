import { AbogadoDao } from "../data/modelo";
import {Request,Response} from 'express'

export class AbogadoController {

    private abogadoDao: AbogadoDao
    constructor(abogadoDao: AbogadoDao) {
        this.abogadoDao = abogadoDao;
    }


    async getAbogado(req: Request, res: Response){
        try{
            const abogado = await this.abogadoDao.findById(Number.parseInt(req.params.id))
            res.json({data:abogado})
        }catch(err:any){
            res.status(500).json({msg:err.message})
        }
    }
    async getAbogados(req: Request, res: Response){
        try{
            const abogados = await this.abogadoDao.findAll()
            res.json({data:abogados})
        }catch(err:any){
            res.status(500).json({msg:err.message})
        }
    }


}