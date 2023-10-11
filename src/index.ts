import { connection } from "./config/connection";
import { Abogado, AbogadoDao, Cita, Cliente, Cubiculo, Demanda } from "./data/modelo";

class Main {


    public async connect() {
        try {

            await connection.authenticate()
            await connection.sync();
        } catch (err) {

        }
    }


    public async crearAbogado(abogado: any) {
        const data = new AbogadoDao().create(abogado)

    }



}


const init = new Main()

init.connect()


init.crearAbogado({
    AbogadoNombre: "Ana Gómez",
    Documentacion: "Licenciado en Derecho",
    SeguimientoDemanda: "En Proceso",
});