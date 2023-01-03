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
		define("DSFileManager", [], factory);
	else if(typeof exports === 'object')
		exports["DSFileManager"] = factory();
	else
		root["DSFileManager"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/slugify/slugify.js":
/*!*****************************************!*\
  !*** ./node_modules/slugify/slugify.js ***!
  \*****************************************/
/***/ (function(module) {

eval("\n;(function (name, root, factory) {\n  if (true) {\n    module.exports = factory()\n    module.exports[\"default\"] = factory()\n  }\n  /* istanbul ignore next */\n  else {}\n}('slugify', this, function () {\n  var charMap = JSON.parse('{\"$\":\"dollar\",\"%\":\"percent\",\"&\":\"and\",\"<\":\"less\",\">\":\"greater\",\"|\":\"or\",\"¢\":\"cent\",\"£\":\"pound\",\"¤\":\"currency\",\"¥\":\"yen\",\"©\":\"(c)\",\"ª\":\"a\",\"®\":\"(r)\",\"º\":\"o\",\"À\":\"A\",\"Á\":\"A\",\"Â\":\"A\",\"Ã\":\"A\",\"Ä\":\"A\",\"Å\":\"A\",\"Æ\":\"AE\",\"Ç\":\"C\",\"È\":\"E\",\"É\":\"E\",\"Ê\":\"E\",\"Ë\":\"E\",\"Ì\":\"I\",\"Í\":\"I\",\"Î\":\"I\",\"Ï\":\"I\",\"Ð\":\"D\",\"Ñ\":\"N\",\"Ò\":\"O\",\"Ó\":\"O\",\"Ô\":\"O\",\"Õ\":\"O\",\"Ö\":\"O\",\"Ø\":\"O\",\"Ù\":\"U\",\"Ú\":\"U\",\"Û\":\"U\",\"Ü\":\"U\",\"Ý\":\"Y\",\"Þ\":\"TH\",\"ß\":\"ss\",\"à\":\"a\",\"á\":\"a\",\"â\":\"a\",\"ã\":\"a\",\"ä\":\"a\",\"å\":\"a\",\"æ\":\"ae\",\"ç\":\"c\",\"è\":\"e\",\"é\":\"e\",\"ê\":\"e\",\"ë\":\"e\",\"ì\":\"i\",\"í\":\"i\",\"î\":\"i\",\"ï\":\"i\",\"ð\":\"d\",\"ñ\":\"n\",\"ò\":\"o\",\"ó\":\"o\",\"ô\":\"o\",\"õ\":\"o\",\"ö\":\"o\",\"ø\":\"o\",\"ù\":\"u\",\"ú\":\"u\",\"û\":\"u\",\"ü\":\"u\",\"ý\":\"y\",\"þ\":\"th\",\"ÿ\":\"y\",\"Ā\":\"A\",\"ā\":\"a\",\"Ă\":\"A\",\"ă\":\"a\",\"Ą\":\"A\",\"ą\":\"a\",\"Ć\":\"C\",\"ć\":\"c\",\"Č\":\"C\",\"č\":\"c\",\"Ď\":\"D\",\"ď\":\"d\",\"Đ\":\"DJ\",\"đ\":\"dj\",\"Ē\":\"E\",\"ē\":\"e\",\"Ė\":\"E\",\"ė\":\"e\",\"Ę\":\"e\",\"ę\":\"e\",\"Ě\":\"E\",\"ě\":\"e\",\"Ğ\":\"G\",\"ğ\":\"g\",\"Ģ\":\"G\",\"ģ\":\"g\",\"Ĩ\":\"I\",\"ĩ\":\"i\",\"Ī\":\"i\",\"ī\":\"i\",\"Į\":\"I\",\"į\":\"i\",\"İ\":\"I\",\"ı\":\"i\",\"Ķ\":\"k\",\"ķ\":\"k\",\"Ļ\":\"L\",\"ļ\":\"l\",\"Ľ\":\"L\",\"ľ\":\"l\",\"Ł\":\"L\",\"ł\":\"l\",\"Ń\":\"N\",\"ń\":\"n\",\"Ņ\":\"N\",\"ņ\":\"n\",\"Ň\":\"N\",\"ň\":\"n\",\"Ō\":\"O\",\"ō\":\"o\",\"Ő\":\"O\",\"ő\":\"o\",\"Œ\":\"OE\",\"œ\":\"oe\",\"Ŕ\":\"R\",\"ŕ\":\"r\",\"Ř\":\"R\",\"ř\":\"r\",\"Ś\":\"S\",\"ś\":\"s\",\"Ş\":\"S\",\"ş\":\"s\",\"Š\":\"S\",\"š\":\"s\",\"Ţ\":\"T\",\"ţ\":\"t\",\"Ť\":\"T\",\"ť\":\"t\",\"Ũ\":\"U\",\"ũ\":\"u\",\"Ū\":\"u\",\"ū\":\"u\",\"Ů\":\"U\",\"ů\":\"u\",\"Ű\":\"U\",\"ű\":\"u\",\"Ų\":\"U\",\"ų\":\"u\",\"Ŵ\":\"W\",\"ŵ\":\"w\",\"Ŷ\":\"Y\",\"ŷ\":\"y\",\"Ÿ\":\"Y\",\"Ź\":\"Z\",\"ź\":\"z\",\"Ż\":\"Z\",\"ż\":\"z\",\"Ž\":\"Z\",\"ž\":\"z\",\"Ə\":\"E\",\"ƒ\":\"f\",\"Ơ\":\"O\",\"ơ\":\"o\",\"Ư\":\"U\",\"ư\":\"u\",\"ǈ\":\"LJ\",\"ǉ\":\"lj\",\"ǋ\":\"NJ\",\"ǌ\":\"nj\",\"Ș\":\"S\",\"ș\":\"s\",\"Ț\":\"T\",\"ț\":\"t\",\"ə\":\"e\",\"˚\":\"o\",\"Ά\":\"A\",\"Έ\":\"E\",\"Ή\":\"H\",\"Ί\":\"I\",\"Ό\":\"O\",\"Ύ\":\"Y\",\"Ώ\":\"W\",\"ΐ\":\"i\",\"Α\":\"A\",\"Β\":\"B\",\"Γ\":\"G\",\"Δ\":\"D\",\"Ε\":\"E\",\"Ζ\":\"Z\",\"Η\":\"H\",\"Θ\":\"8\",\"Ι\":\"I\",\"Κ\":\"K\",\"Λ\":\"L\",\"Μ\":\"M\",\"Ν\":\"N\",\"Ξ\":\"3\",\"Ο\":\"O\",\"Π\":\"P\",\"Ρ\":\"R\",\"Σ\":\"S\",\"Τ\":\"T\",\"Υ\":\"Y\",\"Φ\":\"F\",\"Χ\":\"X\",\"Ψ\":\"PS\",\"Ω\":\"W\",\"Ϊ\":\"I\",\"Ϋ\":\"Y\",\"ά\":\"a\",\"έ\":\"e\",\"ή\":\"h\",\"ί\":\"i\",\"ΰ\":\"y\",\"α\":\"a\",\"β\":\"b\",\"γ\":\"g\",\"δ\":\"d\",\"ε\":\"e\",\"ζ\":\"z\",\"η\":\"h\",\"θ\":\"8\",\"ι\":\"i\",\"κ\":\"k\",\"λ\":\"l\",\"μ\":\"m\",\"ν\":\"n\",\"ξ\":\"3\",\"ο\":\"o\",\"π\":\"p\",\"ρ\":\"r\",\"ς\":\"s\",\"σ\":\"s\",\"τ\":\"t\",\"υ\":\"y\",\"φ\":\"f\",\"χ\":\"x\",\"ψ\":\"ps\",\"ω\":\"w\",\"ϊ\":\"i\",\"ϋ\":\"y\",\"ό\":\"o\",\"ύ\":\"y\",\"ώ\":\"w\",\"Ё\":\"Yo\",\"Ђ\":\"DJ\",\"Є\":\"Ye\",\"І\":\"I\",\"Ї\":\"Yi\",\"Ј\":\"J\",\"Љ\":\"LJ\",\"Њ\":\"NJ\",\"Ћ\":\"C\",\"Џ\":\"DZ\",\"А\":\"A\",\"Б\":\"B\",\"В\":\"V\",\"Г\":\"G\",\"Д\":\"D\",\"Е\":\"E\",\"Ж\":\"Zh\",\"З\":\"Z\",\"И\":\"I\",\"Й\":\"J\",\"К\":\"K\",\"Л\":\"L\",\"М\":\"M\",\"Н\":\"N\",\"О\":\"O\",\"П\":\"P\",\"Р\":\"R\",\"С\":\"S\",\"Т\":\"T\",\"У\":\"U\",\"Ф\":\"F\",\"Х\":\"H\",\"Ц\":\"C\",\"Ч\":\"Ch\",\"Ш\":\"Sh\",\"Щ\":\"Sh\",\"Ъ\":\"U\",\"Ы\":\"Y\",\"Ь\":\"\",\"Э\":\"E\",\"Ю\":\"Yu\",\"Я\":\"Ya\",\"а\":\"a\",\"б\":\"b\",\"в\":\"v\",\"г\":\"g\",\"д\":\"d\",\"е\":\"e\",\"ж\":\"zh\",\"з\":\"z\",\"и\":\"i\",\"й\":\"j\",\"к\":\"k\",\"л\":\"l\",\"м\":\"m\",\"н\":\"n\",\"о\":\"o\",\"п\":\"p\",\"р\":\"r\",\"с\":\"s\",\"т\":\"t\",\"у\":\"u\",\"ф\":\"f\",\"х\":\"h\",\"ц\":\"c\",\"ч\":\"ch\",\"ш\":\"sh\",\"щ\":\"sh\",\"ъ\":\"u\",\"ы\":\"y\",\"ь\":\"\",\"э\":\"e\",\"ю\":\"yu\",\"я\":\"ya\",\"ё\":\"yo\",\"ђ\":\"dj\",\"є\":\"ye\",\"і\":\"i\",\"ї\":\"yi\",\"ј\":\"j\",\"љ\":\"lj\",\"њ\":\"nj\",\"ћ\":\"c\",\"ѝ\":\"u\",\"џ\":\"dz\",\"Ґ\":\"G\",\"ґ\":\"g\",\"Ғ\":\"GH\",\"ғ\":\"gh\",\"Қ\":\"KH\",\"қ\":\"kh\",\"Ң\":\"NG\",\"ң\":\"ng\",\"Ү\":\"UE\",\"ү\":\"ue\",\"Ұ\":\"U\",\"ұ\":\"u\",\"Һ\":\"H\",\"һ\":\"h\",\"Ә\":\"AE\",\"ә\":\"ae\",\"Ө\":\"OE\",\"ө\":\"oe\",\"Ա\":\"A\",\"Բ\":\"B\",\"Գ\":\"G\",\"Դ\":\"D\",\"Ե\":\"E\",\"Զ\":\"Z\",\"Է\":\"E\\'\",\"Ը\":\"Y\\'\",\"Թ\":\"T\\'\",\"Ժ\":\"JH\",\"Ի\":\"I\",\"Լ\":\"L\",\"Խ\":\"X\",\"Ծ\":\"C\\'\",\"Կ\":\"K\",\"Հ\":\"H\",\"Ձ\":\"D\\'\",\"Ղ\":\"GH\",\"Ճ\":\"TW\",\"Մ\":\"M\",\"Յ\":\"Y\",\"Ն\":\"N\",\"Շ\":\"SH\",\"Չ\":\"CH\",\"Պ\":\"P\",\"Ջ\":\"J\",\"Ռ\":\"R\\'\",\"Ս\":\"S\",\"Վ\":\"V\",\"Տ\":\"T\",\"Ր\":\"R\",\"Ց\":\"C\",\"Փ\":\"P\\'\",\"Ք\":\"Q\\'\",\"Օ\":\"O\\'\\'\",\"Ֆ\":\"F\",\"և\":\"EV\",\"ء\":\"a\",\"آ\":\"aa\",\"أ\":\"a\",\"ؤ\":\"u\",\"إ\":\"i\",\"ئ\":\"e\",\"ا\":\"a\",\"ب\":\"b\",\"ة\":\"h\",\"ت\":\"t\",\"ث\":\"th\",\"ج\":\"j\",\"ح\":\"h\",\"خ\":\"kh\",\"د\":\"d\",\"ذ\":\"th\",\"ر\":\"r\",\"ز\":\"z\",\"س\":\"s\",\"ش\":\"sh\",\"ص\":\"s\",\"ض\":\"dh\",\"ط\":\"t\",\"ظ\":\"z\",\"ع\":\"a\",\"غ\":\"gh\",\"ف\":\"f\",\"ق\":\"q\",\"ك\":\"k\",\"ل\":\"l\",\"م\":\"m\",\"ن\":\"n\",\"ه\":\"h\",\"و\":\"w\",\"ى\":\"a\",\"ي\":\"y\",\"ً\":\"an\",\"ٌ\":\"on\",\"ٍ\":\"en\",\"َ\":\"a\",\"ُ\":\"u\",\"ِ\":\"e\",\"ْ\":\"\",\"٠\":\"0\",\"١\":\"1\",\"٢\":\"2\",\"٣\":\"3\",\"٤\":\"4\",\"٥\":\"5\",\"٦\":\"6\",\"٧\":\"7\",\"٨\":\"8\",\"٩\":\"9\",\"پ\":\"p\",\"چ\":\"ch\",\"ژ\":\"zh\",\"ک\":\"k\",\"گ\":\"g\",\"ی\":\"y\",\"۰\":\"0\",\"۱\":\"1\",\"۲\":\"2\",\"۳\":\"3\",\"۴\":\"4\",\"۵\":\"5\",\"۶\":\"6\",\"۷\":\"7\",\"۸\":\"8\",\"۹\":\"9\",\"฿\":\"baht\",\"ა\":\"a\",\"ბ\":\"b\",\"გ\":\"g\",\"დ\":\"d\",\"ე\":\"e\",\"ვ\":\"v\",\"ზ\":\"z\",\"თ\":\"t\",\"ი\":\"i\",\"კ\":\"k\",\"ლ\":\"l\",\"მ\":\"m\",\"ნ\":\"n\",\"ო\":\"o\",\"პ\":\"p\",\"ჟ\":\"zh\",\"რ\":\"r\",\"ს\":\"s\",\"ტ\":\"t\",\"უ\":\"u\",\"ფ\":\"f\",\"ქ\":\"k\",\"ღ\":\"gh\",\"ყ\":\"q\",\"შ\":\"sh\",\"ჩ\":\"ch\",\"ც\":\"ts\",\"ძ\":\"dz\",\"წ\":\"ts\",\"ჭ\":\"ch\",\"ხ\":\"kh\",\"ჯ\":\"j\",\"ჰ\":\"h\",\"Ṣ\":\"S\",\"ṣ\":\"s\",\"Ẁ\":\"W\",\"ẁ\":\"w\",\"Ẃ\":\"W\",\"ẃ\":\"w\",\"Ẅ\":\"W\",\"ẅ\":\"w\",\"ẞ\":\"SS\",\"Ạ\":\"A\",\"ạ\":\"a\",\"Ả\":\"A\",\"ả\":\"a\",\"Ấ\":\"A\",\"ấ\":\"a\",\"Ầ\":\"A\",\"ầ\":\"a\",\"Ẩ\":\"A\",\"ẩ\":\"a\",\"Ẫ\":\"A\",\"ẫ\":\"a\",\"Ậ\":\"A\",\"ậ\":\"a\",\"Ắ\":\"A\",\"ắ\":\"a\",\"Ằ\":\"A\",\"ằ\":\"a\",\"Ẳ\":\"A\",\"ẳ\":\"a\",\"Ẵ\":\"A\",\"ẵ\":\"a\",\"Ặ\":\"A\",\"ặ\":\"a\",\"Ẹ\":\"E\",\"ẹ\":\"e\",\"Ẻ\":\"E\",\"ẻ\":\"e\",\"Ẽ\":\"E\",\"ẽ\":\"e\",\"Ế\":\"E\",\"ế\":\"e\",\"Ề\":\"E\",\"ề\":\"e\",\"Ể\":\"E\",\"ể\":\"e\",\"Ễ\":\"E\",\"ễ\":\"e\",\"Ệ\":\"E\",\"ệ\":\"e\",\"Ỉ\":\"I\",\"ỉ\":\"i\",\"Ị\":\"I\",\"ị\":\"i\",\"Ọ\":\"O\",\"ọ\":\"o\",\"Ỏ\":\"O\",\"ỏ\":\"o\",\"Ố\":\"O\",\"ố\":\"o\",\"Ồ\":\"O\",\"ồ\":\"o\",\"Ổ\":\"O\",\"ổ\":\"o\",\"Ỗ\":\"O\",\"ỗ\":\"o\",\"Ộ\":\"O\",\"ộ\":\"o\",\"Ớ\":\"O\",\"ớ\":\"o\",\"Ờ\":\"O\",\"ờ\":\"o\",\"Ở\":\"O\",\"ở\":\"o\",\"Ỡ\":\"O\",\"ỡ\":\"o\",\"Ợ\":\"O\",\"ợ\":\"o\",\"Ụ\":\"U\",\"ụ\":\"u\",\"Ủ\":\"U\",\"ủ\":\"u\",\"Ứ\":\"U\",\"ứ\":\"u\",\"Ừ\":\"U\",\"ừ\":\"u\",\"Ử\":\"U\",\"ử\":\"u\",\"Ữ\":\"U\",\"ữ\":\"u\",\"Ự\":\"U\",\"ự\":\"u\",\"Ỳ\":\"Y\",\"ỳ\":\"y\",\"Ỵ\":\"Y\",\"ỵ\":\"y\",\"Ỷ\":\"Y\",\"ỷ\":\"y\",\"Ỹ\":\"Y\",\"ỹ\":\"y\",\"–\":\"-\",\"‘\":\"\\'\",\"’\":\"\\'\",\"“\":\"\\\\\\\"\",\"”\":\"\\\\\\\"\",\"„\":\"\\\\\\\"\",\"†\":\"+\",\"•\":\"*\",\"…\":\"...\",\"₠\":\"ecu\",\"₢\":\"cruzeiro\",\"₣\":\"french franc\",\"₤\":\"lira\",\"₥\":\"mill\",\"₦\":\"naira\",\"₧\":\"peseta\",\"₨\":\"rupee\",\"₩\":\"won\",\"₪\":\"new shequel\",\"₫\":\"dong\",\"€\":\"euro\",\"₭\":\"kip\",\"₮\":\"tugrik\",\"₯\":\"drachma\",\"₰\":\"penny\",\"₱\":\"peso\",\"₲\":\"guarani\",\"₳\":\"austral\",\"₴\":\"hryvnia\",\"₵\":\"cedi\",\"₸\":\"kazakhstani tenge\",\"₹\":\"indian rupee\",\"₺\":\"turkish lira\",\"₽\":\"russian ruble\",\"₿\":\"bitcoin\",\"℠\":\"sm\",\"™\":\"tm\",\"∂\":\"d\",\"∆\":\"delta\",\"∑\":\"sum\",\"∞\":\"infinity\",\"♥\":\"love\",\"元\":\"yuan\",\"円\":\"yen\",\"﷼\":\"rial\",\"ﻵ\":\"laa\",\"ﻷ\":\"laa\",\"ﻹ\":\"lai\",\"ﻻ\":\"la\"}')\n  var locales = JSON.parse('{\"bg\":{\"Й\":\"Y\",\"Ц\":\"Ts\",\"Щ\":\"Sht\",\"Ъ\":\"A\",\"Ь\":\"Y\",\"й\":\"y\",\"ц\":\"ts\",\"щ\":\"sht\",\"ъ\":\"a\",\"ь\":\"y\"},\"de\":{\"Ä\":\"AE\",\"ä\":\"ae\",\"Ö\":\"OE\",\"ö\":\"oe\",\"Ü\":\"UE\",\"ü\":\"ue\",\"ß\":\"ss\",\"%\":\"prozent\",\"&\":\"und\",\"|\":\"oder\",\"∑\":\"summe\",\"∞\":\"unendlich\",\"♥\":\"liebe\"},\"es\":{\"%\":\"por ciento\",\"&\":\"y\",\"<\":\"menor que\",\">\":\"mayor que\",\"|\":\"o\",\"¢\":\"centavos\",\"£\":\"libras\",\"¤\":\"moneda\",\"₣\":\"francos\",\"∑\":\"suma\",\"∞\":\"infinito\",\"♥\":\"amor\"},\"fr\":{\"%\":\"pourcent\",\"&\":\"et\",\"<\":\"plus petit\",\">\":\"plus grand\",\"|\":\"ou\",\"¢\":\"centime\",\"£\":\"livre\",\"¤\":\"devise\",\"₣\":\"franc\",\"∑\":\"somme\",\"∞\":\"infini\",\"♥\":\"amour\"},\"pt\":{\"%\":\"porcento\",\"&\":\"e\",\"<\":\"menor\",\">\":\"maior\",\"|\":\"ou\",\"¢\":\"centavo\",\"∑\":\"soma\",\"£\":\"libra\",\"∞\":\"infinito\",\"♥\":\"amor\"},\"uk\":{\"И\":\"Y\",\"и\":\"y\",\"Й\":\"Y\",\"й\":\"y\",\"Ц\":\"Ts\",\"ц\":\"ts\",\"Х\":\"Kh\",\"х\":\"kh\",\"Щ\":\"Shch\",\"щ\":\"shch\",\"Г\":\"H\",\"г\":\"h\"},\"vi\":{\"Đ\":\"D\",\"đ\":\"d\"},\"da\":{\"Ø\":\"OE\",\"ø\":\"oe\",\"Å\":\"AA\",\"å\":\"aa\",\"%\":\"procent\",\"&\":\"og\",\"|\":\"eller\",\"$\":\"dollar\",\"<\":\"mindre end\",\">\":\"større end\"},\"nb\":{\"&\":\"og\",\"Å\":\"AA\",\"Æ\":\"AE\",\"Ø\":\"OE\",\"å\":\"aa\",\"æ\":\"ae\",\"ø\":\"oe\"},\"it\":{\"&\":\"e\"},\"nl\":{\"&\":\"en\"},\"sv\":{\"&\":\"och\",\"Å\":\"AA\",\"Ä\":\"AE\",\"Ö\":\"OE\",\"å\":\"aa\",\"ä\":\"ae\",\"ö\":\"oe\"}}')\n\n  function replace (string, options) {\n    if (typeof string !== 'string') {\n      throw new Error('slugify: string argument expected')\n    }\n\n    options = (typeof options === 'string')\n      ? {replacement: options}\n      : options || {}\n\n    var locale = locales[options.locale] || {}\n\n    var replacement = options.replacement === undefined ? '-' : options.replacement\n\n    var trim = options.trim === undefined ? true : options.trim\n\n    var slug = string.normalize().split('')\n      // replace characters based on charMap\n      .reduce(function (result, ch) {\n        var appendChar = locale[ch] || charMap[ch] || ch;\n        if (appendChar === replacement) {\n          appendChar = ' ';\n        }\n        return result + appendChar\n          // remove not allowed characters\n          .replace(options.remove || /[^\\w\\s$*_+~.()'\"!\\-:@]+/g, '')\n      }, '');\n\n    if (options.strict) {\n      slug = slug.replace(/[^A-Za-z0-9\\s]/g, '');\n    }\n\n    if (trim) {\n      slug = slug.trim()\n    }\n\n    // Replace spaces with replacement character, treating multiple consecutive\n    // spaces as a single space.\n    slug = slug.replace(/\\s+/g, replacement);\n\n    if (options.lower) {\n      slug = slug.toLowerCase()\n    }\n\n    return slug\n  }\n\n  replace.extend = function (customMap) {\n    Object.assign(charMap, customMap)\n  }\n\n  return replace\n}))\n\n\n//# sourceURL=webpack://DSFileManager/./node_modules/slugify/slugify.js?");

/***/ }),

/***/ "./ds-file-manager.ts":
/*!****************************!*\
  !*** ./ds-file-manager.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _models_callbacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/callbacks */ \"./models/callbacks.ts\");\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slugify */ \"./node_modules/slugify/slugify.js\");\n/* harmony import */ var slugify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slugify__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nvar DSFileManager = /** @class */ (function () {\r\n    function DSFileManager(targetID, settings) {\r\n        this.targetID = targetID;\r\n        this.html = {};\r\n        this.args = {};\r\n        this.settings = settings;\r\n        this.draw();\r\n        this.files = this.settings.DSFileUploader.getFileList();\r\n        this.listenHooks();\r\n        this.CallBacks = new _models_callbacks__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    }\r\n    DSFileManager.prototype.listenHooks = function () {\r\n        var self = this;\r\n        this.settings.DSFileUploader.CallBacks.listen(\"file_added\", function (data) {\r\n            self.drawFiles();\r\n        });\r\n        this.settings.DSFileUploader.CallBacks.listen(\"file_ready\", function (data) {\r\n            console.log(\"this.settings.DSFileUploader\", self.settings.DSFileUploader.form.files);\r\n            self.drawFiles();\r\n        });\r\n        this.settings.DSFileUploader.CallBacks.listen(\"onCallBack\", function () {\r\n            self.drawFiles();\r\n        });\r\n    };\r\n    DSFileManager.prototype.drawFiles = function () {\r\n        var self = this;\r\n        this.files = self.settings.DSFileUploader.form.files;\r\n        this.files.map(function (file) {\r\n            if (typeof file.drawn === \"undefined\" && file.status === \"ready\") {\r\n                file.HTML = self.makeHTML(file);\r\n                file.drawn = true;\r\n                file.HTML.mainContainer.html.className = \"ds-file-mamanger__file \" + slugify__WEBPACK_IMPORTED_MODULE_1___default()(file.status);\r\n            }\r\n            else if (file.drawn) {\r\n                file.HTML.mainContainer.html.className = \"ds-file-mamanger__file \" + slugify__WEBPACK_IMPORTED_MODULE_1___default()(file.status) + file.status;\r\n            }\r\n        });\r\n    };\r\n    DSFileManager.prototype.makeHTML = function (file) {\r\n        file.HTML = {\r\n            mainContainer: this.mainContainer(file),\r\n            innerContainer: this.innerContainer(file),\r\n            imageContainer: this.imageContainer(file),\r\n            titleContainer: this.titleContainer(file),\r\n            typeContainer: this.typeContainer(file),\r\n            statusContainer: this.statusContainer(file),\r\n            deleteIcon: this.deleteIcon(file)\r\n        };\r\n        this.compileFile(file);\r\n        this.html.mainDiv.appendChild(file.HTML.mainContainer.html);\r\n        return file.HTML;\r\n    };\r\n    DSFileManager.prototype.compileFile = function (file) {\r\n        var self = this;\r\n        file.HTML.mainContainer.html.appendChild(file.HTML.innerContainer.html);\r\n        file.HTML.innerContainer.html.appendChild(file.HTML.titleContainer.html);\r\n        if (file.file.base64 !== false) {\r\n            file.HTML.innerContainer.html.appendChild(file.HTML.imageContainer.html);\r\n        }\r\n        else {\r\n            file.HTML.innerContainer.html.appendChild(file.HTML.typeContainer.html);\r\n        }\r\n        file.HTML.innerContainer.html.appendChild(file.HTML.statusContainer.html);\r\n        file.HTML.innerContainer.html.appendChild(file.HTML.deleteIcon.html);\r\n        file.HTML.deleteIcon.html.addEventListener(\"click\", function () {\r\n            console.log(\"delete_file\", file);\r\n            self.CallBacks.callback(\"delete_file\", file);\r\n        });\r\n    };\r\n    DSFileManager.prototype.mainContainer = function (file) {\r\n        var self = this;\r\n        var out = {\r\n            html: document.createElement(\"div\"),\r\n            create: function () {\r\n                this.html.classList.add(\"ds-file-mamanger__file\");\r\n            }\r\n        };\r\n        out.create();\r\n        return out;\r\n    };\r\n    DSFileManager.prototype.innerContainer = function (file) {\r\n        var self = this;\r\n        var out = {\r\n            html: document.createElement(\"div\"),\r\n            create: function () {\r\n                this.html.classList.add(\"ds-file-mamanger__file-inner\");\r\n            }\r\n        };\r\n        out.create();\r\n        return out;\r\n    };\r\n    DSFileManager.prototype.imageContainer = function (file) {\r\n        var self = this;\r\n        var out = {\r\n            html: document.createElement(\"div\"),\r\n            img: document.createElement(\"img\"),\r\n            create: function () {\r\n                this.html.classList.add(\"ds-file-mamanger__file-image\");\r\n                if (file.file.base64 === false) {\r\n                }\r\n                else {\r\n                    this.img.src = file.file.base64;\r\n                    this.html.appendChild(this.img);\r\n                }\r\n            }\r\n        };\r\n        out.create();\r\n        return out;\r\n    };\r\n    DSFileManager.prototype.titleContainer = function (file) {\r\n        var self = this;\r\n        var out = {\r\n            html: document.createElement(\"div\"),\r\n            create: function () {\r\n                this.html.classList.add(\"ds-file-mamanger__file-title\");\r\n                this.html.innerHTML = file.file.name;\r\n            }\r\n        };\r\n        out.create();\r\n        return out;\r\n    };\r\n    DSFileManager.prototype.typeContainer = function (file) {\r\n        var self = this;\r\n        var out = {\r\n            html: document.createElement(\"div\"),\r\n            create: function () {\r\n                this.html.classList.add(\"ds-file-mamanger__file-type\");\r\n                this.html.innerHTML = file.file.type;\r\n            }\r\n        };\r\n        out.create();\r\n        return out;\r\n    };\r\n    DSFileManager.prototype.statusContainer = function (file) {\r\n        var self = this;\r\n        var out = {\r\n            html: document.createElement(\"div\"),\r\n            create: function () {\r\n                this.html.classList.add(\"ds-file-mamanger__file-status\");\r\n                this.html.innerHTML = file.status;\r\n            }\r\n        };\r\n        out.create();\r\n        return out;\r\n    };\r\n    DSFileManager.prototype.deleteIcon = function (file) {\r\n        var self = this;\r\n        var out = {\r\n            html: document.createElement(\"div\"),\r\n            create: function () {\r\n                this.html.classList.add(\"ds-file-mamanger__file-delete\");\r\n                this.html.innerHTML = \"Delete\";\r\n            }\r\n        };\r\n        out.create();\r\n        return out;\r\n    };\r\n    DSFileManager.prototype.draw = function () {\r\n        var mainDiv = document.createElement(\"div\");\r\n        mainDiv.classList.add(\"ds-file-manager__container\");\r\n        this.html.mainDiv = mainDiv;\r\n        document.getElementById(this.targetID).appendChild(this.html.mainDiv);\r\n    };\r\n    DSFileManager.prototype.set = function (k, v) {\r\n        this.args[k] = v;\r\n    };\r\n    DSFileManager.prototype.get = function (k) {\r\n        if (this.args[k])\r\n            return this.args[k];\r\n        else\r\n            return false;\r\n    };\r\n    return DSFileManager;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DSFileManager);\r\n\n\n//# sourceURL=webpack://DSFileManager/./ds-file-manager.ts?");

/***/ }),

/***/ "./models/callbacks.ts":
/*!*****************************!*\
  !*** ./models/callbacks.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar CallBacks = /** @class */ (function () {\r\n    function CallBacks() {\r\n        this.callbacks = [];\r\n    }\r\n    CallBacks.prototype.listen = function (action, f) {\r\n        if (typeof this.callbacks[action] === \"undefined\") {\r\n            this.callbacks[action] = [];\r\n        }\r\n        this.callbacks[action].push(f);\r\n    };\r\n    CallBacks.prototype.callback = function (action, data) {\r\n        console.log(\"callback\", action, data);\r\n        if (typeof this.callbacks[action] !== \"undefined\") {\r\n            for (var i in this.callbacks[action]) {\r\n                this.callbacks[action][i](data);\r\n            }\r\n        }\r\n        action = \"onCallBack\";\r\n        if (typeof this.callbacks[action] !== \"undefined\") {\r\n            for (var i in this.callbacks[action]) {\r\n                this.callbacks[action][i]();\r\n            }\r\n        }\r\n    };\r\n    return CallBacks;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CallBacks);\r\n\n\n//# sourceURL=webpack://DSFileManager/./models/callbacks.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./ds-file-manager.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});