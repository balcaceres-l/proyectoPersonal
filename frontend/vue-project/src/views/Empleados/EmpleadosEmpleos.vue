<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Navigation -->
        <NavBar :user-name="currentUser.name" />

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Empleos</h1>
                        <p class="text-gray-600 dark:text-gray-400 mt-2">
                            Explora y aplica a oportunidades laborales
                        </p>
                    </div>
                    <button 
                        class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Nuevo Empleo
                    </button>
                </div>
            </div>

            <!-- Search and Filters -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Buscar empleos
                        </label>
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Título, empresa, ubicación..."
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            />
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tipo de empleo
                        </label>
                        <select 
                            v-model="selectedType"
                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                            <option value="">Todos los tipos</option>
                            <option value="tiempo-completo">Tiempo Completo</option>
                            <option value="tiempo-parcial">Tiempo Parcial</option>
                            <option value="freelance">Freelance</option>
                            <option value="remoto">Remoto</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Ubicación
                        </label>
                        <select 
                            v-model="selectedLocation"
                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                            <option value="">Todas las ubicaciones</option>
                            <option value="madrid">San Salvador</option>
                            <option value="barcelona">Santa Ana</option>
                            <option value="valencia">San Miguel</option>
                            <option value="remoto">Remoto</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Jobs List -->
            <div class="space-y-6">
                <div 
                    v-for="job in filteredJobs" 
                    :key="job.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                    @click="viewJobDetails(job)"
                >
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mr-3">
                                    {{ job.title }}
                                </h3>
                                <span 
                                    :class="getJobTypeClass(job.type)"
                                    class="px-2 py-1 text-xs font-medium rounded-full"
                                >
                                    {{ job.type }}
                                </span>
                            </div>
                            <div class="flex items-center text-gray-600 dark:text-gray-400 mb-3">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4z"></path>
                                </svg>
                                <span class="mr-4">{{ job.company }}</span>
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span class="mr-4">{{ job.location }}</span>
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                <span>{{ job.salary }}</span>
                            </div>
                            <p class="text-gray-700 dark:text-gray-300 mb-4">{{ job.description }}</p>
                            <div class="flex flex-wrap gap-2">
                                <span 
                                    v-for="skill in job.skills" 
                                    :key="skill"
                                    class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full"
                                >
                                    {{ skill }}
                                </span>
                            </div>
                        </div>
                        <div class="ml-6 flex flex-col items-end">
                            <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ job.postedDate }}</span>
                            <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center mt-8">
                <nav class="flex items-center space-x-1">
                    <button 
                        :disabled="currentPage === 1"
                        @click="currentPage--"
                        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>
                    <span class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                        Página {{ currentPage }} de {{ totalPages }}
                    </span>
                    <button 
                        :disabled="currentPage === totalPages"
                        @click="currentPage++"
                        class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                    </button>
                </nav>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'

// Data
const currentUser = ref({
    name: 'David Solito',
    email: 'david.solito@email.com'
})

const searchQuery = ref('')
const selectedType = ref('')
const selectedLocation = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

const jobs = ref([
    {
        id: 1,
        title: 'Desarrollador Frontend Vue.js',
        company: 'TechCorp',
        location: 'Madrid',
        salary: '35.000€ - 45.000€',
        type: 'Tiempo Completo',
        description: 'Buscamos un desarrollador Frontend con experiencia en Vue.js para unirse a nuestro equipo de desarrollo.',
        skills: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Git'],
        postedDate: 'Hace 2 días'
    },
    {
        id: 2,
        title: 'Diseñador UX/UI',
        company: 'DesignStudio',
        location: 'Barcelona',
        salary: '30.000€ - 40.000€',
        type: 'Tiempo Completo',
        description: 'Únete a nuestro equipo como Diseñador UX/UI y ayuda a crear experiencias digitales increíbles.',
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        postedDate: 'Hace 1 día'
    },
    {
        id: 3,
        title: 'Desarrollador Full Stack',
        company: 'StartupInnovate',
        location: 'Remoto',
        salary: '40.000€ - 55.000€',
        type: 'Remoto',
        description: 'Oportunidad remota para desarrollador Full Stack con experiencia en tecnologías modernas.',
        skills: ['Node.js', 'Vue.js', 'MongoDB', 'Express', 'Docker'],
        postedDate: 'Hace 3 días'
    },
    {
        id: 4,
        title: 'Consultor de Marketing Digital',
        company: 'MarketingPro',
        location: 'Valencia',
        salary: '25.000€ - 35.000€',
        type: 'Tiempo Parcial',
        description: 'Buscamos consultor de marketing digital para gestionar campañas y estrategias online.',
        skills: ['SEO', 'SEM', 'Google Analytics', 'Social Media'],
        postedDate: 'Hace 5 días'
    },
    {
        id: 5,
        title: 'Desarrollador Mobile React Native',
        company: 'MobileFirst',
        location: 'Madrid',
        salary: '38.000€ - 48.000€',
        type: 'Tiempo Completo',
        description: 'Desarrolla aplicaciones móviles innovadoras con React Native en un ambiente colaborativo.',
        skills: ['React Native', 'JavaScript', 'iOS', 'Android'],
        postedDate: 'Hace 1 semana'
    }
])

// Computed
const filteredJobs = computed(() => {
    let filtered = jobs.value

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(job =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query)
        )
    }

    if (selectedType.value) {
        filtered = filtered.filter(job => job.type.toLowerCase() === selectedType.value)
    }

    if (selectedLocation.value) {
        filtered = filtered.filter(job => job.location.toLowerCase() === selectedLocation.value)
    }

    return filtered
})

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / itemsPerPage))

// Methods
const getJobTypeClass = (type) => {
    const classes = {
        'Tiempo Completo': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'Tiempo Parcial': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'Freelance': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'Remoto': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    }
    return classes[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const viewJobDetails = (job) => {
    console.log('Ver detalles del empleo:', job)

}
</script>