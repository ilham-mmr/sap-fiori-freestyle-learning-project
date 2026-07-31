sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  "../util/Validator"
], function (BaseController, JSONModel, MessageBox, MessageToast, Validator) {
  "use strict";

  return BaseController.extend("sap.fiori.learning.controller.ProductDetail", {
    onInit: function () {
      this.setModel(new JSONModel({
        busy: false,
        editMode: false
      }), "view");

      // Route matching is used instead of relying only on onInit because the
      // same detail view can be reused for many product IDs.
      this.getRouter()
        .getRoute("productDetail")
        .attachPatternMatched(this._onProductMatched, this);
    },

    _onProductMatched: function (oEvent) {
      const sProductID = decodeURIComponent(oEvent.getParameter("arguments").productId);
      this.getModel("view").setProperty("/editMode", false);

      // A canonical OData V4 entity path uses the key predicate. UUID values
      // are supported directly by the CAP OData service.
      this.getView().bindElement({
        path: `/Products(${sProductID})`,
        parameters: {
          $select: "ID,name,description,price,stock,active,createdAt,modifiedAt"
        },
        events: {
          dataRequested: () => this.getModel("view").setProperty("/busy", true),
          dataReceived: (oDataEvent) => {
            this.getModel("view").setProperty("/busy", false);
            if (oDataEvent.getParameter("error")) {
              this.showError(
                oDataEvent.getParameter("error"),
                this.getResourceBundle().getText("productLoadError")
              );
            }
          }
        }
      });
    },

    onNavBack: function () {
      this.getRouter().navTo("productList", {}, true);
    },

    onEdit: function () {
      this.getModel("view").setProperty("/editMode", true);
    },

    onCancel: function () {
      const oModel = this.getModel();

      // Reset only the application update group. This discards unsent changes
      // without reloading every entity in the model.
      oModel.resetChanges("changes");
      this.getModel("view").setProperty("/editMode", false);
    },

    onSave: async function () {
      const oViewModel = this.getModel("view");
      const oModel = this.getModel();
      const oContext = this.getView().getBindingContext();
      const oValidation = Validator.validateProduct(oContext?.getObject());

      if (!oValidation.valid) {
        this.showError(null, oValidation.errors.join("\n"));
        return;
      }

      oViewModel.setProperty("/busy", true);
      try {
        // Inputs use $$updateGroupId='changes'. submitBatch sends all pending
        // changes in that group together, reducing HTTP round trips.
        //
        // The CAP service exposes an ETag. UI5 sends If-Match automatically;
        // a stale version can therefore be rejected instead of overwriting a
        // newer update from another user.
        await oModel.submitBatch("changes");

        if (oModel.hasPendingChanges("changes")) {
          throw new Error("Some changes remain pending after batch submission.");
        }

        oViewModel.setProperty("/editMode", false);
        MessageToast.show(this.getResourceBundle().getText("productSaved"));
      } catch (oError) {
        this.showError(oError, this.getResourceBundle().getText("saveProductError"));
      } finally {
        oViewModel.setProperty("/busy", false);
      }
    },

    onDelete: function () {
      MessageBox.confirm(this.getResourceBundle().getText("deleteProductConfirm"), {
        emphasizedAction: MessageBox.Action.DELETE,
        actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
        onClose: async (sAction) => {
          if (sAction !== MessageBox.Action.DELETE) return;

          const oViewModel = this.getModel("view");
          const oContext = this.getView().getBindingContext();
          oViewModel.setProperty("/busy", true);

          try {
            await oContext.delete();
            MessageToast.show(this.getResourceBundle().getText("productDeleted"));
            this.getRouter().navTo("productList", {}, true);
          } catch (oError) {
            this.showError(oError, this.getResourceBundle().getText("deleteProductError"));
          } finally {
            oViewModel.setProperty("/busy", false);
          }
        }
      });
    }
  });
});
