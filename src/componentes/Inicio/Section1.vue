<template>
  <section class="bg-brand-700 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto space-y-12">
      
      <!-- Encabezado Principal -->
      <div class="text-center space-y-3 max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-brand-400 tracking-tight">
          ¿Cómo podemos ayudarte?
        </h1>
        <p class="text-brand-600 text-sm sm:text-lg ">
          ¡Le brindamos la solución a tus problemas! Puedes buscar entre los problemas más frecuentes o tener una asistencia personalizada con nuestro equipo de soporte.
        </p>
      </div>

      <!-- Divisor -->
      <div class="border-t-2 border-brand-200/60 max-w mx-auto"></div>

      <!-- Contenido de Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        
        <!-- Chat de Soporte -->
        <div class="flex flex-col justify-between space-y-6 text-center lg:text-left">
          <div class="space-y-4">
            <h2 class="text-2xl sm:text-3xl font-bold text-brand-400">
              Chat de Soporte
            </h2>
            <p class="text-brand-600 text-sm sm:text-base">
              Conéctate al instante con nuestro equipo de asistencia. Resuelve inconvenientes técnicos o consultas específicas en tiempo real.
            </p>
            <div class="flex justify-center lg:justify-start pt-2">
              <RouterLink 
                to="/chat-soporte" 
                class="inline-block bg-brand-400 hover:bg-brand-500 text-brand-50 font-medium text-sm sm:text-base px-6 py-2.5 rounded-full shadow-sm transition-all duration-200"
              >
                Ir al chat de soporte
              </RouterLink>
            </div>
          </div>
          <img 
              src="../../recursos/imgs/ChatSoporte.png" 
              alt="Chat de Soporte" 
              class="max-w-full h-auto object-contain drop-shadow-md hover:scale-102 transition-transform duration-300" 
              />
        </div>

        <!-- Problemas Frecuentes y Guías -->
        <div class="flex flex-col justify-between space-y-6 text-center lg:text-left">
          <div class="space-y-4">
            <h2 class="text-2xl sm:text-3xl font-bold text-brand-400">
              Problemas Frecuentes y Guías
            </h2>
            <p class="text-brand-600 text-sm sm:text-base leading-relaxed">
              Encuentra soluciones paso a paso para los errores más comunes. Tutoriales interactivos diseñados para que resuelvas cualquier duda a tu propio ritmo.
            </p>
            <div class="flex justify-center lg:justify-start pt-2">
              <RouterLink 
                to="/preguntas-frecuentes" 
                class="inline-block bg-brand-400 hover:bg-brand-500 text-brand-50 font-medium text-sm sm:text-base px-6 py-2.5 rounded-full shadow-sm transition-all duration-200"
              >
                Ir a ver ahora
              </RouterLink>
            </div>
          </div>
          <img 
              src="../../recursos/imgs/Placeholder.png"  
              alt="Problemas Frecuentes y Guías" 
              class="max-w-full h-auto object-contain drop-shadow-md hover:scale-102 transition-transform duration-300" 
              />
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
</script>