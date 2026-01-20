const mysql = require('../database/indexSincallbackProduccion');
function mostrar(callback) {
    mysql.query(`select 
                    a.idAlta, a.NombreCompleto, a.idCheck,asi.Id_asis, asi.FechaAsis, asi.Hoingreso, asi.HoSalida, asi.Justificacion, asi.EstadoAsis
                    from Alta_Rh a, asistencia asi
                    where 
                    a.idAlta = asi.idAlta; `, function (error, respuesta) {

        if (error) {
            callback(null, {
                mensaje: error
            })
        }
        else {
            callback(null, {
                respuesta
            })
        }
        //console.log(respuesta);
    });

}
module.exports = mostrar

