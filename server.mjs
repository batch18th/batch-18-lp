import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const port = Number(process.env.PORT ?? 3000);
const root = resolve("out");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function resolveFile(url = "/") {
  const pathname = decodeURIComponent(url.split("?")[0] ?? "/");
  const cleanPath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const requested = resolve(join(root, cleanPath));

  if (!requested.startsWith(root)) {
    return null;
  }

  if (existsSync(requested) && statSync(requested).isFile()) {
    return requested;
  }

  const indexFile = resolve(join(requested, "index.html"));
  if (indexFile.startsWith(root) && existsSync(indexFile)) {
    return indexFile;
  }

  return resolve(join(root, "index.html"));
}

createServer((request, response) => {
  const file = resolveFile(request.url);

  if (!file || !existsSync(file)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": mimeTypes[extname(file)] ?? "application/octet-stream"
  });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving http://127.0.0.1:${port}`);
});
