var am = am || {};
am.transition = (function(undefined) {

	var FROM = 'entering',
		TO = 'pulse';

	return function() {

		[].forEach.call(document.querySelectorAll('[x-transition]'), function(element) {

			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					var elm = mutation.target;

					if (elm.classList.contains(FROM)) {
						events.one(elm, am.prefix.TRANSITION_END_EVENT, function() {
							elm.classList.add([TO]);
							elm.classList.remove([FROM]);
						});
					}
				});
			});

			observer.observe(element, {
				attributes: true,
				childList: true,
				characterData: true
			});
		});
	};

})();
