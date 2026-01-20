const mysql = require('../../database/indexSincallbackProduccion');

async function actividades(id) {
    try {
        const [respuesta] = await mysql.query(`SELECT idAlta, idCheck, NombreCompleto,Puesto,Area,Estatus,HoEntrada,HoSalida,HoEntradaSD,HoSalidaSD,Sucursal FROM STEEL.Alta_Rh where idCheck = '${id}';`);
        return respuesta;
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades