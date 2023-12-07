import { Request, Response } from "express";
import { UsuarioDao } from "../data/dao/usuario.dao";
import FieldError from "../utils/FieldError";

export class AuthController{
    private usuarioDao:UsuarioDao;
    constructor(){
        this.usuarioDao=new UsuarioDao();
    }
    async login(req:Request,res:Response){
        const nombre=req.body.nombre;
        const contrasenia=req.body.contrasenia;
        try{

        if(!nombre) throw new FieldError({field:"nombre",msg:"El nombre es requerido"});
        if(!contrasenia) throw new FieldError({field:"contrasenia",msg:"La contraseña es requerida"});
        const usuario=await this.usuarioDao.findByNombreAndPass(nombre,contrasenia);
        if(!usuario) return res.status(401).json({msg:"Usuario no encontrado"});

        return res.status(200).json(usuario);
    }catch(err){
        if(err instanceof FieldError){
            return res.status(400).json({field:err.err.field,msg:err.err.msg});
        }
        return res.status(500).json({msg:"Error interno del servidor"});
    }


    }
}