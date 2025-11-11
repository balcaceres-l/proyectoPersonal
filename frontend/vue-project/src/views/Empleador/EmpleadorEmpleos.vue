<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <NavBar_empleador :user-name="currentUser.name" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Empleos</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Administra y publica ofertas de trabajo</p>
        </div>
        <button 
          @click="showNewJobModal = true"
          class="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Publicar Empleo</span>
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Búsqueda</label>
            <div class="relative">
              <input 
                v-model="filters.search"
                type="text" 
                placeholder="Buscar empleos..."
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
              <option value="Activo">Activo</option>
              <option value="Pausado">Pausado</option>
              <option value="Cerrado">Cerrado</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo</label>
            <select 
              v-model="filters.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="Tiempo completo">Tiempo completo</option>
              <option value="Medio tiempo">Medio tiempo</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      <!-- Jobs List -->
      <div class="grid grid-cols-1 gap-6">
        <div v-for="job in filteredJobs" :key="job.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div class="flex-1">
              <div class="flex items-start space-x-4">
                <div class="shrink-0">
                  <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h3a2 2 0 012 2v6.083"></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ job.title }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 mt-1">{{ job.description }}</p>
                  <div class="flex flex-wrap items-center mt-3 space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {{ job.location }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      {{ job.salary }}
                    </span>
                    <span>{{ job.applicants }} candidatos</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-2 mt-4 sm:mt-0">
              <span 
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': job.status === 'Activo',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': job.status === 'Pausado',
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': job.status === 'Cerrado'
                }"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ job.status }}
              </span>
              <button class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import NavBar_empleador from '@/components/NavBar_empleador.vue'

export default {
  name: 'EmpleadorEmpleos',
  components: {
    NavBar_empleador
  },
  setup() {
    const showNewJobModal = ref(false)
    const currentUser = ref({
      name: 'Empresa ABC'
    })

    const filters = ref({
      search: '',
      status: '',
      type: ''
    })

    const jobs = ref([
      {
        id: 1,
        title: 'Desarrollador Frontend',
        description: 'Buscamos un desarrollador frontend con experiencia en Vue.js',
        location: 'Madrid, España',
        salary: '€45,000 - €55,000',
        status: 'Activo',
        applicants: 12
      },
      {
        id: 2,
        title: 'Diseñador UX/UI',
        description: 'Diseñador con experiencia en productos digitales',
        location: 'Barcelona, España',
        salary: '€40,000 - €50,000',
        status: 'Pausado',
        applicants: 8
      }
    ])

    const filteredJobs = computed(() => {
      return jobs.value.filter(job => {
        const matchesSearch = !filters.value.search || 
          job.title.toLowerCase().includes(filters.value.search.toLowerCase()) ||
          job.description.toLowerCase().includes(filters.value.search.toLowerCase())
        
        const matchesStatus = !filters.value.status || job.status === filters.value.status
        const matchesType = !filters.value.type || job.type === filters.value.type
        
        return matchesSearch && matchesStatus && matchesType
      })
    })

    const clearFilters = () => {
      filters.value = {
        search: '',
        status: '',
        type: ''
      }
    }

    return {
      showNewJobModal,
      currentUser,
      filters,
      jobs,
      filteredJobs,
      clearFilters
    }
  }
}
</script>