import type { MetadataRoute } from "next";
import { customCapabilities, projects, services } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
export default function sitemap(): MetadataRoute.Sitemap { const staticRoutes = ["", "/services", "/work", "/pricing", "/free-audit", "/about", "/faq", "/contact", "/privacy", "/terms"]; const routes = [...staticRoutes, ...services.map((service) => `/services/${service.slug}`), ...customCapabilities.map((capability) => `/services/${capability.slug}`), ...projects.map((project) => `/work/${project.slug}`)]; return routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/free-audit" ? .9 : .7 })); }
