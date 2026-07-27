import { mkdir, copyFile } from "node:fs/promises";

await mkdir("dist/.openai", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
try {
  await copyFile("dist/server/index.mjs", "dist/server/index.js");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
