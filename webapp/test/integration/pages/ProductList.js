sap.ui.define([
  "sap/ui/test/Opa5",
  "sap/ui/test/actions/EnterText",
  "sap/ui/test/matchers/PropertyStrictEquals"
], function (Opa5, EnterText, PropertyStrictEquals) {
  "use strict";

  const sViewName = "ProductList";

  Opa5.createPageObjects({
    onTheProductList: {
      actions: {
        iSearchFor: function (sText) {
          return this.waitFor({
            id: "productSearchField",
            viewName: sViewName,
            actions: new EnterText({
              text: sText,
              clearTextFirst: true
            }),
            errorMessage: "The product search field was not available"
          });
        }
      },

      assertions: {
        iShouldSeeTheProductTable: function () {
          return this.waitFor({
            id: "productTable",
            viewName: sViewName,
            success: function (oTable) {
              Opa5.assert.ok(oTable, "The product table is visible");
            },
            errorMessage: "The product table was not found"
          });
        },

        iShouldSeeTheSearchText: function (sText) {
          return this.waitFor({
            id: "productSearchField",
            viewName: sViewName,
            matchers: new PropertyStrictEquals({
              name: "value",
              value: sText
            }),
            success: function () {
              Opa5.assert.ok(true, `The search field contains '${sText}'`);
            },
            errorMessage: "The search value was not updated"
          });
        }
      }
    }
  });
});
