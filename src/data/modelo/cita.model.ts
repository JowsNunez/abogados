import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cliente, Abogado, Cubiculo, Demanda } from './index';


@Table({ tableName: 'Cita', freezeTableName: true,timestamps:false })
export class Cita extends Model<Cita> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  idCita!: number;

  @Column(DataType.DATE)
  Fecha!: Date;

  @ForeignKey(() => Cliente)
  @Column(DataType.NUMBER)
  Cliente_cita!: number;

  @ForeignKey(() => Abogado)
  @Column(DataType.NUMBER)
  Abogado_cita!: number;

  @ForeignKey(() => Demanda)
  @Column(DataType.NUMBER)
  Demanda_cita!: number;

  @ForeignKey(() => Cubiculo)
  @Column(DataType.NUMBER)
  Cubiculo_cita!: number;

  @Column(DataType.STRING)
  Estado!: string;

  @Column(DataType.STRING)
  Motivo!: string;

  @BelongsTo(() => Cliente)
  cliente!: Cliente;

  @BelongsTo(() => Abogado)
  abogado!: Abogado;

  @BelongsTo(() => Demanda)
  demanda!: Demanda;

  @BelongsTo(() => Cubiculo)
  cubiculo!: Cubiculo;
}
