import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Frame, frames } from "@/config/frames";
import FrameText from "@/components/FrameText";
import BuyCard from "@/components/BuyCard";

const INTRO_VIDEO =
  "https://res.cloudinary.com/drql9cjic/video/upload/v1779364541/Fairy_plain_with_fireflies_and_202605201940_yc5vnp.mp4";
const EXPERIENCE_VIDEO =
  "https://res.cloudinary.com/dq0rh2mgj/video/upload/v1780433876/Timeline_1_razkcu.mp4";

const TOTAL_VIDEO_DURATION = 55; // seconds
const PX_PER_SECOND = 200;
const TOTAL_SCROLL_PX = TOTAL_VIDEO_DURATION * PX_PER_SECOND;

const SEGMENTS = [
  { id: "entry", frameId: "entry", transitionStart: 0, transitionEnd: 2, loopStart: 2, loopEnd: 3, scrollResume: 3 },
  { id: "chassis", frameId: "chassis", transitionStart: 3, transitionEnd: 6, loopStart: 6, loopEnd: 8, scrollResume: 8 },
  { id: "display", frameId: "display", transitionStart: 8, transitionEnd: 12, loopStart: 12, loopEnd: 16, scrollResume: 16 },
  { id: "core", frameId: "core", transitionStart: 16, transitionEnd: 21, loopStart: 21, loopEnd: 24, scrollResume: 24 },
  { id: "keyboard", frameId: "keyboard", transitionStart: 24, transitionEnd: 28, loopStart: 28, loopEnd: 32, scrollResume: 32 },
  { id: "connectivity", frameId: "connectivity", transitionStart: 32, transitionEnd: 36, loopStart: 36, loopEnd: 40, scrollResume: 40 },
  { id: "battery", frameId: "battery", transitionStart: 40, transitionEnd: 45, loopStart: 45, loopEnd: 50, scrollResume: 50 },
  { id: "outro", frameId: "loop-complete", transitionStart: 50, transitionEnd: 55, loopStart: 50, loopEnd: 55, scrollResume: 55 },
];

