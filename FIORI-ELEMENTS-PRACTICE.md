# Fiori Elements and Flexible Programming Model Practice

This repository is primarily a freestyle SAPUI5 app, but SAP Fiori developer preparation should also include **Fiori elements for OData V4**.

Use the companion CAP repository's draft-enabled `AdminService` as the backend for this exercise.

## Why this matters

Freestyle UI5 teaches you how the framework works. Fiori elements teaches you how SAP expects standard enterprise pages to be built efficiently from metadata and annotations.

A developer should be able to answer:

- Can the requirement fit a standard floorplan?
- Can annotations express the requirement?
- Is an extension point sufficient?
- Is a custom building block appropriate?
- Is fully freestyle UI genuinely necessary?

## Mental model

```text
OData V4 metadata + annotations
            |
            v
Fiori elements floorplan
            |
            +--> List Report
            +--> Object Page
            +--> standard actions, filters, tables, draft, messages
            |
            +--> controlled extensions when needed
```

> Layman comparison: freestyle is building the whole screen manually. Fiori elements is giving SAP a detailed blueprint and letting the framework build the standard rooms.

## Prerequisites

- Companion CAP project running locally
- SAP Business Application Studio or SAP Fiori tools in VS Code
- `AdminService` reachable from the development environment
- OData V4 metadata and annotations enabled

## Exercise 1 — Generate a List Report/Object Page

In SAP Business Application Studio:

1. Open the Command Palette.
2. Run **Fiori: Open Application Generator**.
3. Choose **List Report Page** for OData V4.
4. Select the companion CAP service.
5. Select `AdminService`.
6. Select `Products` as the main entity.
7. Enable local preview.
8. Run the generated application.

Verify that annotations produce:

- page title/header information
- filter fields
- table columns
- semantic stock status
- object-page sections/facets
- create/edit draft behavior

## Exercise 2 — Trace annotations to generated UI

Open the companion CAP annotation file and create a map:

| Annotation | UI effect |
|---|---|
| `UI.HeaderInfo` | object title and description |
| `UI.SelectionFields` | filter-bar fields |
| `UI.LineItem` | list table columns/actions |
| `UI.FieldGroup` | grouped object-page fields |
| `UI.Facets` | object-page sections |
| `Common.ValueList` | value help |
| `UI.DataPoint` | semantic value/status |

Change one annotation at a time, restart/reload, and prove the visible effect.

## Exercise 3 — Draft handling

The CAP `AdminService` is draft-enabled.

Observe:

- create enters draft state
- editing creates/uses a draft
- save activates the draft
- cancel discards the draft
- another user can encounter draft ownership/locking behavior

Explain the difference between:

- UI5 OData update groups in the freestyle app
- server-side draft behavior in a Fiori elements app

They solve different problems. An update group batches client requests; draft is a business editing state managed by the backend/service.

## Exercise 4 — Add a custom List Report action

The example extension controller is located at:

```text
examples/fiori-elements/ext/controller/ListReportExt.controller.js
```

Generate the app first, then use SAP Fiori tools Guided Development or the Page Map to add a custom table/header action. Connect that action to the extension handler.

The example demonstrates:

- a `ControllerExtension`
- using the Fiori elements extension API
- reading selected contexts
- refreshing through the extension API
- avoiding generated control IDs and DOM manipulation

> Generated manifest structure and extension API details can vary by UI5/Fiori tools version. Let the generator create the extension registration, then place your logic into the generated extension file.

## Exercise 5 — Custom section or building block

Add one custom object-page section that shows a simple stock summary.

Preferred learning sequence:

1. Check whether an annotation can express it.
2. Check whether an existing Fiori elements building block fits.
3. Use a custom section through a supported extension point.
4. Use freestyle only inside the extension area.

Do not search for generated DOM nodes and inject arbitrary HTML.

## Exercise 6 — Flexible Programming Model

Learn the purpose of the Flexible Programming Model:

- retain Fiori elements floorplan behavior
- add custom pages/sections/actions where needed
- use building blocks and extension APIs
- avoid abandoning metadata-driven development for a small customization

Practice tasks:

1. Add a custom action.
2. Add a custom section.
3. Navigate from generated content to a custom page.
4. Use selected binding contexts in extension code.
5. Refresh data using the extension API.
6. Add a standard building block to a custom fragment/page.

## Exercise 7 — Value help

Add `Categories` to the CAP model and annotate the relationship as a value help.

Verify:

- the field offers value help
- key and description are displayed appropriately
- search works
- selected value is saved
- the UI remains metadata-driven

Compare this to manually building a SelectDialog in freestyle UI5.

## Exercise 8 — Adaptation and flexibility

Create an adaptation project for a generated or standard-like Fiori application.

Practise:

- hide/show fields
- rename labels
- rearrange fields
- add a fragment through a supported extension point
- understand layer and transport implications

Explain why adaptation is safer than modifying the original application source.

## Exercise 9 — Troubleshooting

### Generated field is missing

Check:

- property exposed in service projection
- `$metadata`
- annotation target namespace/entity
- hidden annotations
- cached metadata

### Custom action does not appear

Check:

- manifest extension registration generated by Fiori tools
- action placement/availability expression
- controller-extension namespace
- stable action ID
- runtime console module error

### Draft create/edit fails

Check:

- draft-enabled service
- service path and OData version
- backend authorization
- side effects/messages
- existing draft ownership

### Extension breaks after UI5 upgrade

Check whether it relied on:

- generated IDs
- internal controls
- DOM selectors
- undocumented APIs
- controller internals instead of extension APIs

## Freestyle versus Fiori elements comparison task

Build the same Product scenario twice:

### Fiori elements version

- List Report
- Object Page
- draft create/edit
- annotations for filters, columns, facets, and status
- one supported custom action

### Freestyle version

- custom list/detail flow
- explicit dialog lifecycle
- explicit routing and state handling
- custom interaction not naturally available in the floorplan

Write a one-page architecture decision explaining:

- delivery speed
- consistency
- custom UX need
- maintenance cost
- test surface
- upgrade stability
- extension strategy

## Readiness questions

You should answer without notes:

1. What does Fiori elements generate from metadata and annotations?
2. What belongs in OData metadata versus UI controller code?
3. What is the purpose of List Report and Object Page?
4. How does draft differ from client-side pending changes?
5. What is a controller extension?
6. Why should generated control IDs not be used?
7. What is the Flexible Programming Model?
8. When is a custom section appropriate?
9. When should you choose full freestyle?
10. How does UI5 flexibility differ from a Fiori elements application extension?

## Completion criteria

You have completed this guide when you can:

- [ ] generate a List Report/Object Page in BAS
- [ ] trace five annotations to visible UI behavior
- [ ] create/edit/save/cancel draft data
- [ ] add one custom action through Fiori tools
- [ ] add one custom section or building block
- [ ] create a value help using metadata
- [ ] troubleshoot a broken annotation target
- [ ] explain Fiori elements versus freestyle tradeoffs
- [ ] avoid unsupported generated-control or DOM manipulation
