export const SPECIES_COLORS = [
  '#d7b2e5',
  '#283ffa',
  '#1d9fe7',
  '#256fd6',
  '#8b60b4',
  '#635a03',
  '#3387d8',
  '#bc9d27',
  '#3041a7',
  '#f26a4f',
  '#4d1b64',
  '#5e2391',
]

export const renderColor = (id: number | null) => {
  if (id) return SPECIES_COLORS[id] || '#000'
  else return '#000'
}
