const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-audio') {
    const fileStream = fs.createWriteStream(path.join(ROOT, 'assets', 'wedding_music.wav'));
    req.pipe(fileStream);
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Audio saved successfully!');
    });
    return;
  }

  if (req.method === 'POST' && req.url.startsWith('/save-frame')) {
    const urlObj = new URL(req.url, 'http://localhost:3000');
    const name = urlObj.searchParams.get('name') || 'frame.jpg';
    const fileStream = fs.createWriteStream(path.join(ROOT, 'assets', name));
    req.pipe(fileStream);
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Frame saved: ' + name);
    });
    return;
  }

  let filePath = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (filePath.endsWith(path.sep) || req.url === '/') {
    filePath = path.join(ROOT, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('File not found: ' + req.url);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Access-Control-Allow-Origin': '*'
    });
    const readStream = fs.createReadStream(filePath);
    readStream.on('error', (streamErr) => {
      console.error('Stream error:', streamErr.message);
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      }
      res.end();
    });
    res.on('error', (resErr) => {
      console.error('Response error:', resErr.message);
      readStream.destroy();
    });
    readStream.pipe(res);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
