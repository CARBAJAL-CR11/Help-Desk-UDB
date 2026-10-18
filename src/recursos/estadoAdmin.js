// Archivo js con el fin de manejar rol de admin en el sitio web
import { ref } from "vue";

// Exposición de variable global para el uso de rol de admin
export const esAdmin = ref(false);

// Método para activar modo admin 
export const activarModoAdmin = () => {
    esAdmin.value = true;
};

// Método para desactivar modo admin 
export const desactivarModoAdmin = () => {
    esAdmin.value = false;
};
