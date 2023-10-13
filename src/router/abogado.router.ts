import { Request, Response, Router } from "express";
import { AbogadoController } from "../controller/abogado.controller";
export class AbogadoRouter {
    private router: Router;
    private abogadoController: AbogadoController
    constructor(abogadoController: AbogadoController) {
        this.abogadoController = abogadoController
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/', this.getAbogados.bind(this))
        this.router.get('/:id', this.getAbogado.bind(this))
    }

    private async getAbogado(req: Request, res: Response) {
        return this.abogadoController.getAbogado(req, res);
    }
    private async getAbogados(req: Request, res: Response) {
        return this.abogadoController.getAbogados(req, res);
    }

    public getRouter():Router{
        return this.router
    }

}