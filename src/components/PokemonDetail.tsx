// ============================================================
// COMPONENTE: PokemonDetail
// Panel derecho que muestra toda la info de un pokémon.
// Layout: imagen/nombre/tipos a la izquierda, info a la derecha
// ============================================================

import { usePokemonDetail } from "../hooks/usePokemonDetail";
import { flattenEvolutionChain, formatWeight, formatHeight } from "../utils/pokemonUtils";
import TypeBadge from "./TypeBadge";
import EvolutionChain from "./EvolutionChain";

interface PokemonDetailProps {
  nameOrId: string | number;
}

const PokemonDetail = ({ nameOrId }: PokemonDetailProps) => {
  const { pokemon, species, evolutionChain, loading, error } =
    usePokemonDetail(nameOrId);

  if (loading) {
    return (
      <div className="pokemon-detail__state" aria-live="polite">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-detail__state pokemon-detail__state--error" aria-live="polite">
        <p>{error}</p>
      </div>
    );
  }

  if (!pokemon || !species) return null;

  const genus = species.genera.find((g) => g.language.name === "en")?.genus;
  const evolutionNames = evolutionChain
    ? flattenEvolutionChain(evolutionChain.chain)
    : [];
  const image =
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.front_default;

  return (
    <div className="pokemon-detail">

      {/* ── Fila superior: imagen+nombre+tipos | información ── */}
      <div className="pokemon-detail__top">

        {/* Columna izquierda: imagen, nombre, tipos */}
        <div className="pokemon-detail__left">
          {image && (
            <img
              src={image}
              alt={pokemon.name}
              className="pokemon-detail__image"
            />
          )}
          <h2 className="pokemon-detail__name">{pokemon.name}</h2>
          <div className="pokemon-detail__types">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </div>
        </div>

        {/* Columna derecha: información */}
        <div className="pokemon-detail__right">
          <h3 className="pokemon-detail__info-title">Information</h3>
          <dl className="pokemon-detail__data">
            <div className="pokemon-detail__data-row">
              <dt>Weight</dt>
              <dd>{formatWeight(pokemon.weight)}</dd>
            </div>
            <div className="pokemon-detail__data-row">
              <dt>Height</dt>
              <dd>{formatHeight(pokemon.height)}</dd>
            </div>
            {genus && (
              <div className="pokemon-detail__data-row">
                <dt>Species</dt>
                <dd>{genus}</dd>
              </div>
            )}
            <div className="pokemon-detail__data-row">
              <dt>Egg Groups</dt>
              <dd>
                {species.egg_groups
                  .map((eg) => eg.name.charAt(0).toUpperCase() + eg.name.slice(1))
                  .join(" and ")}
              </dd>
            </div>
            <div className="pokemon-detail__data-row">
              <dt>Abilities</dt>
              <dd>
                {pokemon.abilities
                  .map((a) =>
                    a.ability.name
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")
                  )
                  .join(", ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <hr className="pokemon-detail__divider" />

      {/* ── Cadena de evolución ── */}
      <div className="pokemon-detail__evolution">
        <h3>Evolution Chart</h3>
        {evolutionNames.length > 0 ? (
          <EvolutionChain evolutionNames={evolutionNames} />
        ) : (
          <p>No hay información de evolución disponible.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonDetail;