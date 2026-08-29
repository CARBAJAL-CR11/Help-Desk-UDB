<template>
  <section class="w-full min-h-screen bg-brand-400 py-20 px-14 sm:px-20 md:px-24 lg:px-8 flex justify-center items-center">
    <div class="max-w-7xl mx-auto space-y-12">
      
      <!-- Encabezado Principal -->
      <div class="text-center space-y-3 max-w-4xl mx-auto">
        <p class="text-brand-200 text-sm sm:text-base lg:text-lg font-medium">
          ¿Inconvenientes al comprar? Resolvemos tus dudas de navegación y facturación
        </p>
        <h2 class="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-brand-100 tracking-tight">
          Soluciones Rápidas
        </h2>
      </div>

      <!-- Contenedor del Slider -->
      <div class="relative flex items-center justify-center">
        
        <!-- Flecha Izquierda -->
        <button 
          aria-label="Anterior"
          class="flex absolute -left-7 lg:-left-4 z-10 w-10 h-10 items-center justify-center text-brand-50 rounded-full border border-transparent hover:border-brand-300/40 hover:scale-110 transition-all duration-200 focus:outline-none"
        >
          <IconArrowNarrowLeft class="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>

        <!-- Grupo de tarjetas con visibilidad según Breakpoint -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl px-4 sm:px-10">
          
          <!-- Card 1 -->
          <div class="bg-brand-50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[300px] sm:min-h-[100px] transition-transform duration-300 hover:-translate-y-1">
            <p class="text-brand-600 text-sm sm:text-base leading-relaxed font-normal">
              ¿Hiciste un cargo a tu cuenta pero no recibiste la factura o tu comprobante tiene un error en los datos fiscal/fiscales? Te guiamos para reenviar o corregir tu comprobante de compra inmediatamente.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <div class="hidden sm:flex w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-brand-100/70 items-center justify-center text-brand-400 flex-shrink-0">
                <IconError404Off class="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
              </div>
              <div class="space-y-0.5">
                <div class="grid grid-cols-12 items-center">
                    <h3 class="col-span-8 sm:col-span-12 text-sm sm:text-lg font-bold text-brand-400 leading-snug">
                        Errores en facturación o cobro
                    </h3>
                    <div class="col-span-4 sm:hidden justify-self-end w-8 h-8 rounded-full bg-brand-100/70 flex items-center justify-center text-brand-400">
                        <IconError404Off class="w-4 h-4 stroke-[1.75]" />
                    </div>
                </div>
                <p class="text-xs text-brand-600/80">
                  Descarga de facturas, corrección de datos y recibos
                </p>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="hidden md:flex bg-brand-50 rounded-3xl p-6 sm:p-8 flex-col justify-between shadow-xl min-h-[380px] transition-transform duration-300 hover:-translate-y-1">
            <p class="text-brand-600 text-sm sm:text-base leading-relaxed font-normal">
              ¿Te apareció un error al intentar agregar un electrodoméstico o la página falló al procesar el pago? Consulta cómo restablecer tu carrito o completar tu compra de forma segura.
            </p>
            
            <div class="flex items-center gap-4 pt-6">
              <div class="w-12 h-12 rounded-full bg-brand-100/70 flex items-center justify-center text-brand-400 flex-shrink-0">
                <IconShoppingCartX class="w-6 h-6 stroke-[1.75]" />
              </div>
              <div class="space-y-0.5">
                <h3 class="text-base sm:text-lg font-bold text-brand-400 leading-snug">
                  Fallas al comprar o en el carrito
                </h3>
                <p class="text-xs text-brand-600/80">
                  Error en pasarela de pagos, stock y carrito bloqueado
                </p>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="hidden lg:flex bg-brand-50 rounded-3xl p-6 sm:p-8 flex-col justify-between shadow-xl min-h-[380px] transition-transform duration-300 hover:-translate-y-1">
            <p class="text-brand-600 text-sm sm:text-base leading-relaxed font-normal">
              ¿Llegaste a una página no encontrada (error 404), un producto no carga o se interrumpió la conexión? Te ayudamos a localizar el artículo o restablecer la sesión de tu navegador.
            </p>
            
            <div class="flex items-center gap-4 pt-6">
              <div class="w-12 h-12 rounded-full bg-brand-100/70 flex items-center justify-center text-brand-400 flex-shrink-0">
                <IconBroadcastOff class="w-6 h-6 stroke-[1.75]" />
              </div>
              <div class="space-y-0.5">
                <h3 class="text-base sm:text-lg font-bold text-brand-400 leading-snug">
                  Páginas no disponibles o fallas de red
                </h3>
                <p class="text-xs text-brand-600/80">
                  Productos descontinuados y problemas de conexión
                </p>
              </div>
            </div>
          </div>

        </div>

        <!-- Flecha Derecha -->
        <button 
          aria-label="Siguiente"
          class="flex absolute -right-7 lg:-right-4 z-10 w-10 h-10 items-center justify-center text-brand-50 rounded-full border border-transparent hover:border-brand-300/40 hover:scale-110 transition-all duration-200 focus:outline-none"
        >
          <IconArrowNarrowRight class="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
        </button>
      </div>

      <!-- Indicadores / Puntos de Carrusel -->
      <div class="flex justify-center items-center gap-2 pt-2">
        <span class="w-2.5 h-2.5 rounded-full bg-brand-50"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-brand-300/50 hover:bg-brand-50 transition-all duration-300 cursor-pointer"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-brand-300/50 hover:bg-brand-50 transition-all duration-300 cursor-pointer"></span>
        <span class="w-2.5 h-2.5 rounded-full bg-brand-300/50 hover:bg-brand-50 transition-all duration-300 cursor-pointer"></span>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>