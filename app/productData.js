const selectOneSteps = [
  ["Get your hair ready", "Wash your hair 2 or 3 times with shampoo only—no conditioner. This removes residue and opens the hair so the treatment can work. Pro tip: finish with filtered water, because minerals in tap water can interfere with treatment bonding."],
  ["Partial dry—50%", "Section the hair and blow-dry until it is approximately 50% dry. It should remain slightly damp."],
  ["Apply the treatment", "Pour a small amount into a plastic bowl—never use metal. Divide the hair into four equal sections and clip three of them up. Using a tinting brush, work through one section at a time, starting 1 cm away from the scalp and roots. Comb through to distribute evenly, coating every strand from mid-length to ends."],
  ["Let the magic happen", "Cover the hair with a shower cap and leave the treatment on for 60–90 minutes. Thicker or curlier hair needs the full 90 minutes for the best results."],
  ["Rinse thoroughly and completely", "Rinse very well with cool water and good pressure. Make sure all residue is removed and the hair is completely clean."],
  ["Dry everything completely", "Dry the hair completely—down to the last drop. For straight hair, stretch it with a brush while blow-drying. Damp areas can affect the final result. Golden tip: if you’re investing in tools, Taiff is the recommended brand."],
  ["The moment of truth—the sealing", "Work in thin sections and adjust to the desired result. Super-straight hair: fine hair 375–400°F with 10–12 gentle passes; normal hair 450°F with 15–20 passes; thick hair 450–460°F with 20–25 passes. Defined curls without frizz: only 1–2 light passes on medium heat. Natural texture without frizz: skip the flat iron and simply blow-dry."],
  ["pH balance and final conditioning", "Rinse thoroughly with cool water. Apply Prohall Equalizer Mask from mid-length to ends for pH balancing. Wait 10 minutes, rinse completely, and dry as desired."]
];

const selectOnePreparationNote =
  "Very thin, bleached, blonde or fragile hair requires extra care during the ironing process. Use reduced heat when needed, complete a strand test first and follow the instructions carefully. High temperatures can damage hair that cannot tolerate them.";

const selectOneCaution =
  "Attention blondes: because blonde or bleached hair is more porous and fragile, Select One may straighten it by up to approximately 70% and may not produce the same straightening level as on other hair types. Perform a patch and strand test first, never apply the product directly to the scalp, and reduce heat for fine, blonde, bleached or fragile hair. Professional assistance is recommended.";

