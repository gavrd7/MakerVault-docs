# About this guide

## Version and scope

This guide describes **MakerVault v1.0.2**, the current stable patch release. v1.0.2 adds first-class Windows Docker Desktop/WSL2 installation guidance and fixes printed-part creation so installed parts can remain unassigned until a project/installation is chosen later. It builds on v1.0.1's richer filament catalogue matching/enrichment and K2 same-origin camera compatibility path. The guide documents implemented behaviour while retaining explicit validation boundaries for experimental hardware adapters.

Linux with the supplied Docker Compose configuration remains the preferred always-on server deployment. Windows users can also follow the documented Docker Desktop, Docker Desktop + WSL2 integration, or direct WSL2 Docker Engine routes. NAS/Portainer and macOS remain platform-adaptation cases rather than fully validated walkthroughs. No measured minimum hardware specification is claimed.

## Development model

MakerVault is coded entirely through AI systems under human direction. The human maintainer supplies the feature ideas, product priorities and design decisions, and performs the hands-on acceptance checks, bug finding and practical testing used to validate releases.

This means support, investigation and future fixes are dependent on the capabilities of the available AI tooling as well as the quality of reproducible reports and human testing. Automated CI and AI-generated patches are useful checks, but they are not treated as proof that a real-world problem is solved.

## Verification

Content is checked against the source README, environment example, Compose/entrypoint, authentication settings, storage/recovery implementation and frontend workflows. Documentation build/link checks verify presentation and internal references. The v1 release also completed representative off-server backup/restore and clean-server installation acceptance. Hardware/provider testing remains separate for integrations explicitly marked experimental.

The Nginx configuration is a same-host example, and OIDC uses provider-neutral instructions. Neither is a claim that a specific user's domain, certificate or identity provider has been configured or tested.

## Keep it current

Chapters are Markdown files under `docs/guide`. Navigation and theme live in `mkdocs.yml`. The maintainer workflow is described in `docs/GUIDE_MAINTENANCE.md` in the repository. Update the affected chapter with each feature change, then check the guide version and release checklist.

K1/K2 monitoring and camera playback have owner confirmation, including acceptance of the compact camera layout. Other hardware and route/lifecycle checks remain tracked separately, and unvalidated printer adapters are labelled experimental. Screenshots remain sanitised and complement complete written steps so a small UI change does not make the manual unusable.

## Sources

- [MakerVault application repository](https://github.com/gavrd7/MakerVault)
- [MakerVault documentation repository](https://github.com/gavrd7/MakerVault-docs)
- [Docker Engine installation](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Nginx HTTPS configuration](https://nginx.org/en/docs/http/configuring_https_servers.html)

Repository software is AGPL-3.0-or-later. Third-party media keeps its original licence/provenance; application media attribution is available in **About**.
