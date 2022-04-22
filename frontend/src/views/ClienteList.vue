<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="nome" label="Pesquisa pelo Nome"></v-text-field>
    </v-col>
    <!-- <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col> -->
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Clientes</v-card-title>
        <v-data-table
          :headers="headers"
          :items="clientes"
          disable-pagination
          :hide-default-footer="true"
        >
          <!-- <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template> -->
        </v-data-table>
        <!-- <v-card-actions v-if="clientes.length > 0">
          <v-btn small color="error" @click="removeAllTutorials">
            Remove All
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import ClienteDataService from "../services/ClienteDataService";
export default {
  name: "clientes-list",
  data() {
    return {
      clientes: [],
      nome: "",
      headers: [
        { text: "Nome", align: "start", sortable: false, value: "nome" },
        { text: "CPF", value: "cpf", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveClientes() {
        ClienteDataService.getAll()
        .then((response) => {
            this.clientes = response.data.map(this.getDisplayCliente);
            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    },
    refreshList() {
      this.retrieveClientes();
    },
    // removeAllClientes() {
    //   ClienteDataService.deleteAll()
    //     .then((response) => {
    //         console.log(response.data);
    //         this.refreshList();
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     });
    // },
    // searchTitle() {
    //   TutorialDataService.findByTitle(this.title)
    //     .then((response) => {
    //       this.tutorials = response.data.map(this.getDisplayTutorial);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    // editTutorial(id) {
    //   this.$router.push({ name: "tutorial-details", params: { id: id } });
    // },
    // deleteTutorial(id) {
    //   TutorialDataService.delete(id)
    //     .then(() => {
    //       this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    getDisplayCliente(cliente) {
      return {
        cpf: cliente.cpf,
        nome: cliente.nome.length > 30 ? cliente.nome.substr(0, 30) + "..." : cliente.nome,
      };
    },
  },
  mounted() {
    this.retrieveClientes();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>