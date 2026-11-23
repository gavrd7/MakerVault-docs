# MakerVault Slicer

**MakerVault v1.7.0 includes the integrated MakerVault Slicer**, a browser-based preparation, painting, native slicing and G-code review workspace. Supported native engine integrations are **OrcaSlicer**, **Creality Print** and **Bambu Studio**. Their executables are installed and verified individually in the combined slicer container rather than bundled into the MakerVault web application.

The slicer runs in its own container as part of the standard four-container deployment. All existing model, filament/spool, G-code Library, live printer monitoring and explicit printer-submission features remain usable without it.

## Start here

- [Install the slicer service](installation.md) — one `docker-compose.yml`, automatically generated separate secrets, persistent engine storage and safe upgrades.
- [Install engines and select profiles](engines.md) — versions, official native catalogue searches, saved defaults, per-engine lifecycle and build plates.
- [Prepare, paint and slice](workbench.md) — placement, per-object settings, colour/material painting, supports, seams, fuzzy skin, variable layers, flushing, towers and G-code review.
- [Troubleshooting](troubleshooting.md) — credentials, engine health, profile inheritance, unsupported native settings and print submission.

The main [3D Printing guide](../using/printing.md) explains printer and filament inventory and links here when it reaches slicing. The [Model Library guide](../using/models.md) explains selecting stored STL/3MF assets.

## Native engines and physical printing

The same workbench supports different installed engines, but each uses **its own native machine, filament and process profiles**. Choosing a printer brand does not lock you to that manufacturer's slicing engine. Imported presets must match the selected engine/version, nozzle, topology and printer firmware.

Real executable regression tests validate selected capabilities. Bambu Studio 02.09.01.70, for example, has tests for material/tool deposition, painted facets, support-enforcer extrusion, seam/fuzzy effects, selected variable-layer bands, flush-volume multipliers and prime-tower placement. Other engine capabilities and printer topologies vary. These tests do not prove every profile or physical printer will print successfully.

**Slicing is not printing.** Generated G-code must be reviewed and any subsequent printer upload/start requires a separate, explicit action and printer-specific validation. Slicing never silently starts the printer, changes the printer material database or deducts filament stock.

## Screenshots

This guide is designed to include real, redacted desktop/mobile screenshots for engine installation, the workbench, profile search, painting and G-code preview. Until captured, the steps and labels are authoritative; do not substitute mock-ups or disclose printer addresses, credentials, private models or identifying account data.
