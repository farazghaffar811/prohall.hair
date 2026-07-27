const selectOneSteps = [
  ["Wash thoroughly", "Shampoo 2–3 times to remove residue and buildup. Do not apply conditioner."],
  ["Dry to 60%", "Blow-dry until the hair is mostly dry but still holds a little moisture."],
  ["Section the hair", "Divide the hair into 4–6 manageable sections using sectioning clips."],
  ["Apply Select One", "Wearing gloves, apply the cream section by section, staying 1 cm away from the scalp. Comb through for even coverage."],
  ["Allow it to process", "Leave on for 60–90 minutes. Fine or fragile hair may need less processing time."],
  ["Rinse completely", "Rinse with room-temperature water until every trace of product has been removed."],
  ["Dry and seal", "Blow-dry completely. Working in very thin sections, seal with an adjustable flat iron suited to the condition of your hair."],
  ["Finish the service", "Let hair cool. An Equalize pH-balancing mask may be applied afterward, then rinsed and dried."]
];

export const products = [
  {
    slug: "select-one",
    name: "Select One",
    type: "Brazilian keratin treatment",
    note: "Up to 6 months",
    size: "10.1 fl oz / 300 ml",
    image: "/images/select-one-products.jpg",
    tone: "mint",
    category: "Smoothing",
    amazonUrl: "https://www.amazon.com/dp/B0FMT1XNYT",
    asin: "B0FMT1XNYT",
    description: "A professional smoothing cream powered by nanoplastia technology to help reduce frizz, smooth the hair fiber and restore brilliant shine.",
    benefits: ["Smoother, more manageable hair", "Helps reduce frizz and split ends", "Adds softness and luminous shine", "Suitable for all hair types"],
    ingredients: "Collagen, coconut oil, Lumini System and lactic acid",
    features: ["Formaldehyde-free", "Cruelty-free", "Coconut scent"],
    duration: "Approximately 2–3 hours",
    tools: ["Shampoo", "Gloves", "Fine-tooth comb", "Sectioning clips", "Blow dryer", "Adjustable flat iron"],
    steps: selectOneSteps,
    caution: "Perform a patch and strand test first. Never apply directly to the scalp. Reduce heat for bleached, fine or fragile hair; professional assistance is recommended."
  },
  {
    slug: "select-one-travel",
    name: "Select One 3.4 oz",
    type: "Travel-size smoothing",
    note: "Formaldehyde-free",
    image: "/images/select-one-products.jpg",
    tone: "blue",
    category: "Smoothing",
    description: "The travel-size format of the Select One professional smoothing treatment.",
    duration: "Approximately 2–3 hours",
    tools: ["Shampoo", "Gloves", "Fine-tooth comb", "Sectioning clips", "Blow dryer", "Adjustable flat iron"],
    steps: selectOneSteps,
    caution: "Perform a patch and strand test first. Never apply directly to the scalp. Use lower heat on blonde, fine or fragile hair."
  },
  {
    slug: "force-hair",
    name: "Force Hair",
    type: "Strengthening system",
    note: "3-step ritual",
    image: "/images/force-hair-pack.webp",
    tone: "sky",
    category: "Repair",
    description: "A coordinated cleansing, treatment and conditioning ritual for weak, dry or damaged hair.",
    duration: "Add 10–15 minutes to wash day",
    tools: ["Towel", "Wide-tooth comb"],
    steps: [
      ["Cleanse", "Wet hair thoroughly, apply the Force Hair shampoo and massage gently through the scalp and lengths. Rinse."],
      ["Treat", "Remove excess water and distribute the treatment mask through the mid-lengths and ends."],
      ["Process", "Allow the mask to work for the time printed on the product label, then rinse thoroughly."],
      ["Condition and finish", "Apply the conditioner through the lengths, rinse, then style as desired."]
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
    image: "/images/pro-r.webp",
    tone: "blue",
    category: "Repair",
    description: "A concentrated reconstruction ampoule for a fast, targeted boost during a repair routine.",
    duration: "About 5 minutes",
    tools: ["Small non-metal bowl", "Water", "Application brush"],
    steps: [
      ["Prepare the hair", "Shampoo, rinse and remove excess water with a towel."],
      ["Activate the ampoule", "Pour the ampoule into a non-metal bowl, add an equal amount of water and mix until creamy."],
      ["Apply evenly", "Work the mixture through the mid-lengths and ends, concentrating on damaged areas."],
      ["Process and rinse", "Leave for 5 minutes, rinse thoroughly and finish as desired."]
    ],
    caution: "For external use only. Avoid the scalp and eyes, and follow the ampoule packaging."
  },
  {
    slug: "hair-ampoules-kit",
    name: "Hair Ampoules Kit",
    type: "Hair schedule system",
    note: "Weekly ritual",
    image: "/images/ampoules.webp",
    tone: "mint",
    category: "Repair",
    description: "A weekly ampoule system designed to rotate targeted hydration, nutrition and reconstruction care.",
    duration: "One treatment per wash day",
    tools: ["Small non-metal bowl", "Water", "Application brush"],
    steps: [
      ["Choose your ampoule", "Select the treatment that matches the current step in your hair-care schedule."],
      ["Cleanse", "Shampoo the hair, rinse thoroughly and towel-dry to remove excess water."],
      ["Mix and apply", "Prepare the selected ampoule according to its label, then distribute through the lengths and ends."],
      ["Process and rinse", "Leave on for the stated time, rinse completely and continue with your normal finishing routine."]
    ],
    caution: "Use only one scheduled ampoule at a time unless the packaging specifically directs otherwise."
  },
  {
    slug: "absolut-one",
    name: "Absolut One",
    type: "Heat protectant spray",
    note: "Daily protection",
    image: "/images/absolute-one.webp",
    tone: "mist",
    category: "Finishing",
    description: "A lightweight finishing spray that helps prepare and protect hair before blow-drying or heat styling.",
    duration: "Leave-in",
    tools: ["Wide-tooth comb", "Blow dryer or styling tool"],
    steps: [
      ["Start with damp hair", "Towel-dry freshly washed hair so it is damp rather than dripping wet."],
      ["Spray evenly", "Mist through the mid-lengths and ends, keeping the bottle a short distance from the hair."],
      ["Distribute", "Comb through gently to spread the product evenly."],
      ["Style", "Do not rinse. Blow-dry and style as desired."]
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
    description: "A finishing oil for softer-feeling lengths, polished ends and luminous shine.",
    duration: "Leave-in",
    tools: ["Clean hands"],
    steps: [
      ["Start small", "Dispense a small amount into the palm of your hand."],
      ["Warm the oil", "Rub palms together to spread the product into a thin, even layer."],
      ["Apply to lengths", "Smooth through the mid-lengths and ends, avoiding the scalp."],
      ["Adjust and finish", "Add only a little more if needed. Use on damp hair before styling or on dry hair for final shine."]
    ],
    caution: "Begin with a minimal amount, especially on fine hair, to avoid weighing it down."
  },
  {
    slug: "toning-masks",
    name: "Toning Masks",
    type: "Color-correcting masks",
    note: "4 custom tones",
    image: "/images/toning-mask.webp",
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
  "select-one": ["jpeg", "jpeg", "png", "png", "png", "png", "png", "png"],
  "select-one-travel": ["png", "png", "png", "png", "png", "png", "png", "png"],
  "force-hair": ["png", "png", "png", "webp"],
  "equalize": ["png", "png", "png", "png"],
  "pro-r-shot": ["png", "png", "png", "png"],
  "hair-ampoules-kit": ["png", "png", "png", "png"],
  "absolut-one": ["jpg", "png", "png", "jpg"],
  "absolut-oil": ["png", "png", "png", "png"],
  "toning-masks": ["png", "png", "png", "png"]
};

export function getStepImage(product, index) {
  const extension = stepImageExtensions[product.slug]?.[index];
  return extension ? `/media/${product.slug}/step-${index + 1}.${extension}` : product.image;
}

export function getTutorialVideo(product) {
  return `/media/${product.slug}/tutorial.mp4`;
}
