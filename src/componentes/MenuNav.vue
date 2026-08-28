<template>
    <nav class="bg-slate-900 border-b border-indigo-900/50 shadow-lg text-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo / Marca -->
        <div class="flex-shrink-0 flex items-center space-x-2">
          <RouterLink to="/" class="p-1.5 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-lg">

            <IconCloudFog class="h-6 w-6 text-white" />


            
          </RouterLink>
          <span class="font-bold text-xl bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
            Help Desk
          </span>
        </div>

        <!-- Enlaces Escritorio -->
        <div class="hidden md:flex space-x-2">
          <RouterLink to="/" class="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
            <IconHome class="w-5 h-5 text-violet-400" />
            <span>Inicio</span>
          </RouterLink>

          <RouterLink to="/chat-soporte" class="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
            <IconMessageChatbot class="w-5 h-5 text-violet-400" />
            <span>Chat de Soporte</span>
          </RouterLink>

          <RouterLink to="/preguntas-frecuentes" class="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
            <IconHelpCircle class="w-5 h-5 text-violet-400" />
            <span>Problemas Comunes</span>
          </RouterLink>

          <RouterLink to="/sobre-nosotros" class="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200">
            <IconInfoCircle class="w-5 h-5 text-violet-400" />
            <span>Sobre Nosotros</span>
          </RouterLink>
        </div>

        <!-- Botón Menú Móvil -->
        <div class="md:hidden flex items-center">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="text-slate-300 hover:text-white hover:bg-violet-900/40 p-2 rounded-lg focus:outline-none transition-colors"
          >
            <IconMenu2 v-if="!isMenuOpen" class="w-6 h-6" />
            <IconX v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Menú Desplegable Móvil -->
    <div v-if="isMenuOpen" class="md:hidden bg-slate-900/95 border-b border-indigo-900/50 px-4 pt-2 pb-4 space-y-1 backdrop-blur-sm">
      <RouterLink to="/" class="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-base font-medium transition-colors">
        <IconHome class="w-5 h-5 text-violet-400" />
        <span>Inicio</span>
      </RouterLink>

      <RouterLink to="/chat-soporte" class="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-base font-medium transition-colors">
        <IconMessageChatbot class="w-5 h-5 text-violet-400" />
        <span>Chat de Soporte</span>
      </RouterLink>

      <RouterLink to="/preguntas-frecuentes" class="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-base font-medium transition-colors">
        <IconHelpCircle class="w-5 h-5 text-violet-400" />
        <span>Problemas Comunes</span>
      </RouterLink>

      <RouterLink to="/sobre-nosotros" class="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-violet-900/40 px-3 py-2 rounded-lg text-base font-medium transition-colors">
        <IconInfoCircle class="w-5 h-5 text-violet-400" />
        <span>Sobre Nosotros</span>
      </RouterLink>
    </div>
  </nav>

</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import { 
  IconHome, 
  IconMessageChatbot, 
  IconHelpCircle, 
  IconInfoCircle, 
  IconMenu2, 
  IconX,
  IconCloudFog 
} from '@tabler/icons-vue'

const isMenuOpen = ref(false)
</script>