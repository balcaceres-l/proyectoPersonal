<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <NavBar_empleador :user-name="currentUser.name" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Valoraciones de la Empresa</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Revisa las valoraciones y comentarios de empleados</p>
      </div>

      <!-- Overview Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">4.2</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Valoración General</div>
          <div class="flex justify-center mt-2">
            <div class="flex space-x-1">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= 4 ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">156</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Total Valoraciones</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">89%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Recomendarían</div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.5</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Ambiente Laboral</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filtrar por puntuación</label>
            <select 
              v-model="filters.rating"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todas las puntuaciones</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Departamento</label>
            <select 
              v-model="filters.department"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todos los departamentos</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Diseño">Diseño</option>
              <option value="Marketing">Marketing</option>
              <option value="Ventas">Ventas</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Período</label>
            <select 
              v-model="filters.period"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todo el tiempo</option>
              <option value="month">Último mes</option>
              <option value="quarter">Últimos 3 meses</option>
              <option value="year">Último año</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-6">
        <div v-for="review in filteredReviews" :key="review.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {{ review.author.charAt(0) }}
                </span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">{{ review.author }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ review.position }} • {{ review.department }}</p>
              </div>
            </div>
            <div class="text-right">
              <div class="flex space-x-1 mb-1">
                <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ review.date }}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <div>
              <h5 class="font-medium text-gray-900 dark:text-white mb-2">{{ review.title }}</h5>
              <p class="text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ review.workLifeBalance }}/5</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Equilibrio</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ review.salary }}/5</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Salario</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ review.culture }}/5</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Cultura</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-semibold text-gray-900 dark:text-white">{{ review.management }}/5</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">Gestión</div>
              </div>
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
  name: 'EmpleadorValoraciones',
  components: {
    NavBar_empleador
  },
  setup() {
    const currentUser = ref({
      name: 'Empresa ABC'
    })

    const filters = ref({
      rating: '',
      department: '',
      period: ''
    })

    const reviews = ref([
      {
        id: 1,
        author: 'Ana María López',
        position: 'Desarrolladora Senior',
        department: 'Desarrollo',
        rating: 4,
        title: 'Excelente ambiente de trabajo',
        comment: 'Es una empresa con un ambiente muy colaborativo. Los proyectos son desafiantes y hay oportunidades de crecimiento. La flexibilidad horaria es un gran plus.',
        date: 'Hace 2 semanas',
        workLifeBalance: 4,
        salary: 4,
        culture: 5,
        management: 4
      },
      {
        id: 2,
        author: 'Carlos Rodríguez',
        position: 'Diseñador UX',
        department: 'Diseño',
        rating: 5,
        title: 'La mejor decisión de mi carrera',
        comment: 'Increíble equipo, proyectos innovadores y un liderazgo que realmente se preocupa por el bienestar de los empleados. Altamente recomendado.',
        date: 'Hace 1 mes',
        workLifeBalance: 5,
        salary: 4,
        culture: 5,
        management: 5
      },
      {
        id: 3,
        author: 'Laura García',
        position: 'Product Manager',
        department: 'Marketing',
        rating: 3,
        title: 'Buena empresa con áreas de mejora',
        comment: 'Es una buena empresa en general, pero creo que podría mejorar en algunos procesos internos. El equipo es genial y los proyectos interesantes.',
        date: 'Hace 3 semanas',
        workLifeBalance: 3,
        salary: 3,
        culture: 4,
        management: 3
      }
    ])

    const filteredReviews = computed(() => {
      return reviews.value.filter(review => {
        const matchesRating = !filters.value.rating || review.rating.toString() === filters.value.rating
        const matchesDepartment = !filters.value.department || review.department === filters.value.department
        // Para el período, por simplicidad no implementamos la lógica completa aquí
        
        return matchesRating && matchesDepartment
      })
    })

    return {
      currentUser,
      filters,
      reviews,
      filteredReviews
    }
  }
}
</script>