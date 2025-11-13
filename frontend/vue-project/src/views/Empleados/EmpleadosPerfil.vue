<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation (Asumiendo que existe) -->
    <NavBar :user-name="currentUser.nombre" :user-role="currentUser.rol" />

    
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-indigo-600">Cargando perfil...</div>
    </div>

    <!-- Mensaje de Error -->
    <div v-if="error" class="max-w-4xl mx-auto p-4 my-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <h3 class="font-bold">Error</h3>
      <p>{{ error }}</p>
    </div>
    <main v-if="!isLoading && !error && currentUser" class="max-w-[96%] mx-auto px-2 sm:px-3 lg:px-4 py-4">
      <!-- Profile Header -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div class="px-8 py-8">
          <div class="flex flex-col md:flex-row md:items-center mb-6">
            
            <!-- Foto de Perfil -->
            <div class="relative mb-4 md:mb-0">
              <input 
                type="file" 
                ref="fileInput" 
                @change="onFileSelected" 
                accept="image/*" 
                class="hidden"
              />
              <div class="w-24 h-24 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
                <img 
                  v-if="photoPreview || currentUser.foto_perfil" 
                  :src="photoPreview || getProfileImageUrl(currentUser.foto_perfil)" 
                  alt="Foto de perfil" 
                  class="w-full h-full rounded-full object-cover"
                >
                <div v-else class="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-white text-2xl font-bold">{{ getInitials(currentUser.nombre) }}</span>
                </div>
              </div>
              <button 
                v-if="editMode"
                @click="triggerFileInput"
                class="absolute bottom-1 right-1 bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-full shadow-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </button>
            </div>
            
            <div class="md:ml-6 flex-1">
              <!-- Modo Vista -->
              <template v-if="!editMode">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ currentUser.nombre || 'Nombre no especificado' }}</h1>
                <p class="text-lg text-indigo-600 dark:text-indigo-400 mb-1">{{ currentUser.titulo || 'Título no especificado' }}</p>
                <p class="text-gray-500 dark:text-gray-500 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {{ currentUser.direccion || 'Ubicación no especificada' }}
                </p>
              </template>
              <!-- Modo Edición -->
              <template v-else>
                 <input
                    v-model="currentUser.nombre"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-2xl font-bold mb-2"
                    placeholder="Tu nombre"
                  />
                 <input
                    v-model="currentUser.titulo"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-lg mb-1"
                    placeholder="Tu título (ej: Desarrollador Full Stack)"
                  />
                 <input
                    v-model="currentUser.direccion"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Tu ubicación (ej: Santa Ana, El Salvador)"
                  />
              </template>
            </div>
            
            <!-- ****** INICIO: BLOQUE DE BOTONES RESTAURADO ****** -->
            <div class="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button 
                @click="toggleEditMode"
                :disabled="isSaving"
                class="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-wait"
              >
                {{ editMode ? (isSaving ? 'Guardando...' : 'Guardar Cambios') : 'Editar Perfil' }}
              </button>
              <button 
                v-if="editMode && !isSaving"
                @click="cancelEdit"
                class="w-full md:w-auto bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
            <!-- ****** FIN: BLOQUE DE BOTONES RESTAURADO ****** -->

          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <!-- Left Column -->
        <div class="xl:col-span-3 space-y-6">
          <!-- About Section (biografia no tenía tilde) -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Acerca de mí</h2>
            <div v-if="!editMode">
              <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ currentUser.biografia || 'No hay biografía disponible.' }}</p>
            </div>
            <div v-else>
              <textarea
                v-model="currentUser.biografia"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Cuéntanos sobre ti..."
              ></textarea>
            </div>
          </div>

          <!-- Experience Section (experiencia no tenía tilde) -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Experiencia</h2>
              <button 
                v-if="editMode"
                @click="addExperience"
                class="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                + Añadir
              </button>
            </div>
            <div class="space-y-6">
              <div 
                v-for="(exp, index) in currentUser.experiencia" 
                :key="index"
                class="flex items-start"
              >
                <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4 shrink-0">
                  <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4z"></path></svg>
                </div>
                <div class="flex-1">
                  <div v-if="!editMode">
                    <h3 class="font-semibold text-gray-900 dark:text-white">{{ exp.position }}</h3>
                    <p class="text-indigo-600 dark:text-indigo-400 font-medium">{{ exp.company }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ exp.period }}</p>
                    <p class="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">{{ exp.description }}</p>
                  </div>
                  <div v-else class="space-y-2">
                    <input v-model="exp.position" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Posición"/>
                    <input v-model="exp.company" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Empresa"/>
                    <input v-model="exp.period" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Período (ej: 2020 - 2023)"/>
                    <textarea v-model="exp.description" rows="2" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Descripción"></textarea>
                  </div>
                </div>
                <button 
                  v-if="editMode"
                  @click="removeExperience(index)"
                  class="text-red-500 hover:text-red-700 ml-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Education Section -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
             <div class="flex items-center justify-between mb-6">
               <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Educación</h2>
               <button 
                v-if="editMode"
                @click="addEducation"
                class="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
               >
                 + Añadir
               </button>
             </div>
             <div class="space-y-4">
               <div 
                v-for="(edu, index) in currentUser.educacion" 
                :key="index"
                class="flex items-start"
               >
                 <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4 shrink-0">
                   <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                 </div>
                 <div class="flex-1">
                   <div v-if="!editMode">
                     <h3 class="font-semibold text-gray-900 dark:text-white">{{ edu.degree }}</h3>
                     <p class="text-green-600 dark:text-green-400 font-medium">{{ edu.institution }}</p>
                     <p class="text-sm text-gray-500 dark:text-gray-400">{{ edu.period }}</p>
                   </div>
                   <div v-else class="space-y-2">
                     <input v-model="edu.degree" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Título/Grado"/>
                     <input v-model="edu.institution" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Institución"/>
                     <input v-model="edu.period" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Período"/>
                   </div>
                 </div>
                 <button 
                  v-if="editMode"
                  @click="removeEducation(index)"
                  class="text-red-500 hover:text-red-700 ml-2"
                 >
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path></svg>
                 </button>
               </div>
             </div>
           </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Skills Section -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Habilidades</h2>
              <button 
                v-if="editMode"
                @click="showSkillInput = !showSkillInput"
                class="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                + Añadir
              </button>
            </div>
            
            <div v-if="editMode && showSkillInput" class="mb-4">
              <div class="flex space-x-2">
                <input
                  v-model="newSkill"
                  @keyup.enter="addSkill"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                  placeholder="Nueva habilidad"
                />
                <button 
                  @click="addSkill"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Añadir
                </button>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(skill, index) in currentUser.skills" 
                :key="index"
                class="inline-flex items-center px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full"
              >
                {{ skill }}
                <button 
                  v-if="editMode"
                  @click="removeSkill(index)"
                  class="ml-2 text-indigo-600 hover:text-indigo-800"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </span>
            </div>
          </div>


          <!-- Contact Info -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Información de Contacto</h2>
            <div class="space-y-4">
              <!-- Correo -->
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <div v-if="!editMode" class="flex-1">
                  <span class="text-gray-700 dark:text-gray-300">{{ currentUser.correo }}</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="currentUser.correo"
                    type="email"
                    disabled
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  />
                </div>
              </div>
              
              <!-- Teléfono -->
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <div v-if="!editMode" class="flex-1">
                  <span class="text-gray-700 dark:text-gray-300">{{ currentUser.telefono || 'Teléfono no especificado' }}</span>
                </div>
                <div v-else class="flex-1">
                  <input
                    v-model="currentUser.telefono"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Tu teléfono"
                  />
                </div>
              </div>

            </div>
          </div>

          <!-- Social Links -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Enlaces Sociales</h2>
            <div class="space-y-3">
              <div v-for="(link, index) in currentUser.redes_sociales" :key="index" class="flex items-center">
                <component :is="getSocialIcon(link.platform)" class="w-5 h-5 text-gray-400 mr-3" />
                <div v-if="!editMode" class="flex-1">
                  <a :href="link.url" target="_blank" class="text-indigo-600 hover:text-indigo-700 text-sm">
                    {{ link.platform }}
                  </a>
                </div>
                <div v-else class="flex-1 flex space-x-2">
                  <input v-model="link.platform" class="w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="Plataforma"/>
                  <input v-model="link.url" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white text-sm" placeholder="URL"/>
                  <button @click="removeSocialLink(index)" class="text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
              <button 
                v-if="editMode"
                @click="addSocialLink"
                class="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
              >
                + Añadir enlace social
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios' 

