<template>
    <!-- Componente del acordion padre -->
    <div @click="toggleAcordion" v-if="props.tipo === 'padre'" class="flex items-center justify-between w-full max-w-2xl rounded-r-xl bg-white p-6 mt-6 shadow-md border-l-4 border-brand-300">
        <h3 class="text-xl font-bold text-brand-400">
            {{props.titulo}}
        </h3>  
        <button class="text-gray-400 hover:text-gray-600 transition-colors" :class="{'rotate-180' : isOpen}">
            <IconChevronDown stroke={2} color="#6F6C8F" />
        </button>
    </div>       
    <div v-show="isOpen">
        <slot/>
    </div>
    <!-- Componente del acordion hijo -->
    <div v-if="props.tipo === 'hijo'" class="flex items-center justify-between w-full max-w-xl rounded-r-xl bg-white p-6 mt-6 shadow-md border-l-4 border-brand-300">
        <h3 class="text-xl font-bold text-brand-600">
            {{props.titulo}}
        </h3>  
        <button class="text-gray-400 hover:text-gray-600 transition-colors">
            <IconChevronRight stroke={2} color="#6F6C8F" />
        </button>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue';
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