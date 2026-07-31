sap.ui.define([], function () {
  "use strict";

  /**
   * Pure validation utility.
   *
   * Why keep this outside a controller?
   * - It can be unit tested without rendering controls.
   * - It avoids duplicating rules between create/edit screens.
   * - It keeps controllers focused on UI orchestration.
   *
   * Important: frontend validation improves usability, but the CAP backend
   * must still validate the same business data because browser code is not a
   * security boundary.
   */
  return {
    validateProduct: function (oProduct) {
      const aErrors = [];
      const sName = String(oProduct?.name || "").trim();
      const nPrice = Number(oProduct?.price);
      const nStock = Number(oProduct?.stock);

      if (!sName) {
        aErrors.push("Product name is required.");
      }

      if (!Number.isFinite(nPrice) || nPrice <= 0) {
        aErrors.push("Price must be greater than zero.");
      }

      if (!Number.isInteger(nStock) || nStock < 0) {
        aErrors.push("Stock must be a non-negative integer.");
      }

      return {
        valid: aErrors.length === 0,
        errors: aErrors
      };
    }
  };
});
