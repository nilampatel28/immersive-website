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
        <div ref={panel1Ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "4rem", alignItems: "center", marginBottom: "7rem" }}>
          <div style={{ order: 1 }}>
            <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1.5rem" }}>The Philosophy</p>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", whiteSpace: "pre-line", marginBottom: "2rem" }}>
              {"Born from sacred\nlandscapes of India"}
            </h2>
            <div style={{ width: 32, height: 1, background: "#F2D28B", marginBottom: "2rem" }} />
            <p className="body-copy">
              Each essence is drawn from a specific terrain — a desert at dawn, a jungle after rain, a Himalayan ridge at altitude. We do not blend in laboratories. We observe, we collect, we distill.
            </p>
          </div>
          <div style={{ order: 2, position: "relative", height: 420, borderRadius: 4, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80" alt="Landscape" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,9,0.7), rgba(5,5,9,0.1))" }} />
            <span style={{ position: "absolute", bottom: 16, left: 16, fontSize: 9, color: "rgba(246, 243, 240, 0.5)", fontFamily: '"Inter", sans-serif', letterSpacing: "0.1em" }}>HIMALAYAN FOOTHILLS, 2024</span>
          </div>
        </div>

        {/* Panel 2 */}
        <div ref={panel2Ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "4rem", alignItems: "center", marginBottom: "7rem" }}>
          <div style={{ order: 2 }}>
            <p className="label-small" style={{ color: "#d4a0a8", marginBottom: "1.5rem" }}>The Craft</p>
            <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", whiteSpace: "pre-line", marginBottom: "2rem" }}>
              {"Cold-process extraction,\nzero synthetic accord"}
            </h2>
            <div style={{ width: 32, height: 1, background: "#d4a0a8", marginBottom: "2rem" }} />
            <p className="body-copy">
              Our process takes 14 days per batch. Every ingredient is sourced within 200km of its origin terrain. The result is a fragrance that carries the memory of a real place.
            </p>
          </div>
          <div style={{ order: 1, position: "relative", height: 420, borderRadius: 4, overflow: "hidden" }}>
            <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&auto=format&fit=crop&q=80" alt="Distillation" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,9,0.7), rgba(5,5,9,0.1))" }} />
            <span style={{ position: "absolute", bottom: 16, left: 16, fontSize: 9, color: "rgba(246, 243, 240, 0.5)", fontFamily: '"Inter", sans-serif', letterSpacing: "0.1em" }}>EXTRACTION STUDIO, KERALA</span>
          </div>
        </div>

        {/* Pull Quote */}
        <div style={{ padding: "4rem 0", borderTop: "1px solid rgba(242, 210, 139, 0.1)", borderBottom: "1px solid rgba(242, 210, 139, 0.1)", textAlign: "center" }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "clamp(24px, 2.5vw, 36px)", color: "#F2D28B", fontStyle: "italic", marginBottom: "1.5rem", maxWidth: 800, margin: "0 auto 1.5rem" }}>
            "Scent is the only sense that bypasses reason entirely — it arrives as pure feeling."
          </p>
          <p className="label-small" style={{ color: "rgba(246, 243, 240, 0.5)" }}>— Indian Fragrances, Studio Notes</p>
        </div>

      </div>
    </section>
  );
}
