<template>
	<!-- Tarjeta de chat unitario -->
	<div @click="$emit('seleccionar')" :class="[
		'flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-100 select-none',
		activo ? 'bg-gray-200 shadow-xs' : 'bg-white border-transparent hover:bg-gray-200'
	]">
		<!-- Burbuja de imagen / Botón de Eliminar -->
		<div class="relative flex-shrink-0">
			<!-- Muestra el Botón de Basura SOLO si el chat está INACTIVO Y ADEMÁS está SELECCIONADO (activo === true) -->
			<button v-if="!chat.estado && activo" type="button" title="Eliminar chat"
				class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-xs border bg-red-50 text-gray-500 border-red-200 hover:bg-red-100 hover:text-red-500 transition-colors"
				@click.stop="$emit('eliminar', chat.id)">
				<component :is="'IconTrash'" class="w-5 h-5" />
			</button>

			<!-- Si el chat está Activo O si está Inactivo pero AÚN NO ha sido seleccionado: muestra la Inicial del usuario -->
			<div v-else :class="[
				'w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-xs border',
				activo
					? 'bg-brand-500 text-white border-brand-400'
					: 'bg-gray-100 text-gray-500 border-gray-200'
			]">
				{{ inicialUsuario }}
			</div>
		</div>

		<!-- Contenido de la tarjeta -->
		<div class="flex-1 min-w-0">
			<div class="flex items-center justify-between gap-1 mb-1">
				<!-- Nombre de usuario -->
				<h4 :class="['text-sm truncate font-semibold', activo ? 'text-gray-900' : 'text-gray-700']">
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
				<span v-if="chat.estado"
					class="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-blue-50 text-blue-700 border border-blue-200">
					Activo
				</span>
				<span v-else
					class="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-gray-100 text-gray-500 border border-gray-200">
					Inactivo
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

// Propiedades que espera del componente padre (recibe el obj de un chat completo y el estado si esta activo o no)
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

// Emit: lo que hace es activar un método o función de un componente padre desde el hijo
defineEmits(['seleccionar', 'eliminar'])

// Método para encontrar la incial de usuario
const inicialUsuario = computed(() => {
	if (!props.chat?.usuario) return 'U'
	return props.chat.usuario.charAt(0).toUpperCase()
})

// Método para encontrar el mensaje mas reciente encontrado y asi mostrarlo en la card
const ultimoMensajeTexto = computed(() => {
	const mensajes = props.chat?.mensajes
	if (!mensajes || mensajes.length === 0) return 'Sin mensajes aún'
	return mensajes[mensajes.length - 1].texto
})

// Método que devuelve una fecha formateada respecto a recibida del props.chat
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