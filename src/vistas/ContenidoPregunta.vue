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
                <h3 class="font-bold text-brand-800">Opciones para llegar:</h3>
                
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
            <section v-if="preguntaActiva === 'contacto'" class="space-y-6 text-slate-800">
                <h2 class="text-2xl sm:text-3xl font-bold text-brand-800 mb-6">
                ¿Cómo puedo ponerme en contacto con el servicio de atención al cliente?
                </h2>
                <div class="space-y-4 leading-relaxed">
                    <p class="font-semibold text-brand-800">
                        Puedes comunicarte con nuestro equipo de atención al cliente a través de varios canales:
                    </p>
                    <ul class="list-disc pl-5 space-y-3 text-brand-800">
                        <li><strong>Correo electrónico:</strong> Envíanos un mensaje a <a href="mailto:soporte@ejemplo.com" class="text-brand-600 underline font-medium">soporte@ejemplo.com</a> y te responderemos en un plazo máximo de 24 horas laborables.</li>
                        <li><strong>Teléfono / WhatsApp:</strong> Llámanos o escríbenos al <span class="font-semibold">+34 900 000 000</span>.</li>
                        <li><strong>Formulario web:</strong> Puedes rellenar el formulario en la sección de contacto de nuestra página para recibir asistencia directa.</li>
                    </ul>
                </div>
            </section>
            <section v-if="preguntaActiva === 'horarios'" class="space-y-6 text-slate-800">
                <h2 class="text-2xl sm:text-3xl font-bold text-brand-800 mb-6">
                ¿Cuáles son sus horarios de atencion?
                </h2>
                <div class="space-y-4 leading-relaxed">
                    <p class="font-semibold text-brand-800">
                        Nuestro horario de atención al público y soporte técnico es el siguiente:
                    </p>
                    <ul class="list-disc pl-5 space-y-3 text-brand-800">
                        <li><strong>De Lunes a Viernes:</strong> 9:00 h a 18:00 h (ininterrumpido).</li>
                        <li><strong>Sábados:</strong> 10:00 h a 14:00 h.</li>
                        <li><strong>Domingos y festivos:</strong> Cerrado.</li>
                    </ul>
                    <p class="font-semibold text-brand-800">
                        * Nota: Si nos escribes fuera de este horario, procesaremos tu solicitud al inicio del siguiente día hábil.
                    </p>
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