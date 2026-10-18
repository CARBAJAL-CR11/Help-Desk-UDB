<template>
	<!-- Contenedor completo de card de chats de soportes -->
	<div class="p-4 md:p-6 max-w-7xl mx-auto h-[calc(100vh-5rem)]">
		<div class="flex h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">

			<!-- Panel izquierdo (Sidebar con lista de chats) -->
			<!-- En móvil (< md) se oculta si hay un chatActivo seleccionado -->
			<div :class="[
				'w-full md:w-96 flex flex-col border-r border-gray-200 bg-gray-50/50 transition-all duration-200',
				chatActivo ? 'hidden md:flex' : 'flex'
			]">
				<div class="p-4 border-b border-gray-200 space-y-3">
					<div class="flex items-center justify-between">
						<h1 class="text-xl font-bold text-gray-800">Centro de Soporte</h1>
						<span
							class="px-2.5 py-0.5 bg-brand-50 text-brand-600 border border-brand-200 text-xs font-semibold rounded-full">
							{{ chatsFiltrados.length }} chats
						</span>
					</div>

					<!-- Buscador -->
					<div class="relative">
						<input v-model="busqueda" type="text" placeholder="Buscar por usuario o sesión..."
							class="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:bg-white transition-all" />
						<span class="absolute left-3 top-2.5 text-gray-400">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</span>
					</div>
				</div>

				<!-- Lista de tarjetas -->
				<div class="flex-1 overflow-y-auto p-3 space-y-2">
					<div v-if="cargando"
						class="text-center py-8 text-gray-400 text-xs flex flex-col items-center gap-2">
						<span
							class="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></span>
						Cargando conversaciones...
					</div>

					<template v-else>
						<TarjetaChat v-for="chat in chatsFiltrados" :key="chat.id" :chat="chat"
							:activo="chatActivo?.id === chat.id" @seleccionar="seleccionarChat(chat)"
							@eliminar="confirmarEliminarChat" />

						<div v-if="chatsFiltrados.length === 0" class="text-center py-12 px-4 text-gray-400 text-xs">
							No se encontraron chats que coincidan con "{{ busqueda }}"
						</div>
					</template>
				</div>
			</div>

			<!-- Panel derecho (Ventana de Chat) -->
			<!-- En móvil (< md) se muestra SOLO si hay un chatActivo seleccionado -->
			<div :class="[
				'flex-1 flex flex-col bg-white transition-all duration-200',
				chatActivo ? 'flex' : 'hidden md:flex'
			]">
				<VentanaChat v-if="chatActivo" :chatActivo="chatActivo" @mensajeEnviado="actualizarListaChats"
					@volver="chatActivo = null" />

				<div v-else class="flex flex-col items-center justify-center h-full bg-gray-50/50 text-center p-8">
					<div
						class="w-16 h-16 rounded-full bg-brand-50 border border-brand-200 text-brand-500 flex items-center justify-center mb-4 shadow-xs">
						<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
								d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
					</div>
					<h3 class="text-lg font-bold text-gray-800 mb-1">Panel de Conversaciones</h3>
					<p class="text-sm text-gray-500 max-w-sm">
						Selecciona una conversación del panel izquierdo para comenzar a brindar asistencia técnica en
						tiempo real.
					</p>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { alertas } from '@/recursos/alertas'
import TarjetaChat from '@/componentes/administrador/TarjetaChat.vue'
import VentanaChat from '@/componentes/administrador/VentanaChat.vue'

const apiBase = 'http://localhost:3000/api'
const alerta = alertas()

const busqueda = ref('')
const chatActivo = ref(null)
const listaChats = ref([])
const cargando = ref(true)

// Variable para el temporizador de tiempo real
let timerPolling = null

// Cargar chats desde la API (silent = true para actualizar en background sin parpadeos)
const obtenerChats = async (silencioso = false) => {
	if (!silencioso) cargando.value = true

	try {
		const respuesta = await axios.get(`${apiBase}/chats`)
		// Ordenar de más reciente a más antiguo
		const chatsBackend = respuesta.data.reverse()

		listaChats.value = chatsBackend

		// Si hay un chat abierto, actualizar su referencia para ver los nuevos mensajes del cliente
		if (chatActivo.value) {
			const chatActualizado = chatsBackend.find(c => c.id === chatActivo.value.id)
			if (chatActualizado) {
				// Solo sobrescribir si hubo cambios en la cantidad de mensajes
				if (chatActualizado.mensajes?.length !== chatActivo.value.mensajes?.length) {
					chatActivo.value = chatActualizado
				}
			}
		}
	} catch (error) {
		console.error('Error al obtener la lista de chats:', error)
	} finally {
		if (!silencioso) cargando.value = false
	}
}

// Constante para la seleccion del tipo de chat
const seleccionarChat = (chat) => {
	chatActivo.value = chat
}

// Método para actualizar la lista de chat
const actualizarListaChats = async () => {
	await obtenerChats(true)
}

// Lógica de eliminación
const confirmarEliminarChat = async (idChat) => {
	const confirmacion = await alerta.confirmar(
		"Confirmar acción",
		"¿Estas seguro de eliminar el chat?"
	)

	if (confirmacion) {
		try {
			await axios.delete(`${apiBase}/chats/${idChat}`)
			if (chatActivo.value?.id === idChat) {
				chatActivo.value = null
			}
			await obtenerChats(true)
			await alerta.exitoToast("Exito", "Chat eliminado correctamente")
		} catch (error) {
			console.error("Error al eliminar el chat:", error)
		}
	}
}

const chatsFiltrados = computed(() => {
	if (!busqueda.value.trim()) return listaChats.value
	const termino = busqueda.value.toLowerCase().trim()

	return listaChats.value.filter(chat =>
		(chat.usuario && chat.usuario.toLowerCase().includes(termino)) ||
		(chat.sessionId && chat.sessionId.toLowerCase().includes(termino))
	)
})

// Manejador para limpiar vista de ventana de chat
const manejarKeydown = (e) => {
	if (e.key === 'Escape') {
		chatActivo.value = null
	}
}

// Evento onMounted que se activa cuando se monta con el DOM
onMounted(() => {
	// 1. Carga inicial
	obtenerChats()

	// 2. Activar "Chat en Vivo" mediante Polling (Cada 2.5 segundos)
	timerPolling = setInterval(() => {
		obtenerChats(true) // Ejecución silenciosa
	}, 2500)

	window.addEventListener('keydown', manejarKeydown)
})

// Evento onUnmounted que se activa cuando se desmonta con el DOM
onUnmounted(() => {
	// Limpiar listener de teclado y detener el polling para no saturar la red
	window.removeEventListener('keydown', manejarKeydown)
	if (timerPolling) {
		clearInterval(timerPolling)
	}
})
</script>