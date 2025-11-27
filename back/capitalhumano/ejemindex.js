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
/* FIN DE CHECADOR DE HUELLA CON CONSUMOS DE API C#  */



/* CHEADOR DE HUELLA CON CONSUMO DE API */
//Todo para mostrar personal y agregar huella del personal
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


//Agregar entrada y salida de asitencia
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
//verificarentradaAyer
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

app.post("/registrarEntrada", async (req, res) => {
    //idalta, nombredia, hoingreso
    try {
        const horaactual = moment().format("HH:mm:ss");
        const horaactualcomparar = moment().format("HH:mm");
        const idalta = req.body.xidalta;
        const nombredia = req.body.xnombredia;
        const hoingreso = req.body.xhoingreso;
        const horario = await listarHorario(idalta);
        const dia = moment().format("dddd");
        let respuesta = [];

        if (dia === "Saturday " || dia === "Sunday") {
            const hoEntradaSD = moment(horario[0].HoEntradaSD, "HH:mm").format("HH:mm");
            if (horaactualcomparar <= hoEntradaSD) {
                respuesta = await registrarEntrada(idalta, nombredia, horaactual);
                io.emit('escuchandoAsistencia', "Actualizartablaasis");
            } else {
                respuesta = await registrarRetardo(idalta, nombredia, horaactual);
                io.emit('escuchandoAsistencia', "Actualizartablaasis");
            }

        } else {
            const hoEntrada = moment(horario[0].HoEntrada, "HH:mm").format("HH:mm");
            if (horaactualcomparar <= hoEntrada) {
                //console.log("Si ", horaactualcomparar , hoEntrada);
                respuesta = await registrarEntrada(idalta, nombredia, horaactual);
                io.emit('escuchandoAsistencia', "Actualizartablaasis");
            } else {
                //console.log("No ", horaactualcomparar , hoEntrada);
                respuesta = await registrarRetardo(idalta, nombredia, horaactual);
                io.emit('escuchandoAsistencia', "Actualizartablaasis");
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

app.post("/registrarRetardo", async (req, res) => {
    try {
        //idasis,idalta, nombredia, hoingreso
        const idalta = req.body.xidalta;
        const nombredia = req.body.xnombredia;
        const hoingreso = req.body.xhoingreso;

        const respuesta = await registrarRetardo(idalta, nombredia, hoingreso);
        res.status(200).json(respuesta);
        io.emit('escuchandoAsistencia', "Actualizartablaasis");
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarRetardo).'
        });
    }

})

/* 
const Actualizarsaliotemprano = require('./checadorhuella/asistenciach/Actualizarsaliotemprano'); */
app.put("/registrarSalida", async (req, res) => {
    try {
        const idasis = req.body.xidasis;
        const hosalida = req.body.xhosalida;
        const horaactual = moment().format("HH:mm:ss");
        const fechactual = moment().format("YYYY-MM-DD");
        const actual = moment(`${fechactual} ${horaactual}`, 'YYYY-MM-DD HH:mm:ss');
        console.log("actual ", actual);
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


/* HOJA DE asistencia*/
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
app.get('/faltas', async (req, res) => {
    try {
        const dia = moment().format('dddd');

        const fecha = moment().format("YYYY-MM-DD");
        //mostListaasistencia
        const respuesta3 = await mostListaasistencia();
        //console.log(respuesta2);

        const respuesta4 = respuesta3.filter((fill) => moment(fill.FechaAsis).format("YYYY-MM-DD") === fecha);

        const respuesta2 = await listarTodoPersonal();
        //console.log(respuesta2[0]);

        let respuesta = [];
        if (dia === "Saturday " || dia === "Sunday") {
            respuesta = respuesta2.filter((datos) => datos.HoEntradaSD && datos.HoEntradaSD != "NA" && datos.HoSalidaSD && datos.HoSalidaSD != "NA").map((fill) => {
                const existeregistro = respuesta4.find((idal) => idal.idAlta === fill.idAlta);
                if (!existeregistro) {
                    return {
                        ...fill
                    }
                } return null
            }).filter((item) => item);
        } else {
            respuesta = respuesta2.filter((datos) => datos.HoEntrada && datos.HoEntrada != "NA" && datos.HoSalida && datos.HoSalida != "NA").map((fill) => {
                const existeregistro = respuesta4.find((idal) => idal.idAlta === fill.idAlta);
                if (!existeregistro) {
                    return {
                        ...fill
                    }
                }
                return null
            }).filter((item) => item);
        }
        res.status(200).json(respuesta);
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
app.post('/registrarFalta', async (req, res) => {
    try {
        //console.log("registrarFalta ", req.body);
        const dia = moment().format("dddd");
        const idalta = req.body;
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

        if (idalta.length > 0) {
            const numdatos = idalta.length - 1;
            //console.log("numdatos ", numdatos);
            idalta.forEach(async (datos, index) => {
                //idalta,xNomdia
                const respuesta = await registrarFalta(datos.idAlta, diaenviar)
                if (index === numdatos) {
                    io.emit('escuchandoAsistencia', "Actualizartablaasis");
                    //console.log("respuesta de registrarfalta: ", respuesta);
                    res.status(200).json(respuesta);
                }
            })
        } else {
            res.status(400).json({ mensaje: "Seleccióna al personal" });
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarFalta).'
        });
    }
})

/* HOJA de todoasistencia */
app.get('/todoasistencia', async (req, res) => {
    try {
        const fecha = moment().format("YYYY-MM-DD");
        const respuesta2 = await mostListaasistencia();
        const respuesta = respuesta2.filter((fill) => moment(fill.FechaAsis).format("YYYY-MM-DD") === fecha).map((datos) => {
            return {
                FechaAsis: moment(datos.FechaAsis).format("YYYY-MM-DD"),
                Id_asis: datos.Id_asis,
                NombreCompleto: datos.NombreCompleto,
                Hoingreso: datos.Hoingreso,
                HoSalida: datos.HoSalida,
                Justificacion: datos.Justificacion,
                EstadoAsis: datos.EstadoAsis,
                hrtrabjadas: (datos.hrtrabjadas) ? datos.hrtrabjadas + "hr" : "0hr",
                hrtrabjadas2: (datos.hrtrabjadas) ? datos.hrtrabjadas : 0,

            }
        })
        //console.log(respuesta);

        const respuesta3 = respuesta2.map((datos) => datos.NombreCompleto).flat();
        const responsable = [...new Set(respuesta3)];
        //console.log(responsable);
        const hrtrabajadasuma = respuesta.reduce((acumulador, filtro) => {
            return acumulador + filtro.hrtrabjadas2;
        }, 0);

        //console.log(hrtrabajadasuma);

        const totales = [
            {
                asistencia: respuesta.filter((datos) => (datos.EstadoAsis === "Asistio" || datos.EstadoAsis === "Entrada") && datos.Justificacion === "NA").length,
                retardos: respuesta.filter((datos) => datos.Justificacion.includes("Retardo")).length,
                retardosjusti: respuesta.filter((datos) => datos.Justificacion.includes("Retardo justificado")).length,
                faltas: respuesta.filter((datos) => datos.Justificacion.includes("Falta")).length,
                faltasjusti: respuesta.filter((datos) => datos.Justificacion.includes("Falta justificada")).length,
                hrtrabajadas: hrtrabajadasuma.toFixed(2),

            }

        ]

        //console.log("totales ", totales);
        res.status(200).json({ respuesta, responsable, totales });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (listarTodoPersonal).'
        });
    }
}
)
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
            if (estatus != null && estatus === "Asistio" && sujeto === null) { respuesta2 = respuesta2.filter((datos) => datos.EstadoAsis === estatus) } else {
                if (estatus != null && sujeto === null) { respuesta2 = respuesta2.filter((datos) => datos.Justificacion.includes(estatus)) } else {
                    if (sujeto != null && estatus === null) { respuesta2 = respuesta2.filter((datos) => datos.NombreCompleto === sujeto) } else {
                        if (sujeto != null && estatus != null && estatus === "Asistio") {
                            //console.log("Algo esta mal");
                            respuesta2 = respuesta2.filter((datos) => datos.EstadoAsis === estatus && datos.NombreCompleto === sujeto)
                            //console.log("respuesta2 ", respuesta2.length);
                        } else {
                            if (sujeto != null && estatus != null) {
                                respuesta2 = respuesta2.filter((datos) => datos.Justificacion.includes(estatus) && datos.NombreCompleto === sujeto)
                                //console.log("respuesta2 ", respuesta2.length);
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
                asistencia: respuestausuarios.filter((datos) => (datos.EstadoAsis === "Asistio" || datos.EstadoAsis === "Entrada") && datos.Justificacion === "NA").length,
                retardos: respuestausuarios.filter((datos) => datos.Justificacion.includes("Retardo")).length,
                retardosjusti: respuestausuarios.filter((datos) => datos.Justificacion.includes("Retardo justificado")).length,
                faltas: respuestausuarios.filter((datos) => datos.Justificacion.includes("Falta")).length,
                faltasjusti: respuestausuarios.filter((datos) => datos.Justificacion.includes("Falta justificada")).length,
                hrtrabajadas: hrtrabajadasuma.toFixed(2),

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
    //console.log("respuesta ", respuesta);

}
)
app.get('/descargarpdfasistencia', async (req, res) => {
    try {
        const fechaactual = moment().format("YYYY-MM-DD");
        const periodos = [{
            ini: (req.query.inicio != "null") ? req.query.inicio : fechaactual,
            fin: (req.query.fin != "null") ? req.query.fin : fechaactual,
        }]


        const respuesta = await mostAsistenciapordecision(req.query.inicio, req.query.fin, req.query.estatus, req.query.responsable);
        console.log("datos ", respuesta.respuesta);
        console.log("periodo ", periodos[0]);
        console.log("total ", respuesta.totales[0]);

        // Leer la plantilla
        /* const content = fs.readFileSync(path.resolve(__dirname, 'plantillasdocx', 'FR_STEELPRO_07Informedeasistencia.docx'), 'binary');
        const zip = new PizZip(content); */

        /* const templatePath = path.join(__dirname, "plantillasdocx", 'FR_STEELPRO_07Informedeasistencia.docx');
        const templateData = fs.readFileSync(templatePath);
        const template = new XlsxTemplate(templateData);

        // Asignar los datos
        const data = {
            datos: respuesta.respuesta,
            periodo: periodos[0],
            total: respuesta.totales[0]
        }; */
        // Leer la plantilla
        const content = fs.readFileSync(path.resolve(__dirname, 'plantillasdocx', 'FR_STEELPRO_07Informedeasistencia.docx'), 'binary');
        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // Asignar los datos
        doc.setData({
            datos: respuesta.respuesta,
            periodo: periodos[0],
            total: respuesta.totales[0]
        })
        //doc.setData({ data: descuentos });
        //doc.updateScope({ data: infoOC });
        //doc.render({ data: infoOC })
        //doc.render(infoOC[0]);

        try {
            doc.render();
        } catch (error) {
            console.log("Error de envio ", error);
            //return res.status(500).json({ error: error.message });
        }

        const buffer = doc.getZip().generate({ type: 'nodebuffer' });

        // 2. Convierte a PDF usando libreoffice
        const pdfBuffer = await new Promise((resolve, reject) => {
            libre.convert(buffer, '.pdf', undefined, (err, done) => {
                if (err) {
                    return reject(new Error(`Error al convertir a PDF: ${err}`));
                }
                resolve(done);
            });
        });

        // 3. Configura encabezados y envía el PDF directamente
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="FR_STEELPRO_07Informedeasistencia.pdf"');
        res.send(pdfBuffer);


    } catch (error) {
        console.error('Error en generarwordypdf:', error);
        throw error;
    }
});

/* ----------------- CHEADOR DE HUELLA CON CONSUMO DE API */
