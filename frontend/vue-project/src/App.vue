<script setup>
import { ref } from 'vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

const currentView = ref('login')

const showLogin = () => {
  currentView.value = 'login'
}

const showRegister = () => {
  currentView.value = 'register'
}
</script>

<template>
  <Login v-if="currentView === 'login'" @goToRegister="showRegister" />
  <Register v-if="currentView === 'register'" @goToLogin="showLogin" />
</template>

