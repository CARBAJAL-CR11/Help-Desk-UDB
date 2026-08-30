<template>
    <!-- Componente del acordion padre -->
    <div v-if="props.tipo === 'padre'" class="w-full xl:max-w-6xl md:max-w-2xl max-w-xl mt-6 cursor-pointer">
        <div @click="toggleAcordion" class="flex items-center justify-between rounded-r-xl bg-brand-50 p-6 shadow-md border-l-4 border-brand-300">
            <h3 class="text-xl font-bold text-brand-400">
                {{props.titulo}}
            </h3>  
            <button class="text-gray-400 hover:text-gray-600 transition-colors" :class="{'rotate-180' : isOpen}">
                <IconChevronDown stroke={2} color="#6F6C8F" />
            </button>
        </div>       
        <div 
            class="grid transition-[grid-template-rows] duration-300 ease-in-out"
            :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
            <!-- Elemento interno obligatorio con overflow-hidden -->
            <div class="overflow-hidden">
                <div class="w-[92%] ml-auto pt-3 pb-1 flex flex-col items-stretch gap-6 mt-6">
                    <slot />
                </div>
            </div>
        </div>
    </div>
    <!-- Componente del acordion hijo -->
    <div v-if="props.tipo === 'hijo'" @click="$emit('click', $event)">
        <RouterLink to="/preguntas-frecuentes/contenido" class="flex items-center justify-between rounded-r-xl bg-brand-50 p-6 shadow-md border-l-4 border-brand-300 cursor-pointer hover:bg-brand-700 transition-colors">
            <h3 class="text-xl font-bold text-brand-600"> 
                {{props.titulo}}
            </h3>  
            <button class="text-gray-400 hover:text-gray-600 transition-colors">
                <IconChevronRight stroke={2} color="#6F6C8F" />
            </button>
        </RouterLink>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue';
    import { RouterLink } from 'vue-router';
    defineEmits(['click']);
    const props = defineProps({
        titulo: {
            type: String,
            default: ""
        },
        tipo: {
            type: String,
            default: "padre"
        }
    });
    const modelAcordion = defineModel();
    const isOpen = computed(() => modelAcordion.value === props.titulo);

    const toggleAcordion = () => {
        if (isOpen.value) {
            modelAcordion.value = '';
        } else {
            modelAcordion.value = props.titulo;
        }
    }
</script>