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
  { id: "entry", chapter: "The Portal", title: "Enter the Garden", subtitle: "A fairy plain under purple-blue clouds. Follow the portal. Scroll to awaken each essence.", price: null },
  { id: "maheshwari", chapter: "Chapter I", title: "Maheshwari", subtitle: "Stillness before dawn. White sand, mirrored waters, and white lotus in first light.", price: "₹18,000", notes: ["White lotus", "Soft musk", "White sand accord"], ctaPrimary: "Buy Maheshwari — ₹18,000", ctaSecondary: "Discover Maheshwari" },
  { id: "mahalakshmi", chapter: "Chapter II", title: "Mahalakshmi", subtitle: "Abundance in bloom. Velvet rose petals and champagne gold light.", price: "₹18,000", notes: ["Damask rose", "Champagne pear", "Cashmere amber"], ctaPrimary: "Buy Mahalakshmi — ₹18,000", ctaSecondary: "Discover Mahalakshmi" },
  { id: "mahakali", chapter: "Chapter III", title: "Mahakali", subtitle: "Desert sun, black stone, deep red fire held in glass.", price: "₹20,000", notes: ["Smoked oud", "Black pepper", "Dark amber"], ctaPrimary: "Buy Mahakali — ₹20,000", ctaSecondary: "Discover Mahakali" },
  { id: "mahashakti", chapter: "Chapter IV", title: "Mahashakti", subtitle: "A column of molten gold; divine feminine energy made liquid.", price: "₹22,000", notes: ["Saffron", "Golden vanilla", "White woods"], ctaPrimary: "Buy Mahashakti — ₹22,000", ctaSecondary: "Discover Mahashakti" },
  { id: "jungle-essence", chapter: "Chapter V", title: "Jungle Essence", subtitle: "Wet earth, green thunder, a jungle breathing in slow motion.", price: "₹18,000", notes: ["Green leaves", "Vetiver", "Rain accord"], ctaPrimary: "Buy Jungle Essence — ₹18,000", ctaSecondary: "Discover Jungle Essence" },
  { id: "himalaya-essence", chapter: "Chapter VI", title: "Himalaya Essence", subtitle: "Alpine air, crystal snow, the silence above the clouds.", price: "₹20,000", notes: ["Icy citrus", "Juniper", "White musk"], ctaPrimary: "Buy Himalaya Essence — ₹20,000", ctaSecondary: "Discover Himalaya Essence" },
  { id: "loop-complete", chapter: "The Return", title: "The Garden Awaits.", subtitle: "The circle is complete. Scroll again to walk the path once more.", price: null, ctaPrimary: "Return to the Beginning" },
];
