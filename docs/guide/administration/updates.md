# Update MakerVault

**Goal:** move to the current deployable release while keeping a recoverable copy of your data.

MakerVault uses published application and slicer images from GHCR, managed by one Compose file.

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

## Upgrading with MakerVault Slicer

The standard `compose.yaml` includes four long-running services: MakerVault, its separate slicer container, PostgreSQL and Redis. No local builds, extra Compose files or profiles are needed.

```bash
sudo docker compose config --quiet
sudo docker compose pull
sudo docker compose up -d
sudo docker compose ps
```

Installed native engine binaries and their registry persist in the separate engine-store volume. Updates to MakerVault and its combined slicer image do not automatically authorise changing engine versions; use the engine manager for approved changes.

**Older staging deployments:** the previous Compose overlays are retired. Before upgrading, identify your existing private `.env`, any `.slicer-staging.env`, Docker volumes and installed engine identities. Preserve everything and verify the combined release image and permissions before removing legacy services. Do not run `docker compose down -v`: it can erase database, media, keys and slicer engine storage.

## Check the result

Sign in, confirm the version, open a project, download a private file and inspect integrations.

`docker compose restart` does not pull a new image, rebuild source or reload changed environment settings.

## If an update fails

Read the application logs first. Preserve the original backup and avoid repeated destructive experiments. If you need to return to an earlier version, restore the matching database, files, key and configuration with that earlier application version on a clean target. Older code may not understand an upgraded database.
