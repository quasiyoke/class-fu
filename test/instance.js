'use strict';
ClassFu(function(){
	module('Instance');

	var itemsEqual = function(actual, expected, message){
		ok(typeof actual, 'object', message + ' (object)');
		equal(actual.length, expected.length, message + ' (length)');
		for(var i=0; i<actual.length; i++){
			equal(actual[i], expected[i], message + ' (' + i + ')');
		}
	};

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

	test('classes.updateItems', function(){
		var $els = $();
		$els.classes.updateItems();
		equal($els.classes.count, undefined, '`count` attribute is `undefined` for empty instance');
		ok(!(0 in $els.classes), 'There\'s no items at empty class-fu instance');
		var el = document.createElement('b');
		$els = $(el);
		equal($els.classes.count, 0, '`count` attribute is 0 when there\'re no classes');
		ok(!(0 in $els.classes), 'There\'s no items when no classes');
		el.className = 'alpha';
		$els.classes.updateItems();
		equal($els.classes.count, 1, '`count` attribute is correct after adding one class');
		equal($els.classes[0], 'alpha', 'Class is accessible through subscript');
		el.removeAttribute('class');
		$els.classes.updateItems();
		equal($els.classes.count, 0, '`count` attribute is 0 after removing `class` element attribute');
		ok(!(0 in $els.classes), 'All items was removed after removing `class` element attribute');
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

	test('splice', function(){
		var els = document.getElementsByClassName('a');
		var els2 = [
			document.createElement('b'),
			document.createElement('b'),
			document.createElement('b')
		];
		var $els = $(els);
		var removed = $els.splice(2, 0, els2[0], els2[1], els2[2]);
		itemsEqual($els, [els[0], els[1], els2[0], els2[1], els2[2], els[2], els[3]], 'Removes no elements if `removingCount` is 0');
		itemsEqual(removed, [], 'Returns empty array');
		$els.splice(100, 2, els2[0], els2[1]);
		itemsEqual($els, [els[0], els[1], els2[0], els2[1], els2[2], els[2], els[3], els2[0], els2[1]], 'Removes no elements if `index` is greater than length of the array');
		removed = $els.splice(-4, 2);
		itemsEqual($els, [els[0], els[1], els2[0], els2[1], els2[2], els2[0], els2[1]], 'Negative `index` begins that many elements from the end');
		itemsEqual(removed, [els[2], els[3]]);
		$els.splice(5, 100);
		itemsEqual($els, [els[0], els[1], els2[0], els2[1], els2[2]], 'If `removingCount` is greater than the number of elements left in the array starting at `index`, then all of the elements through the end of the array will be deleted');
		$els.splice(1);
		itemsEqual($els, [els[0]], 'If no `removingCount` parameter is specified, all elements after `index` are removed');
		els2[0].className = 'alpha';
		$els.splice(0, 1, els2[0]);
		equal($els.classes.count, 1, '`classes` object `count` attribute correspond to first element changing');
		equal($els.classes[0], 'alpha', '`classes` object items correspond to first element changing');
	});
});
