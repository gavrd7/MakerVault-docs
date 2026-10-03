# MakerVault User Guide

Public documentation for **MakerVault** — a self-hosted electronics inventory, project, file and 3D-printing workspace.

The MakerVault application repository remains private. This repository contains the public user guide and the MkDocs/GitHub Pages configuration used to publish it.

## Current edition

This guide documents **MakerVault v0.9.0.2**.

It covers the current pre-v1 application, including:

- beginner-friendly Docker installation and `.env` configuration;
- Docker volumes, bind mounts, backups and restore;
- Dashboard, Universal Search, Board Catalogue, Components and Inventory;
- Projects, BOM allocation, Files and versioned assets;
- 3D Printing, filament/spools, model library, 3D viewer, print history and Printed Parts;
- live printer monitoring, optional controls and camera feeds;
- Maker Tags and Interactive Wiring;
- user accounts, MFA, passkeys, local sign-up, password recovery and storage quotas;
- Spoolman, Creality, SimplyPrint and manufacturer-specific printer integrations;
- advanced reverse-proxy, HTTPS and OpenID Connect configuration.

The application is still pre-v1, so documentation will continue to evolve with MakerVault releases.

## Read the guide

**https://gavrd7.github.io/MakerVault-docs/**

## Repository layout

- `docs/guide/` — public guide source
- `docs/guide/assets/` — guide styling, logo and sanitised screenshots
- `mkdocs.yml` — navigation and Material for MkDocs configuration
- `scripts/check_guide_links.py` — generated-site link and fragment validation
- `.github/workflows/guide.yml` — validation and GitHub Pages deployment workflow

## Build locally

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r docs/requirements.txt
python -m mkdocs build --strict
python scripts/check_guide_links.py
python -m mkdocs serve
```

See [docs/GUIDE_MAINTENANCE.md](docs/GUIDE_MAINTENANCE.md) for maintenance and publishing guidance.

## Screenshots

Public screenshots are sanitised before publication to remove private addresses, account details, credentials and local-network endpoints while retaining useful example data.

## Application source

The MakerVault application source is intentionally kept in a separate private repository. This documentation repository does not contain the application itself.
