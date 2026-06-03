import React, { useEffect, useRef } from "react";

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
      cleanup = () => ScrollTrigger.getAll().forEach(t => t.kill());
    };
    init();
    return () => cleanup?.();
  }, []);

  return (
    <section id="masterpiece" ref={sectionRef} style={{ background: "#050509", padding: "4rem 2rem 8rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p className="label-small" style={{ color: "#F2D28B", marginBottom: "1.5rem" }}>The Experience</p>
        <h2 className="display-heading" style={{ fontSize: "clamp(32px, 3.5vw, 48px)", marginBottom: "3rem" }}>
          A Visual Masterpiece
        </h2>
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "#000", borderRadius: "8px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
          <iframe 
            src="https://player.cloudinary.com/embed/?cloud_name=dq0rh2mgj&public_id=Timeline_1_razkcu" 
            width="100%" 
            height="100%" 
            style={{ position: "absolute", top: 0, left: 0, border: "none" }}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture" 
            allowFullScreen 
          />
        </div>
      </div>
    </section>
  );
}
