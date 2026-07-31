sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast"
], function (
  BaseController,
  JSONModel,
  Filter,
  FilterOperator,
  Sorter,
  Fragment,
  MessageToast
) {
  "use strict";

  return BaseController.extend("sap.fiori.learning.controller.ProductList", {
    onInit: function () {
      // View-local state belongs in a named JSONModel, not in the OData model.
      this.setModel(new JSONModel({
        busy: false,
        searchText: "",
        create: {
          name: "",
          description: "",
          price: 1,
          stock: 0,
          active: true
        }
      }), "view");
    },

    onSearch: function (oEvent) {
      const sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || "";
      const oBinding = this.byId("productTable").getBinding("items");

      // With an OData V4 list binding, UI5 translates supported filters to
      // server-side $filter. This avoids downloading every record first.
      const aFilters = sQuery ? [
        new Filter({
          filters: [
            new Filter("name", FilterOperator.Contains, sQuery),
            new Filter("description", FilterOperator.Contains, sQuery)
          ],
          and: false
        })
      ] : [];

      oBinding.filter(aFilters);
    },

    onSortByName: function () {
      this.byId("productTable").getBinding("items").sort(new Sorter("name", false));
    },

    onItemPress: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      const sProductID = oContext.getProperty("ID");

      // Route parameters become part of the URL hash and should be encoded.
      this.getRouter().navTo("productDetail", {
        productId: encodeURIComponent(sProductID)
      });
    },

    onOpenCreateDialog: async function () {
      if (!this._pCreateDialog) {
        // Cache the Promise so rapid clicks cannot create duplicate dialogs.
        this._pCreateDialog = Fragment.load({
          id: this.getView().getId(),
          name: "sap.fiori.learning.fragment.CreateProduct",
          controller: this
        }).then((oDialog) => {
          this.getView().addDependent(oDialog);
          return oDialog;
        });
      }

      const oDialog = await this._pCreateDialog;
      oDialog.open();
    },

    onCancelCreate: async function () {
      const oDialog = await this._pCreateDialog;
      oDialog.close();
      this._resetCreateForm();
    },

    onCreateProduct: async function () {
      const oViewModel = this.getModel("view");
      const oPayload = { ...oViewModel.getProperty("/create") };
      const oListBinding = this.byId("productTable").getBinding("items");

      if (!String(oPayload.name || "").trim()) {
        this.showError(null, "Product name is required.");
        return;
      }

      oViewModel.setProperty("/busy", true);
      try {
        // OData V4 creates through a list binding, not the old V2
        // oModel.create(...) API.
        const oCreatedContext = oListBinding.create(oPayload);
        await oCreatedContext.created();

        const oDialog = await this._pCreateDialog;
        oDialog.close();
        this._resetCreateForm();
        MessageToast.show("Product created");
      } catch (oError) {
        this.showError(oError, "Could not create the product.");
      } finally {
        oViewModel.setProperty("/busy", false);
      }
    },

    _resetCreateForm: function () {
      this.getModel("view").setProperty("/create", {
        name: "",
        description: "",
        price: 1,
        stock: 0,
        active: true
      });
    },

    onExit: function () {
      // Dependents are destroyed with the view, but clearing our reference
      // prevents accidental reuse after controller destruction.
      this._pCreateDialog = null;
    }
  });
});
