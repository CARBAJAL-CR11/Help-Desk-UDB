<template>
    <div class="min-h-screen flex flex-col lg:flex-row">
        <NavBarPreguntas v-model="preguntaActiva"/>
        <main class="flex-1 p-6 sm:p-12 lg:p-16 max-w-4xl">     
            <section v-if="preguntaActiva === 'ubicacion'" class="space-y-6 text-slate-800">
                <h2 class="text-2xl sm:text-3xl font-bold text-brand-800 mb-6">
                ¿Dónde están ubicados y cómo puedo llegar?
                </h2>

                <p class="font-semibold text-brand-800">
                Nos encontramos ubicados en el corazón de la ciudad en:
                </p>

                <p class="text-brand-800">
                <strong>Dirección:</strong> [Dirección exacta, ej.: Av. Franklin Roosevelt #123, Frente a Parque Cuscatlán, San Salvador].
                </p>

                <div class="space-y-4 pt-2">
                <h3 class="font-bold text-slate-900">Opciones para llegar:</h3>
                
                <ul class="list-disc pl-5 space-y-3 text-brand-800">
                    <li>
                    <strong>En vehículo propio:</strong> Contamos con estacionamiento privado y vigilado para nuestros clientes. Puedes encontrarnos fácilmente en tu app de navegación favorita (Google Maps o Waze) buscando simplemente "[Nombre de tu Tienda]".
                    </li>
                    <li>
                    <strong>En transporte público:</strong> Estamos ubicados a pocos pasos de las principales paradas de autobús. Las rutas [Ejemplo: Ruta 101, Ruta 52, etc.] te dejan justo frente o muy cerca de nuestro local.
                    </li>
                    <li>
                    <strong>Puntos de referencia cercanos:</strong> Nos encontramos a solo [Ejemplo: 2 cuadras de Metrocentro / a un costado del Hospital Bloom], lo que facilitará tu ubicación.
                    </li>
                </ul>
                </div>
                <div class="flex flex-col items-center">
                    <img class="text-" src="../recursos/imgs/ubicacion.png" alt="ubicacion" width="500">
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import NavBarPreguntas from '@/componentes/preguntasFrecuentes/navBarPreguntas.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const preguntaActiva = ref(route.query.pregunta || '');
    watch(
        () => route.query.pregunta,
        (nuevaPregunta) => {
            if (nuevaPregunta) {
            preguntaActiva.value = nuevaPregunta;
            }
        }
    );
</script>