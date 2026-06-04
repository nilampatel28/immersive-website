import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Frame } from "@/config/frames";
import { LiquidGlassCard } from "@/components/ui/liquid-weather-glass";

interface BuyCardProps {
  frame: Frame;
  visible: boolean;
}

export default function BuyCard({ frame, visible }: BuyCardProps) {
  if (!frame.price) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <LiquidGlassCard
            borderRadius="20px"
            blurIntensity="lg"
            shadowIntensity="sm"
            glowIntensity="sm"
            draggable={false}
            className="p-7 bg-black/25 border border-white/10"
            style={{ maxWidth: 280 }}
          >
            <p style={{ fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "#F2D28B", marginBottom: 16 }}>
              HARDWARE
            </p>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 26, fontWeight: 400, color: "#F6F3F0", marginBottom: 16 }}>
              {frame.title}
            </h3>
            
            {frame.notes && (
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0", display: "flex", flexDirection: "column", gap: 8 }}>
                {frame.notes.map((note, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: '"Inter", sans-serif', fontSize: 12, color: "rgba(246, 243, 240, 0.6)" }}>
                    <span style={{ color: "#F2D28B", fontSize: 8 }}>◆</span> {note}
                  </li>
                ))}
              </ul>
            )}

            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 400, color: "#F6F3F0", marginBottom: 24 }}>
              {frame.price}
            </p>

            <button
              className="w-full flex items-center justify-center rounded-full"
              style={{ padding: "12px 24px", border: "1px solid #F2D28B", background: "transparent", color: "#F2D28B", fontFamily: '"Inter", sans-serif', fontSize: 12, transition: "background 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(242, 210, 139, 0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              data-cursor-hover
            >
              {frame.ctaPrimary}
            </button>

            {frame.ctaSecondary && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <a
                  href="#"
                  style={{ fontFamily: '"Inter", sans-serif', fontSize: 12, color: "rgba(246, 243, 240, 0.5)", textDecoration: "underline", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F6F3F0")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(246, 243, 240, 0.5)")}
                  data-cursor-hover
                >
                  {frame.ctaSecondary}
                </a>
              </div>
            )}
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
