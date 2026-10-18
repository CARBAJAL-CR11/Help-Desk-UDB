<template>
	<div class="flex flex-col h-full justify-between pt-6">
		<!-- Área de Conversación Persistente -->
		<div ref="chatContainer" class="flex flex-col gap-6 overflow-y-auto pr-2">
			<TransitionGroup tag="div" class="flex flex-col gap-6"
				enter-active-class="transition-all duration-500 ease-out"
				enter-from-class="opacity-0 translate-y-6 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
				leave-active-class="transition-all duration-300 ease-in"
				leave-from-class="opacity-100 translate-y-0 scale-100"
				leave-to-class="opacity-0 -translate-y-4 scale-95">
				<template v-for="msg in historialMensajes" :key="msg.id">

					<!-- Mensaje del Usuario -->
					<div v-if="msg.emisor === 'usuario'" class="flex flex-col items-end gap-1">
						<span class="text-xs font-semibold text-blue-600 pr-2">Tú</span>
						<div
							class="flex items-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 text-sm text-white shadow-sm font-semibold">
							<span>{{ msg.texto }}</span>
						</div>
					</div>

					<!-- Mensaje de Soporte / Carga -->
					<div v-else class="flex flex-col items-start gap-1">
						<span class="text-xs font-semibold text-blue-600 pl-2">Soporte Técnico</span>

						<!-- Indicador de Puntos Animados "Escribiendo..." -->
						<div v-if="msg.esCargando"
							class="rounded-2xl bg-[#455a74] px-5 py-3 text-sm text-white shadow-sm flex items-center gap-1.5">
							<span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce"></span>
							<span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:0.2s]"></span>
							<span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:0.4s]"></span>
						</div>

						<!-- Globo de Texto de Soporte -->
						<div v-else
							class="lg:max-w-5xl md:max-w-xl sm:max-w-md max-w-sm rounded-2xl bg-[#455a74] p-5 text-sm leading-relaxed text-white shadow-sm">
							<p>{{ msg.texto }}</p>
						</div>
					</div>

				</template>
			</TransitionGroup>
		</div>

		<!-- Input de Mensajes -->
		<div class="relative mt-4 w-full">
			<input v-model="inputTexto" type="text" :disabled="procesandoRespuesta"
				:placeholder="requiereNombre ? 'Ingresa tu nombre para continuar...' : 'Escribe tu mensaje para soporte...'"
				class="w-full rounded-full border border-slate-400 bg-white py-3 pl-6 pr-12 text-sm text-slate-700 placeholder-indigo-300 outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 disabled:bg-slate-100"
				@keydown.enter="procesarEnvio" />
			<button type="button" aria-label="Enviar" :disabled="procesandoRespuesta"
				class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#1242D6] hover:text-[#0a2780] hover:bg-slate-100 transition-all duration-200 cursor-pointer disabled:opacity-50"
				@click="procesarEnvio">
				<component :is="'IconSend'" class="w-5 h-5 stroke-[2]" />
			</button>
		</div>
	</div>
</template>

<script setup>
// Importaciones de librerías y componentes
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

// Declaración de las propiedades recibidas desde el componente padre
const props = defineProps({
    sessionId: {
        type: String,
        required: true
    },
    chatId: {
        type: [Number, String, null],
        default: null
    }
});

// Definición de eventos que puede emitir el componente
const emit = defineEmits(['chat-registrado']);
// URL base para las peticiones a la API del servidor
const apiBase = 'http://localhost:3000/api';

// Variables reactivas para el manejo del chat de soporte y selección de componentes
const inputTexto = ref('');
const historialMensajes = ref([]);
const requiereNombre = ref(false);
const nombreUsuario = ref('');
const idChatLocal = ref(props.chatId);
const chatContainer = ref(null);
const procesandoRespuesta = ref(false);

// Variable para controlar la ejecución periódica del polling
let timerPollingCliente = null;

