const mysql = require('../../database/indexSincallbackProduccion');

async function actividades() {
    try {
        const [respuesta] = await mysql.query(`SELECT permisos_asistencia.*,Alta_Rh.idAlta, Alta_Rh.NombreCompleto 
                                            FROM permisos_asistencia inner join Alta_Rh on permisos_asistencia.idAlta = Alta_Rh.idAlta;`);
        return respuesta;
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

