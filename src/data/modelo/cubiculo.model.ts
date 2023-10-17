import { Table, Column, DataType, HasMany, Model, AllowNull } from 'sequelize-typescript';
import { Cita } from './cita.model';


@Table({ tableName: 'Cubiculo', freezeTableName: true,timestamps:false })
export class Cubiculo extends Model<Cubiculo> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull:false
  })
  idCubiculo!: number

  @AllowNull(false)
  @Column(DataType.STRING)
  nombre!: string

  @HasMany(() => Cita)
  citas!: Cita[];


}