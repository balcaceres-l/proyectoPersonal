import { createRouter, createWebHistory } from 'vue-router'
// Importaciones para empleados
import Empleados from '../views/Empleados/Empleados.vue'
import EmpleadosEmpleos from '../views/Empleados/EmpleadosEmpleos.vue'
import EmpleadosRecursos from '../views/Empleados/EmpleadosRecursos.vue'
import EmpleadosValoraciones from '../views/Empleados/EmpleadosValoraciones.vue'
import EmpleadosPerfil from '../views/Empleados/EmpleadosPerfil.vue'
// Importaciones generales
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// Importaciones para empleador
import EmpleadorDashboard from '../views/Empleador/EmpleadorDashboard.vue'
import EmpleadorEmpleos from '../views/Empleador/EmpleadorEmpleos.vue'
import EmpleadorPerfil from '../views/Empleador/EmpleadorPerfil.vue'
import EmpleadorRecursos from '../views/Empleador/EmpleadorRecursos.vue'
import EmpleadorValoraciones from '../views/Empleador/EmpleadorValoraciones.vue'
import EmpleadorPostulaciones from '../views/Empleador/EmpleadorPostulaciones.vue'
import PublicarOfertas from '@/views/Empleador/publicarOfertas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const rol = localStorage.getItem('rol');
        if (rol === 'empleador') {
          return '/empleador/dashboard';
        } else if (rol === 'empleado') {
          return '/empleados';
        } else {
          return '/login';
        }
      }
    },
    //usuario empleado
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
    },
    //usuario empleador
    {
      path: '/empleador/dashboard',
      name: 'EmpleadorDashboard',
      component: EmpleadorDashboard
    },
    {
      path: '/empleador/empleos',
      name: 'EmpleadorEmpleos',
      component: EmpleadorEmpleos
    },
    {
      path: '/empleador/perfil',
      name: 'EmpleadorPerfil',
      component: EmpleadorPerfil
    },
    {
      path: '/empleador/recursos',
      name: 'EmpleadorRecursos',
      component: EmpleadorRecursos
    },
    {
      path: '/empleador/valoraciones',
      name: 'EmpleadorValoraciones',
      component: EmpleadorValoraciones
    },
    {
      path: '/empleador/postulaciones',
      name: 'EmpleadorPostulaciones',
      component: EmpleadorPostulaciones
    },
    {
      path: '/empleador/empleos/publicar-ofertas',
      name: 'EmpleadorPublicarOfertas',
      component: PublicarOfertas
    }
  ],
})

// Guard para debuggear navegación
router.beforeEach((to, from, next) => {
  console.log('🧭 Navegando de', from.path, 'a', to.path);
  console.log('🎯 Rol actual:', localStorage.getItem('rol'));
  next();
});

router.afterEach((to, from) => {
  console.log('✅ Navegación completada a:', to.path);
});

export default router
