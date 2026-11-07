# Install the optional slicer service

!!! warning "Not yet available for normal installation"
    This is the planned release workflow. No verified production-ready all-engines container or final Compose section is supplied in MakerVault v1.6.0. Do not use experimental images as production instructions.

Start with [Install MakerVault on Linux](../getting-started/install.md) (or [Windows installation](../getting-started/windows.md)), [Configure your environment](../getting-started/environment.md), and [Choose your storage](../getting-started/storage.md). The slicer is a **separate optional step** after the core MakerVault application is running.

## Expected final deployment

The supported release will contain one clearly labelled, **commented-out slicer service in the standard `compose.yaml`**. Users will uncomment that service only when they want slicing. No extra Compose file or profile will be needed. The normal `docker compose up -d` command will continue to work. The core MakerVault, PostgreSQL and Redis services must not depend on the slicer.

One slicing-service container will host administrator-selected, independently installed engines; the container will not need OrcaSlicer to run a verified Creality Print engine, for example. No engine will be silently installed, and engine distributions must pass version, licence and integrity validation.

## Installation steps to complete before release

1. Verify the Docker host has adequate CPU, memory and persistent storage for the chosen slicing engine.
2. Back up MakerVault and review the supported engine/image version and binary provenance.
3. Uncomment the optional slicing service in `compose.yaml` and enter the documented worker authentication and storage settings.
4. Run `docker compose config --quiet` to validate the configuration, then `docker compose up -d`.
5. Use **Slicer → Engine management** (planned) to explicitly install a verified supported engine and version.
6. Confirm worker/engine health in MakerVault, then select and verify engine-native machine, filament and process presets.
7. Slice a known test model, inspect the resulting G-code, and only then evaluate printer submission.

**These are release acceptance steps, not currently executable instructions.** Exact configuration keys, verified images, health commands, permissions and screenshots will be added after a full end-to-end implementation and testing.

## Installation is optional

If the worker is absent, MakerVault's navigation disables **MakerVault Slicer**, and **3D Printing** shows **No slicer installed or enabled** with a guidance link. Models, G-code, printer monitoring and other 3D Printing functions are unaffected.

For an enabled but unhealthy/invalid worker the app instead reports **Slicer service unavailable**. See [Troubleshooting](troubleshooting.md).

## Maintenance and rollback

See [Update MakerVault](../administration/updates.md) for the base application. The future optional service will have its own explicit engine update and rollback process in [Manage slicing engines](engines.md); simply updating the main app will not silently download slicer engines.
