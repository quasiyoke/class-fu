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

	test('takes HTMLCollection', function(){
		var els = document.getElementsByClassName('a');
		var $els = $(els);
		equal($els[0], els[0], 'Element 0 can be accessed through subscript');
		equal($els[1], els[1], 'Element 1 can be accessed through subscript');
		equal($els[2], els[2], 'Element 2 can be accessed through subscript');
		equal($els[3], els[3], 'Element 3 can be accessed through subscript');
		equal($els.length, 4, 'instance.length === 4');
	});

	test('takes CSS class selector', function(){
		var $els = $('.a');
		var els = document.getElementsByClassName('a');
		equal($els[0], els[0], 'Element 0 can be accessed through subscript');
		equal($els[1], els[1], 'Element 1 can be accessed through subscript');
		equal($els[2], els[2], 'Element 2 can be accessed through subscript');
		equal($els[3], els[3], 'Element 3 can be accessed through subscript');
		equal($els.length, 4, 'instance.length === 4');
	});

	test('takes CSS id selector', function(){
		var el = document.createElement('b');
		el.setAttribute('id', 'a');
		var fixture = document.getElementById('qunit-fixture');
		fixture.appendChild(el);
		var $el = $('#a');
		equal($el[0], el, 'Element can be accessed through subscript');
		equal($el.length, 1, 'instance.length === 1');		
	});
});
