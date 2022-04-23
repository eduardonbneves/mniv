<template>
  <v-app>
    <v-app-bar app dark color="blue">
      <div class="d-flex align-center mr-2">
        BemZen
      </div>
      <v-btn to="/agendamentos" text>
        Agendamentos
      </v-btn>
      <v-btn to="/clientes" text>
        Clientes
      </v-btn>
      <v-btn to="/addAgendamento" text>
        Novo Agendamento
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