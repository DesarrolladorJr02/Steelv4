//registrar horarios
const registrarhorarios = require('./checadorhuella/registrarhorarios');
const listarTodoPersonal = require('./checadorhuella/listarTodoPersonal');

app.get('/addhorarioasitencia', async (req, res) => {
    const respuesta2 = await listarTodoPersonal();
    const respuesta = respuesta2.map((datos) => {
        return {
            ...datos,
            huella: (datos.FinguerPrint) ? "ACTIVO" : "INACTIVO"
        }
    })
    //console.log(respuesta2);
    res.status(200).json(respuesta);
}
)
app.put("/registrarhorario", async (req, res) => {
    try {
        //console.log(req.body);
        const id = req.body.id;
        const horainicio = req.body.horainicio;
        const horafin = req.body.horafin;
        const descanso = req.body.descanso;
        const horainicioMD = (req.body.horainicioMD) ? req.body.horainicioMD : "NA";
        const horafinMD = (req.body.horafinMD ? req.body.horafinMD : "NA");
        if (id && horainicio && horafin) {
            const respuesta = await registrarhorarios(id, horainicio, horafin, horainicioMD, horafinMD);
            res.status(200).json(respuesta);
        } else {
            res.status(404).json({
                mensaje: 'Existen datos vacios'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarhorario).'
        });
    }
})


//TODO LO QUE SE UTILIZA EN EL REGISTRO DE ASISTENCIA Y EN EL MODULO DE CONTROL DE ASISTENCIAS EN STEELPRO
const fs = require('fs');
const path = require('path');
const XlsxTemplate = require("xlsx-template");

/* CHECADOR DE HUELLA CON CONSUMOS DE API C# */
//Registro de personal
const mostAsistencia = require('./checadorhuella/mostAsistencia');
const listarTodoPersonal = require('./checadorhuella/listarTodoPersonal');
const buscarPersonalValor = require('./checadorhuella/buscarPersonalValor');
const registrarhuella = require('./checadorhuella/registrarhuella');

//Mostrar horario
const listarHorario = require('./checadorhuella/listarHorario');

//Asistencia
const Verificarasistencia = require('./checadorhuella/Verificarasistencia');
const verificarfalta = require('./checadorhuella/verificarfalta');
const verificarentrada = require('./checadorhuella/verificarentrada');
const verificarentradaAyer = require('./checadorhuella/verificarentradaAyer');
const listarasistenciareciencreada = require('./checadorhuella/listarasistenciareciencreada');

//Registrar datos
const actualizarEntrada = require('./checadorhuella/actualizarEntrada');
const registrarEntrada = require('./checadorhuella/registrarEntrada');
const registrarRetardo = require('./checadorhuella/registrarRetardo');
const registrarSalida = require('./checadorhuella/registrarSalida');

//Liogin del checador
const loginchecador = require('./checadorhuella/loginchecador');
const usuarioLogin = require('./checadorhuella/usuarioLogin');


//Hoja de asistencia
const mostListaasistencia = require('./checadorhuella/asistenciach/mostListaasistencia');
const Actualizarjustificante = require('./checadorhuella/asistenciach/Actualizarjustificante');
const Actualizarsaliotemprano = require('./checadorhuella/asistenciach/Actualizarsaliotemprano');
const registrarFalta = require('./checadorhuella/asistenciach/registrarFalta');
const listaunasistencia = require('./checadorhuella/asistenciach/listaunasistencia');
const mostAsistenciaperiodos = require('./checadorhuella/asistenciach/mostAsistenciaperiodos');

//controlasistencias
const mostPermisosasistencia = require('./checadorhuella/asistenciach/mostPermisosasistencia');
const insertPermisovacaciones = require('./checadorhuella/asistenciach/insertPermisovacaciones');

//registrar horarios
const registrarhorarios = require('./checadorhuella/registrarhorarios');

//autasistencia
const mostPermisosfechas = require('./checadorhuella/asistenciach/mostPermisosfechas');
/* FIN DE CHECADOR DE HUELLA CON CONSUMOS DE API C#  */

