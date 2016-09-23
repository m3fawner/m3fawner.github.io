/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "0f5e7e4e20a73f0be99d"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _helloWorld = __webpack_require__(24);
	
	var _helloWorld2 = _interopRequireDefault(_helloWorld);
	
	var _index = __webpack_require__(78);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _software = __webpack_require__(26);
	
	var _software2 = _interopRequireDefault(_software);
	
	var _index3 = __webpack_require__(97);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _NPMInit = __webpack_require__(15);
	
	var _NPMInit2 = _interopRequireDefault(_NPMInit);
	
	var _index5 = __webpack_require__(28);
	
	var _index6 = _interopRequireDefault(_index5);
	
	var _webpack = __webpack_require__(27);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _index7 = __webpack_require__(101);
	
	var _index8 = _interopRequireDefault(_index7);
	
	var _es6Intro = __webpack_require__(18);
	
	var _es6Intro2 = _interopRequireDefault(_es6Intro);
	
	var _index9 = __webpack_require__(43);
	
	var _index10 = _interopRequireDefault(_index9);
	
	var _variableDeclaration = __webpack_require__(23);
	
	var _variableDeclaration2 = _interopRequireDefault(_variableDeclaration);
	
	var _index11 = __webpack_require__(71);
	
	var _index12 = _interopRequireDefault(_index11);
	
	var _newMethods = __webpack_require__(20);
	
	var _newMethods2 = _interopRequireDefault(_newMethods);
	
	var _index13 = __webpack_require__(54);
	
	var _index14 = _interopRequireDefault(_index13);
	
	var _arrowFunctions = __webpack_require__(16);
	
	var _arrowFunctions2 = _interopRequireDefault(_arrowFunctions);
	
	var _index15 = __webpack_require__(35);
	
	var _index16 = _interopRequireDefault(_index15);
	
	var _classes = __webpack_require__(17);
	
	var _classes2 = _interopRequireDefault(_classes);
	
	var _index17 = __webpack_require__(39);
	
	var _index18 = _interopRequireDefault(_index17);
	
	var _parameterDefaults = __webpack_require__(21);
	
	var _parameterDefaults2 = _interopRequireDefault(_parameterDefaults);
	
	var _index19 = __webpack_require__(61);
	
	var _index20 = _interopRequireDefault(_index19);
	
	var _promises = __webpack_require__(22);
	
	var _promises2 = _interopRequireDefault(_promises);
	
	var _index21 = __webpack_require__(64);
	
	var _index22 = _interopRequireDefault(_index21);
	
	var _modules = __webpack_require__(19);
	
	var _modules2 = _interopRequireDefault(_modules);
	
	var _index23 = __webpack_require__(48);
	
	var _index24 = _interopRequireDefault(_index23);
	
	var _pug = __webpack_require__(25);
	
	var _pug2 = _interopRequireDefault(_pug);
	
	var _index25 = __webpack_require__(83);
	
	var _index26 = _interopRequireDefault(_index25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AVAILABLE_APPS = {
	  HelloWorld: {
	    pug: _index2.default,
	    js: _helloWorld2.default
	  },
	  Software: {
	    pug: _index4.default,
	    js: _software2.default
	  },
	  'NPM-init': {
	    pug: _index6.default,
	    js: _NPMInit2.default
	  },
	  webpack: {
	    pug: _index8.default,
	    js: _webpack2.default
	  },
	  'es6-intro': {
	    pug: _index10.default,
	    js: _es6Intro2.default
	  },
	  'es6-variable-declaration': {
	    pug: _index12.default,
	    js: _variableDeclaration2.default
	  },
	  'es6-new-methods': {
	    pug: _index14.default,
	    js: _newMethods2.default
	  },
	  'es6-arrow-functions': {
	    pug: _index16.default,
	    js: _arrowFunctions2.default
	  },
	  'es6-classes': {
	    pug: _index18.default,
	    js: _classes2.default
	  },
	  'es6-default-parameters': {
	    pug: _index20.default,
	    js: _parameterDefaults2.default
	  },
	  'es6-promises': {
	    pug: _index22.default,
	    js: _promises2.default
	  },
	  'es6-modules': {
	    pug: _index24.default,
	    js: _modules2.default
	  },
	  'pug': {
	    pug: _index26.default,
	    js: _pug2.default,
	    context: {
	      names: ['Daniel', 'Jacob', 'Ben']
	    }
	  }
	};
	var getNode = function getNode(pug) {
	  for (var _len = arguments.length, locals = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    locals[_key - 1] = arguments[_key];
	  }
	
	  var div = document.createElement('div');
	  div.innerHTML = pug.apply(undefined, locals);
	  return div.firstChild;
	};
	var loadSubApp = function loadSubApp(subApp) {
	  document.querySelector('container').appendChild(getNode(subApp.pug, subApp.context));
	  subApp.js();
	};
	var getQueryVariable = function getQueryVariable(variable) {
	  var query = window.location.search.substring(1);
	  var vars = query.split('&');
	  var match = vars.map(function (item) {
	    var parts = item.split('=');
	    return {
	      key: decodeURIComponent(parts[0]),
	      value: decodeURIComponent(parts[1])
	    };
	  }).find(function (param) {
	    return param.key === variable;
	  });
	  return match ? match.value : void 0;
	};
	var toLoad = AVAILABLE_APPS[getQueryVariable('sub-app')];
	if (toLoad) {
	  loadSubApp(toLoad);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pug_has_own_property = Object.prototype.hasOwnProperty;
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	exports.merge = pug_merge;
	function pug_merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = pug_merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	
	  for (var key in b) {
	    if (key === 'class') {
	      var valA = a[key] || [];
	      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
	    } else if (key === 'style') {
	      var valA = pug_style(a[key]);
	      var valB = pug_style(b[key]);
	      a[key] = valA + (valA && valB && ';') + valB;
	    } else {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Process array, object, or string as a string of classes delimited by a space.
	 *
	 * If `val` is an array, all members of it and its subarrays are counted as
	 * classes. If `escaping` is an array, then whether or not the item in `val` is
	 * escaped depends on the corresponding item in `escaping`. If `escaping` is
	 * not an array, no escaping is done.
	 *
	 * If `val` is an object, all the keys whose value is truthy are counted as
	 * classes. No escaping is done.
	 *
	 * If `val` is a string, it is counted as a class. No escaping is done.
	 *
	 * @param {(Array.<string>|Object.<string, boolean>|string)} val
	 * @param {?Array.<string>} escaping
	 * @return {String}
	 */
	exports.classes = pug_classes;
	function pug_classes_array(val, escaping) {
	  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
	  for (var i = 0; i < val.length; i++) {
	    className = pug_classes(val[i]);
	    if (!className) continue;
	    escapeEnabled && escaping[i] && (className = pug_escape(className));
	    classString = classString + padding + className;
	    padding = ' ';
	  }
	  return classString;
	}
	function pug_classes_object(val) {
	  var classString = '', padding = '';
	  for (var key in val) {
	    if (key && val[key] && pug_has_own_property.call(val, key)) {
	      classString = classString + padding + key;
	      padding = ' ';
	    }
	  }
	  return classString;
	}
	function pug_classes(val, escaping) {
	  if (Array.isArray(val)) {
	    return pug_classes_array(val, escaping);
	  } else if (val && typeof val === 'object') {
	    return pug_classes_object(val);
	  } else {
	    return val || '';
	  }
	}
	
	/**
	 * Convert object or string to a string of CSS styles delimited by a semicolon.
	 *
	 * @param {(Object.<string, string>|string)} val
	 * @return {String}
	 */
	
	exports.style = pug_style;
	function pug_style(val) {
	  if (!val) return '';
	  if (typeof val === 'object') {
	    var out = '', delim = '';
	    for (var style in val) {
	      /* istanbul ignore else */
	      if (pug_has_own_property.call(val, style)) {
	        out = out + delim + style + ':' + val[style];
	        delim = ';';
	      }
	    }
	    return out;
	  } else {
	    val = '' + val;
	    if (val[val.length - 1] === ';') return val.slice(0, -1);
	    return val;
	  }
	};
	
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = pug_attr;
	function pug_attr(key, val, escaped, terse) {
	  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
	    return '';
	  }
	  if (val === true) {
	    return ' ' + (terse ? key : key + '="' + key + '"');
	  }
	  if (typeof val.toJSON === 'function') {
	    val = val.toJSON();
	  }
	  if (typeof val !== 'string') {
	    val = JSON.stringify(val);
	    if (!escaped && val.indexOf('"') !== -1) {
	      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
	    }
	  }
	  if (escaped) val = pug_escape(val);
	  return ' ' + key + '="' + val + '"';
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} terse whether to use HTML5 terse boolean attributes
	 * @return {String}
	 */
	exports.attrs = pug_attrs;
	function pug_attrs(obj, terse){
	  var attrs = '';
	
	  for (var key in obj) {
	    if (pug_has_own_property.call(obj, key)) {
	      var val = obj[key];
	
	      if ('class' === key) {
	        val = pug_classes(val);
	        attrs = pug_attr(key, val, false, terse) + attrs;
	        continue;
	      }
	      if ('style' === key) {
	        val = pug_style(val);
	      }
	      attrs += pug_attr(key, val, false, terse);
	    }
	  }
	
	  return attrs;
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var pug_match_html = /["&<>]/;
	exports.escape = pug_escape;
	function pug_escape(_html){
	  var html = '' + _html;
	  var regexResult = pug_match_html.exec(html);
	  if (!regexResult) return _html;
	
	  var result = '';
	  var i, lastIndex, escape;
	  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
	    switch (html.charCodeAt(i)) {
	      case 34: escape = '&quot;'; break;
	      case 38: escape = '&amp;'; break;
	      case 60: escape = '&lt;'; break;
	      case 62: escape = '&gt;'; break;
	      default: continue;
	    }
	    if (lastIndex !== i) result += html.substring(lastIndex, i);
	    lastIndex = i + 1;
	    result += escape;
	  }
	  if (lastIndex !== i) return result + html.substring(lastIndex, i);
	  else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the pug in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @param {String} str original source
	 * @api private
	 */
	
	exports.rethrow = pug_rethrow;
	function pug_rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(115).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    pug_rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Pug') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reveal = __webpack_require__(110);
	
	var _reveal2 = _interopRequireDefault(_reveal);
	
	var _index = __webpack_require__(111);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _blood = __webpack_require__(112);
	
	var _blood2 = _interopRequireDefault(_blood);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  return _reveal2.default.initialize({
	    margin: 0.1,
	    minScale: 0.2,
	    maxScale: 1.5,
	    controlls: true,
	    progress: true,
	    keyboard: true,
	    fragments: true,
	    height: '100%',
	    width: '100%',
	    slideNumber: true,
	    history: true
	  });
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EContact Me\u003C\u002Fh2\u003E\u003Ca href=\"https:\u002F\u002Fwww.linkedin.com\u002Fin\u002Fevan-williams-75485533\"\u003E\u003Cimg src=\".\u002Fassets\u002Flinkedin.png\"\u003E\u003C\u002Fa\u003E\u003Ca href=\"https:\u002F\u002Ftwitter.com\u002Fangular_evan\"\u003E\u003Cimg src=\".\u002Fassets\u002Ftwitter.png\"\u003E\u003C\u002Fa\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ECurrent Order of ES6 Topics\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ESubject to Change\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Col\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-intro\"\u003EES6 Introduction - \u003C\u002Fa\u003E\u003Ca href=\"https:\u002F\u002Fwww.youtube.com\u002Fwatch?v=Q39IWxrla8M\"\u003EVideo\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-variable-declaration\"\u003EVariable Declarations - \u003C\u002Fa\u003E\u003Ca href=\"https:\u002F\u002Fwww.youtube.com\u002Fwatch?v=ARPy03C5nyE\"\u003EVideo\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-new-methods\"\u003ENew Methods on Pre-existing Prototypes - \u003C\u002Fa\u003E\u003Ca href=\"https:\u002F\u002Fwww.youtube.com\u002Fwatch?v=wUPqvLiyiUQ\"\u003EVideo\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-arrow-functions\"\u003EArrow Functions - \u003C\u002Fa\u003E\u003Ca href=\"https:\u002F\u002Fwww.youtube.com\u002Fwatch?v=7XFyqYR6Tr8\"\u003EVideo\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-classes\"\u003EClasses - \u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-default-parameters\"\u003EParameter Defaults - \u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-promises\"\u003EPromises -\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"\u002Fdist\u002Findex.html?sub-app=es6-modules\"\u003EModules -\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n\n/*!\n * reveal.js\n * http://lab.hakim.se/reveal-js\n * MIT licensed\n *\n * Copyright (C) 2013 Hakim El Hattab, http://hakim.se\n */\n\n\n/*********************************************\n * RESET STYLES\n *********************************************/\n\nhtml, body, .reveal div, .reveal span, .reveal applet, .reveal object, .reveal iframe,\n.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6, .reveal p, .reveal blockquote, .reveal pre,\n.reveal a, .reveal abbr, .reveal acronym, .reveal address, .reveal big, .reveal cite, .reveal code,\n.reveal del, .reveal dfn, .reveal em, .reveal img, .reveal ins, .reveal kbd, .reveal q, .reveal s, .reveal samp,\n.reveal small, .reveal strike, .reveal strong, .reveal sub, .reveal sup, .reveal tt, .reveal var,\n.reveal b, .reveal u, .reveal i, .reveal center,\n.reveal dl, .reveal dt, .reveal dd, .reveal ol, .reveal ul, .reveal li,\n.reveal fieldset, .reveal form, .reveal label, .reveal legend,\n.reveal table, .reveal caption, .reveal tbody, .reveal tfoot, .reveal thead, .reveal tr, .reveal th, .reveal td,\n.reveal article, .reveal aside, .reveal canvas, .reveal details, .reveal embed,\n.reveal figure, .reveal figcaption, .reveal footer, .reveal header, .reveal hgroup,\n.reveal menu, .reveal nav, .reveal output, .reveal ruby, .reveal section, .reveal summary,\n.reveal time, .reveal mark, .reveal audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n\n.reveal article, .reveal aside, .reveal details, .reveal figcaption, .reveal figure,\n.reveal footer, .reveal header, .reveal hgroup, .reveal menu, .reveal nav, .reveal section {\n\tdisplay: block;\n}\n\n\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\n\nhtml,\nbody {\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n}\n\nbody {\n\tposition: relative;\n\tline-height: 1;\n}\n\n::selection {\n\tbackground: #FF5E99;\n\tcolor: #fff;\n\ttext-shadow: none;\n}\n\n\n/*********************************************\n * HEADERS\n *********************************************/\n\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n\t-webkit-hyphens: auto;\n\t   -moz-hyphens: auto;\n\t        hyphens: auto;\n\n\tword-wrap: break-word;\n\tline-height: 1;\n}\n\n.reveal h1 { font-size: 3.77em; }\n.reveal h2 { font-size: 2.11em;\t}\n.reveal h3 { font-size: 1.55em;\t}\n.reveal h4 { font-size: 1em;\t}\n\n\n/*********************************************\n * VIEW FRAGMENTS\n *********************************************/\n\n.reveal .slides section .fragment {\n\topacity: 0;\n\n\t-webkit-transition: all .2s ease;\n\t   -moz-transition: all .2s ease;\n\t    -ms-transition: all .2s ease;\n\t     -o-transition: all .2s ease;\n\t        transition: all .2s ease;\n}\n\t.reveal .slides section .fragment.visible {\n\t\topacity: 1;\n\t}\n\n.reveal .slides section .fragment.grow {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.grow.visible {\n\t\t-webkit-transform: scale( 1.3 );\n\t\t   -moz-transform: scale( 1.3 );\n\t\t    -ms-transform: scale( 1.3 );\n\t\t     -o-transform: scale( 1.3 );\n\t\t        transform: scale( 1.3 );\n\t}\n\n.reveal .slides section .fragment.shrink {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.shrink.visible {\n\t\t-webkit-transform: scale( 0.7 );\n\t\t   -moz-transform: scale( 0.7 );\n\t\t    -ms-transform: scale( 0.7 );\n\t\t     -o-transform: scale( 0.7 );\n\t\t        transform: scale( 0.7 );\n\t}\n\n.reveal .slides section .fragment.zoom-in {\n\topacity: 0;\n\n\t-webkit-transform: scale( 0.1 );\n\t   -moz-transform: scale( 0.1 );\n\t    -ms-transform: scale( 0.1 );\n\t     -o-transform: scale( 0.1 );\n\t        transform: scale( 0.1 );\n}\n\n\t.reveal .slides section .fragment.zoom-in.visible {\n\t\topacity: 1;\n\n\t\t-webkit-transform: scale( 1 );\n\t\t   -moz-transform: scale( 1 );\n\t\t    -ms-transform: scale( 1 );\n\t\t     -o-transform: scale( 1 );\n\t\t        transform: scale( 1 );\n\t}\n\n.reveal .slides section .fragment.roll-in {\n\topacity: 0;\n\n\t-webkit-transform: rotateX( 90deg );\n\t   -moz-transform: rotateX( 90deg );\n\t    -ms-transform: rotateX( 90deg );\n\t     -o-transform: rotateX( 90deg );\n\t        transform: rotateX( 90deg );\n}\n\t.reveal .slides section .fragment.roll-in.visible {\n\t\topacity: 1;\n\n\t\t-webkit-transform: rotateX( 0 );\n\t\t   -moz-transform: rotateX( 0 );\n\t\t    -ms-transform: rotateX( 0 );\n\t\t     -o-transform: rotateX( 0 );\n\t\t        transform: rotateX( 0 );\n\t}\n\n.reveal .slides section .fragment.fade-out {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.fade-out.visible {\n\t\topacity: 0;\n\t}\n\n.reveal .slides section .fragment.semi-fade-out {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.semi-fade-out.visible {\n\t\topacity: 0.5;\n\t}\n\n.reveal .slides section .fragment.current-visible {\n\topacity:0;\n}\n\n.reveal .slides section .fragment.current-visible.current-fragment {\n\topacity:1;\n}\n\n.reveal .slides section .fragment.highlight-red,\n.reveal .slides section .fragment.highlight-current-red,\n.reveal .slides section .fragment.highlight-green,\n.reveal .slides section .fragment.highlight-current-green,\n.reveal .slides section .fragment.highlight-blue,\n.reveal .slides section .fragment.highlight-current-blue {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.highlight-red.visible {\n\t\tcolor: #ff2c2d\n\t}\n\t.reveal .slides section .fragment.highlight-green.visible {\n\t\tcolor: #17ff2e;\n\t}\n\t.reveal .slides section .fragment.highlight-blue.visible {\n\t\tcolor: #1b91ff;\n\t}\n\n.reveal .slides section .fragment.highlight-current-red.current-fragment {\n\tcolor: #ff2c2d\n}\n.reveal .slides section .fragment.highlight-current-green.current-fragment {\n\tcolor: #17ff2e;\n}\n.reveal .slides section .fragment.highlight-current-blue.current-fragment {\n\tcolor: #1b91ff;\n}\n\n\n/*********************************************\n * DEFAULT ELEMENT STYLES\n *********************************************/\n\n/* Fixes issue in Chrome where italic fonts did not appear when printing to PDF */\n.reveal:after {\n  content: '';\n  font-style: italic;\n}\n\n.reveal iframe {\n\tz-index: 1;\n}\n\n/* Ensure certain elements are never larger than the slide itself */\n.reveal img,\n.reveal video,\n.reveal iframe {\n\tmax-width: 95%;\n\tmax-height: 95%;\n}\n\n/** Prevents layering issues in certain browser/transition combinations */\n.reveal a {\n\tposition: relative;\n}\n\n.reveal strong,\n.reveal b {\n\tfont-weight: bold;\n}\n\n.reveal em,\n.reveal i {\n\tfont-style: italic;\n}\n\n.reveal ol,\n.reveal ul {\n\tdisplay: inline-block;\n\n\ttext-align: left;\n\tmargin: 0 0 0 1em;\n}\n\n.reveal ol {\n\tlist-style-type: decimal;\n}\n\n.reveal ul {\n\tlist-style-type: disc;\n}\n\n.reveal ul ul {\n\tlist-style-type: square;\n}\n\n.reveal ul ul ul {\n\tlist-style-type: circle;\n}\n\n.reveal ul ul,\n.reveal ul ol,\n.reveal ol ol,\n.reveal ol ul {\n\tdisplay: block;\n\tmargin-left: 40px;\n}\n\n.reveal p {\n\tmargin-bottom: 10px;\n\tline-height: 1.2em;\n}\n\n.reveal q,\n.reveal blockquote {\n\tquotes: none;\n}\n\n.reveal blockquote {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 70%;\n\tmargin: 5px auto;\n\tpadding: 5px;\n\n\tfont-style: italic;\n\tbackground: rgba(255, 255, 255, 0.05);\n\tbox-shadow: 0px 0px 2px rgba(0,0,0,0.2);\n}\n\t.reveal blockquote p:first-child,\n\t.reveal blockquote p:last-child {\n\t\tdisplay: inline-block;\n\t}\n\n.reveal q {\n\tfont-style: italic;\n}\n\n.reveal pre {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 90%;\n\tmargin: 15px auto;\n\n\ttext-align: left;\n\tfont-size: 0.55em;\n\tfont-family: monospace;\n\tline-height: 1.2em;\n\n\tword-wrap: break-word;\n\n\tbox-shadow: 0px 0px 6px rgba(0,0,0,0.3);\n}\n.reveal code {\n\tfont-family: monospace;\n}\n.reveal pre code {\n\tpadding: 5px;\n\toverflow: auto;\n\tmax-height: 400px;\n\tword-wrap: normal;\n}\n.reveal pre.stretch code {\n\theight: 100%;\n\tmax-height: 100%;\n\n\t-webkit-box-sizing: border-box;\n\t   -moz-box-sizing: border-box;\n\t        box-sizing: border-box;\n}\n\n.reveal table th,\n.reveal table td {\n\ttext-align: left;\n\tpadding-right: .3em;\n}\n\n.reveal table th {\n\tfont-weight: bold;\n}\n\n.reveal sup {\n\tvertical-align: super;\n}\n.reveal sub {\n\tvertical-align: sub;\n}\n\n.reveal small {\n\tdisplay: inline-block;\n\tfont-size: 0.6em;\n\tline-height: 1.2em;\n\tvertical-align: top;\n}\n\n.reveal small * {\n\tvertical-align: top;\n}\n\n.reveal .stretch {\n\tmax-width: none;\n\tmax-height: none;\n}\n\n\n/*********************************************\n * CONTROLS\n *********************************************/\n\n.reveal .controls {\n\tdisplay: none;\n\tposition: fixed;\n\twidth: 110px;\n\theight: 110px;\n\tz-index: 30;\n\tright: 10px;\n\tbottom: 10px;\n}\n\n.reveal .controls div {\n\tposition: absolute;\n\topacity: 0.05;\n\twidth: 0;\n\theight: 0;\n\tborder: 12px solid transparent;\n\n\t-moz-transform: scale(.9999);\n\n\t-webkit-transition: all 0.2s ease;\n\t   -moz-transition: all 0.2s ease;\n\t    -ms-transition: all 0.2s ease;\n\t     -o-transition: all 0.2s ease;\n\t        transition: all 0.2s ease;\n}\n\n.reveal .controls div.enabled {\n\topacity: 0.7;\n\tcursor: pointer;\n}\n\n.reveal .controls div.enabled:active {\n\tmargin-top: 1px;\n}\n\n\t.reveal .controls div.navigate-left {\n\t\ttop: 42px;\n\n\t\tborder-right-width: 22px;\n\t\tborder-right-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-left.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\t.reveal .controls div.navigate-right {\n\t\tleft: 74px;\n\t\ttop: 42px;\n\n\t\tborder-left-width: 22px;\n\t\tborder-left-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-right.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\t.reveal .controls div.navigate-up {\n\t\tleft: 42px;\n\n\t\tborder-bottom-width: 22px;\n\t\tborder-bottom-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-up.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\t.reveal .controls div.navigate-down {\n\t\tleft: 42px;\n\t\ttop: 74px;\n\n\t\tborder-top-width: 22px;\n\t\tborder-top-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-down.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n\n.reveal .progress {\n\tposition: fixed;\n\tdisplay: none;\n\theight: 3px;\n\twidth: 100%;\n\tbottom: 0;\n\tleft: 0;\n\tz-index: 10;\n}\n\t.reveal .progress:after {\n\t\tcontent: '';\n\t\tdisplay: 'block';\n\t\tposition: absolute;\n\t\theight: 20px;\n\t\twidth: 100%;\n\t\ttop: -20px;\n\t}\n\t.reveal .progress span {\n\t\tdisplay: block;\n\t\theight: 100%;\n\t\twidth: 0px;\n\n\t\t-webkit-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t   -moz-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t    -ms-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t     -o-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t        transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t}\n\n/*********************************************\n * SLIDE NUMBER\n *********************************************/\n\n.reveal .slide-number {\n\tposition: fixed;\n\tdisplay: block;\n\tright: 15px;\n\tbottom: 15px;\n\topacity: 0.5;\n\tz-index: 31;\n\tfont-size: 12px;\n}\n\n/*********************************************\n * SLIDES\n *********************************************/\n\n.reveal {\n\tposition: relative;\n\twidth: 100%;\n\theight: 100%;\n\n\t-ms-touch-action: none;\n}\n\n.reveal .slides {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tleft: 50%;\n\ttop: 50%;\n\n\toverflow: visible;\n\tz-index: 1;\n\ttext-align: center;\n\n\t-webkit-transition: -webkit-perspective .4s ease;\n\t   -moz-transition: -moz-perspective .4s ease;\n\t    -ms-transition: -ms-perspective .4s ease;\n\t     -o-transition: -o-perspective .4s ease;\n\t        transition: perspective .4s ease;\n\n\t-webkit-perspective: 600px;\n\t   -moz-perspective: 600px;\n\t    -ms-perspective: 600px;\n\t        perspective: 600px;\n\n\t-webkit-perspective-origin: 0px -100px;\n\t   -moz-perspective-origin: 0px -100px;\n\t    -ms-perspective-origin: 0px -100px;\n\t        perspective-origin: 0px -100px;\n}\n\n.reveal .slides>section {\n\t-ms-perspective: 600px;\n}\n\n.reveal .slides>section,\n.reveal .slides>section>section {\n\tdisplay: none;\n\tposition: absolute;\n\twidth: 100%;\n\tpadding: 20px 0px;\n\n\tz-index: 10;\n\tline-height: 1.2em;\n\tfont-weight: inherit;\n\n\t-webkit-transform-style: preserve-3d;\n\t   -moz-transform-style: preserve-3d;\n\t    -ms-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\n\t-webkit-transition: -webkit-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-webkit-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t   -moz-transition: -moz-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-moz-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t    -ms-transition: -ms-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-ms-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t     -o-transition: -o-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-o-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t        transition: transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\ttransform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n}\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"] .slides section {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal[data-transition-speed=\"slow\"] .slides section {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n/* Slide-specific transition speed overrides */\n.reveal .slides section[data-transition-speed=\"fast\"] {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal .slides section[data-transition-speed=\"slow\"] {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n.reveal .slides>section {\n\tleft: -50%;\n\ttop: -50%;\n}\n\n.reveal .slides>section.stack {\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n}\n\n.reveal .slides>section.present,\n.reveal .slides>section>section.present {\n\tdisplay: block;\n\tz-index: 11;\n\topacity: 1;\n}\n\n.reveal.center,\n.reveal.center .slides,\n.reveal.center .slides section {\n\tmin-height: auto !important;\n}\n\n/* Don't allow interaction with invisible slides */\n.reveal .slides>section.future,\n.reveal .slides>section>section.future,\n.reveal .slides>section.past,\n.reveal .slides>section>section.past {\n\tpointer-events: none;\n}\n\n.reveal.overview .slides>section,\n.reveal.overview .slides>section>section {\n\tpointer-events: auto;\n}\n\n\n\n/*********************************************\n * DEFAULT TRANSITION\n *********************************************/\n\n.reveal .slides>section[data-transition=default].past,\n.reveal .slides>section.past {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n}\n.reveal .slides>section[data-transition=default].future,\n.reveal .slides>section.future {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n}\n\n.reveal .slides>section>section[data-transition=default].past,\n.reveal .slides>section>section.past {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n\t   -moz-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n\t    -ms-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n\t        transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n}\n.reveal .slides>section>section[data-transition=default].future,\n.reveal .slides>section>section.future {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n\t   -moz-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n\t    -ms-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n\t        transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n}\n\n\n/*********************************************\n * CONCAVE TRANSITION\n *********************************************/\n\n.reveal .slides>section[data-transition=concave].past,\n.reveal.concave  .slides>section.past {\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n}\n.reveal .slides>section[data-transition=concave].future,\n.reveal.concave .slides>section.future {\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n}\n\n.reveal .slides>section>section[data-transition=concave].past,\n.reveal.concave .slides>section>section.past {\n\t-webkit-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n\t   -moz-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n\t    -ms-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n\t        transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n}\n.reveal .slides>section>section[data-transition=concave].future,\n.reveal.concave .slides>section>section.future {\n\t-webkit-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n\t   -moz-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n\t    -ms-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n\t        transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n}\n\n\n/*********************************************\n * ZOOM TRANSITION\n *********************************************/\n\n.reveal .slides>section[data-transition=zoom],\n.reveal.zoom .slides>section {\n\t-webkit-transition-timing-function: ease;\n\t   -moz-transition-timing-function: ease;\n\t    -ms-transition-timing-function: ease;\n\t     -o-transition-timing-function: ease;\n\t        transition-timing-function: ease;\n}\n\n.reveal .slides>section[data-transition=zoom].past,\n.reveal.zoom .slides>section.past {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(16);\n\t   -moz-transform: scale(16);\n\t    -ms-transform: scale(16);\n\t     -o-transform: scale(16);\n\t        transform: scale(16);\n}\n.reveal .slides>section[data-transition=zoom].future,\n.reveal.zoom .slides>section.future {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(0.2);\n\t   -moz-transform: scale(0.2);\n\t    -ms-transform: scale(0.2);\n\t     -o-transform: scale(0.2);\n\t        transform: scale(0.2);\n}\n\n.reveal .slides>section>section[data-transition=zoom].past,\n.reveal.zoom .slides>section>section.past {\n\t-webkit-transform: translate(0, -150%);\n\t   -moz-transform: translate(0, -150%);\n\t    -ms-transform: translate(0, -150%);\n\t     -o-transform: translate(0, -150%);\n\t        transform: translate(0, -150%);\n}\n.reveal .slides>section>section[data-transition=zoom].future,\n.reveal.zoom .slides>section>section.future {\n\t-webkit-transform: translate(0, 150%);\n\t   -moz-transform: translate(0, 150%);\n\t    -ms-transform: translate(0, 150%);\n\t     -o-transform: translate(0, 150%);\n\t        transform: translate(0, 150%);\n}\n\n\n/*********************************************\n * LINEAR TRANSITION\n *********************************************/\n\n.reveal.linear section {\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t    -ms-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n}\n\n.reveal .slides>section[data-transition=linear].past,\n.reveal.linear .slides>section.past {\n\t-webkit-transform: translate(-150%, 0);\n\t   -moz-transform: translate(-150%, 0);\n\t    -ms-transform: translate(-150%, 0);\n\t     -o-transform: translate(-150%, 0);\n\t        transform: translate(-150%, 0);\n}\n.reveal .slides>section[data-transition=linear].future,\n.reveal.linear .slides>section.future {\n\t-webkit-transform: translate(150%, 0);\n\t   -moz-transform: translate(150%, 0);\n\t    -ms-transform: translate(150%, 0);\n\t     -o-transform: translate(150%, 0);\n\t        transform: translate(150%, 0);\n}\n\n.reveal .slides>section>section[data-transition=linear].past,\n.reveal.linear .slides>section>section.past {\n\t-webkit-transform: translate(0, -150%);\n\t   -moz-transform: translate(0, -150%);\n\t    -ms-transform: translate(0, -150%);\n\t     -o-transform: translate(0, -150%);\n\t        transform: translate(0, -150%);\n}\n.reveal .slides>section>section[data-transition=linear].future,\n.reveal.linear .slides>section>section.future {\n\t-webkit-transform: translate(0, 150%);\n\t   -moz-transform: translate(0, 150%);\n\t    -ms-transform: translate(0, 150%);\n\t     -o-transform: translate(0, 150%);\n\t        transform: translate(0, 150%);\n}\n\n\n/*********************************************\n * CUBE TRANSITION\n *********************************************/\n\n.reveal.cube .slides {\n\t-webkit-perspective: 1300px;\n\t   -moz-perspective: 1300px;\n\t    -ms-perspective: 1300px;\n\t        perspective: 1300px;\n}\n\n.reveal.cube .slides section {\n\tpadding: 30px;\n\tmin-height: 700px;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t    -ms-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n\n\t-webkit-box-sizing: border-box;\n\t   -moz-box-sizing: border-box;\n\t        box-sizing: border-box;\n}\n\t.reveal.center.cube .slides section {\n\t\tmin-height: auto;\n\t}\n\t.reveal.cube .slides section:not(.stack):before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbackground: rgba(0,0,0,0.1);\n\t\tborder-radius: 4px;\n\n\t\t-webkit-transform: translateZ( -20px );\n\t\t   -moz-transform: translateZ( -20px );\n\t\t    -ms-transform: translateZ( -20px );\n\t\t     -o-transform: translateZ( -20px );\n\t\t        transform: translateZ( -20px );\n\t}\n\t.reveal.cube .slides section:not(.stack):after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 90%;\n\t\theight: 30px;\n\t\tleft: 5%;\n\t\tbottom: 0;\n\t\tbackground: none;\n\t\tz-index: 1;\n\n\t\tborder-radius: 4px;\n\t\tbox-shadow: 0px 95px 25px rgba(0,0,0,0.2);\n\n\t\t-webkit-transform: translateZ(-90px) rotateX( 65deg );\n\t\t   -moz-transform: translateZ(-90px) rotateX( 65deg );\n\t\t    -ms-transform: translateZ(-90px) rotateX( 65deg );\n\t\t     -o-transform: translateZ(-90px) rotateX( 65deg );\n\t\t        transform: translateZ(-90px) rotateX( 65deg );\n\t}\n\n.reveal.cube .slides>section.stack {\n\tpadding: 0;\n\tbackground: none;\n}\n\n.reveal.cube .slides>section.past {\n\t-webkit-transform-origin: 100% 0%;\n\t   -moz-transform-origin: 100% 0%;\n\t    -ms-transform-origin: 100% 0%;\n\t        transform-origin: 100% 0%;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n}\n\n.reveal.cube .slides>section.future {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg);\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg);\n}\n\n.reveal.cube .slides>section>section.past {\n\t-webkit-transform-origin: 0% 100%;\n\t   -moz-transform-origin: 0% 100%;\n\t    -ms-transform-origin: 0% 100%;\n\t        transform-origin: 0% 100%;\n\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(90deg);\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(90deg);\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(90deg);\n\t        transform: translate3d(0, -100%, 0) rotateX(90deg);\n}\n\n.reveal.cube .slides>section>section.future {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n\t        transform: translate3d(0, 100%, 0) rotateX(-90deg);\n}\n\n\n/*********************************************\n * PAGE TRANSITION\n *********************************************/\n\n.reveal.page .slides {\n\t-webkit-perspective-origin: 0% 50%;\n\t   -moz-perspective-origin: 0% 50%;\n\t    -ms-perspective-origin: 0% 50%;\n\t        perspective-origin: 0% 50%;\n\n\t-webkit-perspective: 3000px;\n\t   -moz-perspective: 3000px;\n\t    -ms-perspective: 3000px;\n\t        perspective: 3000px;\n}\n\n.reveal.page .slides section {\n\tpadding: 30px;\n\tmin-height: 700px;\n\n\t-webkit-box-sizing: border-box;\n\t   -moz-box-sizing: border-box;\n\t        box-sizing: border-box;\n}\n\t.reveal.page .slides section.past {\n\t\tz-index: 12;\n\t}\n\t.reveal.page .slides section:not(.stack):before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbackground: rgba(0,0,0,0.1);\n\n\t\t-webkit-transform: translateZ( -20px );\n\t\t   -moz-transform: translateZ( -20px );\n\t\t    -ms-transform: translateZ( -20px );\n\t\t     -o-transform: translateZ( -20px );\n\t\t        transform: translateZ( -20px );\n\t}\n\t.reveal.page .slides section:not(.stack):after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 90%;\n\t\theight: 30px;\n\t\tleft: 5%;\n\t\tbottom: 0;\n\t\tbackground: none;\n\t\tz-index: 1;\n\n\t\tborder-radius: 4px;\n\t\tbox-shadow: 0px 95px 25px rgba(0,0,0,0.2);\n\n\t\t-webkit-transform: translateZ(-90px) rotateX( 65deg );\n\t}\n\n.reveal.page .slides>section.stack {\n\tpadding: 0;\n\tbackground: none;\n}\n\n.reveal.page .slides>section.past {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n\t   -moz-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n\t    -ms-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n\t        transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n}\n\n.reveal.page .slides>section.future {\n\t-webkit-transform-origin: 100% 0%;\n\t   -moz-transform-origin: 100% 0%;\n\t    -ms-transform-origin: 100% 0%;\n\t        transform-origin: 100% 0%;\n\n\t-webkit-transform: translate3d(0, 0, 0);\n\t   -moz-transform: translate3d(0, 0, 0);\n\t    -ms-transform: translate3d(0, 0, 0);\n\t        transform: translate3d(0, 0, 0);\n}\n\n.reveal.page .slides>section>section.past {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(0, -40%, 0) rotateX(80deg);\n\t   -moz-transform: translate3d(0, -40%, 0) rotateX(80deg);\n\t    -ms-transform: translate3d(0, -40%, 0) rotateX(80deg);\n\t        transform: translate3d(0, -40%, 0) rotateX(80deg);\n}\n\n.reveal.page .slides>section>section.future {\n\t-webkit-transform-origin: 0% 100%;\n\t   -moz-transform-origin: 0% 100%;\n\t    -ms-transform-origin: 0% 100%;\n\t        transform-origin: 0% 100%;\n\n\t-webkit-transform: translate3d(0, 0, 0);\n\t   -moz-transform: translate3d(0, 0, 0);\n\t    -ms-transform: translate3d(0, 0, 0);\n\t        transform: translate3d(0, 0, 0);\n}\n\n\n/*********************************************\n * FADE TRANSITION\n *********************************************/\n\n.reveal .slides section[data-transition=fade],\n.reveal.fade .slides section,\n.reveal.fade .slides>section>section {\n    -webkit-transform: none;\n\t   -moz-transform: none;\n\t    -ms-transform: none;\n\t     -o-transform: none;\n\t        transform: none;\n\n\t-webkit-transition: opacity 0.5s;\n\t   -moz-transition: opacity 0.5s;\n\t    -ms-transition: opacity 0.5s;\n\t     -o-transition: opacity 0.5s;\n\t        transition: opacity 0.5s;\n}\n\n\n.reveal.fade.overview .slides section,\n.reveal.fade.overview .slides>section>section,\n.reveal.fade.overview-deactivating .slides section,\n.reveal.fade.overview-deactivating .slides>section>section {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t    -ms-transition: none;\n\t     -o-transition: none;\n\t        transition: none;\n}\n\n\n/*********************************************\n * NO TRANSITION\n *********************************************/\n\n.reveal .slides section[data-transition=none],\n.reveal.none .slides section {\n\t-webkit-transform: none;\n\t   -moz-transform: none;\n\t    -ms-transform: none;\n\t     -o-transform: none;\n\t        transform: none;\n\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t    -ms-transition: none;\n\t     -o-transition: none;\n\t        transition: none;\n}\n\n\n/*********************************************\n * OVERVIEW\n *********************************************/\n\n.reveal.overview .slides {\n\t-webkit-perspective-origin: 0% 0%;\n\t   -moz-perspective-origin: 0% 0%;\n\t    -ms-perspective-origin: 0% 0%;\n\t        perspective-origin: 0% 0%;\n\n\t-webkit-perspective: 700px;\n\t   -moz-perspective: 700px;\n\t    -ms-perspective: 700px;\n\t        perspective: 700px;\n}\n\n.reveal.overview .slides section {\n\theight: 600px;\n\ttop: -300px !important;\n\toverflow: hidden;\n\topacity: 1 !important;\n\tvisibility: visible !important;\n\tcursor: pointer;\n\tbackground: rgba(0,0,0,0.1);\n}\n.reveal.overview .slides section .fragment {\n\topacity: 1;\n}\n.reveal.overview .slides section:after,\n.reveal.overview .slides section:before {\n\tdisplay: none !important;\n}\n.reveal.overview .slides section>section {\n\topacity: 1;\n\tcursor: pointer;\n}\n\t.reveal.overview .slides section:hover {\n\t\tbackground: rgba(0,0,0,0.3);\n\t}\n\t.reveal.overview .slides section.present {\n\t\tbackground: rgba(0,0,0,0.3);\n\t}\n.reveal.overview .slides>section.stack {\n\tpadding: 0;\n\ttop: 0 !important;\n\tbackground: none;\n\toverflow: visible;\n}\n\n\n/*********************************************\n * PAUSED MODE\n *********************************************/\n\n.reveal .pause-overlay {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: black;\n\tvisibility: hidden;\n\topacity: 0;\n\tz-index: 100;\n\n\t-webkit-transition: all 1s ease;\n\t   -moz-transition: all 1s ease;\n\t    -ms-transition: all 1s ease;\n\t     -o-transition: all 1s ease;\n\t        transition: all 1s ease;\n}\n.reveal.paused .pause-overlay {\n\tvisibility: visible;\n\topacity: 1;\n}\n\n\n/*********************************************\n * FALLBACK\n *********************************************/\n\n.no-transforms {\n\toverflow-y: auto;\n}\n\n.no-transforms .reveal .slides {\n\tposition: relative;\n\twidth: 80%;\n\theight: auto !important;\n\ttop: 0;\n\tleft: 50%;\n\tmargin: 0;\n\ttext-align: center;\n}\n\n.no-transforms .reveal .controls,\n.no-transforms .reveal .progress {\n\tdisplay: none !important;\n}\n\n.no-transforms .reveal .slides section {\n\tdisplay: block !important;\n\topacity: 1 !important;\n\tposition: relative !important;\n\theight: auto;\n\tmin-height: auto;\n\ttop: 0;\n\tleft: -50%;\n\tmargin: 70px 0;\n\n\t-webkit-transform: none;\n\t   -moz-transform: none;\n\t    -ms-transform: none;\n\t     -o-transform: none;\n\t        transform: none;\n}\n\n.no-transforms .reveal .slides section section {\n\tleft: 0;\n}\n\n.reveal .no-transition,\n.reveal .no-transition * {\n\t-webkit-transition: none !important;\n\t   -moz-transition: none !important;\n\t    -ms-transition: none !important;\n\t     -o-transition: none !important;\n\t        transition: none !important;\n}\n\n\n/*********************************************\n * BACKGROUND STATES [DEPRECATED]\n *********************************************/\n\n.reveal .state-background {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: rgba( 0, 0, 0, 0 );\n\n\t-webkit-transition: background 800ms ease;\n\t   -moz-transition: background 800ms ease;\n\t    -ms-transition: background 800ms ease;\n\t     -o-transition: background 800ms ease;\n\t        transition: background 800ms ease;\n}\n.alert .reveal .state-background {\n\tbackground: rgba( 200, 50, 30, 0.6 );\n}\n.soothe .reveal .state-background {\n\tbackground: rgba( 50, 200, 90, 0.4 );\n}\n.blackout .reveal .state-background {\n\tbackground: rgba( 0, 0, 0, 0.6 );\n}\n.whiteout .reveal .state-background {\n\tbackground: rgba( 255, 255, 255, 0.6 );\n}\n.cobalt .reveal .state-background {\n\tbackground: rgba( 22, 152, 213, 0.6 );\n}\n.mint .reveal .state-background {\n\tbackground: rgba( 22, 213, 75, 0.6 );\n}\n.submerge .reveal .state-background {\n\tbackground: rgba( 12, 25, 77, 0.6);\n}\n.lila .reveal .state-background {\n\tbackground: rgba( 180, 50, 140, 0.6 );\n}\n.sunset .reveal .state-background {\n\tbackground: rgba( 255, 122, 0, 0.6 );\n}\n\n\n/*********************************************\n * PER-SLIDE BACKGROUNDS\n *********************************************/\n\n.reveal>.backgrounds {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\n\t-webkit-perspective: 600px;\n\t   -moz-perspective: 600px;\n\t    -ms-perspective: 600px;\n\t        perspective: 600px;\n}\n\t.reveal .slide-background {\n\t\tposition: absolute;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\topacity: 0;\n\t\tvisibility: hidden;\n\n\t\tbackground-color: rgba( 0, 0, 0, 0 );\n\t\tbackground-position: 50% 50%;\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-size: cover;\n\n\t\t-webkit-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t   -moz-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t    -ms-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t     -o-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t        transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t}\n\t.reveal .slide-background.present {\n\t\topacity: 1;\n\t\tvisibility: visible;\n\t}\n\n\t.print-pdf .reveal .slide-background {\n\t\topacity: 1 !important;\n\t\tvisibility: visible !important;\n\t}\n\n/* Immediate transition style */\n.reveal[data-background-transition=none]>.backgrounds .slide-background,\n.reveal>.backgrounds .slide-background[data-background-transition=none] {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t    -ms-transition: none;\n\t     -o-transition: none;\n\t        transition: none;\n}\n\n/* 2D slide */\n.reveal[data-background-transition=slide]>.backgrounds .slide-background,\n.reveal>.backgrounds .slide-background[data-background-transition=slide] {\n\topacity: 1;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t    -ms-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n}\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background.past,\n\t.reveal>.backgrounds .slide-background.past[data-background-transition=slide] {\n\t\t-webkit-transform: translate(-100%, 0);\n\t\t   -moz-transform: translate(-100%, 0);\n\t\t    -ms-transform: translate(-100%, 0);\n\t\t     -o-transform: translate(-100%, 0);\n\t\t        transform: translate(-100%, 0);\n\t}\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background.future,\n\t.reveal>.backgrounds .slide-background.future[data-background-transition=slide] {\n\t\t-webkit-transform: translate(100%, 0);\n\t\t   -moz-transform: translate(100%, 0);\n\t\t    -ms-transform: translate(100%, 0);\n\t\t     -o-transform: translate(100%, 0);\n\t\t        transform: translate(100%, 0);\n\t}\n\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.past,\n\t.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=slide] {\n\t\t-webkit-transform: translate(0, -100%);\n\t\t   -moz-transform: translate(0, -100%);\n\t\t    -ms-transform: translate(0, -100%);\n\t\t     -o-transform: translate(0, -100%);\n\t\t        transform: translate(0, -100%);\n\t}\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.future,\n\t.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=slide] {\n\t\t-webkit-transform: translate(0, 100%);\n\t\t   -moz-transform: translate(0, 100%);\n\t\t    -ms-transform: translate(0, 100%);\n\t\t     -o-transform: translate(0, 100%);\n\t\t        transform: translate(0, 100%);\n\t}\n\n\n/* Convex */\n.reveal[data-background-transition=convex]>.backgrounds .slide-background.past,\n.reveal>.backgrounds .slide-background.past[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n}\n.reveal[data-background-transition=convex]>.backgrounds .slide-background.future,\n.reveal>.backgrounds .slide-background.future[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n}\n\n.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.past,\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n\t        transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n}\n.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.future,\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n\t        transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n}\n\n\n/* Concave */\n.reveal[data-background-transition=concave]>.backgrounds .slide-background.past,\n.reveal>.backgrounds .slide-background.past[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n}\n.reveal[data-background-transition=concave]>.backgrounds .slide-background.future,\n.reveal>.backgrounds .slide-background.future[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n}\n\n.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.past,\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n\t        transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n}\n.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.future,\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n\t        transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n}\n\n/* Zoom */\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background,\n.reveal>.backgrounds .slide-background[data-background-transition=zoom] {\n\t-webkit-transition-timing-function: ease;\n\t   -moz-transition-timing-function: ease;\n\t    -ms-transition-timing-function: ease;\n\t     -o-transition-timing-function: ease;\n\t        transition-timing-function: ease;\n}\n\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background.past,\n.reveal>.backgrounds .slide-background.past[data-background-transition=zoom] {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(16);\n\t   -moz-transform: scale(16);\n\t    -ms-transform: scale(16);\n\t     -o-transform: scale(16);\n\t        transform: scale(16);\n}\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background.future,\n.reveal>.backgrounds .slide-background.future[data-background-transition=zoom] {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(0.2);\n\t   -moz-transform: scale(0.2);\n\t    -ms-transform: scale(0.2);\n\t     -o-transform: scale(0.2);\n\t        transform: scale(0.2);\n}\n\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.past,\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=zoom] {\n\topacity: 0;\n\t\tvisibility: hidden;\n\n\t\t-webkit-transform: scale(16);\n\t\t   -moz-transform: scale(16);\n\t\t    -ms-transform: scale(16);\n\t\t     -o-transform: scale(16);\n\t\t        transform: scale(16);\n}\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.future,\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=zoom] {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(0.2);\n\t   -moz-transform: scale(0.2);\n\t    -ms-transform: scale(0.2);\n\t     -o-transform: scale(0.2);\n\t        transform: scale(0.2);\n}\n\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"]>.backgrounds .slide-background {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal[data-transition-speed=\"slow\"]>.backgrounds .slide-background {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n\n/*********************************************\n * RTL SUPPORT\n *********************************************/\n\n.reveal.rtl .slides,\n.reveal.rtl .slides h1,\n.reveal.rtl .slides h2,\n.reveal.rtl .slides h3,\n.reveal.rtl .slides h4,\n.reveal.rtl .slides h5,\n.reveal.rtl .slides h6 {\n\tdirection: rtl;\n\tfont-family: sans-serif;\n}\n\n.reveal.rtl pre,\n.reveal.rtl code {\n\tdirection: ltr;\n}\n\n.reveal.rtl ol,\n.reveal.rtl ul {\n\ttext-align: right;\n}\n\n.reveal.rtl .progress span {\n\tfloat: right\n}\n\n/*********************************************\n * PARALLAX BACKGROUND\n *********************************************/\n\n.reveal.has-parallax-background .backgrounds {\n\t-webkit-transition: all 0.8s ease;\n\t   -moz-transition: all 0.8s ease;\n\t    -ms-transition: all 0.8s ease;\n\t        transition: all 0.8s ease;\n}\n\n/* Global transition speed settings */\n.reveal.has-parallax-background[data-transition-speed=\"fast\"] .backgrounds {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal.has-parallax-background[data-transition-speed=\"slow\"] .backgrounds {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n\n/*********************************************\n * LINK PREVIEW OVERLAY\n *********************************************/\n\n .reveal .preview-link-overlay {\n \tposition: absolute;\n \ttop: 0;\n \tleft: 0;\n \twidth: 100%;\n \theight: 100%;\n \tz-index: 1000;\n \tbackground: rgba( 0, 0, 0, 0.9 );\n \topacity: 0;\n \tvisibility: hidden;\n\n \t-webkit-transition: all 0.3s ease;\n \t   -moz-transition: all 0.3s ease;\n \t    -ms-transition: all 0.3s ease;\n \t        transition: all 0.3s ease;\n }\n \t.reveal .preview-link-overlay.visible {\n \t\topacity: 1;\n \t\tvisibility: visible;\n \t}\n\n \t.reveal .preview-link-overlay .spinner {\n \t\tposition: absolute;\n \t\tdisplay: block;\n \t\ttop: 50%;\n \t\tleft: 50%;\n \t\twidth: 32px;\n \t\theight: 32px;\n \t\tmargin: -16px 0 0 -16px;\n \t\tz-index: 10;\n \t\tbackground-image: url(data:image/gif;base64,R0lGODlhIAAgAPMAAJmZmf%2F%2F%2F6%2Bvr8nJybW1tcDAwOjo6Nvb26ioqKOjo7Ozs%2FLy8vz8%2FAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ%2FV%2FnmOM82XiHRLYKhKP1oZmADdEAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY%2FCZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB%2BA4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6%2BHo7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq%2BB6QDtuetcaBPnW6%2BO7wDHpIiK9SaVK5GgV543tzjgGcghAgAh%2BQQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK%2B%2BG%2Bw48edZPK%2BM6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE%2BG%2BcD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm%2BFNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk%2BaV%2BoJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0%2FVNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc%2BXiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30%2FiI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE%2FjiuL04RGEBgwWhShRgQExHBAAh%2BQQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY%2BYip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd%2BMFCN6HAAIKgNggY0KtEBAAh%2BQQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1%2BvsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d%2BjYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg%2BygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0%2Bbm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h%2BKr0SJ8MFihpNbx%2B4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX%2BBP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA%3D%3D);\n\n \t\tvisibility: visible;\n \t\topacity: 0.6;\n\n \t\t-webkit-transition: all 0.3s ease;\n \t\t   -moz-transition: all 0.3s ease;\n \t\t    -ms-transition: all 0.3s ease;\n \t\t        transition: all 0.3s ease;\n \t}\n\n \t.reveal .preview-link-overlay header {\n \t\tposition: absolute;\n \t\tleft: 0;\n \t\ttop: 0;\n \t\twidth: 100%;\n \t\theight: 40px;\n \t\tz-index: 2;\n \t\tborder-bottom: 1px solid #222;\n \t}\n \t\t.reveal .preview-link-overlay header a {\n \t\t\tdisplay: inline-block;\n \t\t\twidth: 40px;\n \t\t\theight: 40px;\n \t\t\tpadding: 0 10px;\n \t\t\tfloat: right;\n \t\t\topacity: 0.6;\n\n \t\t\tbox-sizing: border-box;\n \t\t}\n \t\t\t.reveal .preview-link-overlay header a:hover {\n \t\t\t\topacity: 1;\n \t\t\t}\n \t\t\t.reveal .preview-link-overlay header a .icon {\n \t\t\t\tdisplay: inline-block;\n \t\t\t\twidth: 20px;\n \t\t\t\theight: 20px;\n\n \t\t\t\tbackground-position: 50% 50%;\n \t\t\t\tbackground-size: 100%;\n \t\t\t\tbackground-repeat: no-repeat;\n \t\t\t}\n \t\t\t.reveal .preview-link-overlay header a.close .icon {\n \t\t\t\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR8WX4VHDMAxG6wnoJrABZQPYBCaBTWAD2g1gE5gg6OOsXuxIlr40d81dfrSJ9V4c2VLK7spHuTJ/5wpM07QXuXc5X0opX2tEJcadjHuV80li/FgxTIEK/5QBCICBD6xEhSMGHgQPgBgLiYVAB1dpSqKDawxTohFw4JSEA3clzgIBPCURwE2JucBR7rhPJJv5OpJwDX+SfDjgx1wACQeJG1aChP9K/IMmdZ8DtESV1WyP3Bt4MwM6sj4NMxMYiqUWHQu4KYA/SYkIjOsm3BXYWMKFDwU2khjCQ4ELJUJ4SmClRArOCmSXGuKma0fYD5CbzHxFpCSGAhfAVSSUGDUk2BWZaff2g6GE15BsBQ9nwmpIGDiyHQddwNTMKkbZaf9fajXQca1EX44puJZUsnY0ObGmITE3GVLCbEhQUjGVt146j6oasWN+49Vph2w1pZ5EansNZqKBm1txbU57iRRcZ86RWMDdWtBJUHBHwoQPi1GV+JCbntmvok7iTX4/Up9mgyTc/FJYDTcndgH/AA5A/CHsyEkVAAAAAElFTkSuQmCC);\n \t\t\t}\n \t\t\t.reveal .preview-link-overlay header a.external .icon {\n \t\t\t\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVRYR+2WSQoAIQwEzf8f7XiOMkUQxUPlGkM3hVmiQfQR9GYnH1SsAQlI4DiBqkCMoNb9y2e90IAEJPAcgdznU9+engMaeJ7Azh5Y1U67gAho4DqBqmB1buAf0MB1AlVBek83ZPkmJMGc1wAR+AAqod/B97TRpQAAAABJRU5ErkJggg==);\n \t\t\t}\n\n \t.reveal .preview-link-overlay .viewport {\n \t\tposition: absolute;\n \t\ttop: 40px;\n \t\tright: 0;\n \t\tbottom: 0;\n \t\tleft: 0;\n \t}\n\n \t.reveal .preview-link-overlay .viewport iframe {\n \t\twidth: 100%;\n \t\theight: 100%;\n \t\tmax-width: 100%;\n \t\tmax-height: 100%;\n \t\tborder: 0;\n\n \t\topacity: 0;\n \t\tvisibility: hidden;\n\n \t\t-webkit-transition: all 0.3s ease;\n \t\t   -moz-transition: all 0.3s ease;\n \t\t    -ms-transition: all 0.3s ease;\n \t\t        transition: all 0.3s ease;\n \t}\n\n \t.reveal .preview-link-overlay.loaded .viewport iframe {\n \t\topacity: 1;\n \t\tvisibility: visible;\n \t}\n\n \t.reveal .preview-link-overlay.loaded .spinner {\n \t\topacity: 0;\n \t\tvisibility: hidden;\n\n \t\t-webkit-transform: scale(0.2);\n \t\t   -moz-transform: scale(0.2);\n \t\t    -ms-transform: scale(0.2);\n \t\t        transform: scale(0.2);\n \t}\n\n\n\n/*********************************************\n * PLAYBACK COMPONENT\n *********************************************/\n\n.reveal .playback {\n\tposition: fixed;\n\tleft: 15px;\n\tbottom: 15px;\n\tz-index: 30;\n\tcursor: pointer;\n\n\t-webkit-transition: all 400ms ease;\n\t   -moz-transition: all 400ms ease;\n\t    -ms-transition: all 400ms ease;\n\t        transition: all 400ms ease;\n}\n\n.reveal.overview .playback {\n\topacity: 0;\n\tvisibility: hidden;\n}\n\n\n/*********************************************\n * ROLLING LINKS\n *********************************************/\n\n.reveal .roll {\n\tdisplay: inline-block;\n\tline-height: 1.2;\n\toverflow: hidden;\n\n\tvertical-align: top;\n\n\t-webkit-perspective: 400px;\n\t   -moz-perspective: 400px;\n\t    -ms-perspective: 400px;\n\t        perspective: 400px;\n\n\t-webkit-perspective-origin: 50% 50%;\n\t   -moz-perspective-origin: 50% 50%;\n\t    -ms-perspective-origin: 50% 50%;\n\t        perspective-origin: 50% 50%;\n}\n\t.reveal .roll:hover {\n\t\tbackground: none;\n\t\ttext-shadow: none;\n\t}\n.reveal .roll span {\n\tdisplay: block;\n\tposition: relative;\n\tpadding: 0 2px;\n\n\tpointer-events: none;\n\n\t-webkit-transition: all 400ms ease;\n\t   -moz-transition: all 400ms ease;\n\t    -ms-transition: all 400ms ease;\n\t        transition: all 400ms ease;\n\n\t-webkit-transform-origin: 50% 0%;\n\t   -moz-transform-origin: 50% 0%;\n\t    -ms-transform-origin: 50% 0%;\n\t        transform-origin: 50% 0%;\n\n\t-webkit-transform-style: preserve-3d;\n\t   -moz-transform-style: preserve-3d;\n\t    -ms-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n}\n\t.reveal .roll:hover span {\n\t    background: rgba(0,0,0,0.5);\n\n\t    -webkit-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t       -moz-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t        -ms-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t            transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t}\n.reveal .roll span:after {\n\tcontent: attr(data-title);\n\n\tdisplay: block;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tpadding: 0 2px;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n\n\t-webkit-transform-origin: 50% 0%;\n\t   -moz-transform-origin: 50% 0%;\n\t    -ms-transform-origin: 50% 0%;\n\t        transform-origin: 50% 0%;\n\n\t-webkit-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n\t   -moz-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n\t    -ms-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n\t        transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n}\n\n\n/*********************************************\n * SPEAKER NOTES\n *********************************************/\n\n.reveal aside.notes {\n\tdisplay: none;\n}\n\n\n/*********************************************\n * ZOOM PLUGIN\n *********************************************/\n\n.zoomed .reveal *,\n.zoomed .reveal *:before,\n.zoomed .reveal *:after {\n\t-webkit-transform: none !important;\n\t   -moz-transform: none !important;\n\t    -ms-transform: none !important;\n\t        transform: none !important;\n\n\t-webkit-backface-visibility: visible !important;\n\t   -moz-backface-visibility: visible !important;\n\t    -ms-backface-visibility: visible !important;\n\t        backface-visibility: visible !important;\n}\n\n.zoomed .reveal .progress,\n.zoomed .reveal .controls {\n\topacity: 0;\n}\n\n.zoomed .reveal .roll span {\n\tbackground: none;\n}\n\n.zoomed .reveal .roll span:after {\n\tvisibility: hidden;\n}\n\n\n", ""]);
	
	// exports


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,700,300italic,700italic);", ""]);
	
	// module
	exports.push([module.id, "/**\n * Blood theme for reveal.js\n * Author: Walther http://github.com/Walther\n *\n * Designed to be used with highlight.js theme\n * \"monokai_sublime.css\" available from\n * https://github.com/isagalaev/highlight.js/\n *\n * For other themes, change $codeBackground accordingly.\n *\n */\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\nbody {\n  background: #222222;\n  background: -moz-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #626262), color-stop(100%, #222222));\n  background: -webkit-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: -o-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: -ms-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background-color: #2b2b2b; }\n\n.reveal {\n  font-family: Ubuntu, \"sans-serif\";\n  font-size: 36px;\n  font-weight: normal;\n  letter-spacing: -0.02em;\n  color: #eeeeee; }\n\n::selection {\n  color: white;\n  background: #aa2233;\n  text-shadow: none; }\n\n/*********************************************\n * HEADERS\n *********************************************/\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n  margin: 0 0 20px 0;\n  color: #eeeeee;\n  font-family: Ubuntu, \"sans-serif\";\n  line-height: 0.9em;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  text-shadow: 2px 2px 2px #222222; }\n\n.reveal h1 {\n  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbbbbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaaaaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 20px 20px rgba(0, 0, 0, 0.15); }\n\n/*********************************************\n * LINKS\n *********************************************/\n.reveal a:not(.image) {\n  color: #aa2233;\n  text-decoration: none;\n  -webkit-transition: color .15s ease;\n  -moz-transition: color .15s ease;\n  -ms-transition: color .15s ease;\n  -o-transition: color .15s ease;\n  transition: color .15s ease; }\n\n.reveal a:not(.image):hover {\n  color: #dd5566;\n  text-shadow: none;\n  border: none; }\n\n.reveal .roll span:after {\n  color: #fff;\n  background: #6a1520; }\n\n/*********************************************\n * IMAGES\n *********************************************/\n.reveal section img {\n  margin: 15px 0px;\n  background: rgba(255, 255, 255, 0.12);\n  border: 4px solid #eeeeee;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);\n  -webkit-transition: all .2s linear;\n  -moz-transition: all .2s linear;\n  -ms-transition: all .2s linear;\n  -o-transition: all .2s linear;\n  transition: all .2s linear; }\n\n.reveal a:hover img {\n  background: rgba(255, 255, 255, 0.2);\n  border-color: #aa2233;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55); }\n\n/*********************************************\n * NAVIGATION CONTROLS\n *********************************************/\n.reveal .controls div.navigate-left,\n.reveal .controls div.navigate-left.enabled {\n  border-right-color: #aa2233; }\n\n.reveal .controls div.navigate-right,\n.reveal .controls div.navigate-right.enabled {\n  border-left-color: #aa2233; }\n\n.reveal .controls div.navigate-up,\n.reveal .controls div.navigate-up.enabled {\n  border-bottom-color: #aa2233; }\n\n.reveal .controls div.navigate-down,\n.reveal .controls div.navigate-down.enabled {\n  border-top-color: #aa2233; }\n\n.reveal .controls div.navigate-left.enabled:hover {\n  border-right-color: #dd5566; }\n\n.reveal .controls div.navigate-right.enabled:hover {\n  border-left-color: #dd5566; }\n\n.reveal .controls div.navigate-up.enabled:hover {\n  border-bottom-color: #dd5566; }\n\n.reveal .controls div.navigate-down.enabled:hover {\n  border-top-color: #dd5566; }\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n.reveal .progress {\n  background: rgba(0, 0, 0, 0.2); }\n\n.reveal .progress span {\n  background: #aa2233;\n  -webkit-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -moz-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -ms-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -o-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n/*********************************************\n * SLIDE NUMBER\n *********************************************/\n.reveal .slide-number {\n  color: #aa2233; }\n\n.reveal p {\n  font-weight: 300;\n  text-shadow: 1px 1px #222222; }\n\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n  font-weight: 700; }\n\n.reveal a:not(.image),\n.reveal a:not(.image):hover {\n  text-shadow: 2px 2px 2px #000; }\n\n.reveal small a:not(.image),\n.reveal small a:not(.image):hover {\n  text-shadow: 1px 1px 1px #000; }\n\n.reveal p code {\n  background-color: #23241f;\n  display: inline-block;\n  border-radius: 7px; }\n\n.reveal small code {\n  vertical-align: baseline; }\n", ""]);
	
	// exports


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, ".reveal .slides #camponile {\r\n    height: 300px;\r\n    width: auto;\r\n}\r\n.reveal .slides .intro img {\r\n    width: 95%;\r\n    height: auto;\r\n}\r\n.reveal .slides img {\r\n    max-height: 600px !important;  \r\n    border: none !important;\r\n}\r\n.reveal .slides .who-am-i img {\r\n    max-height: 400px !important;\r\n}", ""]);
	
	// exports


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(9)();
	// imports
	
	
	// module
	exports.push([module.id, "#webpack-logo-1000ft {\r\n  width: 50px;\r\n  height: auto;\r\n}\r\n#webpack-logo-100ft {\r\n  width: 500px;\r\n  height: auto;\r\n}", ""]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);
	
	var _slides = __webpack_require__(113);
	
	var _slides2 = _interopRequireDefault(_slides);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slideShow = __webpack_require__(2);
	
	var _slideShow2 = _interopRequireDefault(_slideShow);
	
	__webpack_require__(114);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _slideShow2.default;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EAnatomy of an NPM \u003Ccode\u003Epackage.json\u003C\u002Fcode\u003E File\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(30).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(29).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(34).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(32).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(33).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(31).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ENPM Dependencies\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EInstallation\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003Enpm install dependency-name\u003C\u002Fcode\u003E - Performs a one time installation of a module\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003Enpm install -g dependency-name\u003C\u002Fcode\u003E - Installs to your global NPM installation\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003Enpm install --save dependency-name\u003C\u002Fcode\u003E - Installs to your project &amp; and updates the \u003Cstrong\u003Edependencies\u003C\u002Fstrong\u003E list\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003Enpm install --save-dev dependency-name\u003C\u002Fcode\u003E - Installs to your project &amp; and updates the \u003Cstrong\u003EdevDependencies\u003C\u002Fstrong\u003E list\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EDependencies vs. Dev Dependencies\u003C\u002Fh2\u003E\u003Cpre\u003E\"dependencies\": {\n    \"reveal\": \"0.0.4\"\n},\n\"devDependencies\": {\n    \"babel-core\": \"^6.13.2\",\n    ...\n    \"webpack\": \"^1.13.2\",\n    \"webpack-dev-server\": \"^1.14.1\"\n}\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EDependencies are intended to be packaged with your application and are needed to execute the application by other modules\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EDev Dependencies are used in order to develop or test your application\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EStarting with a pre-written project\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EYour first step is to perform an \u003Cnpm\u003Einstall\u003C\u002Fnpm\u003E\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EBoth dev dependencies and project dependencies will be installed\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EPeer Dependencies\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EMost NPM modules will have dependencies of their own\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003ELuckily, NPM handles that for us! It will not only download your dependency, but its dependencies, as well.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EAll peer dependencies will be sibling directories of your dependency\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYou will not need to explicitly denote those modules in the \u003Ccode\u003Epackage.json\u003C\u002Fcode\u003E file.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EGenerate an NPM Baseline\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003E\u003Ccode\u003E\u003C\u002Fcode\u003E npm init\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe above command will begin the initialization process\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIt will ask you to provide the following\u003C\u002Fp\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EThe name of your project (defaults to your directory name)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EVersion (defaults to 1.0.0, see \u003Ca href=\"http:\u002F\u002Fsemver.org\u002F\" target=\"_blank\"\u003Ethis link for more details\u003C\u002Fa\u003E)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EDescription\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EEntry Point (this is where your application lives)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ETest Command (aka if you have a test suite, how to execute it)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003Egit repository (if you perform a \u003Ccode\u003Egit init\u003C\u002Fcode\u003E prior to this step, it will pick up the repo)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EKeywords (for NPM searching)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EAuthor\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ELicense (defaults to \u003Ca href=\"https:\u002F\u002Fopensource.org\u002Flicenses\u002FISC\"\u003EISC\u003C\u002Fa\u003E)\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EOther Commands\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003E\u003Ccode\u003Enpm remove dependency-name\u003C\u002Fcode\u003E - Removes the dependency from the application\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Ccode\u003Enpm prune\u003C\u002Fcode\u003E - Removes undeclared dependencies\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Ccode\u003Enpm link\u003C\u002Fcode\u003E - Points the NPM registry to your local directory for the package name (local testing)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Ccode\u003Enpm shrinkwrap\u003C\u002Fcode\u003E - Creates a file that locks down the version numbers currently installed\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EScripts\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003E\"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" &amp;&amp; exit 1\",\n    \"start\": \"webpack-dev-server\",\n    \"postinstall\": \"webpack\"\n}\u003C\u002Fpre\u003E\u003Cp\u003EThese are used to abstract the underlying dependencies\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFor instance, if your testing framework changes from mocha to jasmine, your test command will still be \u003Cstrong\u003Enpm test\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EAvailable npm-scripts properties can be found \u003Ca href=\"https:\u002F\u002Fdocs.npmjs.com\u002Fmisc\u002Fscripts\"\u003Ehere\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ESharing your NPM module\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ccode\u003Enpm publish\u003C\u002Fcode\u003E\u003Cp class=\"fragment\"\u003EThis will make your module available at \u003Ccode\u003Ehttps:\u002F\u002Fwww.npmjs.com\u002Fpackage\u002F{your package name}\u003C\u002Fcode\u003E\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EOther NPM users can now npm install your module!\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch4\u003E.npmignore\u003C\u002Fh4\u003E\u003Cp class=\"fragment\"\u003ESimilar to a \u003Cstrong\u003E.gitignore\u003C\u002Fstrong\u003E file, \u003Cstrong\u003E.npmignore\u003C\u002Fstrong\u003E will contain the files &amp; directories you do not want to publish.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYour \u003Cstrong\u003E.npmignore\u003C\u002Fstrong\u003E file should, at minimum, contain \u003Cstrong\u003E\u002Fnode_modules\u002F\u003C\u002Fstrong\u003E. Those will be installed when an \u003Ccode\u003Enpm install\u003C\u002Fcode\u003E is executed.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EDependency Versioning\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003E^\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EIndicates that any minor version of the dependency will do\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003E^3.2.5\u003C\u002Fcode\u003E means anything \u003Ccode\u003E^3.x.x\u003C\u002Fcode\u003E is valid\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003E~\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EIndicates that any patch version of the dependency is acceptable\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003E~3.2.5\u003C\u002Fcode\u003E means anything \u003Ccode\u003E^3.2.x\u003C\u002Fcode\u003E is valid\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ENo Proceeding Modifier\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThis means this version, and this version only, is acceptable\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003E3.2.5\u003C\u002Fcode\u003E means ONLY \u003Ccode\u003E3.2.5\u003C\u002Fcode\u003E is valid\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhy can't I automatically pick up \u003Cstrong\u003Emajor\u003C\u002Fstrong\u003E version changes?\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EAccording to SEMVER, major changes are those that cause a breaking change\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis means changes to an API or syntax that breaks reverse compatibility\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EArrow Functions\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(36).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(37).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(38).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EBasic Syntax\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Econst helloWorld = () =\u003E {\n  console.log('Hello World');\n}\nconst oldHelloWorld = function() {\n  console.log('Hello World');\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EInline Return\u003C\u002Fh2\u003E\u003Cpre\u003Econst getGreeting = (name) =\u003E `Hello, ${name}!`;\nconsole.log(getGreeting());\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EBy removing the curly braces, it will return the result of the expression inside the arrow function.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003ENote: You are unable to perform more than 1 line of code in these inlined arrow functions.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EInline Object Returns\u003C\u002Fh2\u003E\u003Cpre\u003Econst makeNameObject = (first, middle, last) =\u003E ({\n  first, middle, last\n});\nconsole.log(makeNameObject('Evan', 'M.', 'Williams')); \u002F\u002F { first: 'Evan', middle: 'M.', last: 'Williams' }\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ESingle Parameter Notation\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EBefore I show this syntax, I suggest not to use it. Single parameter notation blends into the code more so than using the ()\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst collection = [1, 2, 3];\ncollection.map(item =\u003E item * 2);\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EMy preference would be to define the arrow function as:\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Ecollection.map((item) =\u003E item * 2);\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003E\u003Ccode\u003Ethis\u003C\u002Fcode\u003E Keyword\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThe \u003Cstrong\u003Ethis\u003C\u002Fstrong\u003E keyword, in ES5, is assigned to the context of each function. In strict mode, it would return\nundefined.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis was handled in ES5 by aliasing the \u003Cstrong\u003Ethis\u003C\u002Fstrong\u003E variable outside the context of the interior function.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction Name(first, middle, last) {\n  const self = this;\n  self.nameString = `${first} ${middle} ${last}`;\n  setTimeout(function() {\n    console.log(`Hello, ${self.nameString}`); \u002F\u002F Hello, Evan M. Williams\n  }, 250);\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EArrow functions use the contextual `this` of its parent function.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction Name(first, middle, last) {\n  this.nameString = `${first} ${middle} ${last}`;\n  setTimeout(() =\u003E console.log(`Hello, ${this.nameString}`), 100); \u002F\u002F Hello, Evan M. Williams\n  setTimeout(function() {\n    console.log(`Hello, ${this.nameString}`); \u002F\u002F Hello, undefined\n  }, 250);\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ESo, why use Arrow Functions?\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThey're more concise.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst myCollection = [1, 5, 10, 100];\nconsole.log(myCollection.map((i) =\u003E i * i));\nconsole.log(myCollection.map(function(i) {\n  return i * i;\n}));\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThe \u003Cstrong\u003Ethis\u003C\u002Fstrong\u003E variable is easier to understand.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction MyType() {\n  this.name = 'MyType';\n  setTimeout(() =\u003E console.log(this.name), 250);\n}\nfunction MyType() {\n  const self = this;\n  self.name = 'MyType';\n  setTimeout(function() {\n    console.log(self.name);\n  }, 250);\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EES6 Classes\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(40).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(42).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(41).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EThe concept of classes in ES5\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EPrototypical Objects\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EObjects in Javascript are prototypical, meaning they are created from a \"prototype\" declaration.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EAll objects of that type will have the same properties as the prototype when created. For instance, a new object \nwill have \"toString\" method already available when defining it.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EDefining Classes as Functions\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EIn ES5, you could create a class-like object by defining it as a function and then calling new on that function.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction Person(name, age) {\n  const self = this;\n  self.name = name;\n  self.age = age;\n}\nPerson.prototype.sayHello = function() {\n  console.log(`Hello, ${this.name}`);\n}\nnew Person('Evan Williams', 27).sayHello(); \u002F\u002F Hello, Evan Williams\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EA ES6 class will be transpiled into a function similar to above, but instead of using prototypes, it manually sets\neach property onto the returned object.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYou can see all the extra fluff that gets added by \u003Ca href=\"https:\u002F\u002Fbabeljs.io\u002Frepl\u002F#?babili=false&amp;evaluate=true&amp;lineWrap=false&amp;presets=es2015%2Creact%2Cstage-2&amp;code=class%20Person%20%7B%0D%0A%20%20constructor%20(name%2C%20age)%20%7B%0D%0A%20%20%20%20this.name%20%3D%20name%3B%0D%0A%20%20%20%20this.age%20%3D%20age%3B%0D%0A%20%20%7D%0D%0A%20%20sayHello%20()%20%7B%0D%0A%20%20%20%20console.log(%60Hello%2C%20%24%7Bthis.name%7D%60)%3B%0D%0A%20%20%7D%0D%0A%7D)\"\u003Eviewing this link\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhy prototypical inheritance is potentially dangerous\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThe reason classes don't use prototypes, is prototypes can potentially be modified outside the context of the class.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003EObject.prototype.toString = () =\u003E console.log(`Didn't expect this, did you?`);\nconst test = {};\ntest.toString(); \u002F\u002F Didn't expect this, did you?\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EModifying the prototype even changes the behavior of already defined objects.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst test = {};\ntest.toString(); \u002F\u002F [object Object]      \nObject.prototype.toString = () =\u003E console.log(`Didn't expect this, did you?`);\ntest.toString(); \u002F\u002F Didn't expect this, did you?\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EGetters and Setters\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EYou can always access and set properties on an instance of a class as you would any object.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eclass Clazz {\n  constructor() {\n    this.property = 'prop';\n  }\n}\nconsole.log(new Clazz().property); \u002F\u002F prop\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EES6 classes introduced getters and setters on the class definition.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eclass Clazz {\n  get property() {\n    return this._property;\n  }\n  set property(property) {\n    this._property = property;\n  }\n}\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EUsing the standard property accessor syntax (dot notation or array notation) on a class instance will\ncall the \u003Cstrong\u003Eget\u003C\u002Fstrong\u003E and \u003Cstrong\u003Eset\u003C\u002Fstrong\u003E functions matching that name.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Eclass Clazz {\n   get property() {\n     return this._property;\n   }\n   set property(property) {\n     console.log(`Setting property to: ${property}`);\n     this._property = property;\n   }\n }\n const clazz = new Clazz();\n clazz.property = 'Test'; \u002F\u002F Setting property to Test\n console.log(clazz.property); \u002F\u002F Test\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThis is useful for executing some sort of data transformation on incoming properties or type checking and validation.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIf you noticed, I used an underscore to name the property on the \u003Cstrong\u003Ethis\u003C\u002Fstrong\u003E keyword. This is because if you \nattempt to name the property on the instance the same as the name of the property, you'll get an infinite loop.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe infinite loop is caused by calling the setter when you attempt to set it within the \u003Cstrong\u003Eset {property}\u003C\u002Fstrong\u003E function itself.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EClass Inheritance\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Eclass Animal {\n  makeNoise() {\n    console.log(this.sound);\n  }        \n}\nclass Dog extends Animal {\n  constructor() {\n    super(); \u002F\u002F Required in a constructor\n    this.sound = 'Woof!';\n  }\n}\nnew Dog().makeNoise(); \u002F\u002F Woof!\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EYou can access parent function by using the \u003Cstrong\u003Esuper\u003C\u002Fstrong\u003E keyword.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eclass Animal {\n  eat(food) {\n    console.log(`The animal just ate ${food}`);\n  }\n}\nclass Dog extends Animal {\n  beFed() {\n    super.eat('dog food');\n  }\n}\nnew Dog().beFed(); \u002F\u002F The animal just ate dog food.\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EExpression based Inheritance\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Eclass Animal {\n  makeNoise() {\n    console.log(this.noise);\n  }\n}\nclass Dog extends Animal {\n  constructor() {\n    super();\n    this.noise = 'woof';\n  }\n}\nclass Puppy extends Dog {\n  constructor() {\n    super();\n    this.noise = 'yipe';\n  }\n}\nconst defineCanine = (age) =\u003E age \u003C 1.0 ? Puppy : Dog;\nclass Canine extends defineCanine(0.5) {\n  constructor() {\n    super(); \n  }\n}\nnew Canine().makeNoise(); \u002F\u002F yipe\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EES6 Introduction\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(47).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(44).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(45).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(46).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EAdoption\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EAs browsers become more important to our lives, the adoption of these standards is done much faster. ES3 took about a decade to be adopted.\n ES5 took closer to about 3 years. ES6's current status is pretty impressive, in my book!\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003ETo view its current adoption levels, \u003Ca href=\"http:\u002F\u002Fkangax.github.io\u002Fcompat-table\u002Fes6\u002F\"\u003Echeck out this table.\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYou'll notice on the left there are things called \"compilers\u002Fpolyfills\". This approach allows us to write ES6, and have it be transformed to backfill \nfunctionality into older browsers.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EBabel\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EWe will be using Babel to transpile our ES6 into ES5 to reach those outdated browsers. It has a 71% ES6 coverage at the time of recording, but I've found\nthat it supports enough use cases for our purposes.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIn the \u003Ca href=\"https:\u002F\u002Fwww.youtube.com\u002Fwatch?v=ptP-zVgOZD8\"\u003Eprevious video\u003C\u002Fa\u003E we set up a webpack configuration that executes a Babel transpilation on our code.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EMore information \u003Ca href=\"https:\u002F\u002Fbabeljs.io\u002F\"\u003Ecan be found on Babel's site\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EThe future of ES\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EPersonally, I don't see the use of transpilers and polyfills going away. The problemset that the Internet poses to browsers is a challenging one. Each browser is \nbeing developed independent of each other and those developers have their own approaches to a problem.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EEven subtle behavioral differences, over the span of billions of webpages could have an impact.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EPlus, it's easier to define a behavior than it is to implement it, as we all know!\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ELiveScript, Javascript, ECMAScript, ES6, ES2015...\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe history of Javascript\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EBrief Overview\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe language we know as Javascript today started out as LiveScript.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIt then defined its standard API as \"ECMAScript\".\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EWe still use the term ECMAScript to represent the standard, but the language is colloquially known as Javascript.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EES5, ES6, and ESNext\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EES5 was written in 2009. It's adoption has been rather slow, with only most browsers catching up in 2012.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EES6 was released in 2015. Along with the release of ES6, the team responsible for defining these standards stated that it \nintends to release a new definition of the language yearly. Thus, ES2015 is interchangable with ES6.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EESNext is how they define the next iteration of the standard. ES2016 is currently being defined.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EES6 Modules\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(50).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(52).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(49).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(51).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(53).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EExport Syntax\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EExport statements are relatively straight forward.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYou can export a newly declared variable...\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eexport const MY_URL = 'https:\u002F\u002Fm3fawner.github.io\u002F';\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EYou can export \u003Cstrong\u003Edefault\u003C\u002Fstrong\u003E exports, which you'll see how to import later.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eexport default class {\n  ...\n};\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EYou can also mix the use of new variable declarations and defaults.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eexport default class {\n\n};\nexport const TEST = 'Hello World';\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EYou cannot, however, export pre-defined variables without aliasing them under\na new name.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst toExport = 'Test';\nexport toExport; \u002F\u002F Invalid\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EHistorical Reference\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EAccessing objects between files has been a particularly interesting problem. Until recently, the majority of \nweb applications used global objects.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis meant ensuring file load order, timing, and that objects are created sequencially in the script.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EBuild Tools\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EWith the introduction of build tools such as grunt &amp; gulp, this became easier to manage.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFiles could be loaded in order by using wild cards and injected in an automated fashion into the HTML.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIt was, however, imperfect. Wildcards could grab all javascript files from a source directory, but what if a \nfile needs to be loaded to construct an object first?\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis lead to spaghetti code being used to load a given set of files first, then another, then another. It tied you\nto a standard file name, which commonly reflected the framework you were using, tying you closely to that framework.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThere have been a few solutions (AMD, CommonJS) developed to modularize javascript, but until ES6 it was not widely used.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EImport Syntax\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ESimple Execution import\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ETo simply execute the imported script, importing the file location as follows will suffice.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eimport '..\u002Fdir\u002Ffile';\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThe paths are all relative to the file importing the module.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe file extension \u003Cstrong\u003Ejs\u003C\u002Fstrong\u003E can be ommitted in the import statement.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003ESince we are importing an object representation of an import, we can destructure the exports.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eimport { someExport } from '..\u002Fdir\u002Ffile';\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis will grab just the \u003Cstrong\u003EsomeExport\u003C\u002Fstrong\u003E export from the module.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIf destructuring is not used in the import statement, it will assign the default export to the variable.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eimport defaultExport from '..\u002Fdir\u002Ffile';\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EIf no default is defined, the \u003Cstrong\u003EdefaultExport\u003C\u002Fstrong\u003E variable will be set to undefined.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIf you want to access the full object, you can use \u003Cstrong\u003E*\u003C\u002Fstrong\u003E as your import. The object will be set to the variable\nfollowing \"as\" in that statement.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eimport * as Module from '..\u002Fdir\u002Ffile';\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EAll exports, including \u003Cstrong\u003Edefault\u003C\u002Fstrong\u003E, are available as properties of the \"Module\" object.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIn addition, if you would like to alias the imported variable name, you can destructure the object and use \u003Cstrong\u003Eas\u003C\u002Fstrong\u003E \nto alias.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eimport { test as TEST } from '..\u002Fdir\u002Ffile';\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThese statements can be mixed and matched.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eimport Test, { TestSupport } from '..\u002Fdir\u002Ftest';\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis assigns the default export to \"Test\", but also imports the exported \"TestSupport\" variable from the module.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EES6 Modules\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003ETo solve this, ES6 standards introduced \u003Cstrong\u003Emodules\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThey are called modules because they are isolated sections of code.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EEach module is wrapped in an \u003Cem\u003Eimmediately invoked function expression\u003C\u002Fem\u003E to ensure that there\nis no global object bleed.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EAt this point in time, no browser has native support of module loading.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EWe will be using Webpack and Babel to perform the transpiling needed to give us access to import &amp; export \nstatements.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EWhen importing a module, you are basically assigning an object representing the exported values of the module to a \nvariable.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIf a file does not export anything, it will assign undefined to the variable name.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EFiles will be exected on initial import, meaning if an object is not explicitly defined in the module, but instead constructed,\n that construction process will execute before assigning it to the variable in the import statement.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis means, if a file modifies global objects, or creates a global object, simply importing that file will generate those global\nobjects for use.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EModules with Webpack\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EFor the sake of our project, webpack handles the transpiling.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFrom my previous video, we discussed how to add \"root\" directories to our webpack configuration.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis allows us to eliminate unnecessarily duplicated paths, such as \u003Cstrong\u003Enode_modules\u003C\u002Fstrong\u003E for our \ndependencies and \u003Cstrong\u003Esrc\u003C\u002Fstrong\u003E for our source files.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eresolve: {\n  root: [\n    path.resolve('src'),\n    path.resolve('node_modules')\n  ]\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIn addition, we use aliases for those files that are not able to be imported because they are not properly\nconfigured in their package.json.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eresolve: {\n  root: [\n    path.resolve('src'),\n    path.resolve('node_modules')\n  ],\n  resolve: {\n    '.\u002F~reveal\u002F': 'reveal'\n  }\n}\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThe import \u003Cstrong\u003Eimport 'reveal';\u003C\u002Fstrong\u003E can now function.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003ENew Methods \u002F Misc. Syntax in ES6\u003C\u002Fh2\u003E\u003Cdiv class=\"fragment\"\u003E* But not all of it\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(58).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(56).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(55).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(57).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(59).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(60).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EArray Methods\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EFind\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EBasic Syntax:\narray.find(callback); \u002F\u002FCallback determines the criteria to match\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst array = [{\n    a: 42\n}, {\n    a: 55\n}];\nconsole.log(array.find((item) =\u003E item.a === 42)); \u002F\u002FOutputs the first element\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EIf there are more than one element matches in the collection, it will return the first instance of the match. Think of this like \nperforming an \"if matches, break\" in a for loop.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EFilter\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ESimilar to how find works, but returns a collection of all the matching elements.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst array = [2, 4, 5, 6];\narray.filter((item) =\u003E item % 2 === 0); \u002F\u002F [2, 4, 6]\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EArray.from\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EConverts an iterable object into an Array\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis is useful for accessing Array prototype methods on a collection that was not previously an Array type.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst divs = document.querySelectorAll('div');\ndivs.map((item) =\u003E item.id); \u002F\u002F Will not work, map is not on the NodeList prototype\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003Econst divs = Array.from(document.querySelectorAll('div'));\ndivs.map((item) =\u003E item.id); \u002F\u002F Works! Grabs all the IDs of the divs\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EMaps\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EBut wait...a map is a set of keys\u002Fvalues, right? Aren't Javascript Objects...keys...and values?\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EWell, yes...but...\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EMaps are better for mapping for these reasons\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cdiv\u003EMaps do not have a set of properties when you create a new instance. Objects do because they are a prototypical object.\u003C\u002Fdiv\u003E\u003Cpre\u003Econst obj = {};\nconsole.log(obj.toString); \u002F\u002F Outputs the function\nconst map = new Map();\nconsole.log(map.get('toString')); \u002F\u002F Undefined\nmap.set('toString', () =\u003E 'I\\'m a map!');\nconsole.log(map.get('toString')); \u002F\u002F I'm a map!\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cdiv\u003EKeys can be anything you want!\u003C\u002Fdiv\u003E\u003Cdiv class=\"fragment\"\u003ENaN? \u003C\u002Fdiv\u003E\u003Cspan class=\"fragment\"\u003EYes!\u003C\u002Fspan\u003E\u003Cdiv class=\"fragment\"\u003E1? \u003C\u002Fdiv\u003E\u003Cspan class=\"fragment\"\u003EYes!\u003C\u002Fspan\u003E\u003Cdiv class=\"fragment\"\u003EDo I have to use strings to represent those? \u003C\u002Fdiv\u003E\u003Cspan class=\"fragment\"\u003ENope!\u003C\u002Fspan\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cdiv\u003EMaps also have the ability to tell you how many elements have been inserted\u003C\u002Fdiv\u003E\u003Cpre\u003Econst map = new Map();\nmap.set('name', 'Evan Williams');\nconsole.log(map.size) \u002F\u002F 1\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cdiv\u003EMethods\u003C\u002Fdiv\u003E\u003Cdiv class=\"fragment\"\u003EThe methods that apply to Set also apply to Map, i.e. has, forEach, delete, clear.\u003C\u002Fdiv\u003E\u003Cdiv class=\"fragment\"\u003E\u003Cstrong\u003Eset\u003C\u002Fstrong\u003E is used to add to the map. Given a key and a value, it pushes the key\u002Fvalue pair to the map. It is then accessible via get at that key.\u003C\u002Fdiv\u003E\u003Cdiv class=\"fragment\"\u003E\u003Ca href=\"https:\u002F\u002Fdeveloper.mozilla.org\u002Fen-US\u002Fdocs\u002FWeb\u002FJavaScript\u002FReference\u002FGlobal_Objects\u002FMap\"\u003EFull API\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EObject.assign\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003E\u003Cstrong\u003EObject.assign\u003C\u002Fstrong\u003E is useful to assign multiple properties onto an object in an easier to read fashion.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EBasic concept: Merges right most objects onto their left object, joining properties when there is no overlap, and overriding when there \nis an overlap.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst toCopyA = {\n    a: 42\n  }, toCopyB = {\n    a: 63,\n    b: 42\n  };\nconst combined = Object.assign({ c: 42 }, toCopyB, toCopyA);\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EAll properties (a, b, c) are put onto the first object.\n It returns the reference to the leftmost object (in this case { \n   c: 42 \n}).\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EOk...but why is it \"easier to read?\"\u003C\u002Fh2\u003E\u003Cpre class=\"fragment\"\u003Efunction MyObject(a, b, c, d) {\n  this.a = a;\n  this.b = b;\n  this.c = c;\n  this.d = d;\n}\nMyObject.prototype.outputParams = function() {\n  console.log(this.a, this.b, this.c, this.d);\n}\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003Efunction MyObjectES6(a, b, c, d) {\n  Object.assign(this, {\n    a, b, c, d\n  });\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ESet\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EA set is a collection that contains unique elements.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EUniqueness is determined by reference for objects and values for primitives.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst set = new Set([1, 4, 5, 3, 1]);\nset.forEach((item) =\u003E console.log(item)); \u002F\u002F1, 4, 5, 3\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EMethods\u003C\u002Fh2\u003E\u003Cul class=\"fragment\"\u003E\u003Cli\u003E\u003Cstrong\u003Eadd\u003C\u002Fstrong\u003E - Adds an element to the Set, does not error if attempting to add duplicate value\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Cstrong\u003Eclear\u003C\u002Fstrong\u003E - Empties the set\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Cstrong\u003Edelete\u003C\u002Fstrong\u003E - Removes a given value\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Cstrong\u003EforEach\u003C\u002Fstrong\u003E - Iterates over the set, performing the callback for each element.\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Cstrong\u003Ehas\u003C\u002Fstrong\u003E - Whether or not a set contains a reference or value.\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Ca href=\"https:\u002F\u002Fdeveloper.mozilla.org\u002Fen-US\u002Fdocs\u002FWeb\u002FJavaScript\u002FReference\u002FGlobal_Objects\u002FSet\"\u003EFull API\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EstartsWith\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EIt's pretty self explanatory, whether or not a string starts with a string to match.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe second parameter can be used to give it an index to start at within the string. It defaults to 0.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econsole.log('Evan'.startsWith('E')); \u002F\u002F true\nconsole.log('Evan'.startsWith('B')); \u002F\u002F false\nconsole.log('Evan'.startsWith('E', 1)); \u002F\u002F false\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EendsWith\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe same as starts with, but in reverse!\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003Eincludes\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe same as startsWith, or endsWith, but applies to the full string.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhy are these handy?\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThese replace the need to use \"indexOf\" statements such as:\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econsole.log('Evan'.indexOf('E') === 0); \u002F\u002F starts with\nconsole.log('Evan'.indexOf('n') === 'Evan'.length - 1); \u002F\u002F ends with\nconsole.log('Evan'.indexOf('a') !== -1); \u002F\u002F includes\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis is nice because you don't have to remember what is returned when it's not found, or compare against the length of the string.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EThings I left off (and will not cover)\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EIterators &amp; Generators\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThese are ways of creating a custom iterable object.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Cem\u003EWhy didn't I cover it?\u003C\u002Fem\u003E I haven't found a use for it yet.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EUnicode, binary and octal literals\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ESupports full unicode, binary, and octal literals in source.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Cem\u003EWhy didn't I cover it?\u003C\u002Fem\u003E I'm an English only speaker and don't currently use unicode characters. Nor do I ever need to get low enough to use binary or octals!\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EProxies\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ETo be honest, I don't understand these. Check out the \u003Ca href=\"https:\u002F\u002Fgithub.com\u002Flukehoban\u002Fes6features#proxies\"\u003Elink here\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ESymbols\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThese are a new primitive type. They're an interchangable way of assigning properties to an object. You can use symbols as you can strings to access properties from\nan object.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ETail Calls\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThese have to do with recursive function calls. It aids in not overflowing the stack.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Cem\u003EWhy didn't I cover it?\u003C\u002Fem\u003E I fear recursive calls. I always end up infinite looping. Plus, in my day-to-day, I don't really encounter them much, so I'm no expert.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EDefault Parameters\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(62).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(63).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EBasic Syntax\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EAdding an \u003Cstrong\u003E=\u003C\u002Fstrong\u003E after a parameter in a function declaration will declare the default.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EDefault values are assigned to the parameter variable name if, and only if, \u003Cstrong\u003Eundefined\u003C\u002Fstrong\u003E is passed to that\nparameter.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction logParams(a = 5, b, c = {}) {\n  console.log(a, b, c);\n}\nlogParams(); \u002F\u002F 5, undefined, [object Object]\nlogParams(1, 1, 1); \u002F\u002F 1, 1, 1\nlogParams(null, null, null); \u002F\u002F null, null, null\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWith Destructuring\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EYou can declare a default parameter on a destructured parameter.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction greet({ name: name = 'Evan' }) {\n  console.log(`Hello, ${name}.`);\n}\ngreet({}); \u002F\u002F Hello, Evan.\ngreet({\n  name: 'Ellie'\n}); \u002F\u002F Hello, Ellie.\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EWhy use default parameters?\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EDefaults are useful when a use case has a clearly defined base level. For instance, a rating on a 1 to 10 scale\nshould be a number between 1-10.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction setRating(rating = 1) {\n  this.rating = rating;\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EAs a way of documentation\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EES6 is typeless, making it unknown to developers what is necessarily expected in a function call. Most code should make\nit obvious, but to a new developer, it may not be.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EBy defining a default parameter as, say, an empty string, you can notate the expected data type.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction logNumberString(str = '') {\n  console.log(Number.parseInt(str));\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EPrevent unexpected javascript errors\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EIn ES5, most developers would do a defined check on an argument prior to performing an operation.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EWith ES6 defaults, an undefined can be forced to be a defined value with the proper type for the function body.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction ES5Way(str) {\n  return (str || '').toUppercase();\n}\nfunction defaults(str = '') {\n  return str.toUppercase();\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EPromises\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(67).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(66).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(70).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(69).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(68).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(65).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EPromise.all\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003E\u003Cstrong\u003EPromise.all\u003C\u002Fstrong\u003E is used to manage multiple promises in one promise chain.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIt will wait until all promises have been resolved to perform the \u003Cstrong\u003Ethen\u003C\u002Fstrong\u003E callbacks.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIf even one promise fails, they all enter the reject portion of the promise chain.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EOnly the data from the first rejected promise is passed into the rejection handler.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Econst getPromise = (item) =\u003E new Promise((resolve, reject) =\u003E {\n  resolve(item);\n});\nconst promises = [1,2,3,4,5].map(getPromise);\nPromise.all(promises)\n  .then((data) =\u003E {\n    console.log(data);\n  });\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EBasic Syntax\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe Promise constructor takes a callback function to determine success and to perform the asynchronous \nfunction call. It is passed a resolve &amp; reject function to let the remainder of the code know if it was\nsuccessful.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Enew Promise((resolve, reject) =\u003E {\n  \u002F\u002F Body of promise to determine success\n});\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EResolve Function\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe resolve function is used to represent a successful operation. The first parameter passed to the resolve \nfunction gets sent to the success callback of the promise.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EReject Function\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe reject function is similar to that of the resolve. Instead of entering the successful callback, it performs the \nerror case.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EEmpty Promise Body\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EIf a promise never resolves or rejects, nothing in the promise lifecycle is executed other than the construction of \nthe object.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Enew Promise((resolve, reject) =\u003E {\n  \u002F\u002F Do nothing, for science.\n})\n.then(() =\u003E console.log('Resolve executed'), () =\u003E console.log('Reject executed'));\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EBasic Concept of a Promise\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EA promise is an expected result of an asynchronous operation.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe most common scenario for a promise is the eventual return of an HTTP call to a server.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe promise is the placeholder object that represents that operation.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EPromises allow for the application to continue processing and execute a predefined call back for\na succesful, or error, completion of that operation.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe promise is executed similar to that of a try\u002Fcatch\u002Ffinally block.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EProgrommatically Rejecting\u002FResolving in a then Block\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EWithin a then block, you can force the route of the resolution of the promise by returning either\nan already successfully resolved promise to the next then handler, or an already rejected promise.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis is done by returning a \u003Cstrong\u003EPromise.resolve()\u003C\u002Fstrong\u003E or a \u003Cstrong\u003EPromise.reject()\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Enew Promise((resolve, reject) =\u003E {\n  \u002F\u002F Resolve Logic\n})\n.then((data) =\u003E {\n  return data.isSuccessful ? Promise.resolve(data.name) : Promise.reject();\n})\n.then((name) =\u003E console.log(`Hello, ${name}`), () =\u003E console.log(`I don't know your name!`));\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EPromise Chaining\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThe \u003Cstrong\u003Ethen\u003C\u002Fstrong\u003E method returns another promise to the next function. Therefore, if there is a multi-step\nprocess to be performed based on the result, it can be split into multiple parts.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Enew Promise((resolve, reject) =\u003E {\n  \u002F\u002F Resolve logic\n})\n.then((data) =\u003E {\n  if (data.success) {\n    return data;\n  } else {\n    Promise.reject();\n  }\n})\n.then((data) =\u003E {\n  console.log(`Successfully resolved data: ${data}`);\n}, () =\u003E console.error('Failure occurred'));\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIt is also possible to return another promise within the \u003Cstrong\u003Ethen\u003C\u002Fstrong\u003E block of the promise. The next \u003Cstrong\u003Ethen\u003C\u002Fstrong\u003E \nof the chain will wait until that promise is resolved to continue the promise chain.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Enew Promise((resolve, reject) =\u003E {\n  resolve('Hello World');\n})\n.then((str) =\u003E {\n  console.log(str);\n  return new Promise((resolve, reject) =\u003E {\n    resolve(`It's nice to meet you.`);\n  });\n})\n.then((str) =\u003E console.log(str));\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003Ethen\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ETakes two parameters, a success callback and an error callback.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe first parameter is executed on success, the second on error.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003ENeither is necessarily required, but using them without any parameters will not perform anything on resolution\nof the promise.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst success = (data) =\u003E console.log(`Success! ${data}`),\n      error = (data) =\u003E console.log(`An error occurred: ${data}`);\nnew Promise((resolve, reject) =\u003E {\n  \u002F\u002F Resolve logic\n})\n.then(success, error);\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003Efinally\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EFinally is performed after the promise has gone through the full chain of resolve functions. It is executed\nregardless of success or failure.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis is handy for setting up objects that need to exist regardless of the state of the promise or for cleaning\nup resources that may have been created during the promise.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EVariable Declaration and Destructuring in ES6\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(7).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(72).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(77).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(74).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(73).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(76).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(75).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EVariable Declarations\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003Evar\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003Evar\u003C\u002Fcode\u003E should no longer be used\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction variableHoisting() {\n    for(var i = 0; i \u003C 10; i++) {\n        console.log(i);\n    }\n    console.log(i); \u002F\u002Fi is defined here, still!\n}\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EVariable hoisting was a strange behavior and most developers were unaware of its existance\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003Elet\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EBehaves how one would expect \u003Ccode\u003Evar\u003C\u002Fcode\u003E to behave. This is to be used for mutable variables.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003Econst\u003C\u002Fh2\u003E\u003Cp\u003E\u003Ccode\u003Econst\u003C\u002Fcode\u003E is short for constant. These are immutable varaibles, ones that are not intended to change value (or reference).\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYou can declare an object a const, yet still modify its properties. This is because you aren't changing the object's reference,\nbut just the properties of the object.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst testObject = {};\ntestObject.value = 42;\ntestObject = {}; \u002F\u002FESLint Error\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EObject Destructuring\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EDestructuring an object is breaking down an object and assigning properties of the object to variables.\u003C\u002Fp\u003E\u003Cdiv class=\"fragment\"\u003E\u003Cp\u003EBasic syntax\u003C\u002Fp\u003E\u003Cpre\u003Econst { toAssignTo } = {\n  toAssignTo: 42\n};\u003C\u002Fpre\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EMultiple Variable Declarations\u003C\u002Fh2\u003E\u003Cpre\u003Econst { valueA, valueB, valueD } = {\n  valueA: 42,\n  valueB: 63,\n  valueC: 85\n};\nconsole.log(valueA, valueB, valueD); \u002F\u002F 42, 63, undefined\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis also works on object references.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ETranspiled ES5\u003C\u002Fh2\u003E\u003Cpre\u003Evar objectReference = {\n  valueA: 42,\n  valueB: 63,\n  valueC: 85\n};\nvar valueA = objectReference.valueA;\nvar valueB = objectReference.valueB;\nvar valueD = objectReference.valueD;\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EParameter Destructuring\u003C\u002Fh2\u003E\u003Cpre class=\"fragment\"\u003Econst person = {\n  name: 'Evan Williams',\n  occupation: 'Project Engineer',\n  twitterHandle: '@angular_evan'\n};\nfunction getCapitalizedName({ name }) {\n  return name.toUpperCase();\n}\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003Efunction getCapitalizedName(obj) {\n  var name = obj.name;\n  return name.toUpperCase();\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EArray (iterable object) Destructuring\u003C\u002Fh2\u003E\u003Cpre class=\"fragment\"\u003Econst [first, second, third] = [1, 2, 3];\nconsole.log(first, second, third); \u002F\u002F1, 2, 3\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EYou can skip over assigning elements in the array by putting two commas in a row (or emitting the first variable name). You also don't have to match the length of the array.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction outputEveryOtherArgument(first, second, third, fourth, fifth) {\n  const [ , b, , d] = arguments;\n  console.log(b, d);\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ESimplified Object Declaration\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIf variable names match the name of the property on an object, the need for a key\u002Fvalue pair is eliminated.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EOne can simply express the pair as a single property.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Econst someVariable = 'Test';\nconst obj = {\n  someVariable\n};\nconsole.log(obj);\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E{\n  someVariable: 'Test'\n}\u003C\u002Fpre\u003E\u003Cdiv class=\"fragment\"\u003E\u003Cp\u003EES5 equivalent:\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Evar someVariable = 'Test';\nvar obj = {\n  someVariable: someVariable\n};\u003C\u002Fpre\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ERest Parameters\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThis is the same syntax as spread operators, but performs the reverse operation.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIt will condense the remainder of a collection into a single variable.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EBasic Syntax\u003C\u002Fh2\u003E\u003Cpre class=\"fragment\"\u003Efunction multiplyBy(multiplier, ...values) {\n  const result = [];\n  for(let i = 0; i \u003C values.length; i++) result.push(values[i] * multiplier); \u002F\u002F Array.prototype.map will be covered in another video :)\n  return result;\n}\nmultiplyBy(5, 1, 2, 3, 4, 5); \u002F\u002F [5, 10, 15, 20, 25];\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ESpread Operator\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EBasic Syntax\u003C\u002Fh2\u003E\u003Cpre class=\"fragment\"\u003Econst first5 = [1, 2, 3, 4, 5];\nconst next5 = [6, 7, 8, 9, 10];\nconst all10 = [...first5, ...next5];\nconsole.log(all10); \u002F\u002F 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EUsed with \u003Ccode\u003Epush\u003C\u002Fcode\u003E\u003C\u002Fh2\u003E\u003Cpre class=\"fragment\"\u003Econst blank = [];\nconst toCopy = [1, 2, 3, 4, 5];\nblank.push(...toCopy); \u002F\u002F blank.push(1, 2, 3, 4, 5);\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ETemplate Strings\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Econst aVariable = 'test';\nlet string = 'Some String: ' + aVariable + '.';\nstring += '\\n Another string added on a new line';\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EDoes this mess look familiar?\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EEnter Template Strings!\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch4\u003EBasic Notation\u003C\u002Fh4\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003E`\u003C\u002Fcode\u003E (backticks) are used to denote a template string.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003E${ someVariable }\u003C\u002Fcode\u003E Represents interpolating the someVariable variable into the string.\nNote: These are javascript expressions. Variables, as well as other javascript (such as ternary operators) are valid.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFormatting is maintained in a tempalte string. If you add a new line, and your IDE indents that new line, those indentations\nwill be in your compiled string.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Econst aVariable = 'test';\nconst string = `Some String: ${aVariable}.\nAnother string added on a new line.`;\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis is useful if your javascript framework uses inline HTML declarations (e.x. React, Angular)\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eexport default {\n  template: `&lt;div&gt;\n                &lt;strong&gtHello World!&lt;\u002Fstrong&gt\n             &lt;\u002Fdiv&gt;`,\n};\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EHello, world!\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(82).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(79).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(80).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(81).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EAngular Experience\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EDeveloped 7 applications\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E2 external applications (50,000 users)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E3 years of full time experience\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EParticipate in UI Best Practices group, determining direction of UI development\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ETeaching Experience\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003ETaught Angular training, replacing a vendor trainer\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EES6 syntax\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ESASS\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EWebpack\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EJade (now Pug)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003Eand many more!\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EWhat will you learn watching my videos?*\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EWeb Development process (tools, debugging, frameworks, ES6)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EAngular, most importantly\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EAngular best practices\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ESASS (responsive design using Foundation)\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003Ch6 class=\"fragment\"\u003E* Topics are subject to change, I like to go on tangents!\u003C\u002Fh6\u003E\u003Ch6 class=\"fragment\"\u003E** I currently do not have a schedule or order laid out, either\u003C\u002Fh6\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection class=\"who-am-i\"\u003E\u003Csection\u003E\u003Ch1\u003EWho am I?\u003C\u002Fh1\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch3\u003EEvan Williams\u003C\u002Fh3\u003E\u003C\u002Fsection\u003E\u003Csection data-markdown\u003E\u003Ch3\u003EProgramming since 6th grade\u003C\u002Fh3\u003E\u003Cpre\u003Eif(location == 'home') {\n  if(directionChosen == 'north') {\n    print('You see a wild hog appear');\n  }\n  if(directionChosen == 'south') {\n    print('You enter the town square, only to be robbed blind!');\n  }\n  if(directionChosen == 'east') {\n    print('You see your home off in the distance');\n    if(directionChosen == 'east') {\n      print('You reach your doorstep');\n    }\n  }\n}\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch3\u003EGraduate of Iowa State University\u003C\u002Fh3\u003E\u003Cimg id=\"camponile\" src=\"assets\u002Fhello-world\u002Fcamponile.jpg\"\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch3\u003EWork History\u003C\u002Fh3\u003E\u003Ch4 class=\"fragment\"\u003EMcDonalds!\u003C\u002Fh4\u003E\u003Ch4 class=\"fragment\"\u003EIntern at Fortune 500 insurance company\u003C\u002Fh4\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EWrote Java 1.5\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EREST end point for Document Storage\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EAutomated testing\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch3\u003ECurrent Position\u003C\u002Fh3\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EWrote Java JMS services\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EBuilt a Wicket website for said services\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EMoved on to write a customer portal in Liferay using jQuery\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EBegan work on Angular applications\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002Fhello-world\u002Fme_1.jpg\"\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002Fhello-world\u002Fme_2.jpg\"\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002Fhello-world\u002Fme_3.jpg\"\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EPug\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(91).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(89).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(95).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(85).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(90).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(87).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(88).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(94).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(84).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(92).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(86).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(93).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(96).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (bananas) {pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EConditionals and Cases\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EConditionals\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003Eif \u002F else if \u002F else can be used, using Javascript to modify templates dynamically.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EVariables can be used by defining them with the \u003Cstrong\u003E- var test = 'Something';\u003C\u002Fstrong\u003E notation. They can also be\npassed into mixins.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003E- var useFirst = true\nif useFirst\n  span If useFirst is true, this will be used.\nelse\n  span Otherwise, this will.\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ECases\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ECases are switch functions based on a given input.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Emixin show-bananas(bananas)\n  case bananas\n    when 0\n      span You have no bananas.\n    when 1\n      span You have a banana.\n    default\n      span You have " + (pug.escape(null == (pug_interp = bananas) ? "" : pug_interp)) + " bananas.\n+show-bananas(0)\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E" + (pug.escape(null == (pug_interp = '<span>You have no bananas</span>') ? "" : pug_interp)) + "\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";}.call(this,"bananas" in locals_for_with?locals_for_with.bananas:typeof bananas!=="undefined"?bananas:undefined));;return pug_html;};
	module.exports = template;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EDefining Elements\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EElements\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EElements are declared by providing the tag name.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Ediv\n  span\n    section\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E&lt;div&gt;\n  &lt;span&gt;\n    &lt;section&gt;\n    &lt;\u002Fsection&gt;\n  &lt;\u002Fspan&gt;\n&lt;\u002Fdiv&gt;\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EClass Notation\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EYou can also use .class-name to add a class to an element.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Espan.bold\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E&lt;span class=\"bold\"&gt;&lt;\u002Fspan&gt;\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EIf you have a div with classes on it, you can actually drop the div tag and just use \u003Cstrong\u003E.class-name\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003E.class-name\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E" + (pug.escape(null == (pug_interp = '<div class="class-name"></div>') ? "" : pug_interp)) + "\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EIDs\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EIDs can be defined on an element using CSS selectors, as you would with class names.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003E#some-id\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E" + (pug.escape(null == (pug_interp = '<div id="some-id"></div>') ? "" : pug_interp)) + "\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EAttributes\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EAttributes are declared basically as you would in HTML, but instead using parenthesis.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003E" + (pug.escape(null == (pug_interp = 'p(my-attr="test") Hello, Evan') ? "" : pug_interp)) + "\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E" + (pug.escape(null == (pug_interp = '<p my-attr="test"> Hello, Evan</p>') ? "" : pug_interp)) + "\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EAny number of attributes can be added, separated by a space or a comma.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EFilters\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EFilters are used to take a given set of code and transpile it into HTML.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis allows for the transpiling of many languages included SASS, CoffeeScript, Babel, and Markdown.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EWe'll show how to add Markdown transpiling to your app here.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Enpm install --save-dev jstransformer-markdown-it\u003C\u002Fpre\u003E\u003Cpre\u003E\u002F\u002F index.pug\n:markdown-it()\n  ### Header\n  [Test](https:\u002F\u002Fwww.youtube.com\u002Fuser\u002Fm3fawner)\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThat's all it takes!\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EI personally only use markdown filters, because it is easier to do embedded Javascript notation and \nHTML for these slides.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EIncluding Templates\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIncluding templates allows for amazing reuse. It's the reason I fell in love with Pug.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EInclude also works to include Pug files containing mixins, allowing for the reuse of those\nmixins, as well.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFile paths are relative to the pug file, so prepare to use ..\u002F a lot\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Einclude ..\u002Fmixins\u002Fprofile.pug\n\u002F\u002F Using the profile mixin from the profile.pug file\n+profile('Evan Williams')\np.\n  Some Text\ninclude ..\u002Ftemplates\u002Fcontact-me.pug\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EInheritence\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EInheritence is as you would expect for any object oriented language.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EStating that a given HTML element extends a template will pull in the content of that file.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThere are customizable chunks of the template called \u003Cstrong\u003Eblocks\u003C\u002Fstrong\u003E that the implementing template\ncan modify\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Emy-parent-template\n  p.common.\n    This is common to every template that implements this.\n  block specific-details\n  p.common.\n    You can even surround blocks with other elements and have multiple blocks.\n  block additional-details\n  block optional-block\u003C\u002Fpre\u003E\u003Cpre\u003Emy-child-template\n  extends ..\u002Ftemplates\u002Fmy-parent-template.pug\n    block specific-details\n      p My name is Evan Williams\n    block additional-details\n      p I prefer Pug over HTML!\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EInstalling Pug\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EWe'll be adding pug to our NPM dependencies, as well as its loader.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Enpm install --save-dev pug pug-lint pug-loader\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EI've installed pug-lint, but this is optional. I use it in tandem with my VSCode plugin for pug-linting.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003ENow we'll have to tell webpack to register the pug loader for all \u003Cstrong\u003E.pug\u003C\u002Fstrong\u003E extensions.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eloaders: [\n  {\n    test: \u002F\\.pug$\u002F,\n    loader: 'pug'\n  }\n]\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EPug can now be imported into javascript files via import statements.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EInterpolation\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003ESimilar to template strings, interpolation can be done in Pug.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Ep #{name}, you rock!\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EWhen rendering the template above with a contextual object containing a property \u003Cstrong\u003Ename\u003C\u002Fstrong\u003E, \nit will render as the name you chose, you rock.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Eimport YouRockTemplate from '.\u002Fyou-rock.pug';\nconsole.log(YouRockTemplate({\n  name: 'Evan'\n})); \u002F\u002F Evan, you rock!\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis is quite useful for conditionals and iterations, which we will discuss later.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EIntroduction to Pug\u003C\u002Fh2\u003E\u003Cimg src=\"assets\u002Fpug.svg\" style=\"max-height: 400px !important\"\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EPug is a HTML-like language. It represents HTML tags, but uses a different syntax and a \nwebpack loader to transpile it into HTML.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe main features of Pug are CSS selector element definitions, file includes, mixins, expressions, \nextensibility...etc.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EPug used to be called \"Jade\" until it got sued for naming rights. It renamed itself to Pug, but the two\nnames are pretty synonomous at this point.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThe full API can be found at \u003Ca href=\"https:\u002F\u002Fpugjs.org\"\u003Epugjs.org\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (names) {pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EIteration\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EIteration can be done over an array in order to output many of a given template.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EAs you'll see in the \u003Cstrong\u003EUsing Pug\u003C\u002Fstrong\u003E slide, you'll be able to render the template with\nan object representing the context, in which you can include an array.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003Eh4 Hello to my following subscribers!\nul\n  each item in names\n    li item\u003C\u002Fpre\u003E\u003Ch4\u003EHello to my following subscribers!\u003C\u002Fh4\u003E\u003Cul\u003E";
	// iterate names
	;(function(){
	  var $$obj = names;
	  if ('number' == typeof $$obj.length) {
	      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
	        var item = $$obj[pug_index0];
	pug_html = pug_html + "\u003Cli\u003E" + (pug.escape(null == (pug_interp = item) ? "" : pug_interp)) + "  \u003C\u002Fli\u003E";
	      }
	  } else {
	    var $$l = 0;
	    for (var pug_index0 in $$obj) {
	      $$l++;
	      var item = $$obj[pug_index0];
	pug_html = pug_html + "\u003Cli\u003E" + (pug.escape(null == (pug_interp = item) ? "" : pug_interp)) + "  \u003C\u002Fli\u003E";
	    }
	  }
	}).call(this);
	
	pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";}.call(this,"names" in locals_for_with?locals_for_with.names:typeof names!=="undefined"?names:undefined));;return pug_html;};
	module.exports = template;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EMisc. Features\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ECode\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EYou can imbed code using \u003Cstrong\u003E=\u003C\u002Fstrong\u003E. I will say, it is a bit finicky.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Ep\n  = '&lt;div&gt;This is some HTML, but as code&lt;\u002Fdiv&gt;'\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EYou'll have to surround the code in a single quote.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIf the syntax is incorrect, I've noticed that the pug-loader dies and will have to be restarted.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EInline Tags\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThere are common cases where you will want to use HTML tags to highlight a piece of text.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFor that, you can use inline tag declarations to keep your text formatted rather well in your source code.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Ep This is #[strong some really important] text.\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis will compile down to make \u003Cstrong\u003Esome really important\u003C\u002Fstrong\u003E bold. In fact, that's in this slide's code!\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EComments\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EComments in Pug are notated similar to javascript.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Ep Hello, world \u002F\u002F Cliche and overused, I know\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003Ep Hello, world \u002F\u002F- This does not get added as an HTML comment.\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003Ep Hello, world\n\u002F\u002F\n  Block comments can be\n  stated like this.\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EPiping\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EPiping is allowing the text to be on a new line or multiple lines without\ncreating additional elements.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Ep.\n  Some text inside the p element.\np\n  | This is also inside the p element.\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EMixins\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EMixins are a way to create dynamic templates.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThey are basically function calls with a set of parameters that implementing templates\ncan use to change the behavior of the mixin.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIt's also a convenient way to group several like templates into one file and being able to choose\nwhich portions of that file you'd like to use.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EMixins must be defined prior to usage.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003E\u002F\u002F Defining the mixin\nmixin profile(name, age)\n  span Hello, #{name}!\n  span I hear you're #{age}...that is \n  if age \u003E 20\n    span old!\n  else\n    span young!\n\u002F\u002F Using the mixin\n+profile('Evan', 27)\u003C\u002Fpre\u003E\u003Cpre class=\"fragment\"\u003E" + (pug.escape(null == (pug_interp = '<span>Hello, Evan</span>') ? "" : pug_interp)) + (pug.escape(null == (pug_interp = '<span>I hear you\'re 27...that is</span>') ? "" : pug_interp)) + (pug.escape(null == (pug_interp = '<span>old</span>') ? "" : pug_interp)) + "\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EBasic Syntax\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThe basic syntax is very similar to that of HTML.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThere is no need for closing tags.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003ECSS selectors are used to define the elements.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003ENesting elements is performed by indenting an element declaration on the next line.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EUsing Pug\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EOnce you've defined your pug file, you can import it as you would a javascript module.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYou'll want to include the file extension, both because it's required &amp; for clarity's sake.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThe imported function represents the callback to render the pug template into an HTML string.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EYou can provide it with a contextual object for interpolation.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003E\u002F\u002Ftest.pug\np Hello, #{name}\n\u002F\u002FJS\nimport Test from '.\u002Ftest.pug';\nconst testHTML = Test({\n  name: 'Evan'\n});\nconsole.log(testHTML); \u002F\u002F &lt;p&gt; Hello, Evan &lt;\u002Fp&gt;\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003ENote: If you have included files, the context still is applicable to all included templates, as well.\nYou don't have to worry about passing the right variables through to the child templates.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EWe will be using this in order to define our templates for components.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EAngular, and other frameworks, allows for the inlining of HTML during the declaration of components.    \u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003ESoftware Being Used\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(98).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(99).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(100).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ENodeJS\u003C\u002Fh2\u003E\u003Ca href=\"https:\u002F\u002Fnodejs.org\u002Fen\u002F\" target=\"_blank\"\u003E\u003Cimg src=\"assets\u002Fsoftware\u002Fnodejs-new-white-pantone.png\"\u003E\u003C\u002Fa\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhat is NodeJS?\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003ECross platform runtime environment (think JVM)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EDeveloped for writing server-side applications\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EModules are written in Javascript\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhy are we using it?\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EModules written on node allow for significantly different development cycle\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EAble to write applications in Javascript\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EWhen we start working with data calls, we'll utilize a NodeJS backend for ease of development\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EInstallation\u003C\u002Fh2\u003E\u003Col\u003E\u003Cli class=\"fragment\"\u003EDownload &amp; Install\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EEnsure you add it to your PATH variable\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EVerify installation using \u003Ccode\u003Enode --version\u003C\u002Fcode\u003E in a command window\u003C\u002Fli\u003E\u003C\u002Fol\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ENPM\u003C\u002Fh2\u003E\u003Ca href=\"https:\u002F\u002Fnpmjs.com\"\u003E\u003Cimg src=\"assets\u002Fsoftware\u002Fnpm.png\"\u003E\u003C\u002Fa\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhat is NPM?\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EPackage Manager for Javascript\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ESimilar to the concept of Maven in Java\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EInstalls dependencies that will help build applications, as well as develop them\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhy are we using it?\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EA great way to manage dependencies\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EAll dependencies can be explicitly declared &amp; managed by NPM\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EMany of our build tools would be extremely difficult to manage without it\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EInstallation Verification\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ENPM is a default script included in NodeJS\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Ccode\u003Enpm --version\u003C\u002Fcode\u003E should respond with x.x.x version (currently 3.7.2)\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EVS Code\u003C\u002Fh2\u003E\u003Ca href=\"https:\u002F\u002Fcode.visualstudio.com\u002F\"\u003E\u003Cimg src=\"assets\u002Fsoftware\u002Fvscode.png\"\u003E\u003C\u002Fa\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhat is VS Code?\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EVisual Studios Code, Microsoft open source project\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EIDE for software development\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EProvides GIT interactions, third party plugins, auto complete etc.\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhy are we using it?\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EIt's free\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EIt has all the features of a good web IDE\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EInstallation\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EDownload &amp; install on your machine\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EOpen the application\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EHit \u003Ccode\u003ECtrl + `\u003C\u002Fcode\u003E to open a command prompt inside the application\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EYou should be able to verify NPM &amp; NodeJS are both accessible\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EExtensions Being Used\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EESLint\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EDracula Syntax Theme\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003Epuglint\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EDebugger For Chrome\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"reveal\"\u003E\u003Cdiv class=\"slides\"\u003E\u003Csection\u003E\u003Csection\u003E\u003Cimg src=\"assets\u002FFull Logo.png\"\u003E\u003Ch2\u003EWebpack\u003C\u002Fh2\u003E\u003Ch6 class=\"fragment\"\u003Eand all its glory\u003C\u002Fh6\u003E\u003Ch6 class=\"fragment\"\u003E...and its confusion\u003C\u002Fh6\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E" + (null == (pug_interp = __webpack_require__(103).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(104).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(106).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(107).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(105).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(108).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(102).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(109).call(this, locals)) ? "" : pug_interp) + (null == (pug_interp = __webpack_require__(3).call(this, locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EHow to install webpack\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003ENPM\u003C\u002Fh2\u003E\u003Cp\u003EExecute the command \u003Ccode\u003Enpm install -g --save-dev webpack\u003C\u002Fcode\u003E.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThat's it. Remember, though, we want to \u003Ccode\u003E--save-dev\u003C\u002Fcode\u003E to ensure we note that \nwe are requiring that dependency for development purposes.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EAlso note the \u003Ccode\u003E-g\u003C\u002Fcode\u003E. The webpack NPM module comes with an executable bat script that \nwill interface with your filesystem natively.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIf you execute \u003Ccode\u003Ewebpack\u003C\u002Fcode\u003E in your directory, you should see it output the usage information.\nWe'll expand on how to configure webpack in the next video.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EWhat is Webpack?\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003E1000 foot view\u003C\u002Fh2\u003E\u003Cimg id=\"webpack-logo-1000ft\" src=\"assets\u002Fwebpack\u002Fwebpack-logo.jpg\"\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EWebpack is a module bundler for Javascript applications. It is an NPM module that we will be utilizing \nfor our development.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EUsing loaders, processors, and plugins, it makes developing a complex application \nmuch simpler than it would be to manage global scoping and file load order.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EPreviously, we had to load files in the proper order to ensure that global objects were \navailable to the scripts following a given script.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFor instance, if we're attemping to declare an \u003Ccode\u003Eangular.module\u003C\u002Fcode\u003E in file A, and angular is \nloaded second as file B, angular will not be defined when file A is executed.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EPrevious solutions included means of managing file loading order by a term called \u003Cstrong\u003Eblobs\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThese blobs were expressions that would match a given set of file patterns. They could then be loaded \nin the proper order. The problem is, certain blobs tie you to the framework you've chosen (for instance,\nwe named angular module declarations \u003Cem\u003Emy-component.module.js\u003C\u002Fem\u003E).\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EEnter Webpack\u003C\u002Fh2\u003E\u003Ch6\u003E100 foot view\u003C\u002Fh6\u003E\u003Cimg id=\"webpack-logo-100ft\" src=\"assets\u002Fwebpack\u002Fwebpack-logo.jpg\"\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003ETo eliminate the messiness of the blobs, webpack allows for the use of ES6 modules.\u003C\u002Fp\u003E\u003Cp\u003EThese import &amp; export statements allow for the proper ordering of files (and makes for a much more\n easily understood application!)\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EBut wait!\u003C\u002Fh2\u003E\u003Ch2 class=\"fragment\"\u003EThere's more!\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EWebpack also handles the following:\u003C\u002Fp\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EStylings (css, sass, less etc.)\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EImage loading\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ETranspiling\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ESource Mapping\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EFile copying &amp; Manipulation\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EHosting Content\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ELoaders\u003C\u002Fh2\u003E\u003Cimg src=\"assets\u002Fwebpack\u002Floading.gif\"\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EWhat is a loader?\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EA loader is a set of code that transforms a given source file in your application.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThey run in the Node environment and are typically installed via NPM.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003ELoaders can be chained together to perform multiple transformations before being bundled into the application.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Cem\u003ENote:\u003C\u002Fem\u003E When installing loaders, they will typically be named something-\u003Cem\u003Eloader\u003C\u002Fem\u003E. The \u003Cem\u003Eloader\u003C\u002Fem\u003E portion is \ndropped when interacting with the loader.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EExamples of Loaders\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003EBabel - Used to transpile ES6 into ES5.\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003ECSS - Allows for the importing of CSS, which then gets appended to the head of your index page\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EFile - Copies over files from a given directory into the distribution directory\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003EPug - Allows for the use of the Pug language\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EAnatomy of a Loader Configuration\u003C\u002Fh2\u003E\u003Cul\u003E\u003Cli class=\"fragment\"\u003E\u003Cstrong\u003Etest\u003C\u002Fstrong\u003E - The regular expression used to identify the file\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Cstrong\u003Eloader\u003C\u002Fstrong\u003E - The loader string representing what loader to perform\u003C\u002Fli\u003E\u003Cli class=\"fragment\"\u003E\u003Cstrong\u003Eloaders\u003C\u002Fstrong\u003E - A collection of loader string declarations. Performed in order of declaration\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EA loader string\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EA loader string can be simply the name of the loader.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIt can also take query parameters. These query parameters modify the behavior of a given loader.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EExamples\u003C\u002Fh2\u003E\u003Cpre\u003E{\n   test: \u002F\\.pug$\u002F,\n   loader: 'pug'\n },\n {\n   test: \u002F\\.(es6|js)$\u002F,\n   exclude: \u002Fnode_modules\u002F,\n   loaders: [\n     'babel'\n   ]\n },\n {\n   test: \u002F\\.(eot|svg|ttf|woff|woff2)$\u002F,\n   loader: 'file?name=public\u002Ffonts\u002F[name].[ext]'\n }\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EOutput\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cpre\u003E{\n  path: path.resolve(__dirname, 'dist'),\n  filename: 'bundle.js'\n}\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EPath indicates the output directory.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Cstrong\u003E__dirname\u003C\u002Fstrong\u003E represents a NodeJS variable that stores the current directory in which the script is executing.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003E\u003Cstrong\u003Epath\u003C\u002Fstrong\u003E is another NPM module used to do path manipulation. Here, we are telling it to resolve the \"dist\" directory of our current directory.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EIt will create the necessary folder if it does not exist.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EFinally, the filename is the output bundle from the webpack build process. We will call it \"bundle.js\" for now.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EPlugins\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EA plugin is extremely similar to that of a loader. The difference is, a plugin applies to the bundled application, \nand not a particular file type. It can also listen into the build process of webpack.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003ESetting up plugins is much easier. You simply create a new instance of the plugin and configure it as you'd like, adding it \nto the plugins collection of the configuration (more on this in the next video).\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EExamples of Plugins\u003C\u002Fh2\u003E\u003Cpre\u003Eplugins: [new HtmlWebpackPlugin({\n  title: 'Evan Williams AngularJS Tutorial Site',\n  template: 'src\u002Findex.pug'\n}), new CopyWebpackPlugin([{\n  from: '.\u002Fassets',\n  to: '.\u002Fassets\u002F'\n}]), new webpack.optimize.OccurrenceOrderPlugin(), new webpack.HotModuleReplacementPlugin()]\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EResolve object\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Cp\u003EThe resolve object handles file names within your application. If you're attempting to import a file that is extremely \nlong, or you import many files from a directory, you can use this object to make that easier.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003Eroot\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EThe root collection tells webpack to look for file names in a given set of directories. This is useful when you import many \nfiles from a directory.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Eroot: [\n  path.resolve('.\u002Fsrc'),\n  path.resolve('.\u002Fnode_modules')\n]\u003C\u002Fpre\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003Ealias\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EAliases are for mapping a given import statement to a specific file location. This is useful for projects that don't have a \u003Ccode\u003Emain\u003C\u002Fcode\u003E property \nin their package.json file. Webpack attempts to load the main file described in the package.json for a given directory name. If it doesn't find it, \nyou'll get a \u003Cstrong\u003Emodule not found\u003C\u002Fstrong\u003E error.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003ESourcemaps\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EOverview\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003EA source map, generally speaking, is a way to take a transpiled code base, and display the source that produced it.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EThis can apply to more than just our Javascript, such as SASS and other transpiled code.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EImportance of Sourcemaps\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003ESourcemaps are important because you'll want to debug your source, not your transpiled code.\u003C\u002Fp\u003E\u003Cpre class=\"fragment\"\u003Efunction(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}},function(e,t){}]);\u003C\u002Fpre\u003E\u003Cp class=\"fragment\"\u003EThis is extremely important with transpiled code, as Babel and all the other webpack processes will modify your code to a completely unreadable state.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ch2\u003EImplementing Sourcemaps in webpack\u003C\u002Fh2\u003E\u003Cp class=\"fragment\"\u003E\u003Cstrong\u003Edevtool\u003C\u002Fstrong\u003E property is what you will want to set in your webpack configuration.\u003C\u002Fp\u003E\u003Cp class=\"fragment\"\u003EI personally use \"source-map\" as my devtool, as it provides the greatest functionality, and my application is currently jokingly small.\u003C\u002Fp\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(1);
	
	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E\u003Csection\u003E\u003Ch2\u003EWrap-Up\u003C\u002Fh2\u003E\u003C\u002Fsection\u003E\u003Csection\u003E\u003Ca href=\"https:\u002F\u002Fwebpack.github.io\u002Fdocs\u002Fconfiguration.html\"\u003EMore information on Webpack Configurations\u003C\u002Fa\u003E\u003C\u002Fsection\u003E\u003C\u002Fsection\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 110 */
