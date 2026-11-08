import { customCapabilities, deployedProjects, processSteps, projects, services } from "@/lib/content";
import { deployedProjectsEl, processStepsEl, projectsEl, servicesEl, type ProjectText, type ServiceText } from "@/lib/content-el";
import type { Locale } from "@/lib/i18n";

// Locale-aware views of lib/content.ts. English returns the source objects untouched;
// Greek overlays the translated wording on the same slugs, icons and images.

export type Service = Omit<(typeof services)[number] | (typeof customCapabilities)[number], keyof ServiceText> & ServiceText;
export type Project = Omit<(typeof projects)[number], keyof ProjectText> & ProjectText;
export type DeployedProject = Omit<(typeof deployedProjects)[number], "industry" | "summary"> & { industry: string; summary: string };

export function getServices(locale: Locale): readonly Service[] {
  return locale === "en" ? services : services.map((service) => ({ ...service, ...servicesEl[service.slug] }));
}

export function getCustomCapabilities(locale: Locale): readonly Service[] {
  return locale === "en" ? customCapabilities : customCapabilities.map((capability) => ({ ...capability, ...servicesEl[capability.slug] }));
}

export function getProjects(locale: Locale): readonly Project[] {
  return locale === "en" ? projects : projects.map((project) => ({ ...project, ...projectsEl[project.slug] }));
}

export function getDeployedProjects(locale: Locale): readonly DeployedProject[] {
  return locale === "en" ? deployedProjects : deployedProjects.map((project) => ({ ...project, ...deployedProjectsEl[project.slug] }));
}

export function getProcessSteps(locale: Locale): readonly (readonly [string, string, string])[] {
  return locale === "en" ? processSteps : processStepsEl;
}
