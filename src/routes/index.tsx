import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import App from "@/site/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Requisição de Peças de Manutenção" },
      { name: "description", content: "Portal para técnicos pedirem peças de manutenção com precisão." },
      { property: "og:title", content: "Requisição de Peças de Manutenção" },
      { property: "og:description", content: "Portal para técnicos pedirem peças de manutenção com precisão." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready ? <App /> : null;
}
