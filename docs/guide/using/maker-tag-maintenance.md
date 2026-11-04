# Clean and remove MakerTags (upcoming feature #159)

!!! warning "Feature-branch preview — not in the v1.5.0 / Terminal v1.0.0 releases"
    These controls are implemented in [MakerVault app PR #165](https://github.com/gavrd7/MakerVault/pull/165) and [Terminal firmware PR #12](https://github.com/gavrd7/MakerVault-Hardware/pull/12). Use **both matching feature branches** on a test installation. The physical cleaning and removal workflows have been tested by the maintainer, but the long-idle HTTPS reconnection improvement is still undergoing extended physical validation. Older published builds do not contain these controls.

**Clean** and **Remove** are deliberately different operations. Choose based on whether you want to erase the physical NFC data, the MakerVault registration, or both.

| Your action | Physical NFC data on tag | Registration and permanent link in MakerVault | Linked inventory record |
| --- | --- | --- | --- |
| **Clean MakerTag** | Erased; independently read back as empty | **Preserved** | Preserved |
| **Remove MakerTag — No cleaning** | Unchanged (old URL may remain) | **Removed**; stored short link no longer resolves | Preserved |
| **Remove MakerTag — Also clean** | Erased and verified **first** | Removed **after** successful physical clean | Preserved |

MakerVault never erases the factory RFID UID, manufacturer pages, capability container, lock bits or device configuration. A cleaned tag may retain the same UID when scanned by an RFID reader; it has **no NDEF URL or other records in the writable NFC user area**.

## Prerequisites

- A securely paired **MakerVault Terminal** running the matching feature-branch firmware and online over trusted HTTPS.
- A registered MakerTag linked to an existing MakerVault record. For NFC cleaning, it must be a **writable, unprotected NTAG215 with a supported seven-byte UID**.
- A device credential with appropriate `tags:write` capability, and a MakerVault account with the necessary MakerTag permissions. Cleaning requires change permission; removal additionally requires **delete MakerTag** permission.
- For web-started cleaning, select the intended paired terminal. Use a spare/reprogrammable tag for initial testing.

!!! danger "Do not use filament manufacturer's RFID tags"
    These cleaning operations are **not** supported for Creality CFS, Bambu Lab, Elegoo or other protected/unknown filament tags. Generic RFID tags may be unlinked from MakerVault without writing to the tag; NFC erasure is restricted to recognised writable NTAG215 MakerTags.

## A. Clean only — started on the terminal

1. Open **Home → MakerTags → Clean MakerTag**.
2. Present the existing **registered** NTAG215. The terminal resolves the current `MV-XXXXXXXX` identity and linked record. If the UID is not registered, it reports **Tag not registered** and does not erase anything.
3. Check the displayed identity and confirm. Present the **same tag** again when prompted; don't substitute a different tag.
4. Keep the tag at the rear reader until the terminal finishes clearing the writable NFC data and independently verifies the pages are empty.
5. The terminal reports **NFC data cleared**. The original MakerTag remains visible in MakerVault with its identity and associated record intact.

The short URL still works **if entered manually**, but a phone will no longer find an NDEF URL on the cleaned physical tag until you write it again. Use the normal MakerTag write workflow to reprogram that same registration later.

## B. Clean only — started in MakerVault

1. Open the existing MakerTag's details in MakerVault.
2. Choose **Clean NFC data** and select the desired paired terminal.
3. Submit the request. The terminal prompts for the **exact tag UID** associated with that MakerTag.
4. Present the tag, confirm on the terminal, and allow it to erase and verify the NFC data.
5. Wait for the web interface to report completion. The MakerTag registration and inventory record are not deleted.

A pending request can be cancelled before its destructive phase. If a tag is missing, wrong, locked or incompatible, the operation must fail without claiming the clean succeeded.

## C. Remove MakerTag — optionally clean first

**From the terminal:** Open **Home → MakerTags → Remove MakerTag**, present the registered tag and choose whether to **clean NFC data too**.

- **No:** Review and confirm removal. The terminal checks the *same UID* again and asks the server to delete the MakerTag registration **without writing to NFC memory**. A phone may still see the old URL on the physical tag, but the link won't resolve to an active MakerTag.
- **Yes:** Confirm that the original physical NTAG215 should be cleaned **and** its registration removed. The terminal wipes and verifies the NDEF memory **before** requesting server-side removal.
- **Back:** Cancel without deliberately changing the tag or registration.

**From the web interface:** Select **Remove MakerTag** in its details. For **registration-only removal**, leave **Also clean NFC data** unchecked. To clean first, enable the option, select the paired terminal, present the bound physical tag and confirm when prompted.

**Removing a MakerTag does not delete the linked inventory item**, project, spool or printed part. Independently registered physical spool RFID UIDs are unaffected.

## Partial completion, connection failures and recovery

- **NFC clean failed or couldn't be verified:** Do not assume the chip is blank. For remove-and-clean, MakerVault retains the MakerTag registration. Inspect the tag and retry deliberately.
- **NFC cleared; MakerTag removal pending:** The physical wipe was verified, but the server deletion is not yet confirmed. The registration still exists; finish or retry the **same** operation once secure connectivity returns. The workflow must not silently repeat the wipe against another tag.
- **Remove without cleaning:** After successful server removal, the physical NDEF data remains untouched by design.
- **Wrong UID / expired or cancelled request:** The original authorisation cannot be reused to erase another tag.
- **Permission or HTTPS error:** Verify both the user's permissions and terminal scopes. Don't bypass certificate verification.

## Consolidated terminal requests (feature branches)

The paired terminal now uses **one authenticated pending-work check approximately every five seconds** for browser-initiated MakerTag registration, NFC writing, RFID lookup and Clean/Remove requests. Previously these used four separate HTTPS polls. This change reduces idle TLS connection churn without altering the security or physical-confirmation process: each accepted operation still verifies its exact UID, server authorisation and completion independently.

**Upgrade the MakerVault application feature branch before flashing the matching firmware**; the unified request requires the new `/api/device/v1/pending-work/` endpoint. Heartbeats and operation-specific safety checks remain separate. The earlier long-idle TLS memory failure is still being investigated through physical testing and serial heap diagnostics.

## Long-idle connection recovery (feature-branch firmware)

If Wi-Fi still shows **Connected** but MakerVault reports a failed secure session, open **Connections → MakerVault → Reconnect server**. The terminal displays **Refreshing Wi-Fi**, followed by **Verifying HTTPS** and **Server connected** or **Reconnect failed**. A temporary **Wi-Fi: offline** state is expected during this deliberate transport reset. On failure, use **OK: retry**; on success, use **OK: done**. The action preserves the saved CA, approved server URL and pairing credential, and is blocked during active tag operations.

The **Test HTTPS** screen is diagnostic; it does not deliberately rebuild the transport. **Connection status** also shows **Heap free** and **Largest block**, useful when investigating long-idle TLS errors such as **SSL memory allocation failed**. After a reproduced failure (free heap falling from roughly 127,564 to 96,488 bytes with the largest contiguous block steady at 31,732 bytes), the firmware was revised to minimise repeated SNTP configuration and idle TLS checks. Those mitigations and the dedicated reconnect screen still need long-idle hardware validation; a successful manual reconnect does **not** prove the underlying memory issue is solved.

## Screenshots

The steps above are complete without additional images. Optional screenshots would improve orientation for new users, especially:

1. The **Remove MakerTag → Clean NFC too?** choice on the terminal.
2. The MakerVault **Clean NFC data / Remove MakerTag** modal with paired-terminal selection.

Only add images after cropping/redacting internal addresses, token-related data, private inventory names and any identifying details. Avoid screenshots of destructive actions appearing to succeed unless the real hardware test completed.
