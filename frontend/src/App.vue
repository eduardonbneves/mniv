<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        BemZen
      </div>
      <v-btn to="/clientes" text>
        Clientes
      </v-btn>
      <v-btn to="/add" text>
        Cadastrar Cliente
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "app",
};
</script>