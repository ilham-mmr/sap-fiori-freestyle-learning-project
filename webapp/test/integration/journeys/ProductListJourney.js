sap.ui.define([
  "sap/ui/test/opaQunit",
  "../pages/ProductList"
], function (opaTest) {
  "use strict";

  QUnit.module("Product List Journey");

  opaTest("Should open the product list and accept search input", function (Given, When, Then) {
    Given.iStartMyUIComponent({
      componentConfig: {
        name: "sap.fiori.learning"
      },
      hash: ""
    });

    Then.onTheProductList.iShouldSeeTheProductTable();
    When.onTheProductList.iSearchFor("USB");
    Then.onTheProductList.iShouldSeeTheSearchText("USB");

    Then.iTeardownMyApp();
  });
});
