<template>
	<div class="flex flex-col h-full bg-gray-200 relative overflow-hidden">
		<div
			class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]">
		</div>

		<!-- Cabecera de chat de soporte -->
		<div
			class="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-gray-200 shadow-xs">
			<div class="flex items-center gap-3">
				<!-- Botón Volver solo visible en móviles/tablets (< md) -->
				<button type="button"
					class="md:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
					title="Volver a la lista de chats" @click="$emit('volver')">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				<!-- Avatar / Inicial -->
				<div
					class="w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-sm shadow-xs flex-shrink-0">
					{{ inicialUsuario }}
				</div>

				<div class="min-w-0">
					<h3 class="text-sm font-bold text-gray-800 truncate">
						{{ chatActivo?.usuario || 'Invitado' }}
					</h3>
					<p class="text-[11px] text-gray-400 font-mono truncate">
						Sesión: {{ chatActivo?.sessionId || 'N/A' }}
					</p>
				</div>
			</div>

			<!-- Burbuja de estado -->
			<div class="flex items-center gap-2 flex-shrink-0">
				<span v-if="chatActivo?.estado"
					class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
					Activo
				</span>
				<span v-else
					class="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
					Inactivo
				</span>
			</div>
		</div>

		<!-- Contenido de mensajes -->
		<div ref="contenedorMensajes" class="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
			<div v-if="!chatActivo?.mensajes || chatActivo.mensajes.length === 0" class="flex justify-center my-6">
				<span class="bg-white/80 border border-gray-200 text-gray-500 text-xs px-4 py-1.5 rounded-lg shadow-xs">
					No hay mensajes en esta sesión todavía.
				</span>
			</div>

			<BurbujaMensaje v-for="msg in chatActivo?.mensajes" :key="msg.id || msg.timestamp" :mensaje="msg" />
		</div>

		<!-- Contenedor de inserción de mensajes -->
		<div class="relative z-10 px-4 sm:px-6 py-3 bg-white border-t border-gray-200 flex items-center gap-3">
			<input v-model="nuevoMensaje" type="text" placeholder="Escribe una respuesta como soporte..."
				:disabled="enviando || !chatActivo?.estado"
				class="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:bg-white transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
				@keydown.enter="enviarRespuestaAdmin" />
			<button type="button" :disabled="enviando || !nuevoMensaje.trim() || !chatActivo?.estado"
				class="flex items-center justify-center p-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
				title="Enviar mensaje" @click="enviarRespuestaAdmin">
				<component :is="'IconSend'" v-if="!enviando" class="w-5 h-5" />
				<span v-else
					class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import axios from 'axios'
import BurbujaMensaje from '@/componentes/administrador/BurbujaMensaje.vue'

const apiBase = 'http://localhost:3000/api'

// Propiedades que espera del componente padre (recibe el obj de un chat completo)
const props = defineProps({
	chatActivo: {
		type: Object,
		default: null
	}
})

// Emit: lo que hace es activar un método o función de un componente padre desde el hijo
const emit = defineEmits(['mensajeEnviado', 'volver'])

// Variables reactivas
const nuevoMensaje = ref('')
const enviando = ref(false)
const contenedorMensajes = ref(null)

// Método para encontrar la incial de usuario
const inicialUsuario = computed(() => {
	if (!props.chatActivo?.usuario) return '?'
	return props.chatActivo.usuario.charAt(0).toUpperCase()
})

// Scroll automático suave hacia el fondo
const hacerScrollAlFondo = () => {
	nextTick(() => {
		if (contenedorMensajes.value) {
			contenedorMensajes.value.scrollTo({
				top: contenedorMensajes.value.scrollHeight,
				behavior: 'smooth'
			})
		}
	})
}

// Vigilar los mensajes del chat activo; si cambia la longitud, baja el scroll
watch(
	() => props.chatActivo?.mensajes?.length,
	() => {
		hacerScrollAlFondo()
	},
	{ immediate: true }
)

// Método para enviar un mensaje y subirlo con un post
const enviarRespuestaAdmin = async () => {
	const texto = nuevoMensaje.value.trim()
	// Validación de campo vacio
	if (!texto || !props.chatActivo || enviando.value) return

	enviando.value = true

	try {
		const res = await axios.get(`${apiBase}/chats/${props.chatActivo.id}`)
		const chatServidor = res.data

		// Calcular el siguiente ID incremental
		const ultimoId = (chatServidor.mensajes || []).reduce(
			(max, m) => Math.max(max, Number(m.id) || 0), 0
		)

		const mensajeNuevoObj = {
			id: ultimoId + 1,
			emisor: 'admin',
			texto: texto,
			timestamp: new Date().toISOString()
		}

		const mensajesActualizados = [...(chatServidor.mensajes || []), mensajeNuevoObj]

		await axios.patch(`${apiBase}/chats/${props.chatActivo.id}`, {
			mensajes: mensajesActualizados
		})

		nuevoMensaje.value = ''
		emit('mensajeEnviado')
	} catch (error) {
		console.error('Error al enviar la respuesta de soporte:', error)
	} finally {
		enviando.value = false
	}
}

// Método onMounted que se ejecuta al montarse el componente
onMounted(() => {
	// Se carga el scroll hasta abajo
	hacerScrollAlFondo()
})
</script>