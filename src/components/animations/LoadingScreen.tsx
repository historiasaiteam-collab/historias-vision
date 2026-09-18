import logo from "@/assets/logo-h.png";

/** A brief, CSS-driven opening frame on every full page load. */
export function LoadingScreen() {
  return (
    <div className="site-intro" aria-hidden="true">
      <div className="site-intro__panel site-intro__panel--left" />
      <div className="site-intro__panel site-intro__panel--right" />
      <div className="site-intro__seam" />
      <div className="site-intro__frame site-intro__frame--top" />
      <div className="site-intro__frame site-intro__frame--bottom" />
      <div className="site-intro__center">
        <span className="site-intro__ghost">H</span>
        <span className="site-intro__label">HISTORIAS / 001</span>
        <img src={logo} alt="" width={180} height={180} className="site-intro__logo" />
        <span className="site-intro__line" />
        <span className="site-intro__caption">STORY IN MOTION</span>
      </div>
      <span className="site-intro__timecode">00 : 00 : 01</span>
    </div>
  );
}
