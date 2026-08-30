<template>
  <div class="mt-10 max-w-sm lg:max-w-4xl mx-auto">
    <!-- El contenedor principal mantiene el overflow-hidden para recortar las burbujas solo en las esquinas exteriores -->
    <div class="bg-brand-800 rounded-3xl overflow-hidden shadow-xl border flex flex-col lg:flex-row"> 
        
        <!-- Panel de Encabezado -->
        <div class="relative bg-brand-600 px-6 py-8 lg:px-10 lg:pt-12 lg:pb-16 text-center flex flex-col justify-center rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl lg:w-1/2 min-h-[160px]">
            
            <!-- Texto con z-10 para estar por encima de los fondos -->
            <div class="relative z-10">
              <h2 class="text-xl lg:text-3xl font-bold text-brand-50 mb-3">Contactanos</h2>
              <p class="text-[10px] lg:text-sm font-medium text-brand-50 leading-relaxed max-w-xs mx-auto">
                  Si necesitas comunicarte con un asesor sobre un problema mas especifico, puedes enviar tus datos y con gusto te escribiremos
              </p>
            </div>

            <!-- BURBUJAS DECORATIVAS (Tus posiciones exactas aisladas para desktop) -->
            <!-- Círculo interior más pequeño -->
            <div class="absolute lg:right-10 lg:-bottom-0 w-24 h-24 lg:w-24 lg:h-24 bg-white/15 rounded-full pointer-events-none z-0"></div>

            <!-- Círculo exterior más grande que sobrepasa la división central -->
            <div class="absolute -right-6 lg:-right-20 -bottom-10 lg:-bottom-28 w-36 h-36 lg:w-48 lg:h-48 bg-white/10 rounded-full pointer-events-none z-0"></div>

        </div>

        <!-- Formulario: Respiro inferior ampliado con lg:pb-16 y padding superior/lateral controlado -->
        <form @submit.prevent class="relative z-10 p-5 lg:pt-10 lg:px-10 lg:pb-24 space-y-2.5 lg:space-y-4 lg:w-1/2 flex flex-col justify-center">
            <div>
                <input type="text" placeholder="Nombre Completo" class="w-full bg-brand-800 text-brand-50 text-xs px-3.5 py-2 lg:py-2.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
            </div>
            <div>
                <input type="tel" placeholder="Teléfono" class="w-full bg-brand-800 text-brand-50 text-xs px-3.5 py-2 lg:py-2.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
            </div>
            <div>
                <input type="email" placeholder="Correo Electrónico" class="w-full bg-brand-800 text-brand-50 text-xs px-3.5 py-2 lg:py-2.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
            </div>
            <div>
                <textarea rows="2" placeholder="Comentanos tu problema" class="w-full bg-brand-800 text-brand-50 text-xs px-3.5 py-2 lg:py-2.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors resize-none"></textarea>
            </div>
            <div class="pt-1">
                <button type="submit" class="w-full bg-brand-300 hover:bg-brand-400 text-brand-50 font-bold text-xs tracking-wider py-2.5 lg:py-3 px-6 rounded-full transition-colors uppercase">Enviar</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
</script>