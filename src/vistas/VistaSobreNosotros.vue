<template>
  <!-- este div solo es para que el color de fondo ocupe todo el ancho de la pagina -->
  <div class="w-full bg-brand-700">
    
    <!-- en el main, el ancho por defecto es el de un telefono, y para cada dispositivo va aumentando el ancho segun los breakpoints :O -->
    <main class="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-6 py-8 text-center">
      <section class="mb-10">
        <h2 class="text-2xl font-bold text-brand-500 mb-3">¿Quiénes somos?</h2>
        <p class="text-sm leading-relaxed max-w-xs md:max-w-xl lg:max-w-2xl mx-auto">Somos el equipo de soporte técnico institucional dedicado a brindar soluciones tecnológicas ágiles, eficaces y personalizadas. Nuestro objetivo principal es acompañar a estudiantes y personal académico en la resolución de incidentes, optimización de sistemas y asistencia continua para asegurar el correcto funcionamiento de tus herramientas digitales.</p>
      </section>
      <section class="mb-10">
        <h2 class="text-2xl font-bold text-brand-400 mb-6">¿Qué nos identifica?</h2>
        <div class="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="relative bg-brand-500 text-brand-50 text-xs p-4 rounded-sm shadow-md">
            <p>Atendemos y gestionamos tus solicitudes técnicas con rapidez, priorizando la continuidad de tus actividades tecnológicas.</p>
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-500 rotate-45"></div>
          </div>
          <div class="relative bg-brand-600 text-brand-50 text-xs p-4 rounded-sm shadow-md">
            <p>Brindamos orientación personalizada y soluciones prácticas adaptadas a las plataformas y entornos del campus.</p>
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-600 rotate-45"></div>
          </div>
          <div class="relative bg-brand-500 text-brand-50 text-xs p-4 rounded-sm shadow-md md:col-span-2 lg:col-span-1">
            <p>Comunicación transparente y seguimiento continuo en cada uno de tus reportes de soporte hasta su resolución.</p>
            <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-500 rotate-45"></div>
          </div>
        </div>
      </section>
      <section>
        <h2 class="text-2xl font-bold text-brand-400 mb-6">Nuestro Equipo</h2>
        <div class="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 md:max-w-xl lg:max-w-4xl mx-auto">
            <TarjetaNuestroEquipo
                numero="01"
                nombre="Jonathan Marchelli"
                correo="jonathan.marchelli@gmail.com"
                descripcion="MH240464"
                imagen="./src/recursos/imgs/JM.jpg"
            />
            <TarjetaNuestroEquipo
                numero="02"
                nombre="David Flores"
                correo="davidghjg@gmail.com"
                descripcion="FV241458"
                imagen="./src/recursos/imgs/DF.jpg"
            />
            <TarjetaNuestroEquipo
                numero="03"
                nombre="Cristian Rodríguez"
                correo="cr4133668@gmail.com"
                descripcion="RC240322"
                imagen="./src/recursos/imgs/CR.jpg"
            />
            <TarjetaNuestroEquipo
                numero="04"
                nombre="Daniel Hernández"
                correo="dev.dnlhernandez@gmail.com"
                descripcion="HF240758"
                imagen="./src/recursos/imgs/DH.jpg"
            />
            <TarjetaNuestroEquipo
                numero="05"
                nombre="Leonardo Peñate"
                correo="rzleonardo14@gmail.com"
                descripcion="PF231653"
                imagen="./src/recursos/imgs/LP.jpg"
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
    import TarjetaNuestroEquipo from '@/componentes/SobreNosotros/TarjetaNuestroEquipo.vue';
    import FormularioEnviarComentario from '@/componentes/SobreNosotros/FormularioEnviarComentario.vue';
</script>