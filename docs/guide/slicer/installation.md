# Install the optional slicer service

!!! warning "Staging workflow only"
    The commands below are for a deliberate **Debian x86_64 staging** checkout of [MakerVault PR #171](https://github.com/gavrd7/MakerVault/pull/171). They are **not instructions for a stable production release**. No verified production all-engine installer or browser-operated engine installation is published yet.

The optional worker is separate from the main MakerVault app, database and Redis. Installing it must not require resetting data, reinstalling MakerVault or giving the main web container the Docker socket.

## Before you begin

Make a current [MakerVault backup](../administration/backup.md), confirm host resources and identify the staging checkout. These commands require host Docker administrator access. Do not run them against production or an unrelated branch. The tested staging installer prepares **OrcaSlicer only**; it does **not** install or approve Creality Print or Bambu Studio.

## Enable OrcaSlicer in an existing staging checkout

```bash
cd ~/MakerVault-Staging
git pull --ff-only origin feature/self-hosted-slicer-foundation

# Download and verify the pinned upstream OrcaSlicer release,
# then build the locally isolated worker.
sudo python3 scripts/install_slicer_staging.py prepare-orca

# Add and enable the optional worker with its private Compose overlay.
sudo python3 scripts/install_slicer_staging.py enable

# Confirm the worker configuration and health.
sudo python3 scripts/install_slicer_staging.py status
```

The `status` result shows that the worker is configured and running; it does **not** certify that an arbitrary printer/profile combination produces correct G-code. Open **MakerVault Slicer → View engine installations** and choose compatible native machine, process and filament profiles. Use a small test model, inspect the resulting G-code, and validate printer-specific commands before sending a print.

For a routine staging update **after** installing the worker, use the installer's `enable` step again so its Compose overlay and authentication settings are retained. Using only the base Compose files can inadvertently drop the worker connection.

## Disable the optional worker

```bash
cd ~/MakerVault-Staging
sudo python3 scripts/install_slicer_staging.py disable
```

This removes worker execution without resetting the application's database or G-code library. **Never** run `docker compose down -v` as a way to disable the slicer. Do not share or commit `.slicer-staging.env`; it contains private worker credentials.

## Production installation — not yet actionable

The intended release experience is one optional service/container and independently approved engine installations. A final supported image, exact configuration, upgrade/rollback procedure and administrator UI must be published and tested before providing production commands. Do not uncomment hypothetical services, substitute unreviewed images or grant the web app privileged Docker access to work around missing functionality.

Without a healthy worker, MakerVault's other 3D Printing features continue to work; [troubleshooting](troubleshooting.md) explains the status messages. Refer to [engine selection and profiles](engines.md) once a verified worker is available.
