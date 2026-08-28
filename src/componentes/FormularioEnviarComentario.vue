<template>
  <div class="mt-10 max-w-sm lg:max-w-4xl mx-auto">
    <div class="bg-brand-800 rounded-3xl overflow-hidden shadow-xl border flex flex-col lg:flex-row"> 
      
      <!-- Cabecera: se redujo py-10 a py-6 para quitar espacio vertical libre -->
      <div class="bg-brand-600 px-6 py-6 text-center flex flex-col justify-center rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl lg:w-1/2">
        <h2 class="text-xl font-bold text-brand-50 mb-2">
          Contactanos
        </h2>
        <p class="text-[10px] text-brand-50 leading-relaxed max-w-xs mx-auto">
          Si necesitas comunicarte con un asesor sobre un problema mas especifico, puedes enviar tus datos y con gusto te escribiremos
        </p>
      </div>

      <!-- Formulario: se cambió p-8 por p-5, space-y-4 por space-y-2.5, y el padding de los inputs de py-3 a py-2 -->
      <form @submit.prevent class="p-5 space-y-2.5 lg:w-1/2 flex flex-col justify-center">
        <div>
          <input type="text" placeholder="Nombre Completo" class="w-full bg-brand-800 text-brand-50 text-xs px-3 py-2 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
        </div>
        <div>
          <input type="tel" placeholder="Teléfono" class="w-full bg-brand-800 text-brand-50 text-xs px-3 py-2 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
        </div>
        <div>
          <input type="email" placeholder="Correo Electrónico" class="w-full bg-brand-800 text-brand-50 text-xs px-3 py-2 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
        </div>
        <div>
          <textarea rows="2" placeholder="Comentanos tu problema" class="w-full bg-brand-800 text-brand-50 text-xs px-3 py-2 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors resize-none"></textarea>
        </div>
        <div class="pt-1">
          <button type="submit" class="w-full bg-brand-300 hover:bg-brand-400 text-brand-50 font-bold text-xs tracking-wider py-2.5 px-6 rounded-full transition-colors uppercase">Enviar</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
</script>