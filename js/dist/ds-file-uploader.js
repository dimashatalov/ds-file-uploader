/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DSFileUploader", [], factory);
	else if(typeof exports === 'object')
		exports["DSFileUploader"] = factory();
	else
		root["DSFileUploader"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ds-file-uploader.ts":
/*!*****************************!*\
  !*** ./ds-file-uploader.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/form */ \"./models/form.ts\");\n\r\nvar DSFileUploader = /** @class */ (function () {\r\n    function DSFileUploader(formID, settings) {\r\n        this.args = {};\r\n        this.processSettings(settings);\r\n        this.form = new _models_form__WEBPACK_IMPORTED_MODULE_0__[\"default\"](formID);\r\n    }\r\n    DSFileUploader.prototype.set = function (k, v) {\r\n        this.args[k] = v;\r\n    };\r\n    DSFileUploader.prototype.get = function (k) {\r\n    };\r\n    DSFileUploader.prototype.getDefaultSettings = function () {\r\n        return {\r\n            retries: 10,\r\n            filesLimit: 10,\r\n            fileChunkBytes: 800000,\r\n            uidPrefix: \"no-prefix\",\r\n            folder: \"all-files\",\r\n            uploadUrl: location.href,\r\n            customVars: {},\r\n            allowTypes: new Array(),\r\n            requestHeaders: {\r\n                'Accept': 'application/json',\r\n                'Content-Type': 'application/json'\r\n            }\r\n        };\r\n    };\r\n    DSFileUploader.prototype.processSettings = function (settings) {\r\n        console.log(\"settings\", settings);\r\n        var defaultSettings = this.getDefaultSettings();\r\n        for (var settingsKey in defaultSettings) {\r\n            if (typeof settings[settingsKey] !== \"undefined\")\r\n                this.set(settingsKey, settings[settingsKey]);\r\n            else\r\n                this.set(settingsKey, defaultSettings[settingsKey]);\r\n        }\r\n        console.log(\"this.args\", this.args);\r\n    };\r\n    return DSFileUploader;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DSFileUploader);\r\n\n\n//# sourceURL=webpack://DSFileUploader/./ds-file-uploader.ts?");

/***/ }),

/***/ "./models/file-input.ts":
/*!******************************!*\
  !*** ./models/file-input.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/*import FileInput from './file-input';*/\r\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\r\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\r\n        if (ar || !(i in from)) {\r\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\r\n            ar[i] = from[i];\r\n        }\r\n    }\r\n    return to.concat(ar || Array.prototype.slice.call(from));\r\n};\r\nvar FileInput = /** @class */ (function () {\r\n    function FileInput(obj, settings) {\r\n        this.dom = obj;\r\n        this.settings = settings;\r\n        this.listenEvents();\r\n    }\r\n    FileInput.prototype.listenEvents = function () {\r\n        var onInputFileChange = this.onInputFileChange.bind(this);\r\n        this.dom.addEventListener(\"change\", onInputFileChange);\r\n    };\r\n    FileInput.prototype.onInputFileChange = function () {\r\n        this.files = __spreadArray([], this.dom.files, true);\r\n        if (typeof this.settings.onFileSelection != \"undefined\") {\r\n            var f = this.settings.onFileSelection.bind(this);\r\n            f();\r\n        }\r\n    };\r\n    return FileInput;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileInput);\r\n\n\n//# sourceURL=webpack://DSFileUploader/./models/file-input.ts?");

/***/ }),

/***/ "./models/form.ts":
/*!************************!*\
  !*** ./models/form.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _file_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file-input */ \"./models/file-input.ts\");\n\r\nvar Form = /** @class */ (function () {\r\n    function Form(formID) {\r\n        this.formID = formID;\r\n        this.fileInputs = [];\r\n        this.findForm();\r\n        this.findFileInputs();\r\n    }\r\n    Form.prototype.findForm = function () {\r\n        var formObject = document.getElementById(this.formID);\r\n        if (!formObject) {\r\n            throw new Error('No form');\r\n        }\r\n        this.formObject = formObject;\r\n    };\r\n    Form.prototype.findFileInputs = function () {\r\n        var _this = this;\r\n        var formElements = Array.from(this.formObject.elements);\r\n        formElements.map(function (element) {\r\n            if (element.getAttribute(\"type\") != \"file\")\r\n                return false;\r\n            else {\r\n                _this.fileInputs.push(new _file_input__WEBPACK_IMPORTED_MODULE_0__[\"default\"](element, {\r\n                    onFileSelection: function () {\r\n                        console.log(\"onFileSelection\", this);\r\n                    }\r\n                }));\r\n            }\r\n        });\r\n    };\r\n    return Form;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Form);\r\n\n\n//# sourceURL=webpack://DSFileUploader/./models/form.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ds-file-uploader.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});