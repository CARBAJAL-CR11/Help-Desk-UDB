import { createRouter, createWebHistory } from "vue-router";

// Importación de componentes principales
import VistaInicio from "@/vistas/VistaInicio.vue";

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
            // Caso de pagina no encontrada (ERROR 404)
            path: '/:catchAll(.*)',
            name: 'error404',
            component: VistaInicio,
        }
    ],
});

export default router;