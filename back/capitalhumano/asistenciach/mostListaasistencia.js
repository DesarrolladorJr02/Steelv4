const mysql = require('../../database/indexSincallbackProduccion');

async function actividades() {
    try {
        const [respuesta] = await mysql.query(`call sp_listar_todas_las_asistencias;`);
        return respuesta[0];
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

