sap.ui.define([], function () {
  "use strict";

  /**
   * Formatter functions should be pure: input values in, display values out.
   * Do not perform network requests or mutate models from a formatter.
   */
  return {
    stockText: function (iStock) {
      const iValue = Number(iStock || 0);
      return iValue < 10 ? `Low stock (${iValue})` : `In stock (${iValue})`;
    },

    stockState: function (iStock) {
      return Number(iStock || 0) < 10 ? "Warning" : "Success";
    }
  };
});
