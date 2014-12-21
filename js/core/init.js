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