/* CHECADOR DE HUELLA CON CONSUMO DE API */
//HOJA DE HORARIOS EN STEELPRO
//user_registro
app.get('/addhorarioasitencia', async (req, res) => {
    const respuesta2 = await listarTodoPersonal();
    const respuesta = respuesta2.map((datos) => {
        return {
            ...datos,
            huella: (datos.FinguerPrint) ? "ACTIVO" : "INACTIVO"
        }
    })
    //console.log(respuesta2);
    res.status(200).json(respuesta);
}
)
//registrarhorarios
app.put("/registrarhorario", async (req, res) => {
    try {
        //console.log(req.body);
        const id = req.body.id;
        const horainicio = req.body.horainicio;
        const horafin = req.body.horafin;
        const descanso = req.body.descanso;
        const horainicioMD = (req.body.horainicioMD) ? req.body.horainicioMD : "NA";
        const horafinMD = (req.body.horafinMD ? req.body.horafinMD : "NA");
        if (id && horainicio && horafin) {
            const respuesta = await registrarhorarios(id, horainicio, horafin, horainicioMD, horafinMD);
            res.status(200).json(respuesta);
        } else {
            res.status(404).json({
                mensaje: 'Existen datos vacios'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarhorario).'
        });
    }
})


//Todo para mostrar personal y agregar huella del personal EN AGREGAR HUELLA BY CONTROL DE ASISTECIA
app.get("/listarTodoPersonal", async (req, res) => {
    try {
        const respuesta2 = await listarTodoPersonal();
        const respuesta = respuesta2.map((datos) => {
            return {
                idAlta: datos.idAlta,
                NombreCompleto: datos.NombreCompleto,
                idCheck: datos.idCheck,
                Estatus: datos.Estatus,
                foto: datos.foto,
                FinguerPrint: datos.FinguerPrint,
                HoEntrada: (datos.HoEntrada === "undefined") ? null : datos.HoEntrada,
                HoSalida: (datos.HoSalida === "undefined") ? null : datos.HoSalida,
                HoEntradaSD: (datos.HoEntradaSD === "undefined") ? null : datos.HoEntradaSD,
                HoSalidaSD: (datos.HoSalidaSD === "undefined") ? null : datos.HoSalidaSD
            }
        });
        console.log("respuesta: ", respuesta.length);
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (listarTodoPersonal).'
        });
    }
})
app.get("/buscarPersonalValor", async (req, res) => {
    try {
        const dato = req.query.valor;
        const respuesta2 = await buscarPersonalValor(dato);

        const respuesta = respuesta2.map((datos) => {
            return {
                idAlta: datos.idAlta,
                NombreCompleto: datos.NombreCompleto,
                idCheck: datos.idCheck,
                Estatus: datos.Estatus,
                foto: datos.foto,
                FinguerPrint: datos.FinguerPrint,
                HoEntrada: (datos.HoEntrada === "undefined") ? null : datos.HoEntrada,
                HoSalida: (datos.HoSalida === "undefined") ? null : datos.HoSalida,
                HoEntradaSD: (datos.HoEntradaSD === "undefined") ? null : datos.HoEntradaSD,
                HoSalidaSD: (datos.HoSalidaSD === "undefined") ? null : datos.HoSalidaSD
            }
        });

        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (verificarfalta).'
        });
    }
})
app.put("/registrarhuella", async (req, res) => {
    try {
        const idper = req.body.xidper;
        const huella = Buffer.from(req.body.xhuella, 'base64');
        //console.log("Persona: ", idper, "Huella ", huella);
        const respuesta = await registrarhuella(idper, huella);
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (verificarfalta).'
        });
    }
})


//MODULO DE REGISTRO DE ASISTENCIA
//Horario
app.get("/listarHorario", async (req, res) => {
    try {
        const dia = moment().format("dddd");
        const dato = req.query.valor;
        //console.log(dia);
        const otrorespuesta = await listarHorario(dato);
        let respuesta = [];
        if (dia === "Saturday " || dia === "Sunday") {
            respuesta = otrorespuesta.map((datos) => {
                return {
                    idAlta: datos.idAlta,
                    HoEntrada: moment(datos.HoEntradaSD, "HH:mm"),
                    HoSalida: moment(datos.HoSalidaSD, "HH:mm")
                }
            })
        } else {
            respuesta = otrorespuesta.map((datos) => {
                return {
                    idAlta: datos.idAlta,
                    HoEntrada: moment(datos.HoEntrada, "HH:mm"),
                    HoSalida: moment(datos.HoSalida, "HH:mm")
                }
            })

        }
        //console.log("Respuesta horario: " + moment().format("HH:mm:ss"));
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (listarHorario).'
        });
    }

})

