var am = am || {};
am.transition = (function(undefined) {

	var TO = 'pulse',
		TO2 = 'animated';

	return function() {

		[].forEach.call(document.querySelectorAll('[x-transition]'), function(element) {

			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					var elm = mutation.target;

					events.one(elm, am.prefix.TRANSITION_END_EVENT, function() {
						elm.classList.add(TO);
						elm.classList.add(TO2);
					});
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
