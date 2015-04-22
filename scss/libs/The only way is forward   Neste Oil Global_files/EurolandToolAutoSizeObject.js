/*! Developed by Illimar Pihlamäe | e-mail: illimar@idra.pri.ee | Euroland Estonia © 2014 | e-mail: illimar@euroland.com */
var EurolandToolAutoSizeObject = new (function() {
/*
	The [EurolandToolAutoSizeObject] is used to give the parent window the correct height of the iframe
	To Activate the tool you need to call the [EurolandToolAutoSizeObject].load(<DOM>); function, but only after the document.load event has fired. NB! you need to pass the main container dom to the Object.				
*/
	
	this.marginOffset = 0; //Every body tag has a margin to to by default, this allows to set a correction for that.
	
	var This = this
		,height = 0
		,dom = null //the HTML Dom Object that is used to calculate the size of the tool
		//,topWindowsURL = '' //the parent pages URL, that is given to the tool through the hash
		,frameIndex = 0 //the index location of the tool in the [EurolandToolIntegrationObject]
		,IE_Version = getDocumentModeIE() //the IE version of the browser
		,isActivated = false //shows if the auto size is activated by the [EurolandToolIntegrationObject]
		,isLoaded = false //shows if the [EurolandToolAutoSizeObject] has been activated on the tool
		,checkHeightCallIntervalVar = null //the variable that holds the check height interval
		,domArr = [] //an array holding all of the wrappers that can have content
	;
	
	function getDocumentModeIE() {
	/*
		Returns the IE's DocumentMode for IE, for non IE 0 is returned.
	*/
		if(document.all) {
			return typeof document.documentMode == 'undefined' ? getIE_Version() : Math.floor(parseFloat(document.documentMode));
		} 		
		return 0;
	}
	
	function getIE_Version() {
	/*
		Returns the current IE version. Returns 0 if the browser is not a IE.
	*/
		if(!document.all) //if the browser is not a IE returns 0
			return 0;
		if(IE_Version != null) //if the browser version has already been found returns that
			return IE_Version;
		
		//Finds out the IE version
		var index
			,browser = navigator.userAgent
		;		
		
		index = browser.search('MSIE');
		if(index == -1)
			return 0;
		
		IE_Version = browser.substring(index + 4, browser.indexOf(';', index));
		IE_Version = Math.floor(parseFloat(IE_Version));
		return IE_Version;
	}
	
	function getStyle(el, styleProp) {
		var value, defaultView = (el.ownerDocument || document).defaultView;
		// W3C standard way:
		if (defaultView && defaultView.getComputedStyle) {
			// sanitize property name to css notation
			// (hypen separated words eg. font-Size)
			styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
			return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
		} else if (el.currentStyle) { // IE
			// sanitize property name to camelCase
			styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) { return letter.toUpperCase(); });
			
			value = el.currentStyle[styleProp];
			// convert other units to pixels on IE
			if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
				return (function(value) {
					var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
					el.runtimeStyle.left = el.currentStyle.left;
					el.style.left = value || 0;
					value = el.style.pixelLeft + "px";
					el.style.left = oldLeft;
					el.runtimeStyle.left = oldRsLeft;
					return value;
				})(value);
			}
			return value;
		}
	}

	function _init() {
		
		//if the browser does not support postMessage or the tool is not in a iFrame then simply returns
		if(!window.postMessage || IE_Version && IE_Version < 8 || window == window.top) {
			return;
		}
		
		if(window.addEventListener) {
			window.addEventListener('message', messageCall);
		} else {
			window.attachEvent('onmessage', messageCall);
		}
	}
	
	function messageCall(e) {
			
		if(!e) e = window.event;
		if(typeof e.data != 'string')
			return;
		var dataArr = e.data.split('-');
		if(dataArr.length != 2 || dataArr[0] != 'ActivateEurolandToolAutoSizeObject')
			return;
		
		//tries to get the iFrame's Frame Index
		try {
			frameIndex = parseFloat(dataArr[1]);
			isActivated = true;
		} catch(e) {
			return;
		}
		
		//Removes the activation listener
		if(window.removeEventListener) {
			window.removeEventListener('message', messageCall);
		} else {
			window.detachEvent('onmessage', messageCall);
		}
		
		//starts the height check
		activateHeightCheching();
	}
	
	function activateHeightCheching() {
	/*
		Activates the height checking
	*/
		//if the interval is already ongoing or the [EurolandToolAutoSizeObject] has not been loaded or activated then returns
		if(checkHeightCallIntervalVar != null || !isLoaded || !isActivated)
			return;
		checkHeightCallIntervalVar = setInterval(function() { checkHeight(); }, 30);
	}

	function removeHash(url) {
		var index = url.indexOf('#');
		if(index > -1) {
			url = url.substring(0, index);
		}
		return url
	}
	
	function checkHeight() {
				
		var maxHeight = 0, index, temp;
		index = domArr.length;
		while(index--) {
			temp = parseFloat(domArr[index].offsetHeight) + This.marginOffset; 
			if(temp > maxHeight) {
				maxHeight = temp;
			}
		}
		
		if(maxHeight != height) {
			height = maxHeight;
			window.top.postMessage('{ "iFrame" : { "height" : ' + height + ', "index" : ' + frameIndex + ' }}', '*');
		}
	}
	
	
	
	this.load = function(mainDomArr) {
	/*
		Activates the object, needs to be called after Document.load
		mainDom - the HTML DOM Object that is the main container for the tool and who's size movement is used to calculate the size of the tool
		
		Returns TRUE if the Object was activated, FALSE if not.
	*/		
		//if the browser does not support postMessage or the tool is not in a iFrame then simply returns
		if(!window.postMessage || IE_Version && IE_Version < 8 || window == window.top) {
			return;
		}
		
		var obj, index, arr, temp;
		
		if(!This.marginOffset) {
			//if the body margin has not been set, then we set it
			This.marginOffset = parseFloat(getStyle(document.body, 'margin-top').replace('px', '')) + parseFloat(getStyle(document.body, 'margin-bottom').replace('px', '')) + 20;
		}		
		
		if(typeof mainDomArr == 'string' || typeof mainDomArr == 'object' && !('length' in mainDomArr)) {
			arr = [];			
			arr.push(mainDomArr);
		} else {
			arr = mainDomArr;
		}
		
		index = arr.length
		while(index--) {
			obj = arr[index];
			
			if(typeof obj == 'string') {
				obj = document.getElementById(obj);
			}
			
			if(typeof obj != 'object' || obj == null || window.parent == window)
				continue;
			
			domArr.push(obj);
		}
		
		if(!domArr.length) {
			return false;
		}
				
		// try {
			// temp = parseFloat(mainDom.offsetHeight) + this.marginOffset;
		// } catch(e) {
			// return false;
		// }
						
		isLoaded = true;
		
		//starts the height check
		activateHeightCheching();
		
		return true;
	};
	
	_init();
	
})();