//VERIFICAR SI NO ESTA REGISTRADO EN ASISTENCIA
app.get("/verificarasistencia", async (req, res) => {
    try {
        const dato = req.query.valor;
        const respuesta2 = await Verificarasistencia(dato);
        const respuesta = Object.values(respuesta2[0])[0];
        //console.log(Object.values(respuesta[0])[0]);
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (verificarasistencia).'
        });
    }

})
app.get("/verificarfalta", async (req, res) => {
    try {
        const dato = req.query.valor;
        const respuesta2 = await verificarfalta(dato);
        const respuesta = Object.values(respuesta2[0])[0];
        res.status(200).json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (verificarfalta).'
        });
    }

})
app.get("/verificarentrada", async (req, res) => {
    try {
        const dato = req.query.valor;
        const respuesta2 = await verificarentrada(dato);
        const respuesta = Object.values(respuesta2[0])[0];
        res.status(200).json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (verificarentrada).'
        });
    }

})
app.get("/verificarentradaAyer", async (req, res) => {
    try {
        const dato = req.query.valor;
        const respuesta2 = await verificarentradaAyer(dato);
        const respuesta = Object.values(respuesta2[0])[0];
        res.status(200).json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (verificarentradaAyer).'
        });
    }

})
app.get("/listarasistenciareciencreada", async (req, res) => {
    try {
        const dato = req.query.valor;
        const respuesta = await listarasistenciareciencreada(dato);
        res.status(200).json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (listarasistenciareciencreada).'
        });
    }

})

