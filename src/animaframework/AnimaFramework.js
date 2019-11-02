/* UTILITY MODULE */
var AnimaUtility = AnimaUtility || {
    isElement: function(o) {
        return (typeof HTMLElement === 'object') ?
            o instanceof HTMLElement :
            (o) && (typeof o === 'object') && (o.nodeType === 1) && (typeof o.nodeName === 'string');
    },
    isInside: function(x, y, elem) {
        if(!elem.isElement())
            return false;

        var xOffset = parseFloat(toFloat(getJSValue(elem, 'left')));
        var yOffset = parseFloat(toFloat(getJSValue(elem, 'top')));
        var xMax = parseFloat(toFloat(getJSValue(elem, 'width')));
        var yMax = parseFloat(toFloat(getJSValue(elem, 'height')));

        var normalX = x - xOffset;
        var normalY = y - yOffset;

        return (normalX >= 0 && normalX <= xMax) && (normalY >= 0 && normalY <= yMax);
    }
};
Object.prototype.isElement = function() {
    return AnimaUtility.isElement(this);
};
Object.prototype.isInside = function(X, Y) {
    return AnimaUtility.isInside(X, Y, this);
};

/* UTILITY MODULE */

/* CSS MODULE */
Object.prototype.addClass = function(className) {
    if(!AnimaUtility.isElement(this))
        return;

    var middle = new RegExp("\\s+" + className + "\\s+");      // middle class
    var start = new RegExp("^" + className + "\\W");         // start class
    var endClass = new RegExp("\\W" + className + "$");      // end line
    var wholeClassName = new RegExp("^" + className + "$");             // whole classname list

    if(start.test(this.className) || middle.test(this.className) || endClass.test(this.className) || wholeClassName.test(this.className)) {
        return;
    }

    this.className += ' ' + className;
};
Object.prototype.addClasses = function(classNames) {
    var classes = classNames.split(/\s+/);
    for(var c = 0; c < classes.length; c++) {
        var className = classes[c];
        if(className.length > 0)
            this.addClass(className);
    }
};
Object.prototype.removeClass = function(className) {
    if(!AnimaUtility.isElement(this))
        return;


    /*while(className.charAt(0) == ' ') {
        className = className.substring(1);
    }

    if(element.className.search(' '+className) == -1)
        return;

    element.className = element.className.replace(' ' + className, '');*/
    var classes = this.className.split(/\s+/);
    var newClassName = "";
    for(var c = 0; c < classes.length; c++) {
        if(classes[c] !== className)
            newClassName += classes[c] + " ";
    }

    this.className = newClassName;

};
Object.prototype.containsClass = function(className) {
    if(!AnimaUtility.isElement(this))
        return false;
    return this.className.search(className) >= 0;
};

/*
	Ottiene il valore della proprietà css valutata ed elaborata di un ceto elemento.

	Object (this): elemento a cui si fa riferimento.
	styleProp: indica il nome testuale della proprietà css, e.g.: font-size
*/
Object.prototype.getStyle = function(styleProp) {
    var value, defaultView = this.ownerDocument.defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
        // sanitize property name to css notation (hypen separated words eg. font-Size)
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(this, null).getPropertyValue(styleProp);
    } else if (this.currentStyle) { // IE
        // sanitize property name to camelCase
        styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
            return letter.toUpperCase();
        });
        value = this.currentStyle[styleProp];
        // convert other units to pixels on IE
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function(value) {
                var oldLeft = this.style.left, oldRsLeft = this.runtimeStyle.left;
                this.runtimeStyle.left = this.currentStyle.left;
                this.style.left = value || 0;
                value = this.style.pixelLeft + "px";
                this.style.left = oldLeft;
                this.runtimeStyle.left = oldRsLeft;
                return value;
            })(value);
        }
        return value;
    }
};

Object.prototype.containComputedProperty = function(propertyName, propertyValue) {
    if(!AnimaUtility.isElement(this))
        return false;

    var value = this.getStyle(propertyName);
    return value === propertyValue;
};
Object.prototype.containProperty = function(propertyName, propertyValue) {
    if(!AnimaUtility.isElement(this))
        return false;

    var selectorsArray = document.getSelectorsByStyleProperty(propertyName, propertyValue);
    var selectors = "";
    for(var sIndex = 0; sIndex < selectorsArray.length; sIndex++) {
        selectors += selectorsArray[sIndex] + " ";
    }

    var pattern;


    // selectors is a string that now contains all selector with propertyName (and eventually propertyValue) specified
    // testing with regex will return true if and only if selectors contains at least one class of element
    var classes = this.classList;
    for(var index = 0; index < classes.length; index++) {
        pattern = new RegExp("\\." + classes[index] + "[\\{|\\s+]");
        if(pattern.test(selectors))
            return true;
    }

    return false;
};
Object.prototype.getAllElements = function() {
    if(!AnimaUtility.isElement(this))
        return null;

    var elements = [this];
    var children = this.children || this.childNodes;

    for(var k = 0; k < children.length; k++) {
        Array.prototype.push.apply(elements, (children[k]).getAllElements());
    }

    return elements;
};
Object.prototype.isDisplayed = function() {
    return this.getStyle('display') !== 'none' || (this.style != null && typeof this.style === 'string' && this.style.display !== 'none');
};
Object.prototype.getElementsByAttributeName = function(attributeName) {
    var inners = this.getAllElements();
    var elementsFiltered = [];
    for(var i = 0; i < inners.length; i++) {
        var elem = inners[i];
        if(elem != null && typeof elem !== 'undefined' && elem.hasAttribute(attributeName))
            elementsFiltered.push(elem);
    }

    return elementsFiltered;
};
Object.prototype.getElementsByAttribute = function(attributeName, value) {
    var elements = this.getElementsByAttributeName(attributeName);
    var result = [];
    for(var i = 0; i < elements.length; i++) {
        var elemValue = elements[i].getAttribute(attributeName);
        if(value === elemValue)
            result.push(elements[i]);
    }
    return result;
};
document.getElementsBySelectorString = function(selectorString) {
    var selectorElements = selectorString.split(",");
    var elements = [];

    for(var i = 0; i < selectorElements.length; i++) {
        /*
         * SelectorString is a css selector string that follows css syntax (e.g.: div.data  a.buttons, table, .candyMan, a:hover    div)
         * SelectorString is at first normalized reducing redundant spaces to one single space and removing that ones before element selector.
         * After this operation, the example selectorString will become: div.data a.buttons,table,.candyMan,a:hover div.
         * Then just split by comma and found all element selectors (classes).
         */
        var selector = selectorElements[i].replace(/(.+)\s+/g, "$1 ").replace(/^\s+/, '');
        var classes = selector.split(/\s+/);
        var nodes = [];
        for(var k = 0; k < classes.length; k++) {
            /*
             * Finding classes is not enough. The elements must be pushed into result respecting the css syntax.
             * For example div.data a.buttons refers only to a.buttons elements inside div.data etc.
             */
            var newNodes = [];

            // removing pseudo-things
            classes[k] = classes[k].replace(/:\w*/, '');

            // checking if class-name, id-name or tag_name
            if(/.*\..*/.test(classes[k])) {
                // class name
                var className = classes[k].replace(/.*\.(.*)/, "$1");
                if(k === 0) {
                    Array.prototype.push.apply(newNodes, document.getElementsByClassName(className));
                } else {
                    for(var n = 0; n < nodes.length; n++) {
                        var node = nodes[n];
                        Array.prototype.push.apply(newNodes, node.getElementsByClassName(className));
                    }
                }
            }
            else if(/#.*/.test(classes[k])) {
                // id name
                var idName = classes[k].replace("#(.*)", "$1");
                if(k === 0) {
                    var elem = document.getElementById(idName);
                    if(elem != null && typeof elem !== 'undefined')
                        newNodes.push(elem);
                } else {
                    for(n = 0; n < nodes.length; n++) {
                        node = nodes[n];

                        var e = node.getElementById(idName);
                        if(e != null && typeof e !== 'undefined')
                            newNodes.push(e);
                    }
                }
            }
            else if(classes[k].length > 0) {
                // tagName
                var tagName = classes[k];
                if(k === 0) {
                    Array.prototype.push.apply(newNodes, document.getElementsByTagName(tagName));
                } else {
                    for(n = 0; n < nodes.length; n++) {
                        node = nodes[n];
                        Array.prototype.push.apply(newNodes, node.getElementsByTagName(tagName));
                    }
                }
            }

            nodes = newNodes;
        }


        Array.prototype.push.apply(elements, nodes);
    }
    return elements;
};
document.getSelectorsByStyleProperty = function(propertyName, propertyValue) {
    var selectors = [];
    var sheets = document.styleSheets;
    var regexTest = new RegExp(propertyName + ":\\s*" + propertyValue);
    var isMedia = new RegExp("@media");

    for(var s = 0; s < sheets.length; s++) {
        var rules = sheets[s].rules || sheets[s].cssRules;
        for(var r = 0; r < rules.length; r++) {
            var cssText = rules[r].cssText || rules[r].style.cssText;

            if(isMedia.test(cssText))  {
                var innerRules = rules[r].cssRules || rules[r].rules;
                for(var ir = 0; ir < innerRules.length; ir++) {
                    cssText = innerRules[ir].cssText;
                    if(regexTest.test(cssText)) {
                        selectors.push(innerRules[ir].selectorText)
                    }
                }
            } else {
                if(regexTest.test(cssText)) {
                    selectors.push(rules[r].selectorText);
                }
            }

        }
    }

    return selectors;
};
document.getElementsByStyleProperty = function(propertyName, propertyValue) {

    if(propertyName == null || typeof propertyName === 'undefined')
        return [];
    if(typeof propertyValue === 'undefined')
        propertyValue = null;


    var selectorsArray = document.getSelectorsByStyleProperty(propertyName, propertyValue);      // getting all css selectors with propertyName and (eventually) propertyValue specified
    var selectors = "";
    for(var sIndex = 0; sIndex < selectorsArray.length; sIndex++) {
        selectors += selectorsArray[sIndex] + ",";                                      // adapting selector list for regex
    }
    selectors = selectors.substring(0, selectors.length-1);


    return document.getElementsBySelectorString(selectors);
};

/* CSS MODULE */

