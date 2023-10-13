import AbogadoDTO from "../dto/abogado.dto";
import { Abogado, Caso, Cita, Cliente } from "../modelo";
import { BaseDao } from "./base.dao";

export class AbogadoDao implements BaseDao<AbogadoDTO>{
    async create(data: Abogado): Promise<AbogadoDTO> {
        try {

            const abogado = await Abogado.create(data);

            return abogado as AbogadoDTO;

        } catch (err) {
            throw err;
        }

    }
    async findById(id: number): Promise<AbogadoDTO> {
        try {
            const abogado = await Abogado.findByPk(id,{include:[{model:Cita}]});
            const reqAbogado: AbogadoDTO = abogado?.dataValues as AbogadoDTO
            if (!reqAbogado) throw new Error("No se encontró Abogado")
            return reqAbogado
        } catch (err) {
            throw err
        }
    }

    async findAll(): Promise<AbogadoDTO[]> {
        try {
            const abogados = await Abogado.findAll();
            const abogadosDTO = abogados.map(abogado => abogado as AbogadoDTO)
            return abogadosDTO
        } catch (err) {
            throw err
        }

    }
    async update(id: number, data: AbogadoDTO): Promise<AbogadoDTO> {
        const [abogado] = await Abogado.update(data, {
            where: {
                idAbogado: id
            }
        })
        return data
    }


    async delete(id: number): Promise<any> {
        await Abogado.destroy({ where: { idAbogado: id } })
        return new Promise(() => {

        })
    }

}