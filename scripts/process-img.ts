import fs from "node:fs";
import sharp from "sharp";
import * as blurhash from "blurhash";

const argv = process.argv;
if (argv.length < 3) {
  console.error("Usage: pnpm process-img <input> [<title>]");
  process.exit(1);
}

const input = argv[2];
const title = argv[3];
const inputBuffer = fs.readFileSync(input);

const image = sharp(inputBuffer);

const { width, height } = await image.metadata();

const pixelBuffer = await image.resize(40, 30).ensureAlpha().raw().toBuffer();
const pixels = new Uint8ClampedArray(pixelBuffer);
const blurhashString = blurhash.encode(pixels, 40, 30, 4, 3);
process.stdout.write(`${title || ""};${width}x${height};${blurhashString}\n`);
