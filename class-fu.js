'use strict';

(function(){
	var Constructor = function(obj, action){
		this.classes = function(){
			return classes.apply(this, arguments);
		};
		extend(this.classes, classListPrototype);
		this.classes.classFu = this;

		if(!obj){
			return;
		}

		if(isFunction(obj)){
			if(ClassFu.ready){
				obj(ClassFu);
			}else{
				readyCallbacks.push(obj);
			}
			return;
		}

		if(isString(obj)){
			if(obj.startsWith('#')){
				obj = document.getElementById(obj.slice(1));
			}else if(obj.startsWith('.')){
				obj = document.getElementsByClassName(obj.slice(1));
			}else{
				return;
			}
		}

		if(isElement(obj)){
			this[0] = obj;
			this.length = 1;
			this.classes.updateItems();
			return;
		}

		var i = this.length = obj.length;
		for(;i--;){
			this[i] = obj[i];
		}
		this.classes.updateItems();
	};
	Constructor.prototype.classFu = true;
	
	var classes = function(options){
		if(!options){
			if(!this.length){
				return;
			}
			return getClasses(this[0]);
		}
		if(!this.length){
			return this;
		}
		if(isString(options)){
			if(/^((^| )(\- |[+!] ?)[\w\d\-]+)+$/.test(options)){
				if(options.startsWith(' ')){
					throw 'Commands shouldn\'t start with space';
				}
				var s = options;
				options = {
					remove: [],
					add: [],
					toggle: []
				};
				var re = /([\-+!])( ?)([\w\d\-]+)/g;
				var match = re.exec(s);
				do{
					if('-' === match[1]){
						options.remove.push(match[3]);
					}else if('+' === match[1]){
						if(!match[2]){
							throw 'Command `add` must contain space after plus: "' + match[0] + '"';
						}
						options.add.push(match[3]);
					}else{
						if(match[2]){
							throw 'Command `toggle` must contain no space after exclamation: "' + match[0] + '"';
						}
						options.toggle.push(match[3]);
					}
					match = re.exec(s);
				}while(match);
			}else{
				for(var i=this.length; i--;){
					this[i].setAttribute('class', options);
				}
				this.classes.updateItems();
				return this;
			}
		}
		options.remove = options.remove || [];
		options.add = options.add || [];
		options.toggle = options.toggle || [];
		for(var i=this.length; i--;){
			var classes = getClasses(this[i]);
			var j;
			for(j=options.remove.length; j--;){
				delete classes[options.remove[j]]
			}
			for(j=options.add.length; j--;){
				classes[options.add[j]] = null;
			}
			for(j=options.toggle.length; j--;){
				if(null === classes[options.toggle[j]]){
					delete classes[options.toggle[j]];
				}else{
					classes[options.toggle[j]] = null;
				}
			}
			setClasses(this[i], classes);
		}
		this.classes.updateItems();
		return this;
	};

	var classListPrototype = {
		add: function(){
			this.call(this.classFu, {
				add: arguments
			});
		},
		
		contains: function(cls){
			if(!this.classFu || !this.classFu.length){
				return;
			}
			return null === getClasses(this.classFu[0])[cls];
		},

		remove: function(){
			this.call(this.classFu, {
				remove: arguments
			})
		},

		toggle: function(){
			var options = {};
			if(isBoolean(arguments[arguments.length - 1])){
				var classes = [];
				for(var i=arguments.length - 1; i--;){
					classes.push(arguments[i])
				}
				options[arguments[arguments.length - 1] ? 'add' : 'remove'] = classes;
			}else{
				options.toggle = arguments;
			}
			this.call(this.classFu, options);
		},

		updateItems: function(){
			var i = 0;
			var classes = this.call(this.classFu);
			var lastCount = this.count;
			if(classes){
				for(var cls in classes){
					this[i++] = cls;
				}
				this.count = i;
			}else{
				this.count = undefined;
			}
			if(lastCount){
				for(;i<lastCount;i++){
					delete this[i];
				}
			}
		}
	};

	var extend = function(a, b){
		for(var k in b){
			a[k] = b[k];
		}
	};

	var getClasses = function(element){
		var s = element.getAttribute('class');
		var retval = {};
		if(!s){
			return retval;
		}
		s = s.split(' ');
		for(var i=s.length; i--;){
			if(!s[i]){
				continue;
			}
			retval[s[i]] = null;
		}
		return retval;
	}

	var isBoolean = function(obj){
		return true === obj || false === obj;
	};

	var isCommand = function(s){
		var i = 0;
		var any = false;
		var command = function(){
			return (c('-') && c(' '))
		};

		return command();
	};
	
	var isElement = function(obj){
		return obj && 1 === obj.nodeType || false;
	};

	var isFunction = function(obj){
		return typeof obj === 'function';
	};

	var isString = function(obj){
		return typeof obj === 'string';
	};

	var setClasses = function(element, classes){
		var s = [];
		for(var cls in classes){
			s.push(cls);
		}
		s = s.join(' ');
		if(s){
			element.setAttribute('class', s);
		}else{
			element.removeAttribute('class');
		}
		return s;
	};

	var readyCallbacks = [];
	var onready = function(){
		ClassFu.ready = true;
		for(var i=0; i<readyCallbacks.length; i++){
			readyCallbacks[i](ClassFu);
		}
	}
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded', onready, false);
	}else{
		window.onload = onready;
	}

	var ClassFu = function(obj, commands){
		var retval = new Constructor(obj);
		if(commands){
			retval = retval.classes(commands);
		}
		return retval;
	};
	ClassFu.getClasses = getClasses;
	ClassFu.isElement = isElement;
	ClassFu.isFunction = isFunction;
	ClassFu.isString = isString;
	ClassFu.ready = false;
	ClassFu.setClasses = setClasses;
	
	window.ClassFu = ClassFu;
	ClassFu.previousDollarSign = window.$;
	window.$ = ClassFu;
})();
