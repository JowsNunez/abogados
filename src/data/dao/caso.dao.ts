import { Op } from "sequelize";
import CasoDTO from "../dto/caso.dto";
import { Abogado, Caso, Cliente } from "../modelo";
import { BaseDao } from "./base.dao";

export class CasoDao implements BaseDao<CasoDTO>{
    async create(data: Caso): Promise<CasoDTO> {
       
        const caso = await  Caso.create(data);
        
        return new Promise((resolve,reject)=>{
                if(caso){
                    resolve(caso.dataValues as CasoDTO)
                }
                reject(new Error("Ocurrio un error al agregar caso"))
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
    async update(id: number, data: Caso): Promise<CasoDTO> {
        const res= await Caso.update(data, {
            where: {
                idCaso: id
            },
            returning:true
        })
        
        return new Promise((resolve,reject)=>{
           
            if(res){
                resolve(data)
            }
            reject( new Error("Ocurrio un error al actualizar caso"))
        })
    }
    async delete(id: number): Promise<any> {
        try{

            await Caso.update({ estado: 'inactivo' }, {
                where: {
                    idCaso: id,
                    estado: 'activo'
                }
            })
            return true
        }catch(err){
            throw new Error('Ocurrio un error al eliminar caso')
        }
        
        
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