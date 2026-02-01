/**
 * AGI Deployments - JavaScript Principal
 * Sistema modular para el sitio web
 */

(function() {
    'use strict';

    // ============================================
    // Sistema de Tema (Dark/Light)
    // ============================================
    const ThemeManager = {
        STORAGE_KEY: 'agi-theme',

        init() {
            const savedTheme = localStorage.getItem(this.STORAGE_KEY);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme) {
                this.setTheme(savedTheme);
            } else if (prefersDark) {
                this.setTheme('dark');
            } else {
                this.setTheme('light');
            }

            // Escuchar cambios en preferencia del sistema
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });

            // Configurar botón de toggle
            this.setupToggleButton();
        },

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem(this.STORAGE_KEY, theme);
            this.updateToggleButton(theme);
        },

        toggle() {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            this.setTheme(next);
        },

        setupToggleButton() {
            document.querySelectorAll('.theme-toggle').forEach(btn => {
                btn.addEventListener('click', () => this.toggle());
            });
        },

        updateToggleButton(theme) {
            document.querySelectorAll('.theme-toggle').forEach(btn => {
                const sunIcon = btn.querySelector('.icon-sun');
                const moonIcon = btn.querySelector('.icon-moon');
                if (sunIcon && moonIcon) {
                    sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
                    moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
                }
            });
        }
    };

    // ============================================
    // Navegación Móvil
    // ============================================
    const MobileNav = {
        init() {
            const toggle = document.querySelector('.navbar-toggle');
            const menu = document.querySelector('.navbar-menu');

            if (toggle && menu) {
                toggle.addEventListener('click', () => {
                    menu.classList.toggle('active');
                    toggle.classList.toggle('active');
                });

                // Cerrar al hacer clic en un enlace
                menu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        menu.classList.remove('active');
                        toggle.classList.remove('active');
                    });
                });

                // Cerrar al hacer clic fuera
                document.addEventListener('click', (e) => {
                    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                        menu.classList.remove('active');
                        toggle.classList.remove('active');
                    }
                });
            }
        }
    };

    // ============================================
    // Sistema de Tabs
    // ============================================
    const TabSystem = {
        init() {
            document.querySelectorAll('[data-tabs]').forEach(container => {
                const tabs = container.querySelectorAll('.tab');
                const contents = container.querySelectorAll('.tab-content');

                tabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        const target = tab.getAttribute('data-tab');

                        // Desactivar todos
                        tabs.forEach(t => t.classList.remove('active'));
                        contents.forEach(c => c.classList.remove('active'));

                        // Activar seleccionado
                        tab.classList.add('active');
                        const targetContent = container.querySelector(`[data-tab-content="${target}"]`);
                        if (targetContent) {
                            targetContent.classList.add('active');
                        }
                    });
                });
            });
        }
    };

    // ============================================
    // Carga de Changelog desde Git
    // ============================================
    const ChangelogLoader = {
        async init() {
            const workspaceContainer = document.getElementById('changelog-workspace');
            const upstreamContainer = document.getElementById('changelog-upstream');

            if (workspaceContainer) {
                await this.loadChangelog('workspace', workspaceContainer);
            }

            if (upstreamContainer) {
                await this.loadChangelog('upstream', upstreamContainer);
            }
        },

        async loadChangelog(type, container) {
            try {
                // Por ahora usamos datos estáticos generados en build
                // En el futuro se puede conectar a la API de GitHub
                const dataScript = document.getElementById(`changelog-data-${type}`);
                if (dataScript) {
                    const data = JSON.parse(dataScript.textContent);
                    this.renderChangelog(data, container);
                }
            } catch (error) {
                console.error(`Error loading ${type} changelog:`, error);
                container.innerHTML = '<p class="text-center">Error cargando changelog</p>';
            }
        },

        renderChangelog(entries, container) {
            if (!entries || entries.length === 0) {
                container.innerHTML = '<p class="text-center">No hay entradas en el changelog</p>';
                return;
            }

            const html = entries.map(entry => `
                <article class="changelog-entry">
                    <div class="changelog-date">
                        ${entry.date}
                        ${entry.version ? `<span class="changelog-version">${entry.version}</span>` : ''}
                    </div>
                    <h3 class="changelog-title">${entry.title}</h3>
                    <div class="changelog-content">
                        ${entry.changes ? `
                            <ul>
                                ${entry.changes.map(change => `
                                    <li>
                                        ${change.type ? `<span class="changelog-tag changelog-tag-${change.type}">${change.type}</span>` : ''}
                                        ${change.text}
                                    </li>
                                `).join('')}
                            </ul>
                        ` : ''}
                        ${entry.description || ''}
                    </div>
                </article>
            `).join('');

            container.innerHTML = html;
        }
    };

    // ============================================
    // Animaciones al scroll
    // ============================================
    const ScrollAnimations = {
        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.card, .changelog-entry, .section').forEach(el => {
                el.style.opacity = '0';
                observer.observe(el);
            });
        }
    };

    // ============================================
    // Marcar link activo en navegación
    // ============================================
    const ActiveNav = {
        init() {
            const currentPath = window.location.pathname;
            document.querySelectorAll('.navbar-link, .navbar-dropdown-item').forEach(link => {
                const href = link.getAttribute('href');
                if (href && currentPath.includes(href) && href !== '/') {
                    link.classList.add('active');
                } else if (href === '/' && currentPath === '/') {
                    link.classList.add('active');
                }
            });
        }
    };

    // ============================================
    // Búsqueda
    // ============================================
    const Search = {
        init() {
            const searchInput = document.querySelector('.search-input');
            const searchResults = document.querySelector('.search-results');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const query = e.target.value.toLowerCase().trim();
                    if (query.length < 2) {
                        if (searchResults) searchResults.innerHTML = '';
                        return;
                    }
                    this.performSearch(query, searchResults);
                });
            }
        },

        performSearch(query, resultsContainer) {
            // Buscar en los links de navegación
            const allLinks = document.querySelectorAll('.navbar-link, .footer-links a, .card');
            const results = [];

            allLinks.forEach(el => {
                const text = el.textContent.toLowerCase();
                if (text.includes(query)) {
                    results.push({
                        title: el.textContent.trim(),
                        href: el.getAttribute('href') || '#'
                    });
                }
            });

            if (resultsContainer) {
                if (results.length === 0) {
                    resultsContainer.innerHTML = '<p>No se encontraron resultados</p>';
                } else {
                    resultsContainer.innerHTML = results.map(r =>
                        `<a href="${r.href}" class="search-result-item">${r.title}</a>`
                    ).join('');
                }
            }
        }
    };

    // ============================================
    // Inicialización
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        ThemeManager.init();
        MobileNav.init();
        TabSystem.init();
        ChangelogLoader.init();
        ActiveNav.init();
        Search.init();

        // Animaciones solo si no hay preferencia de reducir movimiento
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            ScrollAnimations.init();
        }
    });

    // Exponer para uso global si es necesario
    window.AGI = {
        ThemeManager,
        TabSystem,
        ChangelogLoader
    };
})();
