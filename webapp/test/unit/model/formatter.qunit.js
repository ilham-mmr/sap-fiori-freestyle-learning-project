sap.ui.define([
  "sap/fiori/learning/model/formatter"
], function (formatter) {
  "use strict";

  QUnit.module("Formatter");

  QUnit.test("stockText marks values below ten as low stock", function (assert) {
    assert.strictEqual(
      formatter.stockText(8),
      "Low stock (8)",
      "Low-stock text contains the numeric value"
    );
  });

  QUnit.test("stockText marks values from ten as in stock", function (assert) {
    assert.strictEqual(
      formatter.stockText(10),
      "In stock (10)",
      "Boundary value ten is not low stock"
    );
  });

  QUnit.test("stockState returns semantic UI5 states", function (assert) {
    assert.strictEqual(formatter.stockState(2), "Warning", "Low stock is Warning");
    assert.strictEqual(formatter.stockState(20), "Success", "Healthy stock is Success");
  });
});
