// ============================================================
// COMPONENTE: TypeBadge
// ============================================================

// Mapa de colores por tipo — extraído del diseño de referencia
const TYPE_COLORS: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  poison: "#A040A0",
  flying: "#A890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
};

interface TypeBadgeProps {
  type: string;
}

const TypeBadge = ({ type }: TypeBadgeProps) => {
  const color = TYPE_COLORS[type] ?? "#888";

  return (
    <span
      className="type-badge"
      style={{ backgroundColor: color }}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default TypeBadge;