import { Request, Response, Router } from "express";
import { ClienteController } from "../controller/cliente.controller";

export class ClienteRouter {
    private router: Router;
    private clienteController: ClienteController
    constructor(clienteController: ClienteController) {
        this.clienteController = clienteController
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/', this.getClientes.bind(this))
        this.router.get('/:id', this.getCliente.bind(this))
        this.router.post('/',this.crearCliente.bind(this))
        this.router.put('/:id', this.actualizarCliente.bind(this))
        this.router.delete('/:id',this.eliminarCliente.bind(this))

    }

    private async getCliente(req: Request, res: Response) {
        return this.clienteController.getCliente(req, res);
    }
    private async getClientes(req: Request, res: Response) {
        return this.clienteController.getClientes(req, res);
    }

    private async crearCliente(req:Request,res:Response){
        return this.clienteController.crearCliente(req,res);
    }

    private async actualizarCliente(req:Request,res:Response){
        return this.clienteController.actualizarCliente(req,res);
    }

    private async eliminarCliente(req:Request,res:Response){
        return this.clienteController.eliminarCliente(req,res);
    }
    
    public getRouter(): Router {
        return this.router
    }

}