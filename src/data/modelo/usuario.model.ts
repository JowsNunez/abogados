import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Abogado } from './abogado.model';

@Table({ tableName: 'Usuario', freezeTableName: true, timestamps: false })
export class Usuario extends Model<Usuario>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      })
    idUsuario: number|undefined;
    @AllowNull(false)
    @Column(DataType.STRING)
    nombre!: string;
    @AllowNull(false)
    @Column(DataType.STRING)
    contrasenia!:string;
    @AllowNull(false) 
    @ForeignKey(() => Abogado)
    @Column(DataType.INTEGER)
    idAbogado!:number;
    @BelongsTo(()=>Abogado)
    abogado: Abogado|undefined;

}

export default Usuario;