import { Occurrence } from "@/types/occurrence";
const places = [
  ["Farolândia", "water_outage", "Falta d’água", 23, -10.986, -37.073],
  ["Atalaia", "leak", "Vazamento", 7, -10.992, -37.052],
  ["Jardins", "water_quality", "Água com alteração de cor", 5, -10.953, -37.06],
  [
    "Grageru",
    "infrastructure",
    "Problema na infraestrutura",
    18,
    -10.939,
    -37.065,
  ],
  ["Coroa do Meio", "water_outage", "Falta d’água", 12, -10.974, -37.042],
  ["Jabotiana", "leak", "Vazamento", 9, -10.936, -37.104],
] as const;
export const occurrences: Occurrence[] = Array.from({ length: 15 }, (_, i) => {
  const p = places[i % places.length],
    offset = Math.floor(i / places.length) * 0.002;
  const createdAt = new Date(
    Date.UTC(2026, 9, 11, 11, 0) - i * 1800000,
  ).toISOString();
  const status = i % 4 === 0 ? "reported" : "confirmed";
  return {
    id: `oc-${i + 1}`,
    protocol: `AC-2026-${String(i + 1).padStart(6, "0")}`,
    type: p[1],
    title: p[2],
    description:
      "Moradores da região relataram este problema no abastecimento. Relato de demonstração.",
    latitude: p[4] + offset,
    longitude: p[5] + offset,
    neighborhood: p[0],
    city: "Aracaju",
    state: "SE",
    confirmations: p[3] + (i % 3),
    status,
    createdAt,
    history: [
      { status: "reported", at: createdAt },
      ...(status === "confirmed"
        ? [
            {
              status: "confirmed" as const,
              at: new Date(
                new Date(createdAt).getTime() + 600000,
              ).toISOString(),
            },
          ]
        : []),
    ],
  };
});
