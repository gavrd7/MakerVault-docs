# Slicer troubleshooting

MakerVault's Model Library, printer monitoring and G-code management work without an installed slicer engine. The slicer is available when the optional combined container and selected native engine are configured and healthy.

| Symptom | What to check |
| --- | --- |
| **No slicer installed or enabled** | Enable the `slicer` profile in the single `compose.yaml`; use approved credentials and a reviewed worker image |
| **Slicer service unavailable** | Container health, private network, installer/worker tokens, immutable image identity and engine registry |
| **Engine missing / Install failed** | Exact native engine version, approved source and SHA-256; installer UID's access to persistent engine storage |
| **No compatible profiles** | Engine/version match, machine/nozzle topology, native parent dependencies and profile source |
| **Model invalid / Slice rejected** | Mesh and 3MF integrity, material assignments, native settings and bounded model limits |
| **Paint not reflected in G-code** | Actual native binary capabilities, selected facet/support/seam/fuzzy settings and tool assignments; visual paint alone is not proof |
| **Unexpected variable layers** | Real G-code Z increments versus requested heights; unsupported requests can be rejected |
| **Unexpected flush or prime tower** | Native material changer mode, directional volumes, multiplier, tower placement and firmware commands |
| **Device returns to dashboard** | Use a release containing the slicer's in-place Device modal; closing it should retain your workbench |
| **Upload / Start unavailable** | Compatible printer adapter, printer state, firmware, material/tool mapping and separate print authorisation |

## Safe checks

On the host in the MakerVault checkout:

```bash
sudo docker compose config --quiet
sudo docker compose --profile slicer config --quiet
sudo docker compose --profile slicer ps
sudo docker compose --profile slicer logs --tail=100 slicer-worker
```

These checks do not start a print. Do not disable identity checks, grant the web app Docker-socket access, use a sample worker image as if it were approved, or run `docker compose down -v` to troubleshoot.

If upgrading from earlier staging/development releases, the old multiple Compose overlays have been retired. Review your private `.env`, former `.slicer-staging.env`, installed engine volume and custom Compose settings before switching. The [single-Compose installation guide](installation.md) and [MakerVault update guide](../administration/updates.md) explain the migration safety boundaries.

When reporting a problem, include the MakerVault version/commit, exact slicer engine/version, printer model/topology, non-secret worker diagnostics and what native G-code did or did not contain. Redact accounts, file names, host addresses and tokens.
