sap.ui.define([
  "./BaseController"
], function (BaseController) {
  "use strict";

  /**
   * Handles unknown application hashes.
   *
   * A dedicated target is better than leaving the user on a blank page. It
   * also gives OPA5 a stable, testable recovery path.
   */
  return BaseController.extend("sap.fiori.learning.controller.NotFound", {
    onNavHome: function () {
      // Replace the invalid hash so Back does not immediately reopen it.
      this.getRouter().navTo("productList", {}, true);
    }
  });
});
