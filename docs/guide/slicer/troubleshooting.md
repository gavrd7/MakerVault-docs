# Slicer troubleshooting

This page is for the optional MakerVault Slicer. Core models, G-code storage and printer monitoring work without it. For general issues see [MakerVault troubleshooting](../reference/troubleshooting.md).

| Message or symptom | Check |
| --- | --- |
| **No slicer installed or enabled** | Expected if you did not opt in. Other printing features remain available. |
| **Slicer service unavailable** | Confirm the isolated worker is enabled, healthy and authenticated; verify its pinned image and engine executable. |
| **Could not check slicer availability** | Confirm application and worker reachability, credentials and bounded container logs. |
| **Missing or incompatible profiles** | Use profile search/import for the exact engine/version; verify required machine/process/filament parents, nozzle and build plate. |
| **Slice rejected or failed** | Review the job's safe error detail, input file/mesh limits and selected native profile; avoid disabling safety gates. |
| **Paint or filament change not in G-code** | Check native profile capability, logical slot assignments, actual machine topology and engine-specific painting support. Preview colours alone do not create filament changes. |
| **Flushing/prime output differs** | Verify the active native multi-material configuration and exported G-code. Do not treat an offline multiplier change as proof of printer compatibility. |
| **Upload/start is unavailable** | Confirm the printer adapter, confirmed physical slot mapping, printer status and separate print authorisation. Slicing support is not the same as printer dispatch support. |

## Safe checks

For a known **staging** worker, use `sudo python3 scripts/install_slicer_staging.py status` from the correct MakerVault checkout. Do not run staging installation on production, expose `.slicer-staging.env`, paste tokens into reports or substitute unchecked slicer binaries. Keep a backup and retain existing named volumes when changing Compose services.

When requesting help, report the app commit, worker/engine version, selected printer topology, native profile source and safe redacted job error. Avoid sharing private G-code or printer addresses unless necessary.

See [Installation](installation.md), [Engines and profiles](engines.md), and [Prepare, paint and slice](workbench.md).
