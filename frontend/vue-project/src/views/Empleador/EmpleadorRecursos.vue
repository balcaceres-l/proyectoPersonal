<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <NavBar_empleador :user-name="currentUser.name" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Recursos Publicados</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Administra guías y recursos para candidatos</p>
        </div>
        <button 
          @click="showNewResourceModal = true"
          class="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span>Nuevo Recurso</span>
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
                placeholder="Buscar recursos..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo</label>
            <select 
              v-model="filters.type"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="Guía">Guía</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Plantilla">Plantilla</option>
              <option value="Webinar">Webinar</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estado</label>
            <select 
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos</option>
              <option value="Publicado">Publicado</option>
              <option value="Borrador">Borrador</option>
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

      <!-- Resources Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="resource in filteredResources" :key="resource.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <span 
                  :class="{
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': resource.status === 'Publicado',
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200': resource.status === 'Borrador'
                  }"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ resource.status }}
                </span>
              </div>
              <button class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </button>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ resource.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">{{ resource.description }}</p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {{ resource.views }} vistas
              </span>
              <span>{{ resource.type }}</span>
            </div>
            
            <div class="flex space-x-2">
              <button class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Editar
              </button>
              <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Ver
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
  name: 'EmpleadorRecursos',
  components: {
    NavBar_empleador
  },
  setup() {
    const showNewResourceModal = ref(false)
    const currentUser = ref({
      name: 'Empresa ABC'
    })

    const filters = ref({
      search: '',
      type: '',
      status: ''
    })

    const resources = ref([
      {
        id: 1,
        title: 'Guía para Entrevistas Técnicas',
        description: 'Una guía completa para preparar entrevistas técnicas efectivas.',
        type: 'Guía',
        status: 'Publicado',
        views: 245,
        publishedDate: '2024-01-15'
      },
      {
        id: 2,
        title: 'Plantilla CV Desarrollador',
        description: 'Plantilla profesional para CV de desarrolladores.',
        type: 'Plantilla',
        status: 'Publicado',
        views: 189,
        publishedDate: '2024-01-10'
      },
      {
        id: 3,
        title: 'Tutorial: Preparación para Entrevistas',
        description: 'Video tutorial sobre cómo prepararse para entrevistas de trabajo.',
        type: 'Tutorial',
        status: 'Borrador',
        views: 0,
        publishedDate: null
      }
    ])

    const filteredResources = computed(() => {
      return resources.value.filter(resource => {
        const matchesSearch = !filters.value.search || 
          resource.title.toLowerCase().includes(filters.value.search.toLowerCase()) ||
          resource.description.toLowerCase().includes(filters.value.search.toLowerCase())
        
        const matchesType = !filters.value.type || resource.type === filters.value.type
        const matchesStatus = !filters.value.status || resource.status === filters.value.status
        
        return matchesSearch && matchesType && matchesStatus
      })
    })

    const clearFilters = () => {
      filters.value = {
        search: '',
        type: '',
        status: ''
      }
    }

    return {
      showNewResourceModal,
      currentUser,
      filters,
      resources,
      filteredResources,
      clearFilters
    }
  }
}
</script>