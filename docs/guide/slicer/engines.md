# Slicing engines and native profiles

!!! warning "Beta integration versus production availability"
    [MakerVault PR #171](https://github.com/gavrd7/MakerVault/pull/171) contains OrcaSlicer and Creality Print integrations with staging evidence. This does not mean every downloadable engine is production-approved or installed. [Bambu Studio PR #191](https://github.com/gavrd7/MakerVault/pull/191) is still an early draft; its native Linux binary and worker admission have not passed full acceptance.

## Choose an engine independently of your printer brand

OrcaSlicer and Creality Print each have their **own** engine/version, machine profile, process profile and filament profile. A Creality printer can be sliced with a compatible Orca profile; selecting Creality Print is not mandatory. Do not reuse a native profile from one engine as if it belonged to the other.

The longer-term roadmap includes Bambu Studio and additional independently installed engines. The browser-based engine **install/update/remove** manager is planned. A named engine in the catalogue does not imply a reviewed executable is available to run.

## Find and select profiles

1. Choose the installed engine and its exact version, then the printer and compatible nozzle.
2. In **Change slicing profiles**, search the saved profiles. If the required machine, process or filament profile is missing, use the official-profile search/import workflow for the selected engine.
3. Select matching machine, process and native filament presets. Import complete parent/inheritance dependencies where needed. A manual profile may be registered but remains a candidate until verified for its exact engine/version and machine.
4. Choose the relevant build-plate type where exposed in the native profile settings; a visual plate size alone is not evidence of printable geometry.
5. Review the selected process profile in the workbench. Basic/Advanced search shows the supported native fields; an unsupported field remains in the underlying manufacturer preset rather than being silently rewritten.

**Saved defaults:** In **Manage profiles** or **Saved profiles**, choose **Set as default** for a saved machine, process or filament preset. Defaults apply to the user and engine/version. **Import & set default** is also available where the official catalogue provides a compatible profile.

**Physical spool versus native preset:** Choosing a MakerVault spool can suggest a native filament profile by material or colour; it never silently approves a native preset, changes printer CFS mapping, or downloads it without your action. Assign a native filament profile to each material slot used by the slice.

## Custom profiles and per-draft settings

**Edit as custom** and **Save as custom profile** create a new profile; the original manufacturer preset stays unchanged. Temporary workbench settings are applied to a scratch copy for the selected draft. Validate the edited profile before real printer use. Searchable settings and available categories differ between Orca and Creality, and not every desktop slicer option is exposed.

## Multi-material restrictions

Painted regions, filament-slot assignment and native flushing controls depend on the engine, machine topology and genuine profile capabilities. MakerVault must not assume that a generic K2 two-material/single-nozzle encoder applies to unrelated or multi-nozzle printers. On Creality CFS, confirm genuine enabled native machine settings and physical slot mapping before printing. A successful preview or offline slice is **not** approval to dispatch to a printer.

For the full workflow see [Prepare, paint and slice](workbench.md); for missing engines or profiles see [Troubleshooting](troubleshooting.md).

## Engine maintenance

Production one-click installs, updates, rollback and removal remain planned. Do not use provisional controls or undocumented Docker changes to treat an engine as supported. An engine upgrade needs independently reviewed binary integrity, licence and compatibility testing. Upgrading one engine should not silently overwrite the others or native preset origins.
