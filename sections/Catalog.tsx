import React, { useEffect, useRef } from "react";
import { frames } from "@/config/frames";

export default function Catalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        }
      });
      cleanup = () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    };
    init();
    return () => cleanup?.();
  }, []);

  const catalogFrames = frames.filter(f => f.price);

  return (
    <section id="catalog" ref={sectionRef} style={{ background: "#050509", padding: "8rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem", textAlign: "center" }}>
          <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1rem" }}>The Collection</p>
          <h2 className="display-heading" style={{ fontSize: "clamp(32px, 4vw, 56px)", marginBottom: "2rem" }}>Our Sacred Essences</h2>
          <div style={{ width: 60, height: 1, background: "rgba(242, 210, 139, 0.4)", margin: "0 auto" }} />
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {catalogFrames.map((frame, i) => (
            <div
              key={frame.id}
              ref={el => { cardsRef.current[i] = el; }}
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 4,
                padding: "2rem",
                transition: "transform 0.3s, border-color 0.3s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(242, 210, 139, 0.2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1rem" }}>{frame.chapter}</p>
              <h3 className="display-heading" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{frame.title}</h3>
              <div style={{ width: "100%", height: 1, background: "rgba(242, 210, 139, 0.2)", marginBottom: "1.5rem" }} />
              
              {frame.notes && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                  {frame.notes.map((note, j) => (
                    <span key={j} style={{ background: "rgba(255, 255, 255, 0.05)", padding: "4px 10px", borderRadius: 9999, fontSize: 11, fontFamily: '"Inter", sans-serif', color: "rgba(246, 243, 240, 0.7)" }}>
                      {note}
                    </span>
                  ))}
                </div>
              )}
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.6rem", color: "#F6F3F0" }}>{frame.price}</p>
                <a
                  href="#"
                  style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: "#F2D28B", textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                  data-cursor-hover
                >
                  Discover →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
