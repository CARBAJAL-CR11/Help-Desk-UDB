<template>
  <div v-if="abierto" class="fixed inset-0 w-screen h-screen bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
    <div class="bg-gray-900 border border-gray-800 text-gray-100 rounded-2xl max-w-xl w-full p-5 shadow-2xl space-y-4">
      <div class="flex justify-between items-center border-b border-gray-800 pb-3">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-brand-500 rounded flex items-center justify-center text-xs font-bold text-white">T</div>
          <div>
            <h4 class="text-sm font-bold text-white">Seleccionar Ícono</h4>
            <p class="text-[10px] text-gray-400">Catálogo completo de Tabler Icons</p>
          </div>
        </div>
        <button type="button" @click="$emit('cerrar')" class="text-gray-400 hover:text-white text-lg font-bold px-1">
          <IconCircleX/>
        </button>
      </div>
      <div class="relative">
        <input 
          v-model="filtro" 
          type="text" 
          placeholder="Buscar ícono (ej. user, cart, error, settings)..." 
          class="w-full bg-gray-800 text-white text-xs px-3.5 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-brand-500"
        />
      </div>
      <div class="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-64 overflow-y-auto pr-1">
        <button 
          v-for="nombreIcono in iconosFiltrados" 
          :key="nombreIcono"
          type="button"
          @click="seleccionar(nombreIcono)"
          :class="iconoSeleccionado === nombreIcono ? 'bg-brand-500 text-white border-brand-400 scale-105' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'"
          class="p-2.5 rounded-lg border flex items-center justify-center transition-all aspect-square"
          :title="nombreIcono"
        >
          <component :is="TablerIcons[nombreIcono]" class="w-5 h-5"/>
        </button>
      </div>
      <div class="flex justify-between items-center pt-2 text-[11px] text-gray-500 border-t border-gray-800">
        <span>Selecciona un ícono para asignarlo</span>
        <button type="button" @click="$emit('cerrar')" class="text-brand-400 hover:underline">
          Cancelar
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as TablerIcons from '@tabler/icons-vue'

const props = defineProps({
  abierto: {
    type: Boolean,
    default: false
  },
  iconoSeleccionado: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['cerrar', 'seleccionar'])

const filtro = ref('')

// Obtenemos los nombres de todos los íconos de Tabler Icons
const todosLosIconos = Object.keys(TablerIcons).filter(key => key.startsWith('Icon'))

// Filtramos dinámicamente para no saturar el DOM
const iconosFiltrados = computed(() => {
  if (!filtro.value) {
    return todosLosIconos.slice(0, 120)
  }
  return todosLosIconos
    .filter(nombre => nombre.toLowerCase().includes(filtro.value.toLowerCase()))
    .slice(0, 150)
})

const seleccionar = (nombre) => {
  emit('seleccionar', nombre)
  emit('cerrar')
}
</script>