//REGISTRA ENTRADA Y SALIDA
//EDITADO SUBIR AL REPOSITORIO PARA ACEPTAR ASISTENCIAS YA REGISTRADAS (27-11-2025)
app.post("/registrarEntrada", async (req, res) => {
    //idalta, nombredia, hoingreso
    try {
        const fechaactual = moment().format("YYYY-MM-DD");
        const horaactual = moment().format("HH:mm:ss");
        const horaactualcomparar = moment().format("HH:mm");
        const idalta = req.body.xidalta;
        const nombredia = req.body.xnombredia;
        const hoingreso = req.body.xhoingreso;
        const horario = await listarHorario(idalta);
        const dia = moment().format("dddd");
        let respuesta = [];
        const respuestaasistencias1 = await mostListaasistencia();
        //console.log("respuestaasistencias ", respuestaasistencias);
        const respuestaasistencias = respuestaasistencias1.find((datos) => (datos.EstadoAsis === "VACACIONES" || datos.EstadoAsis === "PERMISO" || datos.EstadoAsis === "INCAPACIDAD" || datos.EstadoAsis === "OTRO") &&
            moment(datos.FechaAsis).format("YYYY-MM-DD") === fechaactual && datos.idAlta === idalta);
        //console.log("respuestaasistencias ", respuestaasistencias);

        if (dia === "Saturday " || dia === "Sunday") {
            const hoEntradaSD = moment(horario[0].HoEntradaSD, "HH:mm").format("HH:mm");
            if (horaactualcomparar <= hoEntradaSD) {
                if (!respuestaasistencias) {
                    respuesta = await registrarEntrada(idalta, nombredia, horaactual);
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                } else {
                    const xJustificacion = "NA";
                    const xEstadoAsis = "Entrada";
                    respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                }

            } else {
                if (!respuestaasistencias) {
                    respuesta = await registrarRetardo(idalta, nombredia, horaactual);
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                }
                else {
                    if (respuestaasistencias.EstadoAsis != "PERMISO") {
                        const xJustificacion = "Retardo injustificado";
                        const xEstadoAsis = "Entrada";
                        respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                        io.emit('escuchandoAsistencia', "Actualizartablaasis");

                    } else {
                        //console.log("Entrada retardo con permiso revisando logica");
                        const personaspermisos = await mostPermisosfechas(fechaactual);
                        //console.log("personaspermisos ", personaspermisos);
                        const tiempopermiso = personaspermisos.find((datos) => datos.idAlta === idalta).horas;
                        //console.log("tiempopermiso ", tiempopermiso);
                        const horaentrada = moment(hoEntradaSD, 'HH:mm:ss');
                        const timentradapermiso = horaentrada.clone().add(tiempopermiso, 'hours').format("HH:mm");
                        //console.log("timentradapermiso ", timentradapermiso);
                        if (horaactualcomparar <= timentradapermiso) {
                            //console.log("ENTRO ANTES DE LA HORA PERMITIDA CON PERMISO (Entrada con permiso, Entrada)", horaactualcomparar);
                            const xJustificacion = "Entrada con permiso";
                            const xEstadoAsis = "Entrada";
                            respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                            io.emit('escuchandoAsistencia', "Actualizartablaasis");
                        } else {
                            //console.log("ENTRO DESPUES DE LA HORA PERMITIDA CON PERMISO (Retardo injustificado, Entrada)", horaactualcomparar);
                            const xJustificacion = "Retardo injustificado";
                            const xEstadoAsis = "Entrada";
                            respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                            io.emit('escuchandoAsistencia', "Actualizartablaasis");
                        }
                    }

                }
            }
        } else {
            const hoEntrada = moment(horario[0].HoEntrada, "HH:mm").format("HH:mm");
            if (horaactualcomparar <= hoEntrada) {
                //console.log("Si ", horaactualcomparar , hoEntrada);
                /* respuesta = await registrarEntrada(idalta, nombredia, horaactual);
                io.emit('escuchandoAsistencia', "Actualizartablaasis"); */
                if (!respuestaasistencias) {
                    //console.log("Entrada temprano sin permiso de nada");
                    respuesta = await registrarEntrada(idalta, nombredia, horaactual);
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                } else {
                    //console.log("Entrada temprano con permiso");
                    const xJustificacion = "NA";
                    const xEstadoAsis = "Entrada";
                    respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                }

            } else {
                //console.log("No ", horaactualcomparar , hoEntrada);
                /*  respuesta = await registrarRetardo(idalta, nombredia, horaactual);
                 io.emit('escuchandoAsistencia', "Actualizartablaasis"); */
                if (!respuestaasistencias) {
                    //console.log("Entrada retardo sin permiso");
                    respuesta = await registrarRetardo(idalta, nombredia, horaactual);
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                }
                else {
                    //console.log(respuestaasistencias.EstadoAsis);
                    if (respuestaasistencias.EstadoAsis != "PERMISO") {
                        //console.log("Entrada retardo con permiso");
                        const xJustificacion = "Retardo injustificado";
                        const xEstadoAsis = "Entrada";
                        respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                        io.emit('escuchandoAsistencia', "Actualizartablaasis");

                    } else {
                        //console.log("Entrada retardo con permiso revisando logica");
                        const personaspermisos = await mostPermisosfechas(fechaactual);
                        //console.log("personaspermisos ", personaspermisos);
                        const tiempopermiso = personaspermisos.find((datos) => datos.idAlta === idalta).horas;
                        //console.log("tiempopermiso ", tiempopermiso);
                        const horaentrada = moment(hoEntrada, 'HH:mm:ss');
                        const timentradapermiso = horaentrada.clone().add(tiempopermiso, 'hours').format("HH:mm");
                        //console.log("timentradapermiso ", timentradapermiso);
                        if (horaactualcomparar <= timentradapermiso) {
                            //console.log("ENTRO ANTES DE LA HORA PERMITIDA CON PERMISO (Entrada con permiso, Entrada)", horaactualcomparar);
                            const xJustificacion = "Entrada con permiso";
                            const xEstadoAsis = "Entrada";
                            respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                            io.emit('escuchandoAsistencia', "Actualizartablaasis");
                        } else {
                            //console.log("ENTRO DESPUES DE LA HORA PERMITIDA CON PERMISO (Retardo injustificado, Entrada)", horaactualcomparar);
                            const xJustificacion = "Retardo injustificado";
                            const xEstadoAsis = "Entrada";
                            respuesta = await actualizarEntrada(respuestaasistencias.Id_asis, horaactual, xJustificacion, xEstadoAsis);
                            io.emit('escuchandoAsistencia', "Actualizartablaasis");
                        }
                    }

                }
            }
        }
        res.status(200).json(respuesta);

    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarEntrada).'
        });
    }

})
app.put("/registrarSalida", async (req, res) => {
    try {
        const idasis = req.body.xidasis;
        const hosalida = req.body.xhosalida;
        const horaactual = moment().format("HH:mm:ss");
        const fechactual = moment().format("YYYY-MM-DD");
        const actual = moment(`${fechactual} ${horaactual}`, 'YYYY-MM-DD HH:mm:ss');
        //console.log("actual ", actual);
        let estatus = "Asistio";
        let xhrtrabjadas = 0;
        //console.log(idasis, hosalida);

        const unaasistencia = await listaunasistencia(idasis);
        //console.log("unaasistencia ", unaasistencia);
        const fechaasistencia = moment(unaasistencia[0].FechaAsis).format("YYYY-MM-DD");
        const Hoingreso = unaasistencia[0].Hoingreso;
        const ingreso = moment(`${fechaasistencia} ${Hoingreso}`, 'YYYY-MM-DD HH:mm:ss');
        //fechaasistencia: 2025-10-03,	ingreso: 08:10:22,	fechasalida: 2025-10-03, actual: 09:27:33, horastrabajadas: 1.28hr
        //console.log("ingreso ", ingreso);
        /* if (ingreso.isBefore(actual)) {
            console.log("Algo pasa");
            actual.add(1, 'day');
        } */
        const diferencia = moment.duration(actual.diff(ingreso));
        xhrtrabjadas = diferencia.asHours().toFixed(2);

        /* console.log("horas ", horas);
        console.log("minutos ", minutos);
        console.log("xhrtrabjadas ", xhrtrabjadas); */

        const respuesta = await registrarSalida(idasis, horaactual, estatus, xhrtrabjadas);
        io.emit('escuchandoAsistencia', "Actualizartablaasis");
        res.status(200).json(respuesta);


    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarSalida).'
        });
    }

})

