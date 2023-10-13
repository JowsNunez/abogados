import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Caso } from './caso.model';

@Table({ tableName: 'Documento', freezeTableName: true, timestamps: false })
export class Documento extends Model<Documento>{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    idDocumento!: number

    @Column(DataType.STRING)
    url!: string

    @Column(DataType.STRING)
    rubro!: string

    @Column(DataType.STRING)
    descripcion!: string

    @ForeignKey(() => Caso)
    @Column(DataType.INTEGER)
    caso_idCaso!: number

    @BelongsTo(() => Caso)
    caso!: Caso

}