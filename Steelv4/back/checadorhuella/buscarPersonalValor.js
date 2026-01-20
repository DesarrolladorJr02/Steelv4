const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(dato) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Buscar_Personal_Valor('${dato}')`)
        return respuesta[0]
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = buscarpersonal