// Función para pausar la ejecución de forma asíncrona en milisegundos
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Calcula el siguiente id numérico para los mensajes
const obtenerSiguienteIdMensaje = () => {
    // Retorna 1 si el historial de mensajes está vacío
    if (historialMensajes.value.length === 0) return 1;
    const idsNumericos = historialMensajes.value
        .map(m => Number(m.id))
        .filter(id => !isNaN(id));
    // Retorna el ID mayor más uno si existen IDs válidos, de lo contrario retorna 1
    return idsNumericos.length > 0 ? Math.max(...idsNumericos) + 1 : 1;
};

// Desplaza automáticamente la barra de scroll hasta la parte inferior del chat
const scrollAlFondo = () => {
    nextTick(() => {
        // Verifica si la referencia del contenedor de chat existe en el DOM
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
    });
};

// Obtiene de forma remota y silenciosa los mensajes guardados en el servidor
const consultarMensajesServidor = async (silencioso = false) => {
    // Detiene la consulta si no se ha asignado un ID de chat local
    if (!idChatLocal.value) return;

    try {
        const res = await axios.get(`${apiBase}/chats/${idChatLocal.value}`);
        nombreUsuario.value = res.data.usuario;

        const mensajesServidor = res.data.mensajes.map((m) => ({
            id: Number(m.id),
            emisor: m.emisor === 'admin' ? 'admin' : 'usuario',
            texto: m.texto
        }));

        // Actualiza el historial e incrementa el scroll si la cantidad de mensajes difiere
        if (mensajesServidor.length !== historialMensajes.value.length) {
            historialMensajes.value = mensajesServidor;
            scrollAlFondo();
        }
    } catch (error) {
        // Muestra en consola el error si la consulta no fue invocada en modo silencioso
        if (!silencioso) {
            console.error('Error al recuperar historial del chat:', error);
        }
    }
};

