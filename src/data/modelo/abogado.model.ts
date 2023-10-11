import { Table, Column, Model, DataType, HasMany,PrimaryKey } from 'sequelize-typescript';
import { Cita } from './cita.model'; 

@Table({ tableName: 'Abogado', freezeTableName: true ,timestamps:false})
export class Abogado extends Model<Abogado> {
  
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  idAbogado!: number;

  @Column(DataType.STRING)
  AbogadoNombre!: string;

  @Column(DataType.STRING)
  Documentacion!: string;

  @Column(DataType.STRING)
  SeguimientoDemanda!: string;

  @HasMany(() => Cita)
  citas!: Cita[];
}