/* ANIMATION MODULE */
Object.prototype.rotateY = function(d) {
    var s = "rotate3d(0, 1, 0, " + d + "deg)";
    if (this.style) { // regular DOM Object
        this.style.MozTransform = s;
        this.style.WebkitTransform = s;
        this.style.OTransform = s;
        this.style.MSTransform = s;
        this.style.transform = s;
    }
    this.setAttribute("rotationY", d);
};
Object.prototype.rotateX = function(d) {
    var s = "rotate3d(1, 0, 0, " + d + "deg)";
    if (this.style) { // regular DOM Object
        this.style.MozTransform = s;
        this.style.WebkitTransform = s;
        this.style.OTransform = s;
        this.style.MSTransform = s;
        this.style.transform = s;
    }
    this.setAttribute("rotationX", d);
};
Object.prototype.rotateZ = function(d) {
    var s = "rotate3d(0, 0, 1, " + d + "deg)";
    if (this.style) { // regular DOM Object
        this.style.MozTransform = s;
        this.style.WebkitTransform = s;
        this.style.OTransform = s;
        this.style.MSTransform = s;
        this.style.transform = s;
    }
    this.setAttribute("rotationZ", d);
};
Object.prototype.rotationX = function() {
    var x = this.getAttribute("rotationX");
    if(x == null || typeof x === 'undefined' || isNaN(x))
        return 0;

    return x;

};
Object.prototype.rotationY = function() {
    var x = this.getAttribute("rotationY");
    if(x == null || typeof x === 'undefined' || isNaN(x))
        return 0;

    return x;
};
Object.prototype.rotationZ = function() {
    var x = this.getAttribute("rotationZ");
    if(x == null || typeof x === 'undefined' || isNaN(x))
        return 0;

    return x;
};
Object.prototype.borderRadius = {

    getTopLeft: function(elem) {
        var tl = parseInt(toInt(elem.getStyle("border-top-left-radius"))) || elem.getAttribute("borderRadiusTopLeft");
        if(tl == null || typeof tl === 'undefined' || isNaN(tl))
            return 0;

        return toInt(tl);
    },
    getTopRight: function(elem) {
        var tl = parseInt(toInt(elem.getStyle("border-top-right-radius"))) || elem.getAttribute("borderRadiusTopRight");
        if(tl == null || typeof tl === 'undefined' || isNaN(tl))
            return 0;

        return toInt(tl);
    },
    getBottomLeft: function(elem) {
        var tl = parseInt(toInt(elem.getStyle("border-bottom-left-radius"))) || elem.getAttribute("borderRadiusBottomLeft");
        if(tl == null || typeof tl === 'undefined' || isNaN(tl))
            return 0;

        return toInt(tl);
    },
    getBottomRight: function(elem) {
        var tl = parseInt(toInt(elem.getStyle("border-bottom-right-radius"))) || elem.getAttribute("borderRadiusBottomRight");
        if(tl == null || typeof tl === 'undefined' || isNaN(tl))
            return 0;

        return toInt(tl);
    },
    setTopLeft: function(elem,value) {
        var s = value + "px";
        if (elem.style) { // regular DOM Object
            elem.style.borderTopLeftRadius = s;
        }
        elem.setAttribute("borderRadiusTopLeft", value);
    },
    setTopRight: function(elem,value) {
        var s = value + "px";
        if (elem.style) { // regular DOM Object
            elem.style.borderTopRightRadius = s;
        }
        elem.setAttribute("borderRadiusTopRight", value);
    },
    setBottomLeft: function(elem,value) {
        var s = value + "px";
        if (elem.style) { // regular DOM Object
            elem.style.borderBottomLeftRadius = s;
        }
        elem.setAttribute("borderRadiusBottomLeft", value);
    },
    setBottomRight: function(elem,value) {
        var s = value + "px";
        if (elem.style) { // regular DOM Object
            elem.style.borderBottomRightRadius = s;
        }
        elem.setAttribute("borderRadiusBottomRight", value);
    }
};
Object.prototype.animationLeft = function(animationTime, animationCurve, leftValue) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationLeft(this, animationTime, animationCurve, leftValue));

};
Object.prototype.animateLeft = function(animationTime, animationCurve, leftValue) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationLeft(animationTime, animationCurve, leftValue)).start();
};
Object.prototype.animationTop = function(animationTime, animationCurve, topValue) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationTop(this, animationTime, animationCurve, topValue));

};
Object.prototype.animateTop = function(animationTime, animationCurve, topValue) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationTop(animationTime, animationCurve, topValue)).start();
};
Object.prototype.animationBottom = function(animationTime, animationCurve, bottomValue) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationBottom(this, animationTime, animationCurve, bottomValue));

};
Object.prototype.animateBottom = function(animationTime, animationCurve, bottomValue) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationBottom(animationTime, animationCurve, bottomValue)).start();
};
Object.prototype.animationScrollTop = function(animationTime, animationCurve, deltaScroll) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationScrollTop(this, animationTime, animationCurve, deltaScroll));

};
Object.prototype.animateScrollTop = function(animationTime, animationCurve, deltaScroll) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationScrollTop(animationTime, animationCurve, deltaScroll)).start();
};
Object.prototype.animationScrollToTop = function(animationTime, animationCurve, scrollTopFinalValue) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationScrollToTop(this, animationTime, animationCurve, scrollTopFinalValue));

};
Object.prototype.animateScrollToTop = function(animationTime, animationCurve, scrollTopFinalValue) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationScrollToTop(animationTime, animationCurve, scrollTopFinalValue)).start();
};
Object.prototype.animationOpacity = function(animationTime, animationCurve, opacityPercent) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationOpacity(this, animationTime, animationCurve, opacityPercent));

};
Object.prototype.animateOpacity = function(animationTime, animationCurve, opacityPercent) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationOpacity(animationTime, animationCurve, opacityPercent)).start();
};
Object.prototype.animationWidth = function(animationTime, animationCurve, widthValue) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationWidth(this, animationTime, animationCurve, widthValue));

};
Object.prototype.animateWidth = function(animationTime, animationCurve, widthValue) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationWidth(animationTime, animationCurve, widthValue)).start();
};
Object.prototype.animationHeight = function(animationTime, animationCurve, heightValue) {
    if(!AnimaUtility.isElement(this))
        return;
    return (new Animations.AnimationHeight(this, animationTime, animationCurve, heightValue));

};
Object.prototype.animateHeight = function(animationTime, animationCurve, heightValue) {
    if(!AnimaUtility.isElement(this))
        return;
    (this.animationHeight(animationTime, animationCurve, heightValue)).start();
};

/* Global Variable declaration */
var number_of_oscillation = 2;
function setNumberOfOscillations(number){
    number_of_oscillation = number;
}
var AnimationCurves = {
    none: 'none',
    exponentialsincos: 'exponentialsincos',
    exponential: 'exponential',
    linear: 'linear',
    exponentialsincosReversed: 'exponentialsincos-reversed',
    exponentialReversed: 'exponential-reversed',
    square: 'square',
    squareReversed: 'square-reversed',
    cubic: 'cubic'
};

/* Formulas to calculate curve points */
function expCurve(t, timeToStable, useSinCos) {
    var realTimeToStable = timeToStable / 0.924;

    if(t < 0)
        return 0;
    else if(t >= timeToStable)
        return 1;


    var lamda = 5 / realTimeToStable; 										// tau = 1/lamda is the abs of e exponent: e^(-lamda * t). 5tau from t = 0 means that the effect has ended


    var k = 1.01;
    var factExp = k*(Math.pow(Math.E, -lamda*t)-1)+1;
    var result = 1 -  factExp;
    if(useSinCos) {
        var omega = number_of_oscillation * 0.4 * Math.PI * lamda;		// 1 sola oscillazione. Il tempo impiegato deve essere identico al tempo di assestamento (fattore esponenziale)
        // quindi T = 5tau => f = lamda/5. Pulsation is 2pi*f -> 0.4*Math.PI * lamda
        // number_of_oscillation are the number of "rounds" it does
        // inoltre animationObject.stepTime < 1/(2f) dove f = 0.2*lambda*number_of_oscillation. animationObject.stepTime < 1/12 = 0.083

        /*
         * l'operazione "result--" è necessaria per la stabilità, infatti omettendolo, per t molto grande, result
         * varrebbe 1 con conseguente fatto che moltiplicandolo per la funzione sincos, si otterrebbe la funzione
         * sincos.
         * riducendo di un'unità, stiamo traslando l'iensieme delle soluzioni di un'unità a sinistra e pertanto, per
         * t molto grande la funzione tende a 0 eliminando la componente sincos.
         * Il risultato viene nuovamente traslato di 1 a destra riportando la funzione verso gli stessi punti iniziali e finali
         * Viene inoltre introdotto uno sfasamento di -PI/4 per portare il valore iniziale a 0.
         *
         */
        result--;
        result  *= (Math.cos(omega*t-Math.PI/4) - Math.sin(omega*t-Math.PI/4))/Math.sqrt(2);
        result++;
    }

    return result;
}
function expCurveReversed(t, timeToStable, useSinCos) {
    if(t < 0)
        return 0;
    else if(t >= timeToStable)
        return 1;

    var realTimeToStable = timeToStable/0.924;
    var lamda = 5 / realTimeToStable; 										// tau = 1/lamda is the abs of e exponent: e^(-lamda * t). 5tau from t = 0 means that the effect has ended

    var k = 1.01;
    t = realTimeToStable - t;

    var result = k*(Math.pow(Math.E, -lamda*t)-1)+1;
    if(useSinCos) {
        var omega = number_of_oscillation * 0.4 * Math.PI * lamda;		// 1 sola oscillazione. Il tempo impiegato deve essere identico al tempo di assestamento (fattore esponenziale)
        // quindi T = 5tau => f = lamda/5. Pulsation is 2pi*f -> 0.4*Math.PI * lamda
        // number_of_oscillation are the number of "rounds" it does
        // inoltre animationObject.stepTime < 1/(2f) dove f = 0.2*lambda*number_of_oscillation. animationObject.stepTime < 1/12 = 0.083
        result  *= (Math.cos(omega*t-Math.PI/4) - Math.sin(omega*t-Math.PI/4))/Math.sqrt(2);
    }

    return result;
}
function linearCurve(t, timeToStable) {
    if(t >= (timeToStable))
        return 1;
    if(t < 0)
        return 0;

    return t/(timeToStable);
}
function squareCurve(t, timeToStable) {
    if(t <= 0)
        return 0;
    else if(t >= timeToStable)
        return 1;

    return Math.pow((t/timeToStable), 2);
}
function squareCurveReversed(t, timeToStable) {
    if(t <= 0)
        return 0;
    else if(t >= timeToStable)
        return 1;

    return -Math.pow(((t-timeToStable)/timeToStable), 2) + 1;
}

function cubicCurve(t, timeToStable) {
    if(t <= 0)
        return 0;
    else if(t >= timeToStable)
        return 1;

    var x =(t-timeToStable/2)*2/(timeToStable*Math.pow(2,1/3));             // cambio di variabile che scala la curva per rispettare il tempo di animazione e trasla l'asse per avere simmetria rispetto a y
    return Math.pow(x, 3)+0.5;
}
function noneCurve(t) {
    if (t < 0) 	return 0;
    else 		return 1;
}
function dimensionMultiplier(t, timeToStable, typeOfCurve) {
    if(typeOfCurve.toLowerCase() === 'exponential')
        return expCurve(t, timeToStable, false);
    else if(typeOfCurve.toLowerCase() === 'exponentialsincos')
        return expCurve(t, timeToStable, true, false);
    else if(typeOfCurve.toLowerCase() === 'linear')
        return linearCurve(t, timeToStable);
    else if(typeOfCurve.toLowerCase() === 'none')
        return noneCurve(t);
    else if(typeOfCurve.toLowerCase() === 'square')
        return squareCurve(t, timeToStable);
    else if(typeOfCurve.toLowerCase() === 'cubic')
        return cubicCurve(t, timeToStable);
    else if(typeOfCurve.toLowerCase() === 'exponential-reversed')
        return expCurveReversed(t, timeToStable, false);
    else if(typeOfCurve.toLowerCase() === 'exponentialsincos-reversed')
        return expCurveReversed(t, timeToStable, true);
    else if(typeOfCurve.toLowerCase() === 'square-reversed')
        return squareCurveReversed(t, timeToStable);


    return 0;
}

