<template>
    <v-container>
        <v-card>
            <h1>
                HOLAAA
            </h1>
        </v-card>
        <v-card>
            <v-tabs v-model="tab" background-color="transparent"  grow>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in items" :key="item">
                    <v-card   flat v-if="item === 'Asistencia del día'">
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-card class="mt-5" color="transparent">
                                    <v-card-title>
                                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar"
                                            single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-card-text style="text-align: right;">
                                        <v-btn elevation="2" outlined color="blue" @click="actualizarJustificante">
                                            Aplicar justificante</v-btn>
                                    </v-card-text>
                                    <v-data-table :headers="headers" :items="asistencia" :search="search" :footer-props="{
                                        'items-per-page-options': [10, 20, 30, 40, 50],
                                    }" :items-per-page="10" :sort-by="['Hoingreso']" :sort-desc="true">

                                        <template v-slot:item.concatenado="{ item }">
                                            <v-btn :color="categorias(item)"
                                                style="margin-top: 10px; margin-bottom: 10px; border-radius: 20px">{{
                                                    item.EstadoAsis }}</v-btn>
                                        </template>

                                        <template v-slot:item.actions="{ item }">
                                            <v-checkbox v-model="item.checkjustifi"
                                                v-if="item.Justificacion === 'Retardo injustificado' || item.Justificacion === 'Falta injustificada'"
                                                @change="agregarselecjustificante(item)"></v-checkbox>
                                        </template>
                                    </v-data-table>
                                </v-card>
                            </v-col>
                            <!-- <v-col cols="12" md="3">
                                <v-card class="mt-5">
                                    <v-card-title>
                                        Sin registro
                                    </v-card-title>
                                    <v-card-title>
                                        <v-text-field v-model="search2" append-icon="mdi-magnify" label="Buscar"
                                            single-line hide-details></v-text-field>
                                    </v-card-title>
                                    <v-card-text style="text-align: right;">
                                        <v-btn elevation="2" outlined color="red" @click="actualizarFalta"> Aplicar
                                            falta</v-btn>
                                    </v-card-text>

                                    <v-data-table v-model="selectedfaltas" :headers="headers2" :items="faltas"
                                        :search="search2" item-key="idAlta" :footer-props="{
                                            'items-per-page-options': [10, 20, 30, 40, 50],
                                        }" :items-per-page="10" show-select>
                                    </v-data-table>
                                </v-card>
                            </v-col> -->
                        </v-row>
                    </v-card>
                    <v-card flat v-if="item === 'Historial de asistencias'">
                    </v-card>
                    <v-card color="transparent"  flat v-if="item === 'Agendar permisos'">
                        <v-row>
                            <v-col cols="12" md="12" sm="12" xs="12">
                                <v-card  color="transparent">
                                    <v-card-title>
                                        <v-row>
                                            <v-col cols="8" xs="8" sm="8" md="8" xl="8">
                                                <v-text-field v-model="searchcard" append-icon="mdi-magnify"
                                                    label="Buscar" single-line hide-details></v-text-field>
                                            </v-col>

                                            <v-col cols="4" xs="4" sm="4" md="4" xl="4" class="d-flex align-center">
                                                <v-btn color="blue" @click="formagendarpermiso = true" block>
                                                    <v-icon>mdi-plus-circle theme--dark </v-icon>
                                                    Agregar permisos
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-data-iterator :items="porcard" :items-per-page.sync="itemsPerPage"
                                            :page.sync="page" :search="searchcard" :sort-by="sortBy.toLowerCase()"
                                            :sort-desc="sortDesc" hide-default-footer>
                                            <template v-slot:default="props">
                                                <v-row color="white">
                                                    <v-col v-for="item in props.items" :key="item.Id" cols="12" sm="4"
                                                        md="4" lg="4">
                                                        <v-card style="border-radius: 15px">
                                                            <v-card outlined elevation="4" color="black">
                                                                <!-- Titulo con la ubicación, en grande y elegante -->
                                                                <v-card-title :class="['text-center', 'py-6']">
                                                                    <v-row no-gutters justify="center">
                                                                        <v-col cols="4" md="4" sm="4" xs="4">
                                                                            <v-icon meddium left>mdi-asterisk </v-icon>
                                                                            <span>{{ item.idpermisos_asistencia
                                                                                }}</span>
                                                                        </v-col>
                                                                        <v-col cols="8" md="8" sm="8" xs="8">
                                                                            <span>{{ item.tipo }}</span>
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-card-title>

                                                                <!-- Subtítulo de tiempo transcurrido -->
                                                                <v-card-subtitle class="text-center"
                                                                    style="font-size: 14px; color: white">
                                                                    {{ item.NombreCompleto }}
                                                                </v-card-subtitle>

                                                                <v-divider></v-divider>
                                                                <v-card-text>
                                                                    <v-row no-gutters justify="center" align="center">
                                                                        <v-col cols="6" md="6" sm="6" xs="6"
                                                                            style="border-right: antiquewhite solid;  padding: 5px; text-align: center;">
                                                                            <span>Fecha inicio:</span>
                                                                            <br>
                                                                            <span>{{ item.fechainicio }}</span>
                                                                        </v-col>

                                                                        <v-col cols="6" md="6" sm="6" xs="6"
                                                                            style="padding: 5px; text-align: center;">
                                                                            <span>Fecha final:</span>
                                                                            <br>
                                                                            <span>{{ item.fechafin }}</span>
                                                                        </v-col>
                                                                    </v-row>

                                                                </v-card-text>
                                                            </v-card>

                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </template>

                                            <template v-slot:footer>
                                                <v-row class="mt-2" align="center" justify="center">
                                                    <span class="grey--text">Items per page</span>
                                                    <v-menu offset-y>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn dark text color="primary" class="ml-2" v-bind="attrs"
                                                                v-on="on">
                                                                {{ itemsPerPage }}
                                                                <v-icon>mdi-chevron-down</v-icon>
                                                            </v-btn>
                                                        </template>
                                                        <v-list>
                                                            <v-list-item v-for="(number, index) in itemsPerPageArray"
                                                                :key="index" @click="updateItemsPerPage(number)">
                                                                <v-list-item-title>{{ number }}</v-list-item-title>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-menu>

                                                    <v-spacer></v-spacer>

                                                    <span class="mr-4 grey--text">
                                                        Page {{ page }} of {{ numberOfPages }}
                                                    </span>
                                                    <v-btn fab dark color="#283037 !important; darken-3" class="mr-1"
                                                        @click="formerPage">
                                                        <v-icon>mdi-chevron-left</v-icon>
                                                    </v-btn>
                                                    <v-btn fab dark color="#283037 !important; darken-3" class="ml-1"
                                                        @click="nextPage">
                                                        <v-icon>mdi-chevron-right</v-icon>
                                                    </v-btn>
                                                </v-row>
                                            </template>
                                        </v-data-iterator>
                                    </v-card-text>

                                </v-card>
                            </v-col>
                        </v-row>

                        <!-- FORMULARIO PARA PERMISOS -->
                        <div class="pa-4 text-center">
                            <v-dialog v-model="formagendarpermiso" persistent max-width="800px">
                                <v-card style="padding: 15px">
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="formagendarpermiso = false">
                                            <v-icon style="font-size: 30px">mdi-close theme--dark
                                                red--text</v-icon></v-btn>
                                    </v-card-actions>
                                    <v-divider></v-divider>
                                    <v-divider></v-divider>
                                    <v-form class="mt-5" @submit.prevent="agregarpermisos()">
                                        <v-row>
                                            <v-col cols="12" md="6" xs="6">
                                                <v-select v-model="datapermisos.idalta" :items="nombresolicitante"
                                                    label="NOMBRE DEL SOLICITANTE.." item-value="idAlta"
                                                    item-text="NombreCompleto" filled></v-select>
                                            </v-col>
                                            <v-col cols="12" md="6" xs="6">
                                                <v-select v-model="datapermisos.tipo" :items="tipopermiso"
                                                    label="TIPO DE SOLICITUD" filled></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="4">
                                                <v-menu v-model="menu" :close-on-content-click="false"
                                                    transition="scale-transition" offset-y min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="datapermisos.fechainicio"
                                                            label="Fecha inicio " outlined dense readonly v-bind="attrs"
                                                            v-on="on" class="input-claro-sobre-fondo-oscuro" />
                                                    </template>
                                                    <v-date-picker v-model="datapermisos.fechainicio"
                                                        @input="menu = false" color="primary"
                                                        @change="calcularfechafin()" />
                                                </v-menu>
                                            </v-col>
                                            <v-col cols="12" md="2">
                                                <v-text-field v-model="datapermisos.dias" type="number"
                                                    label="NÚMERO DE DÍAS" min="1"
                                                    @input="calcularfechafin()"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4">
                                                <v-text-field v-model="datapermisos.fechafin" type="text"
                                                    label="FECHA FIN" disabled></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="2">
                                                <v-text-field v-model="datapermisos.horas" type="number"
                                                    label="NÚMERO DE HORAS" min="1"></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" md="12">
                                                <v-textarea v-model="datapermisos.motivo" label="MOTIVO.." rows="2">
                                                </v-textarea>
                                            </v-col>
                                        </v-row>
                                        <v-btn block outlined class="btnEnviar" type="submit"
                                            color="success">Guardar</v-btn>
                                    </v-form>
                                </v-card>
                            </v-dialog>
                        </div>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
        <!-- Ventana emergente -->
        <v-dialog v-model="alerta" max-width="500">
            <v-card>
                <v-card-title class="text-h4">
                    {{ Titulo }}
                </v-card-title>
                <v-card-text class="text-h6 text-center">
                    {{ Mensaje }}
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="alerta = false"> Cerrar </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import io from "socket.io-client";
import ImageZoom from "~/components/ImageZoom.vue";

