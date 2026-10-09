import { sections } from "@/constants";

export const sectionHref = (id: string) => `/${id}`;

export function getSection(id: string) {
  const section = sections.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown section "${id}"`);
  return section;
}

export function sectionIndexFromPath(pathname: string) {
  return sections.findIndex((s) => pathname === sectionHref(s.id) || pathname.startsWith(`${sectionHref(s.id)}/`));
}
