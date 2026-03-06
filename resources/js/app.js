/**
 * ============================================
 * GBI Apostolic Center Doyo Baru
 * Alpine.js Global Stores & Components
 * Laravel equivalent: resources/js/app.js
 * ============================================
 */

document.addEventListener('alpine:init', () => {

    // ---- Global Store: App ---- 
    // Laravel equivalent: config/app.php
    Alpine.store('app', {
        name: 'GBI Apostolic Center',
        subtitle: 'Doyo Baru',
        version: '1.0.0',
        developer: 'Nokensoft.com',
        year: new Date().getFullYear(),
    });

    // ---- Global Store: Auth ----
    // Laravel equivalent: Auth facade
    Alpine.store('auth', {
        user: null,
        role: null,
        init() {
            // Simulate auth state - replace with real API
            const path = window.location.pathname;
            if (path.includes('admin-master')) this.role = 'admin-master';
            else if (path.includes('manager')) this.role = 'manager';
            else if (path.includes('operator')) this.role = 'operator';
        },
        logout() {
            window.location.href = '../resources/views/auth/login.html';
        }
    });

    // ---- Global Store: Notifications ----
    Alpine.store('notifications', {
        items: [],
        add(type, message) {
            const id = Date.now();
            this.items.push({ id, type, message });
            setTimeout(() => this.remove(id), 5000);
        },
        remove(id) {
            this.items = this.items.filter(n => n.id !== id);
        }
    });
});

/**
 * ---- Reusable Component: Data Table ----
 * Laravel equivalent: Livewire/Alpine component
 */
function dataTable(config = {}) {
    return {
        search: '',
        sortField: config.defaultSort || '',
        sortDirection: 'asc',
        currentPage: 1,
        perPage: config.perPage || 10,
        items: config.items || [],
        
        get filteredItems() {
            let result = [...this.items];
            if (this.search) {
                const q = this.search.toLowerCase();
                result = result.filter(item => 
                    Object.values(item).some(v => 
                        String(v).toLowerCase().includes(q)
                    )
                );
            }
            if (this.sortField) {
                result.sort((a, b) => {
                    const aVal = a[this.sortField];
                    const bVal = b[this.sortField];
                    const mod = this.sortDirection === 'asc' ? 1 : -1;
                    return aVal > bVal ? mod : aVal < bVal ? -mod : 0;
                });
            }
            return result;
        },
        get paginatedItems() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.filteredItems.slice(start, start + this.perPage);
        },
        get totalPages() {
            return Math.ceil(this.filteredItems.length / this.perPage);
        },
        sort(field) {
            if (this.sortField === field) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortField = field;
                this.sortDirection = 'asc';
            }
        }
    };
}

/**
 * ---- Reusable Component: Modal ----
 */
function modalComponent() {
    return {
        open: false,
        title: '',
        show(title) { this.title = title; this.open = true; },
        close() { this.open = false; this.title = ''; }
    };
}

/**
 * ---- Reusable Component: Confirm Dialog ----
 */
function confirmDialog() {
    return {
        open: false,
        message: '',
        onConfirm: null,
        show(message, callback) {
            this.message = message;
            this.onConfirm = callback;
            this.open = true;
        },
        confirm() {
            if (this.onConfirm) this.onConfirm();
            this.open = false;
        },
        cancel() {
            this.open = false;
        }
    };
}

/**
 * ---- Helper: Format Currency (IDR) ----
 */
function formatRupiah(num) {
    return 'Rp ' + Number(num).toLocaleString('id-ID');
}

/**
 * ---- Helper: Format Date (ID) ----
 */
function formatTanggal(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * ---- Helper: Init Chart ----
 */
function initLineChart(canvasId, labels, data, label = 'Data') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    return new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
                borderWidth: 3,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: false, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initBarChart(canvasId, labels, data, label = 'Data') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    return new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: '#2563eb',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initDoughnutChart(canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    return new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors || ['#2563eb', '#1e293b', '#64748b', '#cbd5e1'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
        }
    });
}
