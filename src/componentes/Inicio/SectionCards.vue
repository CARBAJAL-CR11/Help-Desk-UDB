<template>
  <section class="w-full min-h-screen bg-brand-400 py-20 px-14 sm:px-20 md:px-24 lg:px-8 flex justify-center items-center overflow-hidden">
    <div class="max-w-7xl mx-auto space-y-12 w-full">
      
      <!-- Encabezado Principal -->
      <div class="text-center space-y-3 max-w-4xl mx-auto">
        <p class="text-brand-200 text-sm sm:text-base lg:text-lg font-medium">
          ¿Inconvenientes al comprar? Resolvemos tus dudas de navegación y facturación
        </p>
        <h2 class="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-brand-100 tracking-tight">
          Soluciones Rápidas
        </h2>
      </div>

      <!-- Contenedor del Slider -->
      <div class="relative flex items-center justify-center">
        
        <!-- Flecha Izquierda -->
        <button 
          @click="anterior"
          :disabled="esInicio"
          aria-label="Anterior"
          class="flex absolute -left-7 lg:-left-4 z-10 w-10 h-10 items-center justify-center text-brand-50 rounded-full border border-transparent transition-all duration-300 focus:outline-none"
          :class="[
            esInicio 
              ? 'opacity-30 cursor-not-allowed scale-95' 
              : 'hover:border-brand-300/40 hover:scale-110 cursor-pointer opacity-100'
          ]"
        >
          <IconArrowNarrowLeft class="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>

        <!-- Grupo de tarjetas con número dinámico según el breakpoint -->
        <div class="w-full max-w-7xl px-4 sm:px-10">
          <TransitionGroup 
            tag="div" 
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full relative"
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-8"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-500 ease-in absolute w-full max-w-[calc(100%-2rem)] md:max-w-[calc(50%-1.5rem)] lg:max-w-[calc(33.333%-1.5rem)] pointer-events-none"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-12"
            move-class="transition-transform duration-500 ease-in-out"
          >
            <div 
              v-for="(item, index) in tarjetasVisibles" 
              :key="item.id"
              :style="getLeaveStyle(index)"
              class="bg-brand-50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[300px] sm:min-h-[100px] transition-transform duration-300 hover:-translate-y-1 w-full"
            >
              <!-- Descripción del problema -->
              <p class="text-brand-600 text-sm sm:text-base leading-relaxed font-normal">
                {{ item.descripcion }}
              </p>
              
              <!-- Pie de la tarjeta -->
              <div class="flex flex-col sm:flex-row items-center gap-4 pt-6">
                <!-- Ícono para Escritorio -->
                <div class="hidden sm:flex w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-brand-100/70 items-center justify-center text-brand-400 flex-shrink-0">
                  <component :is="item.icon" class="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                </div>

                <div class="space-y-0.5 w-full">
                  <div class="grid grid-cols-12 items-center">
                    <h3 class="col-span-8 sm:col-span-12 text-sm sm:text-lg font-bold text-brand-400 leading-snug">
                      {{ item.titulo }}
                    </h3>
                    <!-- Ícono para Celular -->
                    <div class="col-span-4 sm:hidden justify-self-end w-8 h-8 rounded-full bg-brand-100/70 flex items-center justify-center text-brand-400">
                      <component :is="item.icon" class="w-4 h-4 stroke-[1.75]" />
                    </div>
                  </div>
                  <p class="text-xs text-brand-600/80">
                    {{ item.subtitulo }}
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Flecha Derecha -->
        <button 
          @click="siguiente"
          :disabled="esFin"
          aria-label="Siguiente"
          class="flex absolute -right-7 lg:-right-4 z-10 w-10 h-10 items-center justify-center text-brand-50 rounded-full border border-transparent transition-all duration-300 focus:outline-none"
          :class="[
            esFin 
              ? 'opacity-30 cursor-not-allowed scale-95' 
              : 'hover:border-brand-300/40 hover:scale-110 cursor-pointer opacity-100'
          ]"
        >
          <IconArrowNarrowRight class="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>
      </div>

      <!-- Indicadores / Puntos de Carrusel -->
      <div class="flex justify-center items-center gap-2 pt-2">
        <span 
          v-for="(_, index) in totalPasos" 
          :key="index"
          @click="indiceInicio = index"
          class="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
          :class="indiceInicio === index ? 'bg-brand-50 w-6' : 'bg-brand-300/50 hover:bg-brand-50'"
        ></span>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-vue';

const listaProblemas = ref([]);
const indiceInicio = ref(0);
const cantidadVisibles = ref(3); // Por defecto 3 para Desktop

// Escucha el tamaño de pantalla y ajusta la cantidad de tarjetas visibles
const actualizarCantidadVisibles = () => {
  const ancho = window.innerWidth;
  if (ancho < 768) {
    cantidadVisibles.value = 1; // Celular
  } else if (ancho < 1024) {
    cantidadVisibles.value = 2; // Tablet (Dimensión 974px)
  } else {
    cantidadVisibles.value = 3; // Escritorio
  }

  // Ajusta el índice si queda fuera de rango al cambiar el tamaño de ventana
  if (indiceInicio.value > listaProblemas.value.length - cantidadVisibles.value) {
    indiceInicio.value = Math.max(0, listaProblemas.value.length - cantidadVisibles.value);
  }
};

// Petición Axios a la API
const cargarDatos = async () => {
  try {
    const respuesta = await axios.get('http://localhost:3000/api/categorias');
    // .flatMap: Mapeado del json obtenido donde se le quitan los corchetes del array [] para solo tener un solo array de los problemas frequentes 
    const problemas = respuesta.data.flatMap(cat => cat.problemas || []);
    listaProblemas.value = problemas;
  } catch (error) {
    console.error('Error al obtener datos con Axios:', error);
  }
};

// Obtener las tarjetas visibles dinámicamente según 'cantidadVisibles' (1, 2 o 3)
const tarjetasVisibles = computed(() => {
  if (listaProblemas.value.length === 0) return [];
  return listaProblemas.value.slice(indiceInicio.value, indiceInicio.value + cantidadVisibles.value);
});

// Comprobar tope izquierdo
const esInicio = computed(() => indiceInicio.value === 0);

// Comprobar tope derecho según la cantidad de tarjetas visibles actuales
const esFin = computed(() => {
  if (listaProblemas.value.length <= cantidadVisibles.value) return true;
  return indiceInicio.value >= listaProblemas.value.length - cantidadVisibles.value;
});

// Puntos de paginación
const totalPasos = computed(() => {
  if (listaProblemas.value.length <= cantidadVisibles.value) return 1;
  return listaProblemas.value.length - cantidadVisibles.value + 1;
});

// Coordenada dinámicas para la posición 'absolute' al salir
const getLeaveStyle = (index) => {
  const leftPos = (index * 100) / cantidadVisibles.value;
  return {
    '--col-left': `${leftPos}%`
  };
};

const siguiente = () => {
  if (!esFin.value) {
    indiceInicio.value++;
  }
};

const anterior = () => {
  if (!esInicio.value) {
    indiceInicio.value--;
  }
};

// Método onMounted para que se activen los métodos de dentro al cargar el componente
onMounted(() => {
  cargarDatos();
  actualizarCantidadVisibles();
  window.addEventListener('resize', actualizarCantidadVisibles); // Escucha de la ventana para cuando se hace de otro tamaño
});

onUnmounted(() => {
  window.removeEventListener('resize', actualizarCantidadVisibles); // Y se quita el listener cuando se desmonta el componente
});
</script>
