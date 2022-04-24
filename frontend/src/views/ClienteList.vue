<template>
  <v-row align="center" class="list px-3 mx-auto">
    <!-- <v-col cols="12" md="8">
      <v-text-field v-model="nome" label="Pesquisa pelo nome"></v-text-field>
    </v-col> -->
    <v-col cols="12" md="5">
      <!-- <v-btn small @click="searchNome">
        Buscar
      </v-btn> -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquise pelo nome ou CPF"
        single-line
        hide-details
      ></v-text-field>
      <br/>
    </v-col>
         
    <!-- <v-col cols="12" sm="12"> -->
      <v-card class="mx-auto" tile>    
        <!-- <v-btn to="/addCliente" color="success" class="float-right" style="margin-top:20px; margin-right:20px;">
          Novo Cliente
        </v-btn>
        <v-card-title>Clientes</v-card-title> -->
      
        <v-data-table
          :headers="headers"
          :items="clientes"
          :hide-default-footer="false"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="cpf"
          show-expand
          :search="search"
          :items-per-page="10"
        >

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Clientes </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn to="/addCliente" color="success">
              Novo Cliente
            </v-btn> -->

            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Novo Cliente
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>


            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nome"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="cpfRules"
                      required
                      v-model="editedItem.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.endereco"
                      label="Endereço"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.telefone"
                      label="Telefone"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :rules="emailRules"
                      required
                      v-model="editedItem.email"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

             <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Salvar
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Você tem certeza que deseja deletar este cliente?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="closeDelete">Não</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Sim</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
            <!-- <v-switch
              v-model="singleExpand"
              label="Single expand"
              class="mt-2"
            ></v-switch> -->
          </v-toolbar>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <br/>
            Endereço: {{ item.endereco }}<br/><br/>
            Telefone: {{ item.telefone }}<br/><br/>
            E-mail: {{ item.email }}
            <br/><br/>
          </td>
        </template>
          <!-- <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template> -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <!-- <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template> -->
        </v-data-table>
        <!-- <v-card-actions v-if="clientes.length > 0">
          <v-btn small color="error" @click="removeAllTutorials">
            Remove All
          </v-btn>
        </v-card-actions> -->
      </v-card>
    <!-- </v-col> -->
  </v-row>
</template>
<script>
import ClienteDataService from "../services/ClienteDataService";
export default {
  name: "clientes-list",
  data() {
    return {
      search: '',
      clientes: [],
      // nome: "",
      headers: [
        { text: "Nome", align: "start", sortable: true, value: "nome" },
        { text: "CPF", value: "cpf", sortable: false },
        { text: "Ações", value: "actions", sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        nome: '',
        cpf: '',
        endereco: '',
        telefone: '',
        email: '' 
      },
      defaultItem: {
        nome: '',
        cpf: '',
        endereco: '',
        telefone: '',
        email: ''        
      },
      emailRules: [
        v => !!v || 'Informe um e-mail',
        v => /.+@.+/.test(v) || 'o e-mail deve ser válido',
      ],
      cpfRules: [
        v => !!v || 'Digite apenas algarismos',
        v => v.length <= 11 || 'Um CPF deve possuir apenas 11 algarismos',
        v => v.length >= 11 || 'Um CPF deve possuir 11 algarismos',
      ],
    };
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Novo Cliente' : 'Editar Cliente'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {

    editItem (item) {
      this.editedIndex = this.clientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true   
    },

    deleteItem (item) {
      this.editedIndex = this.clientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.clientes.splice(this.editedIndex, 1)
      this.closeDelete()

      ClienteDataService.delete(this.editedItem.cpf)
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: "clientes" });
      })
      .catch(e => {
        console.log(e);
      });
    },

    save() {
      
      if (this.editedIndex > -1) {
        Object.assign(this.clientes[this.editedIndex], this.editedItem)
      } else {
        this.clientes.push(this.editedItem)
      }
      this.close()

      if(this.editedIndex == -1) {

        var data = {
          cpf: this.editedItem.cpf,
          nome: this.editedItem.nome,
          endereco: this.editedItem.endereco,
          telefone: this.editedItem.telefone,
          email: this.editedItem.email
        };
        ClienteDataService.create(data)
        .then(response => {
            console.log(response.data);
            this.submitted = true;
        })
        .catch(e => {
            console.log(e);
        });

      } else {

        ClienteDataService.update(this.editedItem.cpf, this.editedItem)
        .then(response => {
          console.log(response.data);
          this.message = 'The Cliente was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });        

      }

    },

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
    close() {
      this.dialog = false
      this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      })
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

    // searchNome() {
    //   ClienteDataService.findByNome(this.nome)
    //     .then((response) => {
    //       this.clientes = response.data.map(this.getDisplayCliente);
    //       console.log(response.data);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    getDisplayCliente(cliente) {
      return {
        cpf: cliente.cpf,
        nome: cliente.nome.length > 30 ? cliente.nome.substr(0, 30) + "..." : cliente.nome,
        endereco: cliente.endereco.length > 30 ? cliente.endereco.substr(0, 30) + "..." : cliente.endereco,
        telefone: cliente.telefone,
        email: cliente.email
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
  max-width: 1000px;
}
</style>