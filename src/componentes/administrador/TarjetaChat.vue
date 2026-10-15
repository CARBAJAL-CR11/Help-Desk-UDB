<template>
  <div 
    @click="$emit('seleccionar')"
    :class="[
      'flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-150 border select-none',
      activo 
        ? 'bg-brand-50/80 border-brand-200 shadow-xs' 
        : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'
    ]">
    <div class="relative flex-shrink-0">
      <div 
        :class="[
          'w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-xs border',
          activo 
            ? 'bg-brand-500 text-white border-brand-400' 
            : 'bg-gray-100 text-gray-500 border-gray-200'
        ]"
      >
        {{ inicialUsuario }}
      </div>
      <span 
        v-if="chat.estado === 'activo'"
        class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
        title="Chat activo"
      ></span>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-1 mb-1">
        <h4 
          :class="[
            'text-sm truncate font-semibold',
            activo ? 'text-brand-900' : 'text-gray-800'
          ]"
        >
          {{ chat.usuario || 'Invitado' }}
        </h4>
        <span class="text-[11px] text-gray-400 flex-shrink-0">
          {{ horaFormateada }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-2">
        <p class="text-xs text-gray-500 truncate">
          {{ ultimoMensajeTexto }}
        </p>
        <span 
          v-if="chat.estado"
          :class="[
            'text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize whitespace-nowrap',
            chat.estado === 'activo' 
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
              : 'bg-gray-100 text-gray-500 border border-gray-200'
          ]"
        >
          {{ chat.estado }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  chat: {
    type: Object,
    required: true
  },
  activo: {
    type: Boolean,
    default: false
  }
})

defineEmits(['seleccionar'])

const inicialUsuario = computed(() => {
  if (!props.chat?.usuario) return 'U'
  return props.chat.usuario.charAt(0).toUpperCase()
})

const ultimoMensajeTexto = computed(() => {
  const mensajes = props.chat?.mensajes
  if (!mensajes || mensajes.length === 0) return 'Sin mensajes aún'
  return mensajes[mensajes.length - 1].texto
})

// formatear la hora del último mensaje
const horaFormateada = computed(() => {
  const mensajes = props.chat?.mensajes
  const timestamp = mensajes?.length 
    ? mensajes[mensajes.length - 1].timestamp 
    : props.chat?.creadoEn

  if (!timestamp) return ''

  try {
    const fecha = new Date(timestamp)
    if (isNaN(fecha.getTime())) return timestamp 
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch (e) {
    return ''
  }
})
</script>