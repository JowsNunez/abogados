
import { Request, Response } from 'express'
import { ClienteDao } from '../data/dao/cliente.dao';
import ClienteDTO from '../data/dto/cliente.dto';
import FieldError from '../utils/FieldError';

export class ClienteController {

    private clienteDao: ClienteDao
    constructor(clienteDao: ClienteDao) {
        this.clienteDao = clienteDao;
    }

    async crearCliente(req: Request, res: Response) {
        try {
            
            const clienteDTO = req.body
            
            if(!clienteDTO.nombre) throw new FieldError({msg:"El nombre es obligatorio",field:'nombre'});
            if(!clienteDTO.apellidoPaterno) throw new FieldError({msg:"El apellido Paterno es obligatorio",field:'apellidoPaterno'});
            if(!clienteDTO.apellidoMaterno) throw new FieldError({msg:"El apellido Materno es obligatorio",field:'apellidoMaterno'});
            if(!clienteDTO.telefono) throw new FieldError({msg:"El telefono es obligatorio",field:'telefono'});
            if(!clienteDTO.correo) throw new FieldError({msg:"El correo es obligatorio",field:'correo'});
            if(!clienteDTO.rfc) throw new FieldError({msg:"El rfc es obligatorio",field:'rfc'});
            const cliente = await this.clienteDao.create(clienteDTO)
            
            return res.status(200).json({ data: cliente })
        } catch (err: any) {
           return res.status(500).json({ msg: err.message, data: err })
        }
    }
    async getCliente(req: Request, res: Response) {
        try {
            const cliente = await this.clienteDao.findById(Number.parseInt(req.params.id))
            res.json({ data: cliente })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }
    async getClientes(req: Request, res: Response) {
        try {
            const clientes = await this.clienteDao.findAll()
            res.json({ data: clientes })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }

    async actualizarCliente(req: Request, res: Response) { 
        try {
            const clienteDTO = req.body
            const idCliente:number= Number.parseInt(req.params.id);
            if(clienteDTO.nombre) throw new FieldError({msg:"El nombre es obligatorio",field:'nombre'});
            if(clienteDTO.apellidoPaterno) throw new FieldError({msg:"El apellido Paterno es obligatorio",field:'apellidoPaterno'});
            if(clienteDTO.apellidoMaterno) throw new FieldError({msg:"El apellido Materno es obligatorio",field:'apellidoMaterno'});
            if(clienteDTO.telefono) throw new FieldError({msg:"El telefono es obligatorio",field:'telefono'});
            if(clienteDTO.correo) throw new FieldError({msg:"El correo es obligatorio",field:'correo'});
            if(clienteDTO.rfc) throw new FieldError({msg:"El rfc es obligatorio",field:'rfc'});

            const cliente = await this.clienteDao.update(idCliente,clienteDTO)
            
            res.json({ data: cliente })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }

     }

    async eliminarCliente(req: Request, res: Response) {
        try {
            const idCliente:number= Number.parseInt(req.params.id);
            const cliente = await this.clienteDao.delete(idCliente)
            res.json({ data: cliente })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }   
    }


}