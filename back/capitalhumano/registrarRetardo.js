const mysql = require('../database/indexSincallbackProduccion');

async function buscarpersonal(idalta, nombredia, hoingreso) {
    try {
        const [respuesta] = await mysql.query(`call Sp_Registrar_Retardo('${idalta}', '${nombredia}', '${hoingreso}')`)
        const mensaje = "Retardo registrado";
        return mensaje
    } catch (error) {
        console.error('Error', error);
    }

}
module.exports = buscarpersonal

