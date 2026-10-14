<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Administración de problemas</h1>
        <p class="text-sm text-gray-500">Administra los problemas específicos y su detalle.</p>
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <input v-model="busqueda" type="text" placeholder="Buscar problema o tipo:..." class="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 w-full md:w-64"/>
        <button @click="abrirModalCrear" class="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-brand-50 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-xs">
          <IconCirclePlus class="w-5 h-5" />
          <span>Nuevo problema</span>
        </button>
      </div>
    </div>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500">
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
            <tr v-for="item in problemasFiltrados" :key="item.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-mono text-xs text-gray-400">#{{ item.id }}</td>
              <td class="px-6 py-4">
                <p class="font-semibold text-gray-800 line-clamp-1">{{ item.titulo }}</p>
                <p class="text-xs text-gray-500 line-clamp-1">{{ item.subtitulo }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="inline-block bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap">
                  {{ item.tipo }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <div class="inline-flex items-center justify-center p-2 rounded-lg bg-brand-50 text-brand-500 border border-brand-200">
                  <component :is="item.icon" class="w-5 h-5" />
                </div>
              </td>
              <td class="px-6 py-4 text-center">
                <span 
                  :class="item.imagenes?.length ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'"
                  class="px-2 py-0.5 rounded text-xs font-medium"
                >
                  {{ item.imagenes?.length || 0 }} img
                </span>
              </td>
              <td class="px-6 py-4 text-center space-x-2">
                <button @click="abrirModalEditar(item)" class="p-1 text-gray-500 hover:text-brand-500 transition-colors">
                  <IconEdit class="w-5 h-5"/>
                </button>
                <button class="p-1 text-gray-500 hover:text-red-500 transition-colors">
                  <IconTrash class="w-5 h-5"/>
                </button>
              </td>
            </tr>
            <tr v-if="problemasFiltrados.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-400 text-xs">
                No se encontraron problemas que coincidan con "{{ busqueda }}"
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
      @guardar="mostrarModal = false"
    >
      <form class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Tipo de problema (Categoría)</label>
          <select v-model="form.tipo" class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 bg-white">
            <option value="" disabled>Selecciona un tipo...</option>
            <option value="Preguntas Generales">Preguntas Generales</option>
            <option value="Pedidos y Compras">Pedidos y Compras</option>
            <option value="Envíos y Entregas">Envíos y Entregas</option>
            <option value="Devoluciones y Garantías">Devoluciones y Garantías</option>
            <option value="Productos e Inventario">Productos e Inventario</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Título del problema</label>
          <input 
            v-model="form.titulo"
            type="text" 
            placeholder="Ej. Errores en facturación o cobro" 
            class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Subtítulo (Resumen breve)</label>
          <input 
            v-model="form.subtitulo"
            type="text" 
            placeholder="Ej. Descarga de facturas y corrección de datos" 
            class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Descripción detallada</label>
          <textarea 
            v-model="form.descripcion"
            rows="3" 
            placeholder="Describe el paso a paso o la solución del problema..." 
            class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 resize-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">Ícono del problema</label>
          <div class="flex items-center gap-3">
            <div v-if="form.icon" class="p-2 rounded-lg bg-brand-50 border border-brand-200 text-brand-500">
              <component :is="form.icon" class="w-5 h-5" />
            </div>
            <input 
              v-model="form.icon"
              type="text" 
              readonly 
              placeholder="Ej. IconError404Off" 
              class="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 font-mono bg-gray-50 text-gray-700 cursor-not-allowed select-none"
            />
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
  tipo: '',
  titulo: '',
  subtitulo: '',
  descripcion: '',
  icon: '',
  imagenes: []
})

const tituloModal = computed(() => {
  return modoEdicion.value ? 'Editar problema' : 'Añadir problema'
})

const abrirModalCrear = () => {
  modoEdicion.value = false
  form.value = { id: null, tipo: '', titulo: '', subtitulo: '', descripcion: '', icon: '', imagenes: [] }
  mostrarModal.value = true
}

const abrirModalEditar = (item) => {
  modoEdicion.value = true
  form.value = { ...item }
  mostrarModal.value = true
}

const problemasPrueba = ref([
  {
    id: "p-101",
    tipo: "Preguntas Generales",
    titulo: "Errores en facturación o cobro",
    subtitulo: "Descarga de facturas, corrección de datos y recibos",
    descripcion: "¿Hiciste un cargo a tu cuenta pero no recibiste la factura?",
    icon: "IconError404Off",
    imagenes: ["/uploads/factura.png"]
  },
  {
    id: "p-201",
    tipo: "Pedidos y Compras",
    titulo: "Fallas al comprar o en el carrito",
    subtitulo: "Error en pasarela de pagos, stock y carrito bloqueado",
    descripcion: "¿Te apareció un error al intentar agregar un producto?",
    icon: "IconShoppingCartX",
    imagenes: []
  },
  {
    id: "p-301",
    tipo: "Envíos y Entregas",
    titulo: "Seguimiento de paquete en tránsito",
    subtitulo: "Códigos de rastreo, retrasos de paquetería y coberturas",
    descripcion: "Consulta la guía enviada a tu correo para conocer la ubicación exacta de tu paquete.",
    icon: "IconTruckDelivery",
    imagenes: []
  }
])

const problemasFiltrados = computed(() => {
  if (!busqueda.value.trim()) return problemasPrueba.value

  const busquedaLimpia = busqueda.value.toLowerCase().trim()

  // para el amigo programador, ejemplo de como buscar problemas por tipos (preguntas frecuentes): tipo:Compras :P
  if (busquedaLimpia.startsWith('tipo:')) {
    const terminoTipo = busquedaLimpia.replace('tipo:', '').trim()
    return problemasPrueba.value.filter(item => 
      item.tipo.toLowerCase().includes(terminoTipo)
    )
  }

  return problemasPrueba.value.filter(item => 
    item.titulo.toLowerCase().includes(busquedaLimpia) ||
    item.subtitulo.toLowerCase().includes(busquedaLimpia) ||
    item.id.toLowerCase().includes(busquedaLimpia) ||
    item.tipo.toLowerCase().includes(busquedaLimpia)
  )
})
</script>