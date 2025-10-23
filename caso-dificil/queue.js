/**
 * CASO-DIFICIL: Implementación avanzada de Cola
 * - Usa una cola nativa mejorada para operaciones comunes
 * - Incluye soporte opcional para prioridad mediante un heap (MinHeap)
 * - Expone una API clara y con validaciones y eventos (callbacks)
 *
 * Nota: esta versión es más completa y modular para fines educativos.
 */

// Implementación de MinHeap simple (para cola de prioridad)
class MinHeap {
    constructor(compare) {
        this.data = [];
        this.compare = compare || ((a, b) => a - b);
    }

    size() { return this.data.length; }

    isEmpty() { return this.size() === 0; }

    peek() { return this.data[0] ?? null; }

    push(item) {
        this.data.push(item);
        this._siftUp(this.size() - 1);
    }

    pop() {
        if (this.isEmpty()) return null;
        const top = this.data[0];
        const last = this.data.pop();
        if (!this.isEmpty()) {
            this.data[0] = last;
            this._siftDown(0);
        }
        return top;
    }

    _parent(i) { return Math.floor((i - 1) / 2); }
    _left(i) { return i * 2 + 1; }
    _right(i) { return i * 2 + 2; }

    _siftUp(i) {
        while (i > 0) {
            const p = this._parent(i);
            if (this.compare(this.data[i], this.data[p]) < 0) {
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                i = p;
            } else break;
        }
    }

    _siftDown(i) {
        while (true) {
            const l = this._left(i);
            const r = this._right(i);
            let smallest = i;
            if (l < this.size() && this.compare(this.data[l], this.data[smallest]) < 0) smallest = l;
            if (r < this.size() && this.compare(this.data[r], this.data[smallest]) < 0) smallest = r;
            if (smallest !== i) {
                [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                i = smallest;
            } else break;
        }
    }
}

// Nodo para la cola tradicional
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// Cola enlazada con eventos y validaciones
class AdvancedQueue {
    constructor(options = {}) {
        this.front = null;
        this.rear = null;
        this.size = 0;
        this.onEnqueue = options.onEnqueue || null;
        this.onDequeue = options.onDequeue || null;
        this.validate = options.validate || (() => true);
    }

    enqueue(value) {
        if (!this.validate(value)) throw new Error('Valor inválido para encolar');
        const node = new Node(value);
        if (this.isEmpty()) {
            this.front = node;
            this.rear = node;
        } else {
            this.rear.next = node;
            this.rear = node;
        }
        this.size++;
        if (this.onEnqueue) this.onEnqueue(value, this.size);
        return this.size;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const node = this.front;
        this.front = this.front.next;
        if (this.front === null) this.rear = null;
        this.size--;
        if (this.onDequeue) this.onDequeue(node.value, this.size);
        return node.value;
    }

    peek() { return this.isEmpty() ? null : this.front.value; }
    isEmpty() { return this.size === 0; }
    getSize() { return this.size; }
    clear() { this.front = null; this.rear = null; this.size = 0; }
    toArray() {
        const arr = [];
        let cur = this.front;
        while (cur) { arr.push(cur.value); cur = cur.next; }
        return arr;
    }
}

// Cola de prioridad combinada: permite encolar con prioridad y sin prioridad
class PriorityQueueWrapper {
    constructor(compareFn) {
        this.heap = new MinHeap((a,b) => compareFn(a.item, b.item));
        this.counter = 0; // tie-breaker para mantener orden FIFO entre iguales
    }

    enqueue(item, priority = 0) {
        // menor priority => más urgente
        this.heap.push({ item, priority, seq: this.counter++ });
    }

    dequeue() {
        const node = this.heap.pop();
        return node ? node.item : null;
    }

    peek() {
        const node = this.heap.peek();
        return node ? node.item : null;
    }

    isEmpty() { return this.heap.isEmpty(); }

    size() { return this.heap.size(); }

    toArray() {
        // no destructivo: clonar y vaciar copia
        const clone = new MinHeap(this.heap.compare);
        clone.data = this.heap.data.slice();
        const res = [];
        while (!clone.isEmpty()) res.push(clone.pop().item);
        return res;
    }
}

// Export (en navegador) — exponemos a window para que app.js lo use
window.AdvancedQueue = AdvancedQueue;
window.PriorityQueueWrapper = PriorityQueueWrapper;
window.MinHeap = MinHeap;