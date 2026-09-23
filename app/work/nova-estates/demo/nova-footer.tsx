import Link from "next/link";

export function NovaFooter() {
  return <footer className="nova-footer"><Link className="nova-logo" href="/work/nova-estates/demo">NOVA<span>ESTATES</span></Link><p>Fictional website concept by FOUND.</p><div><Link href="/work/nova-estates/demo/properties">Properties</Link><Link href="/work/nova-estates/demo/new-developments">New developments</Link><a href="mailto:found.growthcy@gmail.com">Contact</a></div></footer>;
}
