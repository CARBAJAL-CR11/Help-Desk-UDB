<template>
    <nav>
        <div class="lg:hidden mt-5 ml-5">
            <button 
            @click="menuAbierto = true"
            class="text-brand-50 py-2 px-3 rounded-lg focus:outline-none bg-brand-400 hover:bg-brand-600"
            >
                <IconProgressHelp stroke={2} color="#ffffff" class="w-8 h-8"/>
            </button>
        </div>
        <div class="w-full lg:max-w-xl bg-brand-500 min-h-screen p-6 sm:p-8 hidden lg:flex flex-col items-center shrink-0">
            <h1 class="text-2xl font-bold text-brand-50 mb-8 text-center">
            Preguntas Frecuentes
            </h1>
    
            <div class="w-full space-y-4 text-xl">
            <ListaPreguntaFrecuente 
                tipo="padre" 
                titulo="Preguntas Generales" 
                v-model="acordionAbierto"
            >
                <ListaPreguntaFrecuente 
                tipo="hijo" 
                titulo="¿Cuáles son sus horarios de atencion?" 
                @click="seleccionarPregunta('horarios')"
                :class="{ '!bg-brand-900 !text-brand-50': preguntaSeleccionada === 'horarios' }"
                />
                
                <ListaPreguntaFrecuente 
                tipo="hijo" 
                titulo="¿Dónde están ubicados y cómo puedo llegar?" 
                @click="seleccionarPregunta('ubicacion')"
                :class="{ '!bg-brand-900 !text-brand-50': preguntaSeleccionada === 'ubicacion' }"
                />
                
                <ListaPreguntaFrecuente 
                tipo="hijo" 
                titulo="¿Cómo puedo ponerme en contacto con el servicio de atención al cliente?" 
                @click="seleccionarPregunta('contacto')"
                :class="{ '!bg-brand-900 !text-brand-50': preguntaSeleccionada === 'contacto' }"
                />
            </ListaPreguntaFrecuente>
    
            <ListaPreguntaFrecuente 
                tipo="padre" 
                titulo="Pedidos y Compras" 
                v-model="acordionAbierto"
            />
    
            <ListaPreguntaFrecuente 
                tipo="padre" 
                titulo="Envíos y Entregas" 
                v-model="acordionAbierto"
            />
    
            <ListaPreguntaFrecuente 
                tipo="padre" 
                titulo="Devoluciones y Garantías" 
                v-model="acordionAbierto"
            />
            <ListaPreguntaFrecuente 
                tipo="padre" 
                titulo="Productos e Inventario" 
                v-model="acordionAbierto"
            />
            </div>
        </div>
    </nav>
    <Transition name="fade">
        <Teleport to="body">
            <div 
            v-if="menuAbierto" 
            @click="menuAbierto = false" 
            class="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 lg:hidden"
            ></div>
        </Teleport>
    </Transition>
    <Transition name="slide">
        <Teleport to="body">
            <nav v-if="menuAbierto">
                <div class="fixed top-0 left-0 z-50 md:max-w-lg max-w-sm bg-brand-500 min-h-screen p-6 flex flex-col items-center overflow-y-auto lg:hidden shadow-2xl">
                    <div class="w-full flex justify-between items-center mb-8">
                        <h1 class="text-2xl font-bold text-white mb-8 text-center">
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
                        <ListaPreguntaFrecuente 
                            tipo="padre" 
                            titulo="Preguntas Generales" 
                            v-model="acordionAbierto"
                        >
                            <ListaPreguntaFrecuente 
                            tipo="hijo" 
                            titulo="¿Cuáles son sus horarios de atencion?" 
                            @click="seleccionarPregunta('horarios'); menuAbierto = false;"
                            :class="{ '!bg-slate-600 !text-white': preguntaSeleccionada === 'horarios' }"
                            />
                            
                            <ListaPreguntaFrecuente 
                            tipo="hijo" 
                            titulo="¿Dónde están ubicados y cómo puedo llegar?" 
                            @click="seleccionarPregunta('ubicacion'); menuAbierto = false;"
                            :class="{ '!bg-slate-600 !text-white': preguntaSeleccionada === 'ubicacion' }"
                            />
                            
                            <ListaPreguntaFrecuente 
                            tipo="hijo" 
                            titulo="¿Cómo puedo ponerme en contacto con el servicio de atención al cliente?" 
                            @click="seleccionarPregunta('contacto'); menuAbierto = false;"
                            :class="{ '!bg-slate-600 !text-white': preguntaSeleccionada === 'contacto' }"
                            />
                        </ListaPreguntaFrecuente>
                
                        <ListaPreguntaFrecuente 
                            tipo="padre" 
                            titulo="Pedidos y Compras" 
                            v-model="acordionAbierto"
                        />
                
                        <ListaPreguntaFrecuente 
                            tipo="padre" 
                            titulo="Envíos y Entregas" 
                            v-model="acordionAbierto"
                        />
                
                        <ListaPreguntaFrecuente 
                            tipo="padre" 
                            titulo="Devoluciones y Garantías" 
                            v-model="acordionAbierto"
                        />
                        <ListaPreguntaFrecuente 
                            tipo="padre" 
                            titulo="Productos e Inventario" 
                            v-model="acordionAbierto"
                        />
                    </div>
                </div>
            </nav>
        </Teleport>
    </Transition>
</template>
<script setup>
    import { ref } from 'vue';
    import ListaPreguntaFrecuente from '@/componentes/preguntasFrecuentes/ListaPreguntaFrecuente.vue';
    // Controla cuál categoría principal está abierta
    const acordionAbierto = ref('Preguntas Generales');
    const menuAbierto = ref(false);

    // Controla cuál sub-pregunta está seleccionada para mostrar su respuesta en la derecha
    const preguntaSeleccionada = defineModel({
        type: String,
        default: ''
    });

    const seleccionarPregunta = (key) => {
    preguntaSeleccionada.value = key;
    };
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