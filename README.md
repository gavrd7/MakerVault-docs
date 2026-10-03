# MakerVault User Guide

Public documentation for **MakerVault** — a self-hosted electronics inventory, project, file and 3D-printing workspace.

The MakerVault application repository remains private. This repository contains the public user guide and the MkDocs/GitHub Pages configuration used to publish it.

## What is MakerVault?

**MakerVault** is a self-hosted workshop management application for electronics, maker projects and 3D printing. It is intended to replace the collection of spreadsheets, folders, bookmarks and disconnected tools that often build up around a home workshop.

At its core, MakerVault connects:

- **catalogue data** for boards and components;
- **physical inventory** for the items you actually own;
- **projects and BOMs** for what you are building and what each build requires;
- **files, revisions and wiring diagrams** for the digital side of a project;
- **printers, filament, spools, models and print history** for 3D-printing workflows;
- **printed parts and Maker Tags** for linking finished physical objects back to their records.

MakerVault runs on your own server using Docker and is accessed through a normal web browser. Your structured data is stored in PostgreSQL and your files remain with your installation. Optional integrations can add live printer status, camera feeds, filament synchronisation, OIDC sign-in and other capabilities, but the core application does not depend on a cloud service.

The main reason to use MakerVault is to make your workshop easier to understand later. It helps answer practical questions such as **“Do I already own this part?”**, **“Where did I put it?”**, **“Which revision did I print?”**, **“What is allocated to this project?”** and **“Which files and wiring belong to this build?”**

## Current edition

This guide documents **MakerVault v1.0.0**.

It covers the stable v1 release, including:

- beginner-friendly Docker installation and `.env` configuration;
- Docker volumes, bind mounts, backups and restore;
- Dashboard, Universal Search, Board Catalogue, Components and Inventory;
- Projects, BOM allocation, Files and versioned assets;
- 3D Printing, filament/spools, model library, 3D viewer, print history and Printed Parts;
- live printer monitoring, optional controls and camera feeds;
- Maker Tags and Interactive Wiring;
- user accounts, MFA, passkeys, local sign-up, password recovery and storage quotas;
- Spoolman, Creality, SimplyPrint and manufacturer-specific printer integrations;
- reverse-proxy HTTPS plus MakerVault's native HTTPS/Local CA certificate wizard;
- OpenID Connect configuration and SMTP-backed account recovery;
- managed v3 backup/recovery, including TLS identity and replacement-host recovery.

MakerVault v1.0.0 is the first stable release. The mandatory v1 acceptance checks were completed on 3 October 2026, including representative off-server recovery, a fresh Debian/Docker installation, restart/persistence checks, native HTTPS/Local CA validation and final green CI.

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
