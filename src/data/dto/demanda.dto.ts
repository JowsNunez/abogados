interface DemandaDTO {
    idDemanda?:number
    Concurrencias: string;
    Audiencias: string;
    EnvioDeOficios: string;
    ContestacionDeOficios: string;
    CitasJuzgado: Date | null;
    Decretos: string;
    DecretosDefinitivos: string;
    Eventos: string;
  }
  
  export default DemandaDTO;
  