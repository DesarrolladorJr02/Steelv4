
const mysql = require('../database/indexSincallbackProduccion');

async function asigactivi(id, HoEntrada, HoSalida, HoEntradaSD, HoSalidaSD) {
    try {
        const [respuesta] = await mysql.query(`update Alta_Rh set HoEntrada= '${HoEntrada}', HoSalida= '${HoSalida}',
             HoEntradaSD= '${HoEntradaSD}', HoSalidaSD= '${HoSalidaSD}' where idAlta= '${id}';`)
        return { respuesta }
    } catch (error) {
        console.error('Error al recuperar mensajes:', error);
    }

}
module.exports = asigactivi