# MakerVault User Guide

This repository publishes the public user documentation for **MakerVault**, a self-hosted makerspace inventory, project and 3D-printing management application.

The application source remains in the private `gavrd7/MakerVault` repository. This repository intentionally contains only documentation source and the files required to build the documentation website.

## Current documentation edition

The initial public guide is the **v0.7.0.1 documentation baseline**, originally reviewed and merged in MakerVault PR #31 on 29 September 2026. MakerVault has continued to evolve since that edition, so newer application features may not yet be documented here.

## Read the guide

Once GitHub Pages is enabled and the deployment workflow has completed, the guide is published at:

https://gavrd7.github.io/MakerVault-docs/

## Build locally

```bash
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r docs/requirements.txt
python -m mkdocs serve
```

For a strict validation build:

```bash
python -m mkdocs build --strict
python scripts/check_guide_links.py
```

## Documentation maintenance

See [docs/GUIDE_MAINTENANCE.md](docs/GUIDE_MAINTENANCE.md) for editing, validation and publishing guidance.

## Licence

Documentation is provided as part of the MakerVault project. Application licensing and third-party notices are maintained with the MakerVault application project.