export default {
    components: {
        ImageZoom,
    },
    layout: "barra",
    data() {
        return {

            //MOSTRAR ALERTA
            alerta: false,
            Mensaje: "",
            Titulo: "",


            tab: null,
            items: [
                'Asistencia del día', 'Historial de asistencias', 'Agendar permisos'
            ],

            /* DATOS DE ASISTENCIA del dia */
            registrar: false,
            asisActualizar: false,
            faltaActualizar: false,
            explicacion: false,
            explicacion2: false,
            motivos: ["ASISTENCIA", "SALIR TEMPRANO"],
            motivos2: ["FALTA", "JUSTIFICAR"],

            search: "",
            asistencia: [],
            headers: [
                { text: "", value: "Id_asis" },
                { text: "NOMBRE COMPLETO", value: "NombreCompleto" },
                { text: "FECHA ASISTENCIA", value: "FechaAsis" },
                { text: "HORA INGRESO", value: "Hoingreso" },
                { text: "HORA SALIDA", value: "HoSalida" },
                { text: "DETALLE", value: "Justificacion" },
                { text: "ESTATUS", value: "concatenado" },
                {
                    text: "JUSTIFICAR",
                    value: "actions",
                    sortable: false,
                    align: "center",
                    class: "multi-line-header",
                },
            ],
            selectedjustificar: [],

            search2: "",
            faltas: [],
            headers2: [
                { text: "NOMBRE COMPLETO", value: "NombreCompleto" },
            ],
            selectedfaltas: [],


            formDataact: {
                idasistencia: "",
                estatus: "",
                motivo: "",
                hora: "",
            },
            formDataact2: {
                userid: "",
                estatus: "",
                motivo: "",
            },
            /* FIN DE DATOS DE ASISTENCIA del dia */

            /* datos de Agendar permisos */
            formagendarpermiso: false,
            tipopermiso: ["VACACIONES", "PERMISO", "INCAPACIDAD", "OTRO"],
            nombresolicitante: [],

            //DATOS DE FECHA
            menu: "",
            fecha: "",

            datapermisos: {
                idalta: "",
                tipo: "",
                motivo: "",
                fechainicio: "",
                fechafin: "",
                dias: 1,
                horas: 0
            },

            porcard: [],
            itemsPerPageArray: [3, 6, 9, 12, 20],
            searchcard: "",
            filter: {},
            sortDesc: true,
            page: 1,
            itemsPerPage: 6,
            sortBy: "idpermisos_asistencia",
            /* fin de datos de Agendar permisos */

        }
    },

    async mounted() {
        this.socket = io("http://localhost:3003");
        this.socket.on("escuchandoAsistencia", (datos) => {
            //console.log(datos);
            this.mostrar();
            this.mostrarFaltas();
        });
        this.mostrar();
        this.mostrarFaltas();
        this.mostrarListanom();
        this.mostrarPermisos();

    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.porcard.length / this.itemsPerPage);
        },

        fechaMinima() {
            // Obtener la fecha actual
            const fechaAct = new Date();
            const year = fechaAct.getFullYear();
            const month = String(fechaAct.getMonth() + 1).padStart(2, "0");
            const day = String(fechaAct.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },
    },

    methods: {

        /* DATOS DE ASISTENCIA del dia */
        async mostrar() {
            try {
                const res = await fetch("https://192.168.1.97:3001/asistencias");
                const datos = await res.json();
                if (res.status == 404) {
                    console.error("Error al obtener los datos:", error);
                } else {
                    //console.log(datos.respuesta.respuesta);
                    this.asistencia = datos.respuesta.map((datos) => {
                        return {
                            ...datos,
                            checkjustifi: false
                        }
                    });
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        },

        async mostrarFaltas() {
            try {
                const res = await fetch("https://192.168.1.97:3001/faltas");
                const datos = await res.json();
                if (res.status == 404) {
                    console.error("Error al obtener los datos:", error);
                } else {
                    //console.log("Faltas ",datos);
                    this.faltas = datos;
                    //console.log("Faltas ", this.faltas);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        },

        agregarselecjustificante(item) {
            if (item.checkjustifi != false) {
                this.selectedjustificar.push(item);
            }
            else {
                this.selectedjustificar = this.selectedjustificar.filter((datos) => datos.Id_asis != item.Id_asis);
            }
        },

        /* Api que actualiza los datos  de la tabla */
        async actualizarJustificante() {
            const res = await fetch("https://192.168.1.97:3001/actualizarJustificante", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.selectedjustificar),
            });
            const datos = await res.json();
            if (res.status === 400) {
                this.alerta = true;
                this.Titulo = "¡Upss!";
                this.Mensaje = datos.mensaje;
            } else {
                this.alerta = true;
                //this.Titulo = "El ID del activo es: ";
                this.Titulo = "Datos actualizados";
                this.Mensaje = " ";
                this.selectedjustificar = [];
                this.mostrar();
            }
        },

        /* Api que actualiza los datos  de la tabla */
        async actualizarFalta() {
            //console.log("selectedfaltas", this.selectedfaltas);
            const res = await fetch("https://192.168.1.97:3001/registrarFalta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.selectedfaltas),
            });
            const datos = await res.json();
            if (res.status === 400) {
                this.alerta = true;
                this.Titulo = "¡Upss!";
                this.Mensaje = datos.mensaje;
            } else {
                this.alerta = true;
                //this.Titulo = "El ID del activo es: ";
                this.Titulo = "Datos actualizados";
                this.Mensaje = " ";
                this.faltaActualizar = false;
                this.selectedfaltas = [];
                this.mostrar();
                this.mostrarFaltas();
            }
        },
        /* ------------------------------------------ */
        categorias(item) {
            console.log(item.EstadoAsis);
            if (item.EstadoAsis === "Falta") {
                return "rgb(170, 35, 11)";
            }
            if (item.EstadoAsis === "RETARDO") {
                return "rgb(83, 36, 83)";
            }
            if (item.EstadoAsis === "Entrada") {
                return "rgb(67, 212, 224)";
            }
            if (item.EstadoAsis === "Asistio") {
                return "rgb(14, 124, 14)";
            }
            if (item.EstadoAsis === "Anticipado") {
                return "rgb(20, 22, 117)";
            }
        },

        /* FIN DE DATOS DE ASISTENCIA del dia */

        /* datos de Agendar permisos */
        calcularfechafin() {
            const fecha1 = new Date(this.datapermisos.fechainicio);
            const dias1 = Number(this.datapermisos.dias);

            const fechaFin = new Date(fecha1);
            fechaFin.setDate(fecha1.getDate() + dias1 - 1);
            console.log("Fecha fin:", fechaFin.toISOString().slice(0, 10));
            this.datapermisos.fechafin = fechaFin.toISOString().slice(0, 10);

        },
        async mostrarListanom() {
            try {
                const res = await fetch("https://192.168.1.97:3001/listapersona");
                const datos = await res.json();
                if (res.status == 404) {
                    console.error("Error al obtener los datos:", error);
                } else {
                    //console.log("Faltas ",datos);
                    this.nombresolicitante = datos;
                    //console.log("Faltas ", this.faltas);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        },
        async mostrarPermisos() {
            try {
                const res = await fetch("https://192.168.1.97:3001/permisosAsistencia");
                const datos = await res.json();
                if (res.status == 404) {
                    console.error("Error al obtener los datos:", error);
                } else {
                    console.log("mostrarPermisos ", datos);
                    this.porcard = datos;
                    //console.log("Faltas ", this.faltas);
                }
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        },
        async agregarpermisos() {
            const res = await fetch("https://192.168.1.97:3001/registrarpermisos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.datapermisos),
            });
            const datos = await res.json();
            if (res.status === 400) {
                this.alerta = true;
                this.Titulo = "¡Upss!";
                this.Mensaje = datos.mensaje;
                this.limpiaarformpermisos();
            } else {
                this.alerta = true;
                //this.Titulo = "El ID del activo es: ";
                this.Titulo = "Se registro solicitud";
                this.Mensaje = " ";
                this.limpiaarformpermisos();
                this.mostrarPermisos();
                this.formagendarpermiso = false;
            }
        },
        limpiaarformpermisos() {
            this.datapermisos.idalta = "";
            this.datapermisos.tipo = "";
            this.datapermisos.motivo = "";
            this.datapermisos.fechainicio = "";
            this.datapermisos.fechafin = "";
            this.datapermisos.dias = 1;
            this.datapermisos.horas = 0;
        },

        //Metodos de los card
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1;
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1;
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number;
        },
        /* Fin de datos de Agendar permisos */
    },
}
</script>

<style>
</style>