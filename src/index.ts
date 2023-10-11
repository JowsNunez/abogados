import { connection } from "./config/connection";
import { Abogado, Cita, Cliente, Cubiculo, Demanda } from "./modelo/index";

class Main {


    public async connect() {
        try {

            await connection.authenticate()
            await connection.sync();
        } catch (err) {

        }
    }


    public async crearAbogado(abogado: any) {
        const data = await Abogado.create(abogado)
        console.log(data)
    }



}


const init = new Main()

init.connect()


init.crearAbogado({
    AbogadoNombre: "Ana Gómez",
    Documentacion: "Licenciado en Derecho",
    SeguimientoDemanda: "En Proceso",

});