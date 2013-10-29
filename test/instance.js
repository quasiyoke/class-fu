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

	test('set classes', function(){
		var $els = $();
		equal($els.classes('alpha beta'), $els, 'Returns self when empty');
		var $els = $('.a');
		equal($els.classes('alpha beta'), $els, 'Returns self');
		equal($els[0].getAttribute('class'), 'alpha beta', 'Element 0 `class` attribute took given value');
		equal($els[1].getAttribute('class'), 'alpha beta', 'Element 1 `class` attribute took given value');
		equal($els[2].getAttribute('class'), 'alpha beta', 'Element 2 `class` attribute took given value');
		equal($els[3].getAttribute('class'), 'alpha beta', 'Element 3 `class` attribute took given value');
	});
});
