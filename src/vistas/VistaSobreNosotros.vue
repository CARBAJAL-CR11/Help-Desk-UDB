<template>
  <!-- este div solo es para que el color de fondo ocupe todo el ancho de la pagina -->
  <div class="w-full bg-brand-700">
    
    <!-- en el main, el ancho por defecto es el de un telefono, y para cada dispositivo va aumentando el ancho segun los breakpoints :O -->
    <main class="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-6 py-8 text-center">
      <section class="mb-10">
        <h2 class="text-2xl font-bold text-brand-500 mb-3">¿Quiénes somos?</h2>
        <p class="text-sm leading-relaxed max-w-xs md:max-w-xl lg:max-w-2xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
        </p>
      </section>
      <section class="mb-10">
        <h2 class="text-2xl font-bold text-brand-400 mb-6">¿Qué nos identifica?</h2>
        <div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="relative bg-brand-500 text-brand-50 text-xs p-4 rounded-sm shadow-md">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-500 rotate-45"></div>
          </div>
          <div class="relative bg-brand-600 text-brand-50 text-xs p-4 rounded-sm shadow-md">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-600 rotate-45"></div>
          </div>
          <div class="relative bg-brand-500 text-brand-50 text-xs p-4 rounded-sm shadow-md md:col-span-2 lg:col-span-1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-500 rotate-45"></div>
          </div>
        </div>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-brand-400 mb-6">Nuestro Equipo</h2>
        <div class="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 md:max-w-xl lg:max-w-4xl mx-auto">
            <TarjetaNuestroEquipo
                numero="01"
                nombre="Daniel Hernández"
                correo="dev.dnlhernandez@gmail.com"
                descripcion="Dev1"
            />
            <TarjetaNuestroEquipo
                numero="02"
                nombre="Daniel Hernández"
                correo="dev.dnlhernandez@gmail.com"
                descripcion="Dev2"
            />
            <TarjetaNuestroEquipo
                numero="03"
                nombre="Daniel Hernández"
                correo="dev.dnlhernandez@gmail.com"
                descripcion="Dev3"
            />
            <TarjetaNuestroEquipo
                numero="04"
                nombre="Daniel Hernández"
                correo="dev.dnlhernandez@gmail.com"
                descripcion="Dev4"
            />
            <TarjetaNuestroEquipo
                numero="05"
                nombre="Daniel Hernández"
                correo="dev.dnlhernandez@gmail.com"
                descripcion="Dev5"
            />
        </div>
      </section>
      <section>
        <FormularioEnviarComentario/>
      </section>
    </main>
   </div>
</template>

<script setup>
    import TarjetaNuestroEquipo from '@/componentes/TarjetaNuestroEquipo.vue';
    import FormularioEnviarComentario from '@/componentes/FormularioEnviarComentario.vue';
</script>