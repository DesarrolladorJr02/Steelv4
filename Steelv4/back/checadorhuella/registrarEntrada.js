const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(idalta, nombredia, hoingreso) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Registrar_Entrada('${idalta}', '${nombredia}', '${hoingreso}')`)
        const mensaje = "Entrada registrada";
        return mensaje
    } catch (error) {
        console.error('Error', error);
    }

}
module.exports = buscarpersonal