/***/ function(module, exports) {

	/*!
	 * reveal.js
	 * http://lab.hakim.se/reveal-js
	 * MIT licensed
	 *
	 * Copyright (C) 2013 Hakim El Hattab, http://hakim.se
	 */
	var Reveal = (function(){
	
		'use strict';
	
		var SLIDES_SELECTOR = '.reveal .slides section',
			HORIZONTAL_SLIDES_SELECTOR = '.reveal .slides>section',
			VERTICAL_SLIDES_SELECTOR = '.reveal .slides>section.present>section',
			HOME_SLIDE_SELECTOR = '.reveal .slides>section:first-of-type',
	
			// Configurations defaults, can be overridden at initialization time
			config = {
	
				// The "normal" size of the presentation, aspect ratio will be preserved
				// when the presentation is scaled to fit different resolutions
				width: 960,
				height: 700,
	
				// Factor of the display size that should remain empty around the content
				margin: 0.1,
	
				// Bounds for smallest/largest possible scale to apply to content
				minScale: 0.2,
				maxScale: 1.0,
	
				// Display controls in the bottom right corner
				controls: true,
	
				// Display a presentation progress bar
				progress: true,
	
				// Display the page number of the current slide
				slideNumber: false,
	
				// Push each slide change to the browser history
				history: false,
	
				// Enable keyboard shortcuts for navigation
				keyboard: true,
	
				// Enable the slide overview mode
				overview: true,
	
				// Vertical centering of slides
				center: true,
	
				// Enables touch navigation on devices with touch input
				touch: true,
	
				// Loop the presentation
				loop: false,
	
				// Change the presentation direction to be RTL
				rtl: false,
	
				// Turns fragments on and off globally
				fragments: true,
	
				// Flags if the presentation is running in an embedded mode,
				// i.e. contained within a limited portion of the screen
				embedded: false,
	
				// Number of milliseconds between automatically proceeding to the
				// next slide, disabled when set to 0, this value can be overwritten
				// by using a data-autoslide attribute on your slides
				autoSlide: 0,
	
				// Stop auto-sliding after user input
				autoSlideStoppable: true,
	
				// Enable slide navigation via mouse wheel
				mouseWheel: false,
	
				// Apply a 3D roll to links on hover
				rollingLinks: false,
	
				// Hides the address bar on mobile devices
				hideAddressBar: true,
	
				// Opens links in an iframe preview overlay
				previewLinks: false,
	
				// Focuses body when page changes visiblity to ensure keyboard shortcuts work
				focusBodyOnPageVisiblityChange: true,
	
				// Theme (see /css/theme)
				theme: null,
	
				// Transition style
				transition: 'default', // default/cube/page/concave/zoom/linear/fade/none
	
				// Transition speed
				transitionSpeed: 'default', // default/fast/slow
	
				// Transition style for full page slide backgrounds
				backgroundTransition: 'default', // default/linear/none
	
				// Parallax background image
				parallaxBackgroundImage: '', // CSS syntax, e.g. "a.jpg"
	
				// Parallax background size
				parallaxBackgroundSize: '', // CSS syntax, e.g. "3000px 2000px"
	
				// Number of slides away from the current that are visible
				viewDistance: 3,
	
				// Script dependencies to load
				dependencies: []
	
			},
	
			// Flags if reveal.js is loaded (has dispatched the 'ready' event)
			loaded = false,
	
			// The horizontal and vertical index of the currently active slide
			indexh,
			indexv,
	
			// The previous and current slide HTML elements
			previousSlide,
			currentSlide,
	
			previousBackground,
	
			// Slides may hold a data-state attribute which we pick up and apply
			// as a class to the body. This list contains the combined state of
			// all current slides.
			state = [],
	
			// The current scale of the presentation (see width/height config)
			scale = 1,
	
			// Cached references to DOM elements
			dom = {},
	
			// Features supported by the browser, see #checkCapabilities()
			features = {},
	
			// Client is a mobile device, see #checkCapabilities()
			isMobileDevice,
	
			// Throttles mouse wheel navigation
			lastMouseWheelStep = 0,
	
			// Delays updates to the URL due to a Chrome thumbnailer bug
			writeURLTimeout = 0,
	
			// A delay used to activate the overview mode
			activateOverviewTimeout = 0,
	
			// A delay used to deactivate the overview mode
			deactivateOverviewTimeout = 0,
	
			// Flags if the interaction event listeners are bound
			eventsAreBound = false,
	
			// The current auto-slide duration
			autoSlide = 0,
	
			// Auto slide properties
			autoSlidePlayer,
			autoSlideTimeout = 0,
			autoSlideStartTime = -1,
			autoSlidePaused = false,
	
			// Holds information about the currently ongoing touch input
			touch = {
				startX: 0,
				startY: 0,
				startSpan: 0,
				startCount: 0,
				captured: false,
				threshold: 40
			};
	
		/**
		 * Starts up the presentation if the client is capable.
		 */
		function initialize( options ) {
	
			checkCapabilities();
	
			if( !features.transforms2d && !features.transforms3d ) {
				document.body.setAttribute( 'class', 'no-transforms' );
	
				// If the browser doesn't support core features we won't be
				// using JavaScript to control the presentation
				return;
			}
	
			// Force a layout when the whole page, incl fonts, has loaded
			window.addEventListener( 'load', layout, false );
	
			var query = Reveal.getQueryHash();
	
			// Do not accept new dependencies via query config to avoid
			// the potential of malicious script injection
			if( typeof query['dependencies'] !== 'undefined' ) delete query['dependencies'];
	
			// Copy options over to our config object
			extend( config, options );
			extend( config, query );
	
			// Hide the address bar in mobile browsers
			hideAddressBar();
	
			// Loads the dependencies and continues to #start() once done
			load();
	
		}
	
		/**
		 * Inspect the client to see what it's capable of, this
		 * should only happens once per runtime.
		 */
		function checkCapabilities() {
	
			features.transforms3d = 'WebkitPerspective' in document.body.style ||
									'MozPerspective' in document.body.style ||
									'msPerspective' in document.body.style ||
									'OPerspective' in document.body.style ||
									'perspective' in document.body.style;
	
			features.transforms2d = 'WebkitTransform' in document.body.style ||
									'MozTransform' in document.body.style ||
									'msTransform' in document.body.style ||
									'OTransform' in document.body.style ||
									'transform' in document.body.style;
	
			features.requestAnimationFrameMethod = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
			features.requestAnimationFrame = typeof features.requestAnimationFrameMethod === 'function';
	
			features.canvas = !!document.createElement( 'canvas' ).getContext;
	
			isMobileDevice = navigator.userAgent.match( /(iphone|ipod|android)/gi );
	
		}
	
	
	    /**
	     * Loads the dependencies of reveal.js. Dependencies are
	     * defined via the configuration option 'dependencies'
	     * and will be loaded prior to starting/binding reveal.js.
	     * Some dependencies may have an 'async' flag, if so they
	     * will load after reveal.js has been started up.
	     */
		function load() {
	
			var scripts = [],
				scriptsAsync = [],
				scriptsToPreload = 0;
	
			// Called once synchronous scripts finish loading
			function proceed() {
				if( scriptsAsync.length ) {
					// Load asynchronous scripts
					head.js.apply( null, scriptsAsync );
				}
	
				start();
			}
	
			function loadScript( s ) {
				head.ready( s.src.match( /([\w\d_\-]*)\.?js$|[^\\\/]*$/i )[0], function() {
					// Extension may contain callback functions
					if( typeof s.callback === 'function' ) {
						s.callback.apply( this );
					}
	
					if( --scriptsToPreload === 0 ) {
						proceed();
					}
				});
			}
	
			for( var i = 0, len = config.dependencies.length; i < len; i++ ) {
				var s = config.dependencies[i];
	
				// Load if there's no condition or the condition is truthy
				if( !s.condition || s.condition() ) {
					if( s.async ) {
						scriptsAsync.push( s.src );
					}
					else {
						scripts.push( s.src );
					}
	
					loadScript( s );
				}
			}
	
			if( scripts.length ) {
				scriptsToPreload = scripts.length;
	
				// Load synchronous scripts
				head.js.apply( null, scripts );
			}
			else {
				proceed();
			}
	
		}
	
		/**
		 * Starts up reveal.js by binding input events and navigating
		 * to the current URL deeplink if there is one.
		 */
		function start() {
	
			// Make sure we've got all the DOM elements we need
			setupDOM();
	
			// Resets all vertical slides so that only the first is visible
			resetVerticalSlides();
	
			// Updates the presentation to match the current configuration values
			configure();
	
			// Read the initial hash
			readURL();
	
			// Update all backgrounds
			updateBackground( true );
	
			// Notify listeners that the presentation is ready but use a 1ms
			// timeout to ensure it's not fired synchronously after #initialize()
			setTimeout( function() {
				// Enable transitions now that we're loaded
				dom.slides.classList.remove( 'no-transition' );
	
				loaded = true;
	
				dispatchEvent( 'ready', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				} );
			}, 1 );
	
		}
	
		/**
		 * Finds and stores references to DOM elements which are
		 * required by the presentation. If a required element is
		 * not found, it is created.
		 */
		function setupDOM() {
	
			// Cache references to key DOM elements
			dom.theme = document.querySelector( '#theme' );
			dom.wrapper = document.querySelector( '.reveal' );
			dom.slides = document.querySelector( '.reveal .slides' );
	
			// Prevent transitions while we're loading
			dom.slides.classList.add( 'no-transition' );
	
			// Background element
			dom.background = createSingletonNode( dom.wrapper, 'div', 'backgrounds', null );
	
			// Progress bar
			dom.progress = createSingletonNode( dom.wrapper, 'div', 'progress', '<span></span>' );
			dom.progressbar = dom.progress.querySelector( 'span' );
	
			// Arrow controls
			createSingletonNode( dom.wrapper, 'aside', 'controls',
				'<div class="navigate-left"></div>' +
				'<div class="navigate-right"></div>' +
				'<div class="navigate-up"></div>' +
				'<div class="navigate-down"></div>' );
	
			// Slide number
			dom.slideNumber = createSingletonNode( dom.wrapper, 'div', 'slide-number', '' );
	
			// State background element [DEPRECATED]
			createSingletonNode( dom.wrapper, 'div', 'state-background', null );
	
			// Overlay graphic which is displayed during the paused mode
			createSingletonNode( dom.wrapper, 'div', 'pause-overlay', null );
	
			// Cache references to elements
			dom.controls = document.querySelector( '.reveal .controls' );
	
			// There can be multiple instances of controls throughout the page
			dom.controlsLeft = toArray( document.querySelectorAll( '.navigate-left' ) );
			dom.controlsRight = toArray( document.querySelectorAll( '.navigate-right' ) );
			dom.controlsUp = toArray( document.querySelectorAll( '.navigate-up' ) );
			dom.controlsDown = toArray( document.querySelectorAll( '.navigate-down' ) );
			dom.controlsPrev = toArray( document.querySelectorAll( '.navigate-prev' ) );
			dom.controlsNext = toArray( document.querySelectorAll( '.navigate-next' ) );
	
		}
	
		/**
		 * Creates an HTML element and returns a reference to it.
		 * If the element already exists the existing instance will
		 * be returned.
		 */
		function createSingletonNode( container, tagname, classname, innerHTML ) {
	
			var node = container.querySelector( '.' + classname );
			if( !node ) {
				node = document.createElement( tagname );
				node.classList.add( classname );
				if( innerHTML !== null ) {
					node.innerHTML = innerHTML;
				}
				container.appendChild( node );
			}
			return node;
	
		}
	
		/**
		 * Creates the slide background elements and appends them
		 * to the background container. One element is created per
		 * slide no matter if the given slide has visible background.
		 */
		function createBackgrounds() {
	
			if( isPrintingPDF() ) {
				document.body.classList.add( 'print-pdf' );
			}
	
			// Clear prior backgrounds
			dom.background.innerHTML = '';
			dom.background.classList.add( 'no-transition' );
	
			// Helper method for creating a background element for the
			// given slide
			function _createBackground( slide, container ) {
	
				var data = {
					background: slide.getAttribute( 'data-background' ),
					backgroundSize: slide.getAttribute( 'data-background-size' ),
					backgroundImage: slide.getAttribute( 'data-background-image' ),
					backgroundColor: slide.getAttribute( 'data-background-color' ),
					backgroundRepeat: slide.getAttribute( 'data-background-repeat' ),
					backgroundPosition: slide.getAttribute( 'data-background-position' ),
					backgroundTransition: slide.getAttribute( 'data-background-transition' )
				};
	
				var element = document.createElement( 'div' );
				element.className = 'slide-background';
	
				if( data.background ) {
					// Auto-wrap image urls in url(...)
					if( /^(http|file|\/\/)/gi.test( data.background ) || /\.(svg|png|jpg|jpeg|gif|bmp)$/gi.test( data.background ) ) {
						element.style.backgroundImage = 'url('+ data.background +')';
					}
					else {
						element.style.background = data.background;
					}
				}
	
				if( data.background || data.backgroundColor || data.backgroundImage ) {
					element.setAttribute( 'data-background-hash', data.background + data.backgroundSize + data.backgroundImage + data.backgroundColor + data.backgroundRepeat + data.backgroundPosition + data.backgroundTransition );
				}
	
				// Additional and optional background properties
				if( data.backgroundSize ) element.style.backgroundSize = data.backgroundSize;
				if( data.backgroundImage ) element.style.backgroundImage = 'url("' + data.backgroundImage + '")';
				if( data.backgroundColor ) element.style.backgroundColor = data.backgroundColor;
				if( data.backgroundRepeat ) element.style.backgroundRepeat = data.backgroundRepeat;
				if( data.backgroundPosition ) element.style.backgroundPosition = data.backgroundPosition;
				if( data.backgroundTransition ) element.setAttribute( 'data-background-transition', data.backgroundTransition );
	
				container.appendChild( element );
	
				return element;
	
			}
	
			// Iterate over all horizontal slides
			toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).forEach( function( slideh ) {
	
				var backgroundStack;
	
				if( isPrintingPDF() ) {
					backgroundStack = _createBackground( slideh, slideh );
				}
				else {
					backgroundStack = _createBackground( slideh, dom.background );
				}
	
				// Iterate over all vertical slides
				toArray( slideh.querySelectorAll( 'section' ) ).forEach( function( slidev ) {
	
					if( isPrintingPDF() ) {
						_createBackground( slidev, slidev );
					}
					else {
						_createBackground( slidev, backgroundStack );
					}
	
				} );
	
			} );
	
			// Add parallax background if specified
			if( config.parallaxBackgroundImage ) {
	
				dom.background.style.backgroundImage = 'url("' + config.parallaxBackgroundImage + '")';
				dom.background.style.backgroundSize = config.parallaxBackgroundSize;
	
				// Make sure the below properties are set on the element - these properties are
				// needed for proper transitions to be set on the element via CSS. To remove
				// annoying background slide-in effect when the presentation starts, apply
				// these properties after short time delay
				setTimeout( function() {
					dom.wrapper.classList.add( 'has-parallax-background' );
				}, 1 );
	
			}
			else {
	
				dom.background.style.backgroundImage = '';
				dom.wrapper.classList.remove( 'has-parallax-background' );
	
			}
	
		}
	
		/**
		 * Applies the configuration settings from the config
		 * object. May be called multiple times.
		 */
		function configure( options ) {
	
			var numberOfSlides = document.querySelectorAll( SLIDES_SELECTOR ).length;
	
			dom.wrapper.classList.remove( config.transition );
	
			// New config options may be passed when this method
			// is invoked through the API after initialization
			if( typeof options === 'object' ) extend( config, options );
	
			// Force linear transition based on browser capabilities
			if( features.transforms3d === false ) config.transition = 'linear';
	
			dom.wrapper.classList.add( config.transition );
	
			dom.wrapper.setAttribute( 'data-transition-speed', config.transitionSpeed );
			dom.wrapper.setAttribute( 'data-background-transition', config.backgroundTransition );
	
			dom.controls.style.display = config.controls ? 'block' : 'none';
			dom.progress.style.display = config.progress ? 'block' : 'none';
	
			if( config.rtl ) {
				dom.wrapper.classList.add( 'rtl' );
			}
			else {
				dom.wrapper.classList.remove( 'rtl' );
			}
	
			if( config.center ) {
				dom.wrapper.classList.add( 'center' );
			}
			else {
				dom.wrapper.classList.remove( 'center' );
			}
	
			if( config.mouseWheel ) {
				document.addEventListener( 'DOMMouseScroll', onDocumentMouseScroll, false ); // FF
				document.addEventListener( 'mousewheel', onDocumentMouseScroll, false );
			}
			else {
				document.removeEventListener( 'DOMMouseScroll', onDocumentMouseScroll, false ); // FF
				document.removeEventListener( 'mousewheel', onDocumentMouseScroll, false );
			}
	
			// Rolling 3D links
			if( config.rollingLinks ) {
				enableRollingLinks();
			}
			else {
				disableRollingLinks();
			}
	
			// Iframe link previews
			if( config.previewLinks ) {
				enablePreviewLinks();
			}
			else {
				disablePreviewLinks();
				enablePreviewLinks( '[data-preview-link]' );
			}
	
			// Auto-slide playback controls
			if( numberOfSlides > 1 && config.autoSlide && config.autoSlideStoppable && features.canvas && features.requestAnimationFrame ) {
				autoSlidePlayer = new Playback( dom.wrapper, function() {
					return Math.min( Math.max( ( Date.now() - autoSlideStartTime ) / autoSlide, 0 ), 1 );
				} );
	
				autoSlidePlayer.on( 'click', onAutoSlidePlayerClick );
				autoSlidePaused = false;
			}
			else if( autoSlidePlayer ) {
				autoSlidePlayer.destroy();
				autoSlidePlayer = null;
			}
	
			// Load the theme in the config, if it's not already loaded
			if( config.theme && dom.theme ) {
				var themeURL = dom.theme.getAttribute( 'href' );
				var themeFinder = /[^\/]*?(?=\.css)/;
				var themeName = themeURL.match(themeFinder)[0];
	
				if(  config.theme !== themeName ) {
					themeURL = themeURL.replace(themeFinder, config.theme);
					dom.theme.setAttribute( 'href', themeURL );
				}
			}
	
			sync();
	
		}
	
		/**
		 * Binds all event listeners.
		 */
		function addEventListeners() {
	
			eventsAreBound = true;
	
			window.addEventListener( 'hashchange', onWindowHashChange, false );
			window.addEventListener( 'resize', onWindowResize, false );
	
			if( config.touch ) {
				dom.wrapper.addEventListener( 'touchstart', onTouchStart, false );
				dom.wrapper.addEventListener( 'touchmove', onTouchMove, false );
				dom.wrapper.addEventListener( 'touchend', onTouchEnd, false );
	
				// Support pointer-style touch interaction as well
				if( window.navigator.msPointerEnabled ) {
					dom.wrapper.addEventListener( 'MSPointerDown', onPointerDown, false );
					dom.wrapper.addEventListener( 'MSPointerMove', onPointerMove, false );
					dom.wrapper.addEventListener( 'MSPointerUp', onPointerUp, false );
				}
			}
	
			if( config.keyboard ) {
				document.addEventListener( 'keydown', onDocumentKeyDown, false );
			}
	
			if( config.progress && dom.progress ) {
				dom.progress.addEventListener( 'click', onProgressClicked, false );
			}
	
			if( config.focusBodyOnPageVisiblityChange ) {
				var visibilityChange;
	
				if( 'hidden' in document ) {
					visibilityChange = 'visibilitychange';
				}
				else if( 'msHidden' in document ) {
					visibilityChange = 'msvisibilitychange';
				}
				else if( 'webkitHidden' in document ) {
					visibilityChange = 'webkitvisibilitychange';
				}
	
				if( visibilityChange ) {
					document.addEventListener( visibilityChange, onPageVisibilityChange, false );
				}
			}
	
			[ 'touchstart', 'click' ].forEach( function( eventName ) {
				dom.controlsLeft.forEach( function( el ) { el.addEventListener( eventName, onNavigateLeftClicked, false ); } );
				dom.controlsRight.forEach( function( el ) { el.addEventListener( eventName, onNavigateRightClicked, false ); } );
				dom.controlsUp.forEach( function( el ) { el.addEventListener( eventName, onNavigateUpClicked, false ); } );
				dom.controlsDown.forEach( function( el ) { el.addEventListener( eventName, onNavigateDownClicked, false ); } );
				dom.controlsPrev.forEach( function( el ) { el.addEventListener( eventName, onNavigatePrevClicked, false ); } );
				dom.controlsNext.forEach( function( el ) { el.addEventListener( eventName, onNavigateNextClicked, false ); } );
			} );
	
		}
	
		/**
		 * Unbinds all event listeners.
		 */
		function removeEventListeners() {
	
			eventsAreBound = false;
	
			document.removeEventListener( 'keydown', onDocumentKeyDown, false );
			window.removeEventListener( 'hashchange', onWindowHashChange, false );
			window.removeEventListener( 'resize', onWindowResize, false );
	
			dom.wrapper.removeEventListener( 'touchstart', onTouchStart, false );
			dom.wrapper.removeEventListener( 'touchmove', onTouchMove, false );
			dom.wrapper.removeEventListener( 'touchend', onTouchEnd, false );
	
			if( window.navigator.msPointerEnabled ) {
				dom.wrapper.removeEventListener( 'MSPointerDown', onPointerDown, false );
				dom.wrapper.removeEventListener( 'MSPointerMove', onPointerMove, false );
				dom.wrapper.removeEventListener( 'MSPointerUp', onPointerUp, false );
			}
	
			if ( config.progress && dom.progress ) {
				dom.progress.removeEventListener( 'click', onProgressClicked, false );
			}
	
			[ 'touchstart', 'click' ].forEach( function( eventName ) {
				dom.controlsLeft.forEach( function( el ) { el.removeEventListener( eventName, onNavigateLeftClicked, false ); } );
				dom.controlsRight.forEach( function( el ) { el.removeEventListener( eventName, onNavigateRightClicked, false ); } );
				dom.controlsUp.forEach( function( el ) { el.removeEventListener( eventName, onNavigateUpClicked, false ); } );
				dom.controlsDown.forEach( function( el ) { el.removeEventListener( eventName, onNavigateDownClicked, false ); } );
				dom.controlsPrev.forEach( function( el ) { el.removeEventListener( eventName, onNavigatePrevClicked, false ); } );
				dom.controlsNext.forEach( function( el ) { el.removeEventListener( eventName, onNavigateNextClicked, false ); } );
			} );
	
		}
	
		/**
		 * Extend object a with the properties of object b.
		 * If there's a conflict, object b takes precedence.
		 */
		function extend( a, b ) {
	
			for( var i in b ) {
				a[ i ] = b[ i ];
			}
	
		}
	
		/**
		 * Converts the target object to an array.
		 */
		function toArray( o ) {
	
			return Array.prototype.slice.call( o );
	
		}
	
		/**
		 * Measures the distance in pixels between point a
		 * and point b.
		 *
		 * @param {Object} a point with x/y properties
		 * @param {Object} b point with x/y properties
		 */
		function distanceBetween( a, b ) {
	
			var dx = a.x - b.x,
				dy = a.y - b.y;
	
			return Math.sqrt( dx*dx + dy*dy );
	
		}
	
		/**
		 * Applies a CSS transform to the target element.
		 */
		function transformElement( element, transform ) {
	
			element.style.WebkitTransform = transform;
			element.style.MozTransform = transform;
			element.style.msTransform = transform;
			element.style.OTransform = transform;
			element.style.transform = transform;
	
		}
	
		/**
		 * Retrieves the height of the given element by looking
		 * at the position and height of its immediate children.
		 */
		function getAbsoluteHeight( element ) {
	
			var height = 0;
	
			if( element ) {
				var absoluteChildren = 0;
	
				toArray( element.childNodes ).forEach( function( child ) {
	
					if( typeof child.offsetTop === 'number' && child.style ) {
						// Count # of abs children
						if( child.style.position === 'absolute' ) {
							absoluteChildren += 1;
						}
	
						height = Math.max( height, child.offsetTop + child.offsetHeight );
					}
	
				} );
	
				// If there are no absolute children, use offsetHeight
				if( absoluteChildren === 0 ) {
					height = element.offsetHeight;
				}
	
			}
	
			return height;
	
		}
	
		/**
		 * Returns the remaining height within the parent of the
		 * target element after subtracting the height of all
		 * siblings.
		 *
		 * remaining height = [parent height] - [ siblings height]
		 */
		function getRemainingHeight( element, height ) {
	
			height = height || 0;
	
			if( element ) {
				var parent = element.parentNode;
				var siblings = parent.childNodes;
	
				// Subtract the height of each sibling
				toArray( siblings ).forEach( function( sibling ) {
	
					if( typeof sibling.offsetHeight === 'number' && sibling !== element ) {
	
						var styles = window.getComputedStyle( sibling ),
							marginTop = parseInt( styles.marginTop, 10 ),
							marginBottom = parseInt( styles.marginBottom, 10 );
	
						height -= sibling.offsetHeight + marginTop + marginBottom;
	
					}
	
				} );
	
				var elementStyles = window.getComputedStyle( element );
	
				// Subtract the margins of the target element
				height -= parseInt( elementStyles.marginTop, 10 ) +
							parseInt( elementStyles.marginBottom, 10 );
	
			}
	
			return height;
	
		}
	
		/**
		 * Checks if this instance is being used to print a PDF.
		 */
		function isPrintingPDF() {
	
			return ( /print-pdf/gi ).test( window.location.search );
	
		}
	
		/**
		 * Hides the address bar if we're on a mobile device.
		 */
		function hideAddressBar() {
	
			if( config.hideAddressBar && isMobileDevice ) {
				// Events that should trigger the address bar to hide
				window.addEventListener( 'load', removeAddressBar, false );
				window.addEventListener( 'orientationchange', removeAddressBar, false );
			}
	
		}
	
		/**
		 * Causes the address bar to hide on mobile devices,
		 * more vertical space ftw.
		 */
		function removeAddressBar() {
	
			setTimeout( function() {
				window.scrollTo( 0, 1 );
			}, 10 );
	
		}
	
		/**
		 * Dispatches an event of the specified type from the
		 * reveal DOM element.
		 */
		function dispatchEvent( type, properties ) {
	
			var event = document.createEvent( "HTMLEvents", 1, 2 );
			event.initEvent( type, true, true );
			extend( event, properties );
			dom.wrapper.dispatchEvent( event );
	
		}
	
		/**
		 * Wrap all links in 3D goodness.
		 */
		function enableRollingLinks() {
	
			if( features.transforms3d && !( 'msPerspective' in document.body.style ) ) {
				var anchors = document.querySelectorAll( SLIDES_SELECTOR + ' a:not(.image)' );
	
				for( var i = 0, len = anchors.length; i < len; i++ ) {
					var anchor = anchors[i];
	
					if( anchor.textContent && !anchor.querySelector( '*' ) && ( !anchor.className || !anchor.classList.contains( anchor, 'roll' ) ) ) {
						var span = document.createElement('span');
						span.setAttribute('data-title', anchor.text);
						span.innerHTML = anchor.innerHTML;
	
						anchor.classList.add( 'roll' );
						anchor.innerHTML = '';
						anchor.appendChild(span);
					}
				}
			}
	
		}
	
		/**
		 * Unwrap all 3D links.
		 */
		function disableRollingLinks() {
	
			var anchors = document.querySelectorAll( SLIDES_SELECTOR + ' a.roll' );
	
			for( var i = 0, len = anchors.length; i < len; i++ ) {
				var anchor = anchors[i];
				var span = anchor.querySelector( 'span' );
	
				if( span ) {
					anchor.classList.remove( 'roll' );
					anchor.innerHTML = span.innerHTML;
				}
			}
	
		}
	
		/**
		 * Bind preview frame links.
		 */
		function enablePreviewLinks( selector ) {
	
			var anchors = toArray( document.querySelectorAll( selector ? selector : 'a' ) );
	
			anchors.forEach( function( element ) {
				if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
					element.addEventListener( 'click', onPreviewLinkClicked, false );
				}
			} );
	
		}
	
		/**
		 * Unbind preview frame links.
		 */
		function disablePreviewLinks() {
	
			var anchors = toArray( document.querySelectorAll( 'a' ) );
	
			anchors.forEach( function( element ) {
				if( /^(http|www)/gi.test( element.getAttribute( 'href' ) ) ) {
					element.removeEventListener( 'click', onPreviewLinkClicked, false );
				}
			} );
	
		}
	
		/**
		 * Opens a preview window for the target URL.
		 */
		function openPreview( url ) {
	
			closePreview();
	
			dom.preview = document.createElement( 'div' );
			dom.preview.classList.add( 'preview-link-overlay' );
			dom.wrapper.appendChild( dom.preview );
	
			dom.preview.innerHTML = [
				'<header>',
					'<a class="close" href="#"><span class="icon"></span></a>',
					'<a class="external" href="'+ url +'" target="_blank"><span class="icon"></span></a>',
				'</header>',
				'<div class="spinner"></div>',
				'<div class="viewport">',
					'<iframe src="'+ url +'"></iframe>',
				'</div>'
			].join('');
	
			dom.preview.querySelector( 'iframe' ).addEventListener( 'load', function( event ) {
				dom.preview.classList.add( 'loaded' );
			}, false );
	
			dom.preview.querySelector( '.close' ).addEventListener( 'click', function( event ) {
				closePreview();
				event.preventDefault();
			}, false );
	
			dom.preview.querySelector( '.external' ).addEventListener( 'click', function( event ) {
				closePreview();
			}, false );
	
			setTimeout( function() {
				dom.preview.classList.add( 'visible' );
			}, 1 );
	
		}
	
		/**
		 * Closes the iframe preview window.
		 */
		function closePreview() {
	
			if( dom.preview ) {
				dom.preview.setAttribute( 'src', '' );
				dom.preview.parentNode.removeChild( dom.preview );
				dom.preview = null;
			}
	
		}
	
		/**
		 * Applies JavaScript-controlled layout rules to the
		 * presentation.
		 */
		function layout() {
	
			if( dom.wrapper && !isPrintingPDF() ) {
	
				// Available space to scale within
				var availableWidth = dom.wrapper.offsetWidth,
					availableHeight = dom.wrapper.offsetHeight;
	
				// Reduce available space by margin
				availableWidth -= ( availableHeight * config.margin );
				availableHeight -= ( availableHeight * config.margin );
	
				// Dimensions of the content
				var slideWidth = config.width,
					slideHeight = config.height,
					slidePadding = 20; // TODO Dig this out of DOM
	
				// Layout the contents of the slides
				layoutSlideContents( config.width, config.height, slidePadding );
	
				// Slide width may be a percentage of available width
				if( typeof slideWidth === 'string' && /%$/.test( slideWidth ) ) {
					slideWidth = parseInt( slideWidth, 10 ) / 100 * availableWidth;
				}
	
				// Slide height may be a percentage of available height
				if( typeof slideHeight === 'string' && /%$/.test( slideHeight ) ) {
					slideHeight = parseInt( slideHeight, 10 ) / 100 * availableHeight;
				}
	
				dom.slides.style.width = slideWidth + 'px';
				dom.slides.style.height = slideHeight + 'px';
	
				// Determine scale of content to fit within available space
				scale = Math.min( availableWidth / slideWidth, availableHeight / slideHeight );
	
				// Respect max/min scale settings
				scale = Math.max( scale, config.minScale );
				scale = Math.min( scale, config.maxScale );
	
				// Prefer applying scale via zoom since Chrome blurs scaled content
				// with nested transforms
				if( typeof dom.slides.style.zoom !== 'undefined' && !navigator.userAgent.match( /(iphone|ipod|ipad|android)/gi ) ) {
					dom.slides.style.zoom = scale;
				}
				// Apply scale transform as a fallback
				else {
					transformElement( dom.slides, 'translate(-50%, -50%) scale('+ scale +') translate(50%, 50%)' );
				}
	
				// Select all slides, vertical and horizontal
				var slides = toArray( document.querySelectorAll( SLIDES_SELECTOR ) );
	
				for( var i = 0, len = slides.length; i < len; i++ ) {
					var slide = slides[ i ];
	
					// Don't bother updating invisible slides
					if( slide.style.display === 'none' ) {
						continue;
					}
	
					if( config.center || slide.classList.contains( 'center' ) ) {
						// Vertical stacks are not centred since their section
						// children will be
						if( slide.classList.contains( 'stack' ) ) {
							slide.style.top = 0;
						}
						else {
							slide.style.top = Math.max( - ( getAbsoluteHeight( slide ) / 2 ) - slidePadding, -slideHeight / 2 ) + 'px';
						}
					}
					else {
						slide.style.top = '';
					}
	
				}
	
				updateProgress();
				updateParallax();
	
			}
	
		}
	
		/**
		 * Applies layout logic to the contents of all slides in
		 * the presentation.
		 */
		function layoutSlideContents( width, height, padding ) {
	
			// Handle sizing of elements with the 'stretch' class
			toArray( dom.slides.querySelectorAll( 'section > .stretch' ) ).forEach( function( element ) {
	
				// Determine how much vertical space we can use
				var remainingHeight = getRemainingHeight( element, ( height - ( padding * 2 ) ) );
	
				// Consider the aspect ratio of media elements
				if( /(img|video)/gi.test( element.nodeName ) ) {
					var nw = element.naturalWidth || element.videoWidth,
						nh = element.naturalHeight || element.videoHeight;
	
					var es = Math.min( width / nw, remainingHeight / nh );
	
					element.style.width = ( nw * es ) + 'px';
					element.style.height = ( nh * es ) + 'px';
	
				}
				else {
					element.style.width = width + 'px';
					element.style.height = remainingHeight + 'px';
				}
	
			} );
	
		}
	
		/**
		 * Stores the vertical index of a stack so that the same
		 * vertical slide can be selected when navigating to and
		 * from the stack.
		 *
		 * @param {HTMLElement} stack The vertical stack element
		 * @param {int} v Index to memorize
		 */
		function setPreviousVerticalIndex( stack, v ) {
	
			if( typeof stack === 'object' && typeof stack.setAttribute === 'function' ) {
				stack.setAttribute( 'data-previous-indexv', v || 0 );
			}
	
		}
	
		/**
		 * Retrieves the vertical index which was stored using
		 * #setPreviousVerticalIndex() or 0 if no previous index
		 * exists.
		 *
		 * @param {HTMLElement} stack The vertical stack element
		 */
		function getPreviousVerticalIndex( stack ) {
	
			if( typeof stack === 'object' && typeof stack.setAttribute === 'function' && stack.classList.contains( 'stack' ) ) {
				// Prefer manually defined start-indexv
				var attributeName = stack.hasAttribute( 'data-start-indexv' ) ? 'data-start-indexv' : 'data-previous-indexv';
	
				return parseInt( stack.getAttribute( attributeName ) || 0, 10 );
			}
	
			return 0;
	
		}
	
		/**
		 * Displays the overview of slides (quick nav) by
		 * scaling down and arranging all slide elements.
		 *
		 * Experimental feature, might be dropped if perf
		 * can't be improved.
		 */
		function activateOverview() {
	
			// Only proceed if enabled in config
			if( config.overview ) {
	
				// Don't auto-slide while in overview mode
				cancelAutoSlide();
	
				var wasActive = dom.wrapper.classList.contains( 'overview' );
	
				// Vary the depth of the overview based on screen size
				var depth = window.innerWidth < 400 ? 1000 : 2500;
	
				dom.wrapper.classList.add( 'overview' );
				dom.wrapper.classList.remove( 'overview-deactivating' );
	
				clearTimeout( activateOverviewTimeout );
				clearTimeout( deactivateOverviewTimeout );
	
				// Not the pretties solution, but need to let the overview
				// class apply first so that slides are measured accurately
				// before we can position them
				activateOverviewTimeout = setTimeout( function() {
	
					var horizontalSlides = document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR );
	
					for( var i = 0, len1 = horizontalSlides.length; i < len1; i++ ) {
						var hslide = horizontalSlides[i],
							hoffset = config.rtl ? -105 : 105;
	
						hslide.setAttribute( 'data-index-h', i );
	
						// Apply CSS transform
						transformElement( hslide, 'translateZ(-'+ depth +'px) translate(' + ( ( i - indexh ) * hoffset ) + '%, 0%)' );
	
						if( hslide.classList.contains( 'stack' ) ) {
	
							var verticalSlides = hslide.querySelectorAll( 'section' );
	
							for( var j = 0, len2 = verticalSlides.length; j < len2; j++ ) {
								var verticalIndex = i === indexh ? indexv : getPreviousVerticalIndex( hslide );
	
								var vslide = verticalSlides[j];
	
								vslide.setAttribute( 'data-index-h', i );
								vslide.setAttribute( 'data-index-v', j );
	
								// Apply CSS transform
								transformElement( vslide, 'translate(0%, ' + ( ( j - verticalIndex ) * 105 ) + '%)' );
	
								// Navigate to this slide on click
								vslide.addEventListener( 'click', onOverviewSlideClicked, true );
							}
	
						}
						else {
	
							// Navigate to this slide on click
							hslide.addEventListener( 'click', onOverviewSlideClicked, true );
	
						}
					}
	
					updateSlidesVisibility();
	
					layout();
	
					if( !wasActive ) {
						// Notify observers of the overview showing
						dispatchEvent( 'overviewshown', {
							'indexh': indexh,
							'indexv': indexv,
							'currentSlide': currentSlide
						} );
					}
	
				}, 10 );
	
			}
	
		}
	
		/**
		 * Exits the slide overview and enters the currently
		 * active slide.
		 */
		function deactivateOverview() {
	
			// Only proceed if enabled in config
			if( config.overview ) {
	
				clearTimeout( activateOverviewTimeout );
				clearTimeout( deactivateOverviewTimeout );
	
				dom.wrapper.classList.remove( 'overview' );
	
				// Temporarily add a class so that transitions can do different things
				// depending on whether they are exiting/entering overview, or just
				// moving from slide to slide
				dom.wrapper.classList.add( 'overview-deactivating' );
	
				deactivateOverviewTimeout = setTimeout( function () {
					dom.wrapper.classList.remove( 'overview-deactivating' );
				}, 1 );
	
				// Select all slides
				toArray( document.querySelectorAll( SLIDES_SELECTOR ) ).forEach( function( slide ) {
					// Resets all transforms to use the external styles
					transformElement( slide, '' );
	
					slide.removeEventListener( 'click', onOverviewSlideClicked, true );
				} );
	
				slide( indexh, indexv );
	
				cueAutoSlide();
	
				// Notify observers of the overview hiding
				dispatchEvent( 'overviewhidden', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				} );
	
			}
		}
	
		/**
		 * Toggles the slide overview mode on and off.
		 *
		 * @param {Boolean} override Optional flag which overrides the
		 * toggle logic and forcibly sets the desired state. True means
		 * overview is open, false means it's closed.
		 */
		function toggleOverview( override ) {
	
			if( typeof override === 'boolean' ) {
				override ? activateOverview() : deactivateOverview();
			}
			else {
				isOverview() ? deactivateOverview() : activateOverview();
			}
	
		}
	
		/**
		 * Checks if the overview is currently active.
		 *
		 * @return {Boolean} true if the overview is active,
		 * false otherwise
		 */
		function isOverview() {
	
			return dom.wrapper.classList.contains( 'overview' );
	
		}
	
		/**
		 * Checks if the current or specified slide is vertical
		 * (nested within another slide).
		 *
		 * @param {HTMLElement} slide [optional] The slide to check
		 * orientation of
		 */
		function isVerticalSlide( slide ) {
	
			// Prefer slide argument, otherwise use current slide
			slide = slide ? slide : currentSlide;
	
			return slide && slide.parentNode && !!slide.parentNode.nodeName.match( /section/i );
	
		}
	
		/**
		 * Handling the fullscreen functionality via the fullscreen API
		 *
		 * @see http://fullscreen.spec.whatwg.org/
		 * @see https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
		 */
		function enterFullscreen() {
	
			var element = document.body;
	
			// Check which implementation is available
			var requestMethod = element.requestFullScreen ||
								element.webkitRequestFullscreen ||
								element.webkitRequestFullScreen ||
								element.mozRequestFullScreen ||
								element.msRequestFullScreen;
	
			if( requestMethod ) {
				requestMethod.apply( element );
			}
	
		}
	
		/**
		 * Enters the paused mode which fades everything on screen to
		 * black.
		 */
		function pause() {
	
			var wasPaused = dom.wrapper.classList.contains( 'paused' );
	
			cancelAutoSlide();
			dom.wrapper.classList.add( 'paused' );
	
			if( wasPaused === false ) {
				dispatchEvent( 'paused' );
			}
	
		}
	
		/**
		 * Exits from the paused mode.
		 */
		function resume() {
	
			var wasPaused = dom.wrapper.classList.contains( 'paused' );
			dom.wrapper.classList.remove( 'paused' );
	
			cueAutoSlide();
	
			if( wasPaused ) {
				dispatchEvent( 'resumed' );
			}
	
		}
	
		/**
		 * Toggles the paused mode on and off.
		 */
		function togglePause() {
	
			if( isPaused() ) {
				resume();
			}
			else {
				pause();
			}
	
		}
	
		/**
		 * Checks if we are currently in the paused mode.
		 */
		function isPaused() {
	
			return dom.wrapper.classList.contains( 'paused' );
	
		}
	
		/**
		 * Steps from the current point in the presentation to the
		 * slide which matches the specified horizontal and vertical
		 * indices.
		 *
		 * @param {int} h Horizontal index of the target slide
		 * @param {int} v Vertical index of the target slide
		 * @param {int} f Optional index of a fragment within the
		 * target slide to activate
		 * @param {int} o Optional origin for use in multimaster environments
		 */
		function slide( h, v, f, o ) {
	
			// Remember where we were at before
			previousSlide = currentSlide;
	
			// Query all horizontal slides in the deck
			var horizontalSlides = document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR );
	
			// If no vertical index is specified and the upcoming slide is a
			// stack, resume at its previous vertical index
			if( v === undefined ) {
				v = getPreviousVerticalIndex( horizontalSlides[ h ] );
			}
	
			// If we were on a vertical stack, remember what vertical index
			// it was on so we can resume at the same position when returning
			if( previousSlide && previousSlide.parentNode && previousSlide.parentNode.classList.contains( 'stack' ) ) {
				setPreviousVerticalIndex( previousSlide.parentNode, indexv );
			}
	
			// Remember the state before this slide
			var stateBefore = state.concat();
	
			// Reset the state array
			state.length = 0;
	
			var indexhBefore = indexh || 0,
				indexvBefore = indexv || 0;
	
			// Activate and transition to the new slide
			indexh = updateSlides( HORIZONTAL_SLIDES_SELECTOR, h === undefined ? indexh : h );
			indexv = updateSlides( VERTICAL_SLIDES_SELECTOR, v === undefined ? indexv : v );
	
			// Update the visibility of slides now that the indices have changed
			updateSlidesVisibility();
	
			layout();
	
			// Apply the new state
			stateLoop: for( var i = 0, len = state.length; i < len; i++ ) {
				// Check if this state existed on the previous slide. If it
				// did, we will avoid adding it repeatedly
				for( var j = 0; j < stateBefore.length; j++ ) {
					if( stateBefore[j] === state[i] ) {
						stateBefore.splice( j, 1 );
						continue stateLoop;
					}
				}
	
				document.documentElement.classList.add( state[i] );
	
				// Dispatch custom event matching the state's name
				dispatchEvent( state[i] );
			}
	
			// Clean up the remains of the previous state
			while( stateBefore.length ) {
				document.documentElement.classList.remove( stateBefore.pop() );
			}
	
			// If the overview is active, re-activate it to update positions
			if( isOverview() ) {
				activateOverview();
			}
	
			// Find the current horizontal slide and any possible vertical slides
			// within it
			var currentHorizontalSlide = horizontalSlides[ indexh ],
				currentVerticalSlides = currentHorizontalSlide.querySelectorAll( 'section' );
	
			// Store references to the previous and current slides
			currentSlide = currentVerticalSlides[ indexv ] || currentHorizontalSlide;
	
			// Show fragment, if specified
			if( typeof f !== 'undefined' ) {
				navigateFragment( f );
			}
	
			// Dispatch an event if the slide changed
			var slideChanged = ( indexh !== indexhBefore || indexv !== indexvBefore );
			if( slideChanged ) {
				dispatchEvent( 'slidechanged', {
					'indexh': indexh,
					'indexv': indexv,
					'previousSlide': previousSlide,
					'currentSlide': currentSlide,
					'origin': o
				} );
			}
			else {
				// Ensure that the previous slide is never the same as the current
				previousSlide = null;
			}
	
			// Solves an edge case where the previous slide maintains the
			// 'present' class when navigating between adjacent vertical
			// stacks
			if( previousSlide ) {
				previousSlide.classList.remove( 'present' );
	
				// Reset all slides upon navigate to home
				// Issue: #285
				if ( document.querySelector( HOME_SLIDE_SELECTOR ).classList.contains( 'present' ) ) {
					// Launch async task
					setTimeout( function () {
						var slides = toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR + '.stack') ), i;
						for( i in slides ) {
							if( slides[i] ) {
								// Reset stack
								setPreviousVerticalIndex( slides[i], 0 );
							}
						}
					}, 0 );
				}
			}
	
			// Handle embedded content
			if( slideChanged ) {
				stopEmbeddedContent( previousSlide );
				startEmbeddedContent( currentSlide );
			}
	
			updateControls();
			updateProgress();
			updateBackground();
			updateParallax();
			updateSlideNumber();
	
			// Update the URL hash
			writeURL();
	
			cueAutoSlide();
	
		}
	
		/**
		 * Syncs the presentation with the current DOM. Useful
		 * when new slides or control elements are added or when
		 * the configuration has changed.
		 */
		function sync() {
	
			// Subscribe to input
			removeEventListeners();
			addEventListeners();
	
			// Force a layout to make sure the current config is accounted for
			layout();
	
			// Reflect the current autoSlide value
			autoSlide = config.autoSlide;
	
			// Start auto-sliding if it's enabled
			cueAutoSlide();
	
			// Re-create the slide backgrounds
			createBackgrounds();
	
			sortAllFragments();
	
			updateControls();
			updateProgress();
			updateBackground( true );
			updateSlideNumber();
	
		}
	
		/**
		 * Resets all vertical slides so that only the first
		 * is visible.
		 */
		function resetVerticalSlides() {
	
			var horizontalSlides = toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
			horizontalSlides.forEach( function( horizontalSlide ) {
	
				var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
				verticalSlides.forEach( function( verticalSlide, y ) {
	
					if( y > 0 ) {
						verticalSlide.classList.remove( 'present' );
						verticalSlide.classList.remove( 'past' );
						verticalSlide.classList.add( 'future' );
					}
	
				} );
	
			} );
	
		}
	
		/**
		 * Sorts and formats all of fragments in the
		 * presentation.
		 */
		function sortAllFragments() {
	
			var horizontalSlides = toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
			horizontalSlides.forEach( function( horizontalSlide ) {
	
				var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
				verticalSlides.forEach( function( verticalSlide, y ) {
	
					sortFragments( verticalSlide.querySelectorAll( '.fragment' ) );
	
				} );
	
				if( verticalSlides.length === 0 ) sortFragments( horizontalSlide.querySelectorAll( '.fragment' ) );
	
			} );
	
		}
	
		/**
		 * Updates one dimension of slides by showing the slide
		 * with the specified index.
		 *
		 * @param {String} selector A CSS selector that will fetch
		 * the group of slides we are working with
		 * @param {Number} index The index of the slide that should be
		 * shown
		 *
		 * @return {Number} The index of the slide that is now shown,
		 * might differ from the passed in index if it was out of
		 * bounds.
		 */
		function updateSlides( selector, index ) {
	
			// Select all slides and convert the NodeList result to
			// an array
			var slides = toArray( document.querySelectorAll( selector ) ),
				slidesLength = slides.length;
	
			if( slidesLength ) {
	
				// Should the index loop?
				if( config.loop ) {
					index %= slidesLength;
	
					if( index < 0 ) {
						index = slidesLength + index;
					}
				}
	
				// Enforce max and minimum index bounds
				index = Math.max( Math.min( index, slidesLength - 1 ), 0 );
	
				for( var i = 0; i < slidesLength; i++ ) {
					var element = slides[i];
	
					var reverse = config.rtl && !isVerticalSlide( element );
	
					element.classList.remove( 'past' );
					element.classList.remove( 'present' );
					element.classList.remove( 'future' );
	
					// http://www.w3.org/html/wg/drafts/html/master/editing.html#the-hidden-attribute
					element.setAttribute( 'hidden', '' );
	
					if( i < index ) {
						// Any element previous to index is given the 'past' class
						element.classList.add( reverse ? 'future' : 'past' );
	
						var pastFragments = toArray( element.querySelectorAll( '.fragment' ) );
	
						// Show all fragments on prior slides
						while( pastFragments.length ) {
							var pastFragment = pastFragments.pop();
							pastFragment.classList.add( 'visible' );
							pastFragment.classList.remove( 'current-fragment' );
						}
					}
					else if( i > index ) {
						// Any element subsequent to index is given the 'future' class
						element.classList.add( reverse ? 'past' : 'future' );
	
						var futureFragments = toArray( element.querySelectorAll( '.fragment.visible' ) );
	
						// No fragments in future slides should be visible ahead of time
						while( futureFragments.length ) {
							var futureFragment = futureFragments.pop();
							futureFragment.classList.remove( 'visible' );
							futureFragment.classList.remove( 'current-fragment' );
						}
					}
	
					// If this element contains vertical slides
					if( element.querySelector( 'section' ) ) {
						element.classList.add( 'stack' );
					}
				}
	
				// Mark the current slide as present
				slides[index].classList.add( 'present' );
				slides[index].removeAttribute( 'hidden' );
	
				// If this slide has a state associated with it, add it
				// onto the current state of the deck
				var slideState = slides[index].getAttribute( 'data-state' );
				if( slideState ) {
					state = state.concat( slideState.split( ' ' ) );
				}
	
			}
			else {
				// Since there are no slides we can't be anywhere beyond the
				// zeroth index
				index = 0;
			}
	
			return index;
	
		}
	
		/**
		 * Optimization method; hide all slides that are far away
		 * from the present slide.
		 */
		function updateSlidesVisibility() {
	
			// Select all slides and convert the NodeList result to
			// an array
			var horizontalSlides = toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ),
				horizontalSlidesLength = horizontalSlides.length,
				distanceX,
				distanceY;
	
			if( horizontalSlidesLength ) {
	
				// The number of steps away from the present slide that will
				// be visible
				var viewDistance = isOverview() ? 10 : config.viewDistance;
	
				// Limit view distance on weaker devices
				if( isMobileDevice ) {
					viewDistance = isOverview() ? 6 : 1;
				}
	
				for( var x = 0; x < horizontalSlidesLength; x++ ) {
					var horizontalSlide = horizontalSlides[x];
	
					var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) ),
						verticalSlidesLength = verticalSlides.length;
	
					// Loops so that it measures 1 between the first and last slides
					distanceX = Math.abs( ( indexh - x ) % ( horizontalSlidesLength - viewDistance ) ) || 0;
	
					// Show the horizontal slide if it's within the view distance
					horizontalSlide.style.display = distanceX > viewDistance ? 'none' : 'block';
	
					if( verticalSlidesLength ) {
	
						var oy = getPreviousVerticalIndex( horizontalSlide );
	
						for( var y = 0; y < verticalSlidesLength; y++ ) {
							var verticalSlide = verticalSlides[y];
	
							distanceY = x === indexh ? Math.abs( indexv - y ) : Math.abs( y - oy );
	
							verticalSlide.style.display = ( distanceX + distanceY ) > viewDistance ? 'none' : 'block';
						}
	
					}
				}
	
			}
	
		}
	
		/**
		 * Updates the progress bar to reflect the current slide.
		 */
		function updateProgress() {
	
			// Update progress if enabled
			if( config.progress && dom.progress ) {
	
				var horizontalSlides = toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
	
				// The number of past and total slides
				var totalCount = document.querySelectorAll( SLIDES_SELECTOR + ':not(.stack)' ).length;
				var pastCount = 0;
	
				// Step through all slides and count the past ones
				mainLoop: for( var i = 0; i < horizontalSlides.length; i++ ) {
	
					var horizontalSlide = horizontalSlides[i];
					var verticalSlides = toArray( horizontalSlide.querySelectorAll( 'section' ) );
	
					for( var j = 0; j < verticalSlides.length; j++ ) {
	
						// Stop as soon as we arrive at the present
						if( verticalSlides[j].classList.contains( 'present' ) ) {
							break mainLoop;
						}
	
						pastCount++;
	
					}
	
					// Stop as soon as we arrive at the present
					if( horizontalSlide.classList.contains( 'present' ) ) {
						break;
					}
	
					// Don't count the wrapping section for vertical slides
					if( horizontalSlide.classList.contains( 'stack' ) === false ) {
						pastCount++;
					}
	
				}
	
				dom.progressbar.style.width = ( pastCount / ( totalCount - 1 ) ) * window.innerWidth + 'px';
	
			}
	
		}
	
		/**
		 * Updates the slide number div to reflect the current slide.
		 */
		function updateSlideNumber() {
	
			// Update slide number if enabled
			if( config.slideNumber && dom.slideNumber) {
	
				// Display the number of the page using 'indexh - indexv' format
				var indexString = indexh;
				if( indexv > 0 ) {
					indexString += ' - ' + indexv;
				}
	
				dom.slideNumber.innerHTML = indexString;
			}
	
		}
	
		/**
		 * Updates the state of all control/navigation arrows.
		 */
		function updateControls() {
	
			var routes = availableRoutes();
			var fragments = availableFragments();
	
			// Remove the 'enabled' class from all directions
			dom.controlsLeft.concat( dom.controlsRight )
							.concat( dom.controlsUp )
							.concat( dom.controlsDown )
							.concat( dom.controlsPrev )
							.concat( dom.controlsNext ).forEach( function( node ) {
				node.classList.remove( 'enabled' );
				node.classList.remove( 'fragmented' );
			} );
	
			// Add the 'enabled' class to the available routes
			if( routes.left ) dom.controlsLeft.forEach( function( el ) { el.classList.add( 'enabled' );	} );
			if( routes.right ) dom.controlsRight.forEach( function( el ) { el.classList.add( 'enabled' ); } );
			if( routes.up ) dom.controlsUp.forEach( function( el ) { el.classList.add( 'enabled' );	} );
			if( routes.down ) dom.controlsDown.forEach( function( el ) { el.classList.add( 'enabled' ); } );
	
			// Prev/next buttons
			if( routes.left || routes.up ) dom.controlsPrev.forEach( function( el ) { el.classList.add( 'enabled' ); } );
			if( routes.right || routes.down ) dom.controlsNext.forEach( function( el ) { el.classList.add( 'enabled' ); } );
	
			// Highlight fragment directions
			if( currentSlide ) {
	
				// Always apply fragment decorator to prev/next buttons
				if( fragments.prev ) dom.controlsPrev.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); } );
				if( fragments.next ) dom.controlsNext.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); } );
	
				// Apply fragment decorators to directional buttons based on
				// what slide axis they are in
				if( isVerticalSlide( currentSlide ) ) {
					if( fragments.prev ) dom.controlsUp.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); } );
					if( fragments.next ) dom.controlsDown.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); } );
				}
				else {
					if( fragments.prev ) dom.controlsLeft.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); } );
					if( fragments.next ) dom.controlsRight.forEach( function( el ) { el.classList.add( 'fragmented', 'enabled' ); } );
				}
	
			}
	
		}
	
		/**
		 * Updates the background elements to reflect the current
		 * slide.
		 *
		 * @param {Boolean} includeAll If true, the backgrounds of
		 * all vertical slides (not just the present) will be updated.
		 */
		function updateBackground( includeAll ) {
	
			var currentBackground = null;
	
			// Reverse past/future classes when in RTL mode
			var horizontalPast = config.rtl ? 'future' : 'past',
				horizontalFuture = config.rtl ? 'past' : 'future';
	
			// Update the classes of all backgrounds to match the
			// states of their slides (past/present/future)
			toArray( dom.background.childNodes ).forEach( function( backgroundh, h ) {
	
				if( h < indexh ) {
					backgroundh.className = 'slide-background ' + horizontalPast;
				}
				else if ( h > indexh ) {
					backgroundh.className = 'slide-background ' + horizontalFuture;
				}
				else {
					backgroundh.className = 'slide-background present';
	
					// Store a reference to the current background element
					currentBackground = backgroundh;
				}
	
				if( includeAll || h === indexh ) {
					toArray( backgroundh.childNodes ).forEach( function( backgroundv, v ) {
	
						if( v < indexv ) {
							backgroundv.className = 'slide-background past';
						}
						else if ( v > indexv ) {
							backgroundv.className = 'slide-background future';
						}
						else {
							backgroundv.className = 'slide-background present';
	
							// Only if this is the present horizontal and vertical slide
							if( h === indexh ) currentBackground = backgroundv;
						}
	
					} );
				}
	
			} );
	
			// Don't transition between identical backgrounds. This
			// prevents unwanted flicker.
			if( currentBackground ) {
				var previousBackgroundHash = previousBackground ? previousBackground.getAttribute( 'data-background-hash' ) : null;
				var currentBackgroundHash = currentBackground.getAttribute( 'data-background-hash' );
				if( currentBackgroundHash && currentBackgroundHash === previousBackgroundHash && currentBackground !== previousBackground ) {
					dom.background.classList.add( 'no-transition' );
				}
	
				previousBackground = currentBackground;
			}
	
			// Allow the first background to apply without transition
			setTimeout( function() {
				dom.background.classList.remove( 'no-transition' );
			}, 1 );
	
		}
	
		/**
		 * Updates the position of the parallax background based
		 * on the current slide index.
		 */
		function updateParallax() {
	
			if( config.parallaxBackgroundImage ) {
	
				var horizontalSlides = document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ),
					verticalSlides = document.querySelectorAll( VERTICAL_SLIDES_SELECTOR );
	
				var backgroundSize = dom.background.style.backgroundSize.split( ' ' ),
					backgroundWidth, backgroundHeight;
	
				if( backgroundSize.length === 1 ) {
					backgroundWidth = backgroundHeight = parseInt( backgroundSize[0], 10 );
				}
				else {
					backgroundWidth = parseInt( backgroundSize[0], 10 );
					backgroundHeight = parseInt( backgroundSize[1], 10 );
				}
	
				var slideWidth = dom.background.offsetWidth;
				var horizontalSlideCount = horizontalSlides.length;
				var horizontalOffset = -( backgroundWidth - slideWidth ) / ( horizontalSlideCount-1 ) * indexh;
	
				var slideHeight = dom.background.offsetHeight;
				var verticalSlideCount = verticalSlides.length;
				var verticalOffset = verticalSlideCount > 0 ? -( backgroundHeight - slideHeight ) / ( verticalSlideCount-1 ) * indexv : 0;
	
				dom.background.style.backgroundPosition = horizontalOffset + 'px ' + verticalOffset + 'px';
	
			}
	
		}
	
		/**
		 * Determine what available routes there are for navigation.
		 *
		 * @return {Object} containing four booleans: left/right/up/down
		 */
		function availableRoutes() {
	
			var horizontalSlides = document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ),
				verticalSlides = document.querySelectorAll( VERTICAL_SLIDES_SELECTOR );
	
			var routes = {
				left: indexh > 0 || config.loop,
				right: indexh < horizontalSlides.length - 1 || config.loop,
				up: indexv > 0,
				down: indexv < verticalSlides.length - 1
			};
	
			// reverse horizontal controls for rtl
			if( config.rtl ) {
				var left = routes.left;
				routes.left = routes.right;
				routes.right = left;
			}
	
			return routes;
	
		}
	
		/**
		 * Returns an object describing the available fragment
		 * directions.
		 *
		 * @return {Object} two boolean properties: prev/next
		 */
		function availableFragments() {
	
			if( currentSlide && config.fragments ) {
				var fragments = currentSlide.querySelectorAll( '.fragment' );
				var hiddenFragments = currentSlide.querySelectorAll( '.fragment:not(.visible)' );
	
				return {
					prev: fragments.length - hiddenFragments.length > 0,
					next: !!hiddenFragments.length
				};
			}
			else {
				return { prev: false, next: false };
			}
	
		}
	
		/**
		 * Start playback of any embedded content inside of
		 * the targeted slide.
		 */
		function startEmbeddedContent( slide ) {
	
			if( slide && !isSpeakerNotes() ) {
				// HTML5 media elements
				toArray( slide.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
					if( el.hasAttribute( 'data-autoplay' ) ) {
						el.play();
					}
				} );
	
				// iframe embeds
				toArray( slide.querySelectorAll( 'iframe' ) ).forEach( function( el ) {
					el.contentWindow.postMessage( 'slide:start', '*' );
				});
	
				// YouTube embeds
				toArray( slide.querySelectorAll( 'iframe[src*="youtube.com/embed/"]' ) ).forEach( function( el ) {
					if( el.hasAttribute( 'data-autoplay' ) ) {
						el.contentWindow.postMessage( '{"event":"command","func":"playVideo","args":""}', '*' );
					}
				});
			}
	
		}
	
		/**
		 * Stop playback of any embedded content inside of
		 * the targeted slide.
		 */
		function stopEmbeddedContent( slide ) {
	
			if( slide ) {
				// HTML5 media elements
				toArray( slide.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
					if( !el.hasAttribute( 'data-ignore' ) ) {
						el.pause();
					}
				} );
	
				// iframe embeds
				toArray( slide.querySelectorAll( 'iframe' ) ).forEach( function( el ) {
					el.contentWindow.postMessage( 'slide:stop', '*' );
				});
	
				// YouTube embeds
				toArray( slide.querySelectorAll( 'iframe[src*="youtube.com/embed/"]' ) ).forEach( function( el ) {
					if( !el.hasAttribute( 'data-ignore' ) && typeof el.contentWindow.postMessage === 'function' ) {
						el.contentWindow.postMessage( '{"event":"command","func":"pauseVideo","args":""}', '*' );
					}
				});
			}
	
		}
	
		/**
		 * Checks if this presentation is running inside of the
		 * speaker notes window.
		 */
		function isSpeakerNotes() {
	
			return !!window.location.search.match( /receiver/gi );
	
		}
	
		/**
		 * Reads the current URL (hash) and navigates accordingly.
		 */
		function readURL() {
	
			var hash = window.location.hash;
	
			// Attempt to parse the hash as either an index or name
			var bits = hash.slice( 2 ).split( '/' ),
				name = hash.replace( /#|\//gi, '' );
	
			// If the first bit is invalid and there is a name we can
			// assume that this is a named link
			if( isNaN( parseInt( bits[0], 10 ) ) && name.length ) {
				// Find the slide with the specified name
				var element = document.querySelector( '#' + name );
	
				if( element ) {
					// Find the position of the named slide and navigate to it
					var indices = Reveal.getIndices( element );
					slide( indices.h, indices.v );
				}
				// If the slide doesn't exist, navigate to the current slide
				else {
					slide( indexh || 0, indexv || 0 );
				}
			}
			else {
				// Read the index components of the hash
				var h = parseInt( bits[0], 10 ) || 0,
					v = parseInt( bits[1], 10 ) || 0;
	
				if( h !== indexh || v !== indexv ) {
					slide( h, v );
				}
			}
	
		}
	
		/**
		 * Updates the page URL (hash) to reflect the current
		 * state.
		 *
		 * @param {Number} delay The time in ms to wait before
		 * writing the hash
		 */
		function writeURL( delay ) {
	
			if( config.history ) {
	
				// Make sure there's never more than one timeout running
				clearTimeout( writeURLTimeout );
	
				// If a delay is specified, timeout this call
				if( typeof delay === 'number' ) {
					writeURLTimeout = setTimeout( writeURL, delay );
				}
				else {
					var url = '/';
	
					// If the current slide has an ID, use that as a named link
					if( currentSlide && typeof currentSlide.getAttribute( 'id' ) === 'string' ) {
						url = '/' + currentSlide.getAttribute( 'id' );
					}
					// Otherwise use the /h/v index
					else {
						if( indexh > 0 || indexv > 0 ) url += indexh;
						if( indexv > 0 ) url += '/' + indexv;
					}
	
					window.location.hash = url;
				}
			}
	
		}
	
		/**
		 * Retrieves the h/v location of the current, or specified,
		 * slide.
		 *
		 * @param {HTMLElement} slide If specified, the returned
		 * index will be for this slide rather than the currently
		 * active one
		 *
		 * @return {Object} { h: <int>, v: <int>, f: <int> }
		 */
		function getIndices( slide ) {
	
			// By default, return the current indices
			var h = indexh,
				v = indexv,
				f;
	
			// If a slide is specified, return the indices of that slide
			if( slide ) {
				var isVertical = isVerticalSlide( slide );
				var slideh = isVertical ? slide.parentNode : slide;
	
				// Select all horizontal slides
				var horizontalSlides = toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) );
	
				// Now that we know which the horizontal slide is, get its index
				h = Math.max( horizontalSlides.indexOf( slideh ), 0 );
	
				// If this is a vertical slide, grab the vertical index
				if( isVertical ) {
					v = Math.max( toArray( slide.parentNode.querySelectorAll( 'section' ) ).indexOf( slide ), 0 );
				}
			}
	
			if( !slide && currentSlide ) {
				var hasFragments = currentSlide.querySelectorAll( '.fragment' ).length > 0;
				if( hasFragments ) {
					var visibleFragments = currentSlide.querySelectorAll( '.fragment.visible' );
					f = visibleFragments.length - 1;
				}
			}
	
			return { h: h, v: v, f: f };
	
		}
	
		/**
		 * Return a sorted fragments list, ordered by an increasing
		 * "data-fragment-index" attribute.
		 *
		 * Fragments will be revealed in the order that they are returned by
		 * this function, so you can use the index attributes to control the
		 * order of fragment appearance.
		 *
		 * To maintain a sensible default fragment order, fragments are presumed
		 * to be passed in document order. This function adds a "fragment-index"
		 * attribute to each node if such an attribute is not already present,
		 * and sets that attribute to an integer value which is the position of
		 * the fragment within the fragments list.
		 */
		function sortFragments( fragments ) {
	
			fragments = toArray( fragments );
	
			var ordered = [],
				unordered = [],
				sorted = [];
	
			// Group ordered and unordered elements
			fragments.forEach( function( fragment, i ) {
				if( fragment.hasAttribute( 'data-fragment-index' ) ) {
					var index = parseInt( fragment.getAttribute( 'data-fragment-index' ), 10 );
	
					if( !ordered[index] ) {
						ordered[index] = [];
					}
	
					ordered[index].push( fragment );
				}
				else {
					unordered.push( [ fragment ] );
				}
			} );
	
			// Append fragments without explicit indices in their
			// DOM order
			ordered = ordered.concat( unordered );
	
			// Manually count the index up per group to ensure there
			// are no gaps
			var index = 0;
	
			// Push all fragments in their sorted order to an array,
			// this flattens the groups
			ordered.forEach( function( group ) {
				group.forEach( function( fragment ) {
					sorted.push( fragment );
					fragment.setAttribute( 'data-fragment-index', index );
				} );
	
				index ++;
			} );
	
			return sorted;
	
		}
	
		/**
		 * Navigate to the specified slide fragment.
		 *
		 * @param {Number} index The index of the fragment that
		 * should be shown, -1 means all are invisible
		 * @param {Number} offset Integer offset to apply to the
		 * fragment index
		 *
		 * @return {Boolean} true if a change was made in any
		 * fragments visibility as part of this call
		 */
		function navigateFragment( index, offset ) {
	
			if( currentSlide && config.fragments ) {
	
				var fragments = sortFragments( currentSlide.querySelectorAll( '.fragment' ) );
				if( fragments.length ) {
	
					// If no index is specified, find the current
					if( typeof index !== 'number' ) {
						var lastVisibleFragment = sortFragments( currentSlide.querySelectorAll( '.fragment.visible' ) ).pop();
	
						if( lastVisibleFragment ) {
							index = parseInt( lastVisibleFragment.getAttribute( 'data-fragment-index' ) || 0, 10 );
						}
						else {
							index = -1;
						}
					}
	
					// If an offset is specified, apply it to the index
					if( typeof offset === 'number' ) {
						index += offset;
					}
	
					var fragmentsShown = [],
						fragmentsHidden = [];
	
					toArray( fragments ).forEach( function( element, i ) {
	
						if( element.hasAttribute( 'data-fragment-index' ) ) {
							i = parseInt( element.getAttribute( 'data-fragment-index' ), 10 );
						}
	
						// Visible fragments
						if( i <= index ) {
							if( !element.classList.contains( 'visible' ) ) fragmentsShown.push( element );
							element.classList.add( 'visible' );
							element.classList.remove( 'current-fragment' );
	
							if( i === index ) {
								element.classList.add( 'current-fragment' );
							}
						}
						// Hidden fragments
						else {
							if( element.classList.contains( 'visible' ) ) fragmentsHidden.push( element );
							element.classList.remove( 'visible' );
							element.classList.remove( 'current-fragment' );
						}
	
	
					} );
	
					if( fragmentsHidden.length ) {
						dispatchEvent( 'fragmenthidden', { fragment: fragmentsHidden[0], fragments: fragmentsHidden } );
					}
	
					if( fragmentsShown.length ) {
						dispatchEvent( 'fragmentshown', { fragment: fragmentsShown[0], fragments: fragmentsShown } );
					}
	
					updateControls();
	
					return !!( fragmentsShown.length || fragmentsHidden.length );
	
				}
	
			}
	
			return false;
	
		}
	
		/**
		 * Navigate to the next slide fragment.
		 *
		 * @return {Boolean} true if there was a next fragment,
		 * false otherwise
		 */
		function nextFragment() {
	
			return navigateFragment( null, 1 );
	
		}
	
		/**
		 * Navigate to the previous slide fragment.
		 *
		 * @return {Boolean} true if there was a previous fragment,
		 * false otherwise
		 */
		function previousFragment() {
	
			return navigateFragment( null, -1 );
	
		}
	
		/**
		 * Cues a new automated slide if enabled in the config.
		 */
		function cueAutoSlide() {
	
			cancelAutoSlide();
	
			if( currentSlide ) {
	
				var parentAutoSlide = currentSlide.parentNode ? currentSlide.parentNode.getAttribute( 'data-autoslide' ) : null;
				var slideAutoSlide = currentSlide.getAttribute( 'data-autoslide' );
	
				// Pick value in the following priority order:
				// 1. Current slide's data-autoslide
				// 2. Parent slide's data-autoslide
				// 3. Global autoSlide setting
				if( slideAutoSlide ) {
					autoSlide = parseInt( slideAutoSlide, 10 );
				}
				else if( parentAutoSlide ) {
					autoSlide = parseInt( parentAutoSlide, 10 );
				}
				else {
					autoSlide = config.autoSlide;
				}
	
				// If there are media elements with data-autoplay,
				// automatically set the autoSlide duration to the
				// length of that media
				toArray( currentSlide.querySelectorAll( 'video, audio' ) ).forEach( function( el ) {
					if( el.hasAttribute( 'data-autoplay' ) ) {
						if( autoSlide && el.duration * 1000 > autoSlide ) {
							autoSlide = ( el.duration * 1000 ) + 1000;
						}
					}
				} );
	
				// Cue the next auto-slide if:
				// - There is an autoSlide value
				// - Auto-sliding isn't paused by the user
				// - The presentation isn't paused
				// - The overview isn't active
				// - The presentation isn't over
				if( autoSlide && !autoSlidePaused && !isPaused() && !isOverview() && ( !Reveal.isLastSlide() || config.loop === true ) ) {
					autoSlideTimeout = setTimeout( navigateNext, autoSlide );
					autoSlideStartTime = Date.now();
				}
	
				if( autoSlidePlayer ) {
					autoSlidePlayer.setPlaying( autoSlideTimeout !== -1 );
				}
	
			}
	
		}
	
		/**
		 * Cancels any ongoing request to auto-slide.
		 */
		function cancelAutoSlide() {
	
			clearTimeout( autoSlideTimeout );
			autoSlideTimeout = -1;
	
		}
	
		function pauseAutoSlide() {
	
			autoSlidePaused = true;
			clearTimeout( autoSlideTimeout );
	
			if( autoSlidePlayer ) {
				autoSlidePlayer.setPlaying( false );
			}
	
		}
	
		function resumeAutoSlide() {
	
			autoSlidePaused = false;
			cueAutoSlide();
	
		}
	
		function navigateLeft() {
	
			// Reverse for RTL
			if( config.rtl ) {
				if( ( isOverview() || nextFragment() === false ) && availableRoutes().left ) {
					slide( indexh + 1 );
				}
			}
			// Normal navigation
			else if( ( isOverview() || previousFragment() === false ) && availableRoutes().left ) {
				slide( indexh - 1 );
			}
	
		}
	
		function navigateRight() {
	
			// Reverse for RTL
			if( config.rtl ) {
				if( ( isOverview() || previousFragment() === false ) && availableRoutes().right ) {
					slide( indexh - 1 );
				}
			}
			// Normal navigation
			else if( ( isOverview() || nextFragment() === false ) && availableRoutes().right ) {
				slide( indexh + 1 );
			}
	
		}
	
		function navigateUp() {
	
			// Prioritize hiding fragments
			if( ( isOverview() || previousFragment() === false ) && availableRoutes().up ) {
				slide( indexh, indexv - 1 );
			}
	
		}
	
		function navigateDown() {
	
			// Prioritize revealing fragments
			if( ( isOverview() || nextFragment() === false ) && availableRoutes().down ) {
				slide( indexh, indexv + 1 );
			}
	
		}
	
		/**
		 * Navigates backwards, prioritized in the following order:
		 * 1) Previous fragment
		 * 2) Previous vertical slide
		 * 3) Previous horizontal slide
		 */
		function navigatePrev() {
	
			// Prioritize revealing fragments
			if( previousFragment() === false ) {
				if( availableRoutes().up ) {
					navigateUp();
				}
				else {
					// Fetch the previous horizontal slide, if there is one
					var previousSlide = document.querySelector( HORIZONTAL_SLIDES_SELECTOR + '.past:nth-child(' + indexh + ')' );
	
					if( previousSlide ) {
						var v = ( previousSlide.querySelectorAll( 'section' ).length - 1 ) || undefined;
						var h = indexh - 1;
						slide( h, v );
					}
				}
			}
	
		}
	
		/**
		 * Same as #navigatePrev() but navigates forwards.
		 */
		function navigateNext() {
	
			// Prioritize revealing fragments
			if( nextFragment() === false ) {
				availableRoutes().down ? navigateDown() : navigateRight();
			}
	
			// If auto-sliding is enabled we need to cue up
			// another timeout
			cueAutoSlide();
	
		}
	
	
		// --------------------------------------------------------------------//
		// ----------------------------- EVENTS -------------------------------//
		// --------------------------------------------------------------------//
	
		/**
		 * Called by all event handlers that are based on user
		 * input.
		 */
		function onUserInput( event ) {
	
			if( config.autoSlideStoppable ) {
				pauseAutoSlide();
			}
	
		}
	
		/**
		 * Handler for the document level 'keydown' event.
		 */
		function onDocumentKeyDown( event ) {
	
			onUserInput( event );
	
			// Check if there's a focused element that could be using
			// the keyboard
			var activeElement = document.activeElement;
			var hasFocus = !!( document.activeElement && ( document.activeElement.type || document.activeElement.href || document.activeElement.contentEditable !== 'inherit' ) );
	
			// Disregard the event if there's a focused element or a
			// keyboard modifier key is present
			if( hasFocus || (event.shiftKey && event.keyCode !== 32) || event.altKey || event.ctrlKey || event.metaKey ) return;
	
			// While paused only allow "unpausing" keyboard events (b and .)
			if( isPaused() && [66,190,191].indexOf( event.keyCode ) === -1 ) {
				return false;
			}
	
			var triggered = false;
	
			// 1. User defined key bindings
			if( typeof config.keyboard === 'object' ) {
	
				for( var key in config.keyboard ) {
	
					// Check if this binding matches the pressed key
					if( parseInt( key, 10 ) === event.keyCode ) {
	
						var value = config.keyboard[ key ];
	
						// Callback function
						if( typeof value === 'function' ) {
							value.apply( null, [ event ] );
						}
						// String shortcuts to reveal.js API
						else if( typeof value === 'string' && typeof Reveal[ value ] === 'function' ) {
							Reveal[ value ].call();
						}
	
						triggered = true;
	
					}
	
				}
	
			}
	
			// 2. System defined key bindings
			if( triggered === false ) {
	
				// Assume true and try to prove false
				triggered = true;
	
				switch( event.keyCode ) {
					// p, page up
					case 80: case 33: navigatePrev(); break;
					// n, page down
					case 78: case 34: navigateNext(); break;
					// h, left
					case 72: case 37: navigateLeft(); break;
					// l, right
					case 76: case 39: navigateRight(); break;
					// k, up
					case 75: case 38: navigateUp(); break;
					// j, down
					case 74: case 40: navigateDown(); break;
					// home
					case 36: slide( 0 ); break;
					// end
					case 35: slide( Number.MAX_VALUE ); break;
					// space
					case 32: isOverview() ? deactivateOverview() : event.shiftKey ? navigatePrev() : navigateNext(); break;
					// return
					case 13: isOverview() ? deactivateOverview() : triggered = false; break;
					// b, period, Logitech presenter tools "black screen" button
					case 66: case 190: case 191: togglePause(); break;
					// f
					case 70: enterFullscreen(); break;
					default:
						triggered = false;
				}
	
			}
	
			// If the input resulted in a triggered action we should prevent
			// the browsers default behavior
			if( triggered ) {
				event.preventDefault();
			}
			// ESC or O key
			else if ( ( event.keyCode === 27 || event.keyCode === 79 ) && features.transforms3d ) {
				if( dom.preview ) {
					closePreview();
				}
				else {
					toggleOverview();
				}
	
				event.preventDefault();
			}
	
			// If auto-sliding is enabled we need to cue up
			// another timeout
			cueAutoSlide();
	
		}
	
		/**
		 * Handler for the 'touchstart' event, enables support for
		 * swipe and pinch gestures.
		 */
		function onTouchStart( event ) {
	
			touch.startX = event.touches[0].clientX;
			touch.startY = event.touches[0].clientY;
			touch.startCount = event.touches.length;
	
			// If there's two touches we need to memorize the distance
			// between those two points to detect pinching
			if( event.touches.length === 2 && config.overview ) {
				touch.startSpan = distanceBetween( {
					x: event.touches[1].clientX,
					y: event.touches[1].clientY
				}, {
					x: touch.startX,
					y: touch.startY
				} );
			}
	
		}
	
		/**
		 * Handler for the 'touchmove' event.
		 */
		function onTouchMove( event ) {
	
			// Each touch should only trigger one action
			if( !touch.captured ) {
				onUserInput( event );
	
				var currentX = event.touches[0].clientX;
				var currentY = event.touches[0].clientY;
	
				// If the touch started with two points and still has
				// two active touches; test for the pinch gesture
				if( event.touches.length === 2 && touch.startCount === 2 && config.overview ) {
	
					// The current distance in pixels between the two touch points
					var currentSpan = distanceBetween( {
						x: event.touches[1].clientX,
						y: event.touches[1].clientY
					}, {
						x: touch.startX,
						y: touch.startY
					} );
	
					// If the span is larger than the desire amount we've got
					// ourselves a pinch
					if( Math.abs( touch.startSpan - currentSpan ) > touch.threshold ) {
						touch.captured = true;
	
						if( currentSpan < touch.startSpan ) {
							activateOverview();
						}
						else {
							deactivateOverview();
						}
					}
	
					event.preventDefault();
	
				}
				// There was only one touch point, look for a swipe
				else if( event.touches.length === 1 && touch.startCount !== 2 ) {
	
					var deltaX = currentX - touch.startX,
						deltaY = currentY - touch.startY;
	
					if( deltaX > touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
						touch.captured = true;
						navigateLeft();
					}
					else if( deltaX < -touch.threshold && Math.abs( deltaX ) > Math.abs( deltaY ) ) {
						touch.captured = true;
						navigateRight();
					}
					else if( deltaY > touch.threshold ) {
						touch.captured = true;
						navigateUp();
					}
					else if( deltaY < -touch.threshold ) {
						touch.captured = true;
						navigateDown();
					}
	
					// If we're embedded, only block touch events if they have
					// triggered an action
					if( config.embedded ) {
						if( touch.captured || isVerticalSlide( currentSlide ) ) {
							event.preventDefault();
						}
					}
					// Not embedded? Block them all to avoid needless tossing
					// around of the viewport in iOS
					else {
						event.preventDefault();
					}
	
				}
			}
			// There's a bug with swiping on some Android devices unless
			// the default action is always prevented
			else if( navigator.userAgent.match( /android/gi ) ) {
				event.preventDefault();
			}
	
		}
	
		/**
		 * Handler for the 'touchend' event.
		 */
		function onTouchEnd( event ) {
	
			touch.captured = false;
	
		}
	
		/**
		 * Convert pointer down to touch start.
		 */
		function onPointerDown( event ) {
	
			if( event.pointerType === event.MSPOINTER_TYPE_TOUCH ) {
				event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
				onTouchStart( event );
			}
	
		}
	
		/**
		 * Convert pointer move to touch move.
		 */
		function onPointerMove( event ) {
	
			if( event.pointerType === event.MSPOINTER_TYPE_TOUCH ) {
				event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
				onTouchMove( event );
			}
	
		}
	
		/**
		 * Convert pointer up to touch end.
		 */
		function onPointerUp( event ) {
	
			if( event.pointerType === event.MSPOINTER_TYPE_TOUCH ) {
				event.touches = [{ clientX: event.clientX, clientY: event.clientY }];
				onTouchEnd( event );
			}
	
		}
	
		/**
		 * Handles mouse wheel scrolling, throttled to avoid skipping
		 * multiple slides.
		 */
		function onDocumentMouseScroll( event ) {
	
			if( Date.now() - lastMouseWheelStep > 600 ) {
	
				lastMouseWheelStep = Date.now();
	
				var delta = event.detail || -event.wheelDelta;
				if( delta > 0 ) {
					navigateNext();
				}
				else {
					navigatePrev();
				}
	
			}
	
		}
	
		/**
		 * Clicking on the progress bar results in a navigation to the
		 * closest approximate horizontal slide using this equation:
		 *
		 * ( clickX / presentationWidth ) * numberOfSlides
		 */
		function onProgressClicked( event ) {
	
			onUserInput( event );
	
			event.preventDefault();
	
			var slidesTotal = toArray( document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR ) ).length;
			var slideIndex = Math.floor( ( event.clientX / dom.wrapper.offsetWidth ) * slidesTotal );
	
			slide( slideIndex );
	
		}
	
		/**
		 * Event handler for navigation control buttons.
		 */
		function onNavigateLeftClicked( event ) { event.preventDefault(); onUserInput(); navigateLeft(); }
		function onNavigateRightClicked( event ) { event.preventDefault(); onUserInput(); navigateRight(); }
		function onNavigateUpClicked( event ) { event.preventDefault(); onUserInput(); navigateUp(); }
		function onNavigateDownClicked( event ) { event.preventDefault(); onUserInput(); navigateDown(); }
		function onNavigatePrevClicked( event ) { event.preventDefault(); onUserInput(); navigatePrev(); }
		function onNavigateNextClicked( event ) { event.preventDefault(); onUserInput(); navigateNext(); }
	
		/**
		 * Handler for the window level 'hashchange' event.
		 */
		function onWindowHashChange( event ) {
	
			readURL();
	
		}
	
		/**
		 * Handler for the window level 'resize' event.
		 */
		function onWindowResize( event ) {
	
			layout();
	
		}
	
		/**
		 * Handle for the window level 'visibilitychange' event.
		 */
		function onPageVisibilityChange( event ) {
	
			var isHidden =  document.webkitHidden ||
							document.msHidden ||
							document.hidden;
	
			// If, after clicking a link or similar and we're coming back,
			// focus the document.body to ensure we can use keyboard shortcuts
			if( isHidden === false && document.activeElement !== document.body ) {
				document.activeElement.blur();
				document.body.focus();
			}
	
		}
	
		/**
		 * Invoked when a slide is and we're in the overview.
		 */
		function onOverviewSlideClicked( event ) {
	
			// TODO There's a bug here where the event listeners are not
			// removed after deactivating the overview.
			if( eventsAreBound && isOverview() ) {
				event.preventDefault();
	
				var element = event.target;
	
				while( element && !element.nodeName.match( /section/gi ) ) {
					element = element.parentNode;
				}
	
				if( element && !element.classList.contains( 'disabled' ) ) {
	
					deactivateOverview();
	
					if( element.nodeName.match( /section/gi ) ) {
						var h = parseInt( element.getAttribute( 'data-index-h' ), 10 ),
							v = parseInt( element.getAttribute( 'data-index-v' ), 10 );
	
						slide( h, v );
					}
	
				}
			}
	
		}
	
		/**
		 * Handles clicks on links that are set to preview in the
		 * iframe overlay.
		 */
		function onPreviewLinkClicked( event ) {
	
			var url = event.target.getAttribute( 'href' );
			if( url ) {
				openPreview( url );
				event.preventDefault();
			}
	
		}
	
		/**
		 * Handles click on the auto-sliding controls element.
		 */
		function onAutoSlidePlayerClick( event ) {
	
			// Replay
			if( Reveal.isLastSlide() && config.loop === false ) {
				slide( 0, 0 );
				resumeAutoSlide();
			}
			// Resume
			else if( autoSlidePaused ) {
				resumeAutoSlide();
			}
			// Pause
			else {
				pauseAutoSlide();
			}
	
		}
	
	
		// --------------------------------------------------------------------//
		// ------------------------ PLAYBACK COMPONENT ------------------------//
		// --------------------------------------------------------------------//
	
	
		/**
		 * Constructor for the playback component, which displays
		 * play/pause/progress controls.
		 *
		 * @param {HTMLElement} container The component will append
		 * itself to this
		 * @param {Function} progressCheck A method which will be
		 * called frequently to get the current progress on a range
		 * of 0-1
		 */
		function Playback( container, progressCheck ) {
	
			// Cosmetics
			this.diameter = 50;
			this.thickness = 3;
	
			// Flags if we are currently playing
			this.playing = false;
	
			// Current progress on a 0-1 range
			this.progress = 0;
	
			// Used to loop the animation smoothly
			this.progressOffset = 1;
	
			this.container = container;
			this.progressCheck = progressCheck;
	
			this.canvas = document.createElement( 'canvas' );
			this.canvas.className = 'playback';
			this.canvas.width = this.diameter;
			this.canvas.height = this.diameter;
			this.context = this.canvas.getContext( '2d' );
	
			this.container.appendChild( this.canvas );
	
			this.render();
	
		}
	
		Playback.prototype.setPlaying = function( value ) {
	
			var wasPlaying = this.playing;
	
			this.playing = value;
	
			// Start repainting if we weren't already
			if( !wasPlaying && this.playing ) {
				this.animate();
			}
			else {
				this.render();
			}
	
		};
	
		Playback.prototype.animate = function() {
	
			var progressBefore = this.progress;
	
			this.progress = this.progressCheck();
	
			// When we loop, offset the progress so that it eases
			// smoothly rather than immediately resetting
			if( progressBefore > 0.8 && this.progress < 0.2 ) {
				this.progressOffset = this.progress;
			}
	
			this.render();
	
			if( this.playing ) {
				features.requestAnimationFrameMethod.call( window, this.animate.bind( this ) );
			}
	
		};
	
		/**
		 * Renders the current progress and playback state.
		 */
		Playback.prototype.render = function() {
	
			var progress = this.playing ? this.progress : 0,
				radius = ( this.diameter / 2 ) - this.thickness,
				x = this.diameter / 2,
				y = this.diameter / 2,
				iconSize = 14;
	
			// Ease towards 1
			this.progressOffset += ( 1 - this.progressOffset ) * 0.1;
	
			var endAngle = ( - Math.PI / 2 ) + ( progress * ( Math.PI * 2 ) );
			var startAngle = ( - Math.PI / 2 ) + ( this.progressOffset * ( Math.PI * 2 ) );
	
			this.context.save();
			this.context.clearRect( 0, 0, this.diameter, this.diameter );
	
			// Solid background color
			this.context.beginPath();
			this.context.arc( x, y, radius + 2, 0, Math.PI * 2, false );
			this.context.fillStyle = 'rgba( 0, 0, 0, 0.4 )';
			this.context.fill();
	
			// Draw progress track
			this.context.beginPath();
			this.context.arc( x, y, radius, 0, Math.PI * 2, false );
			this.context.lineWidth = this.thickness;
			this.context.strokeStyle = '#666';
			this.context.stroke();
	
			if( this.playing ) {
				// Draw progress on top of track
				this.context.beginPath();
				this.context.arc( x, y, radius, startAngle, endAngle, false );
				this.context.lineWidth = this.thickness;
				this.context.strokeStyle = '#fff';
				this.context.stroke();
			}
	
			this.context.translate( x - ( iconSize / 2 ), y - ( iconSize / 2 ) );
	
			// Draw play/pause icons
			if( this.playing ) {
				this.context.fillStyle = '#fff';
				this.context.fillRect( 0, 0, iconSize / 2 - 2, iconSize );
				this.context.fillRect( iconSize / 2 + 2, 0, iconSize / 2 - 2, iconSize );
			}
			else {
				this.context.beginPath();
				this.context.translate( 2, 0 );
				this.context.moveTo( 0, 0 );
				this.context.lineTo( iconSize - 2, iconSize / 2 );
				this.context.lineTo( 0, iconSize );
				this.context.fillStyle = '#fff';
				this.context.fill();
			}
	
			this.context.restore();
	
		};
	
		Playback.prototype.on = function( type, listener ) {
			this.canvas.addEventListener( type, listener, false );
		};
	
		Playback.prototype.off = function( type, listener ) {
			this.canvas.removeEventListener( type, listener, false );
		};
	
		Playback.prototype.destroy = function() {
	
			this.playing = false;
	
			if( this.canvas.parentNode ) {
				this.container.removeChild( this.canvas );
			}
	
		};
	
	
		// --------------------------------------------------------------------//
		// ------------------------------- API --------------------------------//
		// --------------------------------------------------------------------//
	
	
		return {
			initialize: initialize,
			configure: configure,
			sync: sync,
	
			// Navigation methods
			slide: slide,
			left: navigateLeft,
			right: navigateRight,
			up: navigateUp,
			down: navigateDown,
			prev: navigatePrev,
			next: navigateNext,
	
			// Fragment methods
			navigateFragment: navigateFragment,
			prevFragment: previousFragment,
			nextFragment: nextFragment,
	
			// Deprecated aliases
			navigateTo: slide,
			navigateLeft: navigateLeft,
			navigateRight: navigateRight,
			navigateUp: navigateUp,
			navigateDown: navigateDown,
			navigatePrev: navigatePrev,
			navigateNext: navigateNext,
	
			// Forces an update in slide layout
			layout: layout,
	
			// Returns an object with the available routes as booleans (left/right/top/bottom)
			availableRoutes: availableRoutes,
	
			// Returns an object with the available fragments as booleans (prev/next)
			availableFragments: availableFragments,
	
			// Toggles the overview mode on/off
			toggleOverview: toggleOverview,
	
			// Toggles the "black screen" mode on/off
			togglePause: togglePause,
	
			// State checks
			isOverview: isOverview,
			isPaused: isPaused,
	
			// Adds or removes all internal event listeners (such as keyboard)
			addEventListeners: addEventListeners,
			removeEventListeners: removeEventListeners,
	
			// Returns the indices of the current, or specified, slide
			getIndices: getIndices,
	
			// Returns the slide at the specified index, y is optional
			getSlide: function( x, y ) {
				var horizontalSlide = document.querySelectorAll( HORIZONTAL_SLIDES_SELECTOR )[ x ];
				var verticalSlides = horizontalSlide && horizontalSlide.querySelectorAll( 'section' );
	
				if( typeof y !== 'undefined' ) {
					return verticalSlides ? verticalSlides[ y ] : undefined;
				}
	
				return horizontalSlide;
			},
	
			// Returns the previous slide element, may be null
			getPreviousSlide: function() {
				return previousSlide;
			},
	
			// Returns the current slide element
			getCurrentSlide: function() {
				return currentSlide;
			},
	
			// Returns the current scale of the presentation content
			getScale: function() {
				return scale;
			},
	
			// Returns the current configuration object
			getConfig: function() {
				return config;
			},
	
			// Helper method, retrieves query string as a key/value hash
			getQueryHash: function() {
				var query = {};
	
				location.search.replace( /[A-Z0-9]+?=([\w\.%-]*)/gi, function(a) {
					query[ a.split( '=' ).shift() ] = a.split( '=' ).pop();
				} );
	
				// Basic deserialization
				for( var i in query ) {
					var value = query[ i ];
	
					query[ i ] = unescape( value );
	
					if( value === 'null' ) query[ i ] = null;
					else if( value === 'true' ) query[ i ] = true;
					else if( value === 'false' ) query[ i ] = false;
					else if( value.match( /^\d+$/ ) ) query[ i ] = parseFloat( value );
				}
	
				return query;
			},
	
			// Returns true if we're currently on the first slide
			isFirstSlide: function() {
				return document.querySelector( SLIDES_SELECTOR + '.past' ) == null ? true : false;
			},
	
			// Returns true if we're currently on the last slide
			isLastSlide: function() {
				if( currentSlide ) {
					// Does this slide has next a sibling?
					if( currentSlide.nextElementSibling ) return false;
	
					// If it's vertical, does its parent have a next sibling?
					if( isVerticalSlide( currentSlide ) && currentSlide.parentNode.nextElementSibling ) return false;
	
					return true;
				}
	
				return false;
			},
	
			// Checks if reveal.js has been loaded and is ready for use
			isReady: function() {
				return loaded;
			},
	
			// Forward event binding to the reveal DOM element
			addEventListener: function( type, listener, useCapture ) {
				if( 'addEventListener' in window ) {
					( dom.wrapper || document.querySelector( '.reveal' ) ).addEventListener( type, listener, useCapture );
				}
			},
			removeEventListener: function( type, listener, useCapture ) {
				if( 'addEventListener' in window ) {
					( dom.wrapper || document.querySelector( '.reveal' ) ).removeEventListener( type, listener, useCapture );
				}
			}
		};
	
	})();
	
	module.exports = Reveal;

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(11, function() {
				var newContent = __webpack_require__(11);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(12, function() {
				var newContent = __webpack_require__(12);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(13, function() {
				var newContent = __webpack_require__(13);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(14, function() {
				var newContent = __webpack_require__(14);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 115 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map