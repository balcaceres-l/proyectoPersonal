<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Navigation -->
        <NavBar :user-name="currentUser.name" />

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Welcome Section -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                            ¡Bienvenido, {{ currentUser.name }}!
                        </h1>
                        <p class="text-gray-600 dark:text-gray-400 mt-2">
                            Gestiona tu carrera profesional desde un solo lugar
                        </p>
                    </div>
                    <div class="hidden md:block">
                        <div
                            class="w-20 h-20 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div v-for="stat in quickStats" :key="stat.name"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                    @click="navigateToSection(stat.route)">
                    <div class="flex items-center">
                        <div :class="stat.iconBg" class="p-3 rounded-lg">
                            <component :is="stat.icon" class="w-6 h-6 text-white" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ stat.name }}</p>
                            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button v-for="action in quickActions" :key="action.name" @click="handleQuickAction(action.action)"
                        class="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200">
                        <component :is="action.icon" class="w-8 h-8 text-gray-400 group-hover:text-indigo-500 mb-2" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ action.name }}</span>
                    </button>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Recent Jobs -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Empleos Recientes</h2>
                    <div class="space-y-4">
                        <div v-for="job in recentJobs" :key="job.id"
                            class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                            <div
                                class="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h3a2 2 0 012 2v6.083">
                                    </path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-medium text-gray-900 dark:text-white">{{ job.title }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ job.company }} • {{ job.location
                                    }}</p>
                            </div>
                            <span :class="getJobStatusClass(job.status)"
                                class="px-2 py-1 text-xs font-medium rounded-full">
                                {{ job.status }}
                            </span>
                        </div>
                    </div>
                    <router-link to="/empleados/empleos"
                        class="inline-flex items-center mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium text-sm">
                        Ver todos los empleos
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                    </router-link>
                </div>

                <!-- Recent Resources -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recursos Recientes</h2>
                    <div class="space-y-4">
                        <div v-for="resource in recentResources" :key="resource.id"
                            class="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                            <div
                                class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                                    </path>
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-medium text-gray-900 dark:text-white">{{ resource.title }}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">{{ resource.type }} • {{
                                    resource.duration }}</p>
                            </div>
                        </div>
                    </div>
                    <router-link to="/empleados/recursos"
                        class="inline-flex items-center mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium text-sm">
                        Ver todos los recursos
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                            </path>
                        </svg>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

// Router
const router = useRouter()

// Icons
const BriefcaseIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h3a2 2 0 012 2v6.083"></path></svg>`
}

const BookOpenIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
}

const StarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>`
}

const PlusIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`
}

const SearchIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`
}

const DocumentIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

const ChartIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`
}

// Data
const currentUser = ref({
  name: 'David Solito',
  email: 'david.solito@email.com'
})

const quickStats = ref([
  {
    name: 'Empleos Aplicados',
    value: '12',
    icon: BriefcaseIcon,
    iconBg: 'bg-indigo-500',
    route: '/empleados/empleos'
  },
  {
    name: 'Recursos Guardados',
    value: '8',
    icon: BookOpenIcon,
    iconBg: 'bg-green-500',
    route: '/empleados/recursos'
  },
  {
    name: 'Perfil Completo',
    value: '85%',
    icon: ChartIcon,
    iconBg: 'bg-purple-500',
    route: '/empleados/perfil'
  }
])

const quickActions = ref([
  {
    name: 'Buscar Empleos',
    icon: SearchIcon,
    action: 'searchJobs'
  },
  {
    name: 'Ver Foros',
    icon: DocumentIcon,
    action: 'viewForums'
  },
  {
    name: 'Ver Recursos',
    icon: BookOpenIcon,
    action: 'viewResources'
  },
  {
    name: 'Ver Postulaciones',
    icon: PlusIcon,
    action: 'viewApplications'
  }
])

const recentJobs = ref([
  {
    id: 1,
    title: 'Desarrollador Frontend',
    company: 'Tech Solutions',
    location: 'Madrid',
    status: 'En revisión'
  },
  {
    id: 2,
    title: 'Diseñador UX/UI',
    company: 'Creative Agency',
    location: 'Barcelona',
    status: 'Aplicado'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'StartUp Inc',
    location: 'Remoto',
    status: 'Entrevista'
  }
])

const recentResources = ref([
  {
    id: 1,
    title: 'Guía de Entrevistas Técnicas',
    type: 'PDF',
    duration: '45 min'
  },
  {
    id: 2,
    title: 'Curso de Vue.js Avanzado',
    type: 'Video',
    duration: '2.5 horas'
  },
  {
    id: 3,
    title: 'Templates de CV Moderno',
    type: 'Plantillas',
    duration: '15 min'
  }
])

// Methods
const navigateToSection = (route) => {
  router.push(route)
}

const handleQuickAction = (action) => {
  switch (action) {
    case 'searchJobs':
      router.push('/empleados/empleos')
      break
    case 'viewForums':
      router.push('/empleados/foros')
      break
    case 'viewResources':
      router.push('/empleados/recursos')
      break
    case 'viewApplications':
      router.push('/empleados/postulaciones')
      break
  }
}

const getJobStatusClass = (status) => {
  const statusClasses = {
    'Aplicado': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'En revisión': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Entrevista': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Rechazado': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

// Lifecycle
onMounted(() => {
  // Aquí podrías cargar datos del usuario desde la API
  console.log('Dashboard de empleados cargado')
})
</script>

<style scoped>
/* Animaciones adicionales si son necesarias */
</style>