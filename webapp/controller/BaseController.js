sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
], function (Controller, MessageBox) {
  "use strict";

  return Controller.extend("sap.fiori.learning.controller.BaseController", {
    getRouter: function () {
      return this.getOwnerComponent().getRouter();
    },

    getModel: function (sName) {
      return this.getView().getModel(sName);
    },

    setModel: function (oModel, sName) {
      this.getView().setModel(oModel, sName);
      return this;
    },

    getResourceBundle: function () {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },

    /**
     * Convert an OData/network error into a message useful to a human.
     * The exact backend payload can vary, so every parsing step is guarded.
     */
    showError: function (oError, sFallbackText) {
      let sMessage = sFallbackText || "The operation failed.";

      try {
        const oBody = JSON.parse(oError?.responseText || oError?.cause?.message || "{}");
        sMessage = oBody?.error?.message || sMessage;
      } catch (oParseError) {
        sMessage = oError?.message || sMessage;
      }

      MessageBox.error(sMessage);
    }
  });
});
