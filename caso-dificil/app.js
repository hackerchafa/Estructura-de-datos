/*
 * CASO-DIFICIL: Aplicación de ejemplo
 * - Cola híbrida: trabajos con prioridad para simulación de un scheduler
 * - Interfaz: agregar trabajos con prioridad, procesar, pausar, estadísticas
 */

const jobQueue = new PriorityQueueWrapper((a,b) => {
    // Compara por prioridad luego por llegada (seq) para FIFO entre iguales
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.seq - b.seq;
});

let jobCounter = 1;
let processing = false;
let processedJobs = 0;
let processedWork = 0; // unidades de trabajo procesadas
const WORK_SPEED = 1000; // ms por unidad

// DOM
const nameInput = document.getElementById('jobName');
const workInput = document.getElementById('jobWork');
const priorityInput = document.getElementById('jobPriority');
const addBtn = document.getElementById('addJob');
const startBtn = document.getElementById('startProcessing');
const pauseBtn = document.getElementById('pauseProcessing');
const clearBtn = document.getElementById('clearJobs');
const queueDisplay = document.getElementById('queueDisplay');
const statsJobs = document.getElementById('jobsCount');
const statsWork = document.getElementById('workCount');
const messageDiv = document.getElementById('message');

addBtn.addEventListener('click', addJob);
startBtn.addEventListener('click', startProcessing);
pauseBtn.addEventListener('click', pauseProcessing);
clearBtn.addEventListener('click', clearJobs);

function addJob() {
    const name = nameInput.value.trim() || `Job-${jobCounter}`;
    const work = Math.max(1, parseInt(workInput.value) || 1);
    const priority = parseInt(priorityInput.value) || 5; // 0 = más urgente
    const job = { id: jobCounter++, name, work, priority, timestamp: new Date().toLocaleTimeString() };
    jobQueue.enqueue(job, priority);
    showMessage(`✅ ${name} agregado (p=${priority}, w=${work})`, 'success');
    updateDisplay();
}

async function startProcessing() {
    if (processing) { showMessage('ℹ️ Ya está procesando', 'info'); return; }
    if (jobQueue.isEmpty()) { showMessage('❌ No hay trabajos', 'error'); return; }
    processing = true;
    startBtn.disabled = true; pauseBtn.disabled = false;
    showMessage('▶️ Procesamiento iniciado', 'info');

    while (!jobQueue.isEmpty() && processing) {
        const job = jobQueue.dequeue();
        await processJob(job);
    }

    if (!processing) return;
    processing = false; startBtn.disabled = false; pauseBtn.disabled = true;
    showMessage('✅ Todos los trabajos procesados', 'success');
}

function pauseProcessing() {
    processing = false; startBtn.disabled = false; pauseBtn.disabled = true;
    showMessage('⏸️ Procesamiento pausado', 'warning');
}

function clearJobs() {
    if (processing) { showMessage('⚠️ No puedes limpiar mientras procesa', 'warning'); return; }
    // vaciar heap: crear nuevo
    jobQueue.heap = new MinHeap((a,b) => a.priority - b.priority);
    updateDisplay();
    showMessage('🗑️ Cola limpiada', 'success');
}

async function processJob(job) {
    // Simula trabajo por unidades
    for (let i = 1; i <= job.work; i++) {
        if (!processing) {
            // Si se pausó, reinsertar trabajo con el trabajo restante
            const remaining = { ...job, work: job.work - (i - 1) };
            jobQueue.enqueue(remaining, job.priority);
            updateDisplay();
            return;
        }
        // actualizar UI
        updateProcessing(job, i);
        await sleep(WORK_SPEED);
    }
    processedJobs++;
    processedWork += job.work;
    updateDisplay();
    showMessage(`✅ ${job.name} completado`, 'success');
}

function updateProcessing(job, unit) {
    const processingDiv = document.getElementById('processing');
    processingDiv.innerHTML = `<div class="processing-item">Procesando: <strong>${job.name}</strong> (${unit}/${job.work}) - p=${job.priority}</div>`;
}

function updateDisplay() {
    const arr = jobQueue.toArray();
    queueDisplay.innerHTML = arr.map((job, idx) => `
        <div class="job-card">
            <div class="job-left">
                <div class="job-name">${job.name}</div>
                <div class="job-meta">w:${job.work} • p:${job.priority} • ID:#${job.id}</div>
            </div>
            <div class="job-right">${idx === 0 ? '🔜' : `#${idx+1}`}</div>
        </div>
    `).join('') || '<div class="empty">No hay trabajos</div>';

    statsJobs.textContent = arr.length;
    statsWork.textContent = arr.reduce((s,j) => s + j.work, 0);
}

function showMessage(text, type) {
    messageDiv.textContent = text; messageDiv.className = `message ${type} show`;
    setTimeout(() => { messageDiv.classList.remove('show'); }, 3000);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// init
updateDisplay(); document.getElementById('processing').innerHTML = '<div class="empty">Sin procesamiento</div>';
