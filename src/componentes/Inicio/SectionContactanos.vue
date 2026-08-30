<template>
  <section class="w-full min-h-screen bg-brand-300 py-20 px-14 sm:px-20 md:px-24 lg:px-8 flex justify-center items-center">
    <div class="max-w-7xl mx-auto space-y-12">
      <!-- Encabezado Principal -->
      <div class="text-center space-y-5 mx-auto">
        <p class="text-brand-400 text-sm sm:text-base lg:text-lg font-medium">
          Atención Personalizada
        </p>
        <h2 class="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-brand-500 tracking-tight">
          ¿Necesitas ayuda directa o quieres conocer más sobre nosotros?
        </h2>
        <p class="text-brand-800 text-sm sm:text-base lg:text-lg font-medium lg:px-64">
          Descubre quiénes somos, nuestro compromiso con el cliente y cómo trabajamos para darte la mejor experiencia. Si tienes un problema específico o una consulta especial, envíanos un mensaje directo y nuestro equipo de soporte te responderá a la brevedad.
        </p>
        <div class="flex justify-center pt-2">
            <RouterLink 
            to="/sobre-nosotros" 
            class="inline-block bg-brand-400 hover:bg-brand-500 text-brand-50 font-medium text-sm sm:text-base px-6 py-2.5 rounded-full shadow-sm transition-all duration-200"
            >
            Conócenos y Contáctanos
            </RouterLink>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>

