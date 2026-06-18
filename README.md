# Pokédex — Midware Technical Test

Aplicación de Pokédex construida con React y TypeScript como parte del proceso de evaluación técnica de Midware.

## Tecnologías utilizadas

- **React 18** - librería de UI
- **TypeScript** - seguro y fácil de mantener
- **Vite** - servidor de desarrollo
- **React Router DOM** - navegación entre rutas
- **Axios** - cliente HTTP para llamadas a la PokéAPI
- **Vitest** - framework de testing compatible con Vite
- **Testing Library** - utilidades para testear componentes React
- **Happy DOM** - simulador de navegador para el entorno de tests

## Requisitos

- Node.js v20.16+
- npm

## Instalación y uso
```bash
# Clonar el repositorio
git clone <url-del-repo>
cd pokedex

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Correr los tests
npx vitest run

# Build de producción
npm run build
```

## Estructura del proyecto
src/

├── components/       # Componentes reutilizables de UI

│   ├── PokemonCard       # Fila de la lista lateral

│   ├── PokemonDetail     # Panel de detalle completo

│   ├── EvolutionChain    # Cadena de evolución con imágenes

│   ├── SearchBar         # Input de búsqueda

│   └── TypeBadge         # Cuadro de tipo con color

├── hooks/            # Lógica separada de los componentes

│   ├── usePokemonList    # Carga la lista de 151 pokémon

│   └── usePokemonDetail  # Carga detalle, especie y evolución

├── pages/            # Pantallas completas

│   └── HomePage          # Página principal con lista y detalle

├── services/         # Comunicación con la API

│   └── pokemonService    # Todas las llamadas a la PokéAPI

├── types/            # Interfaces de TypeScript

│   └── pokemon           # Tipos para todos los datos de la API

├── utils/            # Funciones puras de utilidad

│   └── pokemonUtils      # Formateo de datos y transformaciones

└── test/             # Tests automatizados

├── setup.ts          # Configuración global de tests

├── pokemonUtils.test # Tests de funciones utilitarias

├── SearchBar.test    # Tests del componente de búsqueda

└── TypeBadge.test    # Tests del componente de tipos


## Limitaciones y trade-offs

- **Sin caché persistente**: los datos se vuelven a pedir al recargar la página. 
- **151 pokémon fijos**: la app muestra solo la primera generación como indica el diseño de referencia. 
- **Sin tests de integración**: los tests cubren utilidades y componentes aislados.

## API utilizada

[PokéAPI](https://pokeapi.co/) — API pública y gratuita con datos de todos los pokémon.

Endpoints usados:
- `GET /pokemon?limit=151` - lista de pokémon
- `GET /pokemon/{name}` - detalle de un pokémon
- `GET /pokemon-species/{name}` - especie (egg groups, género)
- `GET /evolution-chain/{id}` - cadena de evolución
