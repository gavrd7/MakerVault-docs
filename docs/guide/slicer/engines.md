# Manage slicer engines

!!! warning "Administrator management UI is planned, not released"
    Draft PR #171 now includes independent OrcaSlicer and Creality Print worker adapters, a shared pinned-engine registry, native profile search/import, and an initial browser-native custom-profile editor. It **does not** yet include a production-ready engine installer, approved Linux slicing binaries, complete native setting coverage, or successful real end-to-end slicing fixtures for both engines.

## One container, individually selectable engines

The optional MakerVault slicing service will be **one container** with independently installed executable versions. **OrcaSlicer is not a mandatory dependency.** For example, an administrator may install only Creality Print, or add OrcaSlicer and PrusaSlicer later. Each engine must be independently validated and have its own original native profiles.

## Installing an engine — planned

1. In MakerVault open **Slicer → Engine management** as an administrator.
2. Choose an engine and a supported, explicitly pinned version.
3. Review the licence, source, verification record, storage requirements and installation confirmation.
4. Install only the selected engine. Verify its executable checksum and controlled slicing fixture before enabling actual jobs.
5. Import/select the engine's compatible native printer, filament and process presets. An imported preset is initially **unverified** and cannot be trusted automatically.
6. Choose this engine/version in the slicer workbench. Missing/invalid engines should not affect other verified engines.

The actual installer controls, release catalogues and approved download mechanism will be documented with screenshots only when delivered.

## Updating, removing and rolling back — planned

- Updates must be explicit and limited to the **chosen** engine.
- A new executable/version and its native profiles need fresh integrity and fixture verification; no silent profile interchange between slicer engines.
- Preserve previous verified versions until rollback is no longer needed.
- Removing an engine must not remove unrelated engines or existing MakerVault models/G-code. Warn and resolve pending jobs.
- Persist engine data across normal container updates and document backup/restore as part of the release.

## Engine compatibility

An engine appearing in the candidate catalogue **does not** mean a compatible binary is installed, licensed for distribution or verified to slice. Each engine will receive a documented tested version, native profile source, known limitations and fixture evidence before it is marked supported. The engine priority currently starts with OrcaSlicer and then Creality Print, but users will not be forced to install Orca to use Creality.

## GUI custom profile editing (draft)

In PR #171, open **Profile management → Manage profiles**, select a saved OrcaSlicer or Creality Print printer/filament/process preset, and choose **Edit as custom**. A browser form exposes a conservative subset of native numerical controls; save it under a new name. The original preset and its source file are preserved, and the edited copy remains an **unverified candidate** until its engine/version and any parent preset chain are validated. This is early GUI coverage, not full native setting parity.

The supported settings list will expand and gain searchable Basic/Advanced categories before release. Administrator engine installation and update actions must also be possible from the MakerVault interface; the original desktop slicer will not be required for the normal end-user workflow.
