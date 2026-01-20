const mysql = require('../../database/indexSincallbackProduccion');

async function asistencia(fecha) {
    try {
        const [respuesta] = await mysql.query(`SELECT * FROM STEEL.permisos_asistencia where fechainicio <= '${fecha}' and fechafin>='${fecha}';`);
        return respuesta;
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = asistencia