// --- Configuración ---
const userId = localStorage.getItem('idusuario'); 
const VITE_API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const VITE_SERVER_ROOT_URL = VITE_API_URL.replace('/api', '');

const API_BASE_URL = `${VITE_API_URL}/usuarios`; // -> http://localhost:3000/api/usuarios
const UPLOADS_BASE_URL = `${VITE_SERVER_ROOT_URL}/uploads/fotoPerfil/`; // -> http://localhost:3000/uploads/fotoPerfil/

// --- Estado Reactivo ---
const editMode = ref(false)
const isLoading = ref(true)
const isSaving = ref(false)
const error = ref(null)

const showSkillInput = ref(false)
const newSkill = ref('')
const fileInput = ref(null)
const selectedFile = ref(null)
const photoPreview = ref(null)

// Define la estructura base del usuario
const getInitialUserData = () => ({
  idusuario: null,
  nombre: '',
  correo: '',
  titulo: '',
  foto_perfil: '',
  rol: '',
  direccion: '', // sin tilde
  nacionalidad: '',
  biografia: '',
  telefono: '', // sin tilde
  estado_civil: '',
  fecha_nacimiento: '',
  educacion: [], // sin tilde
  experiencia: [],
  redes_sociales: [],
  skills: [],
});

const currentUser = ref(getInitialUserData());
const originalUser = ref(getInitialUserData());

