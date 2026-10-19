<template>
    <div class="p-6 max-w-6xl mx-auto space-y-6">
        <!-- Encabezado del componente con los nombres, buscador y boton para añadir -->
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
        <!-- Tabla de problemas -->
        <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-gray-600">
                    <!-- Encabezados de la tabla -->
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
                    <!-- Cuerpo de la tabla -->
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

                            <td class="px-6 py-4 text-center align-middle ">
                                <!-- Badge contador (se muestra si hay imágenes) -->
                                <div v-if="item?.imagenes && item.imagenes.length > 0" class="flex items-center justify-center relative group overflow-visible">
                                    <button                                         
                                        type="button"
                                        @click="abrirVisor(item.imagenes)"
                                        class="inline-flex items-center justify-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all border border-emerald-200/60 whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
                                    >
                                        <IconPhoto class="w-3.5 h-3.5 shrink-0" />
                                        <span>{{ item.imagenes.length }} img</span>
                                    </button>

                                    <!-- Popover Flotante de imagenes-->
                                    <div 
                                    v-if="item?.imagenes && item.imagenes.length > 0"
                                    class="absolute z-50 bottom-full left-1/2 -translate-x-1/2 pb-3 hidden group-hover:flex flex-col items-center pointer-events-auto"
                                    >
                                        <!-- Cajita blanca con sombras y bordes -->
                                        <div class="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl shadow-xl">
                                            <img 
                                            v-for="(url, i) in item.imagenes" 
                                            :key="i"
                                            :src="formatearRutaImagen(url)" 
                                                    @click.stop="abrirVisor(item.imagenes, i)"
                                                    class="w-11 h-11 object-cover rounded-lg border border-gray-100 hover:scale-105 hover:border-brand-500 transition-all cursor-pointer shadow-xs shrink-0"
                                                    title="Haz clic para ampliar"
                                                    />
                                        </div>
                                    </div>
                                </div>
                                <span v-else class="text-xs text-gray-400 italic">
                                    0 img
                                </span>

                            </td>
                            <!-- Acciones para gestionar los datos -->
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
            <!-- Layout de 2 columnas para extenderse horizontalmente -->
            <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Columna Izquierda: Campos del problema -->
                <div class="space-y-4">
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
                                class="p-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-500 flex-shrink-0"
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
                </div>

                <!-- Columna Derecha: Mini SCRUD de imágenes -->
                <div class="space-y-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                    <div class="space-y-3">
                        <label class="block text-xs font-semibold text-gray-600">
                            Imágenes adjuntas del problema
                        </label>

                        <!-- Input y Botón para agregar imagen -->
                        <div class="flex items-center gap-2 w-full">
                            <input
                                @change="fileHandle"
                                type="file"
                                accept="image/*"
                                ref="nuevaImagenInput"
                                placeholder="Ruta o URL de la imagen..."
                                class="flex-1 min-w-0 px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-600 file:text-brand-700 hover:file:bg-brand-800 cursor-pointer"
                            />
                            <button
                                type="button"
                                @click="agregarImagen"
                                class="flex items-center gap-1 p-2 text-xs bg-brand-800 hover:bg-brand-500 text-white font-medium rounded-lg transition-colors whitespace-nowrap shadow-xs"
                            >
                                <IconCirclePlus class="w-5 h-5" />Agregar
                            </button>
                        </div>

                        <!-- Tabla de imágenes adjuntas -->
                        <div class="border border-gray-200 rounded-lg overflow-hidden bg-gray-50/50 max-h-[300px] overflow-y-auto">
                            <table class="w-full text-left text-xs text-gray-600">
                                <thead class="bg-gray-100 border-b border-gray-200 text-gray-500 font-semibold uppercase sticky top-0">
                                    <tr>
                                        <th class="px-3 py-2 w-8">#</th>
                                        <th class="px-3 py-2">Nombre</th>
                                        <th class="px-3 py-2 text-center w-14">Acción</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 bg-white">
                                    <tr 
                                        v-for="(img, idx) in form.imagenes" 
                                        :key="(img && img.name) ? img.name + idx : img + idx"
                                        class="hover:bg-gray-50"
                                    >
                                        <td class="px-3 py-2 font-mono text-gray-400">
                                            {{ idx + 1 }}
                                        </td>
                                        <td class="px-3 py-2 font-mono truncate max-w-[180px]" :title="obtenerNombreMostrar(img)">
                                            {{ obtenerNombreMostrar(img) }}
                                        </td>
                                        <td class="px-3 py-2 text-center">
                                            <button
                                                type="button"
                                                @click="eliminarImagen(idx)"
                                                class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Eliminar imagen"
                                            >
                                                <IconTrash class="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="!form.imagenes || form.imagenes.length === 0">
                                        <td 
                                            colspan="3" 
                                            class="px-3 py-8 text-center text-gray-400 text-xs italic"
                                        >
                                            No se han adjuntado imágenes para este problema
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Nota informativa sutil -->
                    <p class="text-[11px] text-gray-400 italic">
                        * Las imágenes añadidas se guardarán junto con el problema al hacer clic en Guardar.
                    </p>
                </div>
            </form>
        </modalAdministracion>

        <selectorIconos
            :abierto="mostrarSelector"
            :iconoSeleccionado="form.icon"
            @cerrar="mostrarSelector = false"
            @seleccionar="(nombre) => (form.icon = nombre)"
        />
        <Teleport to="body">
            <div 
                v-if="mostrarVisor" 
                class="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-4"
                @click.self="cerrarVisor"
            >
                <!-- Botón Cerrar -->
                <button 
                    type="button" 
                    @click="cerrarVisor"
                    class="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer"
                >
                    <IconX class="w-6 h-6" />
                </button>

                <!-- Imagen principal ampliada -->
                <div class="relative max-w-4xl max-h-[75vh] flex items-center justify-center">
                    <img 
                        :src="formatearRutaImagen(listaVisor[idxVisor])" 
                        class="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
                    />
                </div>

                <!-- Barra inferior de miniaturas para cambiar de imagen -->
                <div v-if="listaVisor.length > 1" class="flex items-center gap-2 mt-4 p-2 bg-white/10 rounded-xl backdrop-blur-md">
                    <img 
                        v-for="(url, idx) in listaVisor" 
                        :key="idx" 
                        :src="formatearRutaImagen(url)" 
                        @click="idxVisor = idx"
                        :class="[
                            'w-12 h-12 object-cover rounded-lg cursor-pointer transition-all border-2',
                            idx === idxVisor ? 'border-brand-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        ]"
                    />
                </div>
            </div>
        </Teleport>
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

