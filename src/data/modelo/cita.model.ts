import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Cliente, Abogado, Cubiculo,  Caso } from './index';


@Table({ tableName: 'Cita', freezeTableName: true, timestamps: false })
export class Cita extends Model<Cita> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  idCita!: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  fechaInicio!: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  fechaFin!: Date;

  @AllowNull(false)
  @ForeignKey(() => Cliente)
  @Column(DataType.INTEGER)
  cliente_idCliente!: number;

  @AllowNull(false)
  @ForeignKey(() => Abogado)
  @Column(DataType.INTEGER)
  abogado_idAbogado!: number;

  @ForeignKey(() => Caso)
  @Column(DataType.INTEGER)
  caso_idCaso!: number;

  @AllowNull(false)
  @ForeignKey(() => Cubiculo)
  @Column(DataType.INTEGER)
  cubiculo_idCubiculo!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  motivo!: string;

  @AllowNull(false)
  @Column({type: DataType.ENUM,values:['cancelada','enCurso','concluida','programada']})
  estado!: string;


  @BelongsTo(() => Cliente)
  cliente!: Cliente;

  @BelongsTo(() => Abogado)
  abogado!: Abogado;

  @BelongsTo(() => Caso)
  caso!: Caso;

  @BelongsTo(() => Cubiculo)
  cubiculo!: Cubiculo;
}
