<template>
	<div class="my-20 px-4">
		<!-- Pregunta que se oculta cuando se abre el chat -->
		<Transition enter-active-class="transition-all duration-500 ease-out"
			enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
			leave-active-class="transition-all duration-500 ease-in" leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 -translate-y-4">
			<h1 v-if="!mostrarChat" key="titulo-rotativo"
				class="md:text-4xl sm:text-2xl text-xl text-center text-brand-500 font-bold min-h-[3rem] flex items-center justify-center">
				¿Cuál es la duda que tienes?
			</h1>
		</Transition>

		<!-- VISTA INICIAL: Input Desencadenador -->
		<Transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="opacity-0 translate-y-4"
			enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-500 ease-in"
			leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4" mode="out-in">
			<!-- Input de muestra -->
			<div v-if="!mostrarChat" key="input-inicial" class="flex flex-col items-center mt-8">
				<div class="relative w-full lg:max-w-5xl md:max-w-2xl sm:max-w-lg max-w-xs">
					<input v-model="inputInicialTexto" type="text" placeholder="Coméntanos aquí para iniciar..."
						class="w-full rounded-full border border-slate-400 bg-white py-3 pl-5 pr-12 text-slate-700 placeholder-indigo-300 outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
						@focus="abrirContenedorChat" @click="abrirContenedorChat"
						@keydown.enter="abrirContenedorChat" />
					<button type="button" aria-label="Iniciar chat"
						class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#1242D6] hover:text-[#0a2780] hover:bg-slate-100 transition-all duration-200 cursor-pointer"
						@click="abrirContenedorChat">
						<component :is="'IconSend'" class="w-5 h-5 stroke-[2]" />
					</button>
				</div>
			</div>

			<!-- VISTA CONTENEDOR CHAT -->
			<div v-else key="ventana-chat" class="flex flex-col items-center mt-8">
				<div
					class="relative flex h-[600px] w-full lg:max-w-6xl md:max-w-3xl sm:max-w-xl max-w-xs flex-col justify-between rounded-3xl border-2 border-blue-400 bg-white p-6 shadow-sm">

					<!-- Botón de Cerrar Chat (X en esquina superior derecha) -->
					<button type="button" aria-label="Cerrar Chat"
						class="absolute top-2 right-2 z-20 rounded-full m-2 p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-all duration-200 cursor-pointer"
						@click="cerrarYLimpiarChat">
						<component :is="'IconX'" class="w-4 h-4 stroke-[2]" />
					</button>

					<!-- Componente 1: Navegación Estática por Categorías -->
					<ChatMenuEstatico v-if="modoVista === 'estatico'" :input-inicial="inputInicialTexto"
						@solicitar-soporte="cambiarAModoSoporte" />

					<!-- Componente 2: Chat de Soporte Técnico -->
					<ChatSoporteTecnico v-else-if="modoVista === 'soporte'" :session-id="sessionId"
						:chat-id="chatRegistroId"/>

				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
// Importaciones de vue, componentes y alertas de SWAlert 2
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ChatMenuEstatico from '@/componentes/chatSoporte/ChatMenuEstatico.vue';
import ChatSoporteTecnico from '@/componentes/chatSoporte/ChatSoporteTecnico.vue';
import { alertas } from "@/recursos/alertas";
const alerta = alertas();

// Api base para las transacciones entre la api
const apiBase = 'http://localhost:3000/api';

// Variables para el manejo del chat de soporte y selección de componentes
const mostrarChat = ref(false);
const inputInicialTexto = ref('');
const modoVista = ref('estatico'); // 'estatico' | 'soporte'
const sessionId = ref('');
const chatRegistroId = ref(null);

// Función asíncrona para verificar si el usuario tiene un id en el LocalStorage
const verificarLocalStorage = async () => {
    // Se obtiene el valor con la key de "chat_session_id"
    const sessionGuardada = localStorage.getItem('chat_session_id');
    if (sessionGuardada) {
        // Si tiene, se realiza la carga del chat con ayuda del valor del sessionID
        sessionId.value = sessionGuardada;
        try {
            // Petición con axios de tipo get para obtener el chat activo
            const res = await axios.get(`${apiBase}/chats?sessionId=${sessionGuardada}&estado=true`);
            // Si tiene un chat existente se muestra el componente de chat de soporte
            if (res.data && res.data.length > 0) {
                chatRegistroId.value = res.data[0].id;
                modoVista.value = 'soporte';
            } else {
                // Sino, se muestra el chat estático
                modoVista.value = 'estatico';
            }
        } catch (error) {
            console.error('Error al consultar chat existente:', error);
            modoVista.value = 'estatico';
        }
    } else {
        modoVista.value = 'estatico';
    }
};

// Método para comenzar y abrir el chat de soporte estático o de soporte
const abrirContenedorChat = () => {
    mostrarChat.value = true;
};

// Método para cambiar a modo de soporte
const cambiarAModoSoporte = () => {
    // Si no tiene un sessionId en el LocalStorage
    if (!sessionId.value) {
        // Crea uno en base a un formato y 5 números aleatorios
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        sessionId.value = `guest-session-${randomNum}`;
        localStorage.setItem('chat_session_id', sessionId.value); // Se guarda en el LocalStorage
    }
    modoVista.value = 'soporte';
};

// Método para cerrar el chat y cambiar su estado a inactivo (estado: false)
const cerrarYLimpiarChat = async () => {
    // Confirmación con alerta SWalert2
    const confirmacion = await alerta.confirmar(
        "Confirmar acción",
        "¿Estás seguro de cerrar y eliminar el chat de soporte?",
    );
    if (!confirmacion) {
        return;
    }

    try {
        let targetId = chatRegistroId.value;

        // Si chatRegistroId es null pero tenemos sessionId, buscamos el ID del chat activo en el servidor
        if (!targetId && sessionId.value) {
            const res = await axios.get(`${apiBase}/chats?sessionId=${sessionId.value}&estado=true`);
            if (res.data && res.data.length > 0) {
                targetId = res.data[0].id;
            }
        }

        // Si encontramos el ID (ya sea guardado o consultado), actualizamos estado: false
        if (targetId) {
            await axios.patch(`${apiBase}/chats/${targetId}`, { estado: false });
        }
    } catch (error) {
        console.error('Error al desactivar el estado del chat:', error);
    }

    // Se elimina la key del SessionID de localStorage y se limpia la vista
    localStorage.removeItem('chat_session_id');
    sessionId.value = '';
    chatRegistroId.value = null;
    modoVista.value = 'estatico';
    mostrarChat.value = false;
    inputInicialTexto.value = '';
};

// Evento onMounted que se activa al montarse el componente
onMounted(() => {
    verificarLocalStorage();
});
</script>