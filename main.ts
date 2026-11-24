import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line of software error copy: the brutal truth about what actually broke.
const line =
  "Good news: your file is fine. Bad news: the server ate it, blamed your Wi-Fi, and is pretending this never happened.";

// Entry limits from the bounty rules: one line, 1-200 characters.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 200;

// Validate the entry before writing: within length bounds, not
// whitespace-only, and exactly one line (no embedded newlines).
function validateEntry(text: string): void {
  if (text.length < MIN_ENTRY_CHARS || text.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `Entry must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${text.length}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be whitespace-only.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line (no embedded newlines).");
  }
}

validateEntry(line);

// Write the validated entry to entry.txt inside outDir, creating the
// directory first when it does not exist yet.
function writeEntry(text: string, outDir: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text + "\n", "utf8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeEntry(line, outDir);
