import { Table, Column, Model, DataType, HasMany, BelongsTo } from 'sequelize-typescript';
import { Cita } from './cita.model';
import { Caso } from './caso.model';

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

  @Column(DataType.INTEGER)
  telefono!: string;

  @HasMany(() => Cita)
  citas!: Cita[];
}
