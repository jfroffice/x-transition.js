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
