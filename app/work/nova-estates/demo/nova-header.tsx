"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function NovaConceptBar(){return <div className="nova-concept-bar"><span>FOUND. / WEBSITE CONCEPT</span><span>Fictional NOVA Estates demo</span><Link href="/work/nova-estates">Back to case study <ArrowUpRight size={14} aria-hidden="true" /></Link></div>}

export function NovaHeader({solid=false}:{solid?:boolean}) {
 const [scrolled,setScrolled]=useState(false); const [open,setOpen]=useState(false);
 useEffect(()=>{const on=()=>setScrolled(window.scrollY>40); on(); window.addEventListener("scroll",on,{passive:true}); return()=>window.removeEventListener("scroll",on)},[]);
 const base="/work/nova-estates/demo";
 return <header className={`nova-header ${solid||scrolled?"is-solid":""} ${scrolled?"is-scrolled":""}`}><div className="nova-nav">
  <Link className="nova-logo" href={base}>NOVA<span>ESTATES</span></Link>
  <button className="nova-menu-button" onClick={()=>setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open?<X/>:<Menu/>}</button>
  <nav className={open?"is-open":""} aria-label="NOVA navigation">
   <Link href={`${base}/properties`}>Properties</Link><Link href={`${base}/new-developments`}>New developments</Link><Link href={`${base}#about`}>About</Link><Link href={`${base}#contact`}>Contact</Link>
   <Link className="nova-nav-cta" href={`${base}#contact`}>Private consultation <ArrowUpRight/></Link>
  </nav>
 </div></header>
}
