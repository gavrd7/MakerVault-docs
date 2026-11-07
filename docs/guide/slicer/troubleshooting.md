# Slicer troubleshooting

This page covers the optional slicing service. For general application problems, see [MakerVault troubleshooting](../reference/troubleshooting.md).

| Message | Meaning | First check |
| --- | --- | --- |
| No slicer installed or enabled | The optional service was not enabled. | This is expected if you did not choose to install the slicer. |
| Slicer service unavailable | Execution was enabled, but no healthy, approved engine worker was verified. | Worker status, engine/version approval, credentials and binary/image identity. |
| Could not check slicer availability | The app could not confirm the worker state. | Browser/network connection and server logs. |
| Profile unverified | The imported native preset has not passed approval. | Exact engine/version, parent preset dependencies and fixture receipt. |
| No compatible engine | A selected engine is not installed, supported or approved. | Install/verify that specific engine; unrelated engines should remain available. |

## Safe diagnosis

- Confirm ordinary MakerVault 3D Printing functions work before changing slicer settings.
- Do not paste secrets from worker/environment configuration into reports.
- Review container status and bounded application logs; do not download unverified binaries to bypass a failed check.
- Keep printer submission separate from slicing. An unsuccessful slice must never start a print or deduct filament.

Specific commands and screenshots will be added after the final single-container design and engine management workflow pass acceptance testing.
