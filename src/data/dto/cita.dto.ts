interface CitaDTO {
  idCita: number;
  fechaInicio: Date;
  fechaFin: Date;
  cliente_idCliente: number;
  abogado_idAbogado: number;
  caso_idCaso: number;
  cubiculo_idCubiculo: number;
  motivo: string;
  estado: string;
}


export default CitaDTO;