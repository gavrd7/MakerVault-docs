# Manage slicer engines

!!! warning "Administrator management UI is planned, not released"
    The current PR #171 supports candidate engine discovery, native profile search/import and a guarded single-engine development worker. It **does not** yet support the independent engine installer, simultaneous engine routing or production-ready verified slicing.

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
