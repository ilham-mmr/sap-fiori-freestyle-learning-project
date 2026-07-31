# Fiori Elements Extension Example

This folder is **not a second complete generated application**. Generate the application first with SAP Fiori tools in SAP Business Application Studio, then use the files here as certification practice examples.

Why not commit a hand-written fake generated app?

- Fiori tools templates evolve with UI5 versions.
- The generator registers extensions correctly for the chosen floorplan/runtime.
- Certification practice should include using BAS, Page Map, and Guided Development.

## Recommended generated project

- Template: List Report Page
- OData version: V4
- Service: companion CAP `AdminService`
- Main entity: `Products`
- Navigation entity: none required for the first exercise

## Extension exercise

1. Generate the app.
2. Use Page Map or Guided Development to add a custom List Report action.
3. Let the tool create the manifest registration and extension controller.
4. Copy the relevant handler ideas from:

```text
ext/controller/ListReportExt.controller.js
```

5. Connect two actions:
   - show selected-row count
   - refresh through the extension API

## Rules demonstrated

- Extend through `ControllerExtension`.
- Use the Fiori elements extension API.
- Use selected binding contexts, not generated table DOM.
- Do not guess generated control IDs.
- Let Fiori tools create version-appropriate manifest wiring.
- Keep custom code small; use annotations for standard behavior.

## Version note

The precise generated namespace, manifest structure, and available extension APIs may differ by SAPUI5/Fiori tools version. Treat the code as a focused pattern and verify it against the generated template and current SAPUI5 API reference.
