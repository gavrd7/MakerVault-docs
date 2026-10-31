# Appendix — Build the MakerVault RFID/NFC handheld

This appendix provides a **build overview and validation checklist** for the custom MakerVault RFID/NFC terminal used with **Connected Devices**. It is a companion to the [Connected Devices setup guide](../using/connected-devices.md), which covers Wi-Fi, HTTPS and pairing after assembly.

**Firmware, enclosure designs and build resources:** [gavrd7/MakerVault-Hardware](https://github.com/gavrd7/MakerVault-Hardware).

!!! info "Hardware repository availability"
    MakerVault-Hardware is public and includes current v0.7 firmware source, printable enclosure resources and earlier acceptance records. Check the release assets and build guide for installation details.

## What you're building

The tested prototype is a compact, portrait-format, 3D-printed handheld. You bring its rear RFID antenna to the tag; you **do not** need to set an object on top of the reader.

*A finished-device photograph can be added here once a verified image is committed to this repository.*

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

The enclosure was designed for a approximately **70 × 103 × 34 mm** for the Rev3 master package (approximate; check the model in your slicer) portrait form factor. Printed dimensions depend on the published model revision, printer calibration and material.

## Where to obtain the enclosure files

Use the **Rev3 printable files** in [MakerVault-Hardware’s enclosure folder](https://github.com/gavrd7/MakerVault-Hardware/tree/main/hardware/rfid-terminal), now merged into the hardware repository's `main` branch. The design has evolved through several revisions, so do not combine parts from different releases without checking compatibility.

The assembled design uses a front shell and rear shell, a flush display bezel/carrier, internal RC522 supports, a positive-retention ESP32-S3 mounting arrangement, a button carrier and an encoder knob. The reader antenna faces out through the rear plastic; the USB-C port is accessible at the bottom.

The prototype was validated using printed parts and M2 screws into plastic for internal mounts. The M3 heat-set insert trial used a **4.2 mm bore in PLA** with inserts measuring approximately **4.5 mm outside diameter × 5.6 mm length**. This does **not** establish the same bore for PETG, ASA or other materials: print a calibration coupon first.

## Verified wiring — ESP32-S3 SuperMini Rev C.3

These connections use the tested Rev C.3 pinout retained in **v0.7** firmware. The TFT and RC522 share the SPI clock/data pins but have different chip-selects.

| Component / function | Module signal | ESP32-S3 |
|---|---|---|
| Both SPI modules | SCK / clock | **GPIO12** |
| Both SPI modules | MOSI / data in | **GPIO11** |
| RC522 reader | MISO / data out | **GPIO13** |
| RC522 reader | SDA/SS (chip select) | **GPIO10** |
| RC522 reader | RST | **GPIO9** |
| ST7735S display | CS | **GPIO1** |
| ST7735S display | DC / A0 | **GPIO2** |
| ST7735S display | RST | **GPIO43** |
| KY-040 encoder | CLK / DT / SW | **GPIO4 / GPIO5 / GPIO6** |
| Back button | Switched contact → ground | **GPIO7** |
| Confirm button | Switched contact → ground | **GPIO8** |

Supply the **RC522 VCC, TFT VCC and KY-040 +** from **3V3**, and connect their **GND** pins to common ground. The back and confirm buttons are normally open; connect each input to GND when pressed (the firmware enables pull-ups). **RC522 IRQ is not connected.** RC522 “SDA” is its **SPI chip-select** label, not an I²C data line. The ESP32 GPIO48 NeoPixel is on-board and is not a separate external status LED.

On the proven prototype the **TFT BLK backlight connects directly to 3V3** with no external resistor. Current limiting on the specific breakout has **not been independently verified**; do not assume that every ST7735S display tolerates this wiring. Verify the exact module. Inspect all 3.3 V connections and tactile switch terminal pairs before power-on.

[Complete pin-by-pin wiring diagram and electrical notes](https://github.com/gavrd7/MakerVault-Hardware/blob/main/hardware/rfid-terminal/WIRING.md) · [Full BOM](https://github.com/gavrd7/MakerVault-Hardware/blob/main/hardware/rfid-terminal/BOM.md)

## Suggested build and inspection sequence

1. **Print and dry-fit the enclosure components.** Confirm front/back alignment, the flush TFT window, control clearances, reader clearance and access to the bottom USB-C port before soldering or final assembly.
2. **Install the TFT and bezel.** The non-viewable section of the TFT should sit behind the bezel, leaving the active screen unobstructed.
3. **Fit the encoder and buttons.** Keep the left encoder physically separated from the two right-side buttons. Check that button travel and encoder push operation are not obstructed by the fascia.
4. **Mount the RC522 in the upper rear shell**, with the antenna facing outward. Leave room for wiring without pressing on solder joints or the shell.
5. **Secure the ESP32-S3 near the bottom**, with USB-C aligned to the port cut-out. Verify that inserting a cable cannot push the board inward.
6. **Wire the modules using the pin mapping for the exact firmware/hardware revision.** The RC522 and TFT communicate over SPI, but their chip selects and other GPIO connections must match the tested sketch. **Do not infer wiring solely from this component list.**
7. **Inspect all wiring before applying power.** Confirm correct 3.3 V and ground, no shorts, no pinched wires and correct module voltage requirements. The tested TFT BLK backlight was connected to ESP32 3V3, but independent backlight current-limiting verification is **not available**; follow the exact documented display-module design rather than generalising this connection.
8. **Flash and perform a bench test with the case still open**, then complete final case assembly after the screen, controls and tag detection all pass.

!!! warning "Flash the firmware matched to this Rev C.3 pinout"
    Use the revision-matched `MakerVault_Terminal_Firmware` sketch (firmware v0.7) with the connections above. Do not substitute older experimental GPIO layouts.


## Flashing the terminal (Arduino IDE)

1. Obtain the [sketch source folder](https://github.com/gavrd7/MakerVault-Hardware/tree/main/firmware/rfid-terminal/MakerVault_Terminal_Firmware). Keep the `.ino`, headers and bundled QRCode `.c/.h` files together.
2. Install Arduino IDE 2.x, add Espressif's ESP32 board package and select **ESP32S3 Dev Module**. The recorded successful development setup used Arduino IDE **2.3.10** and ESP32 core **3.3.12**.
3. Set **USB CDC On Boot: Enabled**, partition **Huge APP (3MB No OTA / 1MB SPIFFS)** (for the compatible physical flash size), and Serial Monitor **115200** baud. Install the required Adafruit GFX, Adafruit ST7735, Adafruit NeoPixel and MFRC522 libraries and provide the compatible ESP32CertBundle library/header. Exact external-library versions still need a pinned build record.
4. Plug the terminal in with a USB-C **data** cable, select its serial port, compile/verify, then upload. **Do not use Erase All Flash** on an existing configured/paired terminal; that could remove saved Wi-Fi and trust credentials.
5. Confirm TFT menus, encoder/select, Back/Confirm and reading known RFID/NFC tag UIDs before enclosing the electronics. Then configure Wi-Fi, verified HTTPS and secure pairing in [Connected Devices](../using/connected-devices.md).

Troubleshooting and all flashing options are in the [complete firmware guide](https://github.com/gavrd7/MakerVault-Hardware/blob/main/firmware/rfid-terminal/FLASHING.md).

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

The current physically tested firmware is **v0.7**. The prior v0.5.1.14 maintenance baseline remains documented for historical reference. This firmware corrects the System info, serial-startup and heartbeat version values and was compiled, flashed and functionally checked on the assembled terminal. Its physically tested functionality includes Wi-Fi setup, a local phone configuration page, certificate-verified HTTPS, eight-digit pairing, persistent pairing credentials, heartbeats and offline tag UID detection.

The earlier v0.5.1.13 source and **v0.5.1.14** maintenance update were merged into MakerVault-Hardware `main` ([firmware PR #3](https://github.com/gavrd7/MakerVault-Hardware/pull/3)). The terminal's version display, serial startup version and MakerVault heartbeat reporting have been validated. External Arduino dependency versions are not yet fully pinned and an independent clean-machine build remains outstanding, so do not claim fully reproducible firmware binaries.

Use the terminal's setup access point or LAN QR flow to configure a **2.4 GHz** Wi-Fi network, the MakerVault HTTPS URL and a private Local CA if required. Pair from **Settings → User Account → Connected Devices** using the eight-digit code shown on the terminal. Keep private keys and Wi-Fi credentials out of published source files and photographs.

## Current limitations

At this firmware baseline, the handheld reads physical tag identities but **does not** yet resolve scanned UIDs to MakerVault records, write physical tags, or decode Creality CFS filament payloads. These are future firmware features, even though MakerVault's server APIs can support some related operations.

## Further references

- [MakerVault-Hardware — firmware, printed parts and assembly resources](https://github.com/gavrd7/MakerVault-Hardware)
- [Pin-to-pin wiring diagram](https://github.com/gavrd7/MakerVault-Hardware/blob/main/hardware/rfid-terminal/WIRING.md)
- [Bill of materials](https://github.com/gavrd7/MakerVault-Hardware/blob/main/hardware/rfid-terminal/BOM.md)
- [Rev3 printable enclosure assembly guide](https://github.com/gavrd7/MakerVault-Hardware/blob/main/hardware/rfid-terminal/BUILD_GUIDE.md)
- [Firmware flashing and troubleshooting](https://github.com/gavrd7/MakerVault-Hardware/blob/main/firmware/rfid-terminal/FLASHING.md)
- [Connected Devices — configure and pair the finished terminal](../using/connected-devices.md)
- [MakerVault device pairing protocol](https://github.com/gavrd7/MakerVault/blob/main/docs/CONNECTED_DEVICES_PAIRING.md)


## Connected Maker Tag firmware v0.7

Firmware v0.7 uses `MakerVault_Terminal_Firmware/MakerVault_Terminal_Firmware.ino` and requires MakerVault v1.4.0 for connected Maker Tag workflows. Keep the bundled headers and QRCode source files beside the sketch.

The new functionality includes online MakerTag resolution, UID registration, explicitly confirmed reassignment, cancellation from either device or browser and interrupted-session recovery. It does **not** write NDEF data or Creality CFS sectors. A fresh Verify/Compile and flashing check of the renamed sketch remain release gates; do not assume that passing tests on the historical sketch name validates packaging.


## Terminal firmware v0.7 compatibility

Pair firmware v0.7 with MakerVault v1.4.5 to enable the permission-gated, confirmed NTAG215 URL writer. Use a verified release firmware build with `MAKERVAULT_NDEF_WRITER_EXPERIMENTAL=1`, and check the attached hardware acceptance guide for the approved firmware artifact and safe write procedure. Older firmware keeps ordinary read-only scanning and UID-based association. Never test an NFC writer on valuable CFS or manufacturer-programmed tags.