var GraphicMethods = GraphicMethods || {
    setBorderRadius: function(animationObj, elem, values) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null || values == null || values.length > 4 || values.length == 3 || values.length == 0)
            return;

        var vs = translateFourDimensionSyntaxes(values);


        elem.borderRadius.setTopLeft(elem, vs[0]);
        elem.borderRadius.setTopRight(elem, vs[1]);
        elem.borderRadius.setBottomLeft(elem, vs[2]);
        elem.borderRadius.setBottomRight(elem, vs[3]);
    },
    setBackroundSize: function (elem, sizeProperty) {
        try {
            elem.style.backgroundSize = sizeProperty + "";
        } catch(err) {}
    },
    setBackgroundColor: function(elem, color) {
        try {
            elem.style.backgroundColor = color;
        } catch(err) {}
    },
    setBackgroundColorRGBA: function(animationObj, elem, R, G, B, A) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        var colorString = "rgba(" + R + ", " + G + ", " + B + ", " + A + ")";
        GraphicMethods.setBackgroundColor(elem, colorString);
    },
    setBackgroundColorHSLA: function(animationObj, elem, H, S, L, A) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        S = parseInt(S);
        L = parseInt(L);
        var colorString = "hsla(" + H + ", " + S + "%, " + L + "%, " + A + ")";
        GraphicMethods.setBackgroundColor(elem, colorString);
    },
    setTextColor: function(elem, color) {
        try {
            elem.style.color = color;
        } catch(err) {}
    },
    setTextColorRGBA: function(animationObj, elem, R, G, B, A) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        var colorString = "rgba(" + R + ", " + G + ", " + B + ", " + A + ")";
        GraphicMethods.setTextColor(elem, colorString);
    },
    setZIndex: function(elem, index) {
        if(elem == null)
            return;

        elem.style.zIndex = index;
    },
    rotateX: function(elem, deg) {
        if(elem == null)
            return;

        if(deg == null)
            return;

        elem.rotateX(deg % 1080);
    },
    rotateY: function(elem, deg) {
        if(elem == null)
            return;

        if(deg == null)
            return;

        elem.rotateY(deg % 1080);
    },
    rotateZ: function(elem, deg) {
        if(elem == null)
            return;

        if(deg == null)
            return;

        elem.rotateZ(deg % 1080);
    },
    rotate: function(animationObj, elem, axis, deg) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(axis == null)
            return;

        if(axis.toString().toLowerCase() === "x") {
            GraphicMethods.rotateX(elem, deg);
        }
        else if(axis.toString().toLowerCase() === "y") {
            GraphicMethods.rotateY(elem, deg);
        }
        else if(axis.toString().toLowerCase() === "z") {
            GraphicMethods.rotateZ(elem, deg);
        }

    },
    doRotateFunction: function(animationObject, elem, axis, deg, initialDeg, timeToStable, typeOfCurve) {
        initialDeg = toInt(getInitialAxisDeg(axis, elem));
        for(var t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var finalDeg = Math.floor(deg*multiplier + initialDeg);


            animationObject.timeouts.push(
                setTimeout( function(finalDeg) {
                    GraphicMethods.rotate(animationObject, elem, axis, finalDeg);
                }, t*1000, finalDeg)
            );
        }
        finalDeg = initialDeg+deg;
        setTimeout( function(finalDeg) {
            GraphicMethods.rotate(animationObject, elem, axis, finalDeg);
            animationObject.stop();
        }, timeToStable*1000, finalDeg);
    },
    setRotateFunctionX: function(animationObject, elem, deg, timetoStable, typeOfCurve) {
        if(elem == null || deg == null || timetoStable == null || timetoStable < 0 || typeOfCurve == null)
            return;

        var currentRotation = elem.rotationX();
        GraphicMethods.doRotateFunction(animationObject, elem, "x", deg, currentRotation, timetoStable, typeOfCurve);
    },
    setRotateFunctionY: function(animationObject, elem, deg, timetoStable, typeOfCurve) {
        if(elem == null || deg == null || timetoStable == null || timetoStable < 0 || typeOfCurve == null)
            return;

        var currentRotation = elem.rotationY();
        GraphicMethods.doRotateFunction(animationObject, elem, "y", deg, currentRotation, timetoStable, typeOfCurve);
    },
    setRotateFunctionZ: function(animationObject, elem, deg, timetoStable, typeOfCurve) {
        if(elem == null || deg == null || timetoStable == null || timetoStable < 0 || typeOfCurve == null)
            return;

        var currentRotation = elem.rotationZ();
        GraphicMethods.doRotateFunction(animationObject, elem, "z", deg, currentRotation, timetoStable, typeOfCurve);
    },
    setOpacity: function(animationObj, elem, opacityPercent) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.filter = "alpha(opacity=" + opacityPercent + ")";
        elem.style.opacity= (opacityPercent/100.0);
    },
    setHeight: function(animationObj, elem, height) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.height = height + 'px';
    },
    setWidth: function(animationObj, elem, width) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.width = width + 'px';
    },
    setLeft: function(animationObj, elem, left) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.left = left + 'px';
    },
    setTop: function(animationObj, elem, top) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.top = top + 'px';
    },
    setScrollTop: function(animationObj, elem, top) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.scrollBy(0, top);
    },
    setScrollToTop: function(animationObj, elem, top) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;


        elem.scrollTop = top;
    },
    setBottom: function(animationObj, elem, bottom) {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.bottom = bottom + 'px';
    },
    getBackgroundColor: function(elem) {
        var rgbString = elem.getStyle("background-color");
        var RGBAArray = [];
        var openParIndex = rgbString.toString().indexOf("(");
        var closedParIndex = rgbString.toString().indexOf(")");

        if(openParIndex < 0 || closedParIndex <= openParIndex)
            return [0,0,0,0];

        var insideParenthesis = rgbString.toString().substring(openParIndex+1, closedParIndex)
        var values = insideParenthesis.split(",");
        for(var i = 0; i < 3; i++) {
            // rgb
            RGBAArray.push(parseInt(values[i]));
        }
        if(values.length == 4) {
            // there is Alpha
            RGBAArray.push(parseFloat(values[3]));
        } else {
            // Set max opacity
            RGBAArray.push(1);
        }

        return RGBAArray;
    },
    /*
	Questo metodo è un'animazione che descrive la transizione tra un colore di Sfondo e un altro di un certo elemento.

	fromColor: è un'array di 4 byte, ciascun byte identifica il valore di un colore primario, mentre l'ultimo della trasparenza, secondo l'ordine RGBA
	toColor: come fromColor, ma è il colore di "destinazione"
	elemID: tipo Stringa, è l'id dell'elemento a cui applicare l'effetto
	timeToStable: è il tempo che ci mette l'animazione a copletarsi, espresso in secondi
	typeOfCurve: può eseere "exponential", "exponentialsincos", "linear", "none", "gauss". l'ultima è disponibile solo se viene abilitata all'inizio di questo file e nel metodo dimensionMultiplier.
*/
    setBackgroundColorFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var t = 0;
        var fromColor = GraphicMethods.getBackgroundColor(elem);
        var fc_alpha = fromColor[3];
        fromColor = rgbtohsl(fromColor[0], fromColor[1], fromColor[2]);
        fromColor.push(fc_alpha);

        var toColor = args[0];
        var tc_alpha = toColor[3];
        toColor = rgbtohsl(toColor[0], toColor[1], toColor[2]);
        toColor.push(tc_alpha);

        // adjusting hue for gray scale colors
        if(fromColor[1] === 0) {
            fromColor[0] = toColor[0];
        }
        if(toColor[1] === 0) {
            toColor[0] = fromColor[0];
        }

        var deltaColor = {
            H: toColor[0] - fromColor[0],
            S: toColor[1] - fromColor[1],
            L: toColor[2] - fromColor[2],
            A: toColor[3] - fromColor[3]
        };


        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offH = Math.floor(deltaColor.H*multiplier);
            var offS = Math.floor(deltaColor.S*multiplier);
            var offL = Math.floor(deltaColor.L*multiplier);
            var offA = Math.round(deltaColor.A*multiplier*10000)/10000;

            var tarH = parseFloat(fromColor[0]) + offH;
            var tarS = parseFloat(fromColor[1]) + offS;
            var tarL = parseFloat(fromColor[2]) + offL;
            var tarA = parseFloat(fromColor[3]) + offA;


            var timeID = setTimeout(
                function(animationObj, elem, H, S, L, A) {
                    GraphicMethods.setBackgroundColorHSLA(animationObj,elem,H,S,L,A);
            }, t*1000, animationObject, elem, tarH, tarS, tarL, tarA);

            animationObject.timeouts.push(timeID);
        }
        animationObject.timeouts.push(setTimeout(
            function(animationObj, elem, H, S, L, A) {
                GraphicMethods.setBackgroundColorHSLA(animationObj,elem,H,S,L,A);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, toColor[0], toColor[1], toColor[2], toColor[3]
        ));

    },
    /*
        Vedere setBackgroundColorFunction
    */
    setTextColorFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 2) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var t = 0;
        var fromColor = args[0];
        var toColor = args[1];
        var deltaColor = {
            R: toColor[0] - fromColor[0],
            G: toColor[1] - fromColor[1],
            B: toColor[2] - fromColor[2],
            A: toColor[3] - fromColor[3]
        };

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offR = Math.floor(deltaColor.R*multiplier);
            var offG = Math.floor(deltaColor.G*multiplier);
            var offB = Math.floor(deltaColor.B*multiplier);
            var offA = Math.round(deltaColor.A*multiplier*10000)/10000;

            var tarR = parseFloat(fromColor[0]) + offR;
            var tarG = parseFloat(fromColor[1]) + offB;
            var tarB = parseFloat(fromColor[2]) + offG;
            var tarA = parseFloat(fromColor[3]) + offA;


            var timeID = setTimeout(
                function(animationObj, elem, R, G, B, A) {
                    GraphicMethods.setTextColorRGBA(animationObj,elem,R,G,B,A);
                }, t*1000, animationObject, elem, tarR, tarG, tarB, tarA);

            animationObject.timeouts.push(timeID);
        }
        animationObject.timeouts.push(setTimeout(
            function(animationObj, elem, R, G, B, A) {
                GraphicMethods.setTextColorRGBA(animationObj,elem,R,G,B,A);
                animationObject.stop();
            }
            , timeToStable*1000, animationObject, elem, toColor[0], toColor[1], toColor[2], toColor[3]
        ));
    },
    /*
        Vedere setBackgroundColorFunction
    */
    setHeightFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var height = args[0];
        var t = 0;
        var currentHeight = Math.floor(getHeightInt(elem));
        if(currentHeight < 0)
            return;										// Error: see getHeight(elemID) method

        if(isVwValue(height)) {
            height = height.replace("vw", "");
            height = pxFromVw(height);
        }
        else if(isVhValue(height)) {
            height = height.replace("vh", "");
            height = pxFromVh(height);
        }
        else if(isPercentValue(height)) {
            height = height.replace("%", "");
            height = pxFromPercentageHeight(height, elemID);
        }
        else if(isPxValue(height)) {
            height = height.replace("px", "");
        }
        else {
            // not a valid format
            return;
        }

        var delta = height - currentHeight;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = Math.floor(delta*multiplier);
            var result = currentHeight + offset;

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, height) {
                    GraphicMethods.setHeight(animationObj,elem, height);
                }, t*1000, animationObject, elem, result)
                );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, height) {
                GraphicMethods.setHeight(animationObj,elem, height);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, height)
        );
    },
    /*
        Vedere setBackgroundColorFunction
    */
    setWidthFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var width = args[0];
        var t = 0;
        var currentWidth = Math.floor(getWidthInt(elem));
        if(currentWidth < 0)
            return;										// Error: see getWidth(elemID) method

        if(isVwValue(width)) {
            width = width.replace("vw", "");
            width = pxFromVw(width);
        }
        else if(isVhValue(width)) {
            width = width.replace("vh", "");
            width = pxFromVh(width);
        }
        else if(isPercentValue(width)) {
            width = width.replace("%", "");
            width = pxFromPercentageWidth(width, elemID);
        }
        else if(isPxValue(width)) {
            width = width.replace("px", "");
        }
        else {
            // not a valid format
            return;
        }

        var delta = width - currentWidth;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = Math.floor(delta*multiplier);
            var result = currentWidth + offset;

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, width) {
                    GraphicMethods.setWidth(animationObj,elem, width);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, width) {
                GraphicMethods.setWidth(animationObj,elem, width);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, width)
        );

    },
    /* vedere setBackgroundColorFunction */
    setLeftFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var left = args[0];
        var t;
        var currentLeft = Math.floor(getLeftInt(elem));

        if(isVwValue(left)) {
            left = left.replace("vw", "");
            left = pxFromVw(left);
        }
        else if(isVhValue(left)) {
            left = left.replace("vh", "");
            left = pxFromVh(left);
        }
        else if(isPercentValue(left)) {
            left = left.replace("%", "");
            left = pxFromPercentageWidth(left, elemID);
        }
        else if(isPxValue(left)) {
            left = left.replace("px", "");
        }
        else {
            // not a valid format
            return;
        }

        var delta = left - currentLeft;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = Math.floor(delta*multiplier);
            var result = currentLeft + offset;

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, left) {
                    GraphicMethods.setLeft(animationObj,elem, left);
                }, t*1000, animationObject, elem, result)
            );

        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, left) {
                GraphicMethods.setLeft(animationObj,elem, left);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, left)
        );

    },
