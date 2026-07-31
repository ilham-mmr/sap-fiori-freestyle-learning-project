sap.ui.define([
  "./BaseController"
], function (BaseController) {
  "use strict";

  /**
   * Root controller kept intentionally small.
   * App-wide business logic should not accumulate here; shared helpers belong
   * in BaseController or dedicated modules, and backend rules belong in CAP.
   */
  return BaseController.extend("sap.fiori.learning.controller.App", {});
});
