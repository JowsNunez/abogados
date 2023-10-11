import ClienteDTO from "../dto/cliente.dto";
import { Cliente } from "../modelo";
import { BaseDao } from "./base.dao";


export class ClienteDao implements BaseDao<ClienteDTO>{

    async create(data: Cliente): Promise<ClienteDTO> {
        try {

            const cliente = await Cliente.create(data);

            return data;

        } catch (err) {
            throw err;
        }
    }
    async findById(id: number): Promise<ClienteDTO> {
        try {

            const cliente = await Cliente.findByPk(id)
            return {
                idCliente: cliente?.idCliente,
                ApellidoPaterno: cliente?.ApellidoPaterno,
                ApellidoMaterno: cliente?.ApellidoMaterno,
                Caso: cliente?.Caso,
                Nombre: cliente?.Nombre,
                numCel: cliente?.numCel,
            } as ClienteDTO;

        } catch (err) {
            throw err;
        }
    }
    async findAll(): Promise<ClienteDTO[]> {
        const clientes = await Cliente.findAll()

        const clientesDTO: ClienteDTO[] = clientes.map(cliente => {
            return {
                idCliente: cliente?.idCliente,
                ApellidoPaterno: cliente?.ApellidoPaterno,
                ApellidoMaterno: cliente?.ApellidoMaterno,
                Caso: cliente?.Caso,
                Nombre: cliente?.Nombre,
                numCel: cliente?.numCel,
            } as ClienteDTO;
        })

        return clientesDTO
    }
    async update(id: number, data: Cliente): Promise<ClienteDTO> {
        const [cliente] = await Cliente.update(data, {
            where: {
                idCliente: id
            }
        })
        return data
    }
    async delete(id: number): Promise<any> {
        await Cliente.destroy({ where: { idCliente: id } })
        return new Promise(() => {

        })
    }

} 