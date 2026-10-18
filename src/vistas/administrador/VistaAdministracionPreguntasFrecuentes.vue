<template>
    <div class="p-6 max-w-6xl mx-auto space-y-6">
        <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
            <div>
                <h1 class="text-2xl font-bold text-gray-800">
                    Administración de preguntas frecuentes
                </h1>
                <p class="text-sm text-gray-500">
                    Administra las preegorías principales de preguntas
                    frecuentes.
                </p>
            </div>
            <div class="flex items-center gap-3 w-full md:w-auto">
                <input
                    v-model="busqueda"
                    type="text"
                    placeholder="Buscar pregunta..."
                    class="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 w-full md:w-64"
                />
                <button
                    @click="abrirModalCrear"
                    class="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-brand-50 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                    <IconCirclePlus class="w-5 h-5" /><span
                        >Nueva pregunta</span
                    >
                </button>
            </div>
        </div>
        <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-gray-600">
                    <thead
                        class="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500"
                    >
                        <tr>
                            <th class="px-6 py-3 w-20">ID</th>
                            <th class="px-6 py-3">Título de pregunta</th>
                            <th class="px-6 py-3 w-24 text-center">Ícono</th>
                            <th class="px-6 py-3 text-center w-32">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr
                            v-for="pre in preguntasFiltradas"
                            :key="pre.id"
                            class="hover:bg-gray-50 transition-colors"
                        >
                            <td
                                class="px-6 py-4 font-mono text-xs text-gray-400"
                            >
                                #{{ pre.id }}
                            </td>
                            <td class="px-6 py-4 font-semibold text-gray-800">
                                {{ pre.titulo }}
                            </td>
                            <td class="px-6 py-4 text-center">
                                <div
                                    class="inline-flex items-center justify-center p-2 rounded-lg bg-brand-50 text-brand-500 border border-brand-200"
                                >
                                    <component :is="pre.icon" class="w-5 h-5" />
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center space-x-2">
                                <button
                                    @click="abrirModalEditar(pre)"
                                    class="p-1 text-gray-500 hover:text-brand-500 transition-colors"
                                >
                                    <IconEdit class="w-5 h-5" />
                                </button>
                                <button
                                    @click="eliminarPregunta(pre.id)"
                                    class="p-1 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <IconTrash class="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="listaPreguntas.length === 0">
                            <td
                                colspan="4"
                                class="px-6 py-8 text-center text-gray-400 text-xs"
                            >
                                No hay preguntas añadidas
                            </td>
                        </tr>
                        <tr v-else-if="preguntasFiltradas.length === 0">
                            <td
                                colspan="4"
                                class="px-6 py-8 text-center text-gray-400 text-xs"
                            >
                                No se encontraron preguntas que coincidan con
                                "{{ busqueda }}"
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <modalAdministracion
            :abierto="mostrarModal"
            :titulo="tituloModal"
            @cerrar="mostrarModal = false"
            @guardar="manejoGuardarPreguntas"
        >
            <form class="space-y-4">
                <div>
                    <label
                        class="block text-xs font-semibold text-gray-600 mb-1"
                        >Título de la pregunta</label
                    >
                    <input
                        v-model="form.titulo"
                        type="text"
                        placeholder="Ej. Preguntas Generales"
                        class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500"
                    />
                </div>
                <div>
                    <label
                        class="block text-xs font-semibold text-gray-600 mb-1"
                        >Ícono de la pregunta</label
                    >
                    <div class="flex items-center gap-3">
                        <div
                            v-if="form.icon"
                            class="p-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-500"
                        >
                            <component :is="form.icon" class="w-5 h-5" />
                        </div>
                        <input
                            v-model="form.icon"
                            type="text"
                            readonly
                            placeholder="Ej. IconZoomQuestion"
                            class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 font-mono bg-gray-50 text-gray-700 cursor-not-allowed select-none"
                        />
                        <button
                            type="button"
                            @click="mostrarSelector = true"
                            class="px-3 py-2 text-xs bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-lg transition-colors whitespace-nowrap shadow-xs"
                        >
                            Seleccionar...
                        </button>
                    </div>
                </div>
            </form>
        </modalAdministracion>

        <selectorIconos
            :abierto="mostrarSelector"
            :iconoSeleccionado="form.icon"
            @cerrar="mostrarSelector = false"
            @seleccionar="(nombre) => (form.icon = nombre)"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import modalAdministracion from "@/componentes/administrador/ModalAdministracion.vue";
