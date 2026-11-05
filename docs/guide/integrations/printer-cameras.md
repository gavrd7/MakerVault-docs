# Printer camera feeds

Configured camera feeds start automatically when their printer card is visible on the dashboard or 3D Printing page. Printer monitoring, print history and filament accounting continue independently of the viewer.

## Set up a feed

1. Open **3D Printing** and find the printer card.
2. Choose **Camera setup** alongside Manage printer. Setup is separate from **Open live**, which shows printer telemetry, and requires edit permission. Select the integration whose camera you want to configure.
3. Select **Find camera sources**. Moonraker reads its webcam configuration; OctoPrint reads its classic webcam settings (the integration API key needs Settings Read). Creality offers K1 and K2 presets; PrusaLink reads its local camera API where supported. Anycubic/FlashForge can reuse recognised HTTP camera URLs from their latest status. K1/K2 playback is owner-confirmed; other hardware and specific route combinations still need testing.
4. Choose a discovered source or enter its name, feed type and full URL manually. Use the same host as the live integration, including any required camera port/path.
5. Save and choose **Done**. The last camera saved becomes the automatic preview on both pages. To use an existing camera instead, select it inside Camera setup and choose **Use selected camera for previews**. A saved source is not proof of a working feed.

The embedded viewer shows the feed and a **Fullscreen** button, with no setup, integration or feed selectors. On browsers without native image fullscreen, Fullscreen opens a page-filling viewer with a Close control. Setup remains a separate printer action.

After adding a live source, an optional second step offers **Add camera** or **Not now**. Choosing Not now leaves monitoring configured and closes the prompt. Camera setup remains available on the printer card.

You can configure up to eight sources per printer integration. Multiple visible printer cards can show their own feeds. Changing the configured preview, disabling its integration, scrolling the card off-screen, hiding the browser tab or leaving the page releases playback resources. Visible dashboard and 3D Printing cards fetch camera media automatically. Camera setup and Open live telemetry are separate; the printing-page previews pause while those dialogs are open. Camera discovery runs only when requested.

## Creality K1 and K2 — native WebRTC via MakerVault

Stock **K1** and **K2** can use the **Creality native camera · WebRTC (K1/K2, experimental)** preset. The maintainer verified **simultaneous K1 and K2 camera previews** in the MakerVault printing interface on 5 November 2026.

In **Camera setup**, select the **Creality local** integration, choose **Camera presets** and select **Creality native camera · WebRTC**. The source address is:

`http://PRINTER_HOST:8000/call/webrtc_local`

Save the source and choose **Use for previews**. MakerVault obtains the printer video session over its local Creality connection, ingests WebRTC through the existing compatibility relay, and serves authenticated **same-origin HLS/fMP4** video to the browser. The browser need not reach the printer's raw camera port; the MakerVault server must reach it. The relay must be available for playback.

**Clean stock K1 firmware may show live video in Creality Print while port 8080 MJPEG is unavailable.** Use the native WebRTC preset in that case. Installing Helper Script or rooting the K1 is not required to use MakerVault's existing relay.

### Legacy K1 MJPEG / Helper Script routes

Where the relevant camera service is installed, MakerVault also supports:

- Direct MJPEG: `http://PRINTER_HOST:8080/?action=stream`
- Direct snapshot: `http://PRINTER_HOST:8080/?action=snapshot`
- Helper Script / Fluidd: port `4408`, `/webcam/?action=stream` or `snapshot`
- Helper Script / Mainsail: port `4409`, `/webcam/?action=stream` or `snapshot`

These sources return bounded, refreshed JPEG frames (approximately one frame per second). Legacy options remain available, but a camera preset does **not** prove its service is running. A clean firmware installation can remove those third-party services without affecting the native camera.

## Providers and extension framework

Discovery providers produce the same validated source contract: name, playback mode, URL, rotation and flips. Provider guidance, candidates and rejection reasons are separate from configured sources and hardware verification. Adding a provider reuses the existing permission checks, URL restrictions and playback lifecycle. A native transport needs its own implementation and tests; adding a registry entry alone does not make it playable.

