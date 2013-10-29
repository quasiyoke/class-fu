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

	test('process command', function(){
		var els = [];
		els.push(document.createElement('b'));
		els.push(document.createElement('b'));
		els[1].setAttribute('class', 'alpha delta epsilon');
		els.push(document.createElement('b'));
		els[2].setAttribute('class', 'beta gamma zeta');
		var $els = $(els);
		equal($els.classes('- alpha - beta + gamma + delta !epsilon !zeta'), $els, 'Returns self');
		deepEqual($.getClasses(els[0]), {gamma: null, delta: null, epsilon: null, zeta: null}, 'Element 0 `class` attribute correct');
		deepEqual($.getClasses(els[1]), {gamma: null, delta: null, zeta: null}, 'Element 1 `class` attribute correct');
		deepEqual($.getClasses(els[2]), {gamma: null, delta: null, epsilon: null}, 'Element 2 `class` attribute correct');
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
