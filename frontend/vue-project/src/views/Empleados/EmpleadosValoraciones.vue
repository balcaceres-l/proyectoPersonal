<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Navigation -->
        <NavBar :user-name="currentUser.name" />

        
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'

// Data
const currentUser = ref({
    name: 'Juan Pérez',
    email: 'juan.perez@email.com'
})


</script>