export const documents = [
  { id: "menu-01", title: "Menú 01", date: "16 ene 2022", match: (name: string) => name.includes("16-01-2022") && !name.includes("Menu") },
  { id: "menu-02", title: "Menú 02", date: "16 ene 2022", match: (name: string) => name.includes("16-01-2022") && name.includes("Menu") },
  { id: "menu-03", title: "Menú 03", date: "15 feb 2022", match: (name: string) => name.includes("15-02-2022") },
  { id: "menu-04", title: "Menú 04", date: "04 abr 2022", match: (name: string) => name.includes("04-04-2022") },
  { id: "menu-05", title: "Menú 05", date: "02 oct 2022", match: (name: string) => name.includes("02-10-2022") },
] as const;

export function documentById(id: string) { return documents.find((document) => document.id === id); }
