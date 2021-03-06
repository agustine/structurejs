var LinkedList = function () {
	'use strict';

	var Node = function (v) {
		var _value = v;
		var _next = null;
		var _previous = null;
		var _readOnlyNode = null;
		
		var updateReadOnlyNode = function(){		
			_readOnlyNode = {
				getValue: function() {
					return _value;
				},
				getPos: function(){
					if(_previous === null){
						return 0;
					}
					return _previous.asReadOnly().getPos() + 1;
				},
				getNext: function() {
					return _next !== null ?
					_next.asReadOnly() :
					null;
				},
				getPrevious: function() {
					return _previous !== null ?
					_previous.asReadOnly() :
					null;
				}
			};
		};
		
		updateReadOnlyNode();

		return {
			setValue: function(v) {
				_value = v;
			},
			getValue: function() {
				return _value;
			},
			getNext: function() {
				return _next;
			},
			setNext: function(n) {
				_next = n;
				updateReadOnlyNode();
			},
			getPrevious: function() {
				return _previous;
			},
			setPrevious: function(p) {
				_previous = p;
				updateReadOnlyNode();
			},
			asReadOnly: function() {
				return _readOnlyNode;
			}
		};
	};
	var _size = 0;
	var _head = null;
	var _tail = null;

	return {
		getSize: function() {
			return _size;
		},
		getHead: function() {
			return _head !== null ?
			_head.asReadOnly() :
			null;
		},
		getTail: function() {
			return _tail !== null ?
			_tail.asReadOnly() :
			null;
		},
		get: function(pos) {
			if(pos === 0){
				return _head !== null ?
				_head.asReadOnly() : null;
			}
			else if(pos > 0) {
				var node = _head;
				for(var index = 0; index < pos; index++){
					if(node === null){
						return null;
					}
					node = node.getNext();
				}
				return node !== null ?
				node.asReadOnly() : null;
			}
			return null;
		},
		add: function(value) {
			var node = new Node(value);

			if (_head === null) {
				_head = node;
			}

			if (_tail !== null) {
				_tail.setNext(node);
				node.setPrevious(_tail);
			}

			_tail = node;
			_size = _size + 1;
		},
		insertAfter: function(findValue, value) {
			var newNode = new Node(value);
			var node = new Node(findValue);

			for(var currentNode = _head; currentNode; currentNode = currentNode.getNext()) {
				if(currentNode.getValue() === node.getValue()) {
					if(_tail !== null && _tail === currentNode) {
						_tail.setNext(newNode);
						newNode.setPrevious(_tail);
						_tail = newNode;
						_size = _size + 1;
					} else {
						var nextNode = currentNode.getNext();
						nextNode.setPrevious(newNode);

						currentNode.setNext(newNode);

						newNode.setNext(nextNode);
						newNode.setPrevious(currentNode);
						_size = _size + 1;
					}

					break;
				}
			}
		},
		insertBefore: function(findValue, value) {
			var newNode = new Node(value);
			var node = new Node(findValue);

			for(var currentNode = _head; currentNode; currentNode = currentNode.getNext()) {
				if(currentNode.getValue() === node.getValue()) {
					if(_head !== null && _head === currentNode) {
						_head.setPrevious(newNode);
						newNode.setNext(_head);
						_head = newNode;
						_size = _size + 1;
					} else {
						var previousNode = currentNode.getPrevious();
						previousNode.setNext(newNode);

						currentNode.setPrevious(newNode);

						newNode.setNext(currentNode);
						newNode.setPrevious(previousNode);
						_size = _size + 1;
					}

					break;
				}
			}
		},
		find: function(value) {
			for(var currentNode = _head; currentNode; currentNode = currentNode.getNext()) {
				if(currentNode.getValue() === value) {
					return currentNode.asReadOnly();
				}
			}
		},
		remove: function(findValue) {
			var node = new Node(findValue);
			var nextNode = null;
			var previousNode = null;
			for(var currentNode = _head; currentNode; currentNode = currentNode.getNext()) {
				if(currentNode.getValue() === node.getValue()) {
					if(_head !== null && _head === currentNode && _tail !== null && _tail === currentNode) {
						currentNode.setPrevious(null);
						currentNode.setNext(null);
						_head = null;
						_tail = null;
						_size = _size - 1;
					} else if(_head !== null && _head === currentNode) {
						nextNode = currentNode.getNext();
						nextNode.setPrevious(null);
						_head = nextNode;
						_size = _size - 1;
					} else if(_tail !== null && _tail === currentNode) {
						previousNode = currentNode.getPrevious();
						previousNode.setNext(null);
						_tail = previousNode;
						_size = _size - 1;
					} else {
						nextNode = currentNode.getNext();
						previousNode = currentNode.getPrevious();

						nextNode.setPrevious(previousNode);
						previousNode.setNext(nextNode);
						_size = _size - 1;
					}

					break;
				}
			}
		},
		replace: function(findValue, value) {
			var node = new Node(findValue);

			for(var n = _head; n; n = n.getNext()) {
				if(n.getValue() === node.getValue()) {
					n.setValue(value);
					break;
				}
			}
		}
	};
};