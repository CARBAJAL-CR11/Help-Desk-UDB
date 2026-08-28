<template>
  <!-- Navbar principal -->
  <nav class="bg-brand-50 border-b border-brand-100 shadow-sm relative z-30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo / Marca -->
        <RouterLink to="/" class="flex items-center gap-2 text-brand-500 font-bold text-xl">
          <IconMessageCode class="w-8 h-8 text-brand-500 stroke-[2]" />
          <span class="text-brand-500 font-bold text-xl tracking-tight">Help Desk</span>
        </RouterLink>

        <!-- Enlaces Escritorio / Tablet (Pantallas Medianas y Grandes) -->
        <div class="hidden md:flex items-center space-x-1 sm:space-x-2">
          <RouterLink 
            to="/" 
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="$route.path === '/' ? 'bg-brand-400 text-brand-50 hover:bg-brand-500 hover:text-gray-100' : 'text-brand-600 hover:text-brand-500'"
          >
            Inicio
          </RouterLink>

          <RouterLink 
            to="/chat-soporte" 
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="$route.path === '/chat-soporte' ? 'bg-brand-400 text-brand-50 hover:bg-brand-500 hover:text-gray-100' : 'text-brand-600 hover:text-brand-500'"
          >
            Soporte Técnico
          </RouterLink>

          <RouterLink 
            to="/preguntas-frecuentes" 
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="$route.path === '/preguntas-frecuentes' ? 'bg-brand-400 text-brand-50 hover:bg-brand-500 hover:text-gray-100' : 'text-brand-600 hover:text-brand-500'"
          >
            Preguntas Frecuentes
          </RouterLink>

          <RouterLink 
            to="/sobre-nosotros" 
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            :class="$route.path === '/sobre-nosotros' ? 'bg-brand-400 text-brand-50 hover:bg-brand-500 hover:text-gray-100' : 'text-brand-600 hover:text-brand-500'"
          >
            Contáctanos
          </RouterLink>
        </div>

        <!-- Botón Menú Móvil (Solo visible en Móvil) -->
        <div class="md:hidden flex items-center">
          <button 
            @click="isMenuOpen = true"
            class="text-brand-500 p-2 rounded-lg focus:outline-none hover:bg-brand-100 transition-colors"
          >
            <IconMenu2 class="w-7 h-7" />
          </button>
        </div>

      </div>
    </div>
  </nav>

  <!-- Backdrop / Fondo oscuro al abrir sidebar móvil -->
  <Transition name="fade">
    <div 
      v-if="isMenuOpen" 
      @click="isMenuOpen = false" 
      class="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
    ></div>
  </Transition>

  <!-- Side-Bar Desplegable Móvil -->
  <Transition name="slide">
    <aside 
      v-if="isMenuOpen" 
      class="fixed top-0 right-0 h-full w-64 bg-brand-200 z-50 p-6 flex flex-col justify-start md:hidden shadow-2xl"
    >
      <!-- Cabecera del Sidebar con Título y Botón Cerrar (chevron) -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-white text-2xl font-bold tracking-wide">Navegación</h2>
        <button 
          @click="isMenuOpen = false" 
          class="bg-brand-50 text-brand-500 p-1.5 rounded-xl shadow-md hover:scale-105 transition-transform flex items-center justify-center"
        >
          <IconChevronRight class="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      <!-- Menú de Enlaces Móvil -->
      <div class="flex flex-col space-y-3">
        <RouterLink 
          to="/" 
          @click="isMenuOpen = false"
          class="w-full py-3 px-5 rounded-2xl font-semibold text-center transition-all duration-200 shadow-xs"
          :class="$route.path === '/' ? 'bg-brand-400 text-brand-50' : 'bg-brand-50 text-brand-500 hover:bg-brand-100'"
        >
          Inicio
        </RouterLink>

        <RouterLink 
          to="/chat-soporte" 
          @click="isMenuOpen = false"
          class="w-full py-3 px-5 rounded-2xl font-semibold text-center transition-all duration-200 shadow-xs"
          :class="$route.path === '/chat-soporte' ? 'bg-brand-400 text-brand-50' : 'bg-brand-50 text-brand-500 hover:bg-brand-100'"
        >
          Soporte Técnico
        </RouterLink>

        <RouterLink 
          to="/preguntas-frecuentes" 
          @click="isMenuOpen = false"
          class="w-full py-3 px-5 rounded-2xl font-semibold text-center transition-all duration-200 shadow-xs"
          :class="$route.path === '/preguntas-frecuentes' ? 'bg-brand-400 text-brand-50' : 'bg-brand-50 text-brand-500 hover:bg-brand-100'"
        >
          Preguntas Frecuentes
        </RouterLink>

        <RouterLink 
          to="/sobre-nosotros" 
          @click="isMenuOpen = false"
          class="w-full py-3 px-5 rounded-2xl font-semibold text-center transition-all duration-200 shadow-xs"
          :class="$route.path === '/sobre-nosotros' ? 'bg-brand-400 text-brand-50' : 'bg-brand-50 text-brand-500 hover:bg-brand-100'"
        >
          Contáctanos
        </RouterLink>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const $route = useRoute()
</script>

<style scoped>
/* Transición Deslizante del Sidebar */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Transición del Fondo Opaco */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>