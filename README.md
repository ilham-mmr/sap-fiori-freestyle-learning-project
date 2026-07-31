# SAP Fiori & SAPUI5 Hands-On Learning Project

A commented learning repository for **SAP Fiori application development**. The runnable application is a freestyle SAPUI5 app consuming the companion CAP OData V4 service, while the study material also covers Fiori elements, SAP Fiori tools, Launchpad/Work Zone, UI5 flexibility, testing, accessibility, performance, and deployment.

Companion backend:

```text
https://github.com/ilham-mmr/sap-cap-learning-project
```

> **Study rule:** Do not only read or copy this project. Run it, inspect the network calls, break it, debug it, modify it, and finally rebuild the essential parts from a blank SAP Business Application Studio project.

## Is this repository enough for SAP Fiori certification?

**It is now a strong practice foundation, but it should not be your only preparation source.**

The repository covers most developer skills you should be able to demonstrate:

- SAP Fiori principles and SAPUI5 architecture
- freestyle MVC application structure
- `manifest.json`, `Component.js`, routing, targets, and navigation
- XML views, standard controls, fragments, dialogs, and stable IDs
- JSON, Resource, device, and OData V4 models
- property, context, aggregation, expression, and formatter binding
- server-side filtering, sorting, paging, `$select`, and targeted `$expand`
- OData V4 create, update groups, batch submission, reset, and delete
- validation, MessageManager, error handling, and busy-state patterns
- i18n and localized UI texts
- responsive behavior, accessibility, and Fiori design practices
- QUnit unit tests and OPA5 journeys
- Launchpad sandbox preview and intent-based navigation concepts
- HTML5 Applications Repository, destination, XSUAA, Work Zone, and MTA deployment
- Fiori elements generation, annotations, extensions, and Flexible Programming Model concepts

A repository cannot fully replace real SAP hands-on work with:

- SAP Business Application Studio and SAP Fiori tools generators
- Guided Development and service-model selection
- a real ABAP, RAP, CAP, or SAP Gateway OData service
- SAP Fiori launchpad content, catalogs, spaces/pages, and target mappings
- SAPUI5 adaptation projects and flexibility layers
- SAP BTP destinations, HTML5 repository, XSUAA, and Work Zone administration
- the exact hands-on testing or exam tasks currently assigned by SAP

Use [`CERTIFICATION-PRACTICE.md`](CERTIFICATION-PRACTICE.md) for a skills matrix, a staged learning plan, debugging drills, and a 120-minute mock practical exercise.

Use [`FIORI-ELEMENTS-PRACTICE.md`](FIORI-ELEMENTS-PRACTICE.md) because the current SAP Fiori developer learning path is broader than freestyle UI5 alone.

## Official study companions

Always verify the current certification page and learning journey before booking because scope and assessment format can change.

- Developing SAPUI5 Applications learning journey: https://learning.sap.com/learning-journeys/developing-sapui5-applications
- Advanced SAPUI5 Development: https://learning.sap.com/courses/advanced-sapui5-development
- UI Development with SAP Fiori: https://learning.sap.com/courses/ui-development-with-sap-fiori
- Stay Certified – SAP Fiori Development: https://learning.sap.com/courses/fiori-development
- SAPUI5 documentation and API reference: https://ui5.sap.com/
- SAP Fiori design guidelines: https://experience.sap.com/fiori-design-web/
- Official UI5 samples: https://github.com/SAP/openui5-sample-app
- Official Fiori elements exercises: https://github.com/SAP-samples/fiori-elements-opensap

## Certification-oriented skills map

Rate yourself from 0 to 3:

- **0** — unfamiliar
- **1** — can explain while reading
- **2** — can implement with documentation
- **3** — can build and troubleshoot from a blank project

