<template>
    <div class="p-6 max-w-6xl mx-auto space-y-6">
        <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
            <div>
                <h1 class="text-2xl font-bold text-gray-800">
                    Administración de problemas
                </h1>
                <p class="text-sm text-gray-500">
                    Administra los problemas específicos y su detalle.
                </p>
            </div>
            <div class="flex items-center gap-3 w-full md:w-auto">
                <input
                    v-model="busqueda"
                    type="text"
                    placeholder="Buscar problema o tipo:..."
                    class="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 w-full md:w-64"
                />
                <button
                    @click="abrirModalCrear"
                    class="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-brand-50 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                    <IconCirclePlus class="w-5 h-5" />
                    <span>Nuevo problema</span>
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
                            <th class="px-6 py-3">Problema y Resumen</th>
                            <th class="px-6 py-3">Tipo de problema</th>
                            <th class="px-6 py-3 w-24 text-center">Ícono</th>
                            <th class="px-6 py-3 text-center w-28">Adjuntos</th>
                            <th class="px-6 py-3 text-center w-32">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr
                            v-for="item in problemasFiltrados"
                            :key="item.id"
                            class="hover:bg-gray-50 transition-colors"
                        >
                            <td
                                class="px-6 py-4 font-mono text-xs text-gray-400"
                            >
                                #{{ item.id }}
                            </td>
                            <td class="px-6 py-4">
                                <p
                                    class="font-semibold text-gray-800 line-clamp-1"
                                >
                                    {{ item.titulo }}
                                </p>
                                <p class="text-xs text-gray-500 line-clamp-1">
                                    {{ item.subtitulo }}
                                </p>
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap"
                                >
                                    {{ item.tipo }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <div
                                    class="inline-flex items-center justify-center p-2 rounded-lg bg-brand-50 text-brand-500 border border-brand-200"
                                >
                                    <component
                                        :is="item.icon"
                                        class="w-5 h-5"
                                    />
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span
                                    :class="
                                        item.imagenes?.length
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-gray-100 text-gray-400'
                                    "
                                    class="px-2 py-0.5 rounded text-xs font-medium"
                                >
                                    {{ item.imagenes?.length || 0 }} img
                                </span>
                            </td>
                            <td class="px-6 py-4 text-center space-x-2">
                                <button
                                    @click="abrirModalEditar(item)"
                                    class="p-1 text-gray-500 hover:text-brand-500 transition-colors"
                                >
                                    <IconEdit class="w-5 h-5" />
                                </button>
                                <button @click="eliminarPregunta(item.id)"
                                    class="p-1 text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <IconTrash class="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="problemasFiltrados.length === 0">
                            <td
                                colspan="6"
                                class="px-6 py-8 text-center text-gray-400 text-xs"
                            >
                                No se encontraron problemas que coincidan con
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
            @guardar="manejoGuardarProblema"
        >
            <form class="space-y-4">
                <div>
                    <label
                        class="block text-xs font-semibold text-gray-600 mb-1"
                        >Tipo de problema (Categoría)</label
                    >
                    <select
                        v-model="form.tipo"
                        class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 bg-white"
                    >
                        <option value="" disabled>Selecciona un tipo...</option>
                        <option
                            v-for="item in listaCategorias"
                            :key="item.id"
                            :value="item.id"
                        >
                            {{ item.titulo }}
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        class="block text-xs font-semibold text-gray-600 mb-1"
                        >Título del problema</label
                    >
                    <input
                        v-model="form.titulo"
                        type="text"
                        placeholder="Ej. Errores en facturación o cobro"
                        class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500"
                    />
                </div>

                <div>
                    <label
                        class="block text-xs font-semibold text-gray-600 mb-1"
                        >Subtítulo (Resumen breve)</label
                    >
                    <input
                        v-model="form.subtitulo"
                        type="text"
                        placeholder="Ej. Descarga de facturas y corrección de datos"
                        class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500"
                    />
                </div>

                <div>
                    <label
                        class="block text-xs font-semibold text-gray-600 mb-1"
                        >Descripción detallada</label
                    >
                    <textarea
                        v-model="form.descripcion"
                        rows="3"
                        placeholder="Describe el paso a paso o la solución del problema..."
                        class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 resize-none"
                    ></textarea>
                </div>

                <div>
                    <label
                        class="block text-xs font-semibold text-gray-600 mb-1"
                        >Ícono del problema</label
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
                            placeholder="Ej. IconError404Off"
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
import modalAdministracion from "@/componentes/administrador/modalAdministracion.vue";
import selectorIconos from "@/componentes/administrador/selectorIconos.vue";
import { alertas } from "@/recursos/alertas";

const alerta = alertas();
const busqueda = ref("");
const mostrarModal = ref(false);
const mostrarSelector = ref(false);
const modoEdicion = ref(false);
// Variables reactivas para las API
const listaCategorias = ref([]);
const cargando = ref(true);
const API_url = "http://localhost:3000/api/categorias";

const form = ref({
    id: null,
    tipo: "",
    titulo: "",
    subtitulo: "",
    descripcion: "",
    icon: "",
    imagenes: [],
});

const tituloModal = computed(() => {
    return modoEdicion.value ? "Editar problema" : "Añadir problema";
});
// Funcion para cuando abre el modal desde el boton (sin un id)
const abrirModalCrear = () => {
    modoEdicion.value = false;
    form.value = {
        id: null,
        tipo: "",
        titulo: "",
        subtitulo: "",
        descripcion: "",
        icon: "",
        imagenes: [],
    };
    mostrarModal.value = true;
};
// Función para cuando se abre el modal de edicion que carga los items de la tabla
const abrirModalEditar = (item) => {
    modoEdicion.value = true;
    form.value = { ...item,
        tipo: item.categoriaId
    };
    mostrarModal.value = true;
};
// Función para enviar el id personalizado en base a la categoria que pertenece
const idProblema = (idCategoria) => {
    const idCat = typeof idCategoria === 'object' ? idCategoria.id : idCategoria;
    const categoria = listaCategorias.value.find(c => String(c.id) === String(idCat));
    if (!categoria || !categoria.problemas || categoria.problemas.length === 0) {
        return `p-${idCat}01`;
    }
    const numerosId = categoria.problemas.map(p => {
        const num = p.id.replace('p-','');
        return parseInt(num, 10) || 0;
    });
    const maxNum = Math.max(...numerosId);
    return `p-${maxNum + 1}`;
}
// Función asincronica que obtiene las categorias del json
const obtenerListaPreguntas = async () => {
    try {
        cargando.value = true;
        const respuesta = await axios.get(API_url);
        listaCategorias.value = respuesta.data;
    } catch (error) {
        console.log(error);
    } finally {
        cargando.value = false;
    }
};
// Función que maneja el agregar y el actualizar de los problemas
const manejoGuardarProblema = async () => {
    if (form.value.titulo === "" || form.value.subtitulo === "" || form.value.descripcion === "" || form.value.icon === "" || form.value.tipo === "") {
        alerta.infoToast("Verificación de campos", "Llenar los campos requeridos");
        return;
    }
    try {
        const categoria = listaCategorias.value.find(c => String(c.id) === String(form.value.tipo));

        if (!categoria) return;
        // Condición para cuando se actualiza
        if (form.value.id) {
            const categoriaAnterior = listaCategorias.value.find(c => 
                c.problemas && c.problemas.some(p => p.id === form.value.id)
            );
            const data = {
                id: form.value.id,
                    titulo: form.value.titulo,
                    subtitulo: form.value.subtitulo,
                    descripcion: form.value.descripcion,
                    icon: form.value.icon,
                    imagenes: form.value.imagenes || []
            };
            if (categoriaAnterior && String(categoriaAnterior.id) !== String(categoria.id)) {
                categoriaAnterior.problemas = categoriaAnterior.problemas.filter(p => p.id !== form.value.id);
                await axios.put(`${API_url}/${categoriaAnterior.id}`, {
                    id: Number(categoriaAnterior.id),
                    titulo: categoriaAnterior.titulo,
                    icon: categoriaAnterior.icon,
                    problemas: categoriaAnterior.problemas
                })
                const nuevoId = idProblema(categoria.id);
                const data = {
                    id: nuevoId,
                    titulo: form.value.titulo,
                    subtitulo: form.value.subtitulo,
                    descripcion: form.value.descripcion,
                    icon: form.value.icon,
                    imagenes: form.value.imagenes || []
                };
                categoria.problemas.push(data);
            }
            else {
                const index = categoria.problemas.findIndex(p => p.id === form.value.id);
                if (index !== -1) {
                    categoria.problemas[index] = data;
                }
            }
        }
        // Condición para cuando se registra uno nuevo
        else {
            const data = {
                id: idProblema(categoria.id),
                titulo: form.value.titulo,
                subtitulo: form.value.subtitulo,
                descripcion: form.value.descripcion,
                icon: form.value.icon,
                imagenes: form.value.imagenes || []
            }
            categoria.problemas.push(data);
        }
        const respuesta = await axios.put(`${API_url}/${categoria.id}`, {
            id: Number(categoria.id),
            titulo: categoria.titulo,
            icon: categoria.icon,
            problemas: categoria.problemas
        });
        const catIndex = listaCategorias.value.findIndex(c => String(c.id) === String(categoria.id));
        if (catIndex !== -1) {
            listaCategorias.value[catIndex] = respuesta.data;
        }
        alerta.exitoToast("Exito", "Información añadida exitosamente");
        mostrarModal.value = false;
    } catch (error) {
        console.log(error);
    }
};
// Función para eliminar el registro
const eliminarPregunta = async (Id) => {
    try {
        const confirmacion = await alerta.confirmar(
            "Confirmar acción",
            "¿Estas seguro de eliminar el registro?",
        );
        if (!confirmacion) {
            return;
        }
        const categoriaPadre = listaCategorias.value.find(c => 
            c.problemas && c.problemas.some(p => p.id === Id)
        );
        const problemasActualizados = categoriaPadre.problemas.filter(
            p => p.id !== Id
        );
        const respuesta = await axios.put(`${API_url}/${categoriaPadre.id}`, {
            id: Number(categoriaPadre.id),
            titulo: categoriaPadre.titulo,
            icon: categoriaPadre.icon,
            problemas: problemasActualizados
        });
        const index = listaCategorias.value.findIndex(c => c.id === categoriaPadre.id);
        if (index !== -1) {
            listaCategorias.value[index] = respuesta.data;
        }
        await alerta.exitoToast("Exito", "Registro eliminado correctamente");
    } catch (error) {
        console.log(error);
    }
}
// Filtrado en la tabla automatico
const problemasFiltrados = computed(() => {
    if (!Array.isArray(listaCategorias.value)) return [];

    const todosLosProblemas = listaCategorias.value.flatMap(categoria => {
        if (!categoria.problemas || !Array.isArray(categoria.problemas)) return [];

        return categoria.problemas.map(problema => ({
            ...problema,
            tipo: categoria.titulo,
            categoriaId: categoria.id 
        }));
    });

    if (!busqueda.value.trim()) return todosLosProblemas;

    const busquedaLimpia = busqueda.value.toLowerCase().trim();

    if (busquedaLimpia.startsWith("tipo:")) {
        const terminoTipo = busquedaLimpia.replace("tipo:", "").trim();
        return todosLosProblemas.filter(item =>
            item.tipo && item.tipo.toLowerCase().includes(terminoTipo)
        );
    }

    return todosLosProblemas.filter(item => {
        const titulo = item.titulo ? item.titulo.toLowerCase() : '';
        const subtitulo = item.subtitulo ? item.subtitulo.toLowerCase() : '';
        const id = item.id ? item.id.toString().toLowerCase() : '';
        const tipo = item.tipo ? item.tipo.toLowerCase() : '';

        return (
            titulo.includes(busquedaLimpia) ||
            subtitulo.includes(busquedaLimpia) ||
            id.includes(busquedaLimpia) ||
            tipo.includes(busquedaLimpia)
        );
    });
});

onMounted(() => {
    obtenerListaPreguntas();
});
</script>
