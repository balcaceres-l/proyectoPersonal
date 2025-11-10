<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <NavBar :user-name="currentUser.name" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Empleos</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Gestiona tus aplicaciones y busca nuevas oportunidades</p>
        </div>
        <button 
          @click="showNewJobModal = true"
          class="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <PlusIcon class="w-5 h-5" />
          <span>Aplicar a Empleo</span>
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
              <SearchIcon class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estado</label>
            <select 
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="Aplicado">Aplicado</option>
              <option value="En revisión">En revisión</option>
              <option value="Entrevista">Entrevista</option>
              <option value="Rechazado">Rechazado</option>
              <option value="Aceptado">Aceptado</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ubicación</label>
            <select 
              v-model="filters.location"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todas</option>
              <option value="Madrid">Madrid</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Valencia">Valencia</option>
              <option value="Remoto">Remoto</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </div>

      <!-- Jobs List -->
      <div class="space-y-4">
        <div 
          v-for="job in filteredJobs" 
          :key="job.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ job.title }}</h3>
                  <div class="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 space-x-4 mb-3">
                    <span class="flex items-center">
                      <BuildingOfficeIcon class="w-4 h-4 mr-1" />
                      {{ job.company }}
                    </span>
                    <span class="flex items-center">
                      <MapPinIcon class="w-4 h-4 mr-1" />
                      {{ job.location }}
                    </span>
                    <span class="flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1" />
                      Aplicado el {{ formatDate(job.appliedDate) }}
                    </span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 mb-4">{{ job.description }}</p>
                </div>
                <span :class="getStatusClass(job.status)" class="px-3 py-1 text-sm font-medium rounded-full">
                  {{ job.status }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-6">
              <button 
                @click="viewJobDetails(job)"
                class="px-4 py-2 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                Ver Detalles
              </button>
              <button 
                @click="editJob(job)"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Editar
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredJobs.length === 0" class="text-center py-12">
          <BriefcaseIcon class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No se encontraron empleos</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ filters.search || filters.status || filters.location 
               ? 'Ajusta los filtros para ver más resultados' 
               : 'Comienza aplicando a tu primer empleo' }}
          </p>
          <button 
            @click="showNewJobModal = true"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Aplicar a Empleo
          </button>
        </div>
      </div>
    </main>

    <!-- New Job Modal -->
    <div 
      v-if="showNewJobModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="showNewJobModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Aplicar a Nuevo Empleo</h2>
        <form @submit.prevent="submitNewJob" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Título del Puesto</label>
            <input 
              v-model="newJob.title"
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Empresa</label>
            <input 
              v-model="newJob.company"
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ubicación</label>
            <input 
              v-model="newJob.location"
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción</label>
            <textarea 
              v-model="newJob.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              type="button"
              @click="showNewJobModal = false"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Aplicar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

// Router
const router = useRouter()

// Icons
const PlusIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`
}

const SearchIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`
}

const BriefcaseIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h3a2 2 0 012 2v6.083"></path></svg>`
}

const BuildingOfficeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
}

const MapPinIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
}

const CalendarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
}

// Data
const currentUser = ref({
  name: 'Juan Pérez'
})

const showNewJobModal = ref(false)

const filters = ref({
  search: '',
  status: '',
  location: ''
})

const newJob = ref({
  title: '',
  company: '',
  location: '',
  description: ''
})

const jobs = ref([
  {
    id: 1,
    title: 'Desarrollador Frontend Senior',
    company: 'Tech Solutions S.A.',
    location: 'Madrid',
    status: 'En revisión',
    appliedDate: '2024-11-01',
    description: 'Desarrollo de aplicaciones web con Vue.js, React y Angular. Trabajo en equipo ágil.'
  },
  {
    id: 2,
    title: 'Diseñador UX/UI',
    company: 'Creative Agency',
    location: 'Barcelona',
    status: 'Aplicado',
    appliedDate: '2024-11-05',
    description: 'Diseño de interfaces de usuario modernas y experiencias de usuario intuitivas.'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'StartUp Inc',
    location: 'Remoto',
    status: 'Entrevista',
    appliedDate: '2024-10-28',
    description: 'Desarrollo completo de aplicaciones web con Node.js y Vue.js.'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Analytics Corp',
    location: 'Valencia',
    status: 'Rechazado',
    appliedDate: '2024-10-15',
    description: 'Análisis de datos y machine learning con Python y R.'
  }
])

// Computed
const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchesSearch = !filters.value.search || 
      job.title.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesStatus = !filters.value.status || job.status === filters.value.status
    const matchesLocation = !filters.value.location || job.location === filters.value.location
    
    return matchesSearch && matchesStatus && matchesLocation
  })
})

// Methods
const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    location: ''
  }
}

const getStatusClass = (status) => {
  const statusClasses = {
    'Aplicado': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'En revisión': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Entrevista': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Rechazado': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'Aceptado': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

const viewJobDetails = (job) => {
  console.log('Ver detalles del empleo:', job)
  // Aquí podrías abrir un modal o navegar a una página de detalles
}

const editJob = (job) => {
  console.log('Editar empleo:', job)
  // Aquí podrías abrir un modal de edición
}

const submitNewJob = () => {
  const job = {
    id: jobs.value.length + 1,
    ...newJob.value,
    status: 'Aplicado',
    appliedDate: new Date().toISOString().split('T')[0]
  }
  
  jobs.value.unshift(job)
  
  // Reset form
  newJob.value = {
    title: '',
    company: '',
    location: '',
    description: ''
  }
  
  showNewJobModal.value = false
}

// Lifecycle
onMounted(() => {
  console.log('Vista de empleos cargada')
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>