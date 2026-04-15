import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { getProjectRoot } from "./setup-shared.mjs";

const rootDir = getProjectRoot(import.meta.url);
const outDir = path.join(rootDir, ".demo");
const outFile = path.join(outDir, "seed.json");

await mkdir(outDir, { recursive: true });
await writeFile(
  outFile,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      users: ["admin@example.com", "pm@example.com", "eng@example.com"],
      password: "secret123",
      notes: "Demo auth works only when ALLOW_DEMO_AUTH=true."
    },
    null,
    2
  )
);

console.log("Demo seed generated.");
console.log(`- File: ${outFile}`);
console.log("- Login: admin@example.com / secret123");
