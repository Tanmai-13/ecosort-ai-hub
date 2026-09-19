import {
  Apple,
  Battery,
  CupSoda,
  Milk,
  Newspaper,
  Package,
  Recycle,
  Trash2,
  Wine,
  type LucideIcon,
} from "lucide-react";

export type CategoryId =
  | "Plastic"
  | "Paper"
  | "Glass"
  | "Metal"
  | "Organic"
  | "E-waste"
  | "Other";

export const CATEGORY_IDS: CategoryId[] = [
  "Plastic",
  "Paper",
  "Glass",
  "Metal",
  "Organic",
  "E-waste",
  "Other",
];

export type CategoryInfo = {
  id: CategoryId;
  icon: LucideIcon;
  binColor: string;
  binSwatch: string;
  recyclable: "Recyclable" | "Compostable" | "Special Handling" | "Usually Not Recyclable";
  blurb: string;
  accepted: string[];
  dos: string[];
  donts: string[];
  tips: string[];
  note?: string;
};

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  Plastic: {
    id: "Plastic",
    icon: Milk,
    binColor: "Blue / Dry recyclables bin",
    binSwatch: "#3b82f6",
    recyclable: "Recyclable",
    blurb:
      "Bottles, containers and packaging films. Recyclability depends on the resin code printed on the item.",
    accepted: [
      "PET drink bottles (♳)",
      "HDPE milk jugs & shampoo bottles (♴)",
      "Rigid food containers (♵ / ♺)",
      "Clean plastic jars and lids",
    ],
    dos: [
      "Empty and rinse before binning",
      "Squash bottles to save space",
      "Keep caps on only if your facility asks for it",
    ],
    donts: [
      "Don't bin oily or food-soaked plastics",
      "Don't mix soft films with rigid plastics",
      "Never burn plastic waste",
    ],
    tips: [
      "Carry a refillable bottle — one bottle replaces ~150 single-use ones a year",
      "Reuse sturdy containers for storage before recycling",
    ],
  },
  Paper: {
    id: "Paper",
    icon: Newspaper,
    binColor: "Blue / Dry recyclables bin",
    binSwatch: "#60a5fa",
    recyclable: "Recyclable",
    blurb: "Newspaper, cardboard, notebooks and packaging board — recyclable when clean and dry.",
    accepted: ["Newspaper & magazines", "Cardboard cartons", "Notebooks & printer paper", "Paper bags"],
    dos: ["Flatten cardboard boxes", "Remove tape and plastic windows", "Keep paper dry"],
    donts: [
      "Don't recycle greasy pizza boxes — compost them instead",
      "Don't include thermal receipts or waxed paper",
      "Don't shred unnecessarily (short fibres are harder to recycle)",
    ],
    tips: ["Print double-sided", "Reuse one-side-blank sheets as rough notes"],
  },
  Glass: {
    id: "Glass",
    icon: Wine,
    binColor: "Green / Glass-only bin",
    binSwatch: "#22c55e",
    recyclable: "Recyclable",
    blurb: "Glass is infinitely recyclable, but broken glass and non-container glass need care.",
    accepted: ["Bottles", "Jars", "Sauce and jam containers"],
    dos: ["Rinse out residue", "Separate metal lids", "Wrap broken glass and label it clearly"],
    donts: [
      "Don't mix ceramics, mirrors or window panes",
      "Don't bin light bulbs here",
      "Don't leave shards loose in a bag",
    ],
    tips: ["Reuse jars for storage or plant propagation", "Return deposit bottles where schemes exist"],
  },
  Metal: {
    id: "Metal",
    icon: CupSoda,
    binColor: "Blue / Dry recyclables bin",
    binSwatch: "#94a3b8",
    recyclable: "Recyclable",
    blurb: "Aluminium and steel have very high recycling value and save huge amounts of energy.",
    accepted: ["Beverage cans", "Food tins", "Clean aluminium foil", "Metal bottle caps"],
    dos: ["Rinse cans", "Ball up foil into a fist-sized lump", "Keep sharp lids inside the tin"],
    donts: ["Don't bin aerosol cans that aren't empty", "Don't mix with e-waste", "Don't crush if your facility scans by shape"],
    tips: ["Recycling one aluminium can saves enough energy to run a laptop for hours", "Sell scrap metal to local kabadiwala / scrap dealers"],
  },
  Organic: {
    id: "Organic",
    icon: Apple,
    binColor: "Green / Wet waste bin",
    binSwatch: "#84cc16",
    recyclable: "Compostable",
    blurb: "Food scraps and garden waste belong in compost, not landfill where they emit methane.",
    accepted: ["Fruit & vegetable peels", "Leftover food", "Tea leaves & coffee grounds", "Garden clippings"],
    dos: ["Drain excess liquid", "Chop large scraps for faster composting", "Layer greens with dry browns"],
    donts: ["Don't add plastic-lined bags", "Avoid large amounts of dairy/meat in open compost", "Don't let the bin go anaerobic — turn it"],
    tips: ["Start a small campus compost bin", "Use finished compost for hostel or balcony plants"],
  },
  "E-waste": {
    id: "E-waste",
    icon: Battery,
    binColor: "Red / Hazardous — authorised collection point",
    binSwatch: "#ef4444",
    recyclable: "Special Handling",
    blurb:
      "Electronics and batteries contain heavy metals. They must go to authorised e-waste handlers only.",
    accepted: ["Batteries", "Chargers & cables", "Phones, laptops, earphones", "Bulbs, tube lights, circuit boards"],
    dos: [
      "Drop off at a certified e-waste collection centre",
      "Wipe personal data before handing over devices",
      "Tape terminals of lithium batteries before transport",
      "Store dry and away from heat until drop-off",
    ],
    donts: [
      "NEVER burn e-waste or batteries",
      "Never mix e-waste with domestic or wet trash",
      "Don't dismantle devices yourself",
      "Don't dump near water bodies",
    ],
    tips: ["Repair before replacing", "Donate working electronics to campus reuse drives"],
    note: "Safe handling: e-waste is hazardous. Use certified drop-off centres or brand take-back programmes. Burning releases dioxins and heavy metals.",
  },
  Other: {
    id: "Other",
    icon: Trash2,
    binColor: "Black / General waste bin",
    binSwatch: "#64748b",
    recyclable: "Usually Not Recyclable",
    blurb: "Mixed-material or contaminated items that current facilities usually cannot recover.",
    accepted: ["Multi-layer snack wrappers", "Used tissues", "Thermocol / styrofoam", "Sanitary waste (wrapped separately)"],
    dos: ["Wrap sharp or soiled items", "Keep this stream as small as possible", "Separate sanitary waste in marked bags"],
    donts: ["Don't hide recyclables here", "Don't burn", "Don't overfill bins"],
    tips: ["Choose products with single-material packaging", "Refuse freebies you won't use"],
  },
};

