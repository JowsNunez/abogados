import { connection } from "./config/connection";
import { CasoDao } from "./data/dao/caso.dao";
import { ClienteDao } from "./data/dao/cliente.dao";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
    await connection.authenticate();
    await connection.sync();

    const caseDao = new CasoDao();

    const clientDap = new ClienteDao();

    await delay(500);
    const cliente1 = await clientDap.create({
        idCliente:0,
        nombre:'Juan',
        apellidoMaterno:'Perez',
        apellidoPaterno:'Perez',
        domicilio:'Calle 1',
        rfc:'123456789',
        telefono:1234567890
    });
    await delay(500);

    const cliente2 = await clientDap.create({
        idCliente: 0,
        nombre: 'Maria',
        apellidoMaterno: 'Lopez',
        apellidoPaterno: 'Gomez',
        domicilio: 'Calle 2',
        rfc: '987654321',
        telefono: 9876543210
    });
    await delay(500);

    const cliente3 = await clientDap.create({
        idCliente: 0,
        nombre: 'Pedro',
        apellidoMaterno: 'Ramirez',
        apellidoPaterno: 'Gonzalez',
        domicilio: 'Calle 3',
        rfc: '456789123',
        telefono: 4567891230
    });
    await delay(500);

    const cliente4 = await clientDap.create({
        idCliente: 0,
        nombre: 'Ana',
        apellidoMaterno: 'Martinez',
        apellidoPaterno: 'Hernandez',
        domicilio: 'Calle 4',
        rfc: '789123456',
        telefono: 7891234560
    });
    await delay(500);

    const cliente5 = await clientDap.create({
        idCliente: 0,
        nombre: 'Luis',
        apellidoMaterno: 'Garcia',
        apellidoPaterno: 'Rodriguez',
        domicilio: 'Calle 5',
        rfc: '321654987',
        telefono: 216549870
    });
    await delay(500);

    const cliente6 = await clientDap.create({
        idCliente: 0,
        nombre: 'Laura',
        apellidoMaterno: 'Sanchez',
        apellidoPaterno: 'Lopez',
        domicilio: 'Calle 6',
        rfc: '654987321',
        telefono: 6549804567
    });
    console.log("\n\n\n* * * * Actualizacion de nombre y telefono");
    await delay(3000);

    cliente6.nombre='Lorena';
    cliente6.telefono=8976543291;
    await clientDap.update(6,cliente6)
    await clientDap.delete(2);

    
    await delay(500);
    const caso1 = await caseDao.create({
        descripcion: 'Demanda de prueba',
        abogado_idAbogado: 2, cliente_idCliente: 1,
        estado: 'activo',
        fecha_comienzo: new Date(),
        nombre_demandado: 'Juan Perez',
        fecha_cierre: null,
        idCaso:0
    });
    await delay(500);

    const caso2 = await caseDao.create({
        descripcion: 'Demanda de prueba',
        abogado_idAbogado: 2, cliente_idCliente: 5,
        estado: 'activo',
        fecha_comienzo: new Date(),
        nombre_demandado: 'Juan Perez',
        fecha_cierre: null,
        idCaso:0
    });
    await delay(500);

    const caso4 = await caseDao.create({
        descripcion: 'Demanda de prueba',
        abogado_idAbogado: 3, cliente_idCliente: 4,
        estado: 'activo',
        fecha_comienzo: new Date(),
        nombre_demandado: 'Juan Perez',
        fecha_cierre: null,
        idCaso:0
    });
    await delay(500);

    const caso3 = await caseDao.create({
        descripcion: 'Demanda de prueba',
        abogado_idAbogado: 4, cliente_idCliente: 3,
        estado: 'activo',
        fecha_comienzo: new Date(),
        nombre_demandado: 'Juan Perez',
        fecha_cierre: null,
        idCaso:0
    });

    // inactivar caso
    console.log("\n\n\n* * * * Actualizacion de ESTADO y DESCRIPCION");
    
    await delay(3000);

    caso2.estado='inactivo'
    await caseDao.update(caso2.idCaso,caso2);
    caso3.descripcion='Actualización del caso 3';
    await caseDao.update(caso3.idCaso,caso3);

    


})();