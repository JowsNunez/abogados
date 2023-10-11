import {Sequelize} from 'sequelize-typescript';
import { Cita,Abogado,Cliente,Cubiculo,Demanda } from '../data/modelo';

export const connection = new Sequelize("abogados", 'root', 'sesamo', {
    host: 'localhost',
    dialect: 'mysql'
  })

  connection.addModels([Abogado, Cliente, Cubiculo, Demanda, Cita])
  