export type SamplePreset = {
  id: string;
  label: string;
  emoji: string;
  category: CategoryId;
  description: string;
  breakdown: { category: CategoryId; score: number }[];
  steps: string[];
};

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: "bottle",
    label: "Plastic bottle",
    emoji: "🧴",
    category: "Plastic",
    description:
      "A transparent PET (♳) beverage bottle with a separate polypropylene cap and a paper/plastic label.",
    breakdown: [
      { category: "Plastic", score: 0.82 },
      { category: "Glass", score: 0.09 },
      { category: "Other", score: 0.09 },
    ],
    steps: [
      "Empty any remaining liquid into a sink, not the bin.",
      "Rinse the bottle once with water to remove sugar residue.",
      "Unscrew the cap and separate it — cap and bottle are different plastics.",
      "Squash the bottle flat to reduce volume.",
      "Place in the BLUE dry recyclables bin.",
    ],
  },
  {
    id: "apple",
    label: "Apple core",
    emoji: "🍎",
    category: "Organic",
    description: "Food waste — a fruit core that composts within a few weeks in a healthy compost bin.",
    breakdown: [
      { category: "Organic", score: 0.91 },
      { category: "Other", score: 0.06 },
      { category: "Paper", score: 0.03 },
    ],
    steps: [
      "Remove any sticker or plastic wrap from the fruit.",
      "Drop the core into the wet waste / compost bin.",
      "Cover with dry leaves or shredded paper if using an open composter.",
      "Keep the wet bin lined with newspaper, not plastic.",
      "Place in the GREEN wet waste bin.",
    ],
  },
  {
    id: "can",
    label: "Soda can",
    emoji: "🥤",
    category: "Metal",
    description: "An aluminium beverage can — one of the most valuable and easily recycled materials.",
    breakdown: [
      { category: "Metal", score: 0.88 },
      { category: "Plastic", score: 0.07 },
      { category: "Other", score: 0.05 },
    ],
    steps: [
      "Pour out leftover liquid and rinse the can.",
      "Leave the pull-tab attached to the can.",
      "Do not crush if your local facility sorts by shape.",
      "Keep it dry and free of food waste.",
      "Place in the BLUE dry recyclables bin.",
    ],
  },
  {
    id: "cardboard",
    label: "Cardboard box",
    emoji: "📦",
    category: "Paper",
    description: "Corrugated cardboard packaging — highly recyclable when clean, dry and flattened.",
    breakdown: [
      { category: "Paper", score: 0.86 },
      { category: "Other", score: 0.09 },
      { category: "Plastic", score: 0.05 },
    ],
    steps: [
      "Remove packing tape, staples and plastic labels.",
      "Take out any bubble wrap or foam inserts.",
      "Flatten the box completely.",
      "Keep it dry — wet cardboard loses recycling value.",
      "Place in the BLUE dry recyclables / paper bin.",
    ],
  },
  {
    id: "battery",
    label: "Battery / e-waste",
    emoji: "🔋",
    category: "E-waste",
    description:
      "A used battery — hazardous waste containing heavy metals that must never enter the regular bin.",
    breakdown: [
      { category: "E-waste", score: 0.94 },
      { category: "Metal", score: 0.04 },
      { category: "Other", score: 0.02 },
    ],
    steps: [
      "Do NOT put the battery in any household bin.",
      "Tape over the terminals with insulating tape.",
      "Store in a dry container away from heat and sunlight.",
      "Drop off at a certified e-waste collection centre or brand take-back point.",
      "Never burn, puncture or dismantle the battery.",
    ],
  },
];