const NO_PANEL_FRAMES = new Set(["entry", "loop-complete"]);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const idleVidRef = useRef<HTMLVideoElement>(null);
  const expVidRef = useRef<HTMLVideoElement>(null);

  const modeRef = useRef<"IDLE" | "SCRUB" | "LOOP">("IDLE");
  const segmentRef = useRef(SEGMENTS[0]);
  const lastProgressRef = useRef(0);
  const lastProgressMsRef = useRef(Date.now());
  const isResettingRef = useRef(false);
  const rafRef = useRef<number>();
  const lastSeekMsRef = useRef(0);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);

  const [mode, setMode] = useState<"IDLE" | "SCRUB" | "LOOP">("IDLE");
  const [currentFrame, setCurrentFrame] = useState<Frame>(frames[0]);
  const currentFrameRef = useRef(frames[0]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin");
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      const segmentFromTime = (time: number) => {
        return SEGMENTS.find(s => time >= s.transitionStart && time <= s.scrollResume) || SEGMENTS[SEGMENTS.length - 1];
      };

      const renderLoop = () => {
        const timestamp = performance.now();
        const delta = targetTimeRef.current - smoothedTimeRef.current;

        if (Math.abs(delta) > 0.0005) {
          smoothedTimeRef.current += delta * 0.05;
        }

        const video = expVidRef.current;
        if (video) {
          if (
            timestamp - lastSeekMsRef.current >= 16.67 &&
            video.readyState >= 2 &&
            Math.abs(smoothedTimeRef.current - video.currentTime) > 0.01
          ) {
            video.currentTime = smoothedTimeRef.current;
            lastSeekMsRef.current = timestamp;
          }

          if (modeRef.current === "SCRUB" && Date.now() - lastProgressMsRef.current > 550) {
            const seg = segmentRef.current;
            if (video.currentTime >= seg.loopStart && video.currentTime < seg.loopEnd) {
              modeRef.current = "LOOP";
              setMode("LOOP");
              video.play().catch(() => {});
            }
          }

          if (modeRef.current === "LOOP") {
            if (video.paused) video.play().catch(() => {});
            const seg = segmentRef.current;
            if (video.currentTime >= seg.loopEnd || video.currentTime < seg.loopStart) {
              video.currentTime = seg.loopStart;
            }
          }
        }

        rafRef.current = requestAnimationFrame(renderLoop);
      };

      rafRef.current = requestAnimationFrame(renderLoop);

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: `+=${TOTAL_SCROLL_PX}`,
        pin: stageRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (isResettingRef.current) return;
          const p = self.progress;

          if (Math.abs(p - lastProgressRef.current) > 0.0008) {
            lastProgressRef.current = p;
            lastProgressMsRef.current = Date.now();
          }

          if (p < 0.004) {
            if (modeRef.current !== "IDLE") {
              modeRef.current = "IDLE";
              setMode("IDLE");
              if (expVidRef.current) expVidRef.current.pause();
              targetTimeRef.current = 0;
              smoothedTimeRef.current = 0;
              setCurrentFrame(frames[0]);
              currentFrameRef.current = frames[0];
            }
          } else {
            if (modeRef.current === "IDLE" || modeRef.current === "LOOP") {
              modeRef.current = "SCRUB";
              setMode("SCRUB");
              if (expVidRef.current) expVidRef.current.pause();
            }
          }

          if (p >= 0.004) {
            let next = p * TOTAL_VIDEO_DURATION;
            const seg = segmentFromTime(next);
            segmentRef.current = seg;

            const frameData = frames.find(f => f.id === seg.frameId) || frames[0];
            if (currentFrameRef.current.id !== frameData.id) {
              setCurrentFrame(frameData);
              currentFrameRef.current = frameData;
            }

            if (next > seg.scrollResume && seg.id !== "outro") {
              next = seg.scrollResume;
            }
            if (next < seg.transitionStart) {
              next = seg.transitionStart;
            }
            targetTimeRef.current = next;
          }

          if (p > 0.98 && !isResettingRef.current) {
            isResettingRef.current = true;
            setTimeout(() => {
              gsap.to(window, {
                scrollTo: 0,
                duration: 2.5,
                ease: "power2.inOut",
                onComplete: () => {
                  isResettingRef.current = false;
                }
              });
            }, 1500);
          }
        }
      });

      cleanup = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    };

    init();

    return () => cleanup?.();
  }, []);

  const isIdle = mode === "IDLE";
  const showPanels = !isIdle && !NO_PANEL_FRAMES.has(currentFrame.id);

  return (
    <section id="hero" ref={heroRef} style={{ position: "relative", background: "#050509", minHeight: `calc(100vh + ${TOTAL_SCROLL_PX}px)` }}>
      <div ref={stageRef} style={{ position: "sticky", top: 0, width: "100%", height: "100vh", overflow: "hidden" }}>
        
        {/* Video 1: Intro loop (IDLE) */}
        <video ref={idleVidRef} autoPlay loop muted playsInline preload="auto" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1,
                   willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden",
                   WebkitBackfaceVisibility: "hidden", opacity: isIdle ? 1 : 0, transition: "opacity 0.9s ease" }}>
          <source src={INTRO_VIDEO} type="video/mp4" />
        </video>

        {/* Video 2: Experience (scrubbed) */}
        <video ref={expVidRef} muted playsInline preload="auto" crossOrigin="anonymous"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 2,
                   willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden",
                   WebkitBackfaceVisibility: "hidden", opacity: isIdle ? 0 : 1, transition: "opacity 0.9s ease" }}>
          <source src={EXPERIENCE_VIDEO} type="video/mp4" />
        </video>

        {/* Vignette (only centered radial — NO side gradients) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                      background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,9,0.55) 100%)" }} />

        {/* Scroll hint (IDLE only — NO text, NO headline, just line + "SCROLL") */}
        <AnimatePresence>
          {isIdle && (
            <motion.div key="scroll-hint"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
                       zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, pointerEvents: "none" }}>
              <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, transparent, #F2D28B)",
                             animation: "scrollLine 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: 9, letterSpacing: "0.32em",
                              color: "rgba(242,210,139,0.65)", textTransform: "uppercase" }}>Scroll</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product panels (SCRUB/LOOP + non-entry/outro frames only) */}
        {showPanels && (
          <div className="absolute inset-0 z-[4] pointer-events-none flex flex-col justify-end pb-24 md:justify-center md:pb-0 px-4 md:px-0 md:grid md:grid-cols-[minmax(280px,1fr)_2.4fr_minmax(280px,1fr)] gap-4 md:gap-0">
            <div className="flex items-center justify-center md:justify-end md:py-[80px] md:pl-[20px] md:pr-[44px] pointer-events-auto">
              <FrameText frame={currentFrame} visible={true} />
            </div>
            <div className="hidden md:block" />
            <div className="flex items-center justify-center md:justify-start md:py-[80px] md:pr-[20px] md:pl-[44px] pointer-events-auto">
              <BuyCard frame={currentFrame} visible={true} />
            </div>
          </div>
        )}

        {/* Chapter dots (SCRUB/LOOP only, exclude entry+outro) */}
        {!isIdle && (
          <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
                         zIndex: 6, display: "flex", gap: 8 }}>
            {SEGMENTS.filter(s => s.id !== "entry" && s.id !== "outro").map(seg => (
              <div key={seg.id} title={seg.id}
                style={{ width: currentFrame.id === seg.frameId ? 24 : 6, height: 6, borderRadius: 3,
                          background: currentFrame.id === seg.frameId ? "#F2D28B" : "rgba(246,243,240,0.22)",
                          transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
