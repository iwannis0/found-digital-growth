/** A visual preview of the NOVA demo hero, used inside project covers. */
export function NovaCover() {
  return <div className="nova-cover" aria-hidden="true">
    <div className="nova-cover-top"><div className="nova-cover-brand">NOVA<span>ESTATES</span></div><div className="nova-cover-nav"><span>PROPERTIES</span><span>NEW DEVELOPMENTS</span><span>ABOUT</span><span>CONTACT</span></div><span className="nova-cover-cta">PRIVATE CONSULTATION <b>↗</b></span></div>
    <div className="nova-cover-copy"><span>PRIVATE PROPERTY · CYPRUS</span><strong>Homes of<br /><em>quiet distinction.</em></strong><p>A considered collection of coastal homes, city residences and new developments across Cyprus.</p><i>Explore properties&nbsp; ↗</i></div>
    <div className="nova-cover-search"><div><b>FOR SALE</b><span>LONG-TERM RENT</span><span>HOLIDAY STAYS</span><span>NEW DEVELOPMENTS</span></div><section><label>LOCATION<small>All locations</small></label><label>PROPERTY TYPE<small>All types</small></label><label>BEDROOMS<small>Any</small></label><b>Search&nbsp; ⌕</b></section></div>
  </div>;
}
