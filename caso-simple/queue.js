/**
 * ESTRUCTURA DE DATOS: COLA (QUEUE)
 * Implementación usando Nodos Enlazados
 * Principio FIFO: First In, First Out (El primero que entra es el primero que sale)
 */

// Clase Nodo: Representa cada elemento en la cola
class Node {
    constructor(value) {
        this.value = value;  // El dato que almacena el nodo
        this.next = null;    // Referencia al siguiente nodo
    }
}

// Clase Cola: Implementación de la estructura de datos
class Queue {
    constructor() {
        this.front = null;  // Apunta al primer elemento de la cola
        this.rear = null;   // Apunta al último elemento de la cola
        this.size = 0;      // Contador de elementos
    }

    /**
     * ENQUEUE: Agregar un elemento al final de la cola
     * Complejidad: O(1)
     */
    enqueue(value) {
        const newNode = new Node(value);
        
        // Si la cola está vacía, el nuevo nodo es tanto front como rear
        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            // Agregar el nuevo nodo al final
            this.rear.next = newNode;
            this.rear = newNode;
        }
        
        this.size++;
        return true;
    }

    /**
     * DEQUEUE: Eliminar y retornar el elemento del frente
     * Complejidad: O(1)
     */
    dequeue() {
        // Si la cola está vacía, no hay nada que eliminar
        if (this.isEmpty()) {
            return null;
        }

        // Guardar el valor del nodo a eliminar
        const removedValue = this.front.value;
        
        // Mover el front al siguiente nodo
        this.front = this.front.next;
        
        // Si la cola quedó vacía, rear también debe ser null
        if (this.front === null) {
            this.rear = null;
        }
        
        this.size--;
        return removedValue;
    }

    /**
     * PEEK: Ver el elemento del frente sin eliminarlo
     * Complejidad: O(1)
     */
    peek() {
        return this.isEmpty() ? null : this.front.value;
    }

    /**
     * ISEMPTY: Verificar si la cola está vacía
     * Complejidad: O(1)
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * GETSIZE: Obtener el tamaño de la cola
     * Complejidad: O(1)
     */
    getSize() {
        return this.size;
    }

    /**
     * CLEAR: Vaciar toda la cola
     * Complejidad: O(1)
     */
    clear() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    /**
     * TOARRAY: Convertir la cola a un array (para visualización)
     * Complejidad: O(n)
     */
    toArray() {
        const array = [];
        let current = this.front;
        
        while (current !== null) {
            array.push(current.value);
            current = current.next;
        }
        
        return array;
    }
}
