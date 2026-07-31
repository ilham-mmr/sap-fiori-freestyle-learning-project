# SAP Fiori Hands-On Certification Practice Plan

This plan prepares you to **build, debug, explain, and deploy**, not merely recognize SAPUI5 terminology.

> Verify the current SAP certification page before booking. SAP is moving certifications toward practical, performance-based assessment in phases, and the exact proof-of-skills or exam format can change.

## Readiness rule

You are not ready because you can follow this repository step by step. You are ready when you can recreate the key solution from a blank project, under time pressure, while explaining why each decision is correct.

## Skills matrix

Rate every skill from 0 to 3:

- **0** — I do not understand it.
- **1** — I understand it when reading.
- **2** — I can implement it with documentation.
- **3** — I can build and troubleshoot it from a blank project.

| Area | Target | Practice evidence |
|---|---:|---|
| Explain Fiori/UI5/Fiori elements | 3 | README oral questions |
| Create project in BAS or UI5 CLI | 3 | blank-project rebuild |
| Configure `manifest.json` | 3 | models, routing, libs, flexibility |
| Build XML views/controllers | 3 | list/detail/not-found app |
| Use JSON/Resource/OData models | 3 | view state and backend data |
| Property/context/aggregation binding | 3 | list/detail screens |
| Expression and formatter binding | 3 | status and stock presentation |
| Routing and URL parameters | 3 | detail navigation |
| Fragments and dialog lifecycle | 3 | create/settings dialogs |
| Filter/sort/paging | 3 | ViewSettingsDialog and table |
| OData V4 CRUD | 3 | create/edit/delete |
| Update groups and batch | 3 | detail save/cancel |
| Validation and messages | 3 | Validator and MessageManager |
| i18n | 3 | EN/ID/DE bundles |
| Responsive/accessibility checks | 2–3 | phone/tablet/desktop drills |
| QUnit | 2–3 | formatter/validator tests |
| OPA5 | 2–3 | product-list journey |
| Launchpad concepts | 2–3 | FLP sandbox |
| Fiori elements generation | 2–3 | companion practice guide |
| Flexible Programming Model | 2 | extension example and BAS practice |
| UI5 flexibility/adaptation | 2 | real adaptation project required |
| Build/deploy to BTP | 2–3 | MTA and deployment guide |
| Real FLP/Work Zone content | 2 | real landscape required |

## Four-stage method

### Stage 1 — Read and trace

Read in this order:

1. `webapp/manifest.json`
2. `webapp/Component.js`
3. `webapp/view/App.view.xml`
4. `webapp/view/ProductList.view.xml`
5. `webapp/controller/ProductList.controller.js`
6. `webapp/fragment/CreateProduct.fragment.xml`
7. `webapp/fragment/ProductSettings.fragment.xml`
8. `webapp/view/ProductDetail.view.xml`
9. `webapp/controller/ProductDetail.controller.js`
10. `webapp/controller/BaseController.js`
11. `webapp/util/Validator.js`
12. `webapp/test/`
13. `mta.yaml`, `xs-app.json`, and `DEPLOYMENT.md`

For every file, answer:

- What is configured or implemented here?
- What does UI5 generate or manage automatically?
- What would break if this file were deleted?
- Is this design-time, build-time, or runtime behavior?
- Which concern belongs in the backend instead?

### Stage 2 — Execute and inspect

Start the companion CAP service, then the UI5 app.

Complete these observations:

1. Open `/$metadata` and locate `Products`.
2. Load the product list and inspect `$select`.
3. Search and inspect the generated `$filter`.
4. Sort and inspect `$orderby`.
5. Create a product and inspect the POST.
6. Edit a product and inspect the `$batch` body.
7. Cancel an edit and verify no update is sent.
8. Delete a product and inspect the DELETE.
9. Trigger a CAP validation error and inspect MessageManager/user feedback.
10. Open two browser sessions and create a stale ETag update.
11. Change the language locale and inspect resource-bundle selection.
12. Run QUnit and OPA5 pages.
13. Preview through the Launchpad sandbox.

### Stage 3 — Modify without copying

Implement these changes using documentation, not copy/paste from the solution:

