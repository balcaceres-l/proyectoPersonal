<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <NavBar_empleador :user-name="currentUser.name" />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Perfil de la Empresa</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Gestiona la información de tu empresa</p>
      </div>

      <!-- Profile Form -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <form @submit.prevent="saveProfile" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre de la Empresa
              </label>
              <input 
                v-model="profile.nombre"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Ingrese el nombre de la empresa"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dirección
              </label>
              <input 
                v-model="profile.direccion"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Ingrese la dirección"
              >
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción de la Empresa
              </label>
              <textarea 
                v-model="profile.descripcion"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Describe tu empresa, sus valores y objetivos"
              ></textarea>
            </div>
            
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Redes Sociales
              </label>
              <input 
                v-model="profile.redesSociales"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Ej: Facebook: @empresa, LinkedIn: /empresa, Twitter: @empresa"
              >
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Ingrese sus redes sociales separadas por comas
              </p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              type="button"
              class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import NavBar_empleador from '@/components/NavBar_empleador.vue'

export default {
  name: 'EmpleadorPerfil',
  components: {
    NavBar_empleador
  },
  setup() {
    const currentUser = ref({
      name: 'Empresa ABC'
    })

    const profile = ref({
      idempresa: null, // Se asignará al cargar los datos
      nombre: 'Empresa ABC',
      direccion: 'San Salvador, El Salvador',
      descripcion: 'Somos una empresa líder en el desarrollo de soluciones tecnológicas innovadoras.',
      redesSociales: 'Facebook: @empresaabc, LinkedIn: /empresa-abc'
    })

    const saveProfile = () => {
      // Lógica para guardar el perfil en la base de datos
      console.log('Guardando perfil:', profile.value)
      // Aquí realizarías la petición API para actualizar los datos
      // PUT /api/empresas/:id con los datos de profile.value
    }

    return {
      currentUser,
      profile,
      saveProfile
    }
  }
}
</script>