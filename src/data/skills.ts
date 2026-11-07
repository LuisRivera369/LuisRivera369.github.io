import type { Skill } from "@/types/content";

export const skills: readonly Skill[] = [
  // Frontend
  { name: "React", icon: "devicon:react", category: "frontend" },
  { name: "Next.js", icon: "devicon:nextjs", category: "frontend" },
  { name: "Astro", icon: "devicon:astro", category: "frontend" },
  { name: "React Native", icon: "devicon:reactnative-wordmark", category: "frontend" },
  { name: "TypeScript", icon: "devicon:typescript", category: "frontend" },
  { name: "Tailwind CSS", icon: "devicon:tailwindcss", category: "frontend" },
  { name: "Bootstrap", icon: "devicon:bootstrap", category: "frontend" },
  { name: "Javascript", icon: "devicon:javascript", category: "frontend" },
  { name: "HTML5", icon: "devicon:html5", category: "frontend" },
  { name: "CSS", icon: "devicon:css3", category: "frontend" },

  // Backend
  { name: "Java", icon: "devicon:java", category: "backend" },
  { name: "Spring", icon: "devicon:spring", category: "backend" },
  { name: "Python", icon: "devicon:python", category: "backend" },
  { name: "Fastapi", icon: "devicon:fastapi", category: "backend" },
  { name: "Node.js", icon: "devicon:nodejs", category: "backend" },
  { name: "Supabase", icon: "devicon:supabase", category: "backend" },
  { name: "PostgreSQL", icon: "devicon:postgresql", category: "backend" },
  { name: "MongoDB", icon: "devicon:mongodb", category: "backend" },

  // Dev Tools
  { name: "Git", icon: "devicon:git", category: "devTools" },
  { name: "Docker", icon: "devicon:docker", category: "devTools" },
  { name: "VS Code", icon: "devicon:vscode", category: "devTools" },
  { name: "Postman", icon: "devicon:postman", category: "devTools" },
  { name: "Figma", icon: "devicon:figma", category: "devTools" },
  { name: "Linux", icon: "devicon:linux", category: "devTools" },
  { name: "CI/CD", icon: "devicon:githubactions", category: "devTools" },

  // Data Tools
  { name: "Pandas", icon: "devicon:pandas", category: "dataTools" },
  { name: "NumPy", icon: "devicon:numpy", category: "dataTools" },
  { name: "Power BI", icon: "logos:microsoft-power-bi", category: "dataTools" },
  { name: "SQL", icon: "devicon:azuresqldatabase", category: "dataTools" },
  { name: "Jupyter", icon: "devicon:jupyter", category: "dataTools" },
  { name: "Matplotlib", icon: "devicon:matplotlib", category: "dataTools" },
  { name: "Seaborn", icon: "devicon:seaborn", category: "dataTools" },
  { name: "Databricks", icon: "logos:databricks-icon", category: "dataTools" },
  { name: "Apache Spark", icon: "logos:apache-spark", category: "dataTools" },
  { name: "Tableau", icon: "logos:tableau-icon", category: "dataTools" },
];

export function getSkills(): readonly Skill[] {
  return skills;
}
