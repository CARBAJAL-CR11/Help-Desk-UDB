<template>
	<div :class="[
		'flex w-full mb-3',
		esAdmin ? 'justify-end' : 'justify-start'
	]">
		<div :class="[
			'relative max-w-[70%] px-4 py-2.5 rounded-2xl shadow-xs text-sm',
			esAdmin
				? 'bg-brand-500 text-white rounded-tr-none'
				: 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
		]">
			<p class="break-words leading-relaxed pr-12">
				{{ mensaje.texto }}
			</p>
			<span :class="[
				'absolute bottom-1.5 right-3 text-[10px] select-none',
				esAdmin ? 'text-brand-100' : 'text-gray-400'
			]">
				{{ horaFormateada }}
			</span>
		</div>
	</div>
	
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	mensaje: {
		type: Object,
		required: true
	}
})

// determinar si el emisor es el admin o el susuario
const esAdmin = computed(() => {
	return props.mensaje?.emisor === 'admin'
})

// formatear la hora (ej: "12:01 PM")
const horaFormateada = computed(() => {
	const timestamp = props.mensaje?.timestamp
	if (!timestamp) return ''

	try {
		const fecha = new Date(timestamp)
		if (isNaN(fecha.getTime())) return timestamp // por si ya viene como string simple de hora
		return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	} catch (e) {
		return ''
	}
})
</script>