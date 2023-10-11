import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cita } from './cita.model'; // Asegúrate de importar el modelo Cita

@Table({ tableName: 'Demanda', freezeTableName: true,timestamps:false })
export class Demanda extends Model<Demanda> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idDemanda!: number;

    @Column(DataType.STRING)
    Concurrencias!: string;

    @Column(DataType.STRING)
    Audiencias!: string;

    @Column(DataType.STRING)
    EnvioDeOficios!: string;

    @Column(DataType.STRING)
    ContestacionDeOficios!: string;

    @Column(DataType.DATE)
    CitasJuzgado!: Date;

    @Column(DataType.STRING)
    Decretos!: string;

    @Column(DataType.STRING)
    DecretosDefinitivos!: string;

    @Column(DataType.STRING)
    Eventos!: string;

    @HasMany(() => Cita)
    citas!: Cita[];
}
