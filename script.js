// Funciones comunes para el sitio web del Proyecto AGI

const THEME_KEY = 'proyecto-agi-theme';

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initializeAnimations();
    setupSearchFunctionality();
    updateYearAutomatically();
});

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeButton(saved);

    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);
            updateThemeButton(next);
        });
    }
}

function updateThemeButton(theme) {
    const label = document.getElementById('theme-label');
    const iconSun = document.getElementById('theme-icon-sun');
    const iconMoon = document.getElementById('theme-icon-moon');
    if (label) label.textContent = theme === 'light' ? 'Tema oscuro' : 'Tema claro';
    if (iconSun) iconSun.style.display = theme === 'light' ? 'block' : 'none';
    if (iconMoon) iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
}

function initializeAnimations() {
    const cards = document.querySelectorAll('.card, .stat-item, .link-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, 100 * index);
    });
}

function setupSearchFunctionality() {
    const searchBox = document.querySelector('.search-box');
    if (!searchBox) return;
    
    searchBox.addEventListener('keyup', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const linkItems = document.querySelectorAll('.link-item a');
        
        linkItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
                item.closest('.link-item')?.style.display = 'block';
            } else {
                item.style.display = 'none';
                item.closest('.link-item')?.style.display = 'none';
            }
        });
    });
}

function updateYearAutomatically() {
    const yearElements = document.querySelectorAll('footer p');
    yearElements.forEach(el => {
        if (el.textContent.includes('©')) {
            el.textContent = el.textContent.replace(/\d{4}/, new Date().getFullYear());
        }
    });
}

// Función para manejar la navegación entre páginas
function navigateTo(url) {
    window.location.href = url;
}

// Función para obtener parámetros de URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para verificar si estamos en móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Exportar funciones si se usa en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAnimations,
        setupSearchFunctionality,
        updateYearAutomatically,
        navigateTo,
        getUrlParameter,
        isMobile
    };
}