<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Main Content -->
    <main class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Section -->
      <div class="max-w-7xl mx-auto mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
                ¡Bienvenido, {{ currentUser.name }}!
              </h1>
              <p class="text-gray-600 dark:text-gray-400 mt-3 text-lg">
                Panel de control para empleadores
              </p>
              <div class="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8a2 2 0 104 0m-4 0V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2"></path>
                  </svg>
                  Última actividad: Hace 2 horas
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ currentDate }}
                </span>
              </div>
            </div>
            <div class="hidden md:block">
              <div class="w-24 h-24 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Layout -->
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Main Content Column (Left) -->
          <div class="lg:col-span-2 space-y-8">
            
            <!-- Dashboard Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                @click="navigateTo('/empleador/empleos')"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all duration-200 hover:scale-105 text-left w-full border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="p-4 rounded-xl bg-blue-100 dark:bg-blue-900">
                      <svg class="w-8 h-8 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h3a2 2 0 012 2v6.083"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-3xl font-bold text-gray-900 dark:text-white">12</p>
                      <p class="text-gray-600 dark:text-gray-400 font-medium">Empleos Activos</p>
                      <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">+3 esta semana</p>
                    </div>
                  </div>
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>

              <button 
                @click="navigateTo('/empleador/postulaciones')"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all duration-200 hover:scale-105 text-left w-full border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="p-4 rounded-xl bg-green-100 dark:bg-green-900">
                      <svg class="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-3xl font-bold text-gray-900 dark:text-white">48</p>
                      <p class="text-gray-600 dark:text-gray-400 font-medium">Candidatos</p>
                      <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">15 nuevos hoy</p>
                    </div>
                  </div>
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>

              <button 
                @click="navigateTo('/empleador/recursos')"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all duration-200 hover:scale-105 text-left w-full border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="p-4 rounded-xl bg-purple-100 dark:bg-purple-900">
                      <svg class="w-8 h-8 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-3xl font-bold text-gray-900 dark:text-white">8</p>
                      <p class="text-gray-600 dark:text-gray-400 font-medium">Recursos Publicados</p>
                      <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">2 borradores</p>
                    </div>
                  </div>
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>

              <button 
                @click="navigateTo('/empleador/valoraciones')"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all duration-200 hover:scale-105 text-left w-full border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="p-4 rounded-xl bg-yellow-100 dark:bg-yellow-900">
                      <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="text-3xl font-bold text-gray-900 dark:text-white">4.2</p>
                      <p class="text-gray-600 dark:text-gray-400 font-medium">Valoración Media</p>
                      <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">156 valoraciones</p>
                    </div>
                  </div>
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Acciones Rápidas</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button 
                @click="navigateTo('/empleador/empleos')"
                class="flex flex-col items-center p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 group"
              >
                <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h3a2 2 0 012 2v6.083"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 text-center">Gestionar Empleos</span>
              </button>

              <button 
                @click="navigateTo('/empleador/postulaciones')"
                class="flex flex-col items-center p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 group"
              >
                <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                  <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 text-center">Ver Postulaciones</span>
              </button>

              <button 
                @click="navigateTo('/empleador/perfil')"
                class="flex flex-col items-center p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200 group"
              >
                <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                  <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 text-center">Perfil Empresa</span>
              </button>
            </div>
          </div>

          </div>
          
          <!-- Sidebar (Right) -->
          <div class="lg:col-span-1 space-y-6">
            
            <!-- Quick Stats -->
            <div class=" bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumen del Mes</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Nuevas postulaciones</span>
                  <span class="text-2xl font-bold text-green-600 dark:text-green-400">+23</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Entrevistas programadas</span>
                  <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">8</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Contrataciones</span>
                  <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
                </div>
              </div>
              <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="text-center">
                  <p class="text-xs text-gray-500 dark:text-gray-500">Tasa de conversión</p>
                  <p class="text-lg font-semibold text-gray-900 dark:text-white">8.7%</p>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="  bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Actividad Reciente</h3>
                <button 
                  @click="navigateTo('/empleador/postulaciones')"
                  class="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium"
                >
                  Ver todas
                </button>
              </div>
              
              <div class="space-y-3">
                <div v-for="activity in recentActivities.slice(0, 4)" :key="activity.id" class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <div class="shrink-0">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="activity.iconBg">
                      <svg class="w-4 h-4" :class="activity.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.icon"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900 dark:text-white">
                      <span class="font-medium">{{ activity.user }}</span>
                      {{ activity.action }}
                      <span class="font-medium">{{ activity.target }}</span>
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Próximas Tareas</h3>
              <div class="space-y-3">
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <div class="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Revisar postulaciones</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">3 candidatos pendientes</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Entrevista programada</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Mañana a las 10:00</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <div class="w-2 h-2 rounded-full bg-green-400"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Publicar nuevo empleo</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Backend Developer</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar_empleador from '@/components/NavBar_empleador.vue'

export default {
  name: 'EmpleadorDashboard',
  components: {
    NavBar_empleador
  },
  setup() {
    const router = useRouter()
    
    const currentUser = ref({
      name: 'Empresa ABC',
      email: 'contacto@empresaabc.com'
    })

    const currentDate = ref(new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }))

    const recentActivities = ref([
      {
        id: 1,
        user: 'Juan Pérez',
        action: 'se postuló para',
        target: 'Desarrollador Frontend',
        time: 'Hace 30 minutos',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        iconBg: 'bg-green-100 dark:bg-green-900',
        iconColor: 'text-green-600 dark:text-green-400'
      },
      {
        id: 2,
        user: 'María García',
        action: 'actualizó su perfil para',
        target: 'Diseñador UX/UI',
        time: 'Hace 2 horas',
        icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        iconBg: 'bg-blue-100 dark:bg-blue-900',
        iconColor: 'text-blue-600 dark:text-blue-400'
      },
      {
        id: 3,
        user: 'Carlos López',
        action: 'completó la entrevista para',
        target: 'Desarrollador Backend',
        time: 'Hace 4 horas',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        iconBg: 'bg-purple-100 dark:bg-purple-900',
        iconColor: 'text-purple-600 dark:text-purple-400'
      },
      {
        id: 4,
        user: 'Ana Rodríguez',
        action: 'dejó una valoración de',
        target: '4 estrellas',
        time: 'Hace 1 día',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        iconBg: 'bg-yellow-100 dark:bg-yellow-900',
        iconColor: 'text-yellow-600 dark:text-yellow-400'
      }
    ])

    const navigateTo = (path) => {
      router.push(path)
    }

    onMounted(() => {
      console.log('EmpleadorDashboard montado')
    })

    return {
      currentUser,
      currentDate,
      recentActivities,
      navigateTo
    }
  }
}
</script>

<style scoped>

</style>
