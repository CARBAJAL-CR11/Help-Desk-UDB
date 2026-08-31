<template>
    <div class="my-20">
        <h1 class="sm:text-4xl text-2xl text-center text-brand-500 font-bold">Preguntas Frecuentes</h1>
        <div class="mt-14 flex flex-col items-center">
            <ListaPreguntaFrecuente
                titulo="Preguntas Generales"
                v-model="acordionAbierto"                
            >
                <div @click="irADetalle('horarios')">
                    <ListaPreguntaFrecuente
                        titulo="¿Cuáles son sus horarios de atencion?"
                        tipo="hijo"
                    />
                </div>
                <div @click="irADetalle('ubicacion')">
                    <ListaPreguntaFrecuente
                        titulo="¿Dónde están ubicados y cómo puedo llegar?"
                        tipo="hijo"                        
                    />
                </div>
                <div @click="irADetalle('contacto')">
                    <ListaPreguntaFrecuente
                        titulo="¿Cómo puedo ponerme en contacto con el servicio de atención al cliente?"
                        tipo="hijo"                    
                    />
                </div>
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
    import ListaPreguntaFrecuente from '@/componentes/preguntasFrecuentes/ListaPreguntaFrecuente.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const acordionAbierto = ref('');

    const irADetalle = (clavePregunta) => {
        console.log('Navegando a la clave:', clavePregunta);
        router.push({
            name: 'preguntas-frecuentes-contenido', // Cambia esto por el nombre de tu ruta de detalle
            query: { pregunta: clavePregunta }
        });
    };
</script>