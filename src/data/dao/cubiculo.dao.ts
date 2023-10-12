import CubiculoDTO from "../dto/cubiculo.dto";
import { Cubiculo } from "../modelo";
import { BaseDao } from "./base.dao";


export class CubiculoDao implements BaseDao<CubiculoDTO>{
    create(data: CubiculoDTO): Promise<CubiculoDTO> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<CubiculoDTO> {
        try {
            const cubiculo = await Cubiculo.findByPk(id);
            const reqCubiculo: CubiculoDTO = cubiculo?.dataValues as CubiculoDTO
            if (!reqCubiculo) throw new Error("No se encontró Abogado")
            return reqCubiculo
        } catch (err) {
            throw err
        }
    }
    async findAll(): Promise<CubiculoDTO[]> {
        try {
            const cubiculos = await Cubiculo.findAll();
            const cubiculosDTO = cubiculos.map(cubiculo => cubiculo as Cubiculo)
            return cubiculosDTO
        } catch (err) {
            throw err
        }
    }
    update(id: number, data: CubiculoDTO): Promise<CubiculoDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}