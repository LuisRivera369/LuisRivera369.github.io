import type { Course } from "@/types/content";

export const courses: readonly Course[] = [
  {
    id: "nextjs-16",
    title: {
      en: "Next.js: The React framework for production",
      es: "Next.js: El framework de React para producción",
    },
    institution: "Udemy",
    badge: "/imagenes/badges/udemy.webp",
    date: "2026-02-15",
    credentialUrl: "https://udemy.com/certificate/nextjs16-luisrivera",
    category: "udemy",
  },
  {
    id: "react-native-expo",
    title: {
      en: "React Native Expo: Native applications for IOS and Android",
      es: "React Native Expo: Aplicaciones nativas para IOS y Android",
    },
    institution: "Udemy",
    badge: "/imagenes/badges/udemy.webp",
    date: "2025-11-20",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-85c17b64-7a3f-47cd-988a-61e8b26e518d/",
    category: "udemy",
  },
  {
    id: "react-cero-experto",
    title: {
      en: "React: from zero to expert",
      es: "React: de cero a experto",
    },
    institution: "Dev Talles",
    badge: "/imagenes/badges/dev-talles.webp",
    date: "2025-11-20",
    credentialUrl: "https://cursos.devtalles.com/certificates/mf8n4ojneo",
    category: "devTalles",
  },
  {
    id: "java",
    title: {
      en: "Java: from zero to expert",
      es: "Java: de cero a experto",
    },
    institution: "Udemy",
    badge: "/imagenes/badges/udemy.webp",
    date: "2025-11-20",
    credentialUrl:
      "https://www.udemy.com/course/universidad-java-especialista-en-java-desde-cero-a-master/",
    category: "udemy",
  },
  {
    id: "spring-angular",
    title: {
      en: "Spring Boot & Angular: Creating Webapp Full Stack",
      es: "Spring Boot & Angular: Creando Webapp Full Stack",
    },
    institution: "Udemy",
    badge: "/imagenes/badges/udemy.webp",
    date: "2025-11-20",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-9853d4dd-6e21-4fd6-8bda-2eac3db74b76/",
    category: "udemy",
  },
  {
    id: "power-bi",
    title: {
      en: "Power BI Course – Data Analysis and Business Intelligence",
      es: "Curso Power BI – Análisis de Datos y Business Intelligence",
    },
    institution: "Udemy",
    badge: "/imagenes/badges/udemy.webp",
    date: "2025-11-20",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-ce322538-b33e-4d43-a6cc-6eeeceb5fdab/",
    category: "udemy",
  },
  {
    id: "tailwind",
    title: {
      en: "Tailwind CSS 4: The Ultimate Guide from Zero to Expert",
      es: "Tailwind CSS 4: La Guía Definitiva de Cero a Experto",
    },
    institution: "Udemy",
    badge: "/imagenes/badges/udemy.webp",
    date: "2025-11-20",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-44808041-6473-4bd6-a035-474af104e5f6/",
    category: "udemy",
  },
  {
    id: "python-essentials",
    title: {
      en: "PCAP: Programming Essentials in Python",
      es: "PCAP: Programming Essentials in Python",
    },
    institution: "Cisco Networking Academy",
    badge: "/imagenes/badges/cisco.webp",
    date: "2025-08-10",
    credentialUrl: "https://netacad.com/certificate/ccna-luisrivera",
    category: "cisco",
  },
  {
    id: "soporte",
    title: {
      en: "IT Essentials PC Hardware and Software",
      es: "IT Essentials PC Hardware and Software",
    },
    institution: "Cisco Networking Academy",
    badge: "/imagenes/badges/cisco.webp",
    date: "2025-08-10",
    credentialUrl:
      "https://drive.google.com/file/d/1yzsccpdC7ycQc6cFSHuk8nxSRScUmv-v/view",
    category: "cisco",
  },
  {
    id: "iot",
    title: {
      en: "Introduction to IoT",
      es: "Introducción a IoT",
    },
    institution: "Cisco Networking Academy",
    badge: "/imagenes/badges/cisco.webp",
    date: "2025-05-22",
    credentialUrl:
      "https://drive.google.com/file/d/1N_UNHu01C-J7-p5n7cg98LYAzusAe7j3/view",
    category: "cisco",
  },
  {
    id: "data-analytics",
    title: {
      en: "Data Analytics",
      es: "Análisis de Datos",
    },
    institution: "Certus",
    badge: "/imagenes/badges/certus.webp",
    date: "2025-03-10",
    credentialUrl:
      "https://drive.google.com/file/d/1m0Put5Y3GZZATsExhCDqvHpso2fy5c3s/view",
    category: "certus",
  },
  {
    id: "sistemas",
    title: {
      en: "Systems Development",
      es: "Desarrollo de Sistemas",
    },
    institution: "IDAT",
    badge: "/imagenes/badges/idat.webp",
    date: "2024-01-20",
    credentialUrl:
      "https://drive.google.com/file/d/1iZFbdgUzLK1XjDN0Lrr0yNDVOukbdUmu/view",
    category: "idat",
  },
  {
    id: "sql-server",
    title: {
      en: "SQL Server Database Administration",
      es: "Administración de Bases de Datos SQL Server",
    },
    institution: "IDAT",
    badge: "/imagenes/badges/idat.webp",
    date: "2024-09-30",
    category: "idat",
  },
];

export function getCourses(): readonly Course[] {
  return courses;
}
