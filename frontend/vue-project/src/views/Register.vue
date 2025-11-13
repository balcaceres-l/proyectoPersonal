<template>
    <div class="min-h-screen w-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
        <!-- Header/Navigation area -->
        <div class="absolute top-0 left-0 right-0 z-10">
            <nav class="flex justify-between items-center px-6 lg:px-12 py-6">
                <div class="text-2xl font-bold text-indigo-700">MiApp</div>
                <div class="hidden md:flex space-x-4">
                    <span class="text-gray-600 text-sm">¿Ya tienes cuenta?</span>
                    <a 
                        href="#" 
                        @click.prevent="$emit('goToLogin')"
                        class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                    >
                        Iniciar Sesión
                    </a>
                </div>
            </nav>
        </div>

        <!-- Main content -->
        <div class="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                <!-- Register Card -->
                <div class="bg-white shadow-2xl rounded-2xl px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
                    <div class="text-center mb-8 lg:mb-10">
                        <div class="mx-auto w-20 h-20 lg:w-24 lg:h-24 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                            <svg class="w-10 h-10 lg:w-12 lg:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                        </div>
                        <h1 class="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 lg:mb-3">
                            Crear Cuenta
                        </h1>
                        <p class="text-gray-600 text-base lg:text-lg xl:text-xl">
                            Regístrate para acceder a todas las funcionalidades
                        </p>
                    </div>

                    <form class="space-y-8 lg:space-y-10" @submit.prevent="registerUser">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <div>
                            <label for="username" class="block text-sm lg:text-base font-semibold text-gray-700 mb-2 lg:mb-3">
                                Nombre de usuario
                            </label>
                            <input 
                                v-model="username"
                                type="text" 
                                id="username" 
                                required 
                                class="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-base lg:text-lg"
                                placeholder="Ingresa tu nombre"
                            />
                            </div>
                            
                            <div>
                            <label for="email" class="block text-sm lg:text-base font-semibold text-gray-700 mb-2 lg:mb-3">
                                Correo electrónico
                            </label>
                            <input 
                                v-model="email"
                                type="email" 
                                id="email" 
                                required 
                                class="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-base lg:text-lg"
                                placeholder="correo@ejemplo.com"
                            />
                            </div>
                            
                            <div>
                            <label for="password" class="block text-sm lg:text-base font-semibold text-gray-700 mb-1 lg:mb-1">
                                Contraseña
                            </label>
                            <input 
                                v-model="password"
                                type="password" 
                                id="password" 
                                required 
                                class="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-base lg:text-lg"
                                placeholder="Mínimo 8 caracteres"
                            />
                            </div>
                            
                            <div>
                            <label for="confirm-password" class="block text-sm lg:text-base font-semibold text-gray-700 mb-2 lg:mb-3">
                                Confirmar contraseña
                            </label>
                            <input 
                                v-model="confirmPassword"
                                type="password" 
                                id="confirm-password" 
                                required 
                                class="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 text-base lg:text-lg"
                                placeholder="Repite tu contraseña"
                            />
                            </div>
                        </div>

                        <div>
                            <label for="role" class="block text-sm lg:text-base font-semibold text-gray-700 mb-2 lg:mb-3">
                            Tipo de cuenta
                            </label>
                            <select 
                            v-model="selectedRole"
                            id="role"
                            class="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 text-base lg:text-lg bg-white"
                            >
                            <option disabled value="">Selecciona el tipo de cuenta</option>
                            <option value="empleado">👨‍💼 Empleado</option>
                            <option value="empleador">👤 Empleador</option>
                            </select>
                        </div>

                        <div class="flex items-start lg:items-center pt-2">
                            <input 
                            v-model="termsAccepted"
                            type="checkbox" 
                            id="terms" 
                            class="h-4 w-4 lg:h-5 lg:w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1 lg:mt-0"
                            >
                            <label for="terms" class="ml-3 lg:ml-4 text-sm lg:text-base text-gray-600">
                            Acepto los 
                            <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium">términos y condiciones</a>
                            y la 
                            <a href="#" class="text-indigo-600 hover:text-indigo-500 font-medium">política de privacidad</a>
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            class="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 lg:py-5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-base lg:text-lg mt-4 lg:mt-6"
                        >
                            Crear Cuenta
                        </button>
                        </form>
                    
                    
                    <div class="mt-8 lg:mt-10 text-center">
                        <p class="text-gray-600 text-base lg:text-lg">
                            ¿Ya tienes una cuenta? 
                            <a 
                                href="#" 
                                @click.prevent="goToLogin"
                                class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                            >
                                Inicia sesión aquí
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { ref } from 'vue'
    import axios from 'axios'

    const username = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const selectedRole = ref('')
    const termsAccepted = ref(false)
    const router = useRouter()
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const goToLogin = () => {
        router.push('/login');
    };

    const registerUser = async () => {
        console.log('🟣 registerUser ejecutado')
        console.log('Datos a enviar:', {
            nombre: username.value,
            correo: email.value,
            password: password.value,
            rol: selectedRole.value,
            termsAccepted: termsAccepted.value
        })

        if (!termsAccepted.value) {
            alert('Debes aceptar los términos y condiciones.')
            return
        }

        if (password.value !== confirmPassword.value) {
            alert('Las contraseñas no coinciden.')
            return
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/usuarios`, {
                nombre: username.value,
                correo: email.value,
                password: password.value,
                rol: selectedRole.value
        })
            
            alert('✅ Usuario registrado con éxito')
        } catch (error) {
            console.error('🔴 Error al registrar usuario:', error)
            if (error.response) {
            console.error('Respuesta del servidor:', error.response.data)
            }
        }
    }
</script>