import { serve } from "bun";

const server = serve({
  port: 52430,
  async fetch(req) {
    try {
      const url = new URL(req.url);
      let path = url.pathname === "/" ? "/index.html" : url.pathname;
      const file = Bun.file(`./${path}`);

      if (!(await file.exists())) {
        return new Response("404 Not Found", { status: 404 });
      }

      return new Response(file, {
        headers: { "Content-Type": file.type || "text/plain" },
      });
    } catch (err) {
      return new Response("Server Error", { status: 500 });
    }
  },
});

console.log(`Server started on http://localhost:${server.port}`);
