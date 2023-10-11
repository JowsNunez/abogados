import AbogadoDTO from "../dto/abogado.dto";
import { Abogado } from "../modelo";
import { BaseDao } from "./base.dao";

export class AbogadoDao implements BaseDao<AbogadoDTO>{
    async create(data: Abogado): Promise<AbogadoDTO> {
        try {

            const abogado = await Abogado.create(data);

            return data;

        } catch (err) {
            throw err;
        }

    }
    async findById(id: number): Promise<AbogadoDTO> {
        try {

            const abogado = await Abogado.findByPk(id)
            return {
                idAbogado: abogado?.idAbogado,
                Documentacion: abogado?.Documentacion,
                AbogadoNombre: abogado?.AbogadoNombre,
                SeguimientoDemanda: abogado?.SeguimientoDemanda
            } as AbogadoDTO;

        } catch (err) {
            throw err;
        }
    }

    async findAll(): Promise<AbogadoDTO[]> {
        const abogados = await Abogado.findAll()

        const abogadosDTO: AbogadoDTO[] = abogados.map(abogado => {

            return {
                idAbogado: abogado.idAbogado,
                AbogadoNombre: abogado.AbogadoNombre,
                Documentacion: abogado.Documentacion,
                SeguimientoDemanda: abogado.SeguimientoDemanda
            } as AbogadoDTO
        })

        return abogadosDTO;

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