<template>
  <div v-if="abierto" class="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-opacity">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4">
    <div class="flex justify-between items-center border-b border-gray-100 pb-3">
        <h3 class="text-lg font-bold text-gray-800">
          {{ titulo }}
        </h3>
        <button type="button" @click="$emit('cerrar')" class="text-gray-400 hover:text-gray-600 transition-colors text-lg font-bold px-1">
          <IconCircleX/>
        </button>
      </div>

      <div class="py-2">
        <slot />
      </div>

      <div class="flex justify-end gap-3 pt-3 border-t border-gray-100">
        <button type="button" @click="$emit('cerrar')" class="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors">Cancelar
        </button>
        <button type="button" @click="$emit('guardar')" class="px-4 py-2 text-sm bg-brand-500 hover:bg-brand-400 text-brand-50 font-semibold rounded-lg transition-colors shadow-sm">Guardar</button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  abierto: {
    type: Boolean,
    default: false
  },
  titulo: {
    type: String,
    default: 'Título del Modal'
  }
})

defineEmits(['cerrar', 'guardar'])
</script>