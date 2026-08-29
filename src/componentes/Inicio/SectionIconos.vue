<template>
  <section class="bg-brand-700 min-h-screen py-20 px-14 sm:px-20 md:px-24 lg:px-8">
    <div class="max-w-7xl mx-auto flex flex-col items-center">
      
      <!-- Encabezado Principal -->
      <div class="text-center space-y-3 max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-400 tracking-tight leading-tight sm:leading-snug">
          ¿Tienes dudas o necesitas asistencia? Resolver tus consultas es muy fácil
        </h2>
        <p class="text-brand-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-normal">
          Conoce el paso a paso para encontrar respuestas inmediatas o conectar directamente con nuestro chat de soporte técnico.
        </p>
      </div>

      <!-- Contenedor de iconos con contenido -->
      <div class="w-full max-w-lg lg:max-w-6xl">
        <div class="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          
          <div class="hidden lg:block absolute top-[30px] left-[15%] right-[15%]">
            <div class="grid grid-cols-2 gap-12 w-full">
              <!-- Línea entre Paso 1 y Paso 2 -->
              <div class="flex justify-center items-center">
                <img 
                  src="../../recursos/imgs/LineasSection.png" 
                  alt="Línea decorativa 1" 
                  class="w-full h-auto max-h-24 scale-75 scale-x-50"
                />
              </div>
              <!-- Línea entre Paso 2 y Paso 3 -->
              <div class="flex justify-center items-center">
                <img 
                  src="../../recursos/imgs/LineasSection.png" 
                  alt="Línea decorativa 2" 
                  class="w-full h-auto max-h-24 scale-75 scale-x-50"
                />
              </div>
            </div>
          </div>

          <!-- Icono 1 -->
          <div class="relative z-10 flex flex-row lg:flex-col items-center text-center max-w-sm md:max-w-md lg:max-w-xs gap-4 sm:gap-6 lg:gap-0">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-100 flex items-center justify-center text-brand-400 mb-0 lg:mb-6 flex-shrink-0 shadow-sm">
              <IconZoomQuestion class="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
            </div>

            <div class="space-y-2 text-left lg:text-center">
              <h3 class="text-lg sm:text-xl font-semibold text-brand-400">
                Explora tus Dudas
              </h3>
              <p class="text-brand-600 text-xs sm:text-sm leading-relaxed">
                Navega por nuestras preguntas frecuentes y guías explicativas para identificar rápida y fácilmente la solución a tu requerimiento.
              </p>
            </div>
          </div>

          <!-- Linea para tablets y mobiles -->
          <div class="relative z-10 flex flex-row rotate-90 lg:hidden items-center max-w-xs py-10">
                <img 
                  src="../../recursos/imgs/LineasSection.png" 
                  alt="Línea decorativa 2" 
                  class="w-full h-auto max-h-24 scale-100 scale-x-50"
                />
          </div>

          <!-- Icono 2 -->
          <div class="relative z-10 flex flex-row-reverse lg:flex-col items-center text-center max-w-sm md:max-w-md lg:max-w-xs gap-4 sm:gap-6 lg:gap-0">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-100 flex items-center justify-center text-brand-400 mb-0 lg:mb-6 flex-shrink-0 shadow-sm">
              <IconClock class="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
            </div>

            <div class="space-y-2 text-left lg:text-center">
              <h3 class="text-lg md:text-xl font-semibold text-brand-400">
                Asistencia 24/7
              </h3>
              <p class="text-brand-600 text-xs sm:text-sm leading-relaxed">
                Consulta la información en cualquier momento o inicia una conversación sin largas esperas directamente en nuestra plataforma.
              </p>
            </div>
          </div>


          <!-- Linea 2 para tablets y mobiles -->
          <div class="relative z-10 flex flex-row rotate-90 lg:hidden items-center max-w-xs py-10">
                <img 
                  src="../../recursos/imgs/LineasSection.png" 
                  alt="Línea decorativa 2" 
                  class="w-full h-auto max-h-24 scale-100 scale-x-50"
                />
          </div>

          <!-- Icono 3 -->
          <div class="relative z-10 flex flex-row lg:flex-col items-center text-center max-w-sm md:max-w-md lg:max-w-xs gap-4 sm:gap-6 lg:gap-0">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-100 flex items-center justify-center text-brand-400 mb-0 lg:mb-6 flex-shrink-0 shadow-sm">
              <IconMessage2Check class="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
            </div>

            <div class="space-y-2 text-left lg:text-center">
              <h3 class="text-lg sm:text-xl font-semibold text-brand-400">
                Conecta y Resuelve
              </h3>
              <p class="text-brand-600 text-xs sm:text-sm leading-relaxed">
                Inicia un chat en vivo con nuestro agente de soporte para recibir respuestas claras, personalizadas y resolver tu problema al instante.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>


<script setup>
</script>