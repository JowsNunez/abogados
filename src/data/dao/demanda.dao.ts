import DemandaDTO from "../dto/demanda.dto";
import { BaseDao } from "./base.dao";

export class DemandaDao implements BaseDao<DemandaDTO>{
    create(data: DemandaDTO): Promise<DemandaDTO> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<DemandaDTO> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<DemandaDTO[]> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: DemandaDTO): Promise<DemandaDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}