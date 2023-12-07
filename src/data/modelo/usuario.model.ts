import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { Abogado } from './abogado.model';

@Table({ tableName: 'Usuario', freezeTableName: true, timestamps: false })
export class Usuario extends Model<Usuario>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    })
    idUsuario: number|undefined;
    @AllowNull(false)
    nombre!: string;
    @AllowNull(false)
    contrasenia!:string;
    @AllowNull(false) 
    idAbogado!:number;
    @BelongsTo(()=>Abogado)
    abogado: Abogado|undefined;

}

export default Usuario;