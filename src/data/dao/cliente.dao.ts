import ClienteDTO from "../dto/cliente.dto";
import { Cita, Cliente } from "../modelo";
import { BaseDao } from "./base.dao";


export class ClienteDao implements BaseDao<ClienteDTO>{

    async create(data: Cliente): Promise<ClienteDTO> {
        try {

            const cliente = await Cliente.create(data);

            return cliente.dataValues as ClienteDTO;

        } catch (err) {
            throw err;
        }
    }
    async findById(id: number): Promise<ClienteDTO> {
        try {
            const cliente = await Cliente.findByPk(id,{include:Cita});
            const reqCliente: ClienteDTO = cliente?.dataValues as ClienteDTO
            if (!reqCliente) throw new Error("No se encontró Cliente")
            return reqCliente
        } catch (err) {
            throw err
        }
    }
    async findAll(): Promise<ClienteDTO[]> {
        try {
            const cliente = await Cliente.findAll();
            const clientesDTO = cliente.map(cliente => cliente as ClienteDTO)
            return clientesDTO
        } catch (err) {
            throw err
        }
    }
    async update(id: number, data: ClienteDTO): Promise<ClienteDTO> {
        const [cliente] = await Cliente.update(data, {
            where: {
                idCliente: id
            }
        })
        return data
    }
    async delete(id: number): Promise<any> {
        await Cliente.destroy({ where: { idCliente: id } })
        return new Promise((resolve) => {
            resolve(true)
        })
    }

} 