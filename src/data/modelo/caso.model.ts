import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, AllowNull, NotNull } from 'sequelize-typescript';
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
    @AllowNull(false)
    @Column(DataType.STRING)
    descripcion!: string;

    @AllowNull(false)
    @ForeignKey(() => Cliente)
    @Column(DataType.INTEGER)
    cliente_idCliente!: number;

    @AllowNull(false)
    @ForeignKey(() => Abogado)
    @Column(DataType.INTEGER)
    abogado_idAbogado!: number;

    @AllowNull(false)
    @Column(DataType.STRING)   
    nombre_demandado!: string;

    @AllowNull(false)
    @Column({ type: DataType.ENUM, values: ['activo', 'inactivo', 'completo']})
    estado!:string; 

    @AllowNull(false)
    @Column(DataType.DATE)
    fecha_comienzo!: Date;

    @AllowNull
    @Column(DataType.DATE)
    fecha_cierre!: Date;

    @BelongsTo(() => Cliente)
    cliente!: Cliente

    @BelongsTo(() => Abogado)
    abogado!: Abogado

    @HasMany(() => Cita)
    citas!: Cita[];

    @HasMany(() => Documento)
    documentos!: Documento[];
}
