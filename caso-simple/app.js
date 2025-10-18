/**
 * CASO SIMPLE: COLA DE ATENCIÓN AL CLIENTE
 * Sistema básico para gestionar la fila de atención en un negocio
 */

// Instancia de la cola
const customerQueue = new Queue();
let customerCounter = 1;

// Elementos del DOM
const customerNameInput = document.getElementById('customerName');
const addButton = document.getElementById('addCustomer');
const attendButton = document.getElementById('attendCustomer');
const peekButton = document.getElementById('peekCustomer');
const clearButton = document.getElementById('clearQueue');
const queueDisplay = document.getElementById('queueDisplay');
const queueSizeSpan = document.getElementById('queueSize');
const nextCustomerSpan = document.getElementById('nextCustomer');
const messageDiv = document.getElementById('message');

// Event Listeners
addButton.addEventListener('click', addCustomer);
attendButton.addEventListener('click', attendCustomer);
peekButton.addEventListener('click', peekCustomer);
clearButton.addEventListener('click', clearQueue);
customerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addCustomer();
});

/**
 * Agregar cliente a la cola
 */
function addCustomer() {
    const name = customerNameInput.value.trim();
    
    if (name === '') {
        showMessage('⚠️ Por favor ingresa un nombre', 'warning');
        return;
    }

    const customer = {
        id: customerCounter++,
        name: name,
        timestamp: new Date().toLocaleTimeString()
    };

    customerQueue.enqueue(customer);
    customerNameInput.value = '';
    customerNameInput.focus();
    
    showMessage(`✅ ${name} agregado a la cola`, 'success');
    updateDisplay();
    animateAdd();
}

/**
 * Atender al siguiente cliente (dequeue)
 */
function attendCustomer() {
    if (customerQueue.isEmpty()) {
        showMessage('❌ No hay clientes en la cola', 'error');
        return;
    }

    const customer = customerQueue.dequeue();
    showMessage(`👤 Atendiendo a: ${customer.name}`, 'info');
    updateDisplay();
    animateRemove();
}

/**
 * Ver quién es el siguiente (peek)
 */
function peekCustomer() {
    if (customerQueue.isEmpty()) {
        showMessage('❌ No hay clientes en la cola', 'error');
        return;
    }

    const customer = customerQueue.peek();
    showMessage(`👀 Siguiente en la fila: ${customer.name}`, 'info');
    highlightNext();
}

/**
 * Limpiar toda la cola
 */
function clearQueue() {
    if (customerQueue.isEmpty()) {
        showMessage('ℹ️ La cola ya está vacía', 'info');
        return;
    }

    customerQueue.clear();
    showMessage('🗑️ Cola limpiada', 'success');
    updateDisplay();
}

/**
 * Actualizar la visualización de la cola
 */
function updateDisplay() {
    const customers = customerQueue.toArray();
    queueSizeSpan.textContent = customerQueue.getSize();
    
    if (customerQueue.isEmpty()) {
        nextCustomerSpan.textContent = 'Ninguno';
        queueDisplay.innerHTML = '<div class="empty-queue">La cola está vacía</div>';
    } else {
        nextCustomerSpan.textContent = customerQueue.peek().name;
        queueDisplay.innerHTML = customers.map((customer, index) => `
            <div class="customer-card" data-index="${index}">
                <div class="customer-number">#${customer.id}</div>
                <div class="customer-info">
                    <div class="customer-name">${customer.name}</div>
                    <div class="customer-time">⏰ ${customer.timestamp}</div>
                </div>
                <div class="customer-position">${index === 0 ? '🔜 Siguiente' : `Posición: ${index + 1}`}</div>
            </div>
        `).join('');
    }
}

/**
 * Mostrar mensaje temporal
 */
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type} show`;
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 3000);
}

/**
 * Animación al agregar
 */
function animateAdd() {
    const cards = queueDisplay.querySelectorAll('.customer-card');
    if (cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        lastCard.classList.add('slide-in');
    }
}

/**
 * Animación al remover
 */
function animateRemove() {
    queueDisplay.classList.add('shake');
    setTimeout(() => {
        queueDisplay.classList.remove('shake');
    }, 500);
}

/**
 * Resaltar el siguiente en la fila
 */
function highlightNext() {
    const firstCard = queueDisplay.querySelector('.customer-card[data-index="0"]');
    if (firstCard) {
        firstCard.classList.add('highlight');
        setTimeout(() => {
            firstCard.classList.remove('highlight');
        }, 1000);
    }
}

// Inicializar display
updateDisplay();
