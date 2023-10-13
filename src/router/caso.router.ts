import { CasoController } from "../controller/caso.controller";
import { Request, Response, Router } from "express";


export class CasoRouter {
    private router: Router;
    private abogadoController: CasoController
    constructor(abogadoController: CasoController) {
        this.abogadoController = abogadoController
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/', this.getCasos.bind(this))
        this.router.get('/:id', this.getCaso.bind(this))
    }

    private async getCaso(req: Request, res: Response) {
        return this.abogadoController.getCaso(req, res);
    }
    private async getCasos(req: Request, res: Response) {
        return this.abogadoController.getCasos(req, res);
    }

    public getRouter(): Router {
        return this.router
    }

}