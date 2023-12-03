
import { NextFunction, Request, Response, Router } from 'express'
import { CasoDao } from '../data/dao/caso.dao';
import FieldError from '../utils/FieldError';
import { Caso } from '../data/modelo';

export class CasoController {

    private casoDao: CasoDao
    constructor(casoDao: CasoDao) {
        this.casoDao = casoDao;

    }

    async crearCaso(req:Request,res:Response){
        try{
            const caso:Caso = req.body
            if(caso.abogado_idAbogado) throw new FieldError({msg:"El id del abogado es obligatorio",field:'abogado_idAbogado'});
            if(caso.cliente_idCliente) throw new FieldError({msg:"El id del cliente es obligatorio",field:'cliente_idCliente'});
            if(caso.descripcion) throw new FieldError({msg:"La descripcion es obligatoria",field:'descripcion'});
            if(caso.estado) throw new FieldError({msg:"El estado es obligatorio",field:'estado'});
            if(caso.fecha_comienzo) throw new FieldError({msg:"La fecha de inicio es obligatoria",field:'fechaComienzo'});
            if(caso.nombre_demandado) throw new FieldError({msg:"El nombre del demandado es obligatorio",field:'nombre_demandado'});
            
            const newCaso = await this.casoDao.create(caso)
            return res.status(200).json({ data: newCaso })

        }catch(err:any){
            return res.status(500).json({ msg:err.message,data:err})
        }
    }

    async getCaso(req: Request, res: Response) {
        try {
            const caso = await this.casoDao.findById(Number.parseInt(req.params.id))
            res.json({ data: caso })
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

    async actualizarCaso(req: Request, res: Response) {
        try {
            const caso:Caso = req.body
            const idCaso:number= Number.parseInt(req.params.id);
            if(caso.abogado_idAbogado) throw new FieldError({msg:"El id del abogado es obligatorio",field:'abogado_idAbogado'});
            if(caso.cliente_idCliente) throw new FieldError({msg:"El id del cliente es obligatorio",field:'cliente_idCliente'});
            if(caso.descripcion) throw new FieldError({msg:"La descripcion es obligatoria",field:'descripcion'});
            if(caso.estado) throw new FieldError({msg:"El estado es obligatorio",field:'estado'});
            if(caso.fecha_comienzo) throw new FieldError({msg:"La fecha de inicio es obligatoria",field:'fechaComienzo'});
            if(caso.nombre_demandado) throw new FieldError({msg:"El nombre del demandado es obligatorio",field:'nombre_demandado'});
            
            const newCaso = await this.casoDao.update(idCaso,caso)
            return res.status(200).json({ data: newCaso })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async eliminarCaso(req: Request, res: Response) {
        try {
            const idCaso:number= Number.parseInt(req.params.id);
            const caso = await this.casoDao.delete(idCaso)
            return res.json({ data: caso })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

}