1. Add a category field and category value help.
2. Add price and stock range filters.
3. Add a reset-filters action.
4. Add a MessagePopover for backend messages.
5. Add a reusable confirmation helper.
6. Add order header and items pages.
7. Add a CAP action call from UI5.
8. Add a `FlexibleColumnLayout` version.
9. Add Indonesian validation texts.
10. Add a formatter test and a controller test using stubs.
11. Add an OPA journey covering search and navigation.
12. Add intent navigation to a second sandbox target.
13. Generate a Fiori elements app for `AdminService`.
14. Add a Fiori elements custom action through an extension.
15. Deploy both apps to BTP and expose them in Work Zone.

### Stage 4 — Rebuild under pressure

Create a blank project and complete the mock practical exercise below.

# 120-minute mock practical exercise

## Scenario

Build a responsive Product Administration application consuming an OData V4 service with entity set `Products`.

Product fields:

- `ID`
- `name`
- `description`
- `price`
- `stock`
- `active`
- `modifiedAt`

## Task 1 — Project and descriptor (15 minutes)

- Initialize a UI5 application.
- Add `sap.m`, `sap.f`, `sap.ui.core`, and `sap.ui.layout` dependencies.
- Configure the OData V4 data source and default model.
- Configure a named i18n model.
- Configure list, detail, and not-found routes.
- Enable async views and flexibility.

**Acceptance:** App starts with no descriptor or module errors.

## Task 2 — Product list (20 minutes)

- Create a responsive table using aggregation binding.
- Request only needed properties.
- Add search across name and description.
- Add sort by name and price.
- Add active/inactive filter.
- Display semantic active status.
- Use stable IDs and i18n texts.

**Acceptance:** Search/sort/filter become server-side OData query options.

## Task 3 — Navigation and detail (15 minutes)

- Navigate using the product key.
- Encode/decode the route argument.
- Bind the detail page on `patternMatched`.
- Show name, description, price, stock, active, and modified date.
- Handle an invalid or missing route with a not-found page.

**Acceptance:** Browser refresh on a detail hash still loads the correct product.

## Task 4 — Create dialog (15 minutes)

- Build a fragment-based create dialog.
- Load it asynchronously and cache it.
- Use a JSONModel for draft values.
- Validate name, price, and stock.
- Create through the OData V4 list binding.
- Show busy state and success/error feedback.

**Acceptance:** Invalid data is blocked and valid data is persisted.

## Task 5 — Edit, save, cancel, delete (20 minutes)

- Add edit mode.
- Use an update group called `changes`.
- Save with `submitBatch("changes")`.
- Cancel with `resetChanges("changes")`.
- Confirm destructive delete.
- Handle stale ETag errors clearly.

**Acceptance:** Cancel sends no write and save clears pending changes.

## Task 6 — Tests (15 minutes)

- Create a pure formatter or validator.
- Add at least three QUnit assertions.
- Add an OPA5 test that starts the component and finds the product table.
- Use stable control IDs.

**Acceptance:** Tests pass and fail meaningfully when logic/IDs are deliberately broken.

## Task 7 — Fiori elements comparison (10 minutes)

Explain and demonstrate how the same service could be represented as a Fiori elements List Report/Object Page.

Identify:

- `UI.LineItem`
- `UI.SelectionFields`
- `UI.HeaderInfo`
- facets/field groups
- one custom extension point

**Acceptance:** You can justify which version should be freestyle and which should be Fiori elements.

## Task 8 — Build/deployment explanation (10 minutes)

Run build and explain:

- preload/build output
- HTML5 Applications Repository
- destination
- XSUAA
- `xs-app.json`
- Work Zone target/content
- MTA module/resource relationship

**Acceptance:** Production build succeeds and you can draw the deployed request flow.

## Mock scoring

| Area | Points |
|---|---:|
| Descriptor and routing | 15 |
| List binding/filter/sort | 15 |
| Detail navigation | 10 |
| Create flow | 15 |
| Edit/batch/delete | 15 |
| Validation/error handling | 10 |
| QUnit/OPA5 | 10 |
| Fiori elements reasoning | 5 |
| Build/deployment explanation | 5 |

Suggested readiness threshold: **80/100 without copying from the existing project**.

# Debugging drills

Practise fixing each scenario deliberately.

## Drill 1 — Blank screen

Possible causes:

