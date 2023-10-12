import { Request, Response, Router } from "express";
import { CitaController } from "../controller/cita.controller";
export class CitasRouter {
    private router: Router;
    private citaController: CitaController
    constructor(citaController: CitaController) {
        this.citaController = citaController
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get("/", this.getCitas.bind(this));
        this.router.get("/:id", this.getCita.bind(this));
        this.router.post("/", this.crearCita.bind(this));
        this.router.put("/:id",);
        this.router.delete("/:id",);
    }

    private crearCita(req: Request, res: Response) {
        return this.citaController.crearCita(req, res)
    }
    private getCita(req: Request, res: Response) {
        return this.citaController.buscarCita(req, res)
    }
    private getCitas(req: Request, res: Response) {
        return this.citaController.getCitas(req, res)
    }

    public getRouter(): Router { 
        return this.router;
    }

}