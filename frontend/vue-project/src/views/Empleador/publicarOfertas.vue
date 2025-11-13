<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Navigation -->
        <NavBar_empleador :user-name="currentUser.name" />

        <!-- Main Content -->
        <div class="flex justify-center w-full">
            <main class="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <!-- Header -->
            <div class="mb-8">
                <nav class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <router-link to="/empleador/dashboard" class="hover:text-indigo-600 dark:hover:text-indigo-400">
                        Dashboard
                    </router-link>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <router-link to="/empleador/empleos" class="hover:text-indigo-600 dark:hover:text-indigo-400">
                        Empleos
                    </router-link>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <span class="text-gray-900 dark:text-white">Publicar Oferta</span>
                </nav>

                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Publicar Nueva Oferta</h1>
                        <p class="text-gray-600 dark:text-gray-400 mt-2">Complete la información para publicar una nueva
                            oferta de trabajo</p>
                    </div>
                    <div class="hidden md:block">
                        <div
                            class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submitOffer" class="space-y-12">

                <!-- Información Básica -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Información Básica
                    </h2>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Título del Puesto *
                            </label>
                            <input v-model="offerData.titulo" type="text" required
                                placeholder="Ej: Desarrollador Frontend Senior"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                        </div>

                        <div class="lg:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Descripción del Puesto *
                            </label>
                            <textarea v-model="offerData.descripcion" required rows="4"
                                placeholder="Describe las principales funciones y características del puesto..."
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Rubro/Industria
                            </label>
                            <select v-model="offerData.rubro"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                                <option value="">Seleccionar rubro</option>
                                <option value="Tecnología">Tecnología</option>
                                <option value="Salud">Salud</option>
                                <option value="Educación">Educación</option>
                                <option value="Finanzas">Finanzas</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Ventas">Ventas</option>
                                <option value="Recursos Humanos">Recursos Humanos</option>
                                <option value="Ingeniería">Ingeniería</option>
                                <option value="Diseño">Diseño</option>
                                <option value="Administración">Administración</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Cantidad de Plazas *
                            </label>
                            <input v-model.number="offerData.cantidadPlazas" type="number" min="1" required
                                placeholder="1"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                </div>

                <!-- Salario y Contrato -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1">
                            </path>
                        </svg>
                        Salario y Tipo de Contrato
                    </h2>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Salario Mínimo
                            </label>
                            <div class="relative">
                                <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
                                <input v-model.number="offerData.salario_minimo" type="number" min="0" step="0.01"
                                    placeholder="0.00"
                                    class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Salario Máximo
                            </label>
                            <div class="relative">
                                <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
                                <input v-model.number="offerData.salario_maximo" type="number" min="0" step="0.01"
                                    placeholder="0.00"
                                    class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tipo de Salario
                            </label>
                            <select v-model="offerData.tipo_Salario"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                                <option value="">Seleccionar tipo</option>
                                <option value="Quincenal">Quincenal</option>
                                <option value="Mensual">Mensual</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Tipo de Contrato
                            </label>
                            <select v-model="offerData.tipo_contrato"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                                <option value="">Seleccionar tipo</option>
                                <option value="Tiempo completo">Tiempo completo</option>
                                <option value="Medio tiempo">Medio tiempo</option>
                                <option value="Por proyecto">Por proyecto</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Prácticas">Prácticas</option>
                                <option value="Temporal">Temporal</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Requisitos -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
                            </path>
                        </svg>
                        Requisitos del Candidato
                    </h2>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Nivel de Educación
                            </label>
                            <select v-model="offerData.educacion"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                                <option value="">Seleccionar nivel</option>
                                <option value="Secundaria">Secundaria</option>
                                <option value="Técnico">Técnico</option>
                                <option value="Tecnológico">Tecnológico</option>
                                <option value="Universitario">Universitario</option>
                                <option value="Especialización">Especialización</option>
                                <option value="Maestría">Maestría</option>
                                <option value="Doctorado">Doctorado</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Experiencia Requerida
                            </label>
                            <select v-model="offerData.experiencia"
                                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                                <option value="">Seleccionar experiencia</option>
                                <option value="Sin experiencia">Sin experiencia</option>
                                <option value="6 meses - 1 año">6 meses - 1 año</option>
                                <option value="1 - 2 años">1 - 2 años</option>
                                <option value="2 - 3 años">2 - 3 años</option>
                                <option value="3 - 5 años">3 - 5 años</option>
                                <option value="5 - 7 años">5 - 7 años</option>
                                <option value="Más de 7 años">Más de 7 años</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Responsabilidades -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01">
                            </path>
                        </svg>
                        Responsabilidades y Funciones
                    </h2>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Principales Responsabilidades
                        </label>
                        <textarea v-model="offerData.responsabilidades" rows="6"
                            placeholder="Describe las principales responsabilidades y funciones que tendrá el candidato en este puesto..."
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Tip: Incluye las tareas diarias, objetivos a alcanzar y competencias técnicas necesarias.
                        </p>
                    </div>
                </div>

                <!-- Botones de Acción -->
                <div
                    class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <button type="button" @click="saveDraft"
                        class="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                        <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12">
                            </path>
                        </svg>
                        Guardar Borrador
                    </button>

                    <button type="submit" :disabled="isSubmitting"
                        class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-lg transition-colors font-medium flex items-center">
                        <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none"
                            viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        {{ isSubmitting ? 'Publicando...' : 'Publicar Oferta' }}
                    </button>
                </div>
            </form>
        </main>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import NavBar_empleador from '@/components/NavBar_empleador.vue'

export default {
    name: 'PublicarOfertas',
    components: {
        NavBar_empleador
    },
    setup() {
        const router = useRouter()
        const isSubmitting = ref(false)

        const currentUser = ref({
            name: 'Empresa ABC'
        })

        const offerData = reactive({
            titulo: '',
            descripcion: '',
            rubro: '',
            salario_minimo: null,
            salario_maximo: null,
            tipo_Salario: '',
            tipo_contrato: '',
            educacion: '',
            experiencia: '',
            responsabilidades: '',
            cantidadPlazas: 1,
            cantidadAplicantes: 0,
            idempresa: 1
        })

        const submitOffer = async () => {
            try {
                isSubmitting.value = true

                if (!offerData.titulo || !offerData.descripcion || !offerData.cantidadPlazas) {
                    alert('Por favor complete todos los campos obligatorios')
                    return
                }

                console.log('Datos de la oferta:', offerData)

                await new Promise(resolve => setTimeout(resolve, 2000))

                alert('¡Oferta publicada exitosamente!')
                router.push('/empleador/empleos')

            } catch (error) {
                console.error('Error al publicar oferta:', error)
                alert('Error al publicar la oferta. Intente nuevamente.')
            } finally {
                isSubmitting.value = false
            }
        }

        const saveDraft = () => {
            console.log('Guardando borrador:', offerData)
            alert('Borrador guardado exitosamente')
        }

        const previewOffer = () => {
            console.log('Vista previa de:', offerData)
            alert('Función de vista previa - próximamente')
        }

        return {
            currentUser,
            offerData,
            isSubmitting,
            submitOffer,
            saveDraft,
            previewOffer
        }
    }
}
</script>

<style scoped>
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>