// Draws the favicon (blue tile with three stepped bars, as in static/favicon.svg) into
// static/favicon.ico (16, 32, 48 px) and static/apple-touch-icon.png (180 px). Run: node scripts/make-favicon.mjs
import fs from 'node:fs';
import zlib from 'node:zlib';

// Shapes in the 32-unit SVG coordinate space: [x, y, width, height, radius, rgb]
const shapes = [
  [0, 0, 32, 32, 7, [0x24, 0x36, 0xff]],
  [6, 7, 13, 4.5, 1, [0xff, 0xff, 0xff]],
  [10, 13.75, 13, 4.5, 1, [0xff, 0xff, 0xff]],
  [14, 20.5, 12, 4.5, 1, [0xb8, 0xbf, 0xff]],
];
const inside = (px, py, [x, y, w, h, r]) => {
  if (px < x || py < y || px > x + w || py > y + h) return false;
  const cx = Math.min(Math.max(px, x + r), x + w - r), cy = Math.min(Math.max(py, y + r), y + h - r);
  return (px - cx) ** 2 + (py - cy) ** 2 <= r * r;
};

function render(size) {
  const px = Buffer.alloc(size * size * 4), ss = 8, unit = 32 / size;
  for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
    let r = 0, g = 0, b = 0, a = 0;
    for (let sj = 0; sj < ss; sj++) for (let si = 0; si < ss; si++) {
      const x = (i + (si + 0.5) / ss) * unit, y = (j + (sj + 0.5) / ss) * unit;
      let color = null;
      for (const s of shapes) if (inside(x, y, s)) color = s[5];
      if (color) { r += color[0]; g += color[1]; b += color[2]; a++; }
    }
    const k = (j * size + i) * 4, n = ss * ss;
    px[k] = a ? Math.round(r / a) : 0; px[k + 1] = a ? Math.round(g / a) : 0; px[k + 2] = a ? Math.round(b / a) : 0; px[k + 3] = Math.round((a / n) * 255);
  }
  return px;
}

const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = buf => { let c = 0xffffffff; for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
function png(size) {
  const raw = render(size), rows = [];
  for (let j = 0; j < size; j++) rows.push(Buffer.from([0]), raw.subarray(j * size * 4, (j + 1) * size * 4));
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(Buffer.concat(rows))), chunk('IEND', Buffer.alloc(0))]);
}

const sizes = [16, 32, 48], images = sizes.map(png);
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => { const e = Buffer.alloc(16); e[0] = s; e[1] = s; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(images[i].length, 8); e.writeUInt32LE(offset, 12); offset += images[i].length; return e; });
fs.writeFileSync('static/favicon.ico', Buffer.concat([header, ...entries, ...images]));
fs.writeFileSync('static/apple-touch-icon.png', png(180));
console.log('favicon.ico and apple-touch-icon.png written');
