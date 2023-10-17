import { CasoController } from "../controller/caso.controller";
import { NextFunction, Request, Response, Router } from "express";


export class CasoRouter {
    private router: Router;
    private abogadoController: CasoController
    constructor(abogadoController: CasoController) {
        this.abogadoController = abogadoController
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/', this.getCasosByCliente.bind(this), this.getCasos.bind(this))
        this.router.get('/:id', this.getCaso.bind(this))
    }

    private async getCaso(req: Request, res: Response) {
        return this.abogadoController.getCaso(req, res);
    }
    private async getCasos(req: Request, res: Response) {
        return this.abogadoController.getCasos(req, res);
    }
    private async getCasosByCliente(req: Request, res: Response, next: NextFunction) {
        return this.abogadoController.getCasosByCliente(req, res, next);
    }

    public getRouter(): Router {
        return this.router
    }

}