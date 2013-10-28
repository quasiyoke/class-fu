'use strict';

(function(){
	var Constructor = function(obj, action){
		if(isString(obj)){
			if(obj.startsWith('#')){
				obj = document.getElementById(obj.slice(1))
			}else{
				return;
			}
		}
		
		if(!obj){
			return;
		}
		
		if(isElement(obj)){
			this[0] = obj;
			this.length = 1;
			return;
		}

		if(isFunction(obj)){
			if(document.addEventListener){
				document.addEventListener('DOMContentLoaded', obj, false);
			}else{
				window.onload = obj;
			}
			return;
		}

		var i = this.length = obj.length;
		for(;i--;){
			this[i] = obj[i];
		}
	};
	Constructor.prototype.classFu = true;
	
	var isElement = function(obj){
		return obj && 1 === obj.nodeType || false;
	};

	var isFunction = function(obj){
		return typeof obj === 'function';
	};

	var isString = function(obj){
		return typeof obj === 'string';
	};

	var ClassFu = function(obj, action){
		return new Constructor(obj, action);
	};
	ClassFu.isElement = isElement;
	ClassFu.isFunction = isFunction;
	ClassFu.isString = isString;
	
	window.ClassFu = ClassFu;
	ClassFu.previousDollarSign = window.$;
	window.$ = ClassFu;
})();
