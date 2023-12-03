import { CasoController } from "../controller/caso.controller";
import { NextFunction, Request, Response, Router } from "express";


export class CasoRouter {
    private router: Router;
    private casoController: CasoController
    constructor(casoController: CasoController) {
        this.casoController = casoController
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/', this.getCasosByCliente.bind(this), this.getCasos.bind(this))
        this.router.get('/:id', this.getCaso.bind(this))
        this.router.post('/', this.crearCaso.bind(this))
        this.router.put('/:id', this.actualizarCaso.bind(this))
        this.router.delete('/:id', this.eliminarCaso.bind(this))
    }

    private async getCaso(req: Request, res: Response) {
        return this.casoController.getCaso(req, res);
    }
    private async getCasos(req: Request, res: Response) {
        return this.casoController.getCasos(req, res);
    }
    private async getCasosByCliente(req: Request, res: Response, next: NextFunction) {
        return this.casoController.getCasosByCliente(req, res, next);
    }

    private async crearCaso(req: Request, res: Response) {
        return this.casoController.crearCaso(req, res);
    }

    private async actualizarCaso(req: Request, res: Response) {
        return this.casoController.actualizarCaso(req, res);
    }

    private async eliminarCaso(req: Request, res: Response) {
        return this.casoController.eliminarCaso(req, res);
    }

    public getRouter(): Router {
        return this.router
    }

}