| Skill | Target | Evidence in this repository |
|---|---:|---|
| Explain Fiori, UI5, and Fiori elements | 3 | README and Fiori elements guide |
| Initialize and run a UI5 project | 3 | `package.json`, `ui5.yaml` |
| Configure `manifest.json` | 3 | data source, models, routing, dependencies |
| Implement XML MVC | 3 | `webapp/view` and `webapp/controller` |
| Use JSON/Resource/OData models | 3 | component and controllers |
| Implement all major binding types | 3 | list/detail views and README |
| Implement routing and deep links | 3 | list/detail/not-found routes |
| Use fragments correctly | 3 | create and settings dialogs |
| Use filters and sorters | 3 | product list and ViewSettingsDialog |
| Implement OData V4 CRUD | 3 | product list/detail controllers |
| Understand update groups and batch | 3 | detail save flow |
| Handle validation and backend errors | 3 | validator, MessageManager, BaseController |
| Implement i18n | 3 | English, Indonesian, German bundles |
| Apply responsive and accessible design | 2–3 | XML views and practice tasks |
| Write QUnit tests | 2–3 | formatter and validator tests |
| Write OPA5 journeys | 2–3 | integration tests |
| Preview in Launchpad sandbox | 2–3 | `webapp/test/flpSandbox.html` |
| Build and deploy to BTP | 2–3 | MTA and `DEPLOYMENT.md` |
| Build Fiori elements apps | 2–3 | practice guide; execute in BAS |
| Use UI5 flexibility/adaptation | 2 | must also practise in real SAP tools |
| Configure real FLP/Work Zone content | 2 | must practise in a real landscape |

## 1. Fiori, SAPUI5, and Fiori elements

### SAP Fiori

SAP Fiori is the design system and application experience. It emphasizes role-based, simple, coherent, responsive, and task-focused enterprise applications.

### SAPUI5

SAPUI5 is the JavaScript UI framework. It supplies:

- controls
- MVC
- components
- models and data binding
- routing
- validation and messaging
- OData integration
- accessibility and theming support
- test frameworks

### Fiori elements

Fiori elements generates standard floorplans from OData metadata and annotations. Typical floorplans include List Report and Object Page.

### Freestyle UI5

Freestyle UI5 means developers explicitly design XML views and controller behavior. It is appropriate when the UX does not fit a standard floorplan or requires custom interactions.

> **Layman comparison:** Fiori is the building code, UI5 is the construction toolkit, Fiori elements starts from a standardized building plan, and freestyle lets you design the rooms yourself.

**Decision rule:** Start by checking whether Fiori elements meets the requirement. Choose freestyle only when the custom UX provides real business value.

## 2. End-to-end architecture

Local development:

```text
Browser
  -> UI5 development server
  -> local proxy
  -> CAP OData V4 service on port 4004
```

BTP deployment:

```text
User
  -> SAP Build Work Zone / Launchpad
  -> HTML5 Applications Repository
  -> UI5 application
  -> destination / runtime route
  -> CAP or S/4HANA OData service
```

The UI should orchestrate presentation and interaction. Authorization, trusted prices, transactional rules, and business validation remain backend responsibilities.

## 3. Golden rules and clean separation

Use these practical rules while studying:

1. Design according to SAP Fiori UX patterns before writing controls.
2. Prefer standard UI5 controls over custom HTML and direct DOM work.
3. Use declarative XML views and data binding.
4. Define application metadata centrally in `manifest.json`.
5. Keep UI and OData service in separate software components.
6. Keep backend authorization authoritative; button visibility is not security.
7. Use i18n for visible text.
8. Use stable control IDs for testability, flexibility, and supportability.
9. Use server-side filtering, sorting, and paging for business datasets.
10. Test with QUnit and OPA5 instead of relying only on manual clicking.

## 4. Repository structure

```text
.
├── webapp/
│   ├── Component.js
│   ├── manifest.json
│   ├── controller/
│   │   ├── BaseController.js
│   │   ├── App.controller.js
│   │   ├── ProductList.controller.js
│   │   ├── ProductDetail.controller.js
│   │   └── NotFound.controller.js
│   ├── view/
│   │   ├── App.view.xml
│   │   ├── ProductList.view.xml
│   │   ├── ProductDetail.view.xml
│   │   └── NotFound.view.xml
│   ├── fragment/
│   │   ├── CreateProduct.fragment.xml
│   │   └── ProductSettings.fragment.xml
│   ├── model/formatter.js
│   ├── util/Validator.js
│   ├── i18n/
│   ├── css/style.css
│   └── test/
│       ├── flpSandbox.html
│       ├── unit/
│       └── integration/
├── examples/fiori-elements/
├── ui5.yaml
├── package.json
├── xs-app.json
├── mta.yaml
├── CERTIFICATION-PRACTICE.md
├── FIORI-ELEMENTS-PRACTICE.md
└── DEPLOYMENT.md
```

## 5. `manifest.json`: the application descriptor

`manifest.json` is the configuration brain. It declares:

