<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="cpf">CPF</label>
        <input
          type="text"
          class="form-control"
    
          required
          v-model="cliente.cpf"
          name="cpf"
        />
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input
          class="form-control"
    
          required
          v-model="cliente.nome"
          name="nome"
        />
      </div>
      <div class="form-group">
        <label for="endereco">Endereço</label>
        <input
          class="form-control"

          required
          v-model="cliente.endereco"
          name="endereco"
        />
      </div>
      <div class="form-group">
        <label for="telefone">Telefone</label>
        <input
          class="form-control"
    
          required
          v-model="cliente.telefone"
          name="telefone"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          class="form-control"
    
          required
          v-model="cliente.email"
          name="email"
        />
      </div>
      <button @click="saveCliente" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCliente">Cadastrar Novo Cliente</button>
    </div>
  </div>
</template>
<script>
import ClienteDataService from "../services/ClienteDataService";
export default {
  name: "add-cliente",
  data() {
    return {
        cliente: {
            cpf: "",
            nome: "",
            endereco: "",
            telefone: "",
            email: ""
        },
        submitted: false
    };
  },
  methods: {
    saveCliente() {
        var data = {
            cpf: this.cliente.cpf,
            nome: this.cliente.nome,
            endereco: this.cliente.endereco,
            telefone: this.cliente.telefone,
            email: this.cliente.email
        };
        ClienteDataService.create(data)
        .then(response => {
            console.log(response.data);
            this.submitted = true;
        })
        .catch(e => {
            console.log(e);
        });
    },
    
    newCliente() {
      this.submitted = false;
      this.cliente = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>