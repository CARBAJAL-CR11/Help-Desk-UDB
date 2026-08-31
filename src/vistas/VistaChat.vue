<template>
    <div class="my-20">
        <h1 class="md:text-4xl sm:text-2xl text-xl text-center text-brand-500 font-bold">¿Cuál es la duda que tienes?</h1>
        <div v-if="mostrarChat === false" class="flex flex-col items-center mt-8">
            <div class="relative w-full lg:max-w-5xl md:max-w-2xl sm:max-w-lg max-w-xs">
                <input
                    type="text"
                    placeholder="Coméntanos aquí..."
                    class="w-full rounded-full border border-slate-400 bg-white py-3 pl-5 pr-12 text-slate-700 placeholder-indigo-300 outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    @keydown="$event.key === 'Enter' ? mostrarChat = true : mostrarChat = false"
                />
                <button
                    type="submit"
                    class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-indigo-600 hover:text-indigo-800 transition"
                    @click="mostrarChat = true"
                >
                    <IconSend stroke={2} color="#1242D6" />
                </button>
            </div>
        </div>
        <div v-else class="flex flex-col items-center mt-8">
            <div class="flex h-[600px] w-full lg:max-w-6xl md:max-w-3xl sm:max-w-xl max-w-xs flex-col justify-between rounded-3xl border-2 border-blue-400 bg-white p-6 shadow-sm">
                <div class="flex flex-col gap-6 overflow-y-auto pr-2">
                    <div class="flex flex-col items-end gap-1">
                        <span class="text-xs font-semibold text-blue-600 pr-2">Tú</span>
                        <div class="rounded-3xl bg-blue-600 px-6 py-3 text-sm text-white shadow-sm">
                            Hola, tengo una duda
                        </div>
                    </div>
                    <div class="flex flex-col items-start gap-1">
                        <span class="text-xs font-semibold text-blue-600 pl-2">Asistente</span>
                        <div class="lg:max-w-5xl md:max-w-xl sm:max-w-md max-w-sm rounded-2xl bg-[#455a74] p-5 text-sm leading-relaxed text-white shadow-sm">
                            <p class="font-medium">¡Hola! Bienvenido/a a nuestro servicio de atención.</p>
                            <p class="mt-1">Estaremos complacidos de resolver cualquier duda que tengas acerca de nuestro funcionamiento.</p>
                            <p class="mt-3 font-medium">Por favor, selecciona una de las siguientes opciones para poder ayudarte:</p>
                            
                            <ul class="mt-4 flex flex-col gap-2 font-medium">
                                <li class="flex items-center gap-2"><span><IconMapPin stroke={2} color="#ffffff" /></span> Ubicación y Horarios</li>
                                <li class="flex items-center gap-2"><span><IconArchive stroke={2} color="#ffffff" /></span> Estado de Pedido y Envíos</li>
                                <li class="flex items-center gap-2"><span><IconCreditCard stroke={2} color="#ffffff" /></span> Formas de Pago</li>
                                <li class="flex items-center gap-2"><span><IconRestore stroke={2} color="#ffffff" /></span> Devoluciones y Garantías</li>
                                <li class="flex items-center gap-2"><span><IconUser stroke={2} color="#ffffff" /></span> Hablar con un Agente</li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-1">
                        <span class="text-xs font-semibold text-blue-600 pr-2">Tú</span>
                        <div class="flex items-center gap-2 rounded-3xl bg-blue-600 px-6 py-3 text-sm text-white shadow-sm">
                            <span><IconMapPin stroke={2} color="#ffffff" /></span> Ubicación y Horarios
                        </div>
                    </div>
                    <div class="flex flex-col items-start gap-1">
                        <span class="text-xs font-semibold text-blue-600 pl-2">Asistente</span>
                        <div class="lg:max-w-5xl md:max-w-xl sm:max-w-md max-w-sm rounded-2xl bg-[#455a74] p-5 text-sm leading-relaxed text-white shadow-sm">
                            <p>Nos encontramos ubicados en: <span class="font-semibold">[Dirección completa de la tienda, ej.: Av. Principal #123, Colonia Centro].</span></p>
                            <p class="mt-2 font-medium">Elige una opción para darte más detalles sobre nuestra ubicación:</p>                        
                            <ul class="mt-4 flex flex-col gap-2 font-medium">
                                <li class="flex items-center gap-2"><span><IconCar stroke={2} color="#ffffff" /></span> ¿Cómo llegar y parqueo?</li>
                                <li class="flex items-center gap-2"><span><IconCalendarWeek stroke={2} color="#ffffff" /></span> Horarios de atención</li>
                                <li class="flex items-center gap-2"><span><IconArrowBackUp stroke={2} color="#ffffff" /></span> Volver al menú principal</li>
                                <li class="flex items-center gap-2"><span><IconSquareCheck stroke={2} color="#ffffff" /></span> Finalizar chat</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="relative mt-4 w-full">
                    <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    class="w-full rounded-full border border-slate-400 bg-white py-3 pl-6 pr-12 text-sm text-slate-700 placeholder-indigo-300 outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    @keydown="$event.key === 'Enter' ? mostrarChat = false : mostrarChat = true"
                    />
                    <button
                    type="submit"
                    class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-indigo-700 hover:text-indigo-900 transition"
                    @click="mostrarChat = false"
                    >
                        <IconSend stroke={2} color="#1242D6" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const mostrarChat = ref(false);
</script>