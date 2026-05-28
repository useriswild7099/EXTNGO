/**
 * EXTNGO Local Server
 * Serves static files AND provides a /_next/image proxy
 * so React's Next.js Image component works natively.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.tar': 'application/x-tar',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsed.pathname);

  // ====== NEXT.JS IMAGE OPTIMIZATION PROXY ======
  // Intercept /_next/image?url=...&w=...&q=... and serve the raw file
  if (pathname === '/_next/image') {
    const imageUrl = parsed.query.url;
    if (imageUrl) {
      const decoded = decodeURIComponent(imageUrl);
      // Strip leading ./ or / to get relative path
      const relative = decoded.replace(/^\.?\//, '');
      const filePath = path.join(ROOT, relative);

      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          'Content-Type': MIME[ext] || 'application/octet-stream',
          'Cache-Control': 'public, max-age=31536000, immutable',
        });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }
    res.writeHead(404);
    res.end('Image not found');
    return;
  }

  // ====== BLOCK KNOWN LEGACY ENDPOINTS ======
  if (pathname.includes('/api/jobs') || pathname.endsWith('.tar')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"status":"blocked"}');
    return;
  }

  // ====== STATIC FILE SERVER ======
  if (pathname === '/') pathname = '/index.html';

  // Remove query string artifacts
  let filePath = path.join(ROOT, pathname);

  // Handle ?dpl= query params on _next assets
  if (!fs.existsSync(filePath)) {
    // Try without the path after ? (already handled by url.parse)
    // Try to find the file
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Serve empty JSON stub for missing _next/data pages
      if (pathname.startsWith('/_next/data/') && pathname.endsWith('.json')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"pageProps":{},"__N_SSG":true}');
        return;
      }
      // Serve empty JS for missing _next/static/chunks/pages
      if (pathname.startsWith('/_next/static/chunks/pages/') && pathname.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end('(self.__BUILD_MANIFEST_CB&&self.__BUILD_MANIFEST_CB());');
        return;
      }
      // Try index.html for SPA routes (any path without extension)
      if (!path.extname(pathname)) {
        const indexPath = path.join(ROOT, 'index.html');
        if (fs.existsSync(indexPath)) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(indexPath).pipe(res);
          return;
        }
      }
      res.writeHead(404);
      res.end('Not found: ' + pathname);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║  EXTNGO SERVER - FULLY INDEPENDENT     ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║  http://localhost:${PORT}                 ║`);
  console.log('║                                        ║');
  console.log('║  ✓ Static files served                 ║');
  console.log('║  ✓ /_next/image proxy active           ║');
  console.log('║  ✓ Legacy endpoints blocked            ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
});
