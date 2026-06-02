import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  draggable?: boolean;
  borderRadius?: string;
  blurIntensity?: "sm" | "md" | "lg" | "xl";
  shadowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  glowIntensity?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  style?: React.CSSProperties;
}

export function LiquidGlassCard({
  children,
  className,
  draggable = false,
  borderRadius = "20px",
  blurIntensity = "md",
  shadowIntensity = "md",
  glowIntensity = "none",
  style,
}: LiquidGlassCardProps) {
  const blurMap = { sm: "backdrop-blur-sm", md: "backdrop-blur-md", lg: "backdrop-blur-lg", xl: "backdrop-blur-xl" };
  const shadowMap = { none: "0 0 0 rgba(0,0,0,0)", xs: "0 0 10px rgba(0,0,0,0.2)", sm: "0 0 20px rgba(0,0,0,0.3)", md: "0 0 40px rgba(0,0,0,0.5)", lg: "0 0 60px rgba(0,0,0,0.7)", xl: "0 0 80px rgba(0,0,0,0.9)" };
  const glowMap = { none: "0 0 0 rgba(0,0,0,0)", xs: "0 0 10px rgba(242,210,139,0.1)", sm: "0 0 20px rgba(242,210,139,0.2)", md: "0 0 40px rgba(242,210,139,0.3)", lg: "0 0 60px rgba(242,210,139,0.4)", xl: "0 0 80px rgba(242,210,139,0.5)" };
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      drag={draggable}
      style={{
        borderRadius,
        boxShadow: `${shadowMap[shadowIntensity]}, ${glowMap[glowIntensity]}`,
        ...style,
      }}
      className="relative overflow-hidden group"
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="glass-blur">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="2" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="200" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          borderRadius,
          boxShadow: "inset 1px 1px 0px rgba(255, 255, 255, 0.1), inset -1px -1px 0px rgba(0, 0, 0, 0.2)",
        }}
        className={cn(
          "w-full h-full relative z-10 transition-all duration-300 group-hover:[filter:url(#glass-blur)]",
          blurMap[blurIntensity],
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
