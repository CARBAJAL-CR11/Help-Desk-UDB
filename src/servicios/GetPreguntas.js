import axios from 'axios';

// Función para obtener las preguntas frecuentes
export const obtenerCategorias = async () => {
  try {
    const respuesta = await axios.get('http://localhost:3000/api/categorias');
    return respuesta.data;
  } catch (error) {
    console.error('Error al cargar las categorías:', error);
    throw error;
  }
};

