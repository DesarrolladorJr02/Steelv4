const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(idasis, hosalida, estatus, xhrtrabjadas) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Registrar_Salida('${idasis}','${hosalida}','${estatus}','${xhrtrabjadas}')`)
        const mensaje = "Salida registrada";
        return mensaje;
    } catch (error) {
        console.error('Error', error);
    }

}
module.exports = buscarpersonal

