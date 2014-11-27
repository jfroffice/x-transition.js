var am = am || {};
am.transition = (function(undefined) {

	var ATTR = 'x-transition';

	return function() {

		[].forEach.call(document.querySelectorAll('[' + ATTR + ']'), function(element) {

			var cssToAdd = [];

			[].forEach.call(element.attributes, function(attribute) {
				if (attribute.name.indexOf(ATTR) !== -1) {
					cssToAdd = attribute.value.split(' ');
				}
			});

			if (!cssToAdd.length) {
				return;
			}

			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					var elm = mutation.target;

					events.one(elm, am.prefix.TRANSITION_END_EVENT, function() {
						cssToAdd.forEach(function(to) {
							elm.classList.add(to);
						});
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
