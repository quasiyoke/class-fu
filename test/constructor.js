'use strict';
module('Constructor');

ClassFu(function(){
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

	test('takes classes commands', function(){
		ok($([], 'b').classFu, 'On empty array returns instance');
		var $els = $('.a', 'b');
		ok($els.classFu, 'Returns instance');
		equal($els[0].getAttribute('class'), 'b', 'Element 0 `class` attribute took given value');
		equal($els[1].getAttribute('class'), 'b', 'Element 1 `class` attribute took given value');
		equal($els[2].getAttribute('class'), 'b', 'Element 2 `class` attribute took given value');
		equal($els[3].getAttribute('class'), 'b', 'Element 3 `class` attribute took given value');
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