// --- Métodos de Carga de Datos ---
const fetchUserData = async () => {
  isLoading.value = true;
  error.value = null;

  if (!userId) {
    isLoading.value = false;
    error.value = "No se pudo encontrar un ID de usuario. Por favor, inicie sesión de nuevo.";
    return; 
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    
    const data = response.data;
    
    const parsedData = {
      ...data,
      educacion: safeJsonParse(data.educacion),
      experiencia: safeJsonParse(data.experiencia),
      redes_sociales: safeJsonParse(data.redes_sociales),
      skills: safeJsonParse(data.skills),
      // Asegurarse de que los campos de texto nulos no sean "null"
      telefono: data.telefono || '',
      direccion: data.direccion || '',
      biografia: data.biografia || '',
      titulo: data.titulo || '',
    };
    
    currentUser.value = parsedData;
    originalUser.value = JSON.parse(JSON.stringify(parsedData));
    
  } catch (err) {
    console.error('Error al cargar el perfil:', err);
    error.value = err.response?.data?.message || 'No se pudo cargar la información del perfil.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUserData();
});

// --- Métodos de Guardado ---
const toggleEditMode = () => {
  if (editMode.value) {
    handleSave();
  } else {
    // Entrar en modo edición
    // Guardar una copia de los datos actuales antes de editar
    originalUser.value = JSON.parse(JSON.stringify(currentUser.value));
    editMode.value = true;
  }
};

const cancelEdit = () => {
  // Restaurar desde la copia original
  currentUser.value = JSON.parse(JSON.stringify(originalUser.value));
  editMode.value = false;
  selectedFile.value = null;
  photoPreview.value = null;
  error.value = null;
};

