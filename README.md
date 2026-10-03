# MakerVault User Guide

Public documentation for **MakerVault** — a self-hosted electronics inventory, projects, files and 3D-printing workspace.

The MakerVault application repository remains private. This repository contains only the public documentation source and its MkDocs/GitHub Pages build configuration.

## Current edition

The documentation is being refreshed for **MakerVault v0.9.0.2**. The v0.7.0.1 guide was the original publication baseline; this refresh mirrors the current guide source from MakerVault and adds documentation for post-v0.7 features including Universal Search, Maker Tags, Interactive Wiring, live printer monitoring, printed parts and v0.9 camera feeds.

## Read the guide

https://gavrd7.github.io/MakerVault-docs/

## Build locally

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r docs/requirements.txt
python -m mkdocs build --strict
python scripts/check_guide_links.py
python -m mkdocs serve
```

See [docs/GUIDE_MAINTENANCE.md](docs/GUIDE_MAINTENANCE.md) for maintenance and publishing notes.

## Screenshots

The v0.9 screenshot set is prepared separately from the application source. Public copies are sanitised to remove private addresses, account details and local network endpoints before publication.
