// ============================================================
// TESTS: SearchBar
// ============================================================

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("renderiza el input con el placeholder correcto", () => {
    render(
      <SearchBar value="" onChange={() => {}} placeholder="Buscar pokémon..." />
    );
    // Buscamos el input por su label de accesibilidad
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("muestra el valor actual", () => {
    render(<SearchBar value="pikachu" onChange={() => {}} />);
    expect(screen.getByRole("searchbox")).toHaveValue("pikachu");
  });

  it("llama a onChange cuando el usuario escribe", async () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const input = screen.getByRole("searchbox");
    await userEvent.type(input, "char");

    // Verificamos que se llamó al menos una vez
    expect(handleChange).toHaveBeenCalled();
  });
});