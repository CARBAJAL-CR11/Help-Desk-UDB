<template>
  <div class="p-6 max-w-7xl mx-auto h-[calc(100vh-5rem)]">
    <div class="flex h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      <div class="w-full md:w-96 flex flex-col border-r border-gray-200 bg-gray-50/50">
        <div class="p-4 border-b border-gray-200 bg-white space-y-3">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-800">Centro de Soporte</h1>
            <span class="px-2.5 py-0.5 bg-brand-50 text-brand-600 border border-brand-200 text-xs font-semibold rounded-full">
              {{ chatsFiltrados.length }} chats
            </span>
          </div>
          <div class="relative">
            <input 
              v-model="busqueda"
              type="text" 
              placeholder="Buscar por usuario o sesión..." 
              class="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:bg-white transition-all"
            />
            <span class="absolute left-3 top-2.5 text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto p-3 space-y-2">
          <TarjetaChat 
            v-for="chat in chatsFiltrados" 
            :key="chat.id"
            :chat="chat"
            :activo="chatActivo?.id === chat.id"
            @seleccionar="chatActivo = chat"
          />
          <div v-if="chatsFiltrados.length === 0" class="text-center py-12 px-4 text-gray-400 text-xs">
            No se encontraron chats que coincidan con "{{ busqueda }}"
          </div>
        </div>
      </div>
      <div class="hidden md:flex flex-1 flex-col bg-white">
        <VentanaChat 
          v-if="chatActivo" 
          :chatActivo="chatActivo" 
        />
        <div v-else class="flex flex-col items-center justify-center h-full bg-gray-50/50 text-center p-8">
          <div class="w-16 h-16 rounded-full bg-brand-50 border border-brand-200 text-brand-500 flex items-center justify-center mb-4 shadow-xs">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-1">Panel de Conversaciones</h3>
          <p class="text-sm text-gray-500 max-w-sm">
            Selecciona una conversación del panel izquierdo para comenzar a brindar asistencia técnica en tiempo real.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TarjetaChat from '@/componentes/administrador/TarjetaChat.vue'
import VentanaChat from '@/componentes/administrador/VentanaChat.vue'

const busqueda = ref('')
const chatActivo = ref(null)

// datos quemados para pruebas en la interfaz :P
const listaChats = ref([
  {
    id: "chat-uuid-001",
    sessionId: "guest-session-123",
    usuario: "Invitado_101",
    estado: "activo",
    creadoEn: "2026-10-13T12:00:00Z",
    mensajes: [
      {
        id: 1,
        emisor: "usuario",
        texto: "Hola, necesito asistencia con una factura",
        timestamp: "2026-10-13T12:01:00Z"
      },
      {
        id: 2,
        emisor: "admin",
        texto: "¡Hola! Claro que sí, dime cuál es tu número de pedido o correo asociado.",
        timestamp: "2026-10-13T12:02:00Z"
      }
    ]
  },
  {
    id: "chat-uuid-002",
    sessionId: "guest-session-456",
    usuario: "Invitado_204",
    estado: "pendiente",
    creadoEn: "2026-10-14T10:15:00Z",
    mensajes: [
      {
        id: 1,
        emisor: "usuario",
        texto: "El carrito de compras me da error al pagar con tarjeta.",
        timestamp: "2026-10-14T10:15:00Z"
      }
    ]
  }
])

// filtro de búsqueda reactiva por nombre de usuario o id de sesión
const chatsFiltrados = computed(() => {
  if (!busqueda.value.trim()) return listaChats.value
  const termino = busqueda.value.toLowerCase().trim()

  return listaChats.value.filter(chat => 
    chat.usuario.toLowerCase().includes(termino) ||
    chat.sessionId.toLowerCase().includes(termino)
  )
})

// función para manejar la tecla Escape
const manejarKeydown = (e) => {
  if (e.key === 'Escape') {
    chatActivo.value = null // cierra el chat activo y muestra la bienvenida
  }
}

// registrar y limpiar el listener global del teclado muajaja
onMounted(() => {
  window.addEventListener('keydown', manejarKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', manejarKeydown)
})
</script>