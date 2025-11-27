const mysql = require('../../database/indexSincallbackProduccion');

async function actividades(idAlta, fechasolicitud, tipo, motivo, fechainicio, fechafin, dias, horas, autoriza, hrautorizacion) {
    try {
        const [respuesta] = await mysql.query(`Insert into permisos_asistencia (idAlta, fechasolicitud, tipo, motivo, fechainicio, fechafin, dias, horas, autoriza, hrsolicitud) values 
        ("${idAlta}","${fechasolicitud}", "${tipo}", "${motivo}", "${fechainicio}", "${fechafin}", "${dias}", "${horas}", "${autoriza}", "${hrautorizacion}")`);
        return respuesta;
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

