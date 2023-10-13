import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cita } from './cita.model';

@Table({ tableName: 'Abogado', freezeTableName: true, timestamps: false })
export class Abogado extends Model<Abogado> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  idAbogado!: number;

  @Column(DataType.STRING)
  nombre!: string;

  @Column(DataType.STRING)
  apellidoPaterno!: string;

  @Column(DataType.STRING)
  apellidoMaterno!: string;

  @Column(DataType.STRING)
  cargo!: string;

  @HasMany(() => Cita)
  citas!: Cita[];
}
