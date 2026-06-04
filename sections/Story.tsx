import React, { useEffect, useRef } from "react";

export default function Story() {
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      [panel1Ref.current, panel2Ref.current].forEach((panel, i) => {
        if (panel) {
          const dir = i === 0 ? -32 : 32;
          gsap.fromTo(
            panel,
            { opacity: 0, x: dir, scale: 1.04 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
              },
            }
          );
        }
      });
      cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    };
    init();
    return () => cleanup?.();
  }, []);

  return (
    <section id="story" style={{ background: "#050509", padding: "4rem 2rem 8rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* Panel 1 */}
        <div ref={panel1Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-28">
          <div className="order-2 md:order-1">
            <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1.5rem" }}>The Philosophy</p>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", whiteSpace: "pre-line", marginBottom: "2rem" }}>
              {"Born from engineering\nperfection"}
            </h2>
            <div style={{ width: 32, height: 1, background: "#F2D28B", marginBottom: "2rem" }} />
            <p className="body-copy">
              Each component is crafted with exact precision — machined aluminum, custom silicon, edge-to-edge glass. We do not assemble. We architect.
            </p>
          </div>
          <div className="order-1 md:order-2 relative h-[320px] md:h-[420px] rounded overflow-hidden">
            <img src="/images/laptop_story1.jpeg" alt="Sleek metallic laptop" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,9,0.7), rgba(5,5,9,0.1))" }} />
            <span style={{ position: "absolute", bottom: 16, left: 16, fontSize: 9, color: "rgba(246, 243, 240, 0.5)", fontFamily: '"Inter", sans-serif', letterSpacing: "0.1em" }}>SILICON VALLEY, 2024</span>
          </div>
        </div>

        {/* Panel 2 */}
        <div ref={panel2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-28">
          <div className="order-2">
            <p className="label-small" style={{ color: "#d4a0a8", marginBottom: "1.5rem" }}>The Craft</p>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", whiteSpace: "pre-line", marginBottom: "2rem" }}>
              {"Nanometer precision,\nzero compromise"}
            </h2>
            <div style={{ width: 32, height: 1, background: "#d4a0a8", marginBottom: "2rem" }} />
            <p className="body-copy">
              Our fabrication takes weeks per wafer. Every chip is etched at the microscopic level. The result is a machine that anticipates your next move.
            </p>
          </div>
          <div className="order-1 relative h-[320px] md:h-[420px] rounded overflow-hidden">
            <img src="/images/laptop_story2.jpeg" alt="Macro view of abstract hardware" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,9,0.7), rgba(5,5,9,0.1))" }} />
            <span style={{ position: "absolute", bottom: 16, left: 16, fontSize: 9, color: "rgba(246, 243, 240, 0.5)", fontFamily: '"Inter", sans-serif', letterSpacing: "0.1em" }}>CLEANROOM FACILITY, TAIWAN</span>
          </div>
        </div>

        {/* Pull Quote */}
        <div style={{ padding: "4rem 0", borderTop: "1px solid rgba(242, 210, 139, 0.1)", borderBottom: "1px solid rgba(242, 210, 139, 0.1)", textAlign: "center" }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(24px, 2.5vw, 36px)", color: "#F2D28B", fontStyle: "italic", marginBottom: "1.5rem", maxWidth: 800, margin: "0 auto 1.5rem" }}>
            "Technology is at its best when it becomes invisible, leaving only the experience."
          </p>
          <p className="label-small" style={{ color: "rgba(246, 243, 240, 0.5)" }}>— Aura Tech, Design Studio</p>
        </div>

      </div>
    </section>
  );
}
