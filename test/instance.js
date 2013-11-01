'use strict';
ClassFu(function(){
	module('Instance');

	test('classes.add', function(){
		var els = [];
		els.push(document.createElement('b'));
		els.push(document.createElement('b'));
		els[1].setAttribute('class', 'alpha');
		els.push(document.createElement('b'));
		els[2].setAttribute('class', 'beta gamma');
		var $els = $(els);
		$els.classes.add('alpha', 'beta');
		deepEqual($.getClasses($els[0]), {alpha: null, beta: null}, 'Element 0 `class` attribute correct');
		deepEqual($.getClasses($els[1]), {alpha: null, beta: null}, 'Element 1 `class` attribute correct');
		deepEqual($.getClasses($els[2]), {alpha: null, beta: null, gamma: null}, 'Element 2 `class` attribute correct');
		$els = $('.a');
		$els.classes.add('alpha', 'beta');
		deepEqual($.getClasses($els[0]), {alpha: null, beta: null, a: null}, 'Works with selector-built instances.');
	});

	test('classes.contains', function(){
		var $els = $();
		equal($els.classes.contains('alpha'), undefined, 'Generates `undefined` on empty instance.');
		var els = [];
		els.push(document.createElement('b'));
		els.push(document.createElement('b'));
		els[1].setAttribute('class', 'alpha beta');
		$els = $(els);
		ok(!$els.classes.contains('alpha'), 'Returns status of first element.');
		$els = $(els[1]);
		ok($els.classes.contains('beta'), 'Returns `true` if element contains the class.');
	});

	test('classes.remove', function(){
		var els = [];
		els.push(document.createElement('b'));
		els.push(document.createElement('b'));
		els[1].setAttribute('class', 'alpha');
		els.push(document.createElement('b'));
		els[2].setAttribute('class', 'beta gamma');
		var $els = $(els);
		$els.classes.remove('alpha', 'beta');
		ok(!els[0].hasAttribute('class'), 'Element without `class` attribute was processed correctly');
		ok(!els[1].hasAttribute('class'), 'Removes `class` attribute if no classes left');
		equal(els[2].className, 'gamma', 'Element 2 `class` attribute correct');
	});

	test('classes.toggle', function(){
		var els = [];
		els.push(document.createElement('b'));
		els.push(document.createElement('b'));
		els[1].setAttribute('class', 'alpha');
		els.push(document.createElement('b'));
		els[2].setAttribute('class', 'beta gamma');
		var $els = $(els);
		$els.classes.toggle('alpha', 'beta');
		deepEqual($.getClasses(els[0]), {alpha: null, beta: null}, 'Element without `class` attribute was processed correctly');
		equal(els[1].className, 'beta', 'Element 1 `class` attribute triggered');
		deepEqual($.getClasses(els[2]), {alpha: null, gamma: null}, 'Doesn\'t trigger not mentioned classes');
		$els.classes.toggle('alpha', 'beta', false);
		ok(!els[0].hasAttribute('class'), 'Element 0 classes removed correctly')
		ok(!els[1].hasAttribute('class'), 'Element 1 classes removed correctly')
		equal(els[2].className, 'gamma', 'Element 2 classes removed correctly')
		$els.classes.toggle('alpha', 'beta', true);
		deepEqual($.getClasses(els[0]), {alpha: null, beta: null}, 'Element 0 classes added correctly');
		deepEqual($.getClasses(els[1]), {alpha: null, beta: null}, 'Element 1 classes added correctly');
		deepEqual($.getClasses(els[2]), {alpha: null, beta: null, gamma: null}, 'Element 2 classes added correctly');
	});

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
		throws(function(){$els.classes(' - alpha')}, 'Throws an exception on space before commands');
		throws(function(){$els.classes('- alpha +beta + gamma')}, 'Throws an exception on no space in add');
		throws(function(){$els.classes('+ alpha ! beta !gamma')}, 'Throws an exception on space in toggle');
		equal($els.classes('- alpha - beta + gamma + delta !epsilon !zeta'), $els, 'Returns self');
		deepEqual($.getClasses(els[0]), {gamma: null, delta: null, epsilon: null, zeta: null}, 'Element 0 `class` attribute correct');
		deepEqual($.getClasses(els[1]), {gamma: null, delta: null, zeta: null}, 'Element 1 `class` attribute correct');
		deepEqual($.getClasses(els[2]), {gamma: null, delta: null, epsilon: null}, 'Element 2 `class` attribute correct');
	});

	test('set classes', function(){
		var $els = $();
		equal($els.classes('alpha beta'), $els, 'Returns self when empty');
		var $els = $(document.createElement('b'));
		equal($els.classes('-alpha - beta'), $els, 'Returns self');
		equal($els[0].getAttribute('class'), '-alpha - beta', '`class` attribute took value with minus');
		var $els = $('.a');
		$els.classes('alpha beta');
		equal($els[0].getAttribute('class'), 'alpha beta', 'Element 0 `class` attribute took given value');
		equal($els[1].getAttribute('class'), 'alpha beta', 'Element 1 `class` attribute took given value');
		equal($els[2].getAttribute('class'), 'alpha beta', 'Element 2 `class` attribute took given value');
		equal($els[3].getAttribute('class'), 'alpha beta', 'Element 3 `class` attribute took given value');
	});
});
