# G-code library and printer submission

MakerVault stores and inspects **plain-text G-code** alongside your workshop files and 3D models. When a compatible printer connection is configured, you can transfer a G-code file without starting it, explicitly upload and start it, or start a file already on the printer. **Slicing still takes place in your slicer**; MakerVault is not a slicing engine.

## Save, inspect and organise G-code

1. Open **Files** and upload a `.gcode` file, optionally associating it with a project.
2. Open the file's **G-code viewer** to inspect the bounded source preview, extracted metadata and top-down XY travel/toolpath samples.
3. If you edit a complete, supported plain-text preview, save the result as a **new file version**. Earlier versions remain available.
4. Use the **Model Library** to attach G-code to a model revision, or open the shared **G-code library** in **3D Printing → Models & print history**.

The preview is an aid to inspection, **not a complete toolpath simulation or a guarantee that the file is safe**. Source may be truncated when the configured analysis limit is reached; editing of an incomplete preview is disabled. Binary `.bgcode` and machine-specific packaged print jobs are not converted into editable text.

## Add a printer connection

Under **3D Printing**, add an owned printer and configure the live connection appropriate for its firmware. Supported file operations depend on the actual **connection adapter**: being able to monitor a printer does not imply being able to upload or start a print.

- **Creality local (stock K1/K2 LAN):** uses the printer's native LAN interface; no Moonraker or Helper Script is needed for stock K1 file browsing, upload or print-start. K1 and K2 use model-specific storage paths and print-start commands.
- **Moonraker / Klipper:** supports the logical `gcodes` storage interface and print-start API on compatible implementations. Elegoo, QIDI, Sovol, Snapmaker and Voron integrations may use this route where their firmware supports Moonraker.
- **OctoPrint:** supports local file browsing, separate upload-only and explicit start.
- **PrusaLink and FlashForge 5M-family:** implemented routes remain experimental and firmware-dependent; unsupported variants fail with an explanatory error.
- **Bambu Lab LAN:** **read-only** file browsing over FTPS is available where a verified certificate fingerprint and compatible firmware are configured. MakerVault does not offer native Bambu file upload or print-start.
- **Other adapters:** monitoring-only or unsupported transfer operations are not silently converted to a different printer protocol.

See [Creality LAN integration](../integrations/creality.md) and [printer adapter validation](../integrations/printer-adapter-validation.md).

## Start print / G-code

From the printer's **Live monitoring** area, choose **Start print / G-code** on the connection you intend to use. The dialog offers three sources:

| Source | What happens |
| --- | --- |
| Upload a new G-code file | Save it privately in MakerVault first, then inspect and submit it through the chosen connection |
| Existing MakerVault G-code | Choose a stored file and select **Upload only** or **Upload and start print** |
| Already stored on the printer | Refresh the printer's file list, select a file and choose **Review & start print** |

**Upload only** sends a file to storage without initiating a print. **Start** always requires an explicit file/printer/action confirmation; merely opening a file, previewing, or refreshing a list never starts printing.

MakerVault verifies the selected file and printer connection, rechecks current printer state before dispatch, and records a durable submission receipt. A confirmed transfer is **not** proof that printing has started. Print-start confirmation depends on correlated live printer telemetry. Where command delivery is uncertain, MakerVault **does not automatically resend it**. Inspect the printer's actual state before attempting another request.

### Compatibility checks

MakerVault inspects available source metadata and the target printer identity. A recognised explicit mismatch, for example G-code sliced for **K2** sent to a **K1**, is blocked from starting. Missing metadata is identified as unknown/unverified rather than treated as an exact match. A preview does not validate every firmware-specific command, material setting, toolhead clearance or physical spool assignment.

Files containing known hazardous firmware-control constructs or exceeding supported inspection limits may be refused. Check filament, temperatures, bed clearance, nozzle and firmware in your slicer before starting any job.

### Creality K1 single-spool printing

Native stock-LAN file browsing and a print-start command were physically tested on a clean K1 installation. The older modified K1 installation repeatedly rebooted when printing was requested by both native controls and the printer touchscreen; the same printer started successfully after a clean firmware installation. That observation does **not** mean every K1 firmware build or configuration is known to be compatible.

K1 native file operations use a different verified storage path and protocol behaviour from the K2. The K1 with no CFS does not show CFS slot assignments. If a firmware change introduces problems, compare operation using the printer's own touchscreen and a known-good file before modifying MakerVault.

### Creality K2 multi-material mapping

For a K2 with a connected CFS, MakerVault can display live CFS slot material/colour alongside the filament requirements extracted from the G-code. When the file includes sufficiently confident tool usage, select the matching physical CFS slot for each used slicer tool before final confirmation. Material mismatches, stale CFS telemetry or unsupported tool counts block mapped start.

The **original sliced mapping** route through a separately configured Moonraker connection is an alternative where available. The proprietary native `colorMatch` and `multiColorPrint` sequence is implemented but **has not yet completed controlled K2 mapped-start hardware validation**; no automatic retry follows an uncertain response. MakerVault does not write the printer's material database or manufacture new material identities.

## Printer storage and file verification

The **Refresh printer storage** action uses the selected connection's supported file-listing API and never uploads or prints. Creality stock LAN lists G-code through the native WebSocket protocol; K1 and K2 storage location details are resolved by printer family. Where another verified and enabled connection belongs to the same physical MakerVault printer record, MakerVault may use it for read-only listing/verification without treating it as permission to start through a different adapter.

File upload and print-start support is deliberately model/firmware-specific; a successful network connection alone is not a file-transfer capability.

## Camera preview while printing

K1 and K2 owners can use **Camera setup → Camera presets → Creality native camera · WebRTC**. MakerVault's compatibility relay serves authenticated, same-origin HLS video to the browser, so the camera's raw LAN port does not need to be published to the browser. On stock K1 firmware, direct MJPEG port 8080 may be unavailable even when Creality Print's live camera works.

Legacy K1 HTTP MJPEG and Helper Script/Fluidd/Mainsail presets are retained for installations that expose them. Choose **Use for previews** for the working source; visible cards automatically display it. See [Printer camera feeds](../integrations/printer-cameras.md).

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Printer file list empty or unavailable | Online native connection, source adapter, firmware support, and whether files exist on the printer |
| Start button unavailable | Use **Refresh K1 readiness** where shown; check recent status, idle state, CFS readiness, and connection permissions |
| Submission reported `unknown` | Verify the actual printer job and filename; the command will not be retried automatically |
| Start rejected as incompatible | Compare the G-code's slicer printer profile against the selected owned printer; re-slice if necessary |
| K1 reboots on start | Test the **same file on the touchscreen**, inspect stock firmware and custom modifications, and preserve printer diagnostics; a MakerVault command is not necessarily the root cause |
| Camera shows Reconnecting | Check configured source, choose native WebRTC on clean K1/K2 firmware, and use the camera setup preview option; legacy MJPEG endpoints may need separately installed camera services |

See [Printer camera feeds](../integrations/printer-cameras.md), [Troubleshooting](../reference/troubleshooting.md), and [Print history and costs](print-history.md).

## Current limitations

- No integrated slicer, printer-side arbitrary G-code console, or automatic spool-stock deduction from estimates.
- Analysis and preview cover bounded **plain-text** G-code, not binary or manufacturer-packed print formats.
- Other printer vendors, firmware releases, CFS variants and some camera routes remain experimental or unsupported even where mock/API tests exist.
- A successful file transfer or command dispatch does not guarantee completed printing; monitor the job and final print history.
