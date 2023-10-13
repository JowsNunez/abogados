import { Sequelize } from 'sequelize-typescript';
import { Cita, Abogado, Cliente, Cubiculo, Caso, Documento } from '../data/modelo';
const configBd = {
  bd: process.env.BD_NAME || 'abogados',
  user: process.env.BD_USER || 'root',
  pass: process.env.BD_PASS || 'sesamo',
  host: process.env.BD_HOST || 'localhost',
  port: Number.parseInt(process.env.BD_PORT || '3306'),
}
export const connection = new Sequelize(configBd.bd, configBd.user, configBd.pass, {
  host: configBd.host,
  port: configBd.port,
  dialect: 'mysql'
})

connection.addModels([Abogado, Cliente, Cubiculo, Caso, Cita, Documento])