/* LOGIN DE CONTROLDE ASISTENCIA BY STEELPRO */
app.get("/loginchecador", async (req, res) => {
    try {
        const usu = req.query.usuario;
        const con = req.query.contra;
        //usuario,contra
        console.log("REVISA LOS DATOS ", usu, con);
        const respuesta2 = await loginchecador(usu, con);
        const respuesta = Object.values(respuesta2[0])[0];
        res.status(200).json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (loginchecador).'
        });
    }

})
app.get("/usuarioLogin", async (req, res) => {
    try {
        const dato = req.query.valor;
        //usuario,contra
        const respuesta = await usuarioLogin(dato);
        res.status(200).json(respuesta);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (usuarioLogin).'
        });
    }

})


/* HOJA DE asistencia o controlasistencias*/
app.get('/asistencias', async (req, res) => {
    try {
        const fecha = moment().format("YYYY-MM-DD");
        //mostListaasistencia
        const respuesta2 = await mostListaasistencia();
        //console.log(respuesta2);

        const respuesta = respuesta2.filter((fill) => moment(fill.FechaAsis).format("YYYY-MM-DD") === fecha).map((datos) => {
            return {
                FechaAsis: moment(datos.FechaAsis).format("YYYY-MM-DD"),
                Id_asis: datos.Id_asis,
                NombreCompleto: datos.NombreCompleto,
                Hoingreso: datos.Hoingreso,
                HoSalida: datos.HoSalida,
                Justificacion: datos.Justificacion,
                EstadoAsis: datos.EstadoAsis

            }
        })
        res.status(200).json({
            respuesta
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (asistencias).'
        });
    }

}
)
app.put('/actualizarJustificante', async (req, res) => {
    try {
        const idasis = req.body;
        //console.log("idasis ", idasis);
        const numasis = idasis.length - 1;
        if (idasis.length > 0) {
            idasis.forEach(async (datos, index) => {
                const estatus = (datos.Justificacion === "Retardo injustificado") ? "Retardo justificado" : "Falta justificada"
                const respuesta = await Actualizarjustificante(datos.Id_asis, estatus);
                if (index === numasis) {
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                    res.status(200).json(respuesta);
                }
            })
        }
        else {
            res.status(400).json({
                mensaje: 'Seleccióna al personal'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (actualizarJustificante).'
        });
    }
})

/* HOJA de todoasistencia */
async function mostAsistenciapordecision(inicio, fin, status, respon) {
    try {
        const fechaactual = moment().format("YYYY-MM-DD");
        const fechainicio = (inicio != "null") ? inicio : fechaactual;
        const fechafin = (fin != "null") ? fin : fechaactual;
        const estatus = (status) ? status : null;
        const sujeto = (respon) ? respon : null;
        let respuesta2 = await mostAsistenciaperiodos(fechainicio, fechafin);
        //respuesta2 = await mostListaasistencia();

        //console.log("fechainicio, fechafin ", fechainicio, fechafin);
        //console.log("estatus, sujeto ", estatus, sujeto);
        //console.log("respuesta2 ", respuesta2.length);

        if (sujeto === null && estatus === null) { respuesta2 = respuesta2; } else {
            if (estatus != null && estatus === "Retardo" && sujeto === null) { respuesta2 = respuesta2.filter((datos) => datos.Justificacion.includes(estatus)) } else {
                if (estatus != null && estatus === "Asistio" && sujeto === null) { respuesta2 = respuesta2.filter((datos) => (datos.EstadoAsis === estatus || datos.EstadoAsis === "Entrada")) } else {
                    if (estatus != null && sujeto === null) { respuesta2 = respuesta2.filter((datos) => datos.EstadoAsis === estatus) } else {
                        if (sujeto != null && estatus === null) { respuesta2 = respuesta2.filter((datos) => datos.NombreCompleto === sujeto) } else {
                            if (sujeto != null && estatus != null && estatus === "Asistio") {
                                //console.log("Algo esta mal");
                                respuesta2 = respuesta2.filter((datos) => (datos.EstadoAsis === estatus || datos.EstadoAsis === "Entrada") && datos.NombreCompleto === sujeto)
                                //console.log("respuesta2 ", respuesta2.length);
                            } else {
                                if (sujeto != null && estatus != null && estatus === "Retardo") {
                                    respuesta2 = respuesta2.filter((datos) => datos.Justificacion.includes(estatus) && datos.NombreCompleto === sujeto)
                                    //console.log("respuesta2 ", respuesta2.length);
                                } else {
                                    if (sujeto != null && estatus != null) {
                                        respuesta2 = respuesta2.filter((datos) => datos.EstadoAsis === estatus && datos.NombreCompleto === sujeto)
                                        //console.log("respuesta2 ", respuesta2.length);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        const respuesta = respuesta2.map((datos) => {
            return {
                FechaAsis: moment(datos.FechaAsis).format("YYYY-MM-DD"),
                Id_asis: datos.Id_asis,
                NombreCompleto: datos.NombreCompleto,
                Hoingreso: datos.Hoingreso,
                HoSalida: datos.HoSalida,
                Justificacion: datos.Justificacion,
                EstadoAsis: datos.EstadoAsis,
                hrtrabjadas: (datos.hrtrabjadas) ? datos.hrtrabjadas + "hr" : "0hr"
            }
        })
        //console.log(respuesta);

        let respuestausuarios = await mostAsistenciaperiodos(fechainicio, fechafin);
        const respuesta3 = respuestausuarios.map((datos) => datos.NombreCompleto).flat();
        const responsable = [...new Set(respuesta3)];
        //console.log(responsable);

        if (sujeto != null) { respuestausuarios = respuestausuarios.filter((datos) => datos.NombreCompleto === sujeto); }

        const hrtrabajadasuma = respuestausuarios.reduce((acumulador, filtro) => {
            return acumulador + filtro.hrtrabjadas;
        }, 0);


        const totales = [
            {
                asistencia: respuestausuarios.filter((datos) => (datos.EstadoAsis === "Asistio" || datos.EstadoAsis === "Entrada")).length,
                retardos: respuestausuarios.filter((datos) => datos.Justificacion.includes("Retardo")).length,
                retardosjusti: respuestausuarios.filter((datos) => datos.Justificacion.includes("Retardo justificado")).length,
                faltas: respuestausuarios.filter((datos) => datos.Justificacion.includes("Falta")).length,
                faltasjusti: respuestausuarios.filter((datos) => datos.Justificacion.includes("Falta justificada")).length,
                hrtrabajadas: hrtrabajadasuma.toFixed(2),
                incapacidad: respuestausuarios.filter((datos) => datos.EstadoAsis === "INCAPACIDAD").length,
                otro: respuestausuarios.filter((datos) => datos.EstadoAsis === "OTRO").length,
                vacaciones: respuestausuarios.filter((datos) => datos.EstadoAsis === "VACACIONES").length,
                permisos: respuestausuarios.filter((datos) => datos.EstadoAsis === "PERMISO").length,

            }

        ]

        //console.log("totales ", totales);

        //res.status(200).json({ respuesta, responsable, totales });

        return { respuesta, responsable, totales }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (listarTodoPersonal).'
        });
    }
}
app.get('/mostAsistenciaperiodos', async (req, res) => {
    //console.log(req.query.inicio, req.query.fin, req.query.estatus, req.query.responsable);
    //const respuesta = await mostAsistenciapordecision(req.query.inicio, req.query.fin, req.query.estatus, req.query.responsable);
    res.status(200).json(await mostAsistenciapordecision(req.query.inicio, req.query.fin, req.query.estatus, req.query.responsable));
    //console.log("respuesta ", await mostAsistenciapordecision(req.query.inicio, req.query.fin, req.query.estatus, req.query.responsable));

}
)
app.get('/descargarpdfasistencia', async (req, res) => {
    try {
        //console.log("datos RECIBIDOS: ", req.query);
        const fechaactual = moment().format("YYYY-MM-DD");
        const periodos = [{
            ini: (req.query.inicio != "null") ? req.query.inicio : fechaactual,
            fin: (req.query.fin != "null") ? req.query.fin : fechaactual,
        }]

        const respuesta = await mostAsistenciapordecision(req.query.inicio, req.query.fin, req.query.estatus, req.query.responsable);
        /* console.log("datos ", respuesta.respuesta);
        console.log("periodo ", periodos[0]);
        console.log("total ", respuesta.totales[0]); */

        // Leer la plantilla
        const templatePath = path.join(__dirname, "plantillasdocx", "FR.STEELPRO.0Informedeasistencia.xlsx");
        const templateData = fs.readFileSync(templatePath);
        const template = new XlsxTemplate(templateData);

        const data = {
            datos: respuesta.respuesta,
            periodo: periodos[0],
            total: respuesta.totales[0]
        };

        //console.log("data", data);

        // Sustituir en la primera hoja (1 = índice base 1)
        template.substitute(1, data);

        // Generar el nuevo Excel
        const outputData = template.generate({ type: "nodebuffer" });

        const outputDir = path.join(__dirname, "docx");
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, "FR.STEELPRO.0Informedeasistenciaresultado.xlsx");
        fs.writeFileSync(outputPath, outputData);

        // Enviar Excel al cliente
        res.setHeader("Content-Disposition", "attachment; filename=FR.STEELPRO.0Informedeasistenciaresultado.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(outputData);

    } catch (error) {
        console.error('Error en generarwordypdf:', error);
        throw error;
    }
});

/* controlasistencia */
app.get('/listapersona', async (req, res) => {
    try {
        res.status(200).json(await listarTodoPersonal());
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (asistencias).'
        });
    }
})
app.get("/selectfechas", async (req, res) => {
    try {
        //console.log(req.query);
        if (req.query.id && req.query.fechainicio && req.query.dias) {
            const id = parseInt(req.query.id);

            const fechainicio = moment(req.query.fechainicio);
            //console.log("fechainicio ", fechainicio);
            const dias = parseInt(req.query.dias);

            const respuesta2 = await listarTodoPersonal();
            //console.log("respuesta2 ", respuesta2[0]);
            const datospersona = respuesta2.find((datos) => datos.idAlta === id);
            //console.log("datospersona", datospersona);
            let fechacalculada = "";
            let diasHabilesSumados = 0;
            let fechaFin = fechainicio.clone();

            if (datospersona.HoEntradaSD && datospersona.HoSalidaSD != "NA" && datospersona.HoSalidaSD && datospersona.HoSalidaSD != "NA") {
                while (diasHabilesSumados < dias) {
                    if (fechaFin.day() !== 0) {
                        diasHabilesSumados++;
                    }

                    if (diasHabilesSumados < dias) {
                        fechaFin.add(1, "day");
                    }
                }

                //console.log("Fecha fin:", fechaFin.format("YYYY-MM-DD"));
                fechacalculada = fechaFin.format("YYYY-MM-DD");

            } else {
                while (diasHabilesSumados < dias) {
                    if (fechaFin.day() !== 0 && fechaFin.day() !== 6) {
                        diasHabilesSumados++;
                    }

                    if (diasHabilesSumados < dias) {
                        fechaFin.add(1, "day");
                    }
                }

                //console.log("Fecha fin:", fechaFin.format("YYYY-MM-DD"));
                fechacalculada = fechaFin.format("YYYY-MM-DD");
            }
            fechacalculada = moment(fechacalculada).format("YYYY-MM-DD");
            const respuesta = {
                fechafin: fechacalculada
            };

            if (req.query) {
                res.status(200).json(respuesta);
            } else {
                res.status(404).json({
                    mensaje: 'Existen datos vacios'
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarhorario).'
        });
    }
})
app.get('/permisosAsistencia', async (req, res) => {
    try {
        res.status(200).json(await mostPermisosasistencia());
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (asistencias).'
        });
    }
})
app.post('/registrarpermisos', verificar_Token, async (req, res) => {
    try {
        const usuario = req.usuario;
        const nombre = usuario.nombre;
        const horaactual = moment().format("HH:mm:ss");
        const id = req.body.idalta;
        const fecha = moment().format("YYYY-MM-DD");
        const tipo1 = req.body.tipo;
        const motivo1 = (req.body.motivo) ? req.body.motivo : "SIN MOTIVO";
        const fechainicio1 = req.body.fechainicio;
        const fechafin1 = req.body.fechafin;
        const dias1 = req.body.dias;
        const horas1 = (req.body.horas) ? req.body.horas : 0;

        if (id && fecha && tipo1 && fechainicio1 && fechafin1 && dias1) {
            const respuesta = await insertPermisovacaciones(id, fecha, tipo1, motivo1, fechainicio1, fechafin1, dias1, horas1, nombre, horaactual);
            //console.log("registrarpermisos ",respuesta);
            if (respuesta) {
                const mensaje = "Se agrego solicitud";
                res.status(200).json(mensaje);
            }
        } else {
            const mensaje = "Existen campos vacios";
            res.status(400).json(mensaje);
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarpermisos).'
        });
    }
})

