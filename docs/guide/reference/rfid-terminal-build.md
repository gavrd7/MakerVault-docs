# Appendix — Build the MakerVault RFID/NFC handheld

This appendix provides a **build overview and validation checklist** for the custom MakerVault RFID/NFC terminal used with **Connected Devices**. It is a companion to the [Connected Devices setup guide](../using/connected-devices.md), which covers Wi-Fi, HTTPS and pairing after assembly.

**Firmware, enclosure designs and build resources:** [gavrd7/MakerVault-Hardware](https://github.com/gavrd7/MakerVault-Hardware).

!!! info "Hardware repository availability"
    MakerVault-Hardware is currently **private** and is planned to become public after the tested firmware source, build instructions, dependencies and licensing are finalised. Until then, the link may show a 404 to visitors without access. **Do not assume the hardware ZIP or a fully reproducible firmware build has already been published.**

## What you're building

The tested prototype is a compact, portrait-format, 3D-printed handheld. You bring its rear RFID antenna to the tag; you **do not** need to set an object on top of the reader.

![Completed MakerVault handheld](../assets/screenshots/connected-devices/terminal-enclosure.jpg)

The terminal has an upper front TFT display, a rotary encoder on the left, separate Back and Confirm buttons on the right, a rear-mounted RFID antenna and bottom-facing USB-C connection.

## Main components

| Component | Validated hardware baseline | Purpose |
|---|---|---|
| Microcontroller | ESP32-S3 SuperMini | Firmware, 2.4 GHz Wi-Fi and USB-C |
| RFID/NFC reader | MFRC522 / RC522 SPI module | MIFARE Classic and NTAG215 UID scanning |
| Display | 1.44-inch ST7735S, 128 × 128 SPI TFT | Menus, setup QR and connection status |
| Controls | KY-040 rotary encoder with push switch | Navigate and select |
| Buttons | Two 12 × 12 mm tactile switches | Back and Confirm |
| Enclosure | Custom two-part printed handheld, front bezel, internal supports, encoder knob and button parts | Mounting and handling |
| Fasteners | M2 machine screws for internal printed mounts; M3 heat-set inserts for the enclosure | Internal retention and case closure |
| Wiring | Appropriate insulated wires, solder, USB-C power/data cable | Electrical assembly and flashing |

The enclosure was designed for a roughly **70 × 103 × 24 mm** portrait form factor. Printed dimensions depend on the published model revision, printer calibration and material.

## Where to obtain the enclosure files

Use the **latest validated master files in MakerVault-Hardware** when they become available. The design has evolved through several revisions, so do not combine parts from different releases without checking compatibility.

The assembled design uses a front shell and rear shell, a flush display bezel/carrier, internal RC522 supports, a positive-retention ESP32-S3 mounting arrangement, a button carrier and an encoder knob. The reader antenna faces out through the rear plastic; the USB-C port is accessible at the bottom.

The prototype was validated using printed parts and M2 screws into plastic for internal mounts. The M3 heat-set insert trial used a **4.2 mm bore in PLA** with inserts measuring approximately **4.5 mm outside diameter × 5.6 mm length**. This does **not** establish the same bore for PETG, ASA or other materials: print a calibration coupon first.

## Suggested build and inspection sequence

1. **Print and dry-fit the enclosure components.** Confirm front/back alignment, the flush TFT window, control clearances, reader clearance and access to the bottom USB-C port before soldering or final assembly.
2. **Install the TFT and bezel.** The non-viewable section of the TFT should sit behind the bezel, leaving the active screen unobstructed.
3. **Fit the encoder and buttons.** Keep the left encoder physically separated from the two right-side buttons. Check that button travel and encoder push operation are not obstructed by the fascia.
4. **Mount the RC522 in the upper rear shell**, with the antenna facing outward. Leave room for wiring without pressing on solder joints or the shell.
5. **Secure the ESP32-S3 near the bottom**, with USB-C aligned to the port cut-out. Verify that inserting a cable cannot push the board inward.
6. **Wire the modules using the pin mapping for the exact firmware/hardware revision.** The RC522 and TFT communicate over SPI, but their chip selects and other GPIO connections must match the tested sketch. **Do not infer wiring solely from this component list.**
7. **Inspect all wiring before applying power.** Confirm correct 3.3 V and ground, no shorts, no pinched wires and correct module voltage requirements. The tested TFT BLK backlight was connected to ESP32 3V3, but independent backlight current-limiting verification is **not available**; follow the exact documented display-module design rather than generalising this connection.
8. **Flash and perform a bench test with the case still open**, then complete final case assembly after the screen, controls and tag detection all pass.

!!! warning "Pinout and firmware build reproducibility"
    This appendix deliberately does **not** publish an unverified GPIO pin table or claim that the current GitHub repository contains the exact tested sketch. Refer to the hardware repository's **revision-matched firmware and wiring documentation** when released. Never connect a peripheral until its supply-voltage requirements and wiring have been confirmed.

## Bench acceptance checklist

- [ ] The TFT powers up and the home menu is legible.
- [ ] Encoder clockwise/counter-clockwise movement navigates as expected.
- [ ] Encoder push, Confirm and Back work independently.
- [ ] RC522 detects a known MIFARE Classic tag UID.
- [ ] RC522 detects an NTAG215 UID.
- [ ] The USB-C cable can connect and disconnect without moving the ESP32 board.
- [ ] The front and rear shells close without pinching wiring or obstructing the antenna.

Only after these pass, proceed to [configure Wi-Fi, HTTPS trust and secure pairing](../using/connected-devices.md).

## Flashing, networking and security

The tested software baseline is **v0.5.1.13 (release candidate)**. Its physically tested functionality includes Wi-Fi setup, a local phone configuration page, certificate-verified HTTPS, eight-digit pairing, persistent pairing credentials, heartbeats and offline tag UID detection.

The firmware's System info screen and heartbeat metadata may show an outdated version; a subsequent firmware maintenance update is intended to align version reporting. **The exact tested sketch and complete build dependencies must be released in MakerVault-Hardware before treating a downloadable build as reproducible.**

Use the terminal's setup access point or LAN QR flow to configure a **2.4 GHz** Wi-Fi network, the MakerVault HTTPS URL and a private Local CA if required. Pair from **Settings → User Account → Connected Devices** using the eight-digit code shown on the terminal. Keep private keys and Wi-Fi credentials out of published source files and photographs.

## Current limitations

At this firmware baseline, the handheld reads physical tag identities but **does not** yet resolve scanned UIDs to MakerVault records, write physical tags, or decode Creality CFS filament payloads. These are future firmware features, even though MakerVault's server APIs can support some related operations.

## Further references

- [MakerVault-Hardware — firmware, printed parts and assembly resources](https://github.com/gavrd7/MakerVault-Hardware)
- [Connected Devices — configure and pair the finished terminal](../using/connected-devices.md)
- [MakerVault device pairing protocol](https://github.com/gavrd7/MakerVault/blob/main/docs/CONNECTED_DEVICES_PAIRING.md)
