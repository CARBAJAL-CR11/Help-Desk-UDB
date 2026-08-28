<template>
  <div class="relative bg-white p-6 rounded-2xl shadow-sm flex flex-col items-start text-left border border-gray-100">
    
    <!-- Círculo de fondo con el número correlativo -->
    <div class="relative mb-4">
      <div class="w-12 h-12 bg-brand-700/60 rounded-full absolute -top-1 -left-2 z-0"></div>
      <span class="relative z-10 text-2xl font-extrabold text-brand-600 tracking-wider">
        {{ numero }}
      </span>
    </div>

    <div class="w-28 h-36 bg-gray-300 rounded-2xl mb-4 overflow-hidden mx-auto self-center">
      <img v-if="imagen" :src="imagen" :alt="nombre" class="w-full h-full object-cover"/>
    </div>
    <h3 class="text-lg font-bold text-brand-400 mb-2">
      {{ nombre }}
    </h3>
    <p class="text-xs font-semibold text-brand-400 mb-1">
      {{ correo }}
    </p>
    <p class="text-xs text-brand-800 leading-relaxed">
      {{ descripcion }}
    </p>

  </div>
</template>

<script setup>
defineProps({
  numero: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    default: "Sin descripción disponible."
  },
  imagen: {
    type: String,
    default: "https://picsum.photos/300/400"
  }
})
</script>