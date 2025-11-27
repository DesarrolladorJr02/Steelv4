const mysql = require('../../database/indexSincallbackProduccion');

async function actividades(idalta, xNomdia, xJustificacion, xEstadoAsis) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Registrar_Falta('${idalta}', '${xNomdia}', '${xJustificacion}', '${xEstadoAsis}');`);
        return respuesta;
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

