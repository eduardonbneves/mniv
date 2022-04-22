<template>
  <div v-if="currentCliente" class="edit-form">
    <h4>Cliente</h4>
    <form>
      <div class="form-group">
        <label for="cliente">Cliente</label>
        <input type="text" class="form-control" id="cliente"
          v-model="currentCliente.nome"
        />
      </div>
      <!-- <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div> -->
    </form>
    <!-- <button class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2"
      @click="deleteTutorial"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateTutorial"
    >
      Update
    </button> -->
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Cliente...</p>
  </div>
</template>
<script>
import ClienteDataService from "../services/ClienteDataService";
export default {
  name: "cliente-details",
  data() {
    return {
      currentCliente: null,
      message: ''
    };
  },
  methods: {
    getCliente(cpf) {
      ClienteDataService.get(cpf)
        .then(response => {
          this.currentCliente = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.getCliente(this.$route.params.cpf);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>