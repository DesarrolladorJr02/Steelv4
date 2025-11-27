const mysql = require('../../database/indexSincallbackProduccion');

async function actividades(idalta,xHoSalida) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Registrar_salidatemprano('${idalta}', '${xHoSalida}');`);
        return respuesta[0];
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

