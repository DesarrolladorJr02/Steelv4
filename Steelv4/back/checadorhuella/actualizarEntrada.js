const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(xId_asis, xHoingreso, xJustificacion, xEstadoAsis) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Actualizar_Entrada('${xId_asis}', '${xHoingreso}', '${xJustificacion}', '${xEstadoAsis}')`)
        const mensaje = "Entrada registrada";
        return mensaje
    } catch (error) {
        console.error('Error', error);
    }

}
module.exports = buscarpersonal