import Vue from 'vue'
import Router from 'vue-router'
import ClienteOne from '../views/ClienteOne.vue'
import ClienteList from '../views/ClienteList.vue'
import AddCliente from '../views/AddCliente.vue'

Vue.use(Router)

const routes = [
  {
    path: '/clientes',
    name: 'clientes',
    component: ClienteList
  },
  {
    path: '/clientes/:cpf',
    name: 'cliente-details',
    component: ClienteOne
  },
  {
    path: '/add',
    name: 'add',
    component: AddCliente
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
