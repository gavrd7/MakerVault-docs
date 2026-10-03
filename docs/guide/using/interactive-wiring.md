# Interactive Wiring

**Goal:** document pin-to-pin connections for a project or a standalone experiment and catch obvious wiring mistakes before assembly.

<figure markdown>
  ![Interactive Wiring lab with two nodes, a labelled connection and circuit checks.](../assets/screenshots/interactive-wiring.png)
  <figcaption>The Wiring Lab uses catalogue-aware nodes, editable connections and basic circuit checks.</figcaption>
</figure>

The Wiring Lab is a documentation and planning tool. It can use known board/component data to offer pins or terminals, label connections and perform basic checks. It is not a circuit simulator and cannot prove that a design is electrically safe or functionally correct.

## Build a diagram

1. Open **Interactive Wiring**, or add a diagram from a project workspace.
2. Add nodes from catalogue or inventory records.
3. Choose the source node and pin, then the destination node and pin.
4. Add a useful connection label and choose a wire colour when helpful.
5. Save the connection and repeat for the rest of the circuit.

If an exact pin or terminal is not present in MakerVault's structured data, you can enter it manually. Prefer the catalogue-aware choice when available because it gives the checker more context.

## Circuit checks

MakerVault can flag basic conflicts and suspicious relationships, such as incompatible power/ground connections where enough metadata exists. A clean result is not an electrical certification: check voltage levels, current limits, pull-ups, bus requirements, polarity and component datasheets yourself.

## Edit, export and reuse

Connections can be edited or removed after creation. Save the diagram to preserve the working state. Use **Export JSON** for structured data and **Export SVG** for a portable visual diagram.

Project diagrams stay with the project context; standalone diagrams are useful for quick experiments or reusable reference work.
