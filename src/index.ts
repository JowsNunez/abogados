require("dotenv").config()
import { connection } from "./config/connection";

import express, { Express, Router } from "express";
import cors from 'cors'
import { CitaDao } from "./data/dao/cita.dao";
import { CitaController } from "./controller/cita.controller";
import { CitasRouter } from "./router/citas.router";
import { AbogadoRouter } from "./router/abogado.router";
import { AbogadoDao } from "./data/modelo";
import { AbogadoController } from "./controller/abogado.controller";
import { CasoRouter } from "./router/caso.router";
import { CasoDao } from "./data/dao/caso.dao";
import { CasoController } from "./controller/caso.controller";
import { ClienteDao } from "./data/dao/cliente.dao";
import { ClienteRouter } from "./router/cliente.router";
import { ClienteController } from "./controller/cliente.controller";
import { CubiculoRouter } from "./router/cubiculo.router";
import { CubiculoDao } from "./data/dao/cubiculo.dao";
import { CubiculoController } from "./controller/cubiculo.controller";

class Main {

    private server: Express
    private citaRouter!: CitasRouter
    private abogadoRouter!: AbogadoRouter
    private casoRouter!: CasoRouter
    private clienteRouter!: ClienteRouter
    private cubiculoRouter!: CubiculoRouter


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
        this.server.use(cors({
            origin: '*'
        }))
        //Rutas
        this.server.use("/citas", this.citaRouter.getRouter())
        this.server.use("/abogados", this.abogadoRouter.getRouter())
        this.server.use("/casos", this.casoRouter.getRouter())
        this.server.use("/clientes", this.clienteRouter.getRouter())
        this.server.use("/cubiculos", this.cubiculoRouter.getRouter())


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
    setCasoRouter(casoRouter: CasoRouter): Main {
        this.casoRouter = casoRouter
        return this
    }
    setClienteRouter(clienteRouter: ClienteRouter): Main {
        this.clienteRouter = clienteRouter
        return this
    }
    setCubiculoRouter(cubiculoRouter: CubiculoRouter): Main {
        this.cubiculoRouter = cubiculoRouter
        return this
    }

    build(): Main {
        return this
    }


}

// Iniciar DAO'S
const citaDao = new CitaDao()
const abogadoDao = new AbogadoDao()
const casoDao = new CasoDao()
const clienteDao = new ClienteDao()
const cubiculoDao = new CubiculoDao()

// iniciar Controllers
const citaController = new CitaController(citaDao)
const abogadoController = new AbogadoController(abogadoDao)
const casoController = new CasoController(casoDao)
const clienteController = new ClienteController(clienteDao)
const cubiculoController = new CubiculoController(cubiculoDao)

// Iniciar Routers
const citaRouter = new CitasRouter(citaController)
const abogadoRouter = new AbogadoRouter(abogadoController)
const casoRouter = new CasoRouter(casoController)
const clienteRouter = new ClienteRouter(clienteController)
const cubiculoRouter = new CubiculoRouter(cubiculoController)

//
const main = new Main()
    .setCitaRouter(citaRouter)
    .setAbogadoRouter(abogadoRouter)
    .setCasoRouter(casoRouter)
    .setCubiculoRouter(cubiculoRouter)
    .setClienteRouter(clienteRouter)
    .build()

main.connect()
main.configServer()
main.init()
