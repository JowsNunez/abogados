import { Table, Column, Model, DataType, HasMany, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Cita } from './cita.model';
import { Caso } from './caso.model';

@Table({ tableName: 'Abogado', freezeTableName: true, timestamps: false })
export class Abogado extends Model<Abogado> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  idAbogado!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  nombre!: string;
  @AllowNull(false)
  @Column(DataType.STRING)
  apellidoPaterno!: string;
  @AllowNull(false)
  @Column(DataType.STRING)
  apellidoMaterno!: string;
  @AllowNull(false)
  @Column(DataType.STRING)
  cargo!: string;
  @AllowNull(false)
  @Column(DataType.INTEGER)
  telefono!: string;

  @HasMany(() => Cita)
  citas!: Cita[];
}
