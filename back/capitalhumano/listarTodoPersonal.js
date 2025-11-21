const mysql = require('../database/indexSincallbackProduccion');

async function actividades() {
    try {
        const [respuesta] = await mysql.query(`call Sp_Listar_Todos_Personal`);
        return respuesta[0];
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = actividades

