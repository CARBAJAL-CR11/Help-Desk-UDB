
<!-- COMPONENTE PRINCIPAL DE CARGA DE COMPONENTES DEL ROUTER -->
<template>
  <!-- Se llama al componente Router donde se carga la vista correspondiente y no se recargue la página  -->
  <RouterView />
</template>

<script setup>
  import { RouterView } from 'vue-router'; 
</script>