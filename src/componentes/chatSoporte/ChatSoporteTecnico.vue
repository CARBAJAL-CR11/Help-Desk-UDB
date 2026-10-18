<template>
  <div class="flex flex-col h-full justify-between pt-6">
    <!-- Área de Conversación Persistente -->
    <div ref="chatContainer" class="flex flex-col gap-6 overflow-y-auto pr-2">
      <TransitionGroup
        tag="div"
        class="flex flex-col gap-6"
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-6 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 -translate-y-4 scale-95"
      >
        <template v-for="msg in historialMensajes" :key="msg.id">
          
          <!-- Mensaje del Usuario -->
          <div v-if="msg.emisor === 'usuario'" class="flex flex-col items-end gap-1">
            <span class="text-xs font-semibold text-blue-600 pr-2">Tú</span>
            <div class="flex items-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 text-sm text-white shadow-sm font-semibold">
              <span>{{ msg.texto }}</span>
            </div>
          </div>

          <!-- Mensaje de Soporte / Carga -->
          <div v-else class="flex flex-col items-start gap-1">
            <span class="text-xs font-semibold text-blue-600 pl-2">Soporte Técnico</span>
            
            <!-- Indicador de Puntos Animados "Escribiendo..." -->
            <div v-if="msg.esCargando" class="rounded-2xl bg-[#455a74] px-5 py-3 text-sm text-white shadow-sm flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce"></span>
              <span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:0.4s]"></span>
            </div>

            <!-- Globo de Texto de Soporte -->
            <div v-else class="lg:max-w-5xl md:max-w-xl sm:max-w-md max-w-sm rounded-2xl bg-[#455a74] p-5 text-sm leading-relaxed text-white shadow-sm">
              <p>{{ msg.texto }}</p>
            </div>
          </div>

        </template>
      </TransitionGroup>
    </div>

    <!-- Input de Mensajes -->
    <div class="relative mt-4 w-full">
      <input
        v-model="inputTexto"
        type="text"
        :disabled="procesandoRespuesta"
        :placeholder="requiereNombre ? 'Ingresa tu nombre para continuar...' : 'Escribe tu mensaje para soporte...'"
        class="w-full rounded-full border border-slate-400 bg-white py-3 pl-6 pr-12 text-sm text-slate-700 placeholder-indigo-300 outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 disabled:bg-slate-100"
        @keydown.enter="procesarEnvio"
      />
      <button
        type="button"
        aria-label="Enviar"
        :disabled="procesandoRespuesta"
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#1242D6] hover:text-[#0a2780] hover:bg-slate-100 transition-all duration-200 cursor-pointer disabled:opacity-50"
        @click="procesarEnvio"
      >
        <component :is="'IconSend'" class="w-5 h-5 stroke-[2]" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

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

const emit = defineEmits(['chat-registrado']);
const apiBase = 'http://localhost:3000/api';

const inputTexto = ref('');
const historialMensajes = ref([]);
const requiereNombre = ref(false);
const nombreUsuario = ref('');
const idChatLocal = ref(props.chatId);
const chatContainer = ref(null);
const procesandoRespuesta = ref(false);

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const obtenerSiguienteIdMensaje = () => {
  if (historialMensajes.value.length === 0) return 1;
  const idsNumericos = historialMensajes.value
    .map(m => Number(m.id))
    .filter(id => !isNaN(id));
  return idsNumericos.length > 0 ? Math.max(...idsNumericos) + 1 : 1;
};

const scrollAlFondo = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

// Obtiene la fecha/hora actual en la zona horaria de El Salvador (GMT-6)
const obtenerTimestampElSalvador = () => {
  const fecha = new Date();
  
  // Formato ISO con offset explícito (-06:00)
  const fechaElSalvador = new Date(
    fecha.toLocaleString('en-US', { timeZone: 'America/El_Salvador' })
  );
  
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = fechaElSalvador.getFullYear();
  const mm = pad(fechaElSalvador.getMonth() + 1);
  const dd = pad(fechaElSalvador.getDate());
  const hh = pad(fechaElSalvador.getHours());
  const min = pad(fechaElSalvador.getMinutes());
  const ss = pad(fechaElSalvador.getSeconds());

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}-06:00`;
};

const inicializarSoporte = async () => {
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

  // Si no hay un registro previo en la API, solicitar nombre con ID 1
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

const guardarMensajeEnApi = async (emisor, texto) => {
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

const procesarEnvio = async () => {
  const entrada = inputTexto.value.trim();
  if (!entrada || procesandoRespuesta.value) return;

  procesandoRespuesta.value = true;
  inputTexto.value = '';

  // 1. PASO INICIAL: Ingreso del Nombre del usuario
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

  // 2. MENSAJES DEL USUARIO: Únicamente se guardan en el historial y servidor sin emitir respuestas automáticas
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

onMounted(() => {
  inicializarSoporte();
});
</script>