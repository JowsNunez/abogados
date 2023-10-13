import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Cita } from './cita.model'; // Asegúrate de importar el modelo Cita
import { Cliente } from './cliente.modelo';
import { Abogado } from './abogado.model';
import { Documento } from './documento.model';

@Table({ tableName: 'Caso', freezeTableName: true, timestamps: false })
export class Caso extends Model<Caso> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idCaso!: number;

    @Column(DataType.STRING)
    descripcion!: string;

    @ForeignKey(() => Cliente)
    @Column(DataType.INTEGER)
    cliente_idCliente!: number;

    @ForeignKey(() => Abogado)
    @Column(DataType.INTEGER)
    abogado_idAbogado!: number;

    @BelongsTo(() => Cliente)
    cliente!: Cliente

    @BelongsTo(() => Abogado)
    abogado!: Abogado

    @HasMany(() => Cita)
    citas!: Cita[];

    @HasMany(() => Documento)
    documentos!: Documento[];
}
