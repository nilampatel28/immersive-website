import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showExpMenu, setShowExpMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{ position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 50, pointerEvents: "none" }}>
      <nav
        className="flex items-center gap-4 md:gap-6 px-4 md:px-6 py-3 rounded-full pointer-events-auto transition-colors duration-300"
        style={{
          backdropFilter: "blur(24px)",
          background: scrolled ? "rgba(5, 5, 9, 0.8)" : "rgba(5, 5, 9, 0.45)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18.5" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.65" fill="none" />
              <polygon points="20,2 21.4,4.2 20,6.4 18.6,4.2" fill="#F2D28B" fillOpacity="0.65" />
              <polygon points="20,33.6 21.4,35.8 20,38 18.6,35.8" fill="#F2D28B" fillOpacity="0.65" />
              <line x1="1.5" y1="20" x2="4" y2="20" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.4" />
              <line x1="36" y1="20" x2="38.5" y2="20" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.4" />
            </svg>
            <div style={{ position: "absolute", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 15, color: "#F2D28B", lineHeight: 1 }}>IT</span>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 6.5, color: "rgba(242, 210, 139, 0.55)", letterSpacing: "0.32em", textTransform: "uppercase", marginTop: 2 }}>TECHNOLOGY</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block w-[1px] h-4 bg-white/10" />

        <div className="flex items-center gap-4 md:gap-6 relative">
          <div 
            onMouseEnter={() => setShowExpMenu(true)} 
            onMouseLeave={() => setShowExpMenu(false)}
            style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}
          >
            <button style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: "#F6F3F0", display: "flex", alignItems: "center", gap: 4 }} data-cursor-hover>
              Experience
              <span style={{ fontSize: 8 }}>▼</span>
            </button>
            <AnimatePresence>
              {showExpMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: 16 }}
                >
                  <div style={{ backdropFilter: "blur(24px)", background: "rgba(5, 5, 9, 0.9)", borderRadius: 16, border: "1px solid rgba(255, 255, 255, 0.1)", padding: 8, display: "flex", flexDirection: "column", minWidth: 160 }}>
                    {["The Chassis", "The Display", "The Core", "The Keyboard", "Connectivity", "The Battery"].map((item, i) => (
                      <motion.a
                        key={item}
                        href="#"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 14, color: "rgba(246, 243, 240, 0.6)", padding: "8px 16px", borderRadius: 8, transition: "all 0.2s" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(242, 210, 139, 0.07)";
                          e.currentTarget.style.color = "#F6F3F0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(246, 243, 240, 0.6)";
                        }}
                        data-cursor-hover
                      >
                        {item}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="#catalog" className="hidden sm:block" style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: "rgba(246, 243, 240, 0.7)", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#F6F3F0"} onMouseLeave={e => e.currentTarget.style.color = "rgba(246, 243, 240, 0.7)"} data-cursor-hover>Collection</a>
          <a href="#story" className="hidden sm:block" style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: "rgba(246, 243, 240, 0.7)", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#F6F3F0"} onMouseLeave={e => e.currentTarget.style.color = "rgba(246, 243, 240, 0.7)"} data-cursor-hover>Story</a>
        </div>

        <div className="hidden sm:block w-[1px] h-4 bg-white/10" />

        <button
          className="px-4 py-2 text-xs md:text-[13px] border border-[#F2D28B] text-[#F2D28B] rounded-full transition-colors duration-300"
          style={{ fontFamily: '"Inter", sans-serif' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(242, 210, 139, 0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          data-cursor-hover
        >
          Shop
        </button>
      </nav>
    </header>
  );
}

}
