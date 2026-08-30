<template>
  <footer class="bg-brand-700 text-brand-800 pt-10 md:pt-12 pb-8 px-4 sm:px-6 font-sans border-t border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 pb-10 md:pb-12">
        
        <!-- Marca -->
        <div class="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:space-y-4">
          <div class="flex items-center gap-2 text-brand-500">
            <IconMessageCode/>
            <span class="text-lg md:text-xl font-bold">Help Desk</span>
          </div>

          <p class="text-[10px] md:text-sm text-brand-800 max-w-xs leading-relaxed">
            Nuestro objetivo es proporcionar soluciones técnicas y potenciar tu rendimiento comercial.
          </p>

          <div class="flex items-center justify-center md:justify-start gap-3 pt-1 md:pt-2">
            <a href="#" class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-brand-500 shadow-lg hover:bg-gray-100 transition-colors">
              <IconBrandFacebook class="w-4 h-4 md:w-5 md:h-5"/>
            </a>
            <a href="#" class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-brand-500 shadow-lg hover:bg-gray-100 transition-colors">
              <IconBrandX class="w-4 h-4 md:w-5 md:h-5"/>
            </a>
            <a href="#" class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-brand-500 shadow-lg hover:bg-gray-100 transition-colors">
              <IconBrandInstagram class="w-4 h-4 md:w-5 md:h-5"/>
            </a>
          </div>
        </div>

        <!-- Columnas de enlaces -->
        <div class="md:col-span-3 grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 px-4">
          
          <div class="space-y-2 md:space-y-3">
            <h3 class="text-[10px] md:text-sm font-bold text-brand-500 mb-2 md:mb-4">Sobre nosotros</h3>
            <ul class="space-y-2 md:space-y-2.5 text-[10px] md:text-sm">
              <li><a href="#" class="hover:underline text-brand-800">¿Quiénes somos?</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Desarrolladores</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Contáctanos</a></li>
              <li><a href="#" class="hover:underline text-brand-800">¿Cómo podemos ayudarte?</a></li>
            </ul>
          </div>

          <div class="space-y-2 md:space-y-3">
            <h3 class="text-[10px] md:text-sm font-bold text-brand-500 mb-2 md:mb-4">Enlaces rápidos</h3>
            <ul class="space-y-2 md:space-y-2.5 text-[10px] md:text-sm">
              <li><a href="#" class="hover:underline text-brand-800">Inicio</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Chat de soporte</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Problemas frecuentes</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Sobre nosotros</a></li>
            </ul>
          </div>

          <div class="space-y-2 md:space-y-3">
            <h3 class="text-[10px] md:text-sm font-bold text-brand-500 mb-2 md:mb-4">Redes sociales</h3>
            <ul class="space-y-2 md:space-y-2.5 text-[10px] md:text-sm">
              <li><a href="#" class="hover:underline text-brand-800">Discord</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Instagram</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Tik Tok</a></li>
              <li><a href="#" class="hover:underline text-brand-800">Facebook</a></li>
            </ul>
          </div>

        </div>

      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-300/60 pt-6 text-center md:text-left">
        <p class="text-[10px] md:text-sm font-semibold text-brand-500">
          ©2026 Help Desk. Todos lo derechos reservados
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
</script>