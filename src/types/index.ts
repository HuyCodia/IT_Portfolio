export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  placeholderText?: string;
  sourceUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  year?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  skills: string[];
}

export interface AboutItem {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  isCta?: boolean;
}

