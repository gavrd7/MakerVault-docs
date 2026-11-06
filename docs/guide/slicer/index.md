# MakerVault Slicer

!!! warning "In development — not included in MakerVault v1.6.0"
    MakerVault Slicer is being developed in [application PR #171](https://github.com/gavrd7/MakerVault/pull/171). The finished optional worker and multi-engine installer are not yet available for production. These pages are an outline for the eventual illustrated release guide, not an invitation to install unverified binaries.

MakerVault Slicer will provide a self-hosted workflow from STL models to G-code, linked with existing MakerVault printers, filaments, model files and G-code library.

## What you'll be able to do

- Import multiple STL objects onto a visual build plate, move, rotate, resize and select them independently.
- Choose a printer, nozzle and native printer/process/filament profiles for the selected slicing engine.
- Use an optional self-hosted slicing worker; MakerVault itself keeps working without the worker.
- Inspect generated G-code and explicitly submit a compatible print using the existing printer workflow. Slicing **never automatically starts a print** or deducts spool stock.

The interactive multi-object plate is already a draft preparation interface in PR #171; actual multi-object slicing and production engine execution remain unverified.

## Chapters

- [Install the optional slicer service](installation.md): Docker and configuration, prerequisites, and what happens without a worker.
- [Manage slicing engines](engines.md): independent engine selection, versions, updates, removal and rollback.
- [Prepare and slice models](workbench.md): proposed visual workflow and printer submission.
- [Troubleshoot the slicer](troubleshooting.md): status messages and diagnostic checks.

## Screenshots to capture before release

This chapter will include **real, final UI screenshots**, captured after the workflows pass acceptance testing: the enabled/disabled navigation, installation fallback, engine manager, desktop/mobile build plate, model transforms, preset search, slicing progress, G-code toolpath preview and explicit Print from slicer confirmation. Place final screenshots in the guide's assets folder and add descriptive alt text. Do not present draft or mock screens as shipped features.