export const ECO_TIPS: string[] = [
  "Rinsing containers takes five seconds and keeps an entire recycling batch from being rejected.",
  "Wet waste in a dry bin contaminates paper and cardboard — always keep the two streams apart.",
  "A refused item beats a recycled one: skip the freebie you'll never use.",
  "Compost at source. Food waste is 50%+ of household waste in most Indian cities.",
  "Tape battery terminals before storing them for e-waste drop-off.",
  "Flatten cardboard — collection trucks fill up on air, not material.",
  "Check the resin code (♳–♹) before assuming a plastic is recyclable.",
];

export function tipOfTheDay(date = new Date()): string {
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  return ECO_TIPS[dayIndex % ECO_TIPS.length]!;
}

export const RECOMMENDATIONS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Cut single-use plastic",
    body: "Keep a steel bottle and a cloth bag in your backpack. It removes most of your daily plastic stream.",
    icon: Milk,
  },
  {
    title: "Two-bin minimum at home",
    body: "One wet, one dry. This single change makes over 80% of your waste recoverable.",
    icon: Recycle,
  },
  {
    title: "Batch your e-waste",
    body: "Collect cables, batteries and chargers in one box and do a quarterly certified drop-off.",
    icon: Battery,
  },
  {
    title: "Buy less packaging",
    body: "Prefer refills and bulk buys — packaging is the fastest-growing part of campus waste.",
    icon: Package,
  },
];
