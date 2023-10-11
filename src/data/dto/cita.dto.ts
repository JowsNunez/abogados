interface CitaDTO {
  idCita?: number
  FechaInicio: Date | null;
  FechaFin: Date | null;
  Cliente_cita: number | null;
  Abogado_cita: number | null;
  Demanda_cita: number | null;
  Cubiculo_cita: number | null;
  Estado: string | null;
  Motivo: string | null;
}

export default CitaDTO;