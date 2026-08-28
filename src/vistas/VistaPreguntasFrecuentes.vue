<template>
    <div class="my-20">
        <h1 class="text-4xl text-center text-brand-500 font-bold">Preguntas Frecuentes</h1>
        <div class="mt-14 flex flex-col items-center">
            <ListaPreguntaFrecuente
                titulo="Preguntas Generales"
            />
            <ListaPreguntaFrecuente
                titulo="Pedidos y Compras"
            />
            <ListaPreguntaFrecuente
                titulo="Envíos y Entregas"
            />
            <ListaPreguntaFrecuente
                titulo="Devoluciones y garantías"
            />
            <ListaPreguntaFrecuente
                titulo="Productos e Inventario"
            />
        </div>
    </div>
</template>

<script setup>
    import ListaPreguntaFrecuente from '@/componentes/ListaPreguntaFrecuente.vue';
</script>