const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 10000;
const HOST = "0.0.0.0";
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm"
};

function getFile(url) {
  let requested;

  try {
    requested = decodeURIComponent((url || "/").split("?")[0]);
  } catch {
    return null;
  }

  if (requested === "/") {
    requested = "/index.html";
  }

  const file = path.normalize(path.join(ROOT, requested));

  if (!file.startsWith(ROOT + path.sep)) {
    return null;
  }

  return file;
}

const server = http.createServer((req, res) => {

  if ((req.url || "").split("?")[0] === "/health") {
    const body = JSON.stringify({
      status: "ok",
      service: "Fogona City",
      runtime: "node",
      port: PORT
    });

    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8"
    });

    res.end(body);
    return;
  }

  const file = getFile(req.url);

  if (!file) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(file, (statError, stat) => {

    if (!statError && stat.isDirectory()) {
      const index = path.join(file, "index.html");

      fs.readFile(index, (error, data) => {
        if (error) {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8"
        });

        res.end(data);
      });

      return;
    }

    fs.readFile(file, (error, data) => {

      if (error) {
        fs.readFile(
          path.join(ROOT, "index.html"),
          (fallbackError, fallbackData) => {

            if (fallbackError) {
              res.writeHead(404);
              res.end("Not Found");
              return;
            }

            res.writeHead(200, {
              "Content-Type": "text/html; charset=utf-8"
            });

            res.end(fallbackData);
          }
        );

        return;
      }

      const ext = path.extname(file).toLowerCase();

      res.writeHead(200, {
        "Content-Type":
          MIME[ext] || "application/octet-stream"
      });

      res.end(data);
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log("============================================================");
  console.log(" FOGONA CITY — RENDER");
  console.log("============================================================");
  console.log("HOST=" + HOST);
  console.log("PORT=" + PORT);
  console.log("HEALTH=/health");
  console.log("============================================================");
});
