const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(dato) {
    try {
        const [respuesta] = await mysql.query(`call sp_verificar_si_Personal_YaMarco_su_Falta('${dato}')`)
        return respuesta;
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = buscarpersonal;


