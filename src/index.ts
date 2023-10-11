import { connection } from "./config/connection";
import { CitaDao } from "./data/dao/cita.dao";
import CitaDTO from "./data/dto/cita.dto";
import { Abogado, AbogadoDao, Cita, Cliente, Cubiculo, Demanda } from "./data/modelo";

class Main {

    //TODO: Refactorizar
    public async connect() {
        try {

            await connection.authenticate()
            await connection.sync();
        } catch (err) {

        }
    }



    public async crearCita(cita: any) {
        try {

            const data = await new CitaDao().create(cita);
            console.log(data)
        } catch (err) {
            console.error(err)
        }

    }



}






(async () => {
    const init = new Main()
    init.connect()
    // Abogado 1 cubiculo 2
    init.crearCita({
        Motivo: "",
        Abogado_cita: 1,
        Cliente_cita: 2,
        Cubiculo_cita: 2,
        Demanda_cita: 1,
        Estado: "Inicio",
        FechaInicio: new Date("2023-10-13T11:00:00-07:00")
    } as CitaDTO)
        .then(() => {

            //ABogado 2 cubiculo 2
            init.crearCita({
                Motivo: "",
                Abogado_cita: 2,
                Cliente_cita: 2,
                Cubiculo_cita: 2,
                Demanda_cita: 1,
                Estado: "Inicio",
                FechaInicio: new Date("2023-10-13T11:00:00-07:00")
            } as CitaDTO)
        })
        .then(() => {
            // Abogado 1 cubiculo 1 misma hora
            init.crearCita({
                Motivo: "",
                Abogado_cita: 1,
                Cliente_cita: 2,
                Cubiculo_cita: 1,
                Demanda_cita: 1,
                Estado: "Inicio",
                FechaInicio: new Date("2023-10-13T11:00:00-07:00")
            } as CitaDTO);

        })
        .then(() => {
            // Abogado 2 cubiculo 1 misma hora
            init.crearCita({
                Motivo: "",
                Abogado_cita: 2,
                Cliente_cita: 2,
                Cubiculo_cita: 1,
                Demanda_cita: 1,
                Estado: "Inicio",
                FechaInicio: new Date("2023-10-13T11:00:00-07:00")
            } as CitaDTO);
        })
        .then(() => {
            // fecha anterior
            init.crearCita({
                Motivo: "",
                Abogado_cita: 2,
                Cliente_cita: 2,
                Cubiculo_cita: 1,
                Demanda_cita: 1,
                Estado: "Inicio",
                FechaInicio: new Date("2023-10-09T11:00:00-07:00")
            } as CitaDTO);
        })
        .then(() => {
            // dias no laborales
            init.crearCita({
                Motivo: "",
                Abogado_cita: 2,
                Cliente_cita: 2,
                Cubiculo_cita: 1,
                Demanda_cita: 1,
                Estado: "Inicio",
                FechaInicio: new Date("2023-10-21T11:00:00-07:00")
            } as CitaDTO);
        })
        .then(() => {
            // horas no laborales
            init.crearCita({
                Motivo: "",
                Abogado_cita: 2,
                Cliente_cita: 2,
                Cubiculo_cita: 1,
                Demanda_cita: 1,
                Estado: "Inicio",
                FechaInicio: new Date("2023-10-12T18:00:00-07:00")
            } as CitaDTO);
        })

        .catch(err => console.log(err.message))






})()