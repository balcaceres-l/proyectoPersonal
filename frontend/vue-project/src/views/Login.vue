<template>
    <div class="login-container min-h-screen w-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <!-- Header/Navigation area -->
        <div class="absolute top-0 left-0 right-0 z-10">
            <nav class="flex justify-between items-center px-6 lg:px-12 py-6">
                <div class="text-2xl font-bold text-indigo-700 dark:text-indigo-400">MiApp</div>
                <div class="hidden md:flex items-center space-x-4">
                    <span class="text-gray-600 dark:text-gray-400 text-sm">¿Necesitas ayuda?</span>
                    <a href="#" class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium transition-colors">
                        Soporte
                    </a>
                </div>
            </nav>
        </div>

        <!-- Main content -->
        <div class="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <!-- Login Card -->
                <div class="bg-white shadow-2xl rounded-2xl px-8 py-12 sm:px-12 dark:bg-gray-800">
                    <div class="text-center mb-8">
                        <div class="mx-auto w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Iniciar Sesión
                        </h1>
                        <p class="text-gray-600 dark:text-gray-300">
                            Accede a tu cuenta para continuar
                        </p>
                    </div>
                    <form class="space-y-6">
                        <div>
                            <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Correo electrónico
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-base"
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Contraseña
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                required 
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-base"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        <!-- Remember me and forgot password -->
                        <div class="flex items-center justify-between text-sm">
                            
                            <a href="#" class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <button 
                            type="submit" 
                            class="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base"
                        >
                            Iniciar Sesión
                        </button>
                    </form>

                    
                    <div class="mt-8 text-center">
                        <p class="text-gray-600 dark:text-gray-400">
                            ¿No tienes una cuenta? 
                            <a 
                                href="#" 
                                @click.prevent="$emit('goToRegister')"
                                class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                            >
                                Regístrate aquí
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Definir los eventos que el componente puede emitir
defineEmits(['goToRegister'])
</script>

<style scoped>
/* Override global grid layout for login page */
.login-container {
    display: flex !important;
    flex-direction: column !important;
}

/* Ensure the login form looks good on larger screens */
@media (min-width: 1024px) {
    .login-container {
    grid-template-columns: none !important;
    }
}
</style>