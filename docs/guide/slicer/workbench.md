# Prepare, paint and slice models

The MakerVault Slicer workspace lets you prepare model geometry and choose native slicer settings inside MakerVault. **OrcaSlicer, Creality Print and Bambu Studio** share the main workflow while retaining their own profile and capability restrictions.

## From a model to G-code

1. Open **MakerVault Slicer**, select an installed engine/version, and choose a printer and compatible native machine/process/filament profiles.
2. Add STL/3MF models from the Model Library or by uploading them. Review scale and placement; move, rotate, scale and arrange models on the build plate.
3. Choose the build plate, nozzle and material colours/tools. Use the object tree to select the part or region to edit.
4. In **Basic** or **Advanced** print settings, edit supported global/per-object options. Create a custom process profile to preserve manufacturer defaults.
5. When supported for the current engine/topology, use colour painting, support enforcer/blocker regions, seam painting, fuzzy skin, variable-layer-height controls, directional flushing or prime-tower position. Assign real native filament profiles to each tool.
6. Choose **Save draft**, **Quick slice** or **Slice**. In interactive preparation, select **Slice and preview** to run the verified native binary.
7. Inspect G-code/toolpaths, material assignments, time/filament estimates, temperature metadata, supports and purge/prime tower. Correct any unsafe or incompatible settings before proceeding.
8. Explicitly save G-code in the library or choose a supported printer transfer/start action with final confirmation. Nothing is sent automatically.

## Workbench actions

| Action | What it does |
| --- | --- |
| **Save draft** | Keep models, placement and settings without running a slicer |
| **Quick slice** | Generate G-code directly from valid selections for review |
| **Slice / Prepare** | Open the full plate editor, settings and painting controls |
| **Slice and preview** | Run the selected verified engine and review output |
| **Add G-code to library** | Save the resulting private G-code as a retained asset |
| **Upload / Upload and start** | Explicit printer operations subject to adapter, G-code identity and compatibility checks |
| **Device** | Open the selected printer live monitor over the slicer; closing it returns to the same workbench state |

## Materials and painting

Painting is a change to the native project's material/process data, not merely the preview colour. A single-nozzle filament changer may need flush/prime settings and firmware-specific tool-change commands; multi-nozzle machines have different requirements.

Support-enforcer and blocker regions, seams, fuzzy skin and variable heights are supported **only where the selected native engine honours them**. Make sure a requested change has affected the generated G-code rather than judging only by visible UI colours. MakerVault rejects selected native output mismatches where verified audits exist.

Physical spool records in MakerVault are separate from the engine's material presets. A spool suggestion does not automatically map a Creality CFS, Bambu AMS or other printer material slot, start a print or reduce stock.

## G-code inspection and printing

The G-code viewer shows supported estimates and comments, including generated filament use, printer/profile hints and, where present, actual versus profile-only temperature evidence. Preview analysis is bounded; it is not a full hardware simulation or guarantee of safe print-start G-code.

Printer dispatch uses separate supported adapters, review and explicit confirmation. Some connections are monitoring-only. For saved output and transfer options, read [G-code Library and printer submission](../using/gcode-and-print-submission.md).

## Mobile and screenshots

The workspace adapts to smaller screens. Verify the relevant painting and toolpath controls in your browser before relying on a printer-critical setting. Real, sanitised screenshots will illustrate engine selection, build-plate settings, painting and G-code review; do not publish printer addresses, account identifiers or private designs.
