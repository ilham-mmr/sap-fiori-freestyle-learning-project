sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Messaging"
], function (UIComponent, Device, JSONModel, Messaging) {
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

      // Messaging collects validation and OData messages centrally. Exposing
      // the message model allows a future MessagePopover to bind directly to
      // {/} on the named "message" model.
      Messaging.registerObject(this, true);
      this.setModel(Messaging.getMessageModel(), "message");

      // Routing starts only after models and shared state are ready.
      this.getRouter().initialize();
    },

    destroy: function () {
      Messaging.unregisterObject(this);
      UIComponent.prototype.destroy.apply(this, arguments);
    }
  });
});
