'use strict';
ClassFu(function(){
	module('Utility');

	test('get classes', function(){
		var el = document.createElement('b');
		deepEqual($.getClasses(el), {}, 'Generates empty object on missed `class` attribute');
		el.setAttribute('class', '');
		deepEqual($.getClasses(el), {}, 'Generates empty object on empty `class` attribute');
		el.setAttribute('class', '   ');
		deepEqual($.getClasses(el), {}, 'Generates empty object on spacey `class` attribute');
		el.setAttribute('class', 'a b  class foo-bar ');
		deepEqual($.getClasses(el), {a: null, b: null, class: null, 'foo-bar': null}, 'Gets CSS classes of element');
	});
	
	test('dollar sign', function(){
		equal($, ClassFu, 'ClassFu could be accessed through $ shortcut');
	});
	
	test('previous dollar sign', function(){
		equal($.previousDollarSign, dollarSign, 'ClassFu.previousDollarSign value is ok');
	});
});