export const products = [
  {
    slug: "select-one",
    name: "Select One",
    type: "Brazilian keratin treatment",
    note: "Formaldehyde-free",
    size: "10.1 fl oz / 300 ml",
    image: "/images/select-one-300ml-card.webp",
    cardImage: "/images/select-one-300ml-card.webp",
    tone: "mint",
    category: "Smoothing",
    amazonUrl: "https://www.amazon.com/dp/B0FMT1XNYT",
    videoUrl: "https://res.cloudinary.com/dwnt025iw/video/upload/v1785776496/select_one_tomdll.mp4",
    asin: "B0FMT1XNYT",
    description: "A professional smoothing cream powered by nanoplastia technology to help reduce frizz, smooth the hair fiber and restore brilliant shine.",
    benefits: ["Smoother, more manageable hair", "Helps reduce frizz and split ends", "Adds softness and luminous shine", "Suitable for all hair types"],
    ingredients: "Collagen, coconut oil, Lumini System and lactic acid",
    features: ["Formaldehyde-free", "Cruelty-free", "Coconut scent"],
    duration: "Approximately 2–3 hours",
    tools: ["Shampoo", "Gloves", "Fine-tooth comb", "Sectioning clips", "Blow dryer", "Adjustable flat iron", "Equalize Mask (optional)"],
    preparationNote: selectOnePreparationNote,
    steps: selectOneSteps,
    caution: selectOneCaution
  },
  {
    slug: "select-one-travel",
    name: "Select One",
    type: "Brazilian keratin treatment",
    note: "Formaldehyde-free",
    size: "4.05 fl oz / 120 ml",
    image: "/images/select-one-travel-v5.png",
    tone: "blue",
    category: "Smoothing",
    videoUrl: "https://res.cloudinary.com/dwnt025iw/video/upload/v1785776496/select_one_tomdll.mp4",
    description: "The travel-size format of the Select One professional smoothing treatment.",
    duration: "Approximately 2–3 hours",
    tools: ["Shampoo", "Gloves", "Fine-tooth comb", "Sectioning clips", "Blow dryer", "Adjustable flat iron", "Equalize Mask (optional)"],
    preparationNote: selectOnePreparationNote,
    steps: selectOneSteps,
    caution: selectOneCaution
  },
  {
    slug: "force-hair",
    name: "Force Hair",
    type: "Strengthening system",
    note: "3-step ritual",
    image: "/images/force-hair-v3.png",
    tone: "sky",
    category: "Repair",
    videoUrl: "/media/force-hair/tutorial.mp4",
    description: "A coordinated cleansing, treatment and conditioning ritual for weak, dry or damaged hair.",
    duration: "Add 10–15 minutes to wash day",
    tools: ["Towel", "Wide-tooth comb"],
    steps: [
      ["Wash with the Fortifying Shampoo", "Wash your hair with Force Hair Fortifying Shampoo, massaging your scalp until it lathers. Rinse thoroughly."],
      ["Apply the Fortifying Mask", "Apply the Force Hair Fortifying Mask to damp hair, distributing it well along the length. Leave it on for 5 to 10 minutes and rinse."],
      ["Finish with the Fortifying Tonic", "Apply Force Hair Fortifying Tonic directly to a clean, dry scalp. Gently massage in and do not rinse."]
    ],
    caution: "Avoid eye contact and discontinue use if irritation occurs. Follow the timing printed on your packaging."
  },
  {
    slug: "equalize",
    name: "Equalize",
    type: "pH balancing mask",
    note: "Repair + shine",
    image: "/images/equalize-pack.webp",
    tone: "mist",
    category: "Masks",
    videoUrl: "/media/equalize/tutorial.mp4",
    description: "A pH-balancing conditioning mask created for porous, processed and post-chemical-treatment hair.",
    duration: "5–10 minutes",
    tools: ["Shampoo", "Towel", "Wide-tooth comb"],
    steps: [
      ["Prepare", "Shampoo thoroughly, rinse, then towel-dry to remove excess water."],
      ["Apply", "Distribute a generous amount evenly through damp hair, focusing on damaged or processed areas."],
      ["Allow it to work", "Leave the mask on for 5–10 minutes so it can condition and help rebalance the hair."],
      ["Rinse and finish", "Rinse thoroughly with cool water, then dry and style as desired."]
    ],
    caution: "Avoid the root area if hair becomes oily easily. Follow the product label if its timing differs."
  },
  {
    slug: "pro-r-shot",
    name: "Pro R Shot",
    type: "Reconstruction ampoule",
    note: "5-minute repair",
    image: "/images/pro-r.png",
    tone: "blue",
    category: "Repair",
    description: "A concentrated reconstruction ampoule for a fast, targeted boost during a repair routine.",
    duration: "About 5 minutes",
    tools: ["Small non-metal bowl", "Water", "Application brush"],
    steps: [
      ["Mix the ampoule", "In a non-metallic container, mix the contents of the ampoule with water, forming a homogeneous emulsion."],
      ["Apply to damp hair", "Apply to clean, damp hair, distributing evenly and coating each strand."],
      ["Let it work", "Leave it on for 5 to 10 minutes."],
      ["Rinse and style", "Rinse thoroughly and style as desired."]
    ],
    caution: "For external use only. Avoid the scalp and eyes, and follow the ampoule packaging."
  },
  {
    slug: "hair-ampoules-kit",
    name: "Hair Ampoules Kit",
    type: "Hair schedule system",
    note: "Weekly ritual",
    image: "/images/hair-ampoules-kit-v2.png",
    tone: "mint",
    category: "Repair",
    videoUrl: "/media/hair-ampoules-kit/tutorial.mp4",
    description: "A weekly ampoule system designed to rotate targeted hydration, nutrition and reconstruction care.",
    duration: "One treatment per wash day",
    tools: ["Small non-metal bowl", "Water", "Application brush"],
    steps: [
      ["Prepare the mixture", "In a non-metallic container, mix equal parts water and the contents of the chosen ampoule until a homogeneous emulsion is formed."],
      ["Apply to hair", "With clean, damp hair, distribute the mixture strand by strand, coating each strand well."],
      ["Processing time", "Leave on for 5 minutes."],
      ["Rinse", "Remove the product completely with water and style as desired."]
    ],
    caution: "Use only one scheduled ampoule at a time unless the packaging specifically directs otherwise."
  },
  {
    slug: "absolut-one",
    name: "Absolut One",
    type: "Heat protectant spray",
    note: "Daily protection",
    image: "/images/absolut-one-spray-v2.png",
    tone: "mist",
    category: "Finishing",
    description: "A lightweight finishing spray that helps prepare and protect hair before blow-drying or heat styling.",
    duration: "Leave-in",
    tools: ["Wide-tooth comb", "Blow dryer or styling tool"],
    steps: [
      ["Wet hair — spray all over", "Spray the Absolut One Spray Mask all over your hair from a distance of 20 cm."],
      ["Wet hair — detangle", "Using a comb, detangle your hair and enhance the straightening effect."],
      ["Wet hair — style", "Style as desired!"],
      ["Dry hair — spray into your palms", "Spray the Absolut One Spray Mask into the palms of your hands."],
      ["Dry hair — spread through the hair", "Using gentle movements, spread the product throughout the hair, from the mid-lengths to the ends."],
      ["Dry hair — style", "Style as desired."]
    ],
    caution: "Avoid spraying toward the face, eyes or directly onto the scalp."
  },
  {
    slug: "absolut-oil",
    name: "Absolut Oil",
    type: "Nourishing hair oil",
    note: "Softness + shine",
    image: "/images/absolute-oil.png",
    tone: "sky",
    category: "Finishing",
    videoUrl: "/media/absolut-oil/tutorial.mp4",
    description: "A finishing oil for softer-feeling lengths, polished ends and luminous shine.",
    duration: "Leave-in",
    tools: ["Clean hands"],
    steps: [
      ["Cleanse and towel-dry", "Cleanse your hair and remove excess water with a towel."],
      ["Apply to your palm", "With slightly damp or dry hair, apply a small amount of Absolut Oil Serum to the palm of your hand."],
      ["Spread through the hair", "Gently spread through your hair, always avoiding the roots. Be careful not to apply too much in one spot—it's important that all areas receive the same amount."],
      ["Style", "Style as desired."]
    ],
    caution: "Begin with a minimal amount, especially on fine hair, to avoid weighing it down."
  },
  {
    slug: "toning-masks",
    name: "Toning Masks",
    type: "Color-correcting masks",
    note: "4 custom tones",
    image: "/images/toning-masks-v4.png",
    tone: "lilac",
    category: "Masks",
    description: "Color-depositing conditioning masks that help refresh tone while leaving hair soft and polished.",
    duration: "Follow the shade label",
    tools: ["Gloves", "Towel", "Wide-tooth comb"],
    steps: [
      ["Prepare", "Put on gloves. Shampoo the hair, rinse and towel-dry until evenly damp."],
      ["Strand test", "Test the mask on a discreet strand to check the tone and processing time."],
      ["Apply evenly", "Distribute the selected shade through the areas that need toning, combing carefully for even coverage."],
      ["Process and rinse", "Leave on for the time printed on the shade label, then rinse thoroughly until the water runs clear."]
    ],
    caution: "Color results vary with porosity and starting shade. Gloves and a strand test are strongly recommended."
  }
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

const stepImageExtensions = {
  "select-one": ["jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg"],
  "select-one-travel": ["jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg", "jpg"],
  "force-hair": ["jpg", "jpg", "jpg"],
  "equalize": ["jpg", "jpg", "jpg", "jpg"],
  "pro-r-shot": ["jpg", "jpg", "jpg", "jpg"],
  "hair-ampoules-kit": ["jpg", "jpg", "jpg", "jpg"],
  "absolut-one": ["jpg", "jpg", "jpg", "jpg", "jpg", "jpg"],
  "absolut-oil": ["jpg", "jpg", "jpg", "jpg"],
  "toning-masks": ["jpg", "jpg", "jpg", "jpg"]
};

export function getStepImage(product, index) {
  const extension = stepImageExtensions[product.slug]?.[index];
  return extension ? `/media/${product.slug}/step-${index + 1}.${extension}` : product.image;
}

export function getTutorialVideo(product) {
  return `/media/${product.slug}/tutorial.mp4`;
}
