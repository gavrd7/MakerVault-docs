# Slicing engines and native profiles

MakerVault v1.7.0 integrates **OrcaSlicer**, **Creality Print** and **Bambu Studio**. Each engine is an independently installed native executable with its own version, approved integrity hashes, machine presets, processes and filament presets. Choosing a printer brand never forces a particular engine.

## Engine lifecycle

Open **MakerVault Slicer → View engine installations**. The engine manager shows verified installed versions and available approved downloads, with supported actions to **Install**, **Update**, **Switch** and **Uninstall** one engine at a time.

- Installing one engine never silently installs or removes another engine.
- Switching to an older version requires a valid approved digest; arbitrary upstream binaries are not silently substituted.
- Native profiles retain their source engine and version. Removing an engine does not delete its previously saved models or G-code output.
- An engine visible in the catalogue but not installed or approved cannot perform a real slice.

The combined service uses one `makervault-slicer` Docker container with separate restricted worker/installer processes; see [installation](installation.md).

## Choosing profiles

1. Choose an installed engine and version, then the physical printer/nozzle.
2. Open **Change printer/profile** and search existing printer, process and filament profiles.
3. If a profile is missing, use **Search official profiles** for the chosen engine or import a compatible engine-native profile. Required inheritance dependencies must resolve to the correct upstream source.
4. Choose the build-plate type and matching nozzle/filament settings. A visual build-plate match does not guarantee printer firmware compatibility.
5. Where available, use **Set as default**, **Import & set default**, or your own saved process overrides. Manufacturer presets remain intact when saving a custom copy.

OrcaSlicer, Creality Print and Bambu Studio profiles are **not interchangeable** even if the physical printer model is the same.

## Multi-material and painting

For a multi-material slice, assign a verified native filament profile to **each logical material slot**. A physical MakerVault spool record can suggest a material and colour, but it does not automatically load a filament changer or alter the printer's material database.

Supported settings can include object/region colour assignment, support painting, seam painting, fuzzy skin, variable-layer-height bands, flush volumes and prime towers. Features depend on the engine, selected native profiles, nozzle/extruder topology and actual G-code emitted.

Bambu Studio **02.09.01.70** has executable tests proving two-tool model deposition, facet painting, support-enforcer extrusion, seam/fuzzy changes, selected 0.10/0.15 mm layer-height bands, directional flush multipliers and prime-tower placement. The native binary silently clamped one 0.30 mm request; MakerVault rejects that mismatch rather than claiming success. Tests are not blanket printer compatibility certification.

Creality Print has known successful maintainer-tested multi-colour prints on specified hardware. Flushing output and material mapping still require physical-printer review. Multi-nozzle and independent-toolhead workflows are not interchangeable with a single-nozzle CFS/AMS configuration.

For daily work, see [Prepare, paint and slice](workbench.md). For missing profiles or rejected jobs, see [Troubleshooting](troubleshooting.md).
