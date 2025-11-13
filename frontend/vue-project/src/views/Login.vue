<!--frontend/vue-project/src/views/Login.vue-->
<template>
    <div
        class="login-container min-h-screen w-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900"
    >
        <!-- Header -->
        <div class="absolute top-0 left-0 right-0 z-10">
        <nav class="flex justify-between items-center px-6 lg:px-12 py-6">
            <div class="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
            MiApp
            </div>
            <div class="hidden md:flex items-center space-x-4">
            <span class="text-gray-600 dark:text-gray-400 text-sm"
                >¿Necesitas ayuda?</span
            >
            <a
                href="#"
                class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium transition-colors"
            >
                Soporte
            </a>
            </div>
        </nav>
        </div>

        <!-- Main -->
        <div class="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <div class="bg-white shadow-2xl rounded-2xl px-8 py-12 sm:px-12 dark:bg-gray-800">
            <div class="text-center mb-8">
                <div
                class="mx-auto w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
                >
                <svg
                    class="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                </svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Iniciar Sesión
                </h1>
                <p class="text-gray-600 dark:text-gray-300">
                Accede a tu cuenta para continuar
                </p>
            </div>

            <!-- FORM -->
            <form @submit.prevent="login" class="space-y-6">
                <div>
                <label
                    for="email"
                    class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                    >Correo electrónico</label
                >
                <input
                    v-model="email"
                    type="email"
                    id="email"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-base"
                    placeholder="correo@ejemplo.com"
                />
                </div>

                <div>
                <label
                    for="password"
                    class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                    >Contraseña</label
                >
                <input
                    v-model="password"
                    type="password"
                    id="password"
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 text-gray-900 placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 text-base"
                    placeholder="Ingresa tu contraseña"
                />
                </div>

                <div class="flex items-center justify-between text-sm">
                <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
                >
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
                <a href="#" @click.prevent="goToRegister" class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">Regístrate aquí</a>
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    </template>

    <script setup>
    import axios from "axios";
    import { ref } from "vue";
    import { useRouter } from "vue-router";

    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const login = async () => {
    try {
        console.log("🟣 Enviando datos de login:", {
        correo: email.value,
        password: password.value,
        });

        const response = await axios.post(`${API_BASE_URL}/usuarios/login`, {
            correo: email.value,
            password: password.value,
        });

        console.log("🟢 Respuesta completa del backend:", response.data);
        console.log("🔍 Estructura de response.data:", Object.keys(response.data));

        // Intentar obtener el usuario y rol de diferentes maneras
        const usuario = response.data.data || response.data.usuario || response.data.user;
        let rol = usuario?.rol || usuario?.role || response.data.rol || response.data.role;

        console.log("👤 Usuario obtenido:", usuario);
        console.log("🎯 Rol detectado:", rol);
        console.log("🔍 Posibles roles en response.data:", {
            'response.data.rol': response.data.rol,
            'response.data.role': response.data.role,
            'response.data.usuario?.rol': response.data.usuario?.rol,
            'response.data.user?.rol': response.data.user?.rol
        });
        const userId= usuario?.idusuario || usuario?.id || response.data.idusuario || response.data.userId;
        localStorage.setItem("rol", rol);
        localStorage.setItem("idusuario", userId);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        console.log("💾 Rol guardado en localStorage:", localStorage.getItem("rol"));

        // Mostrar el alert primero
        alert("Bienvenido!!! 🎉");

        // Luego redirigir
        if(rol === 'empleado') {
            console.log("🔀 Redirigiendo a empleados...");
            router.push('/empleados');
        }
        else if(rol === 'empleador') {
            console.log("🔀 Redirigiendo a empleador dashboard...");
            router.push('/empleador/dashboard');
        }
        else {
            console.log("⚠️ Rol no reconocido:", rol);
            console.log("🔀 Redirigiendo a login por rol no válido...");
            router.push('/login');
        }
    } catch (error) {
        console.error("🔴 Error al iniciar sesión:", error.response?.data || error.message);
        alert("Error al iniciar sesión: " + (error.response?.data?.mensaje || error.message));
    }
    };

    const goToRegister = () => {
        router.push('/register');
    };
    </script>

    <style scoped>
    .login-container {
    display: flex !important;
    flex-direction: column !important;
    }

    @media (min-width: 1024px) {
    .login-container {
        grid-template-columns: none !important;
    }
    }
    </style>
