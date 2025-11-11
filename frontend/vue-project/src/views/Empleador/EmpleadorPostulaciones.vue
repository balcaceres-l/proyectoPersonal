<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <NavBar_empleador :user-name="currentUser.name" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Postulaciones</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Revisa y gestiona las postulaciones recibidas</p>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Búsqueda</label>
            <div class="relative">
              <input 
                v-model="filters.search"
                type="text" 
                placeholder="Buscar candidatos..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estado</label>
            <select 
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Revisado">Revisado</option>
              <option value="Entrevista">Entrevista</option>
              <option value="Rechazado">Rechazado</option>
              <option value="Contratado">Contratado</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Puesto</label>
            <select 
              v-model="filters.job"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos los puestos</option>
              <option value="Desarrollador Frontend">Desarrollador Frontend</option>
              <option value="Diseñador UX/UI">Diseñador UX/UI</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Applications List -->
      <div class="grid grid-cols-1 gap-6">
        <div v-for="application in filteredApplications" :key="application.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div class="flex-1">
              <div class="flex items-start space-x-4">
                <div class="shrink-0">
                  <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span class="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {{ application.name.charAt(0) }}
                    </span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ application.name }}</h3>
                  <p class="text-indigo-600 dark:text-indigo-400 font-medium">{{ application.jobTitle }}</p>
                  <div class="flex flex-wrap items-center mt-3 space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      {{ application.experience }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      {{ application.email }}
                    </span>
                    <span>{{ application.appliedDate }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 mt-4 sm:mt-0">
              <span 
                :class="{
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': application.status === 'Nuevo',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': application.status === 'Revisado',
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200': application.status === 'Entrevista',
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': application.status === 'Rechazado',
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': application.status === 'Contratado'
                }"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ application.status }}
              </span>
              <button 
                @click="viewApplication(application)"
                class="px-4 py-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import NavBar_empleador from '@/components/NavBar_empleador.vue'

export default {
  name: 'EmpleadorPostulaciones',
  components: {
    NavBar_empleador
  },
  setup() {
    const currentUser = ref({
      name: 'Empresa ABC'
    })

    const filters = ref({
      search: '',
      status: '',
      job: ''
    })

    const applications = ref([
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        jobTitle: 'Desarrollador Frontend',
        experience: '3 años de experiencia',
        status: 'Nuevo',
        appliedDate: 'Hace 2 días'
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria.garcia@email.com',
        jobTitle: 'Diseñador UX/UI',
        experience: '5 años de experiencia',
        status: 'Revisado',
        appliedDate: 'Hace 1 semana'
      },
      {
        id: 3,
        name: 'Carlos López',
        email: 'carlos.lopez@email.com',
        jobTitle: 'Desarrollador Frontend',
        experience: '2 años de experiencia',
        status: 'Entrevista',
        appliedDate: 'Hace 3 días'
      }
    ])

    const filteredApplications = computed(() => {
      return applications.value.filter(app => {
        const matchesSearch = !filters.value.search || 
          app.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
          app.email.toLowerCase().includes(filters.value.search.toLowerCase())
        
        const matchesStatus = !filters.value.status || app.status === filters.value.status
        const matchesJob = !filters.value.job || app.jobTitle === filters.value.job
        
        return matchesSearch && matchesStatus && matchesJob
      })
    })

    const viewApplication = (application) => {
      console.log('Ver aplicación:', application)
    }

    return {
      currentUser,
      filters,
      applications,
      filteredApplications,
      viewApplication
    }
  }
}
</script>