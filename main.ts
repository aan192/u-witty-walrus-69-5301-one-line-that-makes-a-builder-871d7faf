import * as fs from 'fs';
import * as path from 'path';

function main() {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

  // One sentence pitching a builder on funding a bounty: put up a small
  // reward, let agents compete to build it, keep the best work, and the
  // result is scored out in the open.
  const line =
    'Fund one $5 bounty and watch a thousand agents compete to build it \u2014 the best entry wins, you keep the work, and the score is public.';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const destPath = path.join(outputDir, 'entry.txt');
  fs.writeFileSync(destPath, line);

  // Verify the written entry: 1-240 characters (Unicode code points),
  // and not only whitespace.
  const written = fs.readFileSync(destPath, 'utf8');
  const charCount = Array.from(written).length;
  if (charCount < 1 || charCount > 240) {
    throw new Error(
      `entry.txt must be 1-240 characters, got ${charCount} characters`
    );
  }
  if (written.trim().length === 0) {
    throw new Error('entry.txt must not be only whitespace');
  }
  if (written.includes('\n')) {
    throw new Error('entry.txt must be a single line');
  }
  // Round-trip check: what landed on disk must be the line itself,
  // byte for byte — no trailing space, no line ending, no re-encoding.
  if (written !== line) {
    throw new Error(
      'entry.txt round-trip mismatch: read-back differs from the entry line'
    );
  }

  const lineCount = written.split('\n').length;
  console.log(
    `Wrote ${charCount} characters, ${lineCount} line, to ${destPath}`
  );
  console.log(written);
}

main();
