# Prepare, paint and slice models

!!! warning "v1.7.0 Beta preparation"
    These workflows are being validated in [application PR #171](https://github.com/gavrd7/MakerVault/pull/171), not presented as current stable-release features. Real OrcaSlicer and Creality Print tests exist, but print readiness remains specific to the selected native profiles and hardware.

## From model to G-code

1. Open **MakerVault Slicer** once a healthy optional worker is available. Select the installed engine and exact version.
2. Choose a printer and the engine-native **machine**, **process** and **filament** profiles. Use profile search/import if needed; check the build-plate type and nozzle.
3. Add STL/3MF models from your files or import new models. Arrange, move, rotate, scale and duplicate them on the visual plate. Check the plate bounds; the 3D view is a preparation tool, not an assurance of mechanical clearance.
4. Use **Save draft** to keep the plate without slicing, or **Quick slice** for a direct result. **Slice** opens the interactive Prepare workspace.
5. In **Prepare**, search process settings in Basic or Advanced mode; use Global versus supported Object settings as appropriate. Save changed settings in the draft or create a separate custom profile. The original native preset must remain unchanged.
6. For supported painting or multi-material features, assign compatible native filament profiles to each logical slot, paint/assign objects or regions, and inspect flushing/prime behaviour. Confirm support for the selected engine, nozzle and actual material system rather than relying on visual colours alone.
7. Select **Slice and preview**, review the job result and inspect the layered G-code/toolpaths, filament changes and any warnings.
8. Choose **Add G-code to library**, **Upload to printer**, or **Upload and start print** only where the printer adapter permits it. Every print dispatch requires its own explicit confirmation and hardware-specific mapping checks.

## What each action does

| Action | Behaviour |
| --- | --- |
| **Save draft** | Preserves models, placement and settings without executing the engine. |
| **Quick slice** | Produces a private slice result for review; it does not start a print. |
| **Slice** | Opens the full interactive preparation workspace. |
| **Slice and preview** | Runs the chosen verified worker and displays generated toolpaths where available. |
| **Add G-code to library** | Explicitly retains G-code in the user's library. |
| **Upload / Upload and start** | Separate printer operations subject to supported adapter, active printer state, and explicit confirmation. |

A physical MakerVault spool record and an engine's native filament profile are different concepts. Assigning the visual colour does not automatically map a CFS/AMS position or authorise a physical tool change. Slicing does not deduct spool stock.

## Working with multiple materials

Use the engine-native tool and material assignments, not assumptions based on the number of paint colours. Creality multi-colour test cubes have been printed successfully, but **flushing multipliers, native enabled CFS mode and printer mapping must still be validated for each relevant setup**. A test-only fallback profile or offline diagnostic is not a production-compatible printer preset. Multi-nozzle and independent toolhead machines require separately proven encoding.

## Desktop and mobile

The workbench adapts to smaller screens, but feature controls and toolpath inspection should be checked on the actual device/browser before relying on them for a print. This page will gain real, permission-safe screenshots at publication. For existing G-code storage and adapter-specific printing use [G-code library and printer submission](../using/gcode-and-print-submission.md).
