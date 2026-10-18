<template>
	<div class="flex flex-col h-full bg-gray-200 relative overflow-hidden">
		<div
			class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]">
		</div>
		<!-- Cabecera de chat de soporte -->
		<div
			class="relative z-10 flex items-center justify-between px-6 py-3.5 bg-white border-b border-gray-200 shadow-xs">
			<div class="flex items-center gap-3">
				<!-- Avatar / Inicial -->
				<div
					class="w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
					{{ inicialUsuario }}
				</div>
				<div>
					<h3 class="text-sm font-bold text-gray-800">
						{{ chatActivo?.usuario || 'Selecciona un chat' }}
					</h3>
					<p class="text-[11px] text-gray-400 font-mono">
						Sesión: {{ chatActivo?.sessionId || 'N/A' }}
					</p>
				</div>
			</div>
			<!-- Burbuja de estado del chat -->
			<div class="flex items-center gap-2">
				<span v-if="chatActivo.estado"
					class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 ">
					Activo
				</span>
				<span v-else="chatActivo.estado"
					class="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 ">
					Inactivo
				</span>
			</div>
		</div>
		<!-- Contenido de mensajes del chat -->
		<div class="relative z-10 flex-1 overflow-y-auto p-6 space-y-2">
			<!-- Si no hay, se muestra mensaje por defecto -->
			<div v-if="!chatActivo?.mensajes || chatActivo.mensajes.length === 0" class="flex justify-center my-6">
				<span class="bg-white/80 border border-gray-200 text-gray-500 text-xs px-4 py-1.5 rounded-lg shadow-xs">
					No hay mensajes en esta sesión todavía.
				</span>
			</div>
			<!-- Componente destinado a la carga de cada mensaje -->
			<BurbujaMensaje v-for="msg in chatActivo?.mensajes" :key="msg.id" :mensaje="msg" />
		</div>
		<!-- Contenedor de inserción de mensajes -->
		<div class="relative z-10 px-6 py-3 bg-white border-t border-gray-200 flex items-center gap-3">
			<input type="text" placeholder="Escribe un mensaje..."
				class="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:bg-white transition-all" />
			<button type="button"
				class="flex items-center justify-center p-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors shadow-xs"
				title="Enviar mensaje">
				<IconSend class="w-5 h-5" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import BurbujaMensaje from '@/componentes/administrador/BurbujaMensaje.vue'

const props = defineProps({
	chatActivo: {
		type: Object,
		default: null
	}
})

// obtener la inicial del usuario actual para el avatar de la cabecera
const inicialUsuario = computed(() => {
	if (!props.chatActivo?.usuario) return '?'
	return props.chatActivo.usuario.charAt(0).toUpperCase()
})
</script>