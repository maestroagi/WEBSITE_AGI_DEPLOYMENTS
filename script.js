/**
 * HAGORAGI / AGI Deployments - Main JavaScript
 */

(function() {
    'use strict';

    // ==========================================
    // Base path for GitHub Pages project site
    // ==========================================
    const BASE = '/WEBSITE_AGI_DEPLOYMENTS';

    // ==========================================
    // Shared navigation (injected into all pages)
    // ==========================================
    function getNavHTML() {
        return `
    <nav class="site-nav">
        <div class="nav-container">
            <a href="${BASE}/" class="nav-brand">
                <span class="nav-brand-icon">🤖</span>
                <span>HAGORAGI</span>
            </a>

            <button class="nav-toggle" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav-menu">
                <li><a href="${BASE}/" class="nav-link" data-page="home">Home</a></li>

                <li class="nav-dropdown">
                    <a href="${BASE}/cambios/" class="nav-link">Changelogs ▾</a>
                    <div class="nav-dropdown-menu">
                        <a href="${BASE}/cambios/" class="nav-dropdown-item">📋 Side by Side</a>
                        <a href="${BASE}/changelog-hagoragi/" class="nav-dropdown-item">🤖 HAGORAGI Bot</a>
                        <a href="${BASE}/changelog-openclaw/" class="nav-dropdown-item">🔧 OpenClaw Official</a>
                    </div>
                </li>

                <li class="nav-dropdown">
                    <a href="#" class="nav-link">Documentation ▾</a>
                    <div class="nav-dropdown-menu">
                        <a href="${BASE}/documentacion/" class="nav-dropdown-item">📚 General</a>
                        <a href="${BASE}/api/" class="nav-dropdown-item">⚡ API Reference</a>
                        <a href="${BASE}/tutoriales/" class="nav-dropdown-item">📖 Tutorials</a>
                        <a href="${BASE}/faq/" class="nav-dropdown-item">❓ FAQ</a>
                    </div>
                </li>

                <li class="nav-dropdown">
                    <a href="#" class="nav-link">Project ▾</a>
                    <div class="nav-dropdown-menu">
                        <a href="${BASE}/proyectos/" class="nav-dropdown-item">📊 Projects</a>
                        <a href="${BASE}/desarrollo/" class="nav-dropdown-item">🛠️ Development</a>
                        <a href="${BASE}/skills/" class="nav-dropdown-item">🧩 Skills</a>
                        <a href="${BASE}/estado/" class="nav-dropdown-item">📈 Status</a>
                    </div>
                </li>

                <li><a href="${BASE}/seguridad/" class="nav-link" data-page="security">Security</a></li>

                <li>
                    <a href="https://github.com/maestroagi/openclaw-workspace" target="_blank" class="nav-link">
                        GitHub ↗
                    </a>
                </li>

                <li>
                    <button class="theme-toggle" aria-label="Toggle theme" onclick="toggleTheme()">
                        <span class="theme-icon">🌙</span>
                    </button>
                </li>
            </ul>
        </div>
    </nav>
    `;
    }

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
        const navHTML = getNavHTML();
        const navPlaceholder = document.getElementById('site-nav');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = navHTML;
        } else {
            // Insertar al inicio del body
            document.body.insertAdjacentHTML('afterbegin', navHTML);
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