import selectorIconos from "@/componentes/administrador/SelectorIconos.vue";
import { alertas } from "@/recursos/alertas";

const alerta = alertas();
const busqueda = ref("");
const mostrarModal = ref(false);
const mostrarSelector = ref(false);
const modoEdicion = ref(false);
// Variables reactivas para la API
const listaPreguntas = ref([]);
const cargando = ref(true);
const API_url = "http://localhost:3000/api/categorias";

const form = ref({
    id: null,
    titulo: "",
    icon: "",
});

const obtenerListaPreguntas = async () => {
    try {
        cargando.value = true;
        const respuesta = await axios.get(API_url);
        listaPreguntas.value = respuesta.data;
    } catch (error) {
        console.log(error);
    } finally {
        cargando.value = false;
    }
};
// Función para manejar el guardado de nuevos registros y el actualizado de los que ya estaban
const manejoGuardarPreguntas = async () => {
    // Validación de campos requeridos
    if (form.value.titulo === "" || form.value.icon === "") {
        alerta.infoToast('Verificación de campos', 'Llenar los campos requeridos')
        return;
    }
    try {
        // Condicion para saber si recibe un id, si es asi, actualiza
        if (form.value.id) {
            const respuesta = await axios.put(`${API_url}/${form.value.id}`, {
                id: form.value.id,
                titulo: form.value.titulo,
                icon: form.value.icon,
                problemas: [],
            });
            const index = listaPreguntas.value.findIndex(
                (item) => item.id === form.value.id,
            );
            if (index !== -1) {
                listaPreguntas.value[index] = respuesta.data;
                alerta.exitoToast(
                    "Exito",
                    "Información actualizada exitosamente",
                );
            }
        }
        // Si no, añade un nuevo registro
        else {
            const data = {
                titulo: form.value.titulo,
                icon: form.value.icon,
                problemas: [],
            };
            const respuesta = await axios.post(API_url, data);
            listaPreguntas.value.push(respuesta.data);
            alerta.exitoToast("Exito", "Información añadida exitosamente");
        }
        mostrarModal.value = false;
    } catch (error) {
        console.log(error);
    }
};
// Función para eliminar el registro de la tabla
const eliminarPregunta = async (Id) => {
    try {
        const confirmacion = await alerta.confirmar(
            "Confirmar acción",
            "¿Estas seguro de eliminar el registro?",
        );
        if (!confirmacion) {
            return;
        }
        const respuesta = await axios.delete(`${API_url}/${Id}`);
        listaPreguntas.value = listaPreguntas.value.filter((p) => p.id !== Id);
        await alerta.exitoToast("Exito", "Registro eliminado correctamente");
    } catch (error) {
        console.log(error);
    }
};

const tituloModal = computed(() => {
    return modoEdicion.value ? "Editar pregunta" : "Añadir pregunta";
});

const abrirModalCrear = () => {
    modoEdicion.value = false;
    form.value = { id: null, titulo: "", icon: "" };
    mostrarModal.value = true;
};

const abrirModalEditar = (pre) => {
    modoEdicion.value = true;
    form.value = { ...pre };
    mostrarModal.value = true;
};

const preguntasFiltradas = computed(() => {
    if (!busqueda.value.trim()) return listaPreguntas.value;
    const termino = busqueda.value.toLowerCase().trim();

    return listaPreguntas.value.filter(
        (pre) =>
            pre.titulo.toLowerCase().includes(termino) ||
            pre.id.toString().toLowerCase().includes(termino),
    );
});

onMounted(() => {
    obtenerListaPreguntas();
});
</script>
