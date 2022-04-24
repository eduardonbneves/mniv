import Vue from 'vue'
import Router from 'vue-router'

import ClienteList from '../views/ClienteList.vue'
import AtendenteLogin from '../views/AtendenteLogin'
// import ClienteOne from '../views/ClienteOne.vue'
// import AddCliente from '../views/AddCliente.vue'

Vue.use(Router)

const routes = [
  {
    path: '/clientes',
    name: 'clientes',
    component: ClienteList
  },
  {
    path: '/login',
    name: 'login',
    component: AtendenteLogin
  },

  // {
  //   path: '/clientes/:cpf',
  //   name: 'cliente-details',
  //   component: ClienteOne
  // },
  // {
  //   path: '/addCliente',
  //   name: 'addCliente',
  //   component: AddCliente
  // },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
