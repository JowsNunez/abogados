import CubiculoDTO from "../dto/cubiculo.dto";
import { BaseDao } from "./base.dao";


export class CubiculoDao implements BaseDao<CubiculoDTO>{
    create(data: CubiculoDTO): Promise<CubiculoDTO> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<CubiculoDTO> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CubiculoDTO[]> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: CubiculoDTO): Promise<CubiculoDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}