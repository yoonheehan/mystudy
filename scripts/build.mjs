import fs from 'node:fs';
import path from 'node:path';
import { syncBuiltinESMExports } from 'node:module';
import { build } from 'vite';

// Windows can create directory junctions without symlink privileges.
// Limit this fallback to adapter-generated function aliases; Linux is untouched.
const originalSymlink = fs.symlinkSync;
if (process.platform === 'win32') {
  const functionRoot = path.resolve('.vercel/output/functions');
  const inside = candidate => {
    const relative = path.relative(functionRoot, candidate);
    return relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative);
  };
  fs.symlinkSync = function(target, linkPath, type) {
    try {
      return originalSymlink.call(fs, target, linkPath, type);
    } catch (error) {
      const absoluteLink = path.resolve(linkPath);
      const absoluteTarget = path.resolve(path.dirname(absoluteLink), target);
      if (error.code !== 'EPERM' || !inside(absoluteLink) || !inside(absoluteTarget)
          || !fs.statSync(absoluteTarget).isDirectory()) throw error;
      return originalSymlink.call(fs, absoluteTarget, absoluteLink, 'junction');
    }
  };
  syncBuiltinESMExports();
}
try {
  await build();
} finally {
  fs.symlinkSync = originalSymlink;
  syncBuiltinESMExports();
}
