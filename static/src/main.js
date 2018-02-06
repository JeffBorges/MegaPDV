import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'

import App from './App.vue'
import VueAuth from './core/auth'
import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import NotFoundView from './views/NotFoundView'
import FuncionarioDetalhe from './views/FuncionarioDetalhe'

import Env from 'env'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VueAuth)

Vue.http.options.root = Env.root

var app = new Vue({
  el: '#app',
  router: new VueRouter({
    routes: [
      { name: 'home', path: '/home', component: HomeView },
      { name: 'funcionario', path: '/funcionario', component: FuncionarioDetalhe},
      { name: 'login', path: '/login', component: LoginView, alias: '/' },
      { name: 'notFound', path: '*', component: NotFoundView }
    ]
  }),
  render: h => h(App)
})
