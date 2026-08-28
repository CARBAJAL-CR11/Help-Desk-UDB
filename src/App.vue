
<!-- COMPONENTE PRINCIPAL DE CARGA DE COMPONENTES DEL ROUTER -->
<template>
  <!-- Menú de navegación que estara en todas las vistas -->
  <MenuNav />
  <!-- Se llama al componente Router donde se carga la vista correspondiente y no se recargue la página  -->
  <RouterView />

  <Footer />
</template>

<script setup>
  import MenuNav from './componentes/MenuNav.vue';
  import Footer from './componentes/Footer.vue';
  import { RouterView } from 'vue-router'; 
</script>