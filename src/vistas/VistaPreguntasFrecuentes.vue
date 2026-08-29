<template>
    <div class="my-20">
        <h1 class="text-4xl text-center text-brand-500 font-bold">Preguntas Frecuentes</h1>
        <div class="mt-14 flex flex-col items-center">
            <ListaPreguntaFrecuente
                titulo="Preguntas Generales"
                v-model="acordionAbierto"                
            >
                <ListaPreguntaFrecuente
                    titulo="¿Cuáles son sus horarios de atencion?"
                    tipo="hijo"
                />
                <ListaPreguntaFrecuente
                    titulo="¿Dónde están ubicados y cómo puedo llegar?"
                    tipo="hijo"
                />
            </ListaPreguntaFrecuente>
            <ListaPreguntaFrecuente
                titulo="Pedidos y Compras"
                v-model="acordionAbierto"
            />
            <ListaPreguntaFrecuente
                titulo="Envíos y Entregas"
                v-model="acordionAbierto"
            />
            <ListaPreguntaFrecuente
                titulo="Devoluciones y garantías"
                v-model="acordionAbierto"
            />
            <ListaPreguntaFrecuente
                titulo="Productos e Inventario"
                v-model="acordionAbierto"
            />
        </div>
    </div>
</template>

<script setup>
    import ListaPreguntaFrecuente from '@/componentes/ListaPreguntaFrecuente.vue';
    import { ref } from 'vue';

    const acordionAbierto = ref('');
</script>