// Variable para el input de agregar imagen (único agregado auxiliar para el mini SCRUD visual)
const nuevaImagenInput = ref(null);
// Variable para las imagenes seleccionadas en el momento
const archivoSeleccionado = ref(null);
// Variable para guardar cada imagen que se va agregando
const archivoNuevo = ref([]);

// Funciones auxiliares para el manejo local de la tablita de imágenes dentro del modal
const agregarImagen = () => {
    if (!archivoSeleccionado.value) return;

    if (!form.value.imagenes) {
        form.value.imagenes = [];
    }

    const file = archivoSeleccionado.value;

    // Guardamos el objeto File tanto para el payload final de Multer como para renderizar en la tabla
    archivoNuevo.value.push(file);
    form.value.imagenes.push(file);

    // Limpiamos las referencias y el input HTML
    archivoSeleccionado.value = null;
    if (nuevaImagenInput.value) {
        nuevaImagenInput.value.value = "";
    }
};
// Función para obtener el nombre del archivo que mostrara en la tabla
const obtenerNombreMostrar = (img) => {
    if (img && typeof img === 'object' && 'name' in img) {
        return img.name;
    }
    return typeof img === 'string' ? img.split('/').pop() : img;
}
// Función para eliminar la imagen dentro de la tabla del modal
const eliminarImagen = async (index) => {
    const item = form.value.imagenes[index];
    const confirmar = await alerta.confirmar('Confirmar acción', '¿Eliminar imagen?');
    if (!confirmar) {
        return;
    }
    if (item instanceof File) {
        const nuevo = archivoNuevo.value.indexOf(item);
        if (nuevo !== -1) {
            archivoNuevo.value.splice(nuevo, 1);
        }
    }
    form.value.imagenes.splice(index, 1);
};

// Funcion para cuando abre el modal desde el boton (sin un id)
const abrirModalCrear = () => {
    modoEdicion.value = false;
    nuevaImagenInput.value = "";
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
    nuevaImagenInput.value = "";
    form.value = { ...item,
        tipo: item.categoriaId,
        imagenes: item.imagenes ? [...item.imagenes] : []
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
// Función que maneja los archivos (imagenes) que se ingresan en el input de tipo file
const fileHandle = (event) => {
    const file = event.target.files[0];
    if (file) {
        archivoSeleccionado.value = file;
    }
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

        const imagenesAnteriores = (form.value.imagenes || []).filter(img => typeof img === 'string');
        const imagenesParaSubir = (form.value.imagenes || []).filter(img => img instanceof File);
        let rutaNueva = [];

        if (imagenesParaSubir.length > 0) {
            const formData = new FormData();
            imagenesParaSubir.forEach(file => {formData.append('imagenes', file)});
            const resUpload = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                }
            });

            if (resUpload.data && resUpload.data.rutas) {
                rutaNueva = resUpload.data.rutas;
            }
        }
        const imagenesFinales = [...imagenesAnteriores, ...rutaNueva];
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
                    imagenes: imagenesFinales
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
                    imagenes: imagenesFinales
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
                imagenes: imagenesFinales
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
        // variable para encontrar el problema a eliminar
        const problemaAEliminar = categoriaPadre.problemas.find(p => p.id === Id);
        // Concición que se cumple si tiene imagenes en el registro para eliminarlas del uploads
        if (problemaAEliminar && problemaAEliminar.imagenes && problemaAEliminar.imagenes.length > 0) {
            for (const ruta of problemaAEliminar.imagenes) {
                // Solo intentamos eliminar si la ruta es una cadena de texto válida
                if (typeof ruta === 'string') {
                    try {
                        await axios.delete('http://localhost:3000/api/upload', {
                            params: { ruta: ruta }
                        });
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        }

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

// Estado para el visor de imágenes (Lightbox)
const mostrarVisor = ref(false);
const listaVisor = ref([]);
const idxVisor = ref(0);

// Abre el visor con las imágenes del problema seleccionado
const abrirVisor = (imagenes, indexInicio = 0) => {
    listaVisor.value = imagenes;
    idxVisor.value = indexInicio;
    mostrarVisor.value = true;
};

// Cierra el visor
const cerrarVisor = () => {
    mostrarVisor.value = false;
    listaVisor.value = [];
    idxVisor.value = 0;
};

// Formatea las rutas por si vienen relativas (`/uploads/...`) o absolutas (`http://...`)
const formatearRutaImagen = (url) => {
    if (!url) return '';
    if (typeof url !== 'string') return '';
    return url.startsWith('http') ? url : `http://localhost:3000${url}`;
};

onMounted(() => {
    obtenerListaPreguntas();
});
</script>