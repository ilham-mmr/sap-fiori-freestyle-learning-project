/* global window */

/**
 * Minimal local SAP Fiori launchpad sandbox configuration.
 *
 * The intent is Product-display:
 * - semantic object: Product
 * - action: display
 *
 * Internal UI5 routing still controls hashes after the intent, while the shell
 * is responsible for launching the application component.
 */
window["sap-ushell-config"] = {
  defaultRenderer: "fiori2",

  renderers: {
    fiori2: {
      componentData: {
        config: {
          enableSearch: false
        }
      }
    }
  },

  applications: {
    "Product-display": {
      title: "Product Administration",
      description: "SAPUI5 freestyle certification learning app",
      additionalInformation: "SAPUI5.Component=sap.fiori.learning",
      applicationType: "URL",
      url: "../"
    }
  }
};
