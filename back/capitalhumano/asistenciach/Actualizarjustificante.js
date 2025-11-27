const mysql = require('../../database/indexSincallbackProduccion');

async function actividades(idalta, estatus) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Registrar_justificante('${idalta}', '${estatus}');`);
        return respuesta;
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

