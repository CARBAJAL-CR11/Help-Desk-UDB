<template>
    <div class="w-full max-w-2xl rounded-r-xl bg-white p-6 mt-6 shadow-md flex items-center justify-between border-l-4 border-brand-300">
        <h3 class="text-xl font-bold text-brand-400">
            {{props.titulo}}
        </h3>  
        <button class="text-gray-400 hover:text-gray-600 transition-colors">
            <IconChevronDown stroke={2} color="#6F6C8F" />
        </button>
    </div>
</template>
<script setup>
    const props = defineProps({
        titulo: {
            type: String,
            default: ""
        }
    })
</script>