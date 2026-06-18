// ============================================================
// TESTS: TypeBadge
// ============================================================

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TypeBadge from "../components/TypeBadge";

describe("TypeBadge", () => {
  it("muestra el tipo con la primera letra en mayúscula", () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText("Fire")).toBeInTheDocument();
  });

  it("aplica un color de fondo", () => {
    render(<TypeBadge type="water" />);
    const badge = screen.getByText("Water");
    // Verificamos que tiene un estilo de background aplicado
    expect(badge).toHaveStyle({ backgroundColor: "#6890F0" });
  });

  it("usa color gris para tipos desconocidos", () => {
    render(<TypeBadge type="unknown-type" />);
    const badge = screen.getByText("Unknown-type");
    expect(badge).toHaveStyle({ backgroundColor: "#888" });
  });
});