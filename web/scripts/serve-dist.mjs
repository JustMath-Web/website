/**
 * Minimal static file server for `dist/`, used only by playwright.config.ts's `webServer`.
 *
 * `astro preview` (Astro 7.2.2) daemonizes itself — it prints "Preview server running" and returns
 * immediately, leaving a detached child process to actually serve. Playwright's `webServer` needs a
 * foreground process it can track and terminate; against a daemonizing command it reports "Process
 * from config.webServer exited early" even though the server is healthy. A one-page static site
 * doesn't need a new devDependency to work around that — Node's own `http`/`fs` are enough.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.argv[2] ?? process.env.PORT ?? 4321);

const MIME_TYPES = {
	".html": "text/html; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".mjs": "text/javascript; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".svg": "image/svg+xml",
	".png": "image/png",
	".ico": "image/x-icon",
	".xml": "application/xml; charset=utf-8",
	".txt": "text/plain; charset=utf-8",
	".webmanifest": "application/manifest+json",
};

const server = createServer(async (req, res) => {
	try {
		const url = new URL(req.url ?? "/", "http://localhost");
		let pathname = decodeURIComponent(url.pathname);
		if (pathname.endsWith("/")) pathname += "index.html";

		const filePath = normalize(join(root, pathname));
		if (!filePath.startsWith(root)) {
			res.writeHead(403).end("Forbidden");
			return;
		}

		const body = await readFile(filePath);
		res.writeHead(200, {
			"Content-Type":
				MIME_TYPES[extname(filePath)] ?? "application/octet-stream",
		});
		res.end(body);
	} catch {
		res.writeHead(404).end("Not found");
	}
});

server.listen(port, "127.0.0.1", () => {
	console.log(`Serving dist/ at http://127.0.0.1:${port}/`);
});
