sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "sap/ui/model/json/JSONModel"
], function (UIComponent, Device, JSONModel) {
  "use strict";

  return UIComponent.extend("sap.fiori.learning.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      // Always call the parent init first. It creates models declared in
      // manifest.json and performs the framework's component initialization.
      UIComponent.prototype.init.apply(this, arguments);

      // A named JSONModel is ideal for application-wide UI state that does not
      // belong in the backend, such as device information or shell flags.
      this.setModel(new JSONModel(Device), "device");

      // MessageManager collects validation and OData messages centrally.
      // Registering the component makes messages available to child controls.
      sap.ui.getCore().getMessageManager().registerObject(this, true);

      // Routing starts only after models and shared state are ready.
      this.getRouter().initialize();
    },

    destroy: function () {
      sap.ui.getCore().getMessageManager().unregisterObject(this);
      UIComponent.prototype.destroy.apply(this, arguments);
    }
  });
});
