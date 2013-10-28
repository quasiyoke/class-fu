'use strict';
module('Constructor');

ClassFu(function(){
	test('dollar sign', function(){
		equal($, ClassFu, 'ClassFu could be accesed through $ shortcut');
	});
	
	test('previous dollar sign', function(){
		equal($.previousDollarSign, dollarSign, 'ClassFu.previousDollarSign value is ok');
	});
});