- application ID, title, description, and version
- OData data sources
- model types and settings
- required libraries and minimum UI5 version
- root view
- routing, routes, targets, and bypassed navigation
- content density
- CSS resources
- flexibility enablement

Keep service URLs out of controllers. The model reads its data source from the descriptor.

### OData V4 model settings in this project

- `operationMode: "Server"` — filtering/sorting is delegated to the server where supported.
- `synchronizationMode: "None"` — required OData V4 synchronization behavior.
- `autoExpandSelect: true` — UI5 derives suitable `$select`/`$expand` information from bindings.
- `groupId: "$auto"` — reads can be automatically grouped.
- `updateGroupId: "changes"` — edits remain in an application-controlled update group until submitted.

## 6. `Component.js`: application startup

The component:

1. calls the parent `UIComponent` initialization
2. receives models declared in `manifest.json`
3. creates shared device state
4. registers MessageManager integration
5. initializes the router

A component is the application boundary. A view controller should access it through `getOwnerComponent()` rather than global variables.

## 7. MVC responsibilities

### Model

- OData V4 model: persistent backend business data
- JSONModel: temporary UI state such as busy/edit/dialog values
- ResourceModel: translated texts
- device model: responsive capability information

### View

XML declares controls and bindings. It should not contain large business algorithms.

### Controller

Controllers coordinate:

- event handling
- navigation
- dialog lifecycle
- filter/sorter construction
- binding operations
- busy state and user messages

Business transactions and security remain in CAP/S/4HANA.

## 8. Data binding

### Property binding

One property to one model value:

```xml
<Input value="{name}" />
```

### Context/element binding

Bind a page or form to one entity. Child controls inherit the context:

```javascript
this.getView().bindElement({
  path: `/Products(${sProductID})`
});
```

### Aggregation binding

Fill a collection aggregation such as `Table.items`:

```xml
<Table items="{/Products}">
```

### Expression binding

Suitable for short display decisions:

```xml
visible="{= ${view>/editMode} === false }"
```

### Formatter

Use a pure formatter for reusable display transformation. Do not make network calls or mutate models from a formatter.

## 9. Routing, navigation, and not-found handling

Routes and targets are declared in `manifest.json`:

```text
#/products/<product-id> -> product detail
unknown hash             -> not-found target
```

The list uses `navTo()`. The detail view listens to the route's `patternMatched` event because the controller may remain alive while different keys are navigated to.

> `onInit()` means “the controller was created,” not “the user navigated here again.”

Route parameters are encoded before navigation and decoded before creating the binding path.

## 10. Fragments and reusable dialogs

Fragments are reusable UI blocks without their own controller lifecycle. This repository uses:

- `CreateProduct.fragment.xml` for creation
- `ProductSettings.fragment.xml` for sort/filter settings

Good lifecycle pattern:

1. Load asynchronously.
2. Cache the Promise or dialog.
3. Add it as a dependent of the view.
4. Let the hosting controller handle events.
5. Release references during cleanup.

Stable IDs are especially important for fragments because duplicate or unstable IDs make testing and adaptation painful.

## 11. Filtering, sorting, and table behavior

`ProductList.controller.js` combines:

- search across name and description
- active/inactive/low-stock filters
- sort field and direction from ViewSettingsDialog
- OData V4 server-side binding operations

The filter groups are deliberate:

```text
(name contains query OR description contains query)
AND
(active OR inactive OR low stock selections)
```

For enterprise datasets:

- filter on the server
- sort on the server
- request only required fields
- use growing or paging
- do not download thousands of rows just to process them in JavaScript

## 12. OData V4 CRUD

### Create

Create through a list binding:

```javascript
const oCreatedContext = oListBinding.create(oPayload);
await oCreatedContext.created();
```

### Update

Two-way-bound controls place changes in the `changes` update group. Save them with:

```javascript
await oModel.submitBatch("changes");
```

Cancel them with:

```javascript
oModel.resetChanges("changes");
```

### Delete

Delete through the entity context:

```javascript
await oContext.delete();
```

### ETags and optimistic concurrency

The companion CAP service marks Products with an ETag. UI5 OData V4 automatically works with ETag headers. If another user changes the same entity, a stale update can fail instead of silently overwriting newer data.

> Layman version: the ETag is the revision number printed on your copy of the document. The backend rejects your save when someone has already published a newer revision.

### Batch nuance

