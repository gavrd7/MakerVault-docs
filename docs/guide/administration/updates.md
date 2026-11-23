# Update MakerVault

**Goal:** move to the current deployable release while keeping a recoverable copy of your data.

MakerVault can be updated either by pulling the published GHCR image or by rebuilding from source. Use the same route you chose for installation unless you deliberately want to switch.

1. Read the release notes/CHANGELOG for changes since your installed version.
2. If upgrading from before v0.7, read [the migration chapter](../advanced/legacy-upgrade.md) first.
3. Make and verify a [complete backup](backup.md), including media and keys.
4. Keep your existing `.env`; never overwrite it with `.env.example`.

## Recommended: update the pre-built GHCR image

From your MakerVault checkout:

```bash
git status --short
git rev-parse HEAD
git fetch --prune origin
git switch main
git pull --ff-only origin main
sudo docker compose pull
sudo docker compose up -d
sudo docker compose ps
sudo docker compose logs --tail=100 makervault
```

`docker compose pull` downloads the current MakerVault image and any newer PostgreSQL/Redis image allowed by the Compose file. `docker compose up -d` then recreates only what needs changing.

If you pin `MAKERVAULT_IMAGE` in `.env`, change that value to the release you intend to run before pulling. For example:

```dotenv
MAKERVAULT_IMAGE=ghcr.io/gavrd7/makervault:1.7.0
```

## Build-it-yourself update

The application supports source builds through the same **`compose.yaml`**. With `MAKERVAULT_IMAGE=makervault-local:dev` in your private `.env`:

```bash
git status --short
git fetch --prune origin
git switch main
git pull --ff-only origin main
sudo docker compose pull makervault
sudo docker compose up -d
sudo docker compose ps
```

If `git status --short` shows local changes, preserve them before switching branches or pulling.

## Upgrading with the slicer service

For installations using the verified combined slicer, use the **single Compose file** and retain its `slicer` profile:

```bash
sudo docker compose config --quiet
sudo docker compose pull makervault postgres redis
sudo docker compose up -d
sudo docker compose ps
```

For a local app build, run `sudo docker compose pull makervault` first. Engine updates and version switches are separate, administrator-initiated actions and must preserve other engines, profiles and stored G-code.

Older deployment examples used several Compose overlays. Those files are retired for v1.7.0; review your actual private environment, named volumes, existing engine store and custom host settings before switching to the one-file configuration. Never run `docker compose down -v`: it can erase persistent MakerVault and slicer data.

## Check the result

Sign in, confirm the version, open a project, download a private file and inspect integrations.

`docker compose restart` does not pull a new image, rebuild source or reload changed environment settings.

## If an update fails

Read the application logs first. Preserve the original backup and avoid repeated destructive experiments. If you need to return to an earlier version, restore the matching database, files, key and configuration with that earlier application version on a clean target. Older code may not understand an upgraded database.
