import { createRouter, createWebHistory } from "vue-router";

// Importación de componentes principales
import VistaInicio from "@/vistas/VistaInicio.vue";
import VistaChat from "@/vistas/VistaChat.vue";
import VistaSobreNosotros from "@/vistas/VistaSobreNosotros.vue";
import VistaPreguntasFrecuentes from "@/vistas/VistaPreguntasFrecuentes.vue";

// Manejo del router para el cambio de vistas y uso de URL
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            // Ruta a pagina principal
            path: '/',
            name: 'inicio',
            component: VistaInicio

        },
        {
            // Ruta para chat de soporte
            path: '/chat-soporte',
            name: 'chat-soporte',
            component: VistaChat

        },
        {
            // Ruta para sobre nosotros
            path: '/sobre-nosotros',
            name: 'sobre-nosotros',
            component: VistaSobreNosotros

        },
        {
            // Ruta para preguntas frecuentes
            path: '/preguntas-frecuentes',
            name: 'preguntas-frecuentes',
            component: VistaPreguntasFrecuentes

        },
        {
            // Caso de pagina no encontrada (ERROR 404)
            path: '/:catchAll(.*)',
            name: 'error404',
            component: VistaInicio,
        }
    ],
});

export default router;