<template>
  <v-container>
    <v-card class="mt-5">
      <v-card-title>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="userasistencias" :search="search" :footer-props="{
        'items-per-page-options': [10, 20, 30, 40, 50],
      }" :items-per-page="10" :sort-desc="true">
        <template v-slot:item.concatenado="{ item }">
          <v-btn @click="registrar = true, formData.id = item.idAlta"
            color="transparent"><v-icon>mdi-plus-thick theme--dark
              green--text</v-icon></v-btn>
        </template>
      </v-data-table>

      <!-- Formulario insertar -->
      <template>
        <div class="pa-4 text-center">
          <v-dialog v-model="registrar" persistent max-width="1000px">
            <v-card style="padding: 15px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="(registrar = false), limpiarFormulario()">
                  <v-icon style="font-size: 30px">mdi-close theme--dark red--text</v-icon></v-btn>
              </v-card-actions>
              <v-divider></v-divider>
              <v-form class="mt-5" @submit.prevent="submitForm">
                <v-row>
                  <v-col cols="12" md="6" sm="12">
                    <v-select v-model="formData.descanso" :items="items" label="Días de descanso"
                      prepend-icon="mdi-weather-sunset" chips multiple @change="descansos"></v-select>
                  </v-col>
                  <v-col v-show="relojMD" cols="12" md="3" sm="6">
                    <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                      :return-value.sync="formData.horainicioMD" transition="scale-transition" offset-y
                      max-width="290px" min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="formData.horainicioMD" label="Hora de entrada fin de semana"
                          prepend-icon="mdi-clock-start" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-time-picker v-if="menu2" v-model="formData.horainicioMD" full-width color="green"
                        @click:minute="$refs.menu.save(formData.horainicioMD)"></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col v-show="relojMD" cols="12" md="3" sm="6">
                    <v-menu ref="menu3" v-model="menu4" :close-on-content-click="false" :nudge-right="40"
                      :return-value.sync="formData.horafinMD" transition="scale-transition" offset-y max-width="290px"
                      min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="formData.horafinMD" label="Hora de salida fin de semana"
                          prepend-icon="mdi-clock-end" readonly v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-time-picker v-if="menu4" v-model="formData.horafinMD" full-width color="pink"
                        @click:minute="$refs.menu3.save(formData.horafinMD)"></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row justify="space-around" align="center">
                  <v-col cols="12" md="6">
                    <h4>Hora de entrada (LUNES a VIERNES):</h4>
                    <v-time-picker v-model="formData.horainicio" class="tamaño" color="green"
                      :landscape="$vuetify.breakpoint.smAndUp" ampm-in-title></v-time-picker>
                  </v-col>
                  <v-col cols="12" md="6">
                    <h4>Hora de salida (LUNES a VIERNES):</h4>
                    <v-time-picker v-model="formData.horafin" class="tamaño" color="pink"
                      :landscape="$vuetify.breakpoint.smAndUp" ampm-in-title></v-time-picker>
                  </v-col>
                </v-row>
                <v-btn class="btnEnviar" type="submit" block outlined color="success">Registrar usuario</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
        </div>
      </template>
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
      modelPath: "/models",

      alerta: false,
      Mensaje: "",
      Titulo: "",

      search: "",
      registrar: false,
      userasistencias: [],
      items: ["Sábado", "Domingo"],
      relojMD: false,
      time: "",
      menu2: false,
      time2: "",
      menu4: false,
      btnregistrar: true,

      headers: [
        { text: "Nombre Completo ", value: "NombreCompleto" },
        { text: "Hora entrada", value: "HoEntrada" },
        { text: "Hora salida", value: "HoSalida" },
        { text: "Hr entrada S/D", value: "HoEntradaSD" },
        { text: "Hr salida S/D", value: "HoSalidaSD" },
        { text: "Registro de huella", value: "huella" },
        { text: "", value: "concatenado" },
      ],
      formData: {
        id: "",
        horainicio: "",
        horafin: "",
        descanso: "",
        horainicioMD: "",
        horafinMD: "",
      },
    };
  },

  async mounted() {
    this.mostrar();

    this.socket = io("http://192.168.1.97:3003");
    this.socket.on("escuchando", (datos) => {
      //console.log(datos);
      this.mostrar();
    });
  },
  methods: {
    async descansos() {
      if (
        this.formData.descanso.includes("Sábado") &&
        this.formData.descanso.includes("Domingo")
      ) {
        //console.log(this.formData.descanso);
        this.relojMD = false;
      } else {
        //console.log(this.formData.descanso);
        this.relojMD = true;
      }
    },

    async mostrar() {
      try {
        const res = await fetch(" https://192.168.1.97:3001/addhorarioasitencia");
        const datos = await res.json();
        if (res.status == 404) {
          console.error("Error al obtener los datos:", error);
        } else {
          //console.log(datos);
          this.userasistencias = datos;
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },

    async submitForm() {
      console.log("this.formData ", this.formData);
      const res = await fetch("https://192.168.1.97:3001/registrarhorario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
      });
      const datos = await res.json();
      if (res.status === 400) {
        this.alerta = true;
        this.Titulo = "¡Upss!";
        this.Mensaje = datos.mensaje;
        this.limpiarFormulario();
      } else {
        this.limpiarFormulario();
        this.mostrar();
        this.registrar = false;
      }
    },

    limpiarFormulario() {
      this.formData.id = "";
      this.formData.horainicio = "";
      this.formData.horafin = "";
      this.formData.descanso = "";
      this.formData.horainicioMD = "";
      this.formData.horafinMD = "";
    },
  },
};
</script>

<style>
.layout.wrap {
  justify-content: center;
}

.v-card__title {
  justify-content: center !important;
  font-size: 30px !important;
}

.row {
  padding: 0px 10px 0px 10px;
}

.btnEnviar {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 30%;
  font-size: 20px !important;
}

.tamaño {
  transform: scale(0.8);
  /* Ajusta entre 0.5 y 1 */
}

/* .tamaño .v-time-picker__clock {
  font-size: 10px !important;
  width: 28px !important;
  height: 28px !important;
} */

.multi-line-header2 {
  white-space: pre-line;
  background-color: #eaecf0;
  /* Cambia este valor al color que desees */
  color: #eb0e0e !important;
}

.multi-line-header {
  white-space: pre-line;
}
</style>
