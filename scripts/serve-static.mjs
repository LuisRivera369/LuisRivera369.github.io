import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve("out");
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function fileFor(url) {
  const relative = url.slice(prefix.length) || "/";
  const target = join(root, decodeURIComponent(relative));
  if (existsSync(target) && statSync(target).isDirectory()) {
    return join(target, "index.html");
  }
  return target;
}

const server = createServer((request, response) => {
  const url = (request.url ?? "/").split("?")[0];

  if (url === prefix) {
    response.writeHead(301, { Location: `${prefix}/` });
    response.end();
    return;
  }

  if (!url.startsWith(`${prefix}/`)) {
    response.writeHead(404, { "Content-Type": contentTypes[".html"] });
    response.end("<h1>Not found outside the base path</h1>");
    return;
  }

  const file = fileFor(url);
  const fallback = join(root, "404.html");

  if (!existsSync(file)) {
    response.writeHead(404, { "Content-Type": contentTypes[".html"] });
    createReadStream(fallback).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
  });
  createReadStream(file).pipe(response);
});

server.listen(port, () => {
  console.log(`Serving out/ at http://localhost:${port}${prefix}/`);
});
