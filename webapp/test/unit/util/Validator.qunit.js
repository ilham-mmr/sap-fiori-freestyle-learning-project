sap.ui.define([
  "sap/fiori/learning/util/Validator"
], function (Validator) {
  "use strict";

  QUnit.module("Product Validator");

  QUnit.test("accepts a valid product", function (assert) {
    const oResult = Validator.validateProduct({
      name: "USB-C Dock",
      price: 850000,
      stock: 5
    });

    assert.true(oResult.valid, "Valid product passes validation");
    assert.deepEqual(oResult.errors, [], "No errors are returned");
  });

  QUnit.test("rejects blank name, non-positive price, and negative stock", function (assert) {
    const oResult = Validator.validateProduct({
      name: "   ",
      price: 0,
      stock: -1
    });

    assert.false(oResult.valid, "Invalid product is rejected");
    assert.strictEqual(oResult.errors.length, 3, "All three errors are collected");
  });

  QUnit.test("rejects decimal stock", function (assert) {
    const oResult = Validator.validateProduct({
      name: "Keyboard",
      price: 100,
      stock: 1.5
    });

    assert.false(oResult.valid, "Stock must be an integer");
    assert.ok(
      oResult.errors.some((sError) => sError.includes("non-negative integer")),
      "The stock validation message is returned"
    );
  });
});
