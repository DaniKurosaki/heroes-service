import {
  ɵɵdefinePipe
} from "./chunk-762QS4QD.js";

// src/app/modules/shared/pipes/capitalize.pipe.ts
var _CapitalizePipe = class _CapitalizePipe {
  /**
   * Capitalizes the first letter of a string.
   * @param value The string to capitalize.
   * @returns The string with the first letter capitalized.
   */
  transform(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
};
_CapitalizePipe.\u0275fac = function CapitalizePipe_Factory(t) {
  return new (t || _CapitalizePipe)();
};
_CapitalizePipe.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "capitalize", type: _CapitalizePipe, pure: true, standalone: true });
var CapitalizePipe = _CapitalizePipe;
export {
  CapitalizePipe
};
/**i18n:a8bf72b064f6d5b4776240a6a03444d01718da9c4dfaa6a125dd667f1f627cde*/
//# sourceMappingURL=chunk-3SAMS2A5.js.map
