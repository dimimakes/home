export interface Project {
  title: string;
  description: string;
  link?: string;
  tags?: string[];
  order?: number;
}

export interface Paper {
  title: string;
  description: string;
  link: string;
  year: string;
}

export interface Thought {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const BIO = {
  name: "Dimitrios Gkouskos",
  role: "Associate Professor of Design Research and User Experience",
  institution: "Halmstad University",
  description:
    "I am an associate professor of design research and user experience at Halmstad University. My research interests include post-profit design and emerging technologies, and design education. I work to ensure that technology works for and with people towards a more sustainable and equitable future.",
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dgkouskos/",
      icon: "linkedin",
    },
    {
      name: "University Profile",
      url: "https://www.hh.se/pdben?person=A324D681-4B31-419D-849A-3A064C30990B",
      icon: "user",
    },
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=Zfbz4OwAAAAJ&hl=en",
      icon: "graduation-cap",
    },
    {
      name: "Bluesky",
      url: "https://bsky.app/profile/dimitrees.bsky.social",
      icon: "cloud",
    },
  ],
};

// Simple frontmatter parser for browser compatibility
function parseMD(md: string) {
  // Support both \n and \r\n line endings
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {} as any, content: md };

  const yaml = match[1];
  const content = match[2];
  const data: any = {};

  yaml.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value: any = line.slice(colonIndex + 1).trim();

      // Basic type conversion
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((s: string) => s.trim().replace(/^["']|["']$/g, ""));
      } else if (!isNaN(Number(value)) && value !== "") {
        value = Number(value);
      } else if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }

      data[key] = value;
    }
  });

  return { data, content };
}

// Load Work Projects
const workFiles = import.meta.glob("/src/content/work/*.md", {
  query: "?raw",
  eager: true,
});
export const PROJECTS: Project[] = Object.entries(workFiles)
  .map(([path, module]: [string, any]) => {
    const { data } = parseMD(module.default);
    return {
      title: data.title,
      description: data.description,
      link: data.link,
      tags: data.tags,
      order: data.order || 99,
    };
  })
  .sort((a, b) => (a.order || 0) - (b.order || 0));

// Load Thoughts
const thoughtFiles = import.meta.glob("/src/content/thoughts/*.md", {
  query: "?raw",
  eager: true,
});
export const THOUGHTS: Thought[] = Object.entries(thoughtFiles)
  .map(([path, module]: [string, any]) => {
    const id = path.split("/").pop()?.replace(".md", "") || "";
    const { data, content } = parseMD(module.default);
    return {
      id,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      content,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Load Papers from JSON
import papersData from "./content/papers.json";
export const PAPERS: Paper[] = papersData;
