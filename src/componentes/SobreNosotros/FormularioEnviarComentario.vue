<template>
  <div class="mt-10 max-w-sm md:max-w-xl lg:max-w-4xl mx-auto">
    <div class="bg-brand-800 rounded-3xl overflow-hidden shadow-xl border flex flex-col lg:flex-row"> 
        <div class="relative bg-brand-600 px-6 py-8 lg:px-10 lg:pt-12 lg:pb-16 text-center flex flex-col justify-center rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl lg:w-1/2 min-h-[160px]">
            <h2 class="text-2xl lg:text-3xl font-bold text-brand-50 mb-3">Contáctanos</h2>
            <p class="text-xs lg:text-sm font-bold text-brand-50 leading-relaxed max-w-xs mx-auto">Si necesitas comunicarte con un asesor sobre un problema mas especifico, puedes enviar tus datos y con gusto te escribiremos</p>
            <div class="absolute bottom-4 -right-4 lg:right-10 lg:-bottom-0 w-24 h-24 lg:w-24 lg:h-24 bg-brand-50/15 rounded-full pointer-events-none z-0"></div>
            <div class="absolute -bottom-16 -right-20 lg:-right-20 lg:-bottom-28 w-36 h-36 lg:w-48 lg:h-48 bg-brand-50/10 rounded-full pointer-events-none z-0"></div>
        </div>
        <form @submit.prevent="validarFormulario" class="py-5 px-10 md:px-32 md:py-10 lg:pt-16 lg:px-16 lg:pb-24 space-y-3 lg:space-y-4 lg:w-1/2 flex flex-col justify-center">
            <div class="relative">
                <input v-model="formulario.nombre" type="text" id="nombre" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
                <label for="nombre" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Nombre Completo</label>
            </div>
            <div class="relative">
                <input v-model="formulario.telefono" type="tel" id="telefono" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
                <label for="telefono" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Teléfono</label>
            </div>
            <div class="relative">
                <input v-model="formulario.email" type="email" id="email" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors"/>
                <label for="email" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Correo Electrónico</label>
            </div>
            <div class="relative">
                <textarea v-model="formulario.problema" id="problema" rows="2" placeholder=" " class="peer w-full bg-brand-800 text-brand-50 text-xs px-3.5 pt-5 pb-1.5 rounded-lg border border-white focus:outline-none focus:border-brand-500 transition-colors resize-none"></textarea>
                <label for="problema" class="absolute text-xs text-brand-50/70 duration-200 transform -translate-y-2.5 scale-75 top-3.5 z-10 origin-[0] left-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-brand-300 pointer-events-none">Coméntanos tu problema</label>
            </div>
            <div class="pt-1">
                <button type="submit" class="w-full bg-brand-300 hover:bg-brand-400 text-brand-50 font-bold text-xs tracking-wider py-2.5 lg:py-3 px-6 rounded-full transition-colors uppercase">Enviar</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// SweetAlert2
import Swal from 'sweetalert2';


const formulario = ref({
  nombre: '',
  telefono: '',
  email: '',
  problema: ''
});

//Regex
const regex = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{3,50}$/,
  telefono: /^[2678]\d{3}-?\d{4}$/, // Formato El Salvador 
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  problema: /^.{10,500}$/ 
};

const validarFormulario = () => {
  if (!regex.nombre.test(formulario.value.nombre)) {
    Swal.fire({
      icon: 'error',
      title: 'Nombre inválido',
      text: 'El nombre debe tener entre 3 y 50 caracteres y contener solo letras.',
      confirmButtonColor: '#3085d6'
    });
    return; 
  }

  if (!regex.telefono.test(formulario.value.telefono)) {
    Swal.fire({
      icon: 'error',
      title: 'Teléfono inválido',
      text: 'Ingresa un número válido de El Salvador (empieza con 2, 6, 7 u 8 y tiene 8 dígitos).',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  if (!regex.email.test(formulario.value.email)) {
    Swal.fire({
      icon: 'error',
      title: 'Correo inválido',
      text: 'Por favor, ingresa una dirección de correo electrónico válida.',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  if (!regex.problema.test(formulario.value.problema)) {
    Swal.fire({
      icon: 'warning',
      title: 'Mensaje muy corto',
      text: 'Por favor, explícanos tu problema con un poco más de detalle (mínimo 10 caracteres).',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: '¡Mensaje Enviado!',
    text: 'Nos pondremos en contacto contigo lo más pronto posible.',
    confirmButtonColor: '#28a745'
  });

  formulario.value = {
    nombre: '',
    telefono: '',
    email: '',
    problema: ''
  };
};
</script>