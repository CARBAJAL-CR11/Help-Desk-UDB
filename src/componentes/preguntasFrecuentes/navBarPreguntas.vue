<template>
    <nav>
        <!-- Botón Móvil -->
        <div class="lg:hidden mt-5 ml-5">
            <button 
            @click="menuAbierto = true"
            class="text-brand-50 py-2 px-3 rounded-lg focus:outline-none bg-brand-400 hover:bg-brand-600"
            >
                <IconProgressHelp stroke={2} color="#ffffff" class="w-8 h-8"/>
            </button>
        </div>

        <!-- Menú Escritorio -->
        <div class="w-full lg:max-w-xl bg-brand-500 min-h-screen p-6 sm:p-8 hidden lg:flex flex-col items-center shrink-0">
            <h1 class="text-2xl font-bold text-brand-50 mb-8 text-center">
            Preguntas Frecuentes
            </h1>
    
            <div class="w-full space-y-4 text-xl">
                <!-- Iteración dinámica de categorías -->
                <ListaPreguntaFrecuente 
                    v-for="categoria in categorias" 
                    :key="categoria.id"
                    tipo="padre" 
                    :titulo="categoria.titulo" 
                    v-model="acordionAbierto"
                >
                    <!-- Iteración dinámica de problemas (preguntas hijas) -->
                    <ListaPreguntaFrecuente 
                        v-for="problema in categoria.problemas"
                        :key="problema.id"
                        tipo="hijo" 
                        :titulo="problema.titulo" 
                        @click="seleccionarPregunta(problema.id)"
                        :class="{ '!bg-brand-900 !text-brand-50': preguntaSeleccionada === problema.id }"
                    />
                </ListaPreguntaFrecuente>
            </div>
        </div>
    </nav>

    <!-- Overlay Móvil -->
    <Transition name="fade">
        <Teleport to="body">
            <div 
            v-if="menuAbierto" 
            @click="menuAbierto = false" 
            class="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden"
            ></div>
        </Teleport>
    </Transition>

    <!-- Menú Móvil -->
    <Transition name="slide">
        <Teleport to="body">
            <div v-if="menuAbierto" class="fixed top-0 left-0 z-50 md:max-w-lg max-w-sm bg-brand-500 h-screen p-6 flex flex-col items-center overflow-y-auto lg:hidden shadow-2xl">
                <div class="w-full flex justify-between items-center mb-8">
                    <h1 class="md:text-2xl text-xl font-bold text-white mb-8 text-center">
                    Preguntas Frecuentes
                    </h1>
                    <button 
                    @click="menuAbierto = false"
                    class="text-brand-50 py-2 px-3 rounded-lg focus:outline-none bg-brand-50 hover:bg-brand-100"
                    >
                        <IconChevronLeft stroke={2} color="#1242D6" />
                    </button>
                </div>
        
                <div class="w-full space-y-4 text-base">
                    <!-- Iteración dinámica para móvil -->
                    <ListaPreguntaFrecuente 
                        v-for="categoria in categorias" 
                        :key="categoria.id"
                        tipo="padre" 
                        :titulo="categoria.titulo" 
                        v-model="acordionAbierto"
                    >
                        <ListaPreguntaFrecuente 
                            v-for="problema in categoria.problemas"
                            :key="problema.id"
                            tipo="hijo" 
                            :titulo="problema.titulo" 
                            @click="seleccionarPregunta(problema.id); menuAbierto = false;"
                            :class="{ '!bg-slate-600 !text-white': preguntaSeleccionada === problema.id }"
                        />
                    </ListaPreguntaFrecuente>
                </div>
            </div>
        </Teleport>
    </Transition>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import ListaPreguntaFrecuente from '@/componentes/preguntasFrecuentes/ListaPreguntaFrecuente.vue';
    import axios from 'axios';

    const router = useRouter();
    const route = useRoute();

    const categorias = ref([]);
    const acordionAbierto = ref();
    const menuAbierto = ref(false);

    const obtenerCategorias = async () => {
        try {
            const respuesta = await axios.get('http://localhost:3000/api/categorias');
            return respuesta.data;
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
            throw error;
        }
    };
    const preguntaSeleccionada = defineModel({
        type: String,
        default: ''
    });

    const seleccionarPregunta = (key) => {
        preguntaSeleccionada.value = key;

        router.push({ 
            name: 'pregunta-detalle', 
            params: { pregunta: key } 
        });
    };

    

    const cargarDatos = async () => {
        try {
            const data = await obtenerCategorias();
            categorias.value = data;
        } catch (error) {
            console.error('Hubo un error cargando las categorías en el componente', error);
        }
    };

    onMounted(() => {
        cargarDatos(); 
        if(route.params.pregunta) {
            preguntaSeleccionada.value = route.params.pregunta;
        }
    });
</script>

<style scoped>
    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .slide-enter-from,
    .slide-leave-to {
        transform: translateX(-100%);
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>