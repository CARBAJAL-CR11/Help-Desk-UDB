// *
// * Archivo para configuración de servidor y guardado de imagenes en updloads/ 
// *
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';

// Obtener la ruta del directorio para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar CORS y manejo de JSON
const app = express();
const PORT = 3000; // Puerto a utilizar con la API

// Configuración de Middlewares
app.use(cors());

// Servir la carpeta de imágenes de forma pública
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Verificación o creación de la carpeta 'uploads' automáticamente
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de almacenamiento físico con Multer (Libreria útil para manejo de imagenes y archivos)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `img-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint personalizado para subir imágenes (0, 1 o más)
app.post('/api/upload', upload.array('imagenes', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.json({ rutas: [] });
    }
    const rutas = req.files.map(file => `/uploads/${file.filename}`);
    return res.status(200).json({ mensaje: 'Imágenes subidas correctamente', rutas });
  } catch (error) {
    return res.status(500).json({ error: 'Error al subir las imágenes' });
  }
});

// Integrar json-server como middleware bajo el prefijo /api
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`\n Servidor de API funcionando en http://localhost:3000`);
  console.log(`\n Datos disponibles de Preguntas frecuentes: http://localhost:3000/api/categorias`);
  console.log(` Datos disponibles de chat de soporte: http://localhost:3000/api/chats`);
});

// Intalación de dependencias y librerias para el servidor:
// npm install express multer cors json-server axios