| Integration | Discovery / native route | Current boundary |
| --- | --- | --- |
| Creality | K1/K2 native WebRTC ingestion → same-origin HLS/fMP4; legacy K1 MJPEG/Helper Script presets | K1/K2 playback owner-tested; broader firmware/browser matrix still experimental |
| Moonraker / Klipper; Elegoo, QIDI, Sovol, Snapmaker, Voron profiles | Moonraker webcam configuration | HTTP snapshots/MJPEG only; Klipper needs an external camera service |
| OctoPrint | Default webcam settings, including orientation | Falls back to usable stream when the configured snapshot is localhost; does not fetch MakerVault localhost |
| Prusa | PrusaLink `GET /api/v1/cameras`, then `GET /api/v1/cameras/{camera_id}/snap` | Experimental; only PrusaLink versions exposing this API; API-key authentication; reads latest stored image, does not trigger captures or import Connect cloud cameras |
| Anycubic / FlashForge | Recognised HTTP image/MJPEG URL from latest manufacturer telemetry | No camera URL refresh until printer monitoring updates; unknown formats, RTSP, other hosts and embedded credentials are rejected with guidance |
| Bambu Lab | Manual same-host HTTP source if separately available | Native Bambu camera transport/relay not implemented |
| SimplyPrint | Manual local feed; alternative local integration where supported | Cloud camera access not implemented |
| Other | Manual HTTP source | No guessed manufacturer endpoints |

For printers exposing Moonraker or OctoPrint alongside a manufacturer interface, add that live integration to the same printer and set up its camera there. Camera viewing does not require enabling printer controls. The owner confirmed K1 and K2 camera playback and accepted the compact automatic preview layout on 2 October 2026; the K2 same-origin relay was also accepted in hands-on testing on 4 October 2026. Broader firmware/browser/account-isolation coverage remains part of the experimental validation boundary. Other manufacturers and remaining lifecycle/security checks remain pending in issue #37.

## Security and troubleshooting

HTTP images use authenticated, owner-scoped MakerVault routes, so HTTP printer cameras can be viewed from an HTTPS MakerVault deployment without mixed-content image requests. Source URLs, query tokens and camera session tokens are excluded from ordinary connection summaries and copied diagnostics. Owners with edit permission can inspect the URLs in camera setup.

Camera requests stay on the configured printer host. Loopback, link-local, unspecified, multicast and reserved IP targets are rejected; DNS is resolved and pinned before connecting. Redirects are rejected. HTTPS certificates are verified. Existing API keys accompany only requests to the original API origin, never a different camera port. Embedded URL credentials and separate camera Basic/Digest login are not supported in this first pass.

Responses have byte, image-dimension and network timeout limits. A per-user request guard prevents overlapping camera proxy work; media requests from multiple visible feeds are queued in the browser tab. Failed image requests retry twice and then stop until Reconnect is selected. Responses are private and not cached. Changing a camera hostname may require updating its integration hostname first.

If discovery is empty, choose the native WebRTC preset or configure an exact supported camera URL manually. Unsupported HLS, RTSP and generic WebRTC sources are not treated as MJPEG. Separate camera hosts, cloud feeds and media relay/transcoding remain follow-up work. Unsupported camera interfaces remain unavailable even if telemetry reports camera hardware.

## Hardware checklist

- Retest K1/K2 native WebRTC across representative firmware/browsers and confirm K2 behaviour is preserved; test K1 direct/Fluidd/Mainsail MJPEG routes on installations that provide those services.
- Confirm an image or video actually appears, and verify orientation and fullscreen at desktop and mobile sizes.
- Scroll previews off-screen/on-screen, hide/show the tab, change the configured camera and leave the page; verify playback is released and printer monitoring continues.
- Test printer offline/reconnect and camera authentication errors.
- Test HTTP feeds and both K1/K2 native WebRTC relay through MakerVault HTTPS/reverse-proxy deployments; ensure the MakerVault server can reach the printer's LAN video service.
- Test PrusaLink API-key snapshot access and freshness; Anycubic/FlashForge reported HTTP sources and unsupported-format guidance; each Moonraker profile and OctoPrint orientation/fallback. Record model, firmware, route and browser.
- Confirm a different MakerVault account cannot list or view the source.

Protocol references: [Moonraker webcams](https://moonraker.readthedocs.io/en/latest/external_api/webcams/), [PrusaLink camera API](https://github.com/prusa3d/Prusa-Link/blob/master/prusa/link/web/cameras.py), [OctoPrint settings](https://docs.octoprint.org/en/main/api/settings.html), [Creality Helper Script camera configuration](https://guilouz.github.io/Creality-Helper-Script-Wiki/configurations/configure-camera/), [go2rtc Creality signalling](https://github.com/AlexxIT/go2rtc/blob/master/internal/webrtc/client_creality.go), and [token-protected K2 protocol reference](https://github.com/geckotdf/Creality-K2-Camera-Fix).


<figure markdown>
  ![Camera setup dialog with a Creality WebRTC source and camera-source controls.](../assets/screenshots/printing-camera-setup.png)
  <figcaption>Camera configuration is kept separate from live monitoring.</figcaption>
</figure>

<figure markdown>
  ![Two printer cards with compact live camera previews.](../assets/screenshots/printing-live-feeds.png)
  <figcaption>Configured cameras can appear on visible printer and dashboard cards.</figcaption>
</figure>
