import { Table, Column, Model, DataType, HasMany, AllowNull, NotNull } from 'sequelize-typescript';
import { Cita } from './cita.model'; // Asegúrate de importar el modelo Cita
import { Caso } from './caso.model';
import { Col } from 'sequelize/types/utils';

@Table({tableName:'Cliente',freezeTableName:true,timestamps:false})
export class Cliente extends Model<Cliente> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull:false
  })
  idCliente!: number;

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
  @Column(DataType.INTEGER)
  telefono!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  domicilio!: string;

  @AllowNull(false)
  @Column(DataType.STRING)  
  rfc!: string;
  
  @AllowNull(false)
  @Column(DataType.STRING)  
  correo!: string;

  @HasMany(() => Cita)
  citas!: Cita[];
  
  @HasMany(() => Caso)
  casos!: Caso[];
}
