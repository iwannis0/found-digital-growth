/** A visual preview of the AURA demo hero, used inside project covers. */
export function AuraCover() {
  return (
    <div className="aura-cover" aria-hidden="true">
      <div className="aura-cover-top">
        <div className="aura-cover-brand"><strong>AURA</strong><span>DENTAL</span></div>
        <div className="aura-cover-nav"><span>SERVICES</span><span>WHY AURA</span><span>REVIEWS</span><span>FAQ</span><span>CONTACT</span></div>
        <span className="aura-cover-visit">BOOK A VISIT <span>↗</span></span>
      </div>
      <div className="aura-cover-content">
        <span className="aura-cover-eyebrow">BOUTIQUE DENTISTRY / NICOSIA</span>
        <strong className="aura-cover-title">A calmer visit.<br />A brighter smile.</strong>
        <span className="aura-cover-description">Modern care, honest conversations and thoughtful treatment designed around you.</span>
        <span className="aura-cover-actions"><span>Book a Visit <b>↗</b></span><span>Explore Services <b>→</b></span></span>
        <span className="aura-cover-note">A considered experience, from your first visit.</span>
      </div>
      <div className="aura-cover-bottom"><span>CARE THAT FEELS PERSONAL</span><span>SCROLL TO DISCOVER ↓</span></div>
      <span className="aura-cover-concept">CONCEPT PROJECT</span>
    </div>
  );
}
