import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "#050509", padding: "5rem 2rem 3rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* Top */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <svg width="60" height="60" viewBox="0 0 40 40" style={{ margin: "0 auto 1.5rem" }}>
            <circle cx="20" cy="20" r="18.5" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.65" fill="none" />
            <polygon points="20,2 21.4,4.2 20,6.4 18.6,4.2" fill="#F2D28B" fillOpacity="0.65" />
            <polygon points="20,33.6 21.4,35.8 20,38 18.6,35.8" fill="#F2D28B" fillOpacity="0.65" />
            <line x1="1.5" y1="20" x2="4" y2="20" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.4" />
            <line x1="36" y1="20" x2="38.5" y2="20" stroke="#F2D28B" strokeWidth="0.7" strokeOpacity="0.4" />
            <text x="20" y="24" fontFamily='"Cormorant Garamond", serif' fontSize="15" fill="#F2D28B" textAnchor="middle">IT</text>
          </svg>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.4rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#F6F3F0", marginBottom: "0.5rem" }}>
            IMMERSIVE TECHNOLOGY
          </h2>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: "0.65rem", color: "#9E9EAE", letterSpacing: "0.1em" }}>
            Next Generation Hardware
          </p>
        </div>

        {/* Rule */}
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(242, 210, 139, 0.3), transparent)", marginBottom: "4rem" }} />

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-20">
          <div>
            <h4 style={{ fontFamily: '"Inter", sans-serif', fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F2D28B", marginBottom: "1.5rem" }}>Experience</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["The Chassis", "The Display", "The Core", "The Keyboard", "Connectivity", "The Battery"].map(link => (
                <li key={link}>
                  <a href="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: "rgba(246, 243, 240, 0.6)", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#F6F3F0"} onMouseLeave={e => e.currentTarget.style.color = "rgba(246, 243, 240, 0.6)"} data-cursor-hover>{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: '"Inter", sans-serif', fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F2D28B", marginBottom: "1.5rem" }}>Navigate</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Collection", "Story", "Contact"].map(link => (
                <li key={link}>
                  <a href="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: "rgba(246, 243, 240, 0.6)", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#F6F3F0"} onMouseLeave={e => e.currentTarget.style.color = "rgba(246, 243, 240, 0.6)"} data-cursor-hover>{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: '"Inter", sans-serif', fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F2D28B", marginBottom: "1.5rem" }}>House</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Philosophy", "Craft", "Sourcing"].map(link => (
                <li key={link}>
                  <a href="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: 13, color: "rgba(246, 243, 240, 0.6)", transition: "color 0.3s" }} onMouseEnter={e => e.currentTarget.style.color = "#F6F3F0"} onMouseLeave={e => e.currentTarget.style.color = "rgba(246, 243, 240, 0.6)"} data-cursor-hover>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(242, 210, 139, 0.1)", paddingTop: "1.5rem" }}>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: "0.65rem", color: "#9E9EAE" }}>© 2026 Aura Tech. All rights reserved.</p>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: "0.65rem", color: "#9E9EAE" }}>Crafted with intention.</p>
        </div>
        
      </div>
    </footer>
  );
}
