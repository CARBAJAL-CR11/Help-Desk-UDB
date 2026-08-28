<template>
  <!-- HeroBanner diseño en Componente  -->
  <section class="w-full min-h-[calc(100vh-80px)] bg-gradient-to-b lg:bg-gradient-to-r from-brand-400 via-brand-400 to-brand-100 text-brand-50 py-12 px-6 sm:px-12 lg:px-20 flex items-center justify-center">
    <div class="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
      
      <!-- Contenido de Texto y Botón -->
      <div class="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl space-y-6">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          Soporte Técnico
        </h1>
        
        <p class="text-brand-100/90 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-md">
          Asistencia rápida y personalizada para cualquier inconveniente con tus servicios.
        </p>

        <RouterLink 
          to="/chat-soporte"
          class="inline-block bg-brand-50 text-brand-500 font-semibold px-8 py-3.5 rounded-full shadow-md hover:bg-brand-100 transition-all duration-200 hover:shadow-lg"
        >
          Iniciar chat ahora
        </RouterLink>
      </div>

      <!-- Imagen del Manual -->
      <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg flex justify-center items-center">
        <img 
          src="../recursos/imgs/Manual.png" 
          alt="Manual Help Desk" 
          class="w-full h-auto object-contain drop-shadow-xl hover:scale-102 transition-transform duration-300"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>