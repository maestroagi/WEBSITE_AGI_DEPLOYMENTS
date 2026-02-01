// Funciones comunes para el Proyecto AGI - Menú modular y tema
// =============================================================
// MENÚ MODULAR: editar solo la función getNavHTML() para cambiar
// el headbar en todas las páginas. Cada página debe tener
// <div id="site-nav"></div> y cargar este script.

const THEME_KEY = 'proyecto-agi-theme';

// Aplicar tema al cargar el script (evita parpadeo y funciona en todas las páginas)
(function applyThemeImmediate() {
    var saved = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
})();

// ========== MENÚ MODULAR (único lugar: editar aquí para todas las páginas) ==========
function getNavHTML() {
    return (
        '<nav class="top-nav">' +
        '<ul>' +
        '<li><a href="./">Inicio</a></li>' +
        '<li><a href="investigacion/">Investigación</a></li>' +
        '<li><a href="desarrollo/">Desarrollo</a></li>' +
        '<li><a href="documentacion/">Documentación</a></li>' +
        '<li><a href="comunidad/">Comunidad</a></li>' +
        '<li><a href="proyectos/">Proyectos</a></li>' +
        '<li><a href="cambios/">Cambios</a></li>' +
        '</ul>' +
        '<div class="theme-toggle-wrap">' +
        '<button type="button" class="theme-toggle" id="theme-toggle" aria-label="Cambiar entre tema claro y oscuro">' +
        '<svg id="theme-icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>' +
        '<svg id="theme-icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
        '<span id="theme-label">Tema oscuro</span>' +
        '</button>' +
        '</div>' +
        '</nav>'
    );
}

function injectNav() {
    var placeholder = document.getElementById('site-nav');
    if (placeholder) {
        placeholder.innerHTML = getNavHTML();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    injectNav();
    initTheme();
    initializeAnimations();
    setupSearchFunctionality();
    updateYearAutomatically();
});

function initTheme() {
    var saved = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeButton(saved);

    var btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-theme') || 'light';
            var next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);
            updateThemeButton(next);
        });
    }
}

function updateThemeButton(theme) {
    var label = document.getElementById('theme-label');
    var iconSun = document.getElementById('theme-icon-sun');
    var iconMoon = document.getElementById('theme-icon-moon');
    if (label) label.textContent = theme === 'light' ? 'Tema oscuro' : 'Tema claro';
    if (iconSun) iconSun.style.display = theme === 'light' ? 'block' : 'none';
    if (iconMoon) iconMoon.style.display = theme === 'dark' ? 'block' : 'none';
}

function initializeAnimations() {
    var cards = document.querySelectorAll('.card, .stat-item, .link-item');
    cards.forEach(function(card, index) {
        setTimeout(function() {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, 100 * index);
    });
}

function setupSearchFunctionality() {
    var searchBox = document.querySelector('.search-box');
    if (!searchBox) return;
    searchBox.addEventListener('keyup', function(e) {
        var searchTerm = e.target.value.toLowerCase();
        var linkItems = document.querySelectorAll('.link-item a');
        linkItems.forEach(function(item) {
            var text = item.textContent.toLowerCase();
            var parent = item.closest('.link-item');
            if (parent) parent.style.display = text.indexOf(searchTerm) !== -1 ? 'block' : 'none';
        });
    });
}

function updateYearAutomatically() {
    var yearElements = document.querySelectorAll('footer p');
    yearElements.forEach(function(el) {
        if (el.textContent.indexOf('©') !== -1) {
            el.textContent = el.textContent.replace(/\d{4}/, new Date().getFullYear());
        }
    });
}

function navigateTo(url) {
    window.location.href = url;
}

function getUrlParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function isMobile() {
    return window.innerWidth <= 768;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getNavHTML: getNavHTML,
        injectNav: injectNav,
        initTheme: initTheme,
        initializeAnimations: initializeAnimations,
        setupSearchFunctionality: setupSearchFunctionality,
        updateYearAutomatically: updateYearAutomatically,
        navigateTo: navigateTo,
        getUrlParameter: getUrlParameter,
        isMobile: isMobile
    };
}
