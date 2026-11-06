# Prepare models in MakerVault Slicer

!!! warning "Preview of work in progress"
    The build-plate editor and profile preparation interface exist in draft application PR #171. A production multi-object slice and G-code output from a verified engine are not yet established.

## Planned illustrated walkthrough

1. Open **MakerVault Slicer** when a verified worker is available.
2. Select the installed slicing engine/version, printer and nozzle.
3. Upload several STL files together or add existing models from MakerVault Files.
4. Arrange each model visually; select, drag, rotate, scale, duplicate or remove models independently.
5. Check the preliminary build-plate warnings. These are not full collision, keep-out or printer-safety validation.
6. Choose **engine-native** printer, filament and process presets. MakerVault's physical spool is linked separately from the selected native filament profile.
7. Review searchable slicing settings, request an explicit slice and monitor the job.
8. Inspect the generated private G-code in the G-code library.
9. Optionally choose **Print from slicer** to open the existing printer submission review. Confirm the print separately; the slicer does not initiate printing automatically.

## Planned screenshots

Before the feature is released, this chapter needs paired desktop/mobile screenshots of the build plate, object selection/transforms, native preset discovery, error states, slicing progress, toolpath preview and final printer confirmation. Screenshots must reflect the tested finished UI.

For current non-slicer print management see [G-code library and printer submission](../using/gcode-and-print-submission.md).
