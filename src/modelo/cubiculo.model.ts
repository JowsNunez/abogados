import { Table, Column, DataType, HasMany, Model } from 'sequelize-typescript';
import { Cita } from './cita.model';


@Table({ tableName: 'Cubiculo', freezeTableName: true,timestamps:false })
export class Cubiculo extends Model<Cubiculo> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idCubiculo!: number

  @Column(DataType.STRING)
  nombre!: string

  @HasMany(() => Cita)
  citas!: Cita[];


}