Batch reduces network round trips. It does not automatically mean every unrelated request is one database transaction. The backend determines transactional semantics.

## 13. Validation, MessageManager, and error handling

`Validator.js` contains pure validation logic that can be unit tested without starting UI5 controls or the backend.

The application also demonstrates:

- MessageManager registration
- MessageBox for destructive decisions and errors
- MessageToast for lightweight success feedback
- `try/catch/finally`
- busy indicators during asynchronous work
- parsing backend OData error payloads

Never use only `console.error()` as user feedback. The user needs a clear message and a recovery path.

## 14. Internationalization

Visible text belongs in resource bundles, not controllers or XML literals.

This repository includes:

- `i18n.properties` — default English
- `i18n_id.properties` — Indonesian
- `i18n_de.properties` — German

Static UI translation and backend localized business data are different concerns:

- UI resource bundle: labels, buttons, messages
- localized backend data: translated product names/descriptions stored by locale

## 15. Responsive and accessible design

Practise these checks:

- phone, tablet, and desktop layouts
- cozy and compact density
- keyboard navigation
- visible focus
- meaningful labels and tooltips
- semantic status colors plus text, not color alone
- sufficient contrast
- no mouse-only interaction
- sensible focus after dialogs close
- busy state that does not trap the user indefinitely

Use UI5 standard controls because they already provide much accessibility and responsive behavior that custom DOM code would force you to rebuild.

## 16. SAP Fiori launchpad and Work Zone

The local Launchpad sandbox demonstrates the concepts of:

- shell versus application component
- semantic object and action
- intent hash such as `#Product-display`
- tile/content entry launching a UI5 component

A real landscape additionally requires catalogs, spaces/pages, target mappings, role assignment, destinations, and transport/governance.

The standalone `index.html` is useful locally, but launchpad starts the component through shell configuration rather than treating `index.html` as the production entry point.

## 17. UI5 flexibility and adaptation

UI5 flexibility supports modification-free adaptations such as changing labels, visibility, order, or variants in supported layers.

This app enables flexibility in the descriptor and uses stable IDs, but you still need real practice with:

- Adapt UI
- adaptation projects in SAP Business Application Studio
- variants and variant management
- controller extensions and extension points
- layer concepts and transport

Do not directly modify SAP standard application source code when an adaptation or extension mechanism is appropriate.

## 18. Fiori elements and Flexible Programming Model

Certification preparation should not stop at freestyle UI5. Fiori elements is central to current SAP Fiori development.

Learn to:

- generate a List Report/Object Page app in BAS
- understand OData V4 metadata and annotations
- use `UI.LineItem`, `UI.SelectionFields`, `UI.HeaderInfo`, facets, field groups, and value helps
- add custom actions and controller extensions
- use extension points instead of manipulating generated controls
- understand building blocks and the Flexible Programming Model

Follow [`FIORI-ELEMENTS-PRACTICE.md`](FIORI-ELEMENTS-PRACTICE.md) with the companion CAP `AdminService`.

## 19. Testing and software quality

### QUnit

Use QUnit for small units such as:

- formatter output
- validation rules
- helper functions
- controller methods with mocked dependencies

Run the unit test page:

```bash
npm run test:unit
```

### OPA5

Use OPA5 for user journeys such as:

- starting the app
- finding the product table
- searching
- navigating to detail
- opening a dialog

Run the integration test page:

```bash
npm run test:integration
```

### Static quality

```bash
npm run lint
npm run build
```

Tests should use stable IDs and user-visible behavior rather than brittle generated DOM selectors.

## 20. Performance practices

- Prefer bindings to manual control creation.
- Use `$select` and targeted `$expand`.
- Avoid full `model.refresh()` after every operation.
- Avoid duplicate route reads.
- Cache reusable fragments.
- Lazy-load routes and optional modules.
- Use growing/paging for lists.
- Keep formatters cheap and pure.
- Avoid synchronous calls.
- Inspect Network for request waterfalls, duplicate calls, batch content, and payload size.
- Build the application so preload bundles can be generated.

## 21. Running locally

Start CAP first:

```bash
cd sap-cap-learning-project
npm install
npm run watch
```

Start UI5 in a second terminal:

```bash
cd sap-fiori-freestyle-learning-project
npm install
npm start
```

Common URLs:

