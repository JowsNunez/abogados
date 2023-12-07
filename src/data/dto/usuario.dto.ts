import AbogadoDTO from "./abogado.dto";

interface UsuarioDTO{
    idUsuario: number|undefined;
    nombre: string;
    contrasenia:string;
    idAbogado:number;
    abogado: AbogadoDTO|undefined;
}

export default UsuarioDTO;