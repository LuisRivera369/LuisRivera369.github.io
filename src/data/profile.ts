import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Luis Rivera",
  profession: {
    en: "Full Stack Developer",
    es: "Desarrollador Full Stack",
  },
  photo: "/imagenes/luis.jpg",
  cvUrl: "/documentos/CV-Luis-Rivera.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/luis-rivera-a98166221",
    github: "https://github.com/LuisRivera369",
    email: "mailto:luis.rivera.dev.99@gmail.com",
    whatsapp: "https://wa.me/51926205733",
  },
};

export function getProfile(): Profile {
  return profile;
}
