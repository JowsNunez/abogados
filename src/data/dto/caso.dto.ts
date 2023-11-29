interface CasoDTO {

  idCaso: number;

  descripcion: string;

  cliente_idCliente: number;

  abogado_idAbogado: number;

  nombre_demandado: string;
  
  estado: string;

  fecha_cierre: Date;

  fecha_comienzo: Date;
}

export default CasoDTO;
