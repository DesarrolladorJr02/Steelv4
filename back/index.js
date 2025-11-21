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
        console.log(req.body);
        const id = req.body.id;
        const horainicio = req.body.horainicio;
        const horafin = req.body.horafin;
        const descanso = req.body.descanso;
        const horainicioMD = req.body.horainicioMD;
        const horafinMD = req.body.horafinMD;
        if (id && horainicio && horafin && descanso) {
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