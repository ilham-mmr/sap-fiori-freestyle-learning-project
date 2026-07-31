# Deployment Guide — SAP Fiori Freestyle Learning Project

This guide explains local execution, UI5 build, HTML5 Applications Repository deployment, destination configuration, SAP Build Work Zone integration, transport, logs, and common failures.

## 1. Deployment architecture

```text
Developer workstation
  -> UI5 build (`dist/`)
  -> MTA archive (`.mtar`)
  -> Cloud Foundry deployment
  -> HTML5 Applications Repository
  -> Destination service
  -> SAP Build Work Zone / Fiori Launchpad
  -> CAP OData service
```

The UI is static web content. The CAP backend is a separate application and should be deployed first so its route is available for the destination.

## 2. Prerequisites

Install:

- A supported Node.js LTS release and npm
- UI5 CLI dependencies through `npm install`
- SAP Cloud Foundry CLI
- MultiApps plugin for `cf deploy`
- Cloud MTA Build Tool (`mbt`)
- A BTP subaccount with Cloud Foundry enabled
- Entitlements for:
  - HTML5 Applications Repository
  - Destination service
  - XSUAA
  - SAP Build Work Zone, standard edition, when Launchpad access is required

Check tools:

```bash
node --version
npm --version
cf --version
mbt --version
cf plugins
```

## 3. Run locally

Start the CAP backend first:

```bash
cd ../sap-cap-learning-project
npm install
npm run watch
```

Then start this UI:

```bash
npm install
npm start
```

`ui5.yaml` proxies:

```text
/odata/* -> http://localhost:4004/odata/*
```

The browser therefore calls a relative URL. Controllers never need to hardcode `localhost` or a production hostname.

## 4. Build locally

```bash
npm ci
npm run lint
npm run build
```

The UI5 build writes optimized application content to:

```text
dist/
```

Do not edit `dist/` manually. It is generated output.

Useful checks before deployment:

- Open the built app locally when possible.
- Confirm no absolute localhost URL exists in `dist/`.
- Confirm `manifest.json` still points to `/odata/v4/learning/`.
- Run UI5 lint and inspect all warnings.
- Test phone, tablet, and desktop layouts.

## 5. Deploy the CAP backend first

Follow the companion repository's `DEPLOYMENT.md`:

```text
https://github.com/ilham-mmr/sap-cap-learning-project
```

After deployment, obtain the CAP application route:

```bash
cf app sap-cap-learning-project-srv
```

Example shape:

```text
https://sap-cap-learning-project-srv-<random>.<landscape-domain>
```

## 6. Configure the CAP destination

In `mta.yaml`, replace the placeholder destination URL:

```yaml
Name: cap-learning-api
URL: https://REPLACE-WITH-CAP-ROUTE.example.com
HTML5.ForwardAuthToken: true
```

For real landscapes, avoid permanently hardcoding environment-specific URLs in the repository. Better options include:

- Maintain the destination separately in each subaccount.
- Supply environment-specific deployment parameters through an approved pipeline.
- Use a destination-content module with controlled extension descriptors.

The destination name must match the route reference in `xs-app.json`:

```json
"destination": "cap-learning-api"
```

### Authentication note

The sample forwards the logged-in user's token to the CAP backend. The frontend and backend trust/security setup must be compatible. In production, coordinate XSUAA configuration, scopes, role collections, and token exchange with your BTP security design.

Do not switch to `NoAuthentication` with public backend endpoints merely to make an authorization error disappear.

## 7. Login to Cloud Foundry

```bash
cf login -a <api-endpoint>
cf target -o <organization> -s <space>
cf target
```

The target space should normally be the DEV subaccount/space for initial deployment.

## 8. Build the MTAR

```bash
mbt build
```

Expected output:

```text
mta_archives/sap-fiori-freestyle-learning-project_1.0.0.mtar
```

The build performs:

1. npm dependency installation
2. UI5 optimized build
3. ZIP packaging of `dist/`
4. MTA packaging

If `zip` is unavailable on your build environment, install it or replace that build step with an approved archive command supported by your CI runner.

## 9. Deploy to BTP

```bash
cf deploy mta_archives/sap-fiori-freestyle-learning-project_1.0.0.mtar
```

The deployment creates or updates:

- HTML5 repository host instance
- Destination service instance and destination content
- XSUAA instance
- UI5 application content

Check:

```bash
cf services
cf apps
```

A pure HTML5 repository deployment may not create a normal long-running UI app in `cf apps`; the content is stored in the repository service.

## 10. Verify HTML5 application content

In the BTP cockpit:

