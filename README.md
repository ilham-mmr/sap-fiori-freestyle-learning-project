# SAP Fiori Freestyle Learning Project

A commented SAPUI5 freestyle application designed as a compact study project for **Fiori UX, MVC, OData V4, routing, bindings, fragments, value help, CRUD, batch, validation, error handling, testing, and BTP deployment**.

It is intended to consume the companion CAP service:

```text
https://github.com/ilham-mmr/sap-cap-learning-project
```

## 1. Fiori, UI5, and Fiori elements

- **SAP Fiori** is the UX and design approach: role-based, simple, consistent, responsive, and task-focused.
- **SAPUI5** is the JavaScript framework used to build the application.
- **Fiori elements** generates standard floorplans from OData metadata and annotations.
- **Freestyle UI5** means developers manually build XML views, controllers, and interaction logic.

> Layman version: Fiori is the design rulebook; UI5 is the construction toolkit. Fiori elements uses a standard floor plan, while freestyle lets you design the rooms yourself.

Use Fiori elements first when List Report/Object Page patterns fit. Use freestyle when the requirement needs genuinely custom interaction or layout.

## 2. End-to-end architecture

Local:

```text
Browser -> UI5 dev server -> local proxy -> CAP OData V4 on port 4004
```

BTP:

```text
User -> SAP Build Work Zone / Launchpad
     -> HTML5 Applications Repository
     -> UI5 application
     -> Destination / Approuter route
     -> CAP OData V4
     -> HANA Cloud
```

## 3. Project structure

```text
.
├── webapp/
│   ├── Component.js                 # App bootstrap and shared setup
│   ├── manifest.json                # Models, data sources, routing, libraries
│   ├── controller/
│   │   ├── BaseController.js        # Reusable controller helpers
│   │   ├── App.controller.js
│   │   ├── ProductList.controller.js
│   │   └── ProductDetail.controller.js
│   ├── view/
│   │   ├── App.view.xml
│   │   ├── ProductList.view.xml
│   │   └── ProductDetail.view.xml
│   ├── fragment/
│   │   └── CreateProduct.fragment.xml
│   ├── model/
│   │   └── formatter.js
│   ├── i18n/i18n.properties
│   ├── css/style.css
│   └── test/unit/                  # Example unit-test structure
├── ui5.yaml                         # UI5 tooling and local CAP proxy
├── package.json
├── xs-app.json                      # Runtime routes for BTP
├── mta.yaml                         # HTML5 repository deployment
└── DEPLOYMENT.md
```

## 4. MVC

### Model

Stores data and state:

- OData V4 model for backend business data
- JSON model for temporary UI state
- Resource model for translated text

### View

XML files define layout and controls. XML is preferred because it separates UI structure from JavaScript behavior and supports declarative binding.

### Controller

Handles events, routing, orchestration, messages, and UI-specific behavior.

A controller should not become the business backend. Price validation, authorization, and transactional rules belong in CAP.

## 5. Important application files

### `manifest.json`

The central descriptor containing:

- Application metadata
- Libraries
- OData data sources
- Models
- Routing and targets
- Root view
- Device support

**Memory sentence:** `manifest.json` is the configuration brain.

### `Component.js`

Starts the application component, initializes routing, and registers shared models or MessageManager integration.

### `index.html`

Used mainly for standalone/local startup. In Launchpad or Work Zone, the shell starts the UI5 component differently.

### `ui5.yaml`

Configures local UI5 tooling, middleware, and the proxy to CAP. It is not a production runtime security file.

### `mta.yaml`

Defines BTP deployment modules/resources. It is packaging and deployment topology, not UI runtime configuration.

## 6. UI5 models

### JSONModel

Use it for client-side state:

- Busy flags
- Search text
- Dialog form data
- Edit mode
- Temporary values

Example model name in this project: `view`.

### OData V4 model

Use it for backend entities and operations:

- Metadata-aware binding
- Server-side filtering and sorting
- CRUD with binding contexts
- Deferred update groups and batch submission

### ResourceModel

Provides i18n texts from `i18n.properties`.

## 7. Data binding

### Property binding

One control property to one model value:

```xml
<Text text="{name}" />
```

### Element/context binding

Bind a page or form to one entity, so child controls inherit that object context.

```js
this.getView().bindElement({ path: `/Products(${sID})` });
```

### Aggregation binding

Fill a collection aggregation such as table `items` from an entity set.

```xml
<Table items="{/Products}">
```

### Expression binding

Use for small display conditions. Avoid embedding large business rules in XML.

### Formatter

Use for reusable display transformations such as stock status, semantic state, currency text, or date formatting. Keep formatters pure: value in, display value out.

## 8. Routing and navigation

Routes and targets are declared in `manifest.json`.

```text
#/products                     -> ProductList
#/products/<product-id>        -> ProductDetail
```

The list controller calls `navTo()` with the selected key. The detail controller attaches to the route's `patternMatched` event and binds the view to that entity.

> Important: `onInit()` runs when the controller is initialized, not every time the user navigates back to a cached page. Use route handlers for per-navigation loading.

## 9. Fragments and dialogs

A fragment is reusable UI without its own controller. This project uses a fragment for the create-product dialog.

Good pattern:

1. Load asynchronously.
2. Cache the Promise/dialog so it is not recreated every click.
3. Add it as a dependent of the view.
4. Use the hosting controller for event handlers.
5. Destroy resources in `onExit()` when necessary.

