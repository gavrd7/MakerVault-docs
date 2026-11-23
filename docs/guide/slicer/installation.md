# Install the MakerVault Slicer service

MakerVault uses **one** `compose.yaml` for published-image installations, source builds and the optional slicer. There are no additional supported Compose overlay files.

The base installation starts three long-running containers: **MakerVault**, **PostgreSQL** and **Redis**. Enabling the `slicer` profile adds a fourth, **`makervault-slicer`**, which runs an isolated worker and native-engine installer as distinct processes with separate credentials and restricted user IDs. An engine-store permission helper runs and exits; it is not a fifth permanent service.

## Before enabling

1. Install MakerVault from the [Linux guide](../getting-started/install.md), and [back up](../administration/backup.md) existing data before changing a running installation.
2. Preserve your existing `.env`, media, keys, database, backups and any installed engine volume. Never overwrite an existing `.env` with `.env.example`.
3. Configure **different, strong** worker and installer tokens, an independently reviewed immutable combined worker image and the exact supported engine identities/checksums in your private `.env`. See [Environment configuration](../getting-started/environment.md).
4. Enable slicer preview/execution only after the image, credentials, native engine and profile requirements are verified. Do not use placeholder secrets or fabricated digests.

The combined runtime and native engines still have to be published and verified for the actual release platform. A Compose file alone is not an engine installation, and a passing configuration check is not evidence of printer compatibility.

## Start the slicer

From the MakerVault checkout containing the release `compose.yaml`:

```bash
sudo docker compose --profile slicer config --quiet
sudo docker compose --profile slicer up -d
sudo docker compose --profile slicer ps
```

The main application and the combined slicer are connected on an internal network. The isolated worker and installer endpoints are not published to the host. Do not grant the MakerVault application the Docker socket, access to printer credentials inside the worker, or unnecessary privileges.

The first start may perform a **one-time** engine-volume permissions operation. The regular four-service count excludes its completed helper. Engine installation is administrator-initiated from the MakerVault Slicer engine-management interface.

## Install or switch native engines

Open **MakerVault Slicer → View engine installations**. Review the engine, version and source, then explicitly choose **Install**, **Update**, **Switch** or **Uninstall** as supported. MakerVault checks the source/identity and stores installed versions in a persistent engine volume. Set up matching native printer, process and filament presets before slicing.

The service may contain several verified engines; you do **not** have to install OrcaSlicer in order to use Creality Print or Bambu Studio.

## Updates and existing installations

With an installed slicer, retain the profile in normal Compose operations:

```bash
sudo docker compose --profile slicer config --quiet
sudo docker compose --profile slicer up -d
```

Do not silently replace installed engine binaries when upgrading MakerVault itself. Engine version changes require independent verification and explicit administrator action. See [Update MakerVault](../administration/updates.md).

Older development checkouts used `compose.build.yaml`, `compose.slicer.yaml` and `compose.slicer.staging.yaml`. These are **retired**. If you previously used them, back up and review existing private staging credentials, custom service overrides, image references and persistent volumes before adopting the one-file deployment. Never run `docker compose down -v` as an upgrade step.

## If the slicer is unavailable

Check `sudo docker compose --profile slicer ps`, the worker's health, its approved image identity, separate tokens and native engine registry. Other MakerVault features remain operational even if no slicer engine is installed. See [Troubleshooting](troubleshooting.md).
