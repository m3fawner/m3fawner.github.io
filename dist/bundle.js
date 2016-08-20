(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reveal = __webpack_require__(2);

	var _reveal2 = _interopRequireDefault(_reveal);

	var _slides = __webpack_require__(3);

	var _slides2 = _interopRequireDefault(_slides);

	var _index = __webpack_require__(7);

	var _index2 = _interopRequireDefault(_index);

	var _blood = __webpack_require__(9);

	var _blood2 = _interopRequireDefault(_blood);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_reveal2.default.initialize({
	  margin: 0.1,
	  minScale: 0.2,
	  maxScale: 1.5,
	  controlls: true,
	  progress: true,
	  keyboard: true,
	  fragments: true,
	  height: '100%',
	  width: '100%'
	});

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./slides.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./slides.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "#camponile {\r\n    height: 300px;\r\n    width: auto;\r\n}\r\n.intro img {\r\n    width: 95%;\r\n    height: auto;\r\n    border: none !important;\r\n}\r\n.who-am-i img {\r\n    max-height: 400px !important;\r\n}", ""]);

	// exports


/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "@charset \"UTF-8\";\n\n/*!\n * reveal.js\n * http://lab.hakim.se/reveal-js\n * MIT licensed\n *\n * Copyright (C) 2013 Hakim El Hattab, http://hakim.se\n */\n\n\n/*********************************************\n * RESET STYLES\n *********************************************/\n\nhtml, body, .reveal div, .reveal span, .reveal applet, .reveal object, .reveal iframe,\n.reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6, .reveal p, .reveal blockquote, .reveal pre,\n.reveal a, .reveal abbr, .reveal acronym, .reveal address, .reveal big, .reveal cite, .reveal code,\n.reveal del, .reveal dfn, .reveal em, .reveal img, .reveal ins, .reveal kbd, .reveal q, .reveal s, .reveal samp,\n.reveal small, .reveal strike, .reveal strong, .reveal sub, .reveal sup, .reveal tt, .reveal var,\n.reveal b, .reveal u, .reveal i, .reveal center,\n.reveal dl, .reveal dt, .reveal dd, .reveal ol, .reveal ul, .reveal li,\n.reveal fieldset, .reveal form, .reveal label, .reveal legend,\n.reveal table, .reveal caption, .reveal tbody, .reveal tfoot, .reveal thead, .reveal tr, .reveal th, .reveal td,\n.reveal article, .reveal aside, .reveal canvas, .reveal details, .reveal embed,\n.reveal figure, .reveal figcaption, .reveal footer, .reveal header, .reveal hgroup,\n.reveal menu, .reveal nav, .reveal output, .reveal ruby, .reveal section, .reveal summary,\n.reveal time, .reveal mark, .reveal audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n\n.reveal article, .reveal aside, .reveal details, .reveal figcaption, .reveal figure,\n.reveal footer, .reveal header, .reveal hgroup, .reveal menu, .reveal nav, .reveal section {\n\tdisplay: block;\n}\n\n\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\n\nhtml,\nbody {\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n}\n\nbody {\n\tposition: relative;\n\tline-height: 1;\n}\n\n::selection {\n\tbackground: #FF5E99;\n\tcolor: #fff;\n\ttext-shadow: none;\n}\n\n\n/*********************************************\n * HEADERS\n *********************************************/\n\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n\t-webkit-hyphens: auto;\n\t   -moz-hyphens: auto;\n\t        hyphens: auto;\n\n\tword-wrap: break-word;\n\tline-height: 1;\n}\n\n.reveal h1 { font-size: 3.77em; }\n.reveal h2 { font-size: 2.11em;\t}\n.reveal h3 { font-size: 1.55em;\t}\n.reveal h4 { font-size: 1em;\t}\n\n\n/*********************************************\n * VIEW FRAGMENTS\n *********************************************/\n\n.reveal .slides section .fragment {\n\topacity: 0;\n\n\t-webkit-transition: all .2s ease;\n\t   -moz-transition: all .2s ease;\n\t    -ms-transition: all .2s ease;\n\t     -o-transition: all .2s ease;\n\t        transition: all .2s ease;\n}\n\t.reveal .slides section .fragment.visible {\n\t\topacity: 1;\n\t}\n\n.reveal .slides section .fragment.grow {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.grow.visible {\n\t\t-webkit-transform: scale( 1.3 );\n\t\t   -moz-transform: scale( 1.3 );\n\t\t    -ms-transform: scale( 1.3 );\n\t\t     -o-transform: scale( 1.3 );\n\t\t        transform: scale( 1.3 );\n\t}\n\n.reveal .slides section .fragment.shrink {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.shrink.visible {\n\t\t-webkit-transform: scale( 0.7 );\n\t\t   -moz-transform: scale( 0.7 );\n\t\t    -ms-transform: scale( 0.7 );\n\t\t     -o-transform: scale( 0.7 );\n\t\t        transform: scale( 0.7 );\n\t}\n\n.reveal .slides section .fragment.zoom-in {\n\topacity: 0;\n\n\t-webkit-transform: scale( 0.1 );\n\t   -moz-transform: scale( 0.1 );\n\t    -ms-transform: scale( 0.1 );\n\t     -o-transform: scale( 0.1 );\n\t        transform: scale( 0.1 );\n}\n\n\t.reveal .slides section .fragment.zoom-in.visible {\n\t\topacity: 1;\n\n\t\t-webkit-transform: scale( 1 );\n\t\t   -moz-transform: scale( 1 );\n\t\t    -ms-transform: scale( 1 );\n\t\t     -o-transform: scale( 1 );\n\t\t        transform: scale( 1 );\n\t}\n\n.reveal .slides section .fragment.roll-in {\n\topacity: 0;\n\n\t-webkit-transform: rotateX( 90deg );\n\t   -moz-transform: rotateX( 90deg );\n\t    -ms-transform: rotateX( 90deg );\n\t     -o-transform: rotateX( 90deg );\n\t        transform: rotateX( 90deg );\n}\n\t.reveal .slides section .fragment.roll-in.visible {\n\t\topacity: 1;\n\n\t\t-webkit-transform: rotateX( 0 );\n\t\t   -moz-transform: rotateX( 0 );\n\t\t    -ms-transform: rotateX( 0 );\n\t\t     -o-transform: rotateX( 0 );\n\t\t        transform: rotateX( 0 );\n\t}\n\n.reveal .slides section .fragment.fade-out {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.fade-out.visible {\n\t\topacity: 0;\n\t}\n\n.reveal .slides section .fragment.semi-fade-out {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.semi-fade-out.visible {\n\t\topacity: 0.5;\n\t}\n\n.reveal .slides section .fragment.current-visible {\n\topacity:0;\n}\n\n.reveal .slides section .fragment.current-visible.current-fragment {\n\topacity:1;\n}\n\n.reveal .slides section .fragment.highlight-red,\n.reveal .slides section .fragment.highlight-current-red,\n.reveal .slides section .fragment.highlight-green,\n.reveal .slides section .fragment.highlight-current-green,\n.reveal .slides section .fragment.highlight-blue,\n.reveal .slides section .fragment.highlight-current-blue {\n\topacity: 1;\n}\n\t.reveal .slides section .fragment.highlight-red.visible {\n\t\tcolor: #ff2c2d\n\t}\n\t.reveal .slides section .fragment.highlight-green.visible {\n\t\tcolor: #17ff2e;\n\t}\n\t.reveal .slides section .fragment.highlight-blue.visible {\n\t\tcolor: #1b91ff;\n\t}\n\n.reveal .slides section .fragment.highlight-current-red.current-fragment {\n\tcolor: #ff2c2d\n}\n.reveal .slides section .fragment.highlight-current-green.current-fragment {\n\tcolor: #17ff2e;\n}\n.reveal .slides section .fragment.highlight-current-blue.current-fragment {\n\tcolor: #1b91ff;\n}\n\n\n/*********************************************\n * DEFAULT ELEMENT STYLES\n *********************************************/\n\n/* Fixes issue in Chrome where italic fonts did not appear when printing to PDF */\n.reveal:after {\n  content: '';\n  font-style: italic;\n}\n\n.reveal iframe {\n\tz-index: 1;\n}\n\n/* Ensure certain elements are never larger than the slide itself */\n.reveal img,\n.reveal video,\n.reveal iframe {\n\tmax-width: 95%;\n\tmax-height: 95%;\n}\n\n/** Prevents layering issues in certain browser/transition combinations */\n.reveal a {\n\tposition: relative;\n}\n\n.reveal strong,\n.reveal b {\n\tfont-weight: bold;\n}\n\n.reveal em,\n.reveal i {\n\tfont-style: italic;\n}\n\n.reveal ol,\n.reveal ul {\n\tdisplay: inline-block;\n\n\ttext-align: left;\n\tmargin: 0 0 0 1em;\n}\n\n.reveal ol {\n\tlist-style-type: decimal;\n}\n\n.reveal ul {\n\tlist-style-type: disc;\n}\n\n.reveal ul ul {\n\tlist-style-type: square;\n}\n\n.reveal ul ul ul {\n\tlist-style-type: circle;\n}\n\n.reveal ul ul,\n.reveal ul ol,\n.reveal ol ol,\n.reveal ol ul {\n\tdisplay: block;\n\tmargin-left: 40px;\n}\n\n.reveal p {\n\tmargin-bottom: 10px;\n\tline-height: 1.2em;\n}\n\n.reveal q,\n.reveal blockquote {\n\tquotes: none;\n}\n\n.reveal blockquote {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 70%;\n\tmargin: 5px auto;\n\tpadding: 5px;\n\n\tfont-style: italic;\n\tbackground: rgba(255, 255, 255, 0.05);\n\tbox-shadow: 0px 0px 2px rgba(0,0,0,0.2);\n}\n\t.reveal blockquote p:first-child,\n\t.reveal blockquote p:last-child {\n\t\tdisplay: inline-block;\n\t}\n\n.reveal q {\n\tfont-style: italic;\n}\n\n.reveal pre {\n\tdisplay: block;\n\tposition: relative;\n\twidth: 90%;\n\tmargin: 15px auto;\n\n\ttext-align: left;\n\tfont-size: 0.55em;\n\tfont-family: monospace;\n\tline-height: 1.2em;\n\n\tword-wrap: break-word;\n\n\tbox-shadow: 0px 0px 6px rgba(0,0,0,0.3);\n}\n.reveal code {\n\tfont-family: monospace;\n}\n.reveal pre code {\n\tpadding: 5px;\n\toverflow: auto;\n\tmax-height: 400px;\n\tword-wrap: normal;\n}\n.reveal pre.stretch code {\n\theight: 100%;\n\tmax-height: 100%;\n\n\t-webkit-box-sizing: border-box;\n\t   -moz-box-sizing: border-box;\n\t        box-sizing: border-box;\n}\n\n.reveal table th,\n.reveal table td {\n\ttext-align: left;\n\tpadding-right: .3em;\n}\n\n.reveal table th {\n\tfont-weight: bold;\n}\n\n.reveal sup {\n\tvertical-align: super;\n}\n.reveal sub {\n\tvertical-align: sub;\n}\n\n.reveal small {\n\tdisplay: inline-block;\n\tfont-size: 0.6em;\n\tline-height: 1.2em;\n\tvertical-align: top;\n}\n\n.reveal small * {\n\tvertical-align: top;\n}\n\n.reveal .stretch {\n\tmax-width: none;\n\tmax-height: none;\n}\n\n\n/*********************************************\n * CONTROLS\n *********************************************/\n\n.reveal .controls {\n\tdisplay: none;\n\tposition: fixed;\n\twidth: 110px;\n\theight: 110px;\n\tz-index: 30;\n\tright: 10px;\n\tbottom: 10px;\n}\n\n.reveal .controls div {\n\tposition: absolute;\n\topacity: 0.05;\n\twidth: 0;\n\theight: 0;\n\tborder: 12px solid transparent;\n\n\t-moz-transform: scale(.9999);\n\n\t-webkit-transition: all 0.2s ease;\n\t   -moz-transition: all 0.2s ease;\n\t    -ms-transition: all 0.2s ease;\n\t     -o-transition: all 0.2s ease;\n\t        transition: all 0.2s ease;\n}\n\n.reveal .controls div.enabled {\n\topacity: 0.7;\n\tcursor: pointer;\n}\n\n.reveal .controls div.enabled:active {\n\tmargin-top: 1px;\n}\n\n\t.reveal .controls div.navigate-left {\n\t\ttop: 42px;\n\n\t\tborder-right-width: 22px;\n\t\tborder-right-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-left.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\t.reveal .controls div.navigate-right {\n\t\tleft: 74px;\n\t\ttop: 42px;\n\n\t\tborder-left-width: 22px;\n\t\tborder-left-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-right.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\t.reveal .controls div.navigate-up {\n\t\tleft: 42px;\n\n\t\tborder-bottom-width: 22px;\n\t\tborder-bottom-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-up.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\t.reveal .controls div.navigate-down {\n\t\tleft: 42px;\n\t\ttop: 74px;\n\n\t\tborder-top-width: 22px;\n\t\tborder-top-color: #eee;\n\t}\n\t\t.reveal .controls div.navigate-down.fragmented {\n\t\t\topacity: 0.3;\n\t\t}\n\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n\n.reveal .progress {\n\tposition: fixed;\n\tdisplay: none;\n\theight: 3px;\n\twidth: 100%;\n\tbottom: 0;\n\tleft: 0;\n\tz-index: 10;\n}\n\t.reveal .progress:after {\n\t\tcontent: '';\n\t\tdisplay: 'block';\n\t\tposition: absolute;\n\t\theight: 20px;\n\t\twidth: 100%;\n\t\ttop: -20px;\n\t}\n\t.reveal .progress span {\n\t\tdisplay: block;\n\t\theight: 100%;\n\t\twidth: 0px;\n\n\t\t-webkit-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t   -moz-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t    -ms-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t     -o-transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t        transition: width 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t}\n\n/*********************************************\n * SLIDE NUMBER\n *********************************************/\n\n.reveal .slide-number {\n\tposition: fixed;\n\tdisplay: block;\n\tright: 15px;\n\tbottom: 15px;\n\topacity: 0.5;\n\tz-index: 31;\n\tfont-size: 12px;\n}\n\n/*********************************************\n * SLIDES\n *********************************************/\n\n.reveal {\n\tposition: relative;\n\twidth: 100%;\n\theight: 100%;\n\n\t-ms-touch-action: none;\n}\n\n.reveal .slides {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tleft: 50%;\n\ttop: 50%;\n\n\toverflow: visible;\n\tz-index: 1;\n\ttext-align: center;\n\n\t-webkit-transition: -webkit-perspective .4s ease;\n\t   -moz-transition: -moz-perspective .4s ease;\n\t    -ms-transition: -ms-perspective .4s ease;\n\t     -o-transition: -o-perspective .4s ease;\n\t        transition: perspective .4s ease;\n\n\t-webkit-perspective: 600px;\n\t   -moz-perspective: 600px;\n\t    -ms-perspective: 600px;\n\t        perspective: 600px;\n\n\t-webkit-perspective-origin: 0px -100px;\n\t   -moz-perspective-origin: 0px -100px;\n\t    -ms-perspective-origin: 0px -100px;\n\t        perspective-origin: 0px -100px;\n}\n\n.reveal .slides>section {\n\t-ms-perspective: 600px;\n}\n\n.reveal .slides>section,\n.reveal .slides>section>section {\n\tdisplay: none;\n\tposition: absolute;\n\twidth: 100%;\n\tpadding: 20px 0px;\n\n\tz-index: 10;\n\tline-height: 1.2em;\n\tfont-weight: inherit;\n\n\t-webkit-transform-style: preserve-3d;\n\t   -moz-transform-style: preserve-3d;\n\t    -ms-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\n\t-webkit-transition: -webkit-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-webkit-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t   -moz-transition: -moz-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-moz-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t    -ms-transition: -ms-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-ms-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t     -o-transition: -o-transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\t-o-transform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t        transition: transform-origin 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\ttransform 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\tvisibility 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985),\n\t\t\t\t\t\topacity 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n}\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"] .slides section {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal[data-transition-speed=\"slow\"] .slides section {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n/* Slide-specific transition speed overrides */\n.reveal .slides section[data-transition-speed=\"fast\"] {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal .slides section[data-transition-speed=\"slow\"] {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n.reveal .slides>section {\n\tleft: -50%;\n\ttop: -50%;\n}\n\n.reveal .slides>section.stack {\n\tpadding-top: 0;\n\tpadding-bottom: 0;\n}\n\n.reveal .slides>section.present,\n.reveal .slides>section>section.present {\n\tdisplay: block;\n\tz-index: 11;\n\topacity: 1;\n}\n\n.reveal.center,\n.reveal.center .slides,\n.reveal.center .slides section {\n\tmin-height: auto !important;\n}\n\n/* Don't allow interaction with invisible slides */\n.reveal .slides>section.future,\n.reveal .slides>section>section.future,\n.reveal .slides>section.past,\n.reveal .slides>section>section.past {\n\tpointer-events: none;\n}\n\n.reveal.overview .slides>section,\n.reveal.overview .slides>section>section {\n\tpointer-events: auto;\n}\n\n\n\n/*********************************************\n * DEFAULT TRANSITION\n *********************************************/\n\n.reveal .slides>section[data-transition=default].past,\n.reveal .slides>section.past {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n}\n.reveal .slides>section[data-transition=default].future,\n.reveal .slides>section.future {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n}\n\n.reveal .slides>section>section[data-transition=default].past,\n.reveal .slides>section>section.past {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n\t   -moz-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n\t    -ms-transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n\t        transform: translate3d(0, -300px, 0) rotateX(70deg) translate3d(0, -300px, 0);\n}\n.reveal .slides>section>section[data-transition=default].future,\n.reveal .slides>section>section.future {\n\tdisplay: block;\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n\t   -moz-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n\t    -ms-transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n\t        transform: translate3d(0, 300px, 0) rotateX(-70deg) translate3d(0, 300px, 0);\n}\n\n\n/*********************************************\n * CONCAVE TRANSITION\n *********************************************/\n\n.reveal .slides>section[data-transition=concave].past,\n.reveal.concave  .slides>section.past {\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n}\n.reveal .slides>section[data-transition=concave].future,\n.reveal.concave .slides>section.future {\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n}\n\n.reveal .slides>section>section[data-transition=concave].past,\n.reveal.concave .slides>section>section.past {\n\t-webkit-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n\t   -moz-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n\t    -ms-transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n\t        transform: translate3d(0, -80%, 0) rotateX(-70deg) translate3d(0, -80%, 0);\n}\n.reveal .slides>section>section[data-transition=concave].future,\n.reveal.concave .slides>section>section.future {\n\t-webkit-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n\t   -moz-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n\t    -ms-transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n\t        transform: translate3d(0, 80%, 0) rotateX(70deg) translate3d(0, 80%, 0);\n}\n\n\n/*********************************************\n * ZOOM TRANSITION\n *********************************************/\n\n.reveal .slides>section[data-transition=zoom],\n.reveal.zoom .slides>section {\n\t-webkit-transition-timing-function: ease;\n\t   -moz-transition-timing-function: ease;\n\t    -ms-transition-timing-function: ease;\n\t     -o-transition-timing-function: ease;\n\t        transition-timing-function: ease;\n}\n\n.reveal .slides>section[data-transition=zoom].past,\n.reveal.zoom .slides>section.past {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(16);\n\t   -moz-transform: scale(16);\n\t    -ms-transform: scale(16);\n\t     -o-transform: scale(16);\n\t        transform: scale(16);\n}\n.reveal .slides>section[data-transition=zoom].future,\n.reveal.zoom .slides>section.future {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(0.2);\n\t   -moz-transform: scale(0.2);\n\t    -ms-transform: scale(0.2);\n\t     -o-transform: scale(0.2);\n\t        transform: scale(0.2);\n}\n\n.reveal .slides>section>section[data-transition=zoom].past,\n.reveal.zoom .slides>section>section.past {\n\t-webkit-transform: translate(0, -150%);\n\t   -moz-transform: translate(0, -150%);\n\t    -ms-transform: translate(0, -150%);\n\t     -o-transform: translate(0, -150%);\n\t        transform: translate(0, -150%);\n}\n.reveal .slides>section>section[data-transition=zoom].future,\n.reveal.zoom .slides>section>section.future {\n\t-webkit-transform: translate(0, 150%);\n\t   -moz-transform: translate(0, 150%);\n\t    -ms-transform: translate(0, 150%);\n\t     -o-transform: translate(0, 150%);\n\t        transform: translate(0, 150%);\n}\n\n\n/*********************************************\n * LINEAR TRANSITION\n *********************************************/\n\n.reveal.linear section {\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t    -ms-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n}\n\n.reveal .slides>section[data-transition=linear].past,\n.reveal.linear .slides>section.past {\n\t-webkit-transform: translate(-150%, 0);\n\t   -moz-transform: translate(-150%, 0);\n\t    -ms-transform: translate(-150%, 0);\n\t     -o-transform: translate(-150%, 0);\n\t        transform: translate(-150%, 0);\n}\n.reveal .slides>section[data-transition=linear].future,\n.reveal.linear .slides>section.future {\n\t-webkit-transform: translate(150%, 0);\n\t   -moz-transform: translate(150%, 0);\n\t    -ms-transform: translate(150%, 0);\n\t     -o-transform: translate(150%, 0);\n\t        transform: translate(150%, 0);\n}\n\n.reveal .slides>section>section[data-transition=linear].past,\n.reveal.linear .slides>section>section.past {\n\t-webkit-transform: translate(0, -150%);\n\t   -moz-transform: translate(0, -150%);\n\t    -ms-transform: translate(0, -150%);\n\t     -o-transform: translate(0, -150%);\n\t        transform: translate(0, -150%);\n}\n.reveal .slides>section>section[data-transition=linear].future,\n.reveal.linear .slides>section>section.future {\n\t-webkit-transform: translate(0, 150%);\n\t   -moz-transform: translate(0, 150%);\n\t    -ms-transform: translate(0, 150%);\n\t     -o-transform: translate(0, 150%);\n\t        transform: translate(0, 150%);\n}\n\n\n/*********************************************\n * CUBE TRANSITION\n *********************************************/\n\n.reveal.cube .slides {\n\t-webkit-perspective: 1300px;\n\t   -moz-perspective: 1300px;\n\t    -ms-perspective: 1300px;\n\t        perspective: 1300px;\n}\n\n.reveal.cube .slides section {\n\tpadding: 30px;\n\tmin-height: 700px;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t    -ms-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n\n\t-webkit-box-sizing: border-box;\n\t   -moz-box-sizing: border-box;\n\t        box-sizing: border-box;\n}\n\t.reveal.center.cube .slides section {\n\t\tmin-height: auto;\n\t}\n\t.reveal.cube .slides section:not(.stack):before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbackground: rgba(0,0,0,0.1);\n\t\tborder-radius: 4px;\n\n\t\t-webkit-transform: translateZ( -20px );\n\t\t   -moz-transform: translateZ( -20px );\n\t\t    -ms-transform: translateZ( -20px );\n\t\t     -o-transform: translateZ( -20px );\n\t\t        transform: translateZ( -20px );\n\t}\n\t.reveal.cube .slides section:not(.stack):after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 90%;\n\t\theight: 30px;\n\t\tleft: 5%;\n\t\tbottom: 0;\n\t\tbackground: none;\n\t\tz-index: 1;\n\n\t\tborder-radius: 4px;\n\t\tbox-shadow: 0px 95px 25px rgba(0,0,0,0.2);\n\n\t\t-webkit-transform: translateZ(-90px) rotateX( 65deg );\n\t\t   -moz-transform: translateZ(-90px) rotateX( 65deg );\n\t\t    -ms-transform: translateZ(-90px) rotateX( 65deg );\n\t\t     -o-transform: translateZ(-90px) rotateX( 65deg );\n\t\t        transform: translateZ(-90px) rotateX( 65deg );\n\t}\n\n.reveal.cube .slides>section.stack {\n\tpadding: 0;\n\tbackground: none;\n}\n\n.reveal.cube .slides>section.past {\n\t-webkit-transform-origin: 100% 0%;\n\t   -moz-transform-origin: 100% 0%;\n\t    -ms-transform-origin: 100% 0%;\n\t        transform-origin: 100% 0%;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg);\n}\n\n.reveal.cube .slides>section.future {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg);\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg);\n}\n\n.reveal.cube .slides>section>section.past {\n\t-webkit-transform-origin: 0% 100%;\n\t   -moz-transform-origin: 0% 100%;\n\t    -ms-transform-origin: 0% 100%;\n\t        transform-origin: 0% 100%;\n\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(90deg);\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(90deg);\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(90deg);\n\t        transform: translate3d(0, -100%, 0) rotateX(90deg);\n}\n\n.reveal.cube .slides>section>section.future {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(-90deg);\n\t        transform: translate3d(0, 100%, 0) rotateX(-90deg);\n}\n\n\n/*********************************************\n * PAGE TRANSITION\n *********************************************/\n\n.reveal.page .slides {\n\t-webkit-perspective-origin: 0% 50%;\n\t   -moz-perspective-origin: 0% 50%;\n\t    -ms-perspective-origin: 0% 50%;\n\t        perspective-origin: 0% 50%;\n\n\t-webkit-perspective: 3000px;\n\t   -moz-perspective: 3000px;\n\t    -ms-perspective: 3000px;\n\t        perspective: 3000px;\n}\n\n.reveal.page .slides section {\n\tpadding: 30px;\n\tmin-height: 700px;\n\n\t-webkit-box-sizing: border-box;\n\t   -moz-box-sizing: border-box;\n\t        box-sizing: border-box;\n}\n\t.reveal.page .slides section.past {\n\t\tz-index: 12;\n\t}\n\t.reveal.page .slides section:not(.stack):before {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tleft: 0;\n\t\ttop: 0;\n\t\tbackground: rgba(0,0,0,0.1);\n\n\t\t-webkit-transform: translateZ( -20px );\n\t\t   -moz-transform: translateZ( -20px );\n\t\t    -ms-transform: translateZ( -20px );\n\t\t     -o-transform: translateZ( -20px );\n\t\t        transform: translateZ( -20px );\n\t}\n\t.reveal.page .slides section:not(.stack):after {\n\t\tcontent: '';\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\twidth: 90%;\n\t\theight: 30px;\n\t\tleft: 5%;\n\t\tbottom: 0;\n\t\tbackground: none;\n\t\tz-index: 1;\n\n\t\tborder-radius: 4px;\n\t\tbox-shadow: 0px 95px 25px rgba(0,0,0,0.2);\n\n\t\t-webkit-transform: translateZ(-90px) rotateX( 65deg );\n\t}\n\n.reveal.page .slides>section.stack {\n\tpadding: 0;\n\tbackground: none;\n}\n\n.reveal.page .slides>section.past {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n\t   -moz-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n\t    -ms-transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n\t        transform: translate3d(-40%, 0, 0) rotateY(-80deg);\n}\n\n.reveal.page .slides>section.future {\n\t-webkit-transform-origin: 100% 0%;\n\t   -moz-transform-origin: 100% 0%;\n\t    -ms-transform-origin: 100% 0%;\n\t        transform-origin: 100% 0%;\n\n\t-webkit-transform: translate3d(0, 0, 0);\n\t   -moz-transform: translate3d(0, 0, 0);\n\t    -ms-transform: translate3d(0, 0, 0);\n\t        transform: translate3d(0, 0, 0);\n}\n\n.reveal.page .slides>section>section.past {\n\t-webkit-transform-origin: 0% 0%;\n\t   -moz-transform-origin: 0% 0%;\n\t    -ms-transform-origin: 0% 0%;\n\t        transform-origin: 0% 0%;\n\n\t-webkit-transform: translate3d(0, -40%, 0) rotateX(80deg);\n\t   -moz-transform: translate3d(0, -40%, 0) rotateX(80deg);\n\t    -ms-transform: translate3d(0, -40%, 0) rotateX(80deg);\n\t        transform: translate3d(0, -40%, 0) rotateX(80deg);\n}\n\n.reveal.page .slides>section>section.future {\n\t-webkit-transform-origin: 0% 100%;\n\t   -moz-transform-origin: 0% 100%;\n\t    -ms-transform-origin: 0% 100%;\n\t        transform-origin: 0% 100%;\n\n\t-webkit-transform: translate3d(0, 0, 0);\n\t   -moz-transform: translate3d(0, 0, 0);\n\t    -ms-transform: translate3d(0, 0, 0);\n\t        transform: translate3d(0, 0, 0);\n}\n\n\n/*********************************************\n * FADE TRANSITION\n *********************************************/\n\n.reveal .slides section[data-transition=fade],\n.reveal.fade .slides section,\n.reveal.fade .slides>section>section {\n    -webkit-transform: none;\n\t   -moz-transform: none;\n\t    -ms-transform: none;\n\t     -o-transform: none;\n\t        transform: none;\n\n\t-webkit-transition: opacity 0.5s;\n\t   -moz-transition: opacity 0.5s;\n\t    -ms-transition: opacity 0.5s;\n\t     -o-transition: opacity 0.5s;\n\t        transition: opacity 0.5s;\n}\n\n\n.reveal.fade.overview .slides section,\n.reveal.fade.overview .slides>section>section,\n.reveal.fade.overview-deactivating .slides section,\n.reveal.fade.overview-deactivating .slides>section>section {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t    -ms-transition: none;\n\t     -o-transition: none;\n\t        transition: none;\n}\n\n\n/*********************************************\n * NO TRANSITION\n *********************************************/\n\n.reveal .slides section[data-transition=none],\n.reveal.none .slides section {\n\t-webkit-transform: none;\n\t   -moz-transform: none;\n\t    -ms-transform: none;\n\t     -o-transform: none;\n\t        transform: none;\n\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t    -ms-transition: none;\n\t     -o-transition: none;\n\t        transition: none;\n}\n\n\n/*********************************************\n * OVERVIEW\n *********************************************/\n\n.reveal.overview .slides {\n\t-webkit-perspective-origin: 0% 0%;\n\t   -moz-perspective-origin: 0% 0%;\n\t    -ms-perspective-origin: 0% 0%;\n\t        perspective-origin: 0% 0%;\n\n\t-webkit-perspective: 700px;\n\t   -moz-perspective: 700px;\n\t    -ms-perspective: 700px;\n\t        perspective: 700px;\n}\n\n.reveal.overview .slides section {\n\theight: 600px;\n\ttop: -300px !important;\n\toverflow: hidden;\n\topacity: 1 !important;\n\tvisibility: visible !important;\n\tcursor: pointer;\n\tbackground: rgba(0,0,0,0.1);\n}\n.reveal.overview .slides section .fragment {\n\topacity: 1;\n}\n.reveal.overview .slides section:after,\n.reveal.overview .slides section:before {\n\tdisplay: none !important;\n}\n.reveal.overview .slides section>section {\n\topacity: 1;\n\tcursor: pointer;\n}\n\t.reveal.overview .slides section:hover {\n\t\tbackground: rgba(0,0,0,0.3);\n\t}\n\t.reveal.overview .slides section.present {\n\t\tbackground: rgba(0,0,0,0.3);\n\t}\n.reveal.overview .slides>section.stack {\n\tpadding: 0;\n\ttop: 0 !important;\n\tbackground: none;\n\toverflow: visible;\n}\n\n\n/*********************************************\n * PAUSED MODE\n *********************************************/\n\n.reveal .pause-overlay {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: black;\n\tvisibility: hidden;\n\topacity: 0;\n\tz-index: 100;\n\n\t-webkit-transition: all 1s ease;\n\t   -moz-transition: all 1s ease;\n\t    -ms-transition: all 1s ease;\n\t     -o-transition: all 1s ease;\n\t        transition: all 1s ease;\n}\n.reveal.paused .pause-overlay {\n\tvisibility: visible;\n\topacity: 1;\n}\n\n\n/*********************************************\n * FALLBACK\n *********************************************/\n\n.no-transforms {\n\toverflow-y: auto;\n}\n\n.no-transforms .reveal .slides {\n\tposition: relative;\n\twidth: 80%;\n\theight: auto !important;\n\ttop: 0;\n\tleft: 50%;\n\tmargin: 0;\n\ttext-align: center;\n}\n\n.no-transforms .reveal .controls,\n.no-transforms .reveal .progress {\n\tdisplay: none !important;\n}\n\n.no-transforms .reveal .slides section {\n\tdisplay: block !important;\n\topacity: 1 !important;\n\tposition: relative !important;\n\theight: auto;\n\tmin-height: auto;\n\ttop: 0;\n\tleft: -50%;\n\tmargin: 70px 0;\n\n\t-webkit-transform: none;\n\t   -moz-transform: none;\n\t    -ms-transform: none;\n\t     -o-transform: none;\n\t        transform: none;\n}\n\n.no-transforms .reveal .slides section section {\n\tleft: 0;\n}\n\n.reveal .no-transition,\n.reveal .no-transition * {\n\t-webkit-transition: none !important;\n\t   -moz-transition: none !important;\n\t    -ms-transition: none !important;\n\t     -o-transition: none !important;\n\t        transition: none !important;\n}\n\n\n/*********************************************\n * BACKGROUND STATES [DEPRECATED]\n *********************************************/\n\n.reveal .state-background {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: rgba( 0, 0, 0, 0 );\n\n\t-webkit-transition: background 800ms ease;\n\t   -moz-transition: background 800ms ease;\n\t    -ms-transition: background 800ms ease;\n\t     -o-transition: background 800ms ease;\n\t        transition: background 800ms ease;\n}\n.alert .reveal .state-background {\n\tbackground: rgba( 200, 50, 30, 0.6 );\n}\n.soothe .reveal .state-background {\n\tbackground: rgba( 50, 200, 90, 0.4 );\n}\n.blackout .reveal .state-background {\n\tbackground: rgba( 0, 0, 0, 0.6 );\n}\n.whiteout .reveal .state-background {\n\tbackground: rgba( 255, 255, 255, 0.6 );\n}\n.cobalt .reveal .state-background {\n\tbackground: rgba( 22, 152, 213, 0.6 );\n}\n.mint .reveal .state-background {\n\tbackground: rgba( 22, 213, 75, 0.6 );\n}\n.submerge .reveal .state-background {\n\tbackground: rgba( 12, 25, 77, 0.6);\n}\n.lila .reveal .state-background {\n\tbackground: rgba( 180, 50, 140, 0.6 );\n}\n.sunset .reveal .state-background {\n\tbackground: rgba( 255, 122, 0, 0.6 );\n}\n\n\n/*********************************************\n * PER-SLIDE BACKGROUNDS\n *********************************************/\n\n.reveal>.backgrounds {\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n\n\t-webkit-perspective: 600px;\n\t   -moz-perspective: 600px;\n\t    -ms-perspective: 600px;\n\t        perspective: 600px;\n}\n\t.reveal .slide-background {\n\t\tposition: absolute;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\topacity: 0;\n\t\tvisibility: hidden;\n\n\t\tbackground-color: rgba( 0, 0, 0, 0 );\n\t\tbackground-position: 50% 50%;\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-size: cover;\n\n\t\t-webkit-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t   -moz-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t    -ms-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t     -o-transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t\t        transition: all 800ms cubic-bezier(0.260, 0.860, 0.440, 0.985);\n\t}\n\t.reveal .slide-background.present {\n\t\topacity: 1;\n\t\tvisibility: visible;\n\t}\n\n\t.print-pdf .reveal .slide-background {\n\t\topacity: 1 !important;\n\t\tvisibility: visible !important;\n\t}\n\n/* Immediate transition style */\n.reveal[data-background-transition=none]>.backgrounds .slide-background,\n.reveal>.backgrounds .slide-background[data-background-transition=none] {\n\t-webkit-transition: none;\n\t   -moz-transition: none;\n\t    -ms-transition: none;\n\t     -o-transition: none;\n\t        transition: none;\n}\n\n/* 2D slide */\n.reveal[data-background-transition=slide]>.backgrounds .slide-background,\n.reveal>.backgrounds .slide-background[data-background-transition=slide] {\n\topacity: 1;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t    -ms-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n}\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background.past,\n\t.reveal>.backgrounds .slide-background.past[data-background-transition=slide] {\n\t\t-webkit-transform: translate(-100%, 0);\n\t\t   -moz-transform: translate(-100%, 0);\n\t\t    -ms-transform: translate(-100%, 0);\n\t\t     -o-transform: translate(-100%, 0);\n\t\t        transform: translate(-100%, 0);\n\t}\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background.future,\n\t.reveal>.backgrounds .slide-background.future[data-background-transition=slide] {\n\t\t-webkit-transform: translate(100%, 0);\n\t\t   -moz-transform: translate(100%, 0);\n\t\t    -ms-transform: translate(100%, 0);\n\t\t     -o-transform: translate(100%, 0);\n\t\t        transform: translate(100%, 0);\n\t}\n\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.past,\n\t.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=slide] {\n\t\t-webkit-transform: translate(0, -100%);\n\t\t   -moz-transform: translate(0, -100%);\n\t\t    -ms-transform: translate(0, -100%);\n\t\t     -o-transform: translate(0, -100%);\n\t\t        transform: translate(0, -100%);\n\t}\n\t.reveal[data-background-transition=slide]>.backgrounds .slide-background>.slide-background.future,\n\t.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=slide] {\n\t\t-webkit-transform: translate(0, 100%);\n\t\t   -moz-transform: translate(0, 100%);\n\t\t    -ms-transform: translate(0, 100%);\n\t\t     -o-transform: translate(0, 100%);\n\t\t        transform: translate(0, 100%);\n\t}\n\n\n/* Convex */\n.reveal[data-background-transition=convex]>.backgrounds .slide-background.past,\n.reveal>.backgrounds .slide-background.past[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(-90deg) translate3d(-100%, 0, 0);\n}\n.reveal[data-background-transition=convex]>.backgrounds .slide-background.future,\n.reveal>.backgrounds .slide-background.future[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(90deg) translate3d(100%, 0, 0);\n}\n\n.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.past,\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n\t        transform: translate3d(0, -100%, 0) rotateX(90deg) translate3d(0, -100%, 0);\n}\n.reveal[data-background-transition=convex]>.backgrounds .slide-background>.slide-background.future,\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=convex] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n\t        transform: translate3d(0, 100%, 0) rotateX(-90deg) translate3d(0, 100%, 0);\n}\n\n\n/* Concave */\n.reveal[data-background-transition=concave]>.backgrounds .slide-background.past,\n.reveal>.backgrounds .slide-background.past[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t   -moz-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t    -ms-transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n\t        transform: translate3d(-100%, 0, 0) rotateY(90deg) translate3d(-100%, 0, 0);\n}\n.reveal[data-background-transition=concave]>.backgrounds .slide-background.future,\n.reveal>.backgrounds .slide-background.future[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t   -moz-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t    -ms-transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n\t        transform: translate3d(100%, 0, 0) rotateY(-90deg) translate3d(100%, 0, 0);\n}\n\n.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.past,\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n\t   -moz-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n\t    -ms-transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n\t        transform: translate3d(0, -100%, 0) rotateX(-90deg) translate3d(0, -100%, 0);\n}\n.reveal[data-background-transition=concave]>.backgrounds .slide-background>.slide-background.future,\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=concave] {\n\topacity: 0;\n\n\t-webkit-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n\t   -moz-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n\t    -ms-transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n\t        transform: translate3d(0, 100%, 0) rotateX(90deg) translate3d(0, 100%, 0);\n}\n\n/* Zoom */\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background,\n.reveal>.backgrounds .slide-background[data-background-transition=zoom] {\n\t-webkit-transition-timing-function: ease;\n\t   -moz-transition-timing-function: ease;\n\t    -ms-transition-timing-function: ease;\n\t     -o-transition-timing-function: ease;\n\t        transition-timing-function: ease;\n}\n\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background.past,\n.reveal>.backgrounds .slide-background.past[data-background-transition=zoom] {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(16);\n\t   -moz-transform: scale(16);\n\t    -ms-transform: scale(16);\n\t     -o-transform: scale(16);\n\t        transform: scale(16);\n}\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background.future,\n.reveal>.backgrounds .slide-background.future[data-background-transition=zoom] {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(0.2);\n\t   -moz-transform: scale(0.2);\n\t    -ms-transform: scale(0.2);\n\t     -o-transform: scale(0.2);\n\t        transform: scale(0.2);\n}\n\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.past,\n.reveal>.backgrounds .slide-background>.slide-background.past[data-background-transition=zoom] {\n\topacity: 0;\n\t\tvisibility: hidden;\n\n\t\t-webkit-transform: scale(16);\n\t\t   -moz-transform: scale(16);\n\t\t    -ms-transform: scale(16);\n\t\t     -o-transform: scale(16);\n\t\t        transform: scale(16);\n}\n.reveal[data-background-transition=zoom]>.backgrounds .slide-background>.slide-background.future,\n.reveal>.backgrounds .slide-background>.slide-background.future[data-background-transition=zoom] {\n\topacity: 0;\n\tvisibility: hidden;\n\n\t-webkit-transform: scale(0.2);\n\t   -moz-transform: scale(0.2);\n\t    -ms-transform: scale(0.2);\n\t     -o-transform: scale(0.2);\n\t        transform: scale(0.2);\n}\n\n\n/* Global transition speed settings */\n.reveal[data-transition-speed=\"fast\"]>.backgrounds .slide-background {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal[data-transition-speed=\"slow\"]>.backgrounds .slide-background {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n\n/*********************************************\n * RTL SUPPORT\n *********************************************/\n\n.reveal.rtl .slides,\n.reveal.rtl .slides h1,\n.reveal.rtl .slides h2,\n.reveal.rtl .slides h3,\n.reveal.rtl .slides h4,\n.reveal.rtl .slides h5,\n.reveal.rtl .slides h6 {\n\tdirection: rtl;\n\tfont-family: sans-serif;\n}\n\n.reveal.rtl pre,\n.reveal.rtl code {\n\tdirection: ltr;\n}\n\n.reveal.rtl ol,\n.reveal.rtl ul {\n\ttext-align: right;\n}\n\n.reveal.rtl .progress span {\n\tfloat: right\n}\n\n/*********************************************\n * PARALLAX BACKGROUND\n *********************************************/\n\n.reveal.has-parallax-background .backgrounds {\n\t-webkit-transition: all 0.8s ease;\n\t   -moz-transition: all 0.8s ease;\n\t    -ms-transition: all 0.8s ease;\n\t        transition: all 0.8s ease;\n}\n\n/* Global transition speed settings */\n.reveal.has-parallax-background[data-transition-speed=\"fast\"] .backgrounds {\n\t-webkit-transition-duration: 400ms;\n\t   -moz-transition-duration: 400ms;\n\t    -ms-transition-duration: 400ms;\n\t        transition-duration: 400ms;\n}\n.reveal.has-parallax-background[data-transition-speed=\"slow\"] .backgrounds {\n\t-webkit-transition-duration: 1200ms;\n\t   -moz-transition-duration: 1200ms;\n\t    -ms-transition-duration: 1200ms;\n\t        transition-duration: 1200ms;\n}\n\n\n/*********************************************\n * LINK PREVIEW OVERLAY\n *********************************************/\n\n .reveal .preview-link-overlay {\n \tposition: absolute;\n \ttop: 0;\n \tleft: 0;\n \twidth: 100%;\n \theight: 100%;\n \tz-index: 1000;\n \tbackground: rgba( 0, 0, 0, 0.9 );\n \topacity: 0;\n \tvisibility: hidden;\n\n \t-webkit-transition: all 0.3s ease;\n \t   -moz-transition: all 0.3s ease;\n \t    -ms-transition: all 0.3s ease;\n \t        transition: all 0.3s ease;\n }\n \t.reveal .preview-link-overlay.visible {\n \t\topacity: 1;\n \t\tvisibility: visible;\n \t}\n\n \t.reveal .preview-link-overlay .spinner {\n \t\tposition: absolute;\n \t\tdisplay: block;\n \t\ttop: 50%;\n \t\tleft: 50%;\n \t\twidth: 32px;\n \t\theight: 32px;\n \t\tmargin: -16px 0 0 -16px;\n \t\tz-index: 10;\n \t\tbackground-image: url(data:image/gif;base64,R0lGODlhIAAgAPMAAJmZmf%2F%2F%2F6%2Bvr8nJybW1tcDAwOjo6Nvb26ioqKOjo7Ozs%2FLy8vz8%2FAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAIAAgAAAE5xDISWlhperN52JLhSSdRgwVo1ICQZRUsiwHpTJT4iowNS8vyW2icCF6k8HMMBkCEDskxTBDAZwuAkkqIfxIQyhBQBFvAQSDITM5VDW6XNE4KagNh6Bgwe60smQUB3d4Rz1ZBApnFASDd0hihh12BkE9kjAJVlycXIg7CQIFA6SlnJ87paqbSKiKoqusnbMdmDC2tXQlkUhziYtyWTxIfy6BE8WJt5YJvpJivxNaGmLHT0VnOgSYf0dZXS7APdpB309RnHOG5gDqXGLDaC457D1zZ%2FV%2FnmOM82XiHRLYKhKP1oZmADdEAAAh%2BQQJCgAAACwAAAAAIAAgAAAE6hDISWlZpOrNp1lGNRSdRpDUolIGw5RUYhhHukqFu8DsrEyqnWThGvAmhVlteBvojpTDDBUEIFwMFBRAmBkSgOrBFZogCASwBDEY%2FCZSg7GSE0gSCjQBMVG023xWBhklAnoEdhQEfyNqMIcKjhRsjEdnezB%2BA4k8gTwJhFuiW4dokXiloUepBAp5qaKpp6%2BHo7aWW54wl7obvEe0kRuoplCGepwSx2jJvqHEmGt6whJpGpfJCHmOoNHKaHx61WiSR92E4lbFoq%2BB6QDtuetcaBPnW6%2BO7wDHpIiK9SaVK5GgV543tzjgGcghAgAh%2BQQJCgAAACwAAAAAIAAgAAAE7hDISSkxpOrN5zFHNWRdhSiVoVLHspRUMoyUakyEe8PTPCATW9A14E0UvuAKMNAZKYUZCiBMuBakSQKG8G2FzUWox2AUtAQFcBKlVQoLgQReZhQlCIJesQXI5B0CBnUMOxMCenoCfTCEWBsJColTMANldx15BGs8B5wlCZ9Po6OJkwmRpnqkqnuSrayqfKmqpLajoiW5HJq7FL1Gr2mMMcKUMIiJgIemy7xZtJsTmsM4xHiKv5KMCXqfyUCJEonXPN2rAOIAmsfB3uPoAK%2B%2BG%2Bw48edZPK%2BM6hLJpQg484enXIdQFSS1u6UhksENEQAAIfkECQoAAAAsAAAAACAAIAAABOcQyEmpGKLqzWcZRVUQnZYg1aBSh2GUVEIQ2aQOE%2BG%2BcD4ntpWkZQj1JIiZIogDFFyHI0UxQwFugMSOFIPJftfVAEoZLBbcLEFhlQiqGp1Vd140AUklUN3eCA51C1EWMzMCezCBBmkxVIVHBWd3HHl9JQOIJSdSnJ0TDKChCwUJjoWMPaGqDKannasMo6WnM562R5YluZRwur0wpgqZE7NKUm%2BFNRPIhjBJxKZteWuIBMN4zRMIVIhffcgojwCF117i4nlLnY5ztRLsnOk%2BaV%2BoJY7V7m76PdkS4trKcdg0Zc0tTcKkRAAAIfkECQoAAAAsAAAAACAAIAAABO4QyEkpKqjqzScpRaVkXZWQEximw1BSCUEIlDohrft6cpKCk5xid5MNJTaAIkekKGQkWyKHkvhKsR7ARmitkAYDYRIbUQRQjWBwJRzChi9CRlBcY1UN4g0%2FVNB0AlcvcAYHRyZPdEQFYV8ccwR5HWxEJ02YmRMLnJ1xCYp0Y5idpQuhopmmC2KgojKasUQDk5BNAwwMOh2RtRq5uQuPZKGIJQIGwAwGf6I0JXMpC8C7kXWDBINFMxS4DKMAWVWAGYsAdNqW5uaRxkSKJOZKaU3tPOBZ4DuK2LATgJhkPJMgTwKCdFjyPHEnKxFCDhEAACH5BAkKAAAALAAAAAAgACAAAATzEMhJaVKp6s2nIkolIJ2WkBShpkVRWqqQrhLSEu9MZJKK9y1ZrqYK9WiClmvoUaF8gIQSNeF1Er4MNFn4SRSDARWroAIETg1iVwuHjYB1kYc1mwruwXKC9gmsJXliGxc%2BXiUCby9ydh1sOSdMkpMTBpaXBzsfhoc5l58Gm5yToAaZhaOUqjkDgCWNHAULCwOLaTmzswadEqggQwgHuQsHIoZCHQMMQgQGubVEcxOPFAcMDAYUA85eWARmfSRQCdcMe0zeP1AAygwLlJtPNAAL19DARdPzBOWSm1brJBi45soRAWQAAkrQIykShQ9wVhHCwCQCACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiRMDjI0Fd30%2FiI2UA5GSS5UDj2l6NoqgOgN4gksEBgYFf0FDqKgHnyZ9OX8HrgYHdHpcHQULXAS2qKpENRg7eAMLC7kTBaixUYFkKAzWAAnLC7FLVxLWDBLKCwaKTULgEwbLA4hJtOkSBNqITT3xEgfLpBtzE%2FjiuL04RGEBgwWhShRgQExHBAAh%2BQQJCgAAACwAAAAAIAAgAAAE7xDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfZiCqGk5dTESJeaOAlClzsJsqwiJwiqnFrb2nS9kmIcgEsjQydLiIlHehhpejaIjzh9eomSjZR%2BipslWIRLAgMDOR2DOqKogTB9pCUJBagDBXR6XB0EBkIIsaRsGGMMAxoDBgYHTKJiUYEGDAzHC9EACcUGkIgFzgwZ0QsSBcXHiQvOwgDdEwfFs0sDzt4S6BK4xYjkDOzn0unFeBzOBijIm1Dgmg5YFQwsCMjp1oJ8LyIAACH5BAkKAAAALAAAAAAgACAAAATwEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GGl6NoiPOH16iZKNlH6KmyWFOggHhEEvAwwMA0N9GBsEC6amhnVcEwavDAazGwIDaH1ipaYLBUTCGgQDA8NdHz0FpqgTBwsLqAbWAAnIA4FWKdMLGdYGEgraigbT0OITBcg5QwPT4xLrROZL6AuQAPUS7bxLpoWidY0JtxLHKhwwMJBTHgPKdEQAACH5BAkKAAAALAAAAAAgACAAAATrEMhJaVKp6s2nIkqFZF2VIBWhUsJaTokqUCoBq%2BE71SRQeyqUToLA7VxF0JDyIQh%2FMVVPMt1ECZlfcjZJ9mIKoaTl1MRIl5o4CUKXOwmyrCInCKqcWtvadL2SYhyASyNDJ0uIiUd6GAULDJCRiXo1CpGXDJOUjY%2BYip9DhToJA4RBLwMLCwVDfRgbBAaqqoZ1XBMHswsHtxtFaH1iqaoGNgAIxRpbFAgfPQSqpbgGBqUD1wBXeCYp1AYZ19JJOYgH1KwA4UBvQwXUBxPqVD9L3sbp2BNk2xvvFPJd%2BMFCN6HAAIKgNggY0KtEBAAh%2BQQJCgAAACwAAAAAIAAgAAAE6BDISWlSqerNpyJKhWRdlSAVoVLCWk6JKlAqAavhO9UkUHsqlE6CwO1cRdCQ8iEIfzFVTzLdRAmZX3I2SfYIDMaAFdTESJeaEDAIMxYFqrOUaNW4E4ObYcCXaiBVEgULe0NJaxxtYksjh2NLkZISgDgJhHthkpU4mW6blRiYmZOlh4JWkDqILwUGBnE6TYEbCgevr0N1gH4At7gHiRpFaLNrrq8HNgAJA70AWxQIH1%2BvsYMDAzZQPC9VCNkDWUhGkuE5PxJNwiUK4UfLzOlD4WvzAHaoG9nxPi5d%2BjYUqfAhhykOFwJWiAAAIfkECQoAAAAsAAAAACAAIAAABPAQyElpUqnqzaciSoVkXVUMFaFSwlpOCcMYlErAavhOMnNLNo8KsZsMZItJEIDIFSkLGQoQTNhIsFehRww2CQLKF0tYGKYSg%2BygsZIuNqJksKgbfgIGepNo2cIUB3V1B3IvNiBYNQaDSTtfhhx0CwVPI0UJe0%2Bbm4g5VgcGoqOcnjmjqDSdnhgEoamcsZuXO1aWQy8KAwOAuTYYGwi7w5h%2BKr0SJ8MFihpNbx%2B4Erq7BYBuzsdiH1jCAzoSfl0rVirNbRXlBBlLX%2BBP0XJLAPGzTkAuAOqb0WT5AH7OcdCm5B8TgRwSRKIHQtaLCwg1RAAAOwAAAAAAAAAAAA%3D%3D);\n\n \t\tvisibility: visible;\n \t\topacity: 0.6;\n\n \t\t-webkit-transition: all 0.3s ease;\n \t\t   -moz-transition: all 0.3s ease;\n \t\t    -ms-transition: all 0.3s ease;\n \t\t        transition: all 0.3s ease;\n \t}\n\n \t.reveal .preview-link-overlay header {\n \t\tposition: absolute;\n \t\tleft: 0;\n \t\ttop: 0;\n \t\twidth: 100%;\n \t\theight: 40px;\n \t\tz-index: 2;\n \t\tborder-bottom: 1px solid #222;\n \t}\n \t\t.reveal .preview-link-overlay header a {\n \t\t\tdisplay: inline-block;\n \t\t\twidth: 40px;\n \t\t\theight: 40px;\n \t\t\tpadding: 0 10px;\n \t\t\tfloat: right;\n \t\t\topacity: 0.6;\n\n \t\t\tbox-sizing: border-box;\n \t\t}\n \t\t\t.reveal .preview-link-overlay header a:hover {\n \t\t\t\topacity: 1;\n \t\t\t}\n \t\t\t.reveal .preview-link-overlay header a .icon {\n \t\t\t\tdisplay: inline-block;\n \t\t\t\twidth: 20px;\n \t\t\t\theight: 20px;\n\n \t\t\t\tbackground-position: 50% 50%;\n \t\t\t\tbackground-size: 100%;\n \t\t\t\tbackground-repeat: no-repeat;\n \t\t\t}\n \t\t\t.reveal .preview-link-overlay header a.close .icon {\n \t\t\t\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABkklEQVRYR8WX4VHDMAxG6wnoJrABZQPYBCaBTWAD2g1gE5gg6OOsXuxIlr40d81dfrSJ9V4c2VLK7spHuTJ/5wpM07QXuXc5X0opX2tEJcadjHuV80li/FgxTIEK/5QBCICBD6xEhSMGHgQPgBgLiYVAB1dpSqKDawxTohFw4JSEA3clzgIBPCURwE2JucBR7rhPJJv5OpJwDX+SfDjgx1wACQeJG1aChP9K/IMmdZ8DtESV1WyP3Bt4MwM6sj4NMxMYiqUWHQu4KYA/SYkIjOsm3BXYWMKFDwU2khjCQ4ELJUJ4SmClRArOCmSXGuKma0fYD5CbzHxFpCSGAhfAVSSUGDUk2BWZaff2g6GE15BsBQ9nwmpIGDiyHQddwNTMKkbZaf9fajXQca1EX44puJZUsnY0ObGmITE3GVLCbEhQUjGVt146j6oasWN+49Vph2w1pZ5EansNZqKBm1txbU57iRRcZ86RWMDdWtBJUHBHwoQPi1GV+JCbntmvok7iTX4/Up9mgyTc/FJYDTcndgH/AA5A/CHsyEkVAAAAAElFTkSuQmCC);\n \t\t\t}\n \t\t\t.reveal .preview-link-overlay header a.external .icon {\n \t\t\t\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVRYR+2WSQoAIQwEzf8f7XiOMkUQxUPlGkM3hVmiQfQR9GYnH1SsAQlI4DiBqkCMoNb9y2e90IAEJPAcgdznU9+engMaeJ7Azh5Y1U67gAho4DqBqmB1buAf0MB1AlVBek83ZPkmJMGc1wAR+AAqod/B97TRpQAAAABJRU5ErkJggg==);\n \t\t\t}\n\n \t.reveal .preview-link-overlay .viewport {\n \t\tposition: absolute;\n \t\ttop: 40px;\n \t\tright: 0;\n \t\tbottom: 0;\n \t\tleft: 0;\n \t}\n\n \t.reveal .preview-link-overlay .viewport iframe {\n \t\twidth: 100%;\n \t\theight: 100%;\n \t\tmax-width: 100%;\n \t\tmax-height: 100%;\n \t\tborder: 0;\n\n \t\topacity: 0;\n \t\tvisibility: hidden;\n\n \t\t-webkit-transition: all 0.3s ease;\n \t\t   -moz-transition: all 0.3s ease;\n \t\t    -ms-transition: all 0.3s ease;\n \t\t        transition: all 0.3s ease;\n \t}\n\n \t.reveal .preview-link-overlay.loaded .viewport iframe {\n \t\topacity: 1;\n \t\tvisibility: visible;\n \t}\n\n \t.reveal .preview-link-overlay.loaded .spinner {\n \t\topacity: 0;\n \t\tvisibility: hidden;\n\n \t\t-webkit-transform: scale(0.2);\n \t\t   -moz-transform: scale(0.2);\n \t\t    -ms-transform: scale(0.2);\n \t\t        transform: scale(0.2);\n \t}\n\n\n\n/*********************************************\n * PLAYBACK COMPONENT\n *********************************************/\n\n.reveal .playback {\n\tposition: fixed;\n\tleft: 15px;\n\tbottom: 15px;\n\tz-index: 30;\n\tcursor: pointer;\n\n\t-webkit-transition: all 400ms ease;\n\t   -moz-transition: all 400ms ease;\n\t    -ms-transition: all 400ms ease;\n\t        transition: all 400ms ease;\n}\n\n.reveal.overview .playback {\n\topacity: 0;\n\tvisibility: hidden;\n}\n\n\n/*********************************************\n * ROLLING LINKS\n *********************************************/\n\n.reveal .roll {\n\tdisplay: inline-block;\n\tline-height: 1.2;\n\toverflow: hidden;\n\n\tvertical-align: top;\n\n\t-webkit-perspective: 400px;\n\t   -moz-perspective: 400px;\n\t    -ms-perspective: 400px;\n\t        perspective: 400px;\n\n\t-webkit-perspective-origin: 50% 50%;\n\t   -moz-perspective-origin: 50% 50%;\n\t    -ms-perspective-origin: 50% 50%;\n\t        perspective-origin: 50% 50%;\n}\n\t.reveal .roll:hover {\n\t\tbackground: none;\n\t\ttext-shadow: none;\n\t}\n.reveal .roll span {\n\tdisplay: block;\n\tposition: relative;\n\tpadding: 0 2px;\n\n\tpointer-events: none;\n\n\t-webkit-transition: all 400ms ease;\n\t   -moz-transition: all 400ms ease;\n\t    -ms-transition: all 400ms ease;\n\t        transition: all 400ms ease;\n\n\t-webkit-transform-origin: 50% 0%;\n\t   -moz-transform-origin: 50% 0%;\n\t    -ms-transform-origin: 50% 0%;\n\t        transform-origin: 50% 0%;\n\n\t-webkit-transform-style: preserve-3d;\n\t   -moz-transform-style: preserve-3d;\n\t    -ms-transform-style: preserve-3d;\n\t        transform-style: preserve-3d;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n}\n\t.reveal .roll:hover span {\n\t    background: rgba(0,0,0,0.5);\n\n\t    -webkit-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t       -moz-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t        -ms-transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t            transform: translate3d( 0px, 0px, -45px ) rotateX( 90deg );\n\t}\n.reveal .roll span:after {\n\tcontent: attr(data-title);\n\n\tdisplay: block;\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tpadding: 0 2px;\n\n\t-webkit-backface-visibility: hidden;\n\t   -moz-backface-visibility: hidden;\n\t        backface-visibility: hidden;\n\n\t-webkit-transform-origin: 50% 0%;\n\t   -moz-transform-origin: 50% 0%;\n\t    -ms-transform-origin: 50% 0%;\n\t        transform-origin: 50% 0%;\n\n\t-webkit-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n\t   -moz-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n\t    -ms-transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n\t        transform: translate3d( 0px, 110%, 0px ) rotateX( -90deg );\n}\n\n\n/*********************************************\n * SPEAKER NOTES\n *********************************************/\n\n.reveal aside.notes {\n\tdisplay: none;\n}\n\n\n/*********************************************\n * ZOOM PLUGIN\n *********************************************/\n\n.zoomed .reveal *,\n.zoomed .reveal *:before,\n.zoomed .reveal *:after {\n\t-webkit-transform: none !important;\n\t   -moz-transform: none !important;\n\t    -ms-transform: none !important;\n\t        transform: none !important;\n\n\t-webkit-backface-visibility: visible !important;\n\t   -moz-backface-visibility: visible !important;\n\t    -ms-backface-visibility: visible !important;\n\t        backface-visibility: visible !important;\n}\n\n.zoomed .reveal .progress,\n.zoomed .reveal .controls {\n\topacity: 0;\n}\n\n.zoomed .reveal .roll span {\n\tbackground: none;\n}\n\n.zoomed .reveal .roll span:after {\n\tvisibility: hidden;\n}\n\n\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../css-loader/index.js!./blood.css", function() {
				var newContent = require("!!./../../css-loader/index.js!./blood.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,700,300italic,700italic);", ""]);

	// module
	exports.push([module.id, "/**\n * Blood theme for reveal.js\n * Author: Walther http://github.com/Walther\n *\n * Designed to be used with highlight.js theme\n * \"monokai_sublime.css\" available from\n * https://github.com/isagalaev/highlight.js/\n *\n * For other themes, change $codeBackground accordingly.\n *\n */\n/*********************************************\n * GLOBAL STYLES\n *********************************************/\nbody {\n  background: #222222;\n  background: -moz-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #626262), color-stop(100%, #222222));\n  background: -webkit-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: -o-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: -ms-radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background: radial-gradient(center, circle cover, #626262 0%, #222222 100%);\n  background-color: #2b2b2b; }\n\n.reveal {\n  font-family: Ubuntu, \"sans-serif\";\n  font-size: 36px;\n  font-weight: normal;\n  letter-spacing: -0.02em;\n  color: #eeeeee; }\n\n::selection {\n  color: white;\n  background: #aa2233;\n  text-shadow: none; }\n\n/*********************************************\n * HEADERS\n *********************************************/\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n  margin: 0 0 20px 0;\n  color: #eeeeee;\n  font-family: Ubuntu, \"sans-serif\";\n  line-height: 0.9em;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  text-shadow: 2px 2px 2px #222222; }\n\n.reveal h1 {\n  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbbbbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaaaaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25), 0 20px 20px rgba(0, 0, 0, 0.15); }\n\n/*********************************************\n * LINKS\n *********************************************/\n.reveal a:not(.image) {\n  color: #aa2233;\n  text-decoration: none;\n  -webkit-transition: color .15s ease;\n  -moz-transition: color .15s ease;\n  -ms-transition: color .15s ease;\n  -o-transition: color .15s ease;\n  transition: color .15s ease; }\n\n.reveal a:not(.image):hover {\n  color: #dd5566;\n  text-shadow: none;\n  border: none; }\n\n.reveal .roll span:after {\n  color: #fff;\n  background: #6a1520; }\n\n/*********************************************\n * IMAGES\n *********************************************/\n.reveal section img {\n  margin: 15px 0px;\n  background: rgba(255, 255, 255, 0.12);\n  border: 4px solid #eeeeee;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);\n  -webkit-transition: all .2s linear;\n  -moz-transition: all .2s linear;\n  -ms-transition: all .2s linear;\n  -o-transition: all .2s linear;\n  transition: all .2s linear; }\n\n.reveal a:hover img {\n  background: rgba(255, 255, 255, 0.2);\n  border-color: #aa2233;\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.55); }\n\n/*********************************************\n * NAVIGATION CONTROLS\n *********************************************/\n.reveal .controls div.navigate-left,\n.reveal .controls div.navigate-left.enabled {\n  border-right-color: #aa2233; }\n\n.reveal .controls div.navigate-right,\n.reveal .controls div.navigate-right.enabled {\n  border-left-color: #aa2233; }\n\n.reveal .controls div.navigate-up,\n.reveal .controls div.navigate-up.enabled {\n  border-bottom-color: #aa2233; }\n\n.reveal .controls div.navigate-down,\n.reveal .controls div.navigate-down.enabled {\n  border-top-color: #aa2233; }\n\n.reveal .controls div.navigate-left.enabled:hover {\n  border-right-color: #dd5566; }\n\n.reveal .controls div.navigate-right.enabled:hover {\n  border-left-color: #dd5566; }\n\n.reveal .controls div.navigate-up.enabled:hover {\n  border-bottom-color: #dd5566; }\n\n.reveal .controls div.navigate-down.enabled:hover {\n  border-top-color: #dd5566; }\n\n/*********************************************\n * PROGRESS BAR\n *********************************************/\n.reveal .progress {\n  background: rgba(0, 0, 0, 0.2); }\n\n.reveal .progress span {\n  background: #aa2233;\n  -webkit-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -moz-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -ms-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  -o-transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985);\n  transition: width 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985); }\n\n/*********************************************\n * SLIDE NUMBER\n *********************************************/\n.reveal .slide-number {\n  color: #aa2233; }\n\n.reveal p {\n  font-weight: 300;\n  text-shadow: 1px 1px #222222; }\n\n.reveal h1,\n.reveal h2,\n.reveal h3,\n.reveal h4,\n.reveal h5,\n.reveal h6 {\n  font-weight: 700; }\n\n.reveal a:not(.image),\n.reveal a:not(.image):hover {\n  text-shadow: 2px 2px 2px #000; }\n\n.reveal small a:not(.image),\n.reveal small a:not(.image):hover {\n  text-shadow: 1px 1px 1px #000; }\n\n.reveal p code {\n  background-color: #23241f;\n  display: inline-block;\n  border-radius: 7px; }\n\n.reveal small code {\n  vertical-align: baseline; }\n", ""]);

	// exports


/***/ }
/******/ ])
});
;