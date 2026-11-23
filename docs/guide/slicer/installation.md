# Install and manage MakerVault Slicer

MakerVault v1.7.0 includes **`makervault-slicer`**, a separate container supplied through GHCR. The application, slicer, PostgreSQL and Redis are the **four long-running services**. They share one Docker network named `makervault`. Only MakerVault's user-facing web/camera ports are published; slicer, PostgreSQL and Redis remain internal.

## Install the stack

Follow the [Linux installation guide](../getting-started/install.md) for Docker prerequisites and server configuration. On a new checkout, generate your private configuration (including four separate application/database/slicer secrets), review server addresses, and start the standard stack:

```bash
python3 scripts/generate_env_secrets.py
sudo docker compose config --quiet
sudo docker compose pull
sudo docker compose up -d
sudo docker compose ps
```

There are **no Compose profiles, extra YAML overlays or local source builds** in the normal deployment. The slicer worker and engine installer run as separate restricted processes inside the one `makervault-slicer` container. The image provides the initial engine-store volume permissions on a new installation.

**Release image:** `ghcr.io/gavrd7/makervault-slicer:1.7.0` must be published and verified before the v1.7.0 release. The older `0.1.0` image cannot run the combined worker/installer entry point and must not be substituted.

## Install an engine

Open **MakerVault Slicer → View engine installations**. Select an approved OrcaSlicer, Creality Print or Bambu Studio engine/version and use the available **Install**, **Update**, **Switch** and **Uninstall** actions. Choose compatible native machine, process and filament profiles before slicing.

The worker and installer authenticate using two different private tokens. The setup script generates both; there is normally no need to edit them manually. Advanced installations may pin the combined image by digest or add a reviewed native engine identity to `.env`.

## Update safely

Normal updates use the same published images and Compose file:

```bash
sudo docker compose pull
sudo docker compose up -d
sudo docker compose ps
```

Keep your existing `.env`, database, media, encryption key and slicer engine volumes. If you previously used development Compose overlays, read the [upgrade instructions](../administration/updates.md) before changing your running stack. Never use `docker compose down -v` to upgrade.

See [Engines and profiles](engines.md), [Workbench](workbench.md) and [Troubleshooting](troubleshooting.md) for everyday slicing.
