<template>
  <div class="flex flex-col h-full justify-between pt-6">
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
          <!-- Mensaje Usuario -->
          <div v-if="msg.emisor === 'usuario'" class="flex flex-col items-end gap-1">
            <span class="text-xs font-semibold text-blue-600 pr-2">Tú</span>
            <div class="flex items-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 text-sm text-white shadow-sm font-semibold">
              <component :is="msg.icon" v-if="msg.icon" class="w-4 h-4 stroke-[2]" />
              <span>{{ msg.texto }}</span>
            </div>
          </div>

          <!-- Mensaje Asistente -->
          <div v-else class="flex flex-col items-start gap-1">
            <span class="text-xs font-semibold text-blue-600 pl-2">Asistente</span>
            
            <div v-if="msg.esCargando" class="rounded-2xl bg-[#455a74] px-5 py-3 text-sm text-white shadow-sm flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce"></span>
              <span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:0.2s]"></span>
              <span class="w-2 h-2 rounded-full bg-blue-300 animate-bounce [animation-delay:0.4s]"></span>
            </div>

            <div v-else class="lg:max-w-5xl md:max-w-xl sm:max-w-md max-w-sm rounded-2xl bg-[#455a74] p-5 text-sm leading-relaxed text-white shadow-sm">
              <p v-if="msg.saludo" class="font-medium">{{ msg.saludo }}</p>
              <p v-if="msg.texto" class="mt-1">{{ msg.texto }}</p>

              <div v-if="msg.problemaDetalle" class="mt-3 space-y-2 bg-slate-700/50 p-4 rounded-xl border border-slate-500/30">
                <div class="flex items-center gap-2 text-blue-300 font-bold text-base">
                  <component :is="msg.problemaDetalle.icon" v-if="msg.problemaDetalle.icon" class="w-5 h-5 stroke-[2]" />
                  <span>{{ msg.problemaDetalle.titulo }}</span>
                </div>
                <p class="text-xs text-slate-300 font-semibold">{{ msg.problemaDetalle.subtitulo }}</p>
                <p class="text-xs text-slate-100 leading-normal pt-1">{{ msg.problemaDetalle.descripcion }}</p>
              </div>

              <p v-if="msg.instrucciones" class="mt-3 font-medium">{{ msg.instrucciones }}</p>
              <ul v-if="msg.opciones && msg.opciones.length > 0" class="mt-4 flex flex-col gap-2 font-medium">
                <li
                  v-for="(opcion, opcIdx) in msg.opciones"
                  :key="opcIdx"
                  class="flex items-center gap-2 cursor-pointer hover:bg-slate-600/50 p-2 rounded-lg transition-colors duration-200"
                  @click="seleccionarOpcionDirecta(opcion)"
                >
                  <span class="text-blue-300 font-bold text-xs min-w-[20px]">{{ opcion.num }}.</span>
                  <span v-if="opcion.icon">
                    <component :is="opcion.icon" class="w-4 h-4 stroke-[2]" />
                  </span>
                  <span>{{ opcion.label }}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </TransitionGroup>
    </div>

    <!-- Input Estático -->
    <div class="relative mt-4 w-full">
      <input
        v-model="inputTexto"
        type="text"
        :disabled="procesandoRespuesta"
        placeholder="Escribe el número o el texto de la opción..."
        class="w-full rounded-full border border-slate-400 bg-white py-3 pl-6 pr-12 text-sm text-slate-700 placeholder-indigo-300 outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 disabled:bg-slate-100"
        :class="{ 'font-bold text-slate-900': esOpcionSeleccionada }"
        @input="esOpcionSeleccionada = false"
        @keydown.enter="procesarEntrada"
      />
      <button
        type="button"
        aria-label="Enviar"
        :disabled="procesandoRespuesta"
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#1242D6] hover:text-[#0a2780] hover:bg-slate-100 transition-all duration-200 cursor-pointer disabled:opacity-50"
        @click="procesarEntrada"
      >
        <component :is="'IconSend'" class="w-5 h-5 stroke-[2]" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['solicitar-soporte']);
const apiBase = 'http://localhost:3000/api';

const inputTexto = ref('');
const esOpcionSeleccionada = ref(false);
const categorias = ref([]);
const historialMensajes = ref([]);
const nivelNavegacion = ref('categorias');
const categoriaSeleccionada = ref(null);
const chatContainer = ref(null);
const procesandoRespuesta = ref(false);

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cargarCategorias = async () => {
  try {
    const respuesta = await axios.get(`${apiBase}/categorias`);
    categorias.value = respuesta.data;
    mostrarMenuCategorias();
  } catch (error) {
    console.error('Error al cargar categorías:', error);
  }
};

const scrollAlFondo = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const mostrarMenuCategorias = () => {
  nivelNavegacion.value = 'categorias';
  categoriaSeleccionada.value = null;

  const opcionesMenu = categorias.value.map((cat, idx) => ({
    num: idx + 1,
    label: cat.titulo,
    icon: cat.icon,
    data: cat
  }));

  opcionesMenu.push({
    num: opcionesMenu.length + 1,
    label: 'Hablar con un Agente de Soporte Técnico',
    icon: 'IconUser',
    action: 'tecnico'
  });

  historialMensajes.value.push({
    id: Date.now() + Math.random(),
    emisor: 'asistente',
    saludo: '¡Hola! Bienvenido/a a nuestro servicio de atención.',
    texto: 'Por favor, selecciona una opción o consulta nuestras categorías:',
    opciones: opcionesMenu
  });

  scrollAlFondo();
};

