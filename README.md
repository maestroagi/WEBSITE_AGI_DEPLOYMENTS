# WEBSITE_AGI_DEPLOYMENTS

Sitio principal con subpáginas en GitHub Pages.

- **Raíz:** `index.html` = índice con enlaces a todas las subpáginas.
- **Subpáginas:** cada carpeta `<slug>/` tiene su `index.html` (ej. `mi-pagina/index.html`).

Añadir una subpágina (desde la raíz del repo):

```bash
bash scripts/add_subpage.sh <slug> "<Título para el enlace>"
```

Luego crear/editar `<slug>/index.html` con el contenido. El enlace aparece automáticamente en la página principal.