/* vedere setBackgroundColorFunction */
    setTopFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var top = args[0];
        var t;
        var currentTop = Math.floor(getTopInt(elem));

        if(isVwValue(top)) {
            top = top.replace("vw", "");
            top = pxFromVw(top);
        }
        else if(isVhValue(top)) {
            top = top.replace("vh", "");
            top = pxFromVh(top);
        }
        else if(isPercentValue(top)) {
            top = top.replace("%", "");
            top = pxFromPercentageHeight(top, elemID);
        }
        else if(isPxValue(top)) {
            top = top.replace("px", "");
        }
        else {
            // not a valid format
            return;
        }

        var delta = top - currentTop;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = Math.floor(delta*multiplier);
            var result = currentTop + offset;

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, top) {
                    GraphicMethods.setTop(animationObj,elem, top);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, top) {
                GraphicMethods.setTop(animationObj,elem, top);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, top)
        );
    },
    setBottomFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var bottom = args[0];
        var t;
        var currentBottom = Math.floor(getBottomInt(elem));

        if(isVwValue(bottom)) {
            bottom = bottom.replace("vw", "");
            bottom = pxFromVw(bottom);
        }
        else if(isVhValue(bottom)) {
            bottom = bottom.replace("vh", "");
            bottom = pxFromVh(bottom);
        }
        else if(isPercentValue(bottom)) {
            bottom = bottom.replace("%", "");
            bottom = pxFromPercentageHeight(bottom, elemID);
        }
        else if(isPxValue(bottom)) {
            bottom = bottom.replace("px", "");
        }
        else {
            // not a valid format
            return;
        }

        var delta = bottom - currentBottom;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = Math.floor(delta*multiplier);
            var result = currentBottom + offset;

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, bottom) {
                    GraphicMethods.setBottom(animationObj,elem, bottom);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, bottom) {
                GraphicMethods.setBottom(animationObj,elem, bottom);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, bottom)
        );
    },
    setScrollTopFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var top = args[0];
        var t;

        if(isVwValue(top)) {
            top = top.replace("vw", "");
            top = pxFromVw(top);
        }
        else if(isVhValue(top)) {
            top = top.replace("vh", "");
            top = pxFromVh(top);
        }
        else if(isPercentValue(top)) {
            top = top.replace("%", "");
            top = pxFromPercentageHeight(top, elemID);
        }
        else if(isPxValue(top)) {
            top = top.replace("px", "");
        }
        else {
            // not a valid format
            return;
        }

        var delta = top;
        var oldMultiplier = 0;
        var finalOffset = 0;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = delta*(multiplier-oldMultiplier);
            oldMultiplier = multiplier;
            finalOffset += offset;

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, top) {
                    GraphicMethods.setScrollTop(animationObj,elem, top);
                }, t*1000, animationObject, elem, offset)
            );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, top) {
                GraphicMethods.setScrollTop(animationObj,elem, top);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, delta-finalOffset)
        );
    },
    setScrollToTopFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var top = args[0];
        var t;

        if(isVwValue(top)) {
            top = top.replace("vw", "");
            top = pxFromVw(top);
        }
        else if(isVhValue(top)) {
            top = top.replace("vh", "");
            top = pxFromVh(top);
        }
        else if(isPercentValue(top)) {
            top = top.replace("%", "");
            top = pxFromPercentageHeight(top, elemID);
        }
        else if(isPxValue(top)) {
            top = top.replace("px", "");
        }
        else {
            // not a valid format
            return;
        }

        var initialScrollTop = elem.scrollTop;
        var delta = top - initialScrollTop;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = delta*multiplier + initialScrollTop;

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, top) {
                    GraphicMethods.setScrollToTop(animationObj,elem, top);
                }, t*1000, animationObject, elem, offset)
            );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, top) {
                GraphicMethods.setScrollToTop(animationObj,elem, top);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, top)
        );
    },
    setBorderRadiusFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        // args è un vettore che contiene un solo elemento, anch'esso un vettore.
        // v = args[0]
        // v può avere lunghezza variabile 1, 2 o 4 e i valori crrispondono ai 4 lati secondo lo standard css

        if(args == null || args.length != 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var t;
        args = args[0];

        var current = [elem.borderRadius.getTopLeft(elem), elem.borderRadius.getTopRight(elem), elem.borderRadius.getBottomLeft(elem), elem.borderRadius.getBottomRight(elem)];
        args = translateFourDimensionSyntaxes(args);
        for(var i = 0; i < args.length; i++)
            args[i] = convertValue(args[i]);
        
        // currents are all in px values withous 'px'

        var delta = [args[0]-current[0], args[1] - current[1], args[2] - current[2], args[3] - current[3]];

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = [(delta[0]*multiplier), (delta[1]*multiplier), (delta[2]*multiplier), (delta[3]*multiplier)];
            var result = [0,0,0,0];
            for(var z = 0; z < 4; z++) {
                result[z] = current[z] + offset[z];
            }

            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, values) {
                    GraphicMethods.setBorderRadius(animationObj,elem, values);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, args) {
                GraphicMethods.setBorderRadius(animationObj,elem, args);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, args)
        );
    },
    setRotateFunction: function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 2) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);


        var axis = args[0];
        var deg = args[1];

        if(elem == null || axis == null || axis.toString().length === 0 || deg == null || timeToStable == null || timeToStable < 0 || typeOfCurve == null)
            return;

        var a = axis.toString().toLowerCase().substring(0, 1);
        if(a === "x")
            GraphicMethods.setRotateFunctionX(animationObject, elem, deg, timeToStable, typeOfCurve);
        else if(a === "y")
            GraphicMethods.setRotateFunctionY(animationObject, elem, deg, timeToStable, typeOfCurve);
        else if(a === "z")
            GraphicMethods.setRotateFunctionZ(animationObject, elem, deg, timeToStable, typeOfCurve);

    },
    setOpacityFunction : function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        var opacityTargetPercent = args[0];
        var t;
        var currentOpacity = Math.floor(getOpacity(elem)*100);

        var delta = opacityTargetPercent - currentOpacity;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            var multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            var offset = Math.floor(delta*multiplier);
            var result = currentOpacity + offset;


            animationObject.timeouts.push(
                setTimeout(function(animationObj, elem, opacity) {
                    GraphicMethods.setOpacity(animationObj,elem, opacity);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout(function(animationObj, elem, opacity) {
                GraphicMethods.setOpacity(animationObj,elem, opacity);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, opacityTargetPercent)
        );
    }
};
var AnimationEntry = function(elem, animation) {
    this.elem = elem;
    this.animation = animation;

    this.checkElem = function(elem) {
        return this.elem === elem;
    };
    this.checkAnimation = function(animation) {
        return this.animation.isSameTypeOfAnimation(animation);
    }
};
var AnimationRegistry = function() {
    this.entries = [];

    this.existElem = function(elem, animation) {
        for(var i = 0; i < this.entries.length; i++) {
            var entry = this.entries[i];
            if(entry.checkElem(elem) && entry.checkAnimation(animation))
                return true;
        }

        return false;
    };
    this.indexOfElem = function(elem, animation) {
        for(var i = 0; i < this.entries.length; i++) {
            var entry = this.entries[i];
            if(entry.checkElem(elem) && entry.checkAnimation(animation))
                return i;
        }
        return -1;
    };
    this.getAnimationOf = function(elem, animation) {
        var index = this.indexOfElem(elem, animation);
        if(index == -1)
            return null;

        return this.entries[index].animation;
    };
    this.push = function(elem, animation) {
        var entry = new AnimationEntry(elem, animation);
        if(!this.existElem(elem, animation))
            this.entries.push(entry);
    };
    this.remove = function(elem, animation) {
        var index = this.indexOfElem(elem, animation);
        if(index == -1)
            return;

        this.entries.splice(index, 1);
    }
};
var registry = new AnimationRegistry();

var Animation = function() {
    this.element = null;
    this.animationTime = null;
    this.animationCurve = null;
    this.animationFunction = null;
    this.timeouts = [];
    this.animationFunctionArguments = [];
    this.isStopping = false;
    this.isStopped = true;
    this.isValid = false;
    this.animationID;
    this.differentSamplingsByDevices = true;
    this.stepTime = 0.022;					// 22 ms ad aggiornamento -> f = 1000/22 = 45Hz (molto buona)
    this.mobileStepTime = 0.035;            // 35 ms ad aggiornamento -> f = 1000/35 = 28Hz (sufficiente)
    this.desktopStepTime = 0.012;           // 12 ms ad aggiornamento -> f = 1000/12 = 83Hz (molto buona)
    this.priority = 1;                      // Default priority is set to 1
    this.onEndAnimation = null;             // this is called once animation ended, through a timeout of animationTime seconds
    this.onStartAnimation = null;           // this is called once animation starts.
    
    this.setSamplingFrequency = function(frequency) {
        this.stepTime = 1 / frequency;
    };
    this.setSamplingTime = function(time) {
        this.stepTime = time;
    };

    this.isAlive = function() {return !this.isStopped;};                           // Animation can be executing or stopping
    this.isExecuting = function() {return !this.isStopping && !this.isStopped;};    // True if animation is executing

    // reading arguments
    if(arguments.length < 6)
        this.isValid = false;
    else {
        this.isValid = true;
        this.animationID = arguments[0];
        this.element = arguments[1];
        this.animationTime = arguments[2];
        this.animationCurve = arguments[3];
        this.animationFunction = arguments[4];
        var i;
        for(i = 5; i < arguments.length; i++) {
            this.animationFunctionArguments.push(arguments[i]);
        }
    }

    this.isSameTypeOfAnimation = function(animation) {
        return this.animationID == animation.animationID;
    };
    this.start = function() {
        if(!this.isValid || this.isAlive())
            return;
        var oldAnimation;
        if(registry.existElem(this.element, this)) {                                        // Check the registry if a same-typed animation (eg.: left - left, etc.) exists for elem
            oldAnimation = registry.getAnimationOf(this.element, this);                     // if exists then take that instance of animation
            if(oldAnimation.isExecuting()){                                                 // if it's not stopping check animation priorities
                if(oldAnimation.priority <= this.priority)                                  // if executing animation has lower priority
                    oldAnimation.stop(true);                                                // then stop (and invalidate old event handlers)
                else                                                                        // otherwise
                    return;                                                                 // don't start the new one.
            }
        }


        this.isStopping = false;
        this.isStopped = false;
        registry.push(this.element, this);
        this.stepTime = (this.differentSamplingsByDevices && isMobile()) ? this.mobileStepTime : this.desktopStepTime;

        if(this.onStartAnimation)
            this.onStartAnimation();

        this.animationFunction(this, this.element, this.animationTime, this.animationCurve, this.animationFunctionArguments);
    };
    this.stop = function() {
        if(!this.isExecuting())
            return;

        this.isStopping = true;
        this.isStopped = false;
        var shouldDisposeAnimation = (this.stop.arguments.length >= 1 && this.stop.arguments[0]);
        var lastIndex = this.timeouts.length - 1;
        while(lastIndex >= 0) {
            clearTimeout(this.timeouts[lastIndex]);
            this.timeouts.splice(lastIndex-1, 1);       // Remove the number specificed as second argument of element from timeouts starting at lastIndex-1 (remove last element)

            lastIndex = this.timeouts.length - 1;
        }
        registry.remove(this.element, this);

        if(shouldDisposeAnimation) {
            this.onEndAnimation = null;
            this.onStartAnimation = null;
        } else {
            if(typeof this.onEndAnimation === 'function' && this.onEndAnimation)
                this.onEndAnimation();
        }

        this.isStopped = true;
        this.isStopping = false;
    }
};
var Animations = Animations || {
    AnimationLeft: function(element, animationTime, animationCurve, leftValue) {
        Animation.call(this, 'left', element, animationTime, animationCurve, GraphicMethods.setLeftFunction, leftValue);

},
    AnimationTop: function(element, animationTime, animationCurve, topValue) {
        Animation.call(this, 'top', element, animationTime, animationCurve, GraphicMethods.setTopFunction, topValue);
},
    AnimationBottom: function(element, animationTime, animationCurve, bottomValue) {
        Animation.call(this, 'bottom', element, animationTime, animationCurve, GraphicMethods.setBottomFunction, bottomValue);
    },
    AnimationScrollTop: function(element, animationTime, animationCurve, deltaScroll) {
        Animation.call(this, 'scrollTop', element, animationTime, animationCurve, GraphicMethods.setScrollTopFunction, deltaScroll);
    },
    AnimationScrollToTop: function(element, animationTime, animationCurve, scrollTopFinalValue) {
        Animation.call(this, 'scrollTop', element, animationTime, animationCurve, GraphicMethods.setScrollToTopFunction, scrollTopFinalValue);
    },

    AnimationHeight: function(element, animationTime, animationCurve, heightValue) {
    Animation.call(this, 'height', element, animationTime, animationCurve, GraphicMethods.setHeightFunction, heightValue);
},
    AnimationWidth: function(element, animationTime, animationCurve, widthValue) {
        Animation.call(this, 'width', element, animationTime, animationCurve, GraphicMethods.setWidthFunction, widthValue);
    },
    AnimationBackgroundColor: function(element, animationTime, animationCurve, tocolor) {
        Animation.call(this, 'backgroundColor', element, animationTime, animationCurve, GraphicMethods.setBackgroundColorFunction, tocolor);
    },
    AnimationTextColor: function(element, animationTime, animationCurve, fromcolor, tocolor) {
        Animation.call(this, 'textColor', element, animationTime, animationCurve, GraphicMethods.setTextColorFunction, fromcolor, tocolor);
    },
    AnimationOpacity: function(element, animationTime, animationCurve, opacityTargetPercent) {
        Animation.call(this, 'opacity', element, animationTime, animationCurve, GraphicMethods.setOpacityFunction, opacityTargetPercent);
    },
    AnimationRotate: function(element, animationTime, animationCurve, axis, deg) {
        Animation.call(this, 'rotate', element, animationTime, animationCurve, GraphicMethods.setRotateFunction, axis, deg);
    },
    AnimationBorderRadius: function(element, animationTime, animationCurve, cssSyntaxValues) {
        Animation.call(this, 'borderRadius', element, animationTime, animationCurve, GraphicMethods.setBorderRadiusFunction, cssSyntaxValues);
    },

    startAfter: function(animation, seconds) {
        var millis = seconds*1000;
        animation.priority = 0;                                 // Lowest priority by default
        setTimeout(function() {animation.start();}, millis);
    }
};
Animations.AnimationLeft.prototype = Object.create(Animation.prototype);
Animations.AnimationTop.prototype = Object.create(Animation.prototype);
Animations.AnimationBottom.prototype = Object.create(Animation.prototype);
Animations.AnimationScrollTop.prototype = Object.create(Animation.prototype);
Animations.AnimationScrollToTop.prototype = Object.create(Animation.prototype);
Animations.AnimationHeight.prototype = Object.create(Animation.prototype);
Animations.AnimationWidth.prototype = Object.create(Animation.prototype);
Animations.AnimationBackgroundColor.prototype = Object.create(Animation.prototype);
Animations.AnimationTextColor.prototype = Object.create(Animation.prototype);
Animations.AnimationOpacity.prototype = Object.create(Animation.prototype);
Animations.AnimationRotate.prototype = Object.create(Animation.prototype);
Animations.AnimationBorderRadius.prototype = Object.create(Animation.prototype);

Animations.AnimationLeft.constructor = Animations.AnimationLeft;
Animations.AnimationTop.constructor = Animations.AnimationTop;
Animations.AnimationBottom.constructor = Animations.AnimationBottom;
Animations.AnimationScrollTop.constructor = Animations.AnimationScrollTop;
Animations.AnimationScrollToTop.constructor = Animations.AnimationScrollToTop;
Animations.AnimationHeight.constructor = Animations.AnimationHeight;
Animations.AnimationWidth.constructor = Animations.AnimationWidth;
Animations.AnimationBackgroundColor.constructor = Animations.AnimationBackgroundColor;
Animations.AnimationTextColor.constructor = Animations.AnimationTextColor;
Animations.AnimationOpacity.constructor = Animations.AnimationOpacity;
Animations.AnimationRotate.constructor = Animations.AnimationRotate;
Animations.AnimationBorderRadius.constructor = Animations.AnimationBorderRadius;



function getValue(elem, property) {
    if(elem == null) {
        return null;
    }

    return elem.getStyle(property);
}

function getJSValue(elem, property) {
	if(property == null || property.length == 0)
		return "0px";
	if(elem == null)
		return "0px";


    if(property.toLowerCase() == "height") {
        return elem.offsetHeight + "px";
    }
    else if(property.toLowerCase() == "width") {
        return elem.offsetWidth + "px";
    }
    else if(property.toLowerCase() == "top") {
    	var rectTop = elem.getBoundingClientRect();
        return rectTop.top + "px";
    }
    else if(property.toLowerCase() == "left") {
        var rectLeft = elem.getBoundingClientRect();
        return rectLeft.left + "px";
    } else {
    	return "0px";
	}

}

function getHeight(elem) {
	return getValue(elem, 'height');
}
function getWidth(elem) {
    return getValue(elem, 'width');
}
function getHeightInt(elem) {
	var ris = getHeight(elem);
	return ris.replace("px", "");
}
function getWidthInt(elem) {
	var ris = getWidth(elem);
	return ris.replace("px", "");
}

function getTop(elem) {
    return getValue(elem, 'top');
}
function getBottom(elem) {
    return getValue(elem, 'bottom');
}
function getTopInt(elem) {
    var ris = getTop(elem);
    return ris.replace("px", "");
}
function getBottomInt(elem) {
    var ris = getBottom(elem);
    return ris.replace("px", "");
}
function getLeft(elem) {
    return getValue(elem, 'left');
}
function getLeftInt(elem) {
    var ris = getLeft(elem);
    return ris.replace("px", "");
}
function getOpacity(elem) {
	return getValue(elem, 'opacity');
}

function getInitialAxisDeg(axisHad, elem) {
    if(elem.hasAttribute("rotation"+axisHad.toUpperCase())) {
        if(axisHad.toLowerCase() == 'x')
            return elem.rotationX();
        else if(axisHad.toLowerCase() == 'y')
            return elem.rotationY();
        else
            return elem.rotationZ();
    }

    return 0;
}



/* Utilities */
function pxFromVh(vhValue) {
    var clientHeight = window.innerHeight;
    return vhValue*clientHeight/100;
}
function pxFromVw(vwValue) {
    var clientWidth = window.innerWidth;
    return vwValue*clientWidth/100;
}
function pxFromPercentageWidth(percentValue, elem) {
    if(!isPercentValue(percentValue))
        return 0;
	var parent = elem.parentElement;


    percentValue = percentValue.replace("%", "");
	if(parent == null) {
		// allora la percentuale equivale ai vw perché il parent è lo schermo
		return pxFromVw(percentValue);
	}

	var width = parent.offsetWidth;
    return width * parseFloat(percentValue) / 100.0;
}
function pxFromPercentageHeight(percentValue, elem) {
    if(!isPercentValue(percentValue))
        return 0;
	var parent = elem.parentElement;

    percentValue = percentValue.replace("%", "");
	if(parent == null) {
		// allora la percentuale equivale ai vh perché il parent è lo schermo
		return pxFromVh(percentValue);
	}

	var height = parent.offsetHeight;
    return height * parseFloat(percentValue) / 100.0;
}
function isVhValue(value) {
	return (value.toString().toLowerCase().indexOf("vh") >= 0);
}
function isVwValue(value) {
    return (value.toString().toLowerCase().indexOf("vw") >= 0);
}
function isPercentValue(value) {
    return (value.toString().toLowerCase().indexOf("%") >= 0);
}
function isPxValue(value) {
	return (value.toString().toLowerCase().indexOf("px") >= 0);
}
function convertValue(value) {
    if(isVwValue(value)) {
        value = value.replace("vw", "");
        value = pxFromVw(value);
    }
    else if(isVhValue(value)) {
        value = value.replace("vh", "");
        value = pxFromVh(value);
    }
    else if(isPxValue(value)) {
        value = value.replace("px", "");
    }
    else
        return value;

    return value
}
function rgbtohsl(r, g, b) {
    var R,G,B, CM, Cm, D;
    R = r/255;
    G = g/255;
    B = b/255;

    CM = Math.max(R, G, B);
    Cm = Math.min(R, G, B);
    D = CM-Cm;

    var h,s,l;
    l = (Cm+CM)/2;
    if(l === 0)
        return [0,0,0];

    s = D/(1-Math.abs(2*l-1));

    if(D === 0)
        h = 0;
    else if(CM === R)
        h = (((G-B)/D) % 6) * 60;
    else if(CM === G)
        h = ((B-R)/D + 2) * 60;
    else
        h = ((R-G)/D + 4) * 60;

    return [h,s*100,l*100];

}
function toInt(value) {
	if(value == null || value.length == 0)
		return 0;

	value = value.toString();

	var integerValueString = "";
	var integerValue;
	/*while(value.charAt(0) == '0' && value.length > 1)		// elimina tutti gli 0 iniziali tranne, eventualmente, l'ultimo se è anche l'ultimo carattere
		value = value.substring(1);*/

	var sign = value[0] == '-' ? -1 : 1;
	if(sign < 0)
	    value = value.substr(1);

	for(var i = 0; i < value.length; i++) {
		if(value.charAt(i) < '0' || value.charAt(i) > '9')
			break;

        integerValueString += value.charAt(i);
	}

	integerValue = parseInt(integerValueString);

	return integerValue * sign;

}
function toFloat(value) {
    if(value == null || value.length == 0)
        return 0;

    value = value.toString();

    var floatValueString = "";
    var floatValue;
    /*while(value.charAt(0) == '0' && value.length > 1)		// elimina tutti gli 0 iniziali tranne, eventualmente, l'ultimo se è anche l'ultimo carattere
     value = value.substring(1);*/

    var sign = value[0] == '-' ? -1 : 1;
    if(sign < 0)
        value = value.substr(1);

    for(var i = 0; i < value.length; i++) {
        if((value.charAt(i) < '0' || value.charAt(i) > '9') && value.charAt(i) != '.')
            break;

        floatValueString += value.charAt(i);
    }

    floatValue = parseFloat(floatValueString);

    return floatValue * sign;
}
function translateFourDimensionSyntaxes(values) {
    if(values == null || values.length > 4 || values.length == 3 || values.length == 0)
        return [0, 0, 0, 0];


    var valueTopLeft, valueTopRight, valueBottomLeft, valueBottomRight;
    if(values.length == 1) {
        valueTopLeft = values[0];
        valueTopRight = values[0];
        valueBottomLeft = values[0];
        valueBottomRight = values[0];
    } else if (values.length == 2) {
        valueTopLeft = values[0];
        valueBottomRight = values[0];
        valueTopRight = values[1];
        valueBottomLeft = values[1];
    } else {
        valueTopLeft = values[0];
        valueTopRight = values[1];
        valueBottomLeft = values[2];
        valueBottomRight = values[3];
    }

    return [valueTopLeft, valueTopRight, valueBottomLeft, valueBottomRight];
}


/* ANIMATION MODULE */

/* CROSSBROWSER MODULE */
var AnimaBrowsers = AnimaBrowsers || {
    UA: navigator.userAgent,
    isAndroid: function() {return AnimaBrowsers.UA.search(/[lL]inux.*[aA]ndroid/) >= 0},
    isIPhone: function() {return AnimaBrowsers.UA.search(/IPhone/) >= 0},
    isWindowsPhone: function() {return AnimaBrowsers.UA.search(/(Windows( )+Phone).*Trident/) >= 0},
    isWindows: function() {return AnimaBrowsers.UA.search(/Windows( )+NT/) >= 0},
    isLinux: function() {return AnimaBrowsers.UA.search(/(Debian|Ubuntu|X11.*Linux)/) >= 0},
    isMac: function() {return AnimaBrowsers.UA.search(/MAC( )+OS( )+X/) >= 0},
    isBlackBerry: function() {return AnimaBrowsers.UA.search(/BlackBerry/) >= 0},
    isChrome: function() {return AnimaBrowsers.UA.search(/Chrome/) >= 0},
    isIE: function() {return AnimaBrowsers.UA.search(/(MSIE (\d)+|Trident)/) >= 0},
    isIE10: function() {return AnimaBrowsers.UA.search(/MSIE (10|9).*Trident.+6/) >= 0},
    isIE11: function() {return AnimaBrowsers.UA.search(/Trident(.+)7/) >= 0},
    isFirefox: function() {return AnimaBrowsers.UA.search(/Firefox/) >= 0},
    isOperaMini: function() {return AnimaBrowsers.UA.search(/Opera( )+Mini/) >= 0},
    isOpera: function() {return AnimaBrowsers.UA.search(/Opera/) >= 0 && !AnimaBrowsers.isOperaMini()},
    isSafari: function() {return AnimaBrowsers.UA.search(/Safari/) >= 0 && !AnimaBrowsers.isChrome()}
};

(function () {
    if ( typeof window.Event === "function" || !AnimaBrowsers.isIE()) return false; //If not IE

    function CustomEvent(eventName, params) {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        var evt = document.createEvent('Event');
        evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();
/* CROSSBROWSER MODULE */

/* RESPONSIVE FRAMEWORK */
var IDTestMobile;

function initResponsiveCheck(IDMobileTest) {
    IDTestMobile = IDMobileTest;
}

function isMobile() {
    // controlla se un oggetto che visibile solo per cellulari sia visibile
    var testingObj = document.getElementById(IDTestMobile);
    if(!AnimaUtility.isElement(testingObj))
        return false;

    return testingObj.getStyle("display") !== "none";
}
function isLandscape() {
    var clientWidth = window.innerWidth || document.documentElement.clientWidth || (document.getElementsByTagName("body")[0]).clientWidth,
        clientHeight = window.innerHeight || document.documentElement.clientHeight || (document.getElementsByTagName("body")[0]).clientHeight;
    var larger = clientWidth > clientHeight;
    return isMobile() && larger;
}
function isPortrait() {
    return isMobile() && !isLandscape();
}
function isTouch() {
    return (document.documentElement != null && typeof document.documentElement !== 'undefined' && 'ontouchstart' in document.documentElement);
}

var onLandscapeEvent, onPortraitEvent;
if(!AnimaBrowsers.isIE()) {
    onLandscapeEvent = new CustomEvent('landscapeMode');
    onPortraitEvent = new CustomEvent('portraitMode');
    window.addEventListener("resize", function() {
        if(isLandscape())
            this.dispatchEvent(onLandscapeEvent);
        else if(isPortrait())
            this.dispatchEvent(onPortraitEvent);
    });
} else {
    // IE 11 working code
    onLandscapeEvent = new CustomEvent('landscapeMode');
    onPortraitEvent = new CustomEvent('portraitMode');
    window.addEventListener("resize", function() {
        if(isLandscape())
            this.dispatchEvent(onLandscapeEvent);
        else if(isPortrait())
            this.dispatchEvent(onPortraitEvent);
    });
}

/* RESPONSIVE MODULE */

/* PRELOAD MODULE */
var AnimaPreload = AnimaPreload || {
    cacheRegistry: null,
    CacheEntry: function(element, cached) {
        this.element = element;
        this.cached = cached;

        this.setCached = function(value) {
            this.cached = value;
        };
        this.isCached = function() {
            return this.cached;
        };
        this.isElement = function(element) {
            return this.element === element;
        }
    },
    CacheRegistry: function() {
        this.entries = [];
        this.indexOf = function(elem) {
            for(var i = 0; i < this.entries.length; i++) {
                var entry = this.entries[i];
                if(entry.isElement(elem))
                    return i;
            }

            return -1;
        };
        this.exists = function(elem) {
            return this.indexOf(elem) >= 0;
        };
        this.addEntry = function(elem) {
            if(!this.exists(elem) && AnimaUtility.isElement(elem))
                this.entries.push(new AnimaPreload.CacheEntry(elem, false));
        };
        this.setCached = function(elem) {
            if(!AnimaUtility.isElement(elem))
                return;

            var index = this.indexOf(elem);
            if(index < 0) {
                this.addEntry(elem);
                this.setCached(elem);
            } else {
                var entry = this.entries[index];
                entry.setCached(true);
            }
        };
        this.isCached = function(elem) {
            var element;
            if(typeof elem === 'string') {
                element = document.getElementById(elem);
                return this.isCached(element);
            } else if(AnimaUtility.isElement(elem))
                element = elem;
            else
                return true;                // there is nothing to cache, so by the fact nothing is cached, all that to cache is actually cached

            var index = this.indexOf(element);
            return index >= 0 && this.entries[index].isCached();
        };

    },
    PreloadingEngine: function(elem) {
        this.images = [];
        this.preloadingElement = elem;
        this.elementToPreload = 0;

        this._preload = function() {
            for (var i = 0; i < this._preload.arguments.length; i++) {
                this.images[i] = new Image();
                this.images[i].engine = this;
                this.images[i].addEventListener("load", function() {
                    this.engine.checkPreloadComplete();
                });
                this.images[i].src = this._preload.arguments[i];
            }
        };
        this.preloadElement = function() {
            var eTarget = this.preloadingElement;


            var preloadSources = eTarget.getElementsByAttributeName("animasource");
            // var preloadClasses = eTarget.getElementsByAttributeName("anima-addclasses");

            if(preloadSources.length === 0)
                this.checkPreloadComplete();        // no elements to preload (call preloaded)

            for(var s = 0; s < preloadSources.length; s++) {
                var sourceElement = preloadSources[s];
                var sourceValue = sourceElement.getAttribute("animasource");

                if(sourceValue != null && typeof sourceValue === 'string' && sourceValue.length > 0) {
                    var values = sourceValue.split(";");
                    this.elementToPreload += values.length;
                    for(var v = 0; v < values.length; v++) {
                        var value = values[v];
                        if(value != null && typeof value === 'string') {
                            this._preload(value);
                        }
                    }
                }
            }
            /*for(var c = 0; c < preloadClasses.length; c++) {
                var classElement = preloadClasses[c];
                var classValue = classElement.getAttribute("anima-addclasses");

                if(classValue != null && typeof classValue === 'string' && classValue.length > 0) {
                    classElement.addClasses(classValue);
                }
            }*/


        };
        this.checkPreloadComplete = function() {
            if(this.preloadingElement == null || !AnimaUtility.isElement(this.preloadingElement))
                return;

            this.elementToPreload--;
            if(this.elementToPreload <= 0) {
                try {
                    AnimaPreload.cacheRegistry.setCached(this.preloadingElement);
                    this.preloadingElement.dispatchEvent(new CustomEvent('preloaded'));
                } catch(e) {
                    console.log("Cannot fire preloaded event on " + this.preloadingElement);
                }
            }
        };
        this.preload = function() {
            // initialize needed variable
            this.elementToPreload = 0;

            if(AnimaPreload.cacheRegistry.isCached(this.preloadingElement))
                this.checkPreloadComplete();
            else
                this.preloadElement();
        }
    },

    preloadElement: function(elem) {
        if(elem == null)
            return;
        if(typeof elem === 'string') {
            AnimaPreload.preloadElement(document.getElementById(elem));
            return;
        } else if(!AnimaUtility.isElement(elem))
            return;

        (new AnimaPreload.PreloadingEngine(elem)).preload();
    }

};

AnimaPreload.cacheRegistry = new AnimaPreload.CacheRegistry();

/* PRELOAD MODULE */

/* SCROLLBAR MODULE */
var AnimaScrollbar = {
    scrollbarObj: function() {
        this.boundedElement = null;                                         // contenitore che deve essere scrollable.
        this.scrollbarElem = null;                                          // elemento interno alla scrollbar
        this.scrollbarWider = null;                                         // Elemento sul quale agiscono gli eventi ("proxy" per Elem)
        this.scrollbarContainer = null;                                     // scrollbar intesta come tutta la barra verticale
        this.insideScrollbarWider = false;                                  // flag che determina se il puntatore è all'interno dello scrollElem
        this.insideScrollbarContainer = false;                              // flag che determina se il puntatore è all'interno della scrollbar
        this.enableMouseScrolling = false;                                  // se true la scrollbar segue il mouse (vedere inizializzazione eventi)
        this.initialMouseOffset = 0;                                        // offset calcolato durante il click sullo scrollElem
        this.scrollbarPosition = 0;                                         // posizione attuale dello scrollElem (relativo alla scrollbar)
        this.deltaWheel = convertValue('8vh');                              // variazione in valore assoluto della posizione dello scrollelem per ogni step di rotellina
        this.initialized = false;                                           // flag che determina se gli eventi sono stati inizializzati
        this.ScrollbarStates = function() {
            this.ScrollbarState = function(name) {
                this.name = name;
                this.attachedListener = [];
                this.transactions = [];
                this.indexOfListener = function (f) {
                    if (typeof f !== 'function')
                        return -1;

                    for (var i = 0; i < this.attachedListener.length; i++) {
                        if (this.attachedListener[i] === f)
                            return i;
                    }
                    return -1;
                };
                this.indexOfTransaction = function (t) {
                    for (var i = 0; i < this.transactions.length; i++) {
                        if (this.transactions[i] === t)
                            return i;
                    }
                    return -1;
                };
                this.addListener = function (f) {
                    if (typeof f !== 'function' || this.indexOfListener(f) >= 0)
                        return;

                    this.attachedListener.push(f);
                };
                this.addTransaction = function (t) {
                    if (this.indexOfTransaction(t) >= 0)
                        return;

                    this.transactions.push(t);
                };
                this.isState = function (nameOrState) {
                    return this.name === nameOrState || nameOrState.name === this.name;
                };
                this.activate = function() {                    
                    for(var i = 0; i < this.attachedListener.length; i++) {
                        var f = this.attachedListener[i];
                        if(typeof f === 'function')
                            f();
                    }
                };
                this.interrupt = function() {
                    for(var i = 0; i < this.transactions.length; i++) {
                        var t = this.transactions[i];
                        if(t.checkConditions()) {
                            t.activate();
                        }
                    }
                }
            };
            this.Transaction = function(targetState) {
                this.targetState = targetState;
                this.attachedConditions = [];
                this.indexOfCondition = function (f) {
                    if (typeof f !== 'function')
                        return -1;

                    for (var i = 0; i < this.attachedConditions.length; i++) {
                        if (this.attachedConditions[i] === f)
                            return i;
                    }
                    return -1;
                };
                this.checkConditions = function() {
                    var conditionResult = true;
                    for(var k = 0; k < this.attachedConditions.length; k++) {
                        var c = this.attachedConditions[k];
                        if(typeof c === 'function')
                            conditionResult = conditionResult && c();

                    }
                    return conditionResult;
                };
                this.addCondition = function (f) {
                    if (typeof f !== 'function' || this.indexOfCondition(f) >= 0)
                        return;

                    this.attachedConditions.push(f);
                };
                this.activate = function() {
                    AnimaScrollbar.scrollbar.states.lastState = AnimaScrollbar.scrollbar.states.selectedState;
                    AnimaScrollbar.scrollbar.states.selectedState = this.targetState;
                    AnimaScrollbar.scrollbar.states.selectedState.activate();
                }
            };
            this.lastState = null;
            this.selectedState = null;
            this.initialState = null;
            
            this.selectState = function() {
                if(this.selectedState == null) {
                    if(this.initialState != null) {
                        this.selectedState = this.initialState;
                        this.selectedState.activate();
                    }
                } else {
                    this.selectedState.interrupt();
                }
            };

            // State Animations
            function scrollbar_initialState() {
                var scrollbarAnimation = (new Animations.AnimationWidth(AnimaScrollbar.scrollbar.scrollbarContainer, 0.3, AnimationCurves.exponential, '0.8vw'));
                var widerAnimation = (new Animations.AnimationBackgroundColor(AnimaScrollbar.scrollbar.scrollbarElem, 0.3, AnimationCurves.exponential, [40,40,40,0.4]));
                widerAnimation.start();
                scrollbarAnimation.start();
            }
            function scrollbar_touchStart() {
                scrollbar_mouseInWider();
            }
            function scrollbar_mouseInScrollbar() {
                var scrollbarAnimation = (new Animations.AnimationWidth(AnimaScrollbar.scrollbar.scrollbarContainer, 0.3, AnimationCurves.exponential, '1.2vw'));
                var widerAnimation = (new Animations.AnimationBackgroundColor(AnimaScrollbar.scrollbar.scrollbarElem, 0.3, AnimationCurves.exponential, [224,224,224,1]));
                scrollbarAnimation.start();
                widerAnimation.start();
            }
            function scrollbar_mouseInWider() {
                var scrollbarAnimation = (new Animations.AnimationWidth(AnimaScrollbar.scrollbar.scrollbarContainer, 0.3, AnimationCurves.exponential, '1.2vw'));
                var widerAnimation = new Animations.AnimationBackgroundColor(AnimaScrollbar.scrollbar.scrollbarElem, 0.3, AnimationCurves.exponential, [46,190,186,1]);
                widerAnimation.start();
                scrollbarAnimation.start();
            }
            function scrollbar_mousePressed() {

            }
            
            // Inizializzazione degli eventi
            var ScrollbarState_initial = new this.ScrollbarState('initial');
            var ScrollbarState_touchStart = new this.ScrollbarState('touchStart');
            var ScrollbarState_mouseInScrollbar = new this.ScrollbarState('mouseInScrollbar');
            var ScrollbarState_mouseInWider = new this.ScrollbarState('mouseInWider');
            var ScrollbarState_mousePressedOnWider = new this.ScrollbarState('mouseDownWider');

            this.initialState = ScrollbarState_initial;

            // inizializzazione delle animazioni
            ScrollbarState_initial.addListener(scrollbar_initialState);
            ScrollbarState_touchStart.addListener(scrollbar_touchStart);
            ScrollbarState_mouseInScrollbar.addListener(scrollbar_mouseInScrollbar);
            ScrollbarState_mouseInWider.addListener(scrollbar_mouseInWider);
            ScrollbarState_mousePressedOnWider.addListener(scrollbar_mousePressed);


            // inizializzazione delle transizioni
            var s0_t0 = new this.Transaction(ScrollbarState_mouseInScrollbar);
            var s0_t1 = new this.Transaction(ScrollbarState_mouseInWider);
            var s0_t2 = new this.Transaction(ScrollbarState_touchStart);

            s0_t0.addCondition(function() {
                return (AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s0_t1.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s0_t2.addCondition(function() {
                return ("ontouchstart" in window) && AnimaScrollbar.scrollbar.enableMouseScrolling;
            });

            var s1_t0 = new this.Transaction(ScrollbarState_initial);
            var s1_t1 = new this.Transaction(ScrollbarState_mouseInWider);
            s1_t0.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s1_t1.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider);
            });

            var s2_t0 = new this.Transaction(ScrollbarState_initial);
            var s2_t1 = new this.Transaction(ScrollbarState_mouseInScrollbar);
            var s2_t2 = new this.Transaction(ScrollbarState_mousePressedOnWider);
            s2_t0.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s2_t1.addCondition(function() {
                return (AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider);
            });
            s2_t2.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider && AnimaScrollbar.scrollbar.enableMouseScrolling);
            });

            var s3_t0 = new this.Transaction(ScrollbarState_initial);
            var s3_t1 = new this.Transaction(ScrollbarState_mouseInScrollbar);
            var s3_t2 = new this.Transaction(ScrollbarState_mouseInWider);
            s3_t0.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider && !AnimaScrollbar.scrollbar.enableMouseScrolling);
            });
            s3_t1.addCondition(function() {
                return (AnimaScrollbar.scrollbar.insideScrollbarContainer && !AnimaScrollbar.scrollbar.insideScrollbarWider && !AnimaScrollbar.scrollbar.enableMouseScrolling);
            });
            s3_t2.addCondition(function() {
                return (!AnimaScrollbar.scrollbar.insideScrollbarContainer && AnimaScrollbar.scrollbar.insideScrollbarWider && !AnimaScrollbar.scrollbar.enableMouseScrolling);
            });

            var s4_t0 = new this.Transaction(ScrollbarState_initial);
            s4_t0.addCondition(function() {
                return !AnimaScrollbar.scrollbar.enableMouseScrolling;
            });

            // Assegnazione stato-transizione
            ScrollbarState_initial.addTransaction(s0_t0);
            ScrollbarState_initial.addTransaction(s0_t1);
            ScrollbarState_initial.addTransaction(s0_t2);
            ScrollbarState_mouseInScrollbar.addTransaction(s1_t0);
            ScrollbarState_mouseInScrollbar.addTransaction(s1_t1);
            ScrollbarState_mouseInWider.addTransaction(s2_t0);
            ScrollbarState_mouseInWider.addTransaction(s2_t1);
            ScrollbarState_mouseInWider.addTransaction(s2_t2);
            ScrollbarState_mousePressedOnWider.addTransaction(s3_t0);
            ScrollbarState_mousePressedOnWider.addTransaction(s3_t1);
            ScrollbarState_mousePressedOnWider.addTransaction(s3_t2);
            ScrollbarState_touchStart.addTransaction(s4_t0);



        };                            // oggetto che gestisce gli stati della scrollbar
        this.states = new this.ScrollbarStates();
        this.onEndDocument = new CustomEvent('scrollbarEnd');
        this.onStartDocument = new CustomEvent('scrollbarStart');
        this.eventFired = false;
        this.eventChecker = this.eventChecker || setInterval(
            function() {
                var scrollObj = AnimaScrollbar.scrollbar;
                if(scrollObj == null || typeof scrollObj === 'undefined')
                    return;

                scrollObj.checkEvents();
            },
            50
        );


        // Oggetto che definisce la relazione che intercorre tra la posizione della scrollbar e lo scroll offset del contenitore collegato.
        // Permette quindi di determinare il massimo offset possibile per il contenitore scrollable e per la scrollbar.
        // Permette infine di determinare la quantità di spostamento di uno dei due, sapendo il valore dell'altro
        this.boundModel = function() {
            this.scrollbarHeight = 0;
            this.scrollElementHeight = 0;
            this.boundedElemHeight = 0;
            this.maxScrollbarTop = function() {return this.scrollbarHeight - this.scrollElementHeight;};
            this.calculateTopScrollElem = function(topofbounded) {
                var p = topofbounded / this.boundedElemHeight;
                if(p < 0) p = 0;
                if(p > 1) p = 1;
                var min = 0;
                var max = this.scrollbarHeight - this.scrollElementHeight;
                return (max-min)*p + min;
            };
            this.calculateTopBounded = function(scrollbarTop) {
                var p = scrollbarTop / (this.scrollbarHeight - this.scrollElementHeight);
                if(p < 0) p = 0;
                if(p > 1) p = 1;

                return this.boundedElemHeight*p;
            };
            this.calculateHeightAsSumOfChildren = function(elem) {
                var children = elem.children;
                var height = 0;
                for(var i = 0; i < children.length; i++) {
                    height += parseFloat(toFloat(getJSValue(children[i], 'height')));
                }
                // from height should be subtracted 100vh: you can scroll 100vh less because the first 100vh are already visible...
                height -= convertValue('100vh');
                return height;
            };
        };
        this.boundedParameters = new this.boundModel();
        this.checkEvents = function() {
            if(this.eventFired || !AnimaUtility.isElement(this.boundedElement))
                return;

            this.eventFired = true;
            if(this.scrollbarPosition === 0) {
                this.boundedElement.dispatchEvent(this.onStartDocument);
            } else if (this.scrollbarPosition === this.boundedParameters.maxScrollbarTop()) {
                this.boundedElement.dispatchEvent(this.onEndDocument);
            } else {
                this.eventFired = false;
            }
        };

        // Aggiunge il valore in ingresso alla posizione attuale della scrollbar, quindi aggiorna i cambiamenti
        this.addDelta = function(delta) {
            var sign = (delta / Math.abs(delta));
            this.scrollbarPosition += this.boundedParameters.calculateTopScrollElem(this.deltaWheel)*sign;
            if(this.scrollbarPosition < 0) {
                this.scrollbarPosition = 0;
            } else if( this.scrollbarPosition > this.boundedParameters.maxScrollbarTop()) {
                this.scrollbarPosition = this.boundedParameters.maxScrollbarTop();
            }

            this.applyChanges();
        };
        this.addDeltaWA = function(delta) {
            var sign = (delta / Math.abs(delta));
            this.scrollbarPosition += this.boundedParameters.calculateTopScrollElem(this.deltaWheel)*sign;
            if(this.scrollbarPosition < 0) {
                this.scrollbarPosition = 0;
            } else if( this.scrollbarPosition > this.boundedParameters.maxScrollbarTop()) {
                this.scrollbarPosition = this.boundedParameters.maxScrollbarTop();
            }
            this.applyChangesWA();
        };

        // Imposta il valore della posizione della scrollbar e applica i cambiamenti
        this.setScrollbarPosition = function (scrollPosition) {
            var needUpdate = false;

            if(scrollPosition <= 0) {
                scrollPosition = 0;
                needUpdate = true;
                this.boundedElement.dispatchEvent(this.onStartDocument);
            }
            else if(scrollPosition > this.boundedParameters.maxScrollbarTop()) {
                scrollPosition = this.boundedParameters.maxScrollbarTop();
                needUpdate = true;
            }

            if(Math.abs(this.scrollbarPosition - scrollPosition) > 20) needUpdate = true;

            if(needUpdate) {
                this.scrollbarPosition = scrollPosition;
                this.applyChanges();
            }
        };
        this.setScrollbarPositionWA = function(scrollPosition) {
            var needUpdate = false;

            if(scrollPosition <= 0) {
                scrollPosition = 0;
                needUpdate = true;
            }
            else if(scrollPosition > this.boundedParameters.maxScrollbarTop()) {
                scrollPosition = this.boundedParameters.maxScrollbarTop();
                needUpdate = true;
            }

            if(Math.abs(this.scrollbarPosition - scrollPosition) > 1) needUpdate = true;

            if(needUpdate) {
                this.scrollbarPosition = scrollPosition;
                this.applyChangesWA();
            }
        };

        // applica i cambiamenti e quindi esegue le animazioni che terranno aggiornato questo model e la view
        this.applyChanges = function(){
            var scrollValue = this.boundedParameters.calculateTopBounded(this.scrollbarPosition);

            var barAnim = new Animations.AnimationTop(this.scrollbarWider, 0.25, AnimationCurves.linear, this.scrollbarPosition + 'px');
            var elemAnim = new Animations.AnimationScrollToTop(this.boundedElement, 0.25, AnimationCurves.linear,scrollValue + 'px');
            barAnim.setSamplingFrequency(40);
            elemAnim.setSamplingFrequency(40);
            barAnim.start();
            elemAnim.start();
        };
        this.applyChangesWA = function() {
            this.scrollbarWider.style.top = this.scrollbarPosition + 'px';
            var scrollValue = this.boundedParameters.calculateTopBounded(this.scrollbarPosition);
            this.boundedElement.scrollTop = scrollValue;

        };

        // definisce i valori e quindi le relazioni che intercorrono tra scrollbar e container scrollable
        this.calculateBoundedParameters = function() {
            AnimaScrollbar.scrollbar.boundedParameters.boundedElemHeight = AnimaScrollbar.scrollbar.boundedParameters.calculateHeightAsSumOfChildren(AnimaScrollbar.scrollbar.boundedElement);
            AnimaScrollbar.scrollbar.boundedParameters.scrollbarHeight = parseFloat(toFloat(getJSValue(AnimaScrollbar.scrollbar.scrollbarContainer, 'height')));
            AnimaScrollbar.scrollbar.boundedParameters.scrollElementHeight = parseFloat(toFloat(getJSValue(AnimaScrollbar.scrollbar.scrollbarWider, 'height')));
        };

        // inizializza gli eventi della scrollbar
        this.initializeScrollBarEvents = function() {
            // setting graphics behavior
            function scrollbar_scrollWiderOut() {
                AnimaScrollbar.scrollbar.insideScrollbarWider = false;
            }
            function scrollbar_scrollWiderIn() {
                AnimaScrollbar.scrollbar.insideScrollbarWider = true;
            }
            function scrollbar_scrollbarContainerOut() {
                AnimaScrollbar.scrollbar.insideScrollbarContainer = false;
            }
            function scrollbar_scrollbarContainerIn() {
                AnimaScrollbar.scrollbar.insideScrollbarContainer = true;
            }
            function scrollbar_scrollbarWiderPressed() {
                AnimaScrollbar.scrollbar.enableMouseScrolling = true;
            }
            function scrollbar_scrollbarWiderReleased() {
                AnimaScrollbar.scrollbar.enableMouseScrolling = false;
            }


            /* A scrollbar should scroll in some cases. One of these is when left mouse button is pressed into the scrollbarElem
             * while moving it up or down. Instead, in case of touchscreen, the user should be allowed to press everywhere in order
             * to activate the scrolling event.
             */
            this.scrollbarWider.onmousedown = function(event) {
                /*if(isMobile())
                    return;*/
                event.stopPropagation();
                event.preventDefault();
                var buttonLeftClicked = event.button == 0;
                if(!buttonLeftClicked)
                    return;

                AnimaScrollbar.scrollbar.initialMouseOffset = event.offsetY + parseInt(toInt(getJSValue(AnimaScrollbar.scrollbar.scrollbarContainer, 'top')));
                scrollbar_scrollbarWiderPressed();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            function ontouchstart(event) {
                AnimaScrollbar.scrollbar.initialMouseOffset = event.touches[0].clientY; // - parseInt(toInt(getJSValue(AnimaScrollbar.scrollbar.scrollbarWider, 'top')));
                AnimaScrollbar.scrollbar.enableMouseScrolling = true;
                AnimaScrollbar.scrollbar.states.selectState();
            }
            window.addEventListener("touchstart", function (ev) {
                ontouchstart(ev);
            });

            /*
             * While mouse scrolling event enabled, the scrollbar should follow the pointer. The event is bound to window because
             * while mouse scrolling enabled the pointer is allowed to move everywhere in order to scroll.
             */
            function scrollbar_mousemove(event) {
                /*if(isMobile())
                 return;*/

                if(!AnimaScrollbar.scrollbar.enableMouseScrolling)
                    return;

                event.preventDefault();
                var y = event.clientY - AnimaScrollbar.scrollbar.initialMouseOffset;
                AnimaScrollbar.scrollbar.setScrollbarPositionWA(y);
            }
            function scrollbar_touchmove(event) {
                if(!AnimaScrollbar.scrollbar.enableMouseScrolling)
                    return;

                var touchMultiplier = 0.15;
                var y = (event.touches[0].clientY - AnimaScrollbar.scrollbar.initialMouseOffset)*touchMultiplier;
                if(Math.abs(y) < 1)
                    return;
                AnimaScrollbar.scrollbar.initialMouseOffset = event.touches[0].clientY;

                AnimaScrollbar.scrollbar.addDeltaWA(-y);
            }
            window.addEventListener("mousemove", function (ev) { scrollbar_mousemove(ev) });
            window.addEventListener("touchmove", function (ev) { scrollbar_touchmove(ev) });


            /*
             * When mouseUp event (or touchend event) is fired, then avoid the scrollbarElem to follow the pointer.
             * Because of the fact that graphic behaviors such as leaving the scrollbar hasn't be triggered (while mousedown)
             * if mouse is now out of elem, or eventually the scrollbar itself, then execute pending graphics adjustment (resize scrollbar, etc.)
             */
            function scrollbar_mouseup() {
                scrollbar_scrollbarWiderReleased();
                AnimaScrollbar.scrollbar.initialMouseOffset = 0;
                AnimaScrollbar.scrollbar.states.selectState();
            }
            function scrollbar_touchend() {
                AnimaScrollbar.scrollbar.enableMouseScrolling = false;
                AnimaScrollbar.scrollbar.initialMouseOffset = 0;
                AnimaScrollbar.scrollbar.states.selectState();
            }
            window.addEventListener("mouseup", scrollbar_mouseup);
            window.addEventListener("touchend", scrollbar_touchend);


            // When window resizes, bounded parameters should be recalculated due to avoid undesirable behaviors
            window.addEventListener("resize", this.calculateBoundedParameters);


            // remaining graphics events
            this.scrollbarContainer.onmouseenter = function() {
                scrollbar_scrollbarContainerIn();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            this.scrollbarContainer.onmouseleave = function () {
                scrollbar_scrollbarContainerOut();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            this.scrollbarWider.onmouseenter = function() {
                scrollbar_scrollWiderIn();
                scrollbar_scrollbarContainerOut();
                AnimaScrollbar.scrollbar.states.selectState();
            };
            this.scrollbarWider.onmouseleave = function () {
                scrollbar_scrollWiderOut();
                scrollbar_scrollbarContainerIn();
                AnimaScrollbar.scrollbar.states.selectState();
            };
        };
        this.initializeScrollBarObject = function() {
            var s = document.getElementsByClassName('scrollbar');
            if(s.length !== 1)
                return;
            this.scrollbarContainer = s[0];

            s = this.scrollbarContainer.getElementsByClassName('wider');
            this.scrollbarWider = s[0];

            s = this.scrollbarWider.getElementsByClassName('seeker');
            if(s.length !== 1)
                return;

            this.scrollbarElem = s[0];
        };


        // collega un elemento come scrollable container alla scrollbar
        this.bind = function(elem) {
            /*if(!this.initialized && !isMobile()) {*/
            if(!this.initialized) {
                this.initialized = true;
                this.initializeScrollBarObject();
                this.initializeScrollBarEvents();
                this.states.selectState();          // select initial state;
            }

            this.boundedElement = elem;
            this.boundedParameters.boundedElemHeight = this.boundedParameters.calculateHeightAsSumOfChildren(elem);

            if(this.boundedParameters.boundedElemHeight === 0) {
                this.scrollbarContainer.addClass('displayNone');
                this.calculateBoundedParameters();
            } else {
                this.scrollbarContainer.removeClass('displayNone');

                /* Scrolling with mouse wheel is maybe the most natural approach to scroll at all */
                this.boundedElement.onwheel = function(event) {
                    if(event == null || typeof event === 'undefined')
                        event = {
                            deltaY: 0
                        };

                    AnimaScrollbar.scrollbar.addDelta(event.deltaY);
                };
                this.calculateBoundedParameters();


            }
        };
        this.rebind = function() {
            this.bind(this.boundedElement);
        }
    },
    scrollbar: null
};

// Creazione di un oggetto scrollbar
AnimaScrollbar.scrollbar = new AnimaScrollbar.scrollbarObj();
/* SCROLLBAR MODULE */