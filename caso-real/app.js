/**
 * CASO REAL: SISTEMA DE GESTIÓN DE IMPRESIÓN
 * Simula una cola de impresión de documentos en una oficina
 */

// Instancia de la cola de impresión
const printQueue = new Queue();
let documentCounter = 1;
let isPrinting = false;
let totalPagesPrinted = 0;
let totalDocumentsPrinted = 0;

// Constantes de simulación
const PRINT_SPEED = 2; // segundos por página

// Elementos del DOM
const docNameInput = document.getElementById('docName');
const docPagesInput = document.getElementById('docPages');
const addDocButton = document.getElementById('addDocument');
const startPrintButton = document.getElementById('startPrint');
const pausePrintButton = document.getElementById('pausePrint');
const clearQueueButton = document.getElementById('clearQueue');
const queueDisplay = document.getElementById('queueDisplay');
const currentDocDisplay = document.getElementById('currentDocDisplay');
const queueSizeSpan = document.getElementById('queueSize');
const totalPagesSpan = document.getElementById('totalPages');
const printedDocsSpan = document.getElementById('printedDocs');
const printedPagesSpan = document.getElementById('printedPages');
const messageDiv = document.getElementById('message');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');

// Event Listeners
addDocButton.addEventListener('click', addDocument);
startPrintButton.addEventListener('click', startPrinting);
pausePrintButton.addEventListener('click', pausePrinting);
clearQueueButton.addEventListener('click', clearQueue);
docNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addDocument();
});

/**
 * Agregar documento a la cola de impresión
 */
function addDocument() {
    const name = docNameInput.value.trim();
    const pages = parseInt(docPagesInput.value);

    if (name === '') {
        showMessage('⚠️ Por favor ingresa el nombre del documento', 'warning');
        return;
    }

    if (!pages || pages < 1 || pages > 500) {
        showMessage('⚠️ El número de páginas debe estar entre 1 y 500', 'warning');
        return;
    }

    const document = {
        id: documentCounter++,
        name: name,
        pages: pages,
        timestamp: new Date().toLocaleTimeString(),
        status: 'En cola'
    };

    printQueue.enqueue(document);
    docNameInput.value = '';
    docPagesInput.value = '';
    docNameInput.focus();

    showMessage(`✅ "${name}" agregado a la cola de impresión`, 'success');
    updateDisplay();
    animateAdd();
}

/**
 * Iniciar proceso de impresión
 */
async function startPrinting() {
    if (isPrinting) {
        showMessage('ℹ️ La impresora ya está funcionando', 'info');
        return;
    }

    if (printQueue.isEmpty()) {
        showMessage('❌ No hay documentos en la cola', 'error');
        return;
    }

    isPrinting = true;
    startPrintButton.disabled = true;
    pausePrintButton.disabled = false;
    showMessage('🖨️ Iniciando impresión...', 'info');

    while (!printQueue.isEmpty() && isPrinting) {
        const doc = printQueue.dequeue();
        await printDocument(doc);
    }

    if (printQueue.isEmpty()) {
        isPrinting = false;
        startPrintButton.disabled = false;
        pausePrintButton.disabled = true;
        showMessage('✅ Todos los documentos han sido impresos', 'success');
        currentDocDisplay.innerHTML = '<div class="no-printing">Impresora en espera</div>';
    }
}

/**
 * Pausar impresión
 */
function pausePrinting() {
    isPrinting = false;
    startPrintButton.disabled = false;
    pausePrintButton.disabled = true;
    showMessage('⏸️ Impresión pausada', 'warning');
}

/**
 * Limpiar toda la cola
 */
function clearQueue() {
    if (printQueue.isEmpty()) {
        showMessage('ℹ️ La cola ya está vacía', 'info');
        return;
    }

    if (isPrinting) {
        showMessage('⚠️ No puedes limpiar la cola mientras se está imprimiendo', 'warning');
        return;
    }

    printQueue.clear();
    showMessage('🗑️ Cola de impresión limpiada', 'success');
    updateDisplay();
}

/**
 * Simular impresión de un documento
 */
async function printDocument(doc) {
    currentDocDisplay.innerHTML = `
        <div class="printing-doc">
            <div class="doc-icon">📄</div>
            <div class="doc-details">
                <div class="doc-name">Imprimiendo: ${doc.name}</div>
                <div class="doc-info">Páginas: ${doc.pages} | ID: #${doc.id}</div>
            </div>
        </div>
        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="progress-text" id="progressText">0%</div>
    `;

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    // Simular impresión página por página
    for (let page = 1; page <= doc.pages; page++) {
        if (!isPrinting) {
            // Si se pausó, devolver el documento a la cola
            const remainingDoc = {
                ...doc,
                pages: doc.pages - page + 1
            };
            printQueue.enqueue(remainingDoc);
            updateDisplay();
            return;
        }

        const progress = (page / doc.pages) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% - Página ${page}/${doc.pages}`;

        await sleep(PRINT_SPEED * 1000);
    }

    // Documento impreso completamente
    totalDocumentsPrinted++;
    totalPagesPrinted += doc.pages;
    updateDisplay();
    animatePrintComplete();
}

/**
 * Actualizar visualización
 */
function updateDisplay() {
    const documents = printQueue.toArray();
    queueSizeSpan.textContent = printQueue.getSize();
    
    // Calcular total de páginas en cola
    const totalPages = documents.reduce((sum, doc) => sum + doc.pages, 0);
    totalPagesSpan.textContent = totalPages;
    
    // Estadísticas
    printedDocsSpan.textContent = totalDocumentsPrinted;
    printedPagesSpan.textContent = totalPagesPrinted;

    // Display de la cola
    if (printQueue.isEmpty()) {
        queueDisplay.innerHTML = '<div class="empty-queue">La cola de impresión está vacía</div>';
    } else {
        queueDisplay.innerHTML = documents.map((doc, index) => `
            <div class="document-card" data-index="${index}">
                <div class="doc-icon-small">📄</div>
                <div class="doc-info-container">
                    <div class="doc-name-small">${doc.name}</div>
                    <div class="doc-meta">
                        <span>📊 ${doc.pages} páginas</span>
                        <span>⏰ ${doc.timestamp}</span>
                        <span>ID: #${doc.id}</span>
                    </div>
                </div>
                <div class="doc-position">
                    ${index === 0 ? '🔜 Siguiente' : `#${index + 1}`}
                </div>
            </div>
        `).join('');
    }

    // Estimación de tiempo
    const estimatedTime = totalPages * PRINT_SPEED;
    const minutes = Math.floor(estimatedTime / 60);
    const seconds = estimatedTime % 60;
    document.getElementById('estimatedTime').textContent = 
        `${minutes}m ${seconds}s`;
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
 * Animación al agregar documento
 */
function animateAdd() {
    const cards = queueDisplay.querySelectorAll('.document-card');
    if (cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        lastCard.classList.add('slide-in');
    }
}

/**
 * Animación al completar impresión
 */
function animatePrintComplete() {
    currentDocDisplay.classList.add('pulse');
    setTimeout(() => {
        currentDocDisplay.classList.remove('pulse');
    }, 500);
}

/**
 * Función auxiliar para pausas asíncronas
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Inicializar
updateDisplay();
currentDocDisplay.innerHTML = '<div class="no-printing">Impresora en espera</div>';
