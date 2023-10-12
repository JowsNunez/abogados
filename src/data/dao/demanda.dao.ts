import DemandaDTO from "../dto/demanda.dto";
import { Demanda } from "../modelo";
import { BaseDao } from "./base.dao";

export class DemandaDao implements BaseDao<DemandaDTO>{
    create(data: DemandaDTO): Promise<DemandaDTO> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<DemandaDTO> {
        try {
            const demanda = await Demanda.findByPk(id);
            const reqDemanda: DemandaDTO = demanda?.dataValues as DemandaDTO
            if (!reqDemanda) throw new Error("No se encontró Abogado")
            return reqDemanda
        } catch (err) {
            throw err
        }
    }
    async findAll(): Promise<DemandaDTO[]> {
        try {
            const demandas = await Demanda.findAll();
            const demandasDTO = demandas.map(demanda => demanda as DemandaDTO)
            return demandasDTO
        } catch (err) {
            throw err
        }
    }
    update(id: number, data: DemandaDTO): Promise<DemandaDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}