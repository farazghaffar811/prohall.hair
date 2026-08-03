const selectOneSteps = [
  ["Shampoo your hair", "Wash thoroughly with your regular shampoo 2–3 times to remove residue and impurities. Rinse completely so the hair is clean and ready for treatment."],
  ["Blow-dry to 80%", "Blow-dry until the hair is about 80% dry. Leave a little moisture so the Select One cream can penetrate and coat the strands effectively."],
  ["Section and apply Select One", "Use clips to divide the hair into 4–6 sections. Apply Select One evenly from root to tip, then use a fine-tooth comb to distribute it through every strand. Keep the product about 1 cm away from the scalp and never apply it directly to the scalp."],
  ["Let it process", "Allow the treatment to process for 60–90 minutes. Curly hair may need 90 minutes for deeper penetration; thinner hair may need only 45–60 minutes. Processing time can influence how straight the finished hair becomes."],
  ["Rinse thoroughly", "Rinse thoroughly with water until every trace of the product has been removed. No residue should remain before the finishing steps."],
  ["Blow-dry again", "Blow-dry the hair completely. Use a downward stretching technique to help create a sleek, smooth finish."],
  ["Seal with the flat iron", "Work in very thin sections. For normal hair, pass the flat iron over each strand 15–20 times at 450°F. For bleached, blonde, very fragile or heat-sensitive hair, reduce the temperature to 375°F and use 10–15 passes. Always make sure the hair can tolerate the heat before continuing."],
  ["Finish with Equalize Mask", "After ironing, you may apply Prohall Equalize Mask to enhance softness, texture and shine. This step is optional but recommended. The treatment may shift hair color by one or two levels; hair may be colored on the same day if desired."]
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
    youtubeId: "QeH0BC5M26w",
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
    youtubeId: "QeH0BC5M26w",
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
    image: "/images/force-hair-premium.png",
    tone: "sky",
    category: "Repair",
    youtubeId: "zaSED158udE",
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
    youtubeId: "zaSED158udE",
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
    image: "/images/hair-ampoules-kit.png",
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
    image: "/images/absolut-one-spray-v2.png",
    tone: "mist",
    category: "Finishing",
    youtubeId: "zaSED158udE",
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
    youtubeId: "zaSED158udE",
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
    image: "/images/toning-masks-clean-v3.png",
    tone: "lilac",
    category: "Masks",
    youtubeId: "zaSED158udE",
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