1. Open the target subaccount.
2. Go to **HTML5 Applications**.
3. Confirm the application is listed.
4. Open it and inspect browser Network requests.
5. Confirm `/odata/v4/learning/` resolves through the destination.

Common results:

- UI loads but data returns `401`: authentication/token forwarding issue.
- UI loads but data returns `403`: user is authenticated but lacks CAP role.
- UI returns `404` for `/odata`: route or destination target mismatch.
- Application is absent: content module/build packaging failed.

## 11. Add to SAP Build Work Zone

Typical steps:

1. Subscribe to SAP Build Work Zone, standard edition.
2. Open **Channel Manager** or **Content Manager** depending on your setup.
3. Add/synchronize the HTML5 application content provider.
4. Create or import the app content item.
5. Assign it to a role.
6. Add it to a group or space/page.
7. Assign the corresponding Work Zone role collection to users.

The user may need both:

- Permission to open the Work Zone/UI application
- CAP backend roles such as Viewer, Editor, or Admin

These are related but separate authorization layers.

## 12. Launchpad intent navigation

For cross-application navigation, define semantic object/action metadata in the application descriptor and configure the target mapping in Work Zone.

Conceptual example:

```text
Semantic Object: Product
Action: manage
Intent: #Product-manage
```

Do not hardcode full application URLs for navigation between Launchpad apps. Intent-based navigation allows the shell to resolve the correct target per environment.

## 13. DEV → QA → PROD transport

Recommended flow:

```text
Git commit
  -> lint and tests
  -> UI5/MTA build
  -> DEV deployment
  -> functional validation
  -> Cloud Transport Management
  -> QA import/UAT
  -> approval
  -> PROD import
```

The same versioned artifact should move across environments. Do not rebuild different source code for QA and PROD.

Environment-specific configuration belongs in:

- Destinations
- Role collections
- Identity-provider mappings
- Deployment parameters/extension descriptors
- Work Zone content assignments

## 14. CI/CD outline

A basic pipeline should:

```text
checkout
  -> npm ci
  -> npm run lint
  -> unit tests
  -> npm run build
  -> mbt build
  -> publish MTAR artifact
  -> deploy/transport after approval
```

Never place BTP passwords or service keys directly in the workflow YAML. Use the CI platform's protected secret store or an approved identity-based deployment mechanism.

## 15. Troubleshooting

### Blank page

Check:

- Browser console JavaScript errors
- Resource-root namespace versus `sap.app/id`
- Root view and controller names
- Invalid XML syntax
- Missing UI5 library dependency
- Incorrect `Component.js` or `manifest.json`

### OData metadata fails

Open:

```text
/odata/v4/learning/$metadata
```

Check:

- CAP app is running
- Destination URL is correct
- `xs-app.json` target path preserves `/odata`
- Authentication and token forwarding
- Browser Network response body

### Create/update does not send

Check:

- The model's `updateGroupId` is `changes`
- `submitBatch("changes")` is called
- There are pending changes
- Inputs are bound to the intended context
- CAP role permits CREATE/UPDATE
- MessageManager contains backend validation errors

### Dialog opens multiple times or leaks

Check:

- Fragment Promise is cached
- Dialog is added as a view dependent
- Fragment IDs use the view ID prefix
- References are cleared during controller destruction

### App is deployed but missing from Work Zone

Check:

- HTML5 app exists in the subaccount
- Content provider synchronized
- App assigned to role
- Role assigned to user
- App placed in a visible space/page or group
- `sap.cloud.service` values align across content and destination configuration

## 16. Updating the application

1. Change source files.
2. Run lint/tests locally.
3. Increment version where appropriate.
4. Build a new MTAR.
5. Deploy to DEV.
6. Validate and transport the same artifact onward.

```bash
npm ci
npm run lint
mbt build
cf deploy mta_archives/<new-version>.mtar
```

## 17. Rollback

Preferred rollback:

- Redeploy the last known-good MTAR.
- Restore previous destination/Work Zone configuration if that changed.
- Avoid deleting shared service instances as a first response.

UI rollback is usually simpler than database rollback because HTML5 content is static, but compatibility with the currently deployed CAP API must still be checked.

## 18. Production checklist

- [ ] No localhost or placeholder backend URL remains
- [ ] UI5 lint and tests pass
- [ ] OData requests use relative paths/destinations
- [ ] CAP backend authorization tested for each role
- [ ] Work Zone role/content assignments reviewed
- [ ] No credentials committed
- [ ] Accessibility and responsive behavior tested
- [ ] Error messages are understandable
- [ ] Browser caching/version behavior tested
- [ ] DEV/QA/PROD destination configuration separated
- [ ] MTAR stored as a versioned pipeline artifact
- [ ] Rollback artifact available
