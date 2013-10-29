'use strict';
ClassFu(function(){
	module('Instance');

	test('get classes', function(){
		var $els = $();
		equal($els.classes(), undefined, 'Generates `undefined` on empty instance');
		var el1 = document.createElement('b');
		el1.setAttribute('class', 'alpha beta');
		var el2 = document.createElement('b');
		el2.setAttribute('class', 'beta gamma');
		$els = $([el1, el2]);
		deepEqual($els.classes(), {alpha: null, beta: null}, 'Gets classes of first element');
	});
});