```text
http://localhost:8080/index.html
http://localhost:8080/test/flpSandbox.html
http://localhost:8080/test/unit/unitTests.qunit.html
http://localhost:8080/test/integration/opaTests.qunit.html
```

Useful scripts:

```bash
npm run lint
npm run build
npm run test:unit
npm run test:integration
npm run start:flp
```

## 22. Debugging workflow

1. Reproduce the issue consistently.
2. Check browser Console.
3. Check Network request URL, method, headers, payload, response, and `$batch` parts.
4. Inspect `/$metadata` and compare entity/property names.
5. Inspect the binding path and model name.
6. Inspect the current view binding context.
7. Check route arguments and URL encoding.
8. Check pending changes and update-group IDs.
9. Check MessageManager data.
10. Check the CAP/SAP Gateway log.
11. Verify destination and runtime routing when deployed.
12. Reduce the problem to the smallest failing binding or request.

### Common failure patterns

- OData V2 APIs copied into a V4 model
- incorrect service trailing slash or proxy path
- wrong named model in XML
- controller event handler not found
- missing fragment ID prefix
- direct DOM manipulation lost after rerendering
- refresh loop creating duplicate calls
- route handler attached multiple times
- unhandled rejected Promise
- missing i18n key
- stale ETag update rejected
- button hidden but backend still unprotected

## 23. Deployment

Read [`DEPLOYMENT.md`](DEPLOYMENT.md) and be able to explain:

- what the UI5 build produces
- why the HTML5 Applications Repository stores the app
- why a destination is used
- what XSUAA protects
- what `xs-app.json` routes
- what each `mta.yaml` module/resource does
- how the app appears in Work Zone
- how to inspect deployment and runtime errors

## 24. Suggested study sequence

1. Read `manifest.json` and draw its model/routing map.
2. Read `Component.js` and explain startup order.
3. Identify binding types in `ProductList.view.xml`.
4. Trace search/filter/sort from event to OData request.
5. Trace create-dialog loading and OData V4 creation.
6. Trace route navigation and detail context binding.
7. Edit, save, cancel, and inspect the batch request.
8. Create a stale ETag scenario with two browser sessions.
9. Run QUnit and deliberately break a formatter.
10. Run OPA5 and deliberately change a stable ID.
11. Preview through the Launchpad sandbox.
12. Generate the Fiori elements companion app in BAS.
13. Build and deploy to a real BTP space.
14. Repeat the mock practical exam from a blank project.

## 25. Hands-on exercises

1. Add Categories and a value-help dialog.
2. Add a stock range filter.
3. Persist table personalization with variant management.
4. Add a message popover bound to the MessageManager model.
5. Add create-order header/item pages consuming CAP composition.
6. Call the CAP `restock` action from a dialog.
7. Add a `FlexibleColumnLayout` master-detail-detail flow.
8. Add a file upload with validation and progress feedback.
9. Add a controller unit test with stubs.
10. Add an OPA journey for create, detail, edit, and delete.
11. Add intent navigation to another sandbox application.
12. Create an adaptation project for a generated Fiori elements app.
13. Add a Fiori elements custom action through an extension.
14. Deploy to HTML5 repository and expose it in Work Zone.

## 26. Interview and oral explanation questions

- What is the difference between Fiori, UI5, and Fiori elements?
- Why should Fiori elements be evaluated before freestyle?
- What belongs in `manifest.json` versus `Component.js`?
- What is the difference between property, context, and aggregation binding?
- Why use a JSONModel alongside an ODataModel?
- What is the difference between OData V2 and V4 create/update APIs?
- Why use `patternMatched` instead of loading only in `onInit()`?
- How do update groups and `submitBatch()` work?
- How does UI5 handle ETags and stale updates?
- What problem do fragments solve?
- Why do stable IDs matter?
- How do QUnit and OPA5 differ?
- How do Launchpad intent navigation and application routing differ?
- What does UI5 flexibility solve?
- Why is backend authorization still required when the UI hides an action?
- How would you troubleshoot duplicate OData requests?
- When would `FlexibleColumnLayout` be better than separate full-screen routes?
- How do annotations drive a Fiori elements application?

## Final readiness rule

You are not ready merely because the completed repository runs. You are ready when you can:

1. explain every major file without reading it
2. rebuild the important flow from a blank BAS project
3. diagnose broken routing, binding, OData, and deployment scenarios
4. create both a freestyle app and a Fiori elements app
5. complete the mock practical exercise under time pressure
