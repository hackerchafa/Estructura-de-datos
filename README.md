# 📚 Casos de Prueba - Estructura de Datos: COLA (Queue)

Este proyecto contiene dos casos de prueba implementados con la estructura de datos **Cola (Queue)** usando **JavaScript** y **nodos enlazados**.

## 🎯 Estructura del Proyecto

```
Colas/
├── caso-simple/          # Caso Simple: Cola de Atención al Cliente
│   ├── index.html        # Frontend interactivo
│   ├── styles.css        # Estilos y animaciones
│   ├── queue.js          # Implementación de la estructura Cola
│   └── app.js            # Lógica de la aplicación
│
├── caso-real/            # Caso Real: Sistema de Gestión de Impresión
│   ├── index.html        # Frontend interactivo
│   ├── styles.css        # Estilos y animaciones
│   ├── queue.js          # Implementación de la estructura Cola
│   └── app.js            # Lógica del sistema de impresión
│
└── README.md             # Este archivo
```

## 📖 ¿Qué es una Cola (Queue)?

Una **Cola** es una estructura de datos lineal que sigue el principio **FIFO (First In, First Out)**, es decir:
- El **primer elemento** que entra es el **primero** en salir
- Similar a una fila de personas esperando ser atendidas

### Operaciones Principales:
- **Enqueue**: Agregar un elemento al final de la cola - O(1)
- **Dequeue**: Eliminar y retornar el elemento del frente - O(1)
- **Peek**: Ver el elemento del frente sin eliminarlo - O(1)
- **isEmpty**: Verificar si la cola está vacía - O(1)
- **getSize**: Obtener el tamaño de la cola - O(1)

## 🔧 Implementación Técnica

### Nodos Enlazados
```javascript
class Node {
    constructor(value) {
        this.value = value;  // Dato almacenado
        this.next = null;    // Referencia al siguiente nodo
    }
}

class Queue {
    constructor() {
        this.front = null;  // Frente de la cola
        this.rear = null;   // Final de la cola
        this.size = 0;      // Tamaño actual
    }
}
```

## 🎮 Caso Simple: Cola de Atención al Cliente

### Descripción
Sistema básico para gestionar la fila de atención en un negocio.

### Funcionalidades
- ✅ Agregar clientes a la cola con nombre
- ✅ Atender al siguiente cliente (dequeue)
- ✅ Ver quién es el siguiente sin atender (peek)
- ✅ Limpiar toda la cola
- ✅ Visualización en tiempo real de la cola
- ✅ Estadísticas básicas

### Cómo usar
1. Abre `caso-simple/index.html` en tu navegador
2. Ingresa nombres de clientes
3. Presiona "Agregar Cliente" para encolar
4. Presiona "Atender Siguiente" para desencolar
5. Observa cómo funciona el principio FIFO

## 🖨️ Caso Real: Sistema de Gestión de Impresión

### Descripción
Simula una cola de impresión de documentos en una oficina, procesando documentos de forma secuencial.

### Funcionalidades
- ✅ Agregar documentos con nombre y número de páginas
- ✅ Sistema de impresión automático con progreso visual
- ✅ Simulación realista (2 segundos por página)
- ✅ Pausa y reanudación de impresión
- ✅ Estadísticas completas:
  - Documentos en cola
  - Total de páginas pendientes
  - Tiempo estimado de impresión
  - Documentos y páginas impresas
- ✅ Animaciones y feedback visual
- ✅ Interfaz responsive

### Cómo usar
1. Abre `caso-real/index.html` en tu navegador
2. Ingresa el nombre del documento y número de páginas
3. Presiona "Agregar a Cola" para encolar documentos
4. Presiona "▶️ Iniciar Impresión" para comenzar el proceso
5. Observa el progreso de impresión en tiempo real
6. Puedes pausar y reanudar la impresión

## 🎨 Características del Frontend

### Diseño
- ✨ Gradientes modernos y coloridos
- 📱 Responsive (adaptable a móviles)
- 🎭 Animaciones suaves y feedback visual
- 🎯 Interfaz intuitiva y fácil de usar

### Tecnologías
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript ES6+ (Vanilla JS)
- Sin dependencias externas

## 🚀 Cómo Ejecutar

### Opción 1: Directamente en el navegador
1. Navega a la carpeta del caso que desees probar
2. Abre el archivo `index.html` en tu navegador favorito
3. ¡Listo! La aplicación funcionará inmediatamente

### Opción 2: Con Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 3: Con servidor local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Luego abre: http://localhost:8000/caso-simple/
# O: http://localhost:8000/caso-real/
```

## 📝 Conceptos de Estructuras de Datos Aplicados

### 1. Encapsulamiento
- La implementación de la cola está separada en `queue.js`
- Reutilizable en ambos casos

### 2. Abstracción
- El usuario no necesita saber cómo funcionan los nodos internamente
- Solo usa las operaciones públicas (enqueue, dequeue, etc.)

### 3. Complejidad Temporal
- Todas las operaciones principales son **O(1)** (tiempo constante)
- Eficiente para aplicaciones en tiempo real

### 4. Principio FIFO
- Claramente demostrado en ambos casos
- El orden de llegada se respeta siempre

## 🎓 Aprendizajes

Este proyecto demuestra:
- ✅ Implementación correcta de una Cola con nodos enlazados
- ✅ Aplicación práctica de estructuras de datos
- ✅ Caso simple para entender el concepto
- ✅ Caso real que resuelve un problema cotidiano
- ✅ Integración frontend-backend (estructura de datos + UI)
- ✅ Código limpio, comentado y documentado

## 🤝 Contribución

Este es un proyecto educativo. Siéntete libre de:
- Modificar el código
- Agregar nuevas funcionalidades
- Mejorar el diseño
- Crear nuevos casos de uso

## 📄 Licencia

Este proyecto es de uso educativo y libre.

---

**Desarrollado con ❤️ para aprender Estructuras de Datos**

¡Disfruta explorando cómo funcionan las Colas! 🚀
