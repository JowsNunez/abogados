import { Request, Response, Router } from "express";
import { CubiculoController } from "../controller/cubiculo.controller";

export class CubiculoRouter {
    private router: Router;
    private cubiculoController: CubiculoController
    constructor(cubiculoController: CubiculoController) {
        this.cubiculoController = cubiculoController
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get('/', this.getCubiculos.bind(this))
        this.router.get('/:id', this.getCubiculo.bind(this))
    }

    private async getCubiculo(req: Request, res: Response) {
        return this.cubiculoController.getCubiculo(req, res);
    }
    private async getCubiculos(req: Request, res: Response) {
        return this.cubiculoController.getCubiculos(req, res);
    }

    public getRouter(): Router {
        return this.router
    }

}