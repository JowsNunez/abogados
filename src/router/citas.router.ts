import { NextFunction, Request, Response, Router } from "express";
import { CitaController } from "../controller/cita.controller";

export class CitasRouter {
    private router: Router;
    private citaController: CitaController

    constructor(citaController: CitaController) {
        this.citaController = citaController;
        this.router = Router();
        this.init();
    }

    private init() {
        this.router.get("/", this.getCitasByFecha.bind(this), this.getCitas.bind(this));
        this.router.get("/:id", this.getCita.bind(this));
        this.router.post("/", this.crearCita.bind(this));
        this.router.post("/crear-cita", this.crearCitaDesdeFormulario.bind(this)); // Nueva ruta para crear citas desde el formulario
        this.router.put("/:id", this.updateCita.bind(this));
        this.router.delete("/:id", this.deleteCita.bind(this));
    }

    private crearCita(req: Request, res: Response) {
        return this.citaController.crearCita(req, res);
    }

    private crearCitaDesdeFormulario(req: Request, res: Response) {
        // Lógica para crear una cita desde el formulario en la página HTML
        // Utiliza los datos enviados desde el formulario para crear la cita
        // Puedes acceder a los datos del formulario en req.body
        res.status(201).json({ message: "Cita creada desde el formulario con éxito" });
    }

    private getCita(req: Request, res: Response) {
        return this.citaController.buscarCita(req, res);
    }

    private getCitas(req: Request, res: Response) {
        return this.citaController.getCitas(req, res);
    }

    private getCitasByFecha(req: Request, res: Response, next: NextFunction) {
        return this.citaController.getCitasByFecha(req, res, next);
    }

    private updateCita(req: Request, res: Response) {
        return this.citaController.updateCita(req, res);
    }

    private deleteCita(req: Request, res: Response) {
        return this.citaController.deleteCita(req, res);
    }

    public getRouter(): Router {
        return this.router;
    }
}
