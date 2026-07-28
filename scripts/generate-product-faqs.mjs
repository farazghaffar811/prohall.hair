import { readFile, writeFile } from "node:fs/promises";

const inputPath = process.argv[2];

if (!inputPath) {
  throw new Error("Pass the extracted FAQ JSON path as the first argument.");
}

const source = JSON.parse(await readFile(inputPath, "utf8").then((text) => text.replace(/^\uFEFF/, "")));
const definitions = [
  ["selectOneFaqs", "select-one-10"],
  ["forceHairFaqs", "force-hair"],
  ["equalizeFaqs", "equalize"],
  ["proRShotFaqs", "pro-r-shot"],
  ["hairAmpoulesFaqs", "hair-ampoules"],
  ["absolutOneFaqs", "absolute-one"],
  ["absolutOilFaqs", "absolute-oil"],
  ["toningMasksFaqs", "toning-mask"]
];

const output = [
  "// Generated from the FAQ accordions on the original prohall.hair product pages.",
  ...definitions.map(([variable, key]) => `const ${variable} = ${JSON.stringify(source[key], null, 2)};`),
  "",
  "export const productFaqs = {",
  '  "select-one": selectOneFaqs,',
  '  "select-one-travel": selectOneFaqs,',
  '  "force-hair": forceHairFaqs,',
  '  "equalize": equalizeFaqs,',
  '  "pro-r-shot": proRShotFaqs,',
  '  "hair-ampoules-kit": hairAmpoulesFaqs,',
  '  "absolut-one": absolutOneFaqs,',
  '  "absolut-oil": absolutOilFaqs,',
  '  "toning-masks": toningMasksFaqs',
  "};",
  ""
].join("\n");

await writeFile(new URL("../app/productFaqs.js", import.meta.url), output, "utf8");
