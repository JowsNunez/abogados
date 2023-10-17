import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Caso } from './caso.model';

@Table({ tableName: 'Documento', freezeTableName: true, timestamps: false })
export class Documento extends Model<Documento>{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    })
    idDocumento!: number

    @AllowNull(false)
    @Column(DataType.STRING)
    url!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    rubro!: string

    @AllowNull(false)
    @Column(DataType.STRING)
    descripcion!: string

    @AllowNull(false)
    @ForeignKey(() => Caso)
    @Column(DataType.INTEGER)
    caso_idCaso!: number

    @BelongsTo(() => Caso)
    caso!: Caso

}