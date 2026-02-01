/**
 * HAGORAGI / AGI Deployments - JavaScript Principal
 */

(function() {
    'use strict';

    // ==========================================
    // Navegación compartida (se inyecta en todas las páginas)
    // ==========================================
    const NAV_HTML = `
    <nav class="site-nav">
        <div class="nav-container">
            <a href="./" class="nav-brand">
                <span class="nav-brand-icon">🤖</span>
                <span>HAGORAGI</span>
            </a>

            <button class="nav-toggle" aria-label="Menú">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav-menu">
                <li><a href="./" class="nav-link" data-page="home">Inicio</a></li>

                <li class="nav-dropdown">
                    <a href="#" class="nav-link">Changelogs ▾</a>
                    <div class="nav-dropdown-menu">
                        <a href="changelog-hagoragi/" class="nav-dropdown-item">🤖 HAGORAGI Bot</a>
                        <a href="changelog-openclaw/" class="nav-dropdown-item">🔧 OpenClaw Official</a>
                    </div>
                </li>

                <li class="nav-dropdown">
                    <a href="#" class="nav-link">Documentación ▾</a>
                    <div class="nav-dropdown-menu">
                        <a href="documentacion/" class="nav-dropdown-item">📚 General</a>
                        <a href="api/" class="nav-dropdown-item">⚡ API Reference</a>
                        <a href="tutoriales/" class="nav-dropdown-item">📖 Tutoriales</a>
                        <a href="faq/" class="nav-dropdown-item">❓ FAQ</a>
                    </div>
                </li>

                <li class="nav-dropdown">
                    <a href="#" class="nav-link">Proyecto ▾</a>
                    <div class="nav-dropdown-menu">
                        <a href="proyectos/" class="nav-dropdown-item">📊 Proyectos</a>
                        <a href="desarrollo/" class="nav-dropdown-item">🛠️ Desarrollo</a>
                        <a href="skills/" class="nav-dropdown-item">🧩 Skills</a>
                        <a href="estado/" class="nav-dropdown-item">📈 Estado</a>
                    </div>
                </li>

                <li><a href="seguridad/" class="nav-link" data-page="seguridad">Seguridad</a></li>

                <li>
                    <a href="https://github.com/maestroagi/openclaw-workspace" target="_blank" class="nav-link">
                        GitHub ↗
                    </a>
                </li>

                <li>
                    <button class="theme-toggle" aria-label="Cambiar tema" onclick="toggleTheme()">
                        <span class="theme-icon">🌙</span>
                    </button>
                </li>
            </ul>
        </div>
    </nav>
    `;

    // ==========================================
    // Gestión de Tema
    // ==========================================
    const THEME_KEY = 'hagoragi-theme';

    function getPreferredTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        const icons = document.querySelectorAll('.theme-icon');
        icons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        });
    }

    window.toggleTheme = function() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
    };

    // ==========================================
    // Navegación Móvil
    // ==========================================
    function setupMobileNav() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
            });

            // Cerrar al hacer clic en un link
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                });
            });
        }
    }

    // ==========================================
    // Marcar página activa en navegación
    // ==========================================
    function setActiveNav() {
        const path = window.location.pathname;
        document.querySelectorAll('.nav-link, .nav-dropdown-item').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && path.includes(href.replace('./', '').replace('/', ''))) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================
    // Inyectar navegación
    // ==========================================
    function injectNavigation() {
        const navPlaceholder = document.getElementById('site-nav');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = NAV_HTML;
        } else {
            // Insertar al inicio del body
            document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
        }
    }

    // ==========================================
    // Inicialización
    // ==========================================
    function init() {
        // Tema
        setTheme(getPreferredTheme());

        // Navegación
        injectNavigation();
        setupMobileNav();
        setActiveNav();

        // Escuchar cambios de preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(THEME_KEY)) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
