export interface Frame {
  id: string;
  title: string;
  subtitle: string;
  chapter?: string;
  notes?: string[];
  price?: string | null;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

export const frames: Frame[] = [
  { id: "entry", chapter: "The Gateway", title: "Enter the Interface", subtitle: "A digital plain under a matrix of light. Scroll to awaken the machine.", price: null },
  { id: "chassis", chapter: "Chapter I", title: "The Chassis", subtitle: "Machined from a single block of aerospace-grade aluminum. Flawless symmetry.", price: "$1,800", notes: ["Unibody Aluminum", "Anodized Finish", "Thermal Efficiency"], ctaPrimary: "Configure Chassis — $1,800", ctaSecondary: "Explore Design" },
  { id: "display", chapter: "Chapter II", title: "The Display", subtitle: "Bezel-less glass, infinite contrast, bringing every pixel to life.", price: "$2,200", notes: ["OLED Matrix", "120Hz Refresh", "True Tone Array"], ctaPrimary: "Configure Display — $2,200", ctaSecondary: "Explore Vision" },
  { id: "core", chapter: "Chapter III", title: "The Core", subtitle: "Silicon architecture pushing the boundaries of raw computational performance.", price: "$2,800", notes: ["Neural Engine", "Quantum Cache", "3nm Process"], ctaPrimary: "Configure Core — $2,800", ctaSecondary: "Explore Silicon" },
  { id: "keyboard", chapter: "Chapter IV", title: "The Keyboard", subtitle: "Tactile precision. Every keystroke engineered for silent, responsive feedback.", price: "$1,400", notes: ["Scissor Mechanism", "Adaptive Backlight", "Glass Trackpad"], ctaPrimary: "Configure Keyboard — $1,400", ctaSecondary: "Explore Input" },
  { id: "connectivity", chapter: "Chapter V", title: "Connectivity", subtitle: "Seamless integration. Power and data flowing at the speed of light.", price: "$1,200", notes: ["Thunderbolt 5", "Magnetic Charge", "Ultra-fast Transfer"], ctaPrimary: "Configure I/O — $1,200", ctaSecondary: "Explore Ports" },
  { id: "battery", chapter: "Chapter VI", title: "The Battery", subtitle: "Endless power. Architecture designed for absolute all-day endurance.", price: "$1,600", notes: ["High-density Cells", "Smart Charging", "Thermal Management"], ctaPrimary: "Configure Battery — $1,600", ctaSecondary: "Explore Power" },
  { id: "loop-complete", chapter: "System Ready", title: "The Machine Awaits.", subtitle: "The boot sequence is complete. Scroll again to re-enter.", price: null, ctaPrimary: "Reboot System" },
];
