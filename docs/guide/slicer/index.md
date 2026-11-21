# MakerVault Slicer

!!! warning "v1.7.0 Beta documentation — not a published stable feature"
    The slicer foundation is in [MakerVault PR #171](https://github.com/gavrd7/MakerVault/pull/171). OrcaSlicer and Creality Print have real worker and native-profile implementations with verified staging tests, but support remains conditional on the particular engine, printer topology, selected profiles and validated output. Bambu Studio is under development in [PR #191](https://github.com/gavrd7/MakerVault/pull/191) and is not yet a working enabled engine. Do not assume v1.7.0 or a production installer has been released.

MakerVault Slicer is an **optional**, self-hosted preparation workspace. MakerVault remains useful for models, G-code storage, printer monitoring and print submission when no slicer worker is installed.

## Choose where to start

- [Install or enable the optional slicer](installation.md) — what works in staging, how it differs from the planned production installation, and how to disable it without removing MakerVault data.
- [Engines and native profiles](engines.md) — choose OrcaSlicer or Creality Print, search and import native machine/process/filament presets, and understand engine-specific limitations.
- [Prepare, paint and slice](workbench.md) — build plates, drafts, object and material assignment, print settings, toolpath preview and explicit G-code handoff.
- [Diagnose slicing problems](troubleshooting.md) — unavailable workers, profile issues, safe output review and printer submission boundaries.

## Slicing and printing are separate

A successful slice creates G-code for inspection. It **does not automatically send a job, start printing or deduct filament stock**. Uploading or starting a print is a separate, expressly confirmed operation subject to the printer adapter's capabilities and material mapping restrictions. A printer's manufacturer does not force use of a matching slicer engine; engine-native profiles and actual hardware still have to match.

## What is verified and what is not

- OrcaSlicer and Creality Print have worker adapters and staged slicing/profile test evidence in PR #171. Available painting, multipaterial, flushing and support features are specific to the engine and selected machine/profile, not universally guaranteed.
- Successful owner-confirmed Creality multi-colour cube prints are real evidence, but do not certify every CFS profile, flushing multiplier or different printer topology.
- Bambu Studio has a separate early draft runner in PR #191, without complete executable validation and production worker integration.
- General one-click browser installation and independent engine updates are **planned**, not current production instructions.

This is the **public user guide**. Detailed implementation tests, pinning and developer migration notes remain in the [application's technical documentation](https://github.com/gavrd7/MakerVault/tree/feature/self-hosted-slicer-foundation/docs/development).

## Illustrations before publication

Capture real desktop and mobile UI screenshots for engine selection, build plate, profile search, paint tools, preview and explicit printer confirmation. Add descriptive alternative text and check screenshots for keys, private files and printer identifiers. Do not substitute mock-ups for shipped features.
