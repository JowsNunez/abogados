import { Op } from "sequelize";
import CasoDTO from "../dto/caso.dto";
import { Abogado, Caso, Cliente } from "../modelo";
import { BaseDao } from "./base.dao";

export class CasoDao implements BaseDao<CasoDTO>{
    async create(data: CasoDTO): Promise<CasoDTO> {
       
        const caso = await  Caso.create(data);
        
        return new Promise((resolve,reject)=>{
                if(caso){
                    resolve(caso.dataValues as CasoDTO)
                }
                reject(new Error("An error ocurred while creating the case"))
        })

        
    }
    async findById(id: number): Promise<CasoDTO> {
        try {
            const caso = await Caso.findByPk(id, { include: [Abogado, Cliente] });
            const reqcaso: CasoDTO = caso?.dataValues as CasoDTO
            if (!reqcaso) throw new Error("No se encontró Caso")
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
    async update(id: number, data: CasoDTO): Promise<CasoDTO> {
        const res= await Caso.update(data, {
            where: {
                idCaso: id
            },
            returning:true,
            plain: true
        })
        
        return new Promise((resolve,reject)=>{
           
            if(res){
                resolve(data)
            }
            reject( new Error("An error ocurred while updating the case"))
        })
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async findByClienteAndAbogado(idCliente: number,idAbogado:number): Promise<CasoDTO[]> {
        try {
            const casos = await Caso.findAll({ where: { cliente_idCliente: idCliente,abogado_idAbogado:idAbogado } })
            return casos
        }
        catch (err) {
            throw err
        }
    }

}