<div class="guide-hero" markdown>
<span class="eyebrow">MakerVault / User guide</span>

# Your workshop, organised.

Learn to install MakerVault, record what you own and bring your projects, files and 3D printing together. Start with one project. Add the rest when you need it.

[Start here](getting-started/before-you-begin.md){ .md-button .md-button--primary }
[Follow the guided workflow](getting-started/first-project.md){ .md-button }
</div>

## What is MakerVault?

MakerVault is a **self-hosted workshop management application for makers, electronics projects and 3D printing**. It gives you one place to keep track of the things you own, the things you are building, the files that belong to those projects and the physical output from them.

Instead of keeping board details in browser bookmarks, stock counts in a spreadsheet, project notes in one folder, STL files in another and printer information somewhere else, MakerVault links those records together while keeping each type of information distinct.

<div class="guide-grid" markdown>
<div class="guide-card" markdown>
### What it manages
Boards and components, physical inventory, projects and BOMs, files and revisions, wiring diagrams, printers, catalogue-matched filament products and physical spools, models, print history, printed parts and physical Maker Tags.
</div>
<div class="guide-card" markdown>
### How it works
MakerVault runs on your own server with Docker and is used through a normal web browser. PostgreSQL stores structured records, private files stay with your installation, and optional integrations can connect supported printers and filament services.
</div>
<div class="guide-card" markdown>
### Why use it
It reduces the friction of answering questions such as *Where did I put that board?*, *Do I already own this part?*, *Which file belongs to this project?*, *What filament is loaded?* and *What did I use to build this?*
</div>
<div class="guide-card" markdown>
### You stay in control
MakerVault is designed to be useful without requiring a cloud account. Start with inventory and projects, then enable features such as printer monitoring, cameras, OIDC, Spoolman or Maker Tags only when they are useful to you.
</div>
</div>

### The basic idea

MakerVault separates **reference information** from **your physical things** and **your work**:

- the **Catalogue** describes what a board or component *is*;
- **Inventory** records the individual items or quantities you actually *own*;
- a **Project** describes what you are building and its requirements;
- a **BOM allocation** reserves real inventory for that project without silently changing the stock total;
- **Files, models and wiring** preserve the digital context of the build;
- **Print history, printed parts and Maker Tags** connect digital work back to physical objects where you choose to track them.

That separation is what lets MakerVault grow from a simple parts list into a useful history of your workshop without turning everything into one large spreadsheet.


!!! info "How MakerVault is developed"
    MakerVault is coded entirely through AI systems under human direction. Feature ideas, product decisions, hands-on acceptance checks, bug finding and practical testing are performed by the human maintainer. Support and future fixes therefore depend on the capabilities of the available AI tooling plus reproducible reports and human validation. See [scope and verification](reference/about.md) for more detail.

<div class="guide-search" data-guide-search role="search" aria-label="Search the MakerVault guide">
  <div class="guide-search__heading">
    <div>
      <span class="guide-search__eyebrow">Find help quickly</span>
      <h2>What are you trying to do?</h2>
    </div>
    <kbd>/</kbd>
  </div>
  <label class="guide-search__field">
    <span class="sr-only">Search the MakerVault guide</span>
    <span class="guide-search__icon" aria-hidden="true">⌕</span>
    <input
      type="search"
      autocomplete="off"
      placeholder="Try “backup”, “CFS”, “OIDC”, “.env” or an error message…"
      data-guide-search-input
      aria-controls="guide-search-results"
      aria-autocomplete="list"
    >
  </label>
  <div class="guide-search__chips" aria-label="Popular searches">
    <button type="button" data-guide-search-query="install">Install</button>
    <button type="button" data-guide-search-query=".env">.env</button>
    <button type="button" data-guide-search-query="backup restore">Backup & restore</button>
    <button type="button" data-guide-search-query="3D printing">3D printing</button>
    <button type="button" data-guide-search-query="OIDC">OIDC</button>
    <button type="button" data-guide-search-query="troubleshooting">Troubleshooting</button>
  </div>
  <p class="guide-search__status" data-guide-search-status aria-live="polite">
    Loading the guide search…
  </p>
  <div id="guide-search-results" class="guide-search__results" data-guide-search-results></div>
