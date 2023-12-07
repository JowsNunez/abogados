import UsuarioDTO from "../dto/usuario.dto";
import { Abogado } from "../modelo";
import Usuario from "../modelo/usuario.model";
import { BaseDao } from "./base.dao";



export class UsuarioDao implements BaseDao<UsuarioDTO>{
    create(data: UsuarioDTO): Promise<UsuarioDTO> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<UsuarioDTO> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<UsuarioDTO[]> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UsuarioDTO): Promise<UsuarioDTO> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async findByNombreAndPass(nombre: string, contrasenia: string): Promise<UsuarioDTO> {
        const usuario = await Usuario.findOne({
            where:
            {
                nombre: nombre,
                contrasenia: contrasenia
            },
            include:[Abogado]
        });
        return new Promise((resolve, reject) => {
            if(!usuario){
               return reject(new Error("Usuario no encontrado"));
            }
            if(!usuario.abogado){
               return reject(new Error("Cuenta no vinculada a un abogado"));
            }
            const usuarioDTO:UsuarioDTO={...usuario,abogado:usuario.abogado};

            return resolve(usuarioDTO);
            
        });

      }
}

    

