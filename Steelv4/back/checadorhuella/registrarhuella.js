const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(idper, huella) {
    try {
        const [respuesta] = await mysql.query(
            'CALL Sp_registrarHuella(?, ?)',
            [idper, huella]
        );
        return respuesta[0]
    } catch (error) {
        console.error('Error', error);
    }

}
module.exports = buscarpersonal