</div>

!!! info "Current release: v1.0.0 · Stable"
    MakerVault v1.0.0 is the current tagged stable release. This guide also tracks accepted post-v1 fixes being prepared for the next patch release, including richer filament catalogue matching and the K2 same-origin camera path. The v1 acceptance gates include representative off-server recovery, a fresh Debian/Docker installation, restart/persistence checks, native HTTPS with the MakerVault Local CA, deployment preflight and final green CI. Experimental printer adapters remain labelled according to their hardware-validation status. See [scope and verification](reference/about.md).

<div class="guide-grid" markdown>
<div class="guide-card" markdown>
### Set up your own server
No previous Docker experience assumed. Understand the few terms you need, install the application and create your first account.

[Installation walkthrough →](getting-started/install.md)
</div>
<div class="guide-card" markdown>
### Use it every day
Find a board, add the units you own, plan a build and keep its files together.

[Inventory and projects →](using/inventory.md)
</div>
<div class="guide-card" markdown>
### Organise 3D printing
Keep track of printers, camera feeds, physical spools, models, print history and explicitly retained printed parts.

[3D printing →](using/printing.md)
</div>
<div class="guide-card" markdown>
### Keep your data safe
Back up the database, uploaded files and encryption key. Learn the update and recovery process before you need it.

[Back up and restore →](administration/backup.md)
</div>
</div>

## Learn by doing

The quickest way to understand how MakerVault's records relate to one another is the [guided newcomer workflow](getting-started/first-project.md). It walks through one small project from catalogue lookup and physical inventory to a BOM, files, optional wiring, a printable model, a retained printed part and a Maker Tag.

You can stop after the core project/BOM/file steps if you do not use 3D printing or tags.

## What MakerVault does

MakerVault is a self-hosted workshop management application. You open it in a web browser; your own server stores the data. You can use it without a printer integration or cloud account.

| What you want to record | Where it belongs | Example |
| --- | --- | --- |
| What a product is | Catalogue | An ESP32 development board and its specifications |
| What you actually own | Inventory | Three boards in drawer A2 |
| What you are building | Projects | A voice-assistant speaker and its bill of materials |
| Digital assets | Files | Firmware, wiring diagram, CAD and instructions |
| What you design and print | 3D Printing | Enclosure revisions, spools, live cameras and retained parts |
| Physical identification | Maker Tags | A QR/NFC/RFID identity linked to a spool or project |
| Connections in a build | Interactive Wiring | A diagram of boards, pins and wires |

Catalogue records are shared reference information. Personal workspaces are separated by account. A project is not currently a shared team folder. [Read about accounts](administration/accounts.md) before setting up a multi-user installation.

## Choose your route

- **New to self-hosting?** Read *Before you begin*, *Install MakerVault* and *First sign-in*, in that order.
- **Someone has already installed it for you?** Start with [First sign-in](getting-started/first-sign-in.md), then follow the [guided newcomer workflow](getting-started/first-project.md).
- **Already comfortable with Docker?** Use the installation settings table and [configuration reference](reference/configuration.md).
- **Want a domain name or single sign-on?** Finish the normal setup first, then visit [reverse proxies](advanced/reverse-proxy.md) and [OIDC](advanced/oidc.md).

Use the interactive search above or the search icon in the header to find a feature, setting or error. Each chapter can also be read as Markdown in GitHub.


<figure markdown>
  ![MakerVault dashboard showing workspace totals and live-printer information.](assets/screenshots/dashboard-overview.png)
  <figcaption>MakerVault v1 release-candidate dashboard.</figcaption>
</figure>
