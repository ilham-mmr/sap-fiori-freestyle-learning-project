sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast",
  "../util/Validator"
], function (
  BaseController,
  JSONModel,
  Filter,
  FilterOperator,
  Sorter,
  Fragment,
  MessageToast,
  Validator
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

      // Keep the search and settings state separate, then combine them in one
      // place. This avoids one toolbar action accidentally deleting another
      // action's filters.
      this._sSearchQuery = "";
      this._aSettingsFilters = [];
      this._oSorter = new Sorter("name", false);
    },

    onSearch: function (oEvent) {
      this._sSearchQuery = oEvent.getParameter("query") ||
        oEvent.getParameter("newValue") || "";
      this.getModel("view").setProperty("/searchText", this._sSearchQuery);
      this._applyListSettings();
    },

    onSortByName: function () {
      // Kept as a small direct-sort example. The ViewSettingsDialog below is
      // the more complete Fiori pattern for combined sort/filter settings.
      this._oSorter = new Sorter("name", false);
      this._applyListSettings();
    },

    onOpenProductSettings: async function () {
      if (!this._pProductSettingsDialog) {
        this._pProductSettingsDialog = Fragment.load({
          id: this.getView().getId(),
          name: "sap.fiori.learning.fragment.ProductSettings",
          controller: this
        }).then((oDialog) => {
          this.getView().addDependent(oDialog);
          return oDialog;
        });
      }

      const oDialog = await this._pProductSettingsDialog;
      oDialog.open();
    },

    onConfirmProductSettings: function (oEvent) {
      const oParameters = oEvent.getParameters();
      const sSortKey = oParameters.sortItem?.getKey() || "name";

      this._oSorter = new Sorter(sSortKey, Boolean(oParameters.sortDescending));
      this._aSettingsFilters = (oParameters.filterItems || [])
        .map((oItem) => this._createSettingsFilter(oItem.getKey()))
        .filter(Boolean);

      this._applyListSettings();
    },

    _createSettingsFilter: function (sKey) {
      switch (sKey) {
        case "active":
          return new Filter("active", FilterOperator.EQ, true);
        case "inactive":
          return new Filter("active", FilterOperator.EQ, false);
        case "lowStock":
          return new Filter("stock", FilterOperator.LT, 10);
        default:
          return null;
      }
    },

    _applyListSettings: function () {
      const oBinding = this.byId("productTable").getBinding("items");
      const aAndGroups = [];

      if (this._sSearchQuery) {
        // The inner group is OR: name contains query OR description contains
        // query. UI5 translates supported OData V4 filters into $filter.
        aAndGroups.push(new Filter({
          filters: [
            new Filter("name", FilterOperator.Contains, this._sSearchQuery),
            new Filter("description", FilterOperator.Contains, this._sSearchQuery)
          ],
          and: false
        }));
      }

      if (this._aSettingsFilters.length > 0) {
        // Selected status options are alternatives, therefore OR.
        aAndGroups.push(new Filter({
          filters: this._aSettingsFilters,
          and: false
        }));
      }

      // The search group and status group must both match, therefore AND.
      const aFinalFilters = aAndGroups.length > 0 ? [new Filter({
        filters: aAndGroups,
        and: true
      })] : [];

      oBinding.filter(aFinalFilters);
      oBinding.sort(this._oSorter);
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
      const oValidation = Validator.validateProduct(oPayload);
      const oListBinding = this.byId("productTable").getBinding("items");

      if (!oValidation.valid) {
        this.showError(null, oValidation.errors.join("\n"));
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
        MessageToast.show(this.getResourceBundle().getText("productCreated"));
      } catch (oError) {
        this.showError(oError, this.getResourceBundle().getText("createProductError"));
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
      // Dependents are destroyed with the view, but clearing our references
      // prevents accidental reuse after controller destruction.
      this._pCreateDialog = null;
      this._pProductSettingsDialog = null;
    }
  });
});
