/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"portfolio": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/portfolio.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/contact/contact.js":
/*!***************************************!*\
  !*** ./src/blocks/contact/contact.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var form = document.forms[0];
var button = form.querySelector('.button');
var errorMsgConts = document.querySelectorAll('.contact__error');
var loader = document.querySelector('.contact__loader');
var successElem = document.querySelector('.contact__success');
var errorMsg = {
  'name:size': 'Имя должно быть от 2 до 40 символов',
  'name:empty': 'Заполните поле',
  'email:empty': 'Заполните поле',
  'email:email': 'В поле должен быть валидный email адрес',
  'message:empty': 'Заполните поле',
  'message:size': 'Сообщение не должно превышать 2000 символов'
};
button.addEventListener('click', function () {
  var body = new FormData(form);
  loader.classList.add('contact__loader--show');
  fetch('https://email-to-me.herokuapp.com/mail', {
    method: 'POST',
    body: body
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.errors) {
      var errorsInfo = data.errors;
      var errors = {};

      var _iterator = _createForOfIteratorHelper(errorsInfo),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var err = _step.value;

          if (!errors[err.param]) {
            errors[err.param] = errorMsg["".concat(err.param, ":").concat(err.msg)];
          } else {
            continue;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      errorMsgConts.forEach(function (cont) {
        var field = cont.dataset.field;
        cont.textContent = errors[field];
      });
    } else {
      errorMsgConts.forEach(function (cont) {
        return cont.textContent = '';
      });
      successElem.classList.add('contact__success--show');
      setTimeout(function () {
        return successElem.classList.remove('contact__success--show');
      }, 3000);
    }
  })["catch"](function (err) {
    console.error(err);
  })["finally"](function () {
    loader.classList.remove('contact__loader--show');
  });
});

/***/ }),

/***/ "./src/blocks/hero/hero.js":
/*!*********************************!*\
  !*** ./src/blocks/hero/hero.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @glidejs/glide/dist/glide.modular.esm */ "./node_modules/@glidejs/glide/dist/glide.modular.esm.js");
/* harmony import */ var _js_webpCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/webpCheck */ "./src/js/webpCheck.js");


var hero = document.querySelector('.hero');
var url = new URL(location.href);
var page = url.pathname.match(/\/.*\.html/);
var pageName = '';

if (page) {
  pageName = page[0].replace('.html', '').replace('/', '');
  pageName = pageName === 'index' ? '' : pageName;
}

if (!hero.classList.contains('hero--without-slider')) {
  var glide = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__["default"]('.hero__slider', {
    perView: 1
  });

  if (!hero.classList.contains('hero--slider')) {
    glide.on('move', function () {
      Object(_js_webpCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(function (webpSupports) {
        var index = glide.index;
        var image = webpSupports ? "url(\"images/hero-".concat(pageName, "-bg-").concat(index, ".webp\")") : "url(\"images/hero-".concat(pageName, "-bg-").concat(index, ".png\")");
        hero.style.backgroundImage = image;
      });
    });
  }

  glide.mount({
    Controls: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__["Controls"],
    Swipe: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__["Swipe"]
  });
}

/***/ }),

/***/ "./src/js/portfolio.js":
/*!*****************************!*\
  !*** ./src/js/portfolio.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blocks_hero_hero__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../blocks/hero/hero */ "./src/blocks/hero/hero.js");
/* harmony import */ var _blocks_contact_contact__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../blocks/contact/contact */ "./src/blocks/contact/contact.js");
/* harmony import */ var _blocks_contact_contact__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blocks_contact_contact__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ "./src/js/webpCheck.js":
/*!*****************************!*\
  !*** ./src/js/webpCheck.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function testWebP(callback) {
  // eslint-disable-next-line no-undef
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    // eslint-disable-next-line standard/no-callback-literal
    callback(webP.height === 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCd' + 'ASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
  if (!!support === true) {
    document.querySelector('body').classList.add('webp');
    return true;
  } else {
    document.querySelector('body').classList.add('no-webp');
    return false;
  }
});
/* harmony default export */ __webpack_exports__["default"] = (testWebP);

/***/ })

/******/ });
//# sourceMappingURL=portfolio.js.map