//AGREGAR TAREAS AUTOMATICAS
async function autasistencia() {
    try {
        const fechaactual = moment().format("YYYY-MM-DD");
        const horaactual = moment().format("HH:mm");

        const respuestaasistencias1 = await mostListaasistencia();
        //console.log("respuestaasistencias ", respuestaasistencias);
        const respuestaasistencias = respuestaasistencias1.filter((datos) => moment(datos.FechaAsis).format("YYYY-MM-DD") === fechaactual);
        //console.log("respuestaasistencias ", respuestaasistencias);

        //Mostrar personas con permisos
        const personaspermisos = await mostPermisosfechas(fechaactual);
        //console.log("personaspermisos ", personaspermisos);

        // Mostrar personas que no asistieron
        const dia = moment().format('dddd');

        const respuesta3 = await mostListaasistencia();
        //console.log("respuesta3 ",respuesta3);
        const respuesta4 = respuesta3.filter((fill) => moment(fill.FechaAsis).format("YYYY-MM-DD") === fecha);

        const respuesta2 = await listarTodoPersonal();
        //console.log(respuesta2);

        let respuesta = [];
        if (dia === "Saturday " || dia === "Sunday") {
            respuesta = respuesta2.filter((datos) => datos.HoEntradaSD && datos.HoEntradaSD != "NA" && datos.HoSalidaSD && datos.HoSalidaSD != "NA" && datos.HoEntradaSD <= horaactual).map((fill) => {
                const existeregistro = respuesta4.find((idal) => idal.idAlta === fill.idAlta);
                if (!existeregistro) {
                    return {
                        ...fill
                    }
                } return null
            }).filter((item) => item);
        } else {
            respuesta = respuesta2.filter((datos) => datos.HoEntrada && datos.HoEntrada != "NA" && datos.HoSalida && datos.HoSalida != "NA" && datos.HoEntrada <= horaactual).map((fill) => {
                const existeregistro = respuesta4.find((idal) => idal.idAlta === fill.idAlta);
                if (!existeregistro) {
                    return {
                        ...fill
                    }
                }
                return null
            }).filter((item) => item);
        }
        //console.log("No asistieron ", respuesta);

        let diaenviar = "";
        switch (dia) {
            case "Monday":
                diaenviar = "lunes";
                break;
            case "Tuesday":
                diaenviar = "martes";
                break;
            case "Wednesday":
                diaenviar = "miércoles";
                break;
            case "Thursday":
                diaenviar = "jueves";
                break;
            case "Friday":
                diaenviar = "viernes";
                break;
            case "Saturday":
                diaenviar = "sábado";
                break;
            case "Sunday":
                diaenviar = "domingo";
                break;
            default:
                break;
        }

        const datosregistrar = respuesta.map((falta) => {
            const tienepermiso = personaspermisos.find((permiso) => permiso.idAlta === falta.idAlta);
            //idalta, xNomdia, xJustificacion, xEstadoAsis
            if (tienepermiso) {
                return {
                    idalta: tienepermiso.idAlta,
                    xNomdia: diaenviar,
                    xJustificacion: tienepermiso.motivo,
                    xEstadoAsis: tienepermiso.tipo
                }
            } else {
                return {
                    idalta: falta.idAlta,
                    xNomdia: diaenviar,
                    xJustificacion: "Falta injustificada",
                    xEstadoAsis: "Falta"
                }
            }

        });
        //console.log("datosregistrar ", datosregistrar);

        //Realizar registro de asistencia automatica segun corresponda

        if (datosregistrar.length > 0) {
            const numdatos = datosregistrar.length - 1;
            //console.log("numdatos ", numdatos);
            datosregistrar.forEach(async (datos, index) => {
                //idalta,xNomdia
                const existeasistencia = respuestaasistencias.find((asisten) => asisten.idAlta === datos.idalta);
                if (!existeasistencia) {
                    const respuesta = await registrarFalta(datos.idalta, datos.xNomdia, datos.xJustificacion, datos.xEstadoAsis);
                    if (index === numdatos) {
                        io.emit('escuchandoAsistencia', "Actualizartablaasis");
                        //console.log("respuesta de registrarfalta: ", respuesta);
                    }
                }

            })
        } else {
            console.log("Seleccióna al personal");
        }


    } catch (error) {
        console.log('Hubo un error al procesar la solicitud (autasistencia).', error);
    }
}
app.post('/addasistenciaut', async (req, res) => {
    try {
        autasistencia();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (autasistencia).'
        });
    }
})
// Tarea programada para ejecutarse todos los días a la hora que le indiques
schedule.scheduleJob('10 14 * * *', function () {
    console.log('¡La tarea diaria se ejecutó');
    autasistencia();
});
/* Estructura de los *:
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

/* ----------------- CHEADOR DE HUELLA CON CONSUMO DE API */

//FIN DE TODO LO QUE SE UTILIZA EN EL REGISTRO DE ASISTENCIA Y EN EL MODULO DE CONTROL DE ASISTENCIAS EN STEELPRO