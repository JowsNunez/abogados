import CitaDTO from "../dto/cita.dto";
import { Cita } from "../modelo";
import { BaseDao } from "./base.dao";


export class CitaDao implements BaseDao<CitaDTO>{
    async create(data: Cita): Promise<CitaDTO> {
        try {

            const cita = await Cita.create(data);

            return data;

        } catch (err) {
            throw err;
        }
    }
    findById(id: number): Promise<CitaDTO> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CitaDTO[]> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: CitaDTO): Promise<CitaDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}