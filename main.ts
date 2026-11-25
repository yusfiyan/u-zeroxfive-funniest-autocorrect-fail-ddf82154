import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Funniest Autocorrect Fail: one line, under 200 characters.
// The slip is clear and surprising (salad -> Satan), it reads as a real
// message sent to a group chat, and the joke lands on first read.
const ENTRY =
  "I texted the potluck group chat 'I'll bring the salad' — autocorrect sent 'I'll bring the Satan.'";

// The gate requires 1 to 199 characters of UTF-8 text, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 199 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-199 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// The grader runs the repo read-only: write only to MAKEFUN_OUTPUT_DIR.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
