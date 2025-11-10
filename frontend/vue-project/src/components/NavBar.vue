<template>
  <nav class="bg-white shadow-lg dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo/Brand -->
        <div class="shrink-0 flex items-center">
          <router-link to="/empleados" class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
            MiApp
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-16 gap-10">
          <router-link 
            v-for="item in navigationItems" 
            :key="item.name"
            :to="item.path"
            class="px-6 py-3 rounded-md text-base font-semibold transition-all duration-200 flex items-center space-x-3"
            :class="isActiveRoute(item.path) 
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' 
              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-700'"
            active-class="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
          >
            <component :is="item.icon" class="w-6 h-6" />
            <span>{{ item.name }}</span>
          </router-link>
        </div>

        <!-- User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <BellIcon class="w-6 h-6" />
          </button>

          <!-- Profile Dropdown -->
          <div class="relative profile-dropdown">
            <button 
              @click="toggleProfileMenu"
              class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <UserIcon class="w-6 h-6 text-white" />
              </div>
              <span class="hidden md:block text-base font-medium text-gray-700 dark:text-gray-300">{{ userName }}</span>
              <ChevronDownIcon class="w-5 h-5 text-gray-400 transition-transform duration-200" :class="{ 'rotate-180': showProfileMenu }" />
            </button>

            <!-- Dropdown Menu -->
            <transition 
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div 
                v-if="showProfileMenu"
                class="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700"
              >
                <div class="py-2">
                  <router-link 
                    to="/empleados/perfil" 
                    class="flex px-6 py-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 items-center space-x-3 transition-colors duration-200"
                    @click="closeProfileMenu"
                  >
                    <UserIcon class="w-5 h-5" />
                    <span>Ver Perfil</span>
                  </router-link>
                  <button 
                    @click="handleLogout"
                    class="flex w-full text-left px-6 py-3 text-base text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 items-center space-x-3 transition-colors duration-200"
                  >
                    <LogoutIcon class="w-5 h-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Bars3Icon v-if="!showMobileMenu" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition 
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div class="px-4 pt-4 pb-4 space-y-3">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.path"
              class="flex px-6 py-4 rounded-md text-lg font-semibold transition-all duration-200 items-center space-x-4"
              :class="isActiveRoute(item.path) 
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200' 
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-indigo-400 dark:hover:bg-gray-700'"
              @click="closeMobileMenu"
            >
              <component :is="item.icon" class="w-6 h-6" />
              <span>{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Icons (usando SVG inline para evitar dependencias)
const BriefcaseIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h3a2 2 0 012 2v6.083"></path></svg>`
}

const BookOpenIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
}

const StarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>`
}

const UserIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>`
}

const BellIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`
}

const ChevronDownIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`
}

const Bars3Icon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`
}

const XMarkIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`
}

const LogoutIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>`
}

// Props
const props = defineProps({
  userName: {
    type: String,
    default: 'Usuario'
  }
})

// State
const showMobileMenu = ref(false)
const showProfileMenu = ref(false)

// Router
const router = useRouter()
const route = useRoute()

// Navigation items
const navigationItems = [
  {
    name: 'Empleos',
    path: '/empleados/empleos',
    icon: BriefcaseIcon
  },
  {
    name: 'Recursos',
    path: '/empleados/recursos',
    icon: BookOpenIcon
  },
  {
    name: 'Valoraciones',
    path: '/empleados/valoraciones',
    icon: StarIcon
  },
  {
    name: 'Perfil',
    path: '/empleados/perfil',
    icon: UserIcon
  }
]

// Methods
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const closeProfileMenu = () => {
  showProfileMenu.value = false
}

const isActiveRoute = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleLogout = () => {
  closeProfileMenu()
  // Limpiar datos de sesión si es necesario
  // localStorage.removeItem('user') // Ejemplo
  // sessionStorage.clear() // Ejemplo
  
  // Redirigir al login
  router.push('/login')
}

// Handle click outside
const handleClickOutside = (event) => {
  const profileDropdown = event.target.closest('.profile-dropdown')
  if (!profileDropdown && showProfileMenu.value) {
    closeProfileMenu()
  }
}

// Close menus when route changes
const stopWatcher = router.afterEach(() => {
  closeMobileMenu()
  closeProfileMenu()
})

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (stopWatcher) {
    stopWatcher()
  }
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>