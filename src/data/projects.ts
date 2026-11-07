import type { Project, ProjectCardData } from "@/types/content";

export const projects: readonly Project[] = [
  {
    slug: "andes-shop",
    title: {
      en: "Andes Shop: E-commerce",
      es: "Andes Shop: E-commerce",
    },
    summary: {
      en: "E-commerce platform with Mercado Pago checkout, inventory control and an admin dashboard.",
      es: "Plataforma de e-commerce con checkout de Mercado Pago, control de inventario y panel de administración.",
    },
    description: {
      en: "A full e-commerce flow — catalog, cart, checkout and post-purchase confirmation — built on Next.js with a Supabase backend. The admin area covers product and customer management plus real-time inventory control, while the storefront stays fast through server rendering and prefetched queries.",
      es: "Un flujo de e-commerce completo — catálogo, carrito, checkout y confirmación de compra — construido sobre Next.js con backend en Supabase. El área de administración cubre la gestión de productos y clientes además del control de inventario en tiempo real, mientras que la tienda se mantiene rápida gracias al renderizado en servidor y a las consultas precargadas.",
    },
    highlights: {
      en: [
        "Checkout integration with Mercado Pago and an order confirmation flow",
        "Admin dashboard for products, customers and live inventory levels",
        "Typed data layer with TanStack Query and Zustand for cart state",
        "Responsive storefront built with Tailwind CSS and daisyUI components",
      ],
      es: [
        "Integración de checkout con Mercado Pago y flujo de confirmación de pedidos",
        "Panel de administración para productos, clientes y niveles de inventario en vivo",
        "Capa de datos tipada con TanStack Query y Zustand para el estado del carrito",
        "Tienda responsive construida con Tailwind CSS y componentes de daisyUI",
      ],
    },
    role: {
      en: "Full Stack Developer",
      es: "Desarrollador Full Stack",
    },
    year: 2025,
    image: "/imagenes/projects/andes-shop.webp",
    tags: [
      "Next.js",
      "Checkout Pro MP",
      "Tailwind",
      "Supabase",
      "Shark UI",
      "Zustand",
      "Tanstack",
    ],
    category: "programming",
    liveUrl: "https://andes-shop.vercel.app/",
  },
  {
    slug: "taskuy",
    title: {
      en: "Taskuy",
      es: "Taskuy",
    },
    summary: {
      en: "Real-time collaborative Kanban board powered by Supabase Realtime.",
      es: "Tablero Kanban colaborativo en tiempo real potenciado por Supabase Realtime.",
    },
    description: {
      en: "A collaborative task manager built on a dynamic Kanban board and backed by Supabase. Teams that are working at the same time see card changes instantly thanks to the realtime channel, and every user can tune the workspace with custom backgrounds, dark/light themes and a fully translated interface.",
      es: "Un administrador de tareas colaborativo construido sobre un tablero Kanban dinámico y respaldado por Supabase. Los equipos que trabajan al mismo tiempo ven los cambios de las tarjetas al instante gracias al canal en tiempo real, y cada usuario puede adaptar su espacio de trabajo con fondos personalizados, tema claro/oscuro y una interfaz completamente traducida.",
    },
    highlights: {
      en: [
        "Drag-and-drop Kanban board with columns, labels and due dates",
        "Instant synchronization across team members via Supabase Realtime",
        "Authentication and row-level security scoped per workspace",
        "Multilanguage support with a customizable workspace background",
      ],
      es: [
        "Tablero Kanban con arrastrar y soltar, columnas, etiquetas y fechas límite",
        "Sincronización instantánea entre miembros del equipo vía Supabase Realtime",
        "Autenticación y seguridad a nivel de fila por espacio de trabajo",
        "Soporte multilenguaje con fondo de espacio de trabajo personalizable",
      ],
    },
    role: {
      en: "Full Stack Developer",
      es: "Desarrollador Full Stack",
    },
    year: 2025,
    image: "/imagenes/task-manager-app-2.webp",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "i18n",
      "Shadcn",
      "Realtime",
    ],
    category: "programming",
    liveUrl: "http://taskuy-task-manager.vercel.app/",
  },
  {
    slug: "pokedex-app",
    title: {
      en: "Pokedex App",
      es: "Pokedex App",
    },
    summary: {
      en: "Pokédex web app that queries PokéAPI for evolutions, moves, abilities and stats.",
      es: "Aplicación web Pokédex que consulta PokéAPI para evoluciones, ataques, habilidades y estadísticas.",
    },
    description: {
      en: "A browser-based Pokédex focused on fast lookups. Each entry pulls evolutions, moves, abilities and base stats from the PokéAPI, with client-side caching so navigating back and forth between Pokémon stays instant.",
      es: "Una Pokédex en el navegador enfocada en consultas rápidas. Cada entrada obtiene evoluciones, ataques, habilidades y estadísticas base desde PokéAPI, con caché en el cliente para que navegar entre Pokémon sea instantáneo.",
    },
    highlights: {
      en: [
        "Search and browse Pokémon with instant client-side filtering",
        "Detail views for evolution chains, moves, abilities and base stats",
        "PokéAPI integration with caching to avoid duplicate requests",
      ],
      es: [
        "Búsqueda y navegación de Pokémon con filtrado instantáneo en el cliente",
        "Vistas de detalle con cadena evolutiva, ataques, habilidades y estadísticas base",
        "Integración con PokéAPI y caché para evitar peticiones duplicadas",
      ],
    },
    role: {
      en: "Frontend Developer",
      es: "Desarrollador Frontend",
    },
    year: 2024,
    image: "/imagenes/projects/pokedex-app.webp",
    tags: ["Node.js", "Express", "MongoDB", "WebSocket"],
    category: "programming",
    liveUrl: "https://pokedex-app-ultimate.vercel.app/",
  },
  {
    slug: "geo-tiff-app",
    title: {
      en: "Climate analysis app using GeoTIFF",
      es: "App de análisis climático con GeoTIFF",
    },
    summary: {
      en: "Climate data explorer that renders GeoTIFF rasters on an interactive Leaflet map.",
      es: "Explorador de datos climáticos que renderiza rásters GeoTIFF sobre un mapa interactivo de Leaflet.",
    },
    description: {
      en: "A client-server application for exploring climate rasters. A Flask API reads GeoTIFF files with Rasterio, exposes the bands through REST endpoints, and the frontend draws the results on a Leaflet map with layer toggles and per-point value inspection.",
      es: "Una aplicación cliente-servidor para explorar rásters climáticos. Una API en Flask lee archivos GeoTIFF con Rasterio, expone las bandas mediante endpoints REST, y el frontend dibuja los resultados en un mapa de Leaflet con capas conmutables e inspección de valores por punto.",
    },
    highlights: {
      en: [
        "Flask REST API that parses GeoTIFF bands with Rasterio",
        "Interactive Leaflet map with layer switching and point inspection",
        "Client-server architecture separating raster processing from the UI",
      ],
      es: [
        "API REST en Flask que procesa bandas GeoTIFF con Rasterio",
        "Mapa interactivo de Leaflet con cambio de capas e inspección por punto",
        "Arquitectura cliente-servidor que separa el procesamiento ráster de la interfaz",
      ],
    },
    role: {
      en: "Full Stack Developer",
      es: "Desarrollador Full Stack",
    },
    year: 2024,
    image: "/imagenes/projects/geo-tiff-app.webp",
    tags: ["Python", "GeoTIFF", "Rasterio", "Flask", "API REST", "JSON"],
    category: "programming",
    githubUrl: "https://github.com/LuisRivera369/geo-tiff-app",
    liveUrl: "https://luisrivera369.github.io/geo-tiff-app/",
  },
  {
    slug: "footloose-dashboard",
    title: {
      en: "Footloose Sales Dashboard",
      es: "Footloose Dashboard de Ventas",
    },
    summary: {
      en: "Sales analytics dashboard with dynamic charts, filters and exportable reports.",
      es: "Panel de análisis de ventas con gráficos dinámicos, filtros e informes exportables.",
    },
    description: {
      en: "An end-to-end sales analysis for a retail dataset: cleaning and aggregation in Python with Pandas, exploratory queries in SQL, and a Tableau dashboard that lets the business team slice revenue by period, category and channel before exporting the results.",
      es: "Un análisis de ventas de extremo a extremo para un conjunto de datos de retail: limpieza y agregación en Python con Pandas, consultas exploratorias en SQL y un dashboard en Tableau que permite al equipo de negocio segmentar ingresos por período, categoría y canal antes de exportar los resultados.",
    },
    highlights: {
      en: [
        "ETL pipeline in Python and Pandas for cleaning and aggregating sales data",
        "Interactive Tableau dashboard with period, category and channel filters",
        "Exportable reports that support recurring business decisions",
      ],
      es: [
        "Pipeline ETL en Python y Pandas para limpiar y agregar los datos de ventas",
        "Dashboard interactivo en Tableau con filtros por período, categoría y canal",
        "Informes exportables que apoyan decisiones de negocio recurrentes",
      ],
    },
    role: {
      en: "Data Analyst",
      es: "Analista de Datos",
    },
    year: 2025,
    image: "/imagenes/projects/footloose.webp",
    tags: ["Python", "Pandas", "Tableau", "SQL"],
    category: "data",
    githubUrl: "https://github.com/LuisRivera369/sales-dashboard",
  },
  {
    slug: "portfolio-website",
    title: {
      en: "Portfolio Website",
      es: "Sitio Web Personal",
    },
    summary: {
      en: "Personal portfolio built with Next.js 16, static rendering per locale and daisyUI v5.",
      es: "Portafolio personal construido con Next.js 16, renderizado estático por idioma y daisyUI v5.",
    },
    description: {
      en: "This site. A single-page portfolio with projects, courses and skills, plus a detail page per project. Every locale is prerendered at build time, metadata and hreflang are generated per language, and the theme is applied by a blocking script so there is no flash of the wrong colours.",
      es: "Este sitio. Un portafolio de una sola página con proyectos, cursos y habilidades, más una página de detalle por proyecto. Cada idioma se prerenderiza en el build, los metadatos y el hreflang se generan por idioma, y el tema se aplica con un script bloqueante para evitar el destello de colores incorrectos.",
    },
    highlights: {
      en: [
        "Static generation per locale with next-intl and path-based routing",
        "Project detail pages generated from the data layer at build time",
        "Accessible dark/light theme with no flash of the wrong theme",
        "SEO essentials: sitemap, robots, hreflang and JSON-LD",
      ],
      es: [
        "Generación estática por idioma con next-intl y rutas por prefijo",
        "Páginas de detalle de proyecto generadas desde la capa de datos en el build",
        "Tema claro/oscuro accesible sin destello de tema incorrecto",
        "Lo esencial de SEO: sitemap, robots, hreflang y JSON-LD",
      ],
    },
    role: {
      en: "Frontend Developer",
      es: "Desarrollador Frontend",
    },
    year: 2026,
    image: "/imagenes/projects/portafolio.webp",
    tags: ["Next.js", "TypeScript", "DaisyUI", "i18n"],
    category: "programming",
    githubUrl: "https://github.com/LuisRivera369/portfolio",
    liveUrl: "https://luisrivera.dev",
  },
];

export function getProjects(): readonly Project[] {
  return projects;
}

/** Card-only projection: omits detail-page copy from the client payload. */
export function getProjectCards(): readonly ProjectCardData[] {
  return projects.map(
    ({ slug, title, summary, image, tags, category, githubUrl, liveUrl }) => ({
      slug,
      title,
      summary,
      image,
      tags,
      category,
      githubUrl,
      liveUrl,
    }),
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/** Other projects in the same category, excluding the current one. */
export function getRelatedProjects(slug: string, limit = 3): readonly Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];

  const sameCategory = projects.filter(
    (project) => project.slug !== slug && project.category === current.category,
  );
  const rest = projects.filter(
    (project) => project.slug !== slug && project.category !== current.category,
  );

  return [...sameCategory, ...rest].slice(0, limit);
}