const handleSave = async () => {
  isSaving.value = true;
  error.value = null;
  
  const formData = new FormData();

  if (selectedFile.value) {
    formData.append('foto_perfil', selectedFile.value);
  }

  const fieldsToUpdate = {
    nombre: currentUser.value.nombre,
    titulo: currentUser.value.titulo,
    direccion: currentUser.value.direccion, // sin tilde
    biografia: currentUser.value.biografia,
    telefono: currentUser.value.telefono, // sin tilde
    nacionalidad: currentUser.value.nacionalidad,
    estado_civil: currentUser.value.estado_civil,
    fecha_nacimiento: currentUser.value.fecha_nacimiento,
    // Serializar campos JSON
    educacion: JSON.stringify(currentUser.value.educacion), // sin tilde
    experiencia: JSON.stringify(currentUser.value.experiencia),
    redes_sociales: JSON.stringify(currentUser.value.redes_sociales),
    skills: JSON.stringify(currentUser.value.skills),
  };
  
  for (const [key, value] of Object.entries(fieldsToUpdate)) {

    let valToSend = value;
    if (value === null || value === undefined) {
      valToSend = 'null'; // Enviar 'null' para que el backend lo interprete
    }
    formData.append(key, valToSend);
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = response.data;
    const parsedData = {
      ...data,
      educacion: safeJsonParse(data.educacion), // sin tilde
      experiencia: safeJsonParse(data.experiencia),
      redes_sociales: safeJsonParse(data.redes_sociales),
      skills: safeJsonParse(data.skills),
      telefono: data.telefono || '',
      direccion: data.direccion || '',
      biografia: data.biografia || '',
      titulo: data.titulo || '',
    };

    currentUser.value = parsedData;
    originalUser.value = JSON.parse(JSON.stringify(parsedData)); 

    editMode.value = false;
    selectedFile.value = null;
    photoPreview.value = null;

  } catch (err) {
    console.error('Error al guardar el perfil:', err);
    error.value = err.response?.data?.message || 'Ocurrió un error al guardar los cambios.';
  } finally {
    isSaving.value = false;
  }
};

// --- Métodos de Foto de Perfil ---
const triggerFileInput = () => {
  fileInput.value.click();
};

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    // Crear previsualización
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const getProfileImageUrl = (filename) => {
  if (!filename) return null;
  // Añadir un timestamp soluciona problemas de caché si la imagen se llama igual
  return `${UPLOADS_BASE_URL}${filename}?t=${new Date().getTime()}`;
};


// --- Métodos de UI (Listas dinámicas) ---
const addExperience = () => {
  currentUser.value.experiencia.push({
    position: '',
    company: '',
    period: '',
    description: ''
  })
}
const removeExperience = (index) => {
  currentUser.value.experiencia.splice(index, 1)
}

const addEducation = () => {
  currentUser.value.educacion.push({ // sin tilde
    degree: '',
    institution: '',
    period: ''
  })
}
const removeEducation = (index) => {
  currentUser.value.educacion.splice(index, 1) // sin tilde
}

const addSkill = () => {
  if (newSkill.value.trim()) {
    currentUser.value.skills.push(newSkill.value.trim())
    newSkill.value = ''
    showSkillInput.value = false
  }
}
const removeSkill = (index) => {
  currentUser.value.skills.splice(index, 1)
}

const addSocialLink = () => {
  currentUser.value.redes_sociales.push({
    platform: '',
    url: ''
  })
}
const removeSocialLink = (index) => {
  currentUser.value.redes_sociales.splice(index, 1)
}

// --- Métodos de Utilidad ---
const getInitials = (name) => {
  if (!name) return '...';
  const names = name.split(' ');
  if (names.length > 1) {
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const safeJsonParse = (jsonString) => {
  if (!jsonString) return [];
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : (typeof parsed === 'object' && parsed !== null ? [parsed] : []);
  } catch (e) {
    // console.warn('Error al parsear JSON de la BD:', e, jsonString);
    return [];
  }
};


// --- Iconos Sociales (Tu lógica original) ---
const LinkedInIcon = { template: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path></svg>` }
const GitHubIcon = { template: `<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path></svg>` }
const TwitterIcon = { template: `<svg fill="currentColor" viewBox="0 0 20 20"><path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path></svg>` }

const getSocialIcon = (platform) => {
  const icons = {
    'LinkedIn': LinkedInIcon,
    'GitHub': GitHubIcon,
    'Twitter': TwitterIcon,
  };
  // Un ícono genérico de "enlace" si no se reconoce la plataforma
  return icons[platform] || { template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"></path></svg>` };
}
</script>