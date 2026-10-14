<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Administración de preguntas frecuentes</h1>
        <p class="text-sm text-gray-500">Administra las preegorías principales de preguntas frecuentes.</p>
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <input v-model="busqueda" type="text" placeholder="Buscar pregunta..." class="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 w-full md:w-64"/>
        <button @click="abrirModalCrear" class="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-brand-50 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-xs">
            <IconCirclePlus class="w-5 h-5" /><span>Nueva pregunta</span>
        </button>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th class="px-6 py-3 w-20">ID</th>
              <th class="px-6 py-3">Título de pregunta</th>
              <th class="px-6 py-3 w-24 text-center">Ícono</th>
              <th class="px-6 py-3 text-center w-32">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="pre in preguntasFiltradas" :key="pre.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-mono text-xs text-gray-400">#{{ pre.id }}</td>
              <td class="px-6 py-4 font-semibold text-gray-800">{{ pre.titulo }}</td>
              <td class="px-6 py-4 text-center">
                <div class="inline-flex items-center justify-center p-2 rounded-lg bg-brand-50 text-brand-500 border border-brand-200">
                  <component :is="pre.icon" class="w-5 h-5" />
                </div>
              </td>
              <td class="px-6 py-4 text-center space-x-2">
                <button @click="abrirModalEditar(pre)" class="p-1 text-gray-500 hover:text-brand-500 transition-colors">
                  <IconEdit class="w-5 h-5"/>
                </button>
                <button class="p-1 text-gray-500 hover:text-red-500 transition-colors">
                  <IconTrash class="w-5 h-5"/>
                </button>
              </td>
            </tr>
            <tr v-if="preguntasFiltradas.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-gray-400 text-xs">
                No se encontraron preguntas que coincidan con "{{ busqueda }}"
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <modalAdministracion :abierto="mostrarModal" :titulo="tituloModal"@cerrar="mostrarModal = false"@guardar="mostrarModal = false">
      <form class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Título de la pregunta</label>
          <input v-model="form.titulo"type="text" placeholder="Ej. Preguntas Generales" class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500"/>
        </div>
        <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1">Ícono de la pregunta</label>
            <div class="flex items-center gap-3">
                <div v-if="form.icon" class="p-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-500">
                    <component :is="form.icon" class="w-5 h-5" />
                </div>
                <input v-model="form.icon"type="text" readonly placeholder="Ej. IconZoomQuestion" class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 font-mono bg-gray-50 text-gray-700 cursor-not-allowed select-none"/>
                <button type="button" @click="mostrarSelector = true"class="px-3 py-2 text-xs bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-lg transition-colors whitespace-nowrap shadow-xs">
                Seleccionar...
                </button>
            </div>
        </div>
      </form>
    </modalAdministracion>

    <selectorIconos :abierto="mostrarSelector" :iconoSeleccionado="form.icon" @cerrar="mostrarSelector = false" @seleccionar="(nombre) => form.icon = nombre"/>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import modalAdministracion from '@/componentes/administrador/modalAdministracion.vue'
import selectorIconos from '@/componentes/administrador/selectorIconos.vue'

const busqueda = ref('')
const mostrarModal = ref(false)
const mostrarSelector = ref(false)
const modoEdicion = ref(false)

const form = ref({
  id: null,
  titulo: '',
  icon: ''
})

const tituloModal = computed(() => {
  return modoEdicion.value ? 'Editar pregunta' : 'Añadir pregunta'
})

const abrirModalCrear = () => {
  modoEdicion.value = false
  form.value = { id: null, titulo: '', icon: '' }
  mostrarModal.value = true
}

const abrirModalEditar = (pre) => {
  modoEdicion.value = true
  form.value = { ...pre }
  mostrarModal.value = true
}

const preguntasPrueba = ref([
  { id: "1", titulo: "Preguntas Generales", icon: "IconZoomQuestion" },
  { id: "2", titulo: "Pedidos y Compras", icon: "IconShoppingCart" },
  { id: "3", titulo: "Envíos y Entregas", icon: "IconTruckDelivery" },
  { id: "4", titulo: "Devoluciones y Garantías", icon: "IconRefresh" },
  { id: "5", titulo: "Productos e Inventario", icon: "IconBox" }
])

const preguntasFiltradas = computed(() => {
  if (!busqueda.value.trim()) return preguntasPrueba.value
  const termino = busqueda.value.toLowerCase().trim()

  return preguntasPrueba.value.filter(pre => 
    pre.titulo.toLowerCase().includes(termino) ||
    pre.id.toString().toLowerCase().includes(termino)
  )
})
</script>