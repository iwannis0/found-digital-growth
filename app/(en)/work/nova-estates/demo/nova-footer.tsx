import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function NovaFooter() {
  return <footer className="nova-footer"><Link className="nova-logo" href="/work/nova-estates/demo">NOVA<span>ESTATES</span></Link><p>Fictional website concept by VISION.</p><div><Link href="/work/nova-estates/demo/properties">Properties</Link><Link href="/work/nova-estates/demo/new-developments">New developments</Link><a href={`mailto:${siteConfig.email}`}>Contact</a></div></footer>;
}
