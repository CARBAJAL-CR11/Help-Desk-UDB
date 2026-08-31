<template>
  <div class="mt-10 max-w-sm md:max-w-xl lg:max-w-4xl mx-auto">
    <div class="bg-brand-800 rounded-3xl overflow-hidden shadow-xl border flex flex-col lg:flex-row"> 
        <div class="relative bg-brand-600 px-6 py-8 lg:px-10 lg:pt-12 lg:pb-16 text-center flex flex-col justify-center rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl lg:w-1/2 min-h-[160px]">
            <h2 class="text-2xl lg:text-3xl font-bold text-brand-50 mb-3">Contáctanos</h2>
            <p class="text-xs lg:text-sm font-bold text-brand-50 leading-relaxed max-w-xs mx-auto">Si necesitas comunicarte con un asesor sobre un problema mas especifico, puedes enviar tus datos y con gusto te escribiremos</p>
            <div class="absolute bottom-4 -right-4 lg:right-10 lg:-bottom-0 w-24 h-24 lg:w-24 lg:h-24 bg-brand-50/15 rounded-full pointer-events-none z-0"></div>
            <div class="absolute -bottom-16 -right-20 lg:-right-20 lg:-bottom-28 w-36 h-36 lg:w-48 lg:h-48 bg-brand-50/10 rounded-full pointer-events-none z-0"></div>
        </div>
        <form class="py-5 px-10 md:px-32 md:py-10 lg:pt-16 lg:px-16 lg:pb-24 space-y-3 lg:space-y-4 lg:w-1/2 flex flex-col justify-center">
            <div class="relative">
                <input type="text" id="nombre" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
                <label for="nombre" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Nombre Completo</label>
            </div>
            <div class="relative">
                <input type="tel" id="telefono" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
                <label for="telefono" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Teléfono</label>
            </div>
            <div class="relative">
                <input type="email" id="email" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
                <label for="email" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Correo Electrónico</label>
            </div>
            <div class="relative">
                <textarea id="problema" rows="2" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors resize-none"></textarea>
                <label for="problema" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Coméntanos tu problema</label>
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