- wrong component namespace
- invalid `manifest.json`
- missing root view
- controller module path mismatch
- XML parsing error

Prove the root cause using Console and Network rather than guessing.

## Drill 2 — Binding displays nothing

Check:

- model name
- binding path
- entity-set spelling and case
- service URL and trailing slash
- metadata property name
- parent binding context
- `$select` excluding a required property

## Drill 3 — Duplicate OData requests

Check:

- repeated `bindElement`
- route handler attached more than once
- explicit refresh plus binding refresh
- multiple controls with separate bindings
- live search producing too many requests

Implement debounce only when appropriate; first understand why the calls exist.

## Drill 4 — Save does nothing

Check:

- binding mode
- `$$updateGroupId`
- submitted group ID
- pending changes
- validation messages
- ETag conflict
- rejected batch part

## Drill 5 — Fragment opens twice or has duplicate IDs

Check:

- cached Promise/dialog
- fragment ID prefix
- `addDependent`
- cleanup lifecycle
- rapid-click race condition

## Drill 6 — Works locally, fails in BTP

Check:

- `xs-app.json` route
- destination name
- authentication type
- service binding
- app content deployed to HTML5 repo
- Work Zone content assignment
- CORS assumptions hidden by local proxy

## Drill 7 — Fiori elements extension is brittle

Check whether code is:

- finding generated IDs
- manipulating generated DOM
- bypassing extension APIs
- replacing a floorplan instead of extending it
- dependent on undocumented internals

# Two-week preparation plan

## Days 1–2: Foundation

- Fiori principles and UI5 architecture
- project setup and descriptor
- MVC and models
- binding types

## Days 3–4: Navigation and reusable UI

- routing and deep links
- fragments/dialog lifecycle
- i18n
- responsive controls

## Days 5–6: OData

- metadata and query options
- V4 CRUD
- update groups and batch
- ETags

## Day 7: Debugging review

- Console/Network/Sources
- binding context inspection
- routing and message debugging

## Days 8–9: Quality

- validation
- QUnit
- OPA5
- accessibility
- performance

## Day 10: Launchpad and flexibility

- FLP sandbox and intents
- stable IDs
- flexibility/adaptation concepts

## Days 11–12: Fiori elements

- generate List Report/Object Page
- annotations
- extensions
- Flexible Programming Model

## Day 13: Deployment

- build
- MTA
- destination
- HTML5 repo
- Work Zone

## Day 14: Mock exam

Complete the 120-minute simulation, score it, review weak areas, and repeat the failed tasks from a blank project.

# Oral explanation questions

You should answer each in under two minutes.

1. Why is SAP Fiori not the same thing as SAPUI5?
2. When is Fiori elements better than freestyle?
3. What does the component own compared with a controller?
4. Why is `manifest.json` central to UI5 applications?
5. How do property, context, and aggregation bindings differ?
6. What is a binding context?
7. Why use route matching rather than only `onInit()`?
8. What is the difference between OData V2 and V4 client APIs?
9. What does an update group do?
10. How do ETags prevent lost updates?
11. Why are fragments useful, and what lifecycle problem can they create?
12. Why do stable IDs matter for testing and flexibility?
13. How do QUnit and OPA5 differ?
14. How does intent navigation differ from internal app routing?
15. What belongs in the backend even when the UI validates it?
16. Why should a table not load 10,000 records at once?
17. What does UI5 flexibility solve?
18. How do annotations drive Fiori elements?
19. What is the Flexible Programming Model?
20. How would you troubleshoot a failed `$batch` request?

# Final readiness checklist

Before booking, confirm that you can:

- [ ] create a project without copying this repository
- [ ] configure a V4 service and models
- [ ] build a responsive list/detail flow
- [ ] implement search/filter/sort
- [ ] create/update/delete with correct V4 APIs
- [ ] explain batch and ETag behavior
- [ ] use fragments without duplicate instances/IDs
- [ ] implement i18n
- [ ] debug routing and binding failures
- [ ] write QUnit and OPA5 tests
- [ ] explain accessibility and Fiori design choices
- [ ] preview in a Launchpad shell
- [ ] generate and extend a Fiori elements app
- [ ] explain UI5 flexibility/adaptation
- [ ] build and deploy to BTP
- [ ] complete the mock practical exercise above the threshold
