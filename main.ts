import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of software error copy: the brutal truth about what actually broke.
const line =
  "Good news: your file is fine. Bad news: the server ate it, blamed your Wi-Fi, and is pretending this never happened.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
