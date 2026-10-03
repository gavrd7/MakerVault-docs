# About this guide

## Version and scope

This guide describes **MakerVault v1.0.0-rc.1** and is being reconciled against the current v1 release-candidate source. It documents implemented behaviour, including the native HTTPS/Local CA workflow and managed recovery format v3, but does not claim every deployment or experimental hardware adapter has been validated.

The primary deployment route is Linux with the supplied Docker Compose configuration. Platform-specific NAS/Portainer and Windows/macOS installation walkthroughs are outside this edition's verified scope. No measured minimum hardware specification is claimed.

## Verification

Content is checked against the source README, environment example, Compose/entrypoint, authentication settings, storage/recovery implementation and frontend workflows. Documentation build/link checks verify presentation and internal references. A representative off-server backup/restore rehearsal has been completed; the final stable-v1 acceptance still requires the planned clean-server installation smoke test. Hardware/provider testing remains separate.

The Nginx configuration is a same-host example, and OIDC uses provider-neutral instructions. Neither is a claim that a specific user's domain, certificate or identity provider has been configured or tested.

## Keep it current

Chapters are Markdown files under `docs/guide`. Navigation and theme live in `mkdocs.yml`. The maintainer workflow is described in `docs/GUIDE_MAINTENANCE.md` in the repository. Update the affected chapter with each feature change, then check the guide version and release checklist.

K1/K2 monitoring and camera playback have owner confirmation, including acceptance of the compact camera layout. Other hardware and route/lifecycle checks remain tracked separately, and unvalidated printer adapters are labelled experimental. Before promoting the release candidate to stable v1.0.0, complete the remaining clean-install acceptance pass and keep screenshots sanitised. Screenshots complement complete written steps so a small UI change does not make the manual unusable.

## Sources

- [MakerVault documentation repository](https://github.com/gavrd7/MakerVault-docs)
- [Docker Engine installation](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Nginx HTTPS configuration](https://nginx.org/en/docs/http/configuring_https_servers.html)

Repository software is AGPL-3.0-or-later. Third-party media keeps its original licence/provenance; application media attribution is available in **About**.
