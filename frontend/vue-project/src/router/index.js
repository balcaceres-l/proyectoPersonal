import { createRouter, createWebHistory } from 'vue-router'
import Empleados from '../views/Empleados.vue'
import EmpleadosEmpleos from '../views/EmpleadosEmpleos.vue'
import EmpleadosRecursos from '../views/EmpleadosRecursos.vue'
import EmpleadosValoraciones from '../views/EmpleadosValoraciones.vue'
import EmpleadosPerfil from '../views/EmpleadosPerfil.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/empleados'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/empleados',
      name: 'Empleados',
      component: Empleados
    },
    {
      path: '/empleados/empleos',
      name: 'EmpleadosEmpleos',
      component: EmpleadosEmpleos
    },
    {
      path: '/empleados/recursos',
      name: 'EmpleadosRecursos',
      component: EmpleadosRecursos
    },
    {
      path: '/empleados/valoraciones',
      name: 'EmpleadosValoraciones',
      component: EmpleadosValoraciones
    },
    {
      path: '/empleados/perfil',
      name: 'EmpleadosPerfil',
      component: EmpleadosPerfil
    }
  ],
})

export default router
