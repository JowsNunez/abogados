
import { Request, Response } from 'express'
import { ClienteDao } from '../data/dao/cliente.dao';

export class ClienteController {

    private clienteDao: ClienteDao
    constructor(clienteDao: ClienteDao) {
        this.clienteDao = clienteDao;
    }


    async getCliente(req: Request, res: Response) {
        try {
            const abogado = await this.clienteDao.findById(Number.parseInt(req.params.id))
            res.json({ data: abogado })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }
    async getClientes(req: Request, res: Response) {
        try {
            const abogados = await this.clienteDao.findAll()
            res.json({ data: abogados })
        } catch (err: any) {
            res.status(500).json({ msg: err.message })
        }
    }


}