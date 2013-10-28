'use strict';
ClassFu(function(){
	module('Utility');

	test('get classes', function(){
		var el = document.createElement('b');
		el.setAttribute('class', 'a b  class foo-bar ');
		deepEqual($.getClasses(el), {a: null, b: null, class: null, 'foo-bar': null}, 'Gets CSS classes of element');
	});
});
