/**
 * x-transition.js - HTML attribute to add dynamic CSS classes when transition end
 * @version v0.1.1
 * @link https://github.com/jfroffice/x-transition.js
 * @license MIT
 */
// Event helper from jsCore v0.6.1 github.com/Octane/jsCore
var events = (function() {

    function off(eventDetails) {
       eventDetails.eventTypes.forEach(function (eventType) {
           eventDetails.element.removeEventListener(
               eventType,
               eventDetails.callback
               );
       });
    }

    function on(element, selector, eventTypes, callback) {
       var listener;
       if (arguments.length == 3) {
           callback = eventTypes;
           eventTypes = selector;
           selector = undefined;
       }
       if (selector) {
           selector += ',' + selector + ' *';
           listener = function (event) {
               var target = event.target;
               if (target.matches && target.matches(selector)) {
                   if (callback.handleEvent) {
                       callback.handleEvent(event);
                   } else {
                       callback.call(element, event);
                   }
               }
           };
       } else {
           listener = callback;
       }
       if ('string' == typeof eventTypes) {
           eventTypes = eventTypes.split(/[\s,]+/);
       }
       eventTypes.forEach(function (eventType) {
           element.addEventListener(eventType, listener);
       });
       return {
           element: element,
           eventTypes: eventTypes,
           callback: listener
       };
    }

    function one(element, selector, eventTypes, callback) {
       var details;
       function listener(event) {
           off(details);
           if (callback.handleEvent) {
               callback.handleEvent(event);
           } else {
               callback.call(element, event);
           }
       }
       if (arguments.length == 3) {
           callback = eventTypes;
           eventTypes = selector;
           selector = undefined;
       }
       details = on(element, selector, eventTypes, listener);
    }

    return {
        one: one,
        on: on,
        off: off
    };

})();

var am = am || {};
am.prefix = (function() {
	"use strict";

	var	TRANSITION_END_EVENTS = {
			'WebkitTransition': 'webkitTransitionEnd',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transitionPrefix;

	function getPrefix(name) {
		var b = document.body || document.documentElement,
			s = b.style,
			v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
			p = name;

		if(typeof s[p] === 'string')
			return name;

		p = p.charAt(0).toUpperCase() + p.substr(1);
		for( var i=0; i<v.length; i++ ) {
			var key = v[i] + p;
			if(typeof s[key] == 'string')
				return key;
		}
		return false;
	}

	transitionPrefix = getPrefix('transition');

	return {
		TRANSITION_END_EVENT: TRANSITION_END_EVENTS[transitionPrefix]
	};

})();

var am = am || {};
am.transition = (function(undefined) {

	var ATTR = 'x-transition',
		transitions = [];

	[].forEach.call(document.querySelectorAll('html'), function(element) {

	    var observer = new MutationObserver(function(mutations) {
	        mutations.forEach(function(mutation) {

	            if (mutation.addedNodes.length || mutation.removedNodes.length) {
	                var elements = document.querySelectorAll('[' + ATTR + ']');
	               if (elements.length !== transitions.length) {

	               		//console.log('initialize x-transition ' + elements.length + ' ' + transitions.length);

	               		[].forEach.call(elements, function(element) {

	               			var cssToAdd = [];

	               			[].forEach.call(element.attributes, function(attribute) {
	               				if (attribute.name.indexOf(ATTR) !== -1) {
	               					cssToAdd = attribute.value.split(' ');
	               				}
	               			});

	               			events.one(element, am.prefix.TRANSITION_END_EVENT, function() {
	               				cssToAdd.forEach(function(to) {
	               					element.classList.add(to);
	               				});
	               			});

	               			transitions.push(element);
	               		});

	                	//console.log(elements.length);
	                }
	            }
	        });
	    });

	    observer.observe(element, {
	        attributes: true,
	        childList: true,
	        characterData: true,
	        subtree: true
	    });
	});

})();
