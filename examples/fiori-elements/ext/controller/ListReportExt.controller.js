sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension",
  "sap/m/MessageToast"
], function (ControllerExtension, MessageToast) {
  "use strict";

  /**
   * Example Fiori elements for OData V4 controller extension.
   *
   * Use SAP Fiori tools to generate the real project and manifest wiring. The
   * generated namespace and extension registration depend on your template.
   *
   * Certification lesson:
   * - use extension APIs
   * - do not manipulate generated DOM
   * - do not depend on generated control IDs
   */
  return ControllerExtension.extend(
    "sap.fiori.learning.fe.ext.controller.ListReportExt",
    {
      override: {
        onInit: function () {
          // Keep initialization small. Standard List Report behavior remains
          // owned by Fiori elements.
        }
      },

      onShowSelectionCount: function () {
        const oExtensionAPI = this.base.getExtensionAPI();
        const aSelectedContexts = oExtensionAPI.getSelectedContexts();

        MessageToast.show(`${aSelectedContexts.length} row(s) selected`);
      },

      onRefreshWithFeedback: async function () {
        const oExtensionAPI = this.base.getExtensionAPI();

        // Refresh through the documented extension boundary instead of
        // finding and refreshing an internal generated table control.
        await oExtensionAPI.refresh();
        MessageToast.show("Product data refreshed");
      }
    }
  );
});
