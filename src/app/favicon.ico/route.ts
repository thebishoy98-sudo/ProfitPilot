const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#111827"/>
  <path d="M16 42V18h17c9 0 15 5 15 13s-6 13-15 13H25v-9h8c3 0 6-1 6-4s-3-4-6-4h-8v15h-9z" fill="#f9fafb"/>
  <path d="M42 46l7-12 7 12h-5l-2-4-2 4h-5z" fill="#22c55e"/>
</svg>`;

export function GET() {
  return new Response(favicon, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