Fragments are commonly used for dialogs, popovers, and value-help screens.

## 10. Search, filter, and sort

The list controller uses `sap.ui.model.Filter` and `sap.ui.model.Sorter`. With OData, these are translated into server-side query options where supported.

Prefer server-side operations for business datasets:

- `$filter` rather than downloading all records and filtering in JavaScript
- `$orderby` rather than sorting a huge client array
- `$select` to request only required fields
- Paging/growing instead of loading everything

## 11. OData V4 CRUD

### Create

Create through a list binding:

```js
const oContext = oListBinding.create(payload);
await oContext.created();
```

### Update

Bound input controls can update the context through two-way binding. Changes may be grouped into an update group and submitted with `submitBatch()`.

### Delete

Delete the selected context:

```js
await oContext.delete();
```

### Batch

This project uses an application update group called `changes`. Several pending changes can be submitted together:

```js
await oModel.submitBatch("changes");
```

Batch reduces HTTP round trips. It does not by itself prove that unrelated operations are one database transaction; backend transaction behavior still matters.

## 12. Messages and error handling

The project demonstrates:

- `MessageManager` for validation and backend messages
- `MessageBox` for user decisions and failures
- `MessageToast` for lightweight success feedback
- Promise `try/catch/finally`
- Busy state during asynchronous operations

Never show only `console.error` to the user. Logs help developers; users need a clear message and recovery path.

## 13. Fiori UX practices

- Use semantic controls and standard responsive layouts.
- Keep primary actions obvious.
- Disable or hide actions when they do not apply, but enforce security in CAP.
- Use meaningful labels and i18n—not hardcoded UI strings.
- Show busy state for operations that take time.
- Confirm destructive actions.
- Return focus to a sensible control after closing dialogs.
- Design for keyboard and screen-reader use.
- Test phone, tablet, and desktop breakpoints.

## 14. Performance practices

- Bind controls rather than manually creating large DOM structures.
- Use `$select` and targeted `$expand`.
- Avoid `model.refresh()` after every small operation.
- Use growing/paging for large lists.
- Lazy-load routes and fragments.
- Cache reusable dialogs.
- Avoid synchronous network calls.
- Keep formatter functions cheap and side-effect-free.
- Inspect the browser Network tab for duplicate requests and oversized payloads.

## 15. Running locally

Start the companion CAP service first:

```bash
cd sap-cap-learning-project
npm install
npm run watch
```

Then start this UI project:

```bash
npm install
npm start
```

The UI5 middleware proxies `/odata` to `http://localhost:4004`.

Open the URL printed by UI5 tooling, usually similar to:

```text
http://localhost:8080/index.html
```

## 16. Debugging

Browser tools:

- Console — JavaScript errors and logs
- Network — OData requests, payloads, status codes, and batch bodies
- Sources — breakpoints in controllers
- Elements — rendered control DOM when truly needed
- Application — storage and cache inspection

UI5-specific checks:

1. Confirm model names and binding paths.
2. Inspect `this.getView().getBindingContext()`.
3. Check route arguments.
4. Verify `manifest.json` data-source paths.
5. Inspect `/$metadata` from CAP.
6. Check pending changes and update-group IDs.
7. Look at backend messages returned in OData error responses.

## 17. Common mistakes

- Mixing OData V2 APIs into an OData V4 project
- Putting business security only in button visibility
- Hardcoding service URLs in controllers
- Using global `sap.ui.getCore()` access unnecessarily
- Manually manipulating DOM instead of binding controls
- Recreating fragments every time
- Calling refresh repeatedly and causing duplicate requests
- Loading thousands of rows at once
- Keeping every controller method in one giant file
- Forgetting to encode/decode route keys
- Hardcoding text instead of using i18n
- Ignoring rejected Promises

## 18. Suggested study sequence

1. Read `manifest.json` and draw the model/routing map.
2. Read `Component.js` and identify shared setup.
3. Open `ProductList.view.xml` and mark property versus aggregation binding.
4. Follow search and sort logic in `ProductList.controller.js`.
5. Open the create fragment and follow the create flow.
6. Navigate to detail and follow route pattern matching.
7. Edit a field and submit the `changes` batch.
8. Delete a product and observe confirmation/error handling.
9. Inspect Network requests and `$metadata`.
10. Read `DEPLOYMENT.md` and map HTML5 repository, destination, and Work Zone.

## 19. Exercises

1. Add category value help using a reusable fragment.
2. Add a stock-only filter toggle.
3. Add an edit/cancel mode with `resetChanges()`.
4. Display CAP validation errors through MessageManager.
5. Add order header/item pages consuming the CAP composition.
6. Trigger the CAP `restock` action from a dialog.
7. Add an offline-friendly JSON cache and explain its limitations.
8. Add unit tests for the formatter and controller helper functions.
9. Add a QUnit/Opa5 journey for create and navigation.
10. Add authorization-aware buttons, while keeping CAP restrictions authoritative.

## 20. Interview quick check

- What is the difference between Fiori and UI5?
- Why choose freestyle instead of Fiori elements?
- What belongs in `manifest.json` versus `Component.js`?
- What is the difference between property, context, and aggregation binding?
- Why use a JSONModel alongside an ODataModel?
- Why use `patternMatched` instead of only `onInit()`?
- What problem do fragments solve?
- How does OData V4 create differ from typical V2 `oModel.create()` code?
- What does an update group do?
- Why is backend authorization still required when the UI hides a button?