const mostrarProblemasDeCategoria = (cat) => {
  nivelNavegacion.value = 'problemas';
  categoriaSeleccionada.value = cat;

  const opcionesProblemas = cat.problemas.map((prob, idx) => ({
    num: idx + 1,
    label: prob.titulo,
    icon: prob.icon,
    data: prob
  }));

  opcionesProblemas.push({
    num: opcionesProblemas.length + 1,
    label: 'Volver al menú principal',
    icon: 'IconArrowBackUp',
    action: 'volver'
  });

  historialMensajes.value.push({
    id: Date.now() + Math.random(),
    emisor: 'asistente',
    texto: `Categoría seleccionada: ${cat.titulo}`,
    instrucciones: 'Elige el problema sobre el cual deseas obtener información:',
    opciones: opcionesProblemas
  });

  scrollAlFondo();
};

const mostrarDetalleProblema = (prob) => {
  nivelNavegacion.value = 'detalle';

  historialMensajes.value.push({
    id: Date.now() + Math.random(),
    emisor: 'asistente',
    texto: 'Aquí tienes los detalles de la consulta seleccionada:',
    problemaDetalle: prob,
    instrucciones: '¿Qué deseas hacer a continuación?',
    opciones: [
      {
        num: 1,
        label: `Volver a problemas de ${categoriaSeleccionada.value.titulo}`,
        icon: 'IconArrowBackUp',
        action: 'volver_problemas'
      },
      {
        num: 2,
        label: 'Volver al menú principal',
        icon: 'IconArrowBackUp',
        action: 'volver'
      }
    ]
  });

  scrollAlFondo();
};

const seleccionarOpcionDirecta = (opcion) => {
  if (procesandoRespuesta.value) return;
  inputTexto.value = opcion.label;
  esOpcionSeleccionada.value = true;
};

const procesarEntrada = async () => {
  const entrada = inputTexto.value.trim();
  if (!entrada || procesandoRespuesta.value) return;

  procesandoRespuesta.value = true;
  inputTexto.value = '';
  esOpcionSeleccionada.value = false;

  await esperar(800);
  historialMensajes.value.push({
    id: Date.now() + Math.random(),
    emisor: 'usuario',
    texto: entrada
  });
  scrollAlFondo();

  await esperar(300);
  const tempLoadingId = Date.now() + Math.random();
  historialMensajes.value.push({
    id: tempLoadingId,
    emisor: 'asistente',
    esCargando: true
  });
  scrollAlFondo();

  await esperar(1000);
  historialMensajes.value = historialMensajes.value.filter((m) => m.id !== tempLoadingId);

  const entradaLower = entrada.toLowerCase();
  const numEntrada = parseInt(entrada, 10);

  if (nivelNavegacion.value === 'categorias') {
    const totalOps = categorias.value.length;
    const esSoporteTecnico = (numEntrada && numEntrada === totalOps + 1) || entradaLower.includes('agente') || entradaLower.includes('soporte') || entradaLower.includes('técnico');

    if (esSoporteTecnico) {
      emit('solicitar-soporte');
    } else {
      const catEncontrada = categorias.value.find(
        (cat, idx) =>
          (numEntrada && idx + 1 === numEntrada) ||
          cat.titulo.toLowerCase().includes(entradaLower)
      );

      if (catEncontrada) {
        mostrarProblemasDeCategoria(catEncontrada);
      } else {
        historialMensajes.value.push({
          id: Date.now() + Math.random(),
          emisor: 'asistente',
          texto: 'No reconocí esa opción. Por favor selecciona un número de la lista o escribe el nombre.'
        });
        scrollAlFondo();
      }
    }
  } else if (nivelNavegacion.value === 'problemas') {
    const listaProb = categoriaSeleccionada.value.problemas;

    if (
      (numEntrada && numEntrada === listaProb.length + 1) ||
      entradaLower.includes('volver') ||
      entradaLower.includes('menú principal')
    ) {
      mostrarMenuCategorias();
    } else {
      const probEncontrado = listaProb.find(
        (p, idx) =>
          (numEntrada && idx + 1 === numEntrada) ||
          p.titulo.toLowerCase().includes(entradaLower)
      );

      if (probEncontrado) {
        mostrarDetalleProblema(probEncontrado);
      } else {
        historialMensajes.value.push({
          id: Date.now() + Math.random(),
          emisor: 'asistente',
          texto: 'Opción no válida. Por favor selecciona un número de la lista.'
        });
        scrollAlFondo();
      }
    }
  } else if (nivelNavegacion.value === 'detalle') {
    if (numEntrada === 1 || entradaLower.includes('volver a problemas')) {
      mostrarProblemasDeCategoria(categoriaSeleccionada.value);
    } else if (numEntrada === 2 || entradaLower.includes('menú principal')) {
      mostrarMenuCategorias();
    }
  }

  procesandoRespuesta.value = false;
};

onMounted(() => {
  cargarCategorias();
});
</script>