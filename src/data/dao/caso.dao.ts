import CasoDTO from "../dto/caso.dto";
import { Caso } from "../modelo";
import { BaseDao } from "./base.dao";

export class CasoDao implements BaseDao<CasoDTO>{
    create(data: CasoDTO): Promise<CasoDTO> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<CasoDTO> {
        try {
            const caso = await Caso.findByPk(id);
            const reqcaso: CasoDTO = caso?.dataValues as CasoDTO
            if (!reqcaso) throw new Error("No se encontró Abogado")
            return reqcaso
        } catch (err) {
            throw err
        }
    }
    async findAll(): Promise<CasoDTO[]> {
        try {
            const casos = await Caso.findAll();
            const casosDTO = casos.map(caso => caso as CasoDTO)
            return casosDTO
        } catch (err) {
            throw err
        }
    }
    update(id: number, data: CasoDTO): Promise<CasoDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}