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
const listarasistenciareciencreada = require('./checadorhuella/listarasistenciareciencreada');

//Registrar datos
const registrarEntrada = require('./checadorhuella/registrarEntrada');
const registrarRetardo = require('./checadorhuella/registrarRetardo');
const registrarSalida = require('./checadorhuella/registrarSalida');

//Liogin del checador
const loginchecador = require('./checadorhuella/loginchecador');
const usuarioLogin = require('./checadorhuella/usuarioLogin');
/* FIN DE CHECADOR DE HUELLA CON CONSUMOS DE API C#  */



/* CHEADOR DE HUELLA CON CONSUMO DE API */
//Todo para mostrar personal y agregar huella del personal
app.get("/listarTodoPersonal", async (req, res) => {
    try {
        const respuesta = await listarTodoPersonal();
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (listarTodoPersonal).'
        });
    }
})
//buscarPersonalValor
app.get("/buscarPersonalValor", async (req, res) => {
    try {
        const dato = req.query.valor;
        const respuesta = await buscarPersonalValor(dato);
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (verificarfalta).'
        });
    }
})
//registrarhuella
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


//Agregar entrada de asitencia
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
                    HoEntrada: moment(datos.HoEntradaSD).format("HH:mm"),
                    HoSalida: moment(datos.HoSalidaSD).format("HH:mm")
                }
            })
        } else {
            respuesta = otrorespuesta.map((datos) => {
                return {
                    idAlta: datos.idAlta,
                    HoEntrada: moment(datos.HoEntrada).format("HH:mm"),
                    HoSalida: moment(datos.HoSalida).format("HH:mm")
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

//Verificar asistencia
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

//Registrar
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
            const hoEntradaSD = moment(horario[0].HoEntradaSD).format("HH:mm");
            if (horaactualcomparar <= hoEntradaSD) {
                respuesta = await registrarEntrada(idalta, nombredia, horaactual);
            } else {
                respuesta = await registrarRetardo(idalta, nombredia, horaactual);
            }

        } else {
            const hoEntrada = moment(horario[0].HoEntrada).format("HH:mm");
            if (horaactualcomparar <= hoEntrada) {
                //console.log("Si ", horaactual , hoEntrada);
                respuesta = await registrarEntrada(idalta, nombredia, horaactual);
            } else {
                //console.log("No ", horaactual , hoEntrada);
                respuesta = await registrarRetardo(idalta, nombredia, horaactual);
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
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarRetardo).'
        });
    }

})

app.put("/registrarSalida", async (req, res) => {
    try {
        const idasis = req.body.xidasis;
        const hosalida = req.body.xhosalida;
        const horaactual = moment().format("HH:mm:ss");

        console.log(idasis, hosalida);

        const respuesta = await registrarSalida(idasis, horaactual);
        res.status(200).json(respuesta);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (registrarSalida).'
        });
    }

})

/* const loginchecador = require('./checadorhuella/loginchecador');
const usuarioLogin = require('./checadorhuella/usuarioLogin'); */
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
    }catch(error){
        console.log(error);
        res.status(404).json({
            mensaje: 'Hubo un error al procesar la solicitud (usuarioLogin).'
        });
    }
    
})


/* ----------------- CHEADOR DE HUELLA CON CONSUMO DE API */

