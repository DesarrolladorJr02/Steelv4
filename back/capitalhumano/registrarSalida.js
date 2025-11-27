const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(idasis, hosalida, estatus, xhrtrabjadas) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Registrar_Salida('${idasis}','${hosalida}','${estatus}','${xhrtrabjadas}')`)
        return respuesta[0]
    } catch (error) {
        console.error('Error', error);
    }

}
module.exports = buscarpersonal

