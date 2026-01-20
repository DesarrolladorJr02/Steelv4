const mysql = require('../../database/indexSincallbackProduccion');

async function actividades(idasis) {
    try {
        const [respuesta] = await mysql.query(`call sp_listar_una_asistencia('${idasis}');`);
        return respuesta[0];
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

