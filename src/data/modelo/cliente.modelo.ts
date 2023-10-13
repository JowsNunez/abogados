import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cita } from './cita.model'; // Asegúrate de importar el modelo Cita
import { Caso } from './caso.model';

@Table({tableName:'Cliente',freezeTableName:true,timestamps:false})
export class Cliente extends Model<Cliente> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idCliente!: number;

  @Column(DataType.STRING)
  nombre!: string;

  @Column(DataType.STRING)
  apellidoPaterno!: string;

  @Column(DataType.STRING)
  apellidoMaterno!: string;


  @Column(DataType.INTEGER)
  telefono!: number;

  @HasMany(() => Cita)
  citas!: Cita[];
  
  @HasMany(() => Caso)
  casos!: Caso[];
}
