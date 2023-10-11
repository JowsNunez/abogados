import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cita } from './cita.model'; // Asegúrate de importar el modelo Cita

@Table({tableName:'Cliente',freezeTableName:true,timestamps:false})
export class Cliente extends Model<Cliente> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idCliente!: number;

  @Column(DataType.STRING)
  Nombre!: string;

  @Column(DataType.STRING)
  ApellidoPaterno!: string;

  @Column(DataType.STRING)
  ApellidoMaterno!: string;

  @Column(DataType.STRING)
  Caso!: string;

  @Column({
    type: DataType.INTEGER,
    field: 'numCel',
  })
  numCel!: number;

  @HasMany(() => Cita)
  citas!: Cita[];
}
