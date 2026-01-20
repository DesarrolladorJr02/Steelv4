const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(usuario,contra) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Login('${usuario}','${contra}')`);
        return respuesta[0]
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = buscarpersonal

