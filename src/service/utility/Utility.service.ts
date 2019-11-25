import { Injectable } from "@angular/core";
import { Listener } from 'selenium-webdriver';

class ExtendedDocument {

    private getElementsByAttributeNameRecursive(name : string, root : Element, collection : Element[]) : void {
        if(root.hasAttribute(name))
            collection.push(root);

        for(let i = 0; i < root.children.length; i++) {
            this.getElementsByAttributeNameRecursive(name, root.children[i], collection);
        }
    }
    getElementsByAttributeName(name : string) : Element[] {
        return this.getElementsByAttributeNameOf(document.body, name);
    }
    getElementsByAttributeNameOf(e : Element, name : string) : Element[] {
        let collection : Element[] = [];
        this.getElementsByAttributeNameRecursive(name, e, collection);

        return collection;
    }

}
var extendedDocument : ExtendedDocument = new ExtendedDocument();

class CacheEntry {
    private element : Element = null;
    private cached : boolean = false;

    constructor(e : Element) {
        this.element = e;
    }
    isCached() : boolean {
        return this.cached;
    }
    setCached(value : boolean) {this.cached = value;}
    isElement(element : Element) : boolean {
        let same : boolean = this.element == element;
        return same;
    }
}
class CacheRegistry {
    private entries : CacheEntry[] = [];
    indexOf(element : Element) : number {
        let index = this.entries.findIndex((e) => {return e.isElement(element)});
        return index;
    }
    exists(element : Element) : boolean {return this.indexOf(element) >= 0;}
    addEntry(element : Element) : void {
        if(this.exists(element))
            return;

        this.entries.push(new CacheEntry(element));
    }
    setCached(element : Element) : void {
        let index = this.indexOf(element);
        if(index < 0) {
            this.addEntry(element);
            index = this.entries.length - 1;
        }

        let entry = this.entries[index];
        entry.setCached(true);
    }
    isCached(element : Element) : boolean {
        return (!this.exists(element) || this.entries[this.indexOf(element)].isCached());
    }
}
var cacheRegistry : CacheRegistry = new CacheRegistry();

class AnimaImage extends Image {
    engine : PreloadEngine = null;
    constructor() {super();}
}

class PreloadEngine {
    private images : AnimaImage[] = [];
    private preloadingElement : Element = null;
    private elementToPreload : number = 0;

    constructor(e : Element) {
        this.preloadingElement = e;
        cacheRegistry.addEntry(e);
    }
    private _preload(...urls : string[]) : void {
        urls.forEach(url => {
            let image = new AnimaImage();
            image.engine = this;
            image.src = url;
            image.addEventListener('load', (event) => {
                (<AnimaImage>event.target).engine.checkPreloadComplete();
            });
            this.images.push(image);
        });
    }
    private preloadElement() : void {
        let preloads : Element[] = extendedDocument.getElementsByAttributeNameOf(this.preloadingElement, 'imageSource');
        if(preloads.length === 0)
            this.checkPreloadComplete();

        preloads.forEach(eToPreload => {
            let attributeValues : string[] = eToPreload.getAttribute('imageSource').split(";");
            this.elementToPreload += attributeValues.length;
            attributeValues.forEach(url => this._preload(url));
        })
        
    }
    private checkPreloadComplete() {
        this.elementToPreload--;
        if(this.elementToPreload <= 0) {
            cacheRegistry.setCached(this.preloadingElement);
            this.preloadingElement.dispatchEvent(new CustomEvent('preloaded'));
        }
    }
    preload() : void {
        this.elementToPreload = 0;
        if(cacheRegistry.isCached(this.preloadingElement))
            this.checkPreloadComplete();
        else {
            this.preloadElement();
        }
    }
}

/* Typing */
export class TypingManager {
    private target : HTMLElement = null;
    private data : string = null;
    private timeouts = [];
    typingTimeout : number = 5;

    constructor(target : HTMLElement) {
        this.target = target;
        this.data = "";
    }

    private updateText(s : string) {
        if(this.target != null) {
            this.target.innerHTML = s;
        }
    }
    private cleanTimeouts() {
        this.timeouts.forEach(t => clearTimeout(t));
    }


    clean() {
        this.data = "";
        this.cleanTimeouts();
        this.updateText("");
    }

    type(data : string) {
        this.clean();
        for(let i = 0; i < data.length; i++) {
            let s = this.data + data.charAt(i);
            this.data = s;
            this.timeouts.push(setTimeout((s : string) => {
                this.updateText(s);
            }, i*this.typingTimeout, s));
        }
    }

}
/* Typing */

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    extendedDocument : ExtendedDocument;


    constructor() {
        this.extendedDocument = extendedDocument;
    }
    
    preload(element : HTMLElement) {
        (new PreloadEngine(element)).preload();
    }

    createTypingManager(typingTarget : HTMLElement) : TypingManager {
        return new TypingManager(typingTarget);
    }

}
/* PRELOAD MODULE */

/* Utilities (JS) */
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
/* UTILITIES (JS) */
