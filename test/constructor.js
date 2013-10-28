'use strict';
module('Constructor');

ClassFu(function(){
	test('dollar sign', function(){
		equal($, ClassFu, 'ClassFu could be accessed through $ shortcut');
	});
	
	test('previous dollar sign', function(){
		equal($.previousDollarSign, dollarSign, 'ClassFu.previousDollarSign value is ok');
	});

	test('takes element', function(){
		var el = document.createElement('b');
		var $el = $(el);
		equal($el[0], el, 'Element can be accessed through subscript');
		equal($el.length, 1, 'instance.length === 1');
	});
});