// Obtiene la fecha y hora actual en formato ISO correspondiente a El Salvador (GMT-6)
const obtenerTimestampElSalvador = () => {
    const fecha = new Date();

    const fechaElSalvador = new Date(
        fecha.toLocaleString('en-US', { timeZone: 'America/El_Salvador' })
    );

    // Agrega un cero a la izquierda para mantener el formato de dos dígitos
    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = fechaElSalvador.getFullYear();
    const mm = pad(fechaElSalvador.getMonth() + 1);
    const dd = pad(fechaElSalvador.getDate());
    const hh = pad(fechaElSalvador.getHours());
    const min = pad(fechaElSalvador.getMinutes());
    const ss = pad(fechaElSalvador.getSeconds());

    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}-06:00`;
};

// Inicializa el estado del soporte cargando un chat existente o pidiendo el nombre
const inicializarSoporte = async () => {
    // Intenta cargar el historial existente si hay un ID de chat asignado
    if (idChatLocal.value) {
        try {
            const res = await axios.get(`${apiBase}/chats/${idChatLocal.value}`);
            nombreUsuario.value = res.data.usuario;

            const mensajesGuardados = res.data.mensajes.map((m) => ({
                id: Number(m.id),
                emisor: m.emisor === 'admin' ? 'admin' : 'usuario',
                texto: m.texto
            }));

            historialMensajes.value = mensajesGuardados;
            requiereNombre.value = false;
            scrollAlFondo();
            return;
        } catch (error) {
            console.error('Error al recuperar historial del chat:', error);
        }
    }

    requiereNombre.value = true;
    historialMensajes.value = [
        {
            id: 1,
            emisor: 'admin',
            texto: 'Para conectarte con un agente de soporte técnico, por favor ingresa tu nombre:'
        }
    ];
    scrollAlFondo();
};

// Crea un nuevo registro de chat en el backend a través de un método HTTP POST
const crearRegistroChatEnApi = async (nombre) => {
    try {
        const nuevoChatObj = {
            sessionId: props.sessionId,
            usuario: nombre,
            estado: true,
            creadoEn: new Date().toISOString(),
            mensajes: [
                {
                    id: 1,
                    emisor: 'usuario',
                    texto: nombre,
                    timestamp: obtenerTimestampElSalvador()
                }
            ]
        };

        const res = await axios.post(`${apiBase}/chats`, nuevoChatObj);
        idChatLocal.value = res.data.id;
        emit('chat-registrado', res.data.id);
    } catch (error) {
        console.error('Error al crear registro de chat:', error);
    }
};

// Actualiza el listado de mensajes del chat en la API mediante un método PATCH
const guardarMensajeEnApi = async (emisor, texto) => {
    // Cancela el guardado si no existe un ID de chat activo en la base de datos
    if (!idChatLocal.value) return;

    try {
        const res = await axios.get(`${apiBase}/chats/${idChatLocal.value}`);
        const chatActual = res.data;

        const ultimoId = chatActual.mensajes.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);

        const nuevoMensaje = {
            id: ultimoId + 1,
            emisor: emisor,
            texto: texto,
            timestamp: obtenerTimestampElSalvador()
        };

        await axios.patch(`${apiBase}/chats/${idChatLocal.value}`, {
            mensajes: [...chatActual.mensajes, nuevoMensaje]
        });
    } catch (error) {
        console.error('Error al guardar mensaje en la API:', error);
    }
};

// Procesa el envío del mensaje del usuario y maneja los flujos de respuesta
const procesarEnvio = async () => {
    const entrada = inputTexto.value.trim();
    // Cancela el envío si el texto está vacío o si hay un proceso en ejecución
    if (!entrada || procesandoRespuesta.value) return;

    procesandoRespuesta.value = true;
    inputTexto.value = '';

    // Maneja la entrada inicial del usuario cuando se requiere su nombre
    if (requiereNombre.value) {
        nombreUsuario.value = entrada;
        requiereNombre.value = false;

        await esperar(800);
        const idUsuario = obtenerSiguienteIdMensaje();
        historialMensajes.value.push({
            id: idUsuario,
            emisor: 'usuario',
            texto: entrada
        });
        scrollAlFondo();

        await crearRegistroChatEnApi(entrada);

        await esperar(300);
        const tempLoadingId = 'loading-' + Date.now();
        historialMensajes.value.push({
            id: tempLoadingId,
            emisor: 'admin',
            esCargando: true
        });
        scrollAlFondo();

        await esperar(1000);
        historialMensajes.value = historialMensajes.value.filter((m) => m.id !== tempLoadingId);

        const idBienvenida = obtenerSiguienteIdMensaje();
        const bienvenida = `¡Bienvenido/a al chat de soporte, ${nombreUsuario.value}! ¿En qué te podemos ayudar hoy?`;
        historialMensajes.value.push({
            id: idBienvenida,
            emisor: 'admin',
            texto: bienvenida
        });

        await guardarMensajeEnApi('admin', bienvenida);
        scrollAlFondo();

        procesandoRespuesta.value = false;
        return;
    }

    await esperar(800);
    const idMensajeUser = obtenerSiguienteIdMensaje();
    historialMensajes.value.push({
        id: idMensajeUser,
        emisor: 'usuario',
        texto: entrada
    });
    scrollAlFondo();

    await guardarMensajeEnApi('usuario', entrada);

    procesandoRespuesta.value = false;
};

// Hook de ciclo de vida ejecutado al montar el componente en el DOM
onMounted(() => {
    inicializarSoporte();

    timerPollingCliente = setInterval(() => {
        // Ejecuta la sincronización sólo si existe un chat activo previamente registrado
        if (idChatLocal.value) {
            consultarMensajesServidor(true);
        }
    }, 2500);
});

// Hook de ciclo de vida ejecutado al desmontar el componente del DOM
onUnmounted(() => {
    // Cancela el temporizador de polling si se encuentra activo
    if (timerPollingCliente) {
        clearInterval(timerPollingCliente);
    }
});
</script>