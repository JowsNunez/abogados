require("dotenv").config()
import { connection } from "./config/connection";
import { CitaDao } from "./data/dao/cita.dao";
import express, { Express, Router } from "express";
import { CitaController } from "./controller/cita.controller";
import { CitasRouter } from "./router/citas.router";
import { AbogadoRouter } from "./router/abogado.router";
import { AbogadoDao } from "./data/modelo";
import { AbogadoController } from "./controller/abogado.controller";

class Main {

    private server: Express
    private citaRouter!: CitasRouter
    private abogadoRouter!: AbogadoRouter


    constructor() {
        this.server = express();

    }
    public async connect() {
        try {
            await connection.authenticate()
            await connection.sync();
        } catch (err: any) {
            console.log(err?.message)
        }
    }

    public configServer() {
        this.server.use(express.json())
        this.server.use("/citas", this.citaRouter.getRouter())
        this.server.use("/abogados", this.abogadoRouter.getRouter())

    }

    public init() {
        const port = process.env.PORT || 3000
        this.server.listen(port, () => {
            console.log('Server on port', port)
        })
    }

    // builder
    setCitaRouter(citaRouter: CitasRouter): Main {
        this.citaRouter = citaRouter
        return this
    }
    setAbogadoRouter(abogadoRouter: AbogadoRouter): Main {
        this.abogadoRouter = abogadoRouter
        return this
    }

    build(): Main {
        return this
    }


}

// Iniciar DAO'S
const citaDao = new CitaDao()
const abogadoDao = new AbogadoDao()

// iniciar Controllers
const citaController = new CitaController(citaDao)
const abogadoController = new AbogadoController(abogadoDao)
// Iniciar Routers
const citaRouter = new CitasRouter(citaController)
const abogadoRouter = new AbogadoRouter(abogadoController)

//
const main = new Main()
    .setCitaRouter(citaRouter)
    .setAbogadoRouter(abogadoRouter)
    .build()

main.connect()
main.configServer()
main.init()
