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

class ConverterUnits {
    pxFromVh(vhValue : number) : number {
        let clientHeight = window.innerHeight;
        return vhValue*clientHeight/100;
    }
    pxFromVw(vwValue : number) : number {
        let clientWidth = window.innerWidth;
        return vwValue*clientWidth/100;
    }
    
    isVhValue(value : any) : boolean {
        return (value.toString().toLowerCase().indexOf("vh") >= 0);
    }
    isVwValue(value : any) : boolean {
        return (value.toString().toLowerCase().indexOf("vw") >= 0);
    }
    isPercentValue(value : any) : boolean {
        return (value.toString().toLowerCase().indexOf("%") >= 0);
    }
    isPxValue(value : any) : boolean {
        return (value.toString().toLowerCase().indexOf("px") >= 0);
    }

    pxFromPercentageWidth(percentValue : string, elem : HTMLElement) : number {
        if(!this.isPercentValue(percentValue))
            return 0;

        let parent = elem.parentElement;
    
    
        percentValue = percentValue.replace("%", "");
        if(parent == null) {
            // allora la percentuale equivale ai vw perché il parent è lo schermo
            return this.pxFromVw(parseFloat(percentValue));
        }
    
        let width = parent.offsetWidth;
        return width * parseFloat(percentValue) / 100.0;
    }
    pxFromPercentageHeight(percentValue : string, elem : HTMLElement) : number {
        if(!this.isPercentValue(percentValue))
            return 0;
        let parent = elem.parentElement;
    
        percentValue = percentValue.replace("%", "");
        if(parent == null) {
            // allora la percentuale equivale ai vh perché il parent è lo schermo
            return this.pxFromVh(parseFloat(percentValue));
        }
    
        let height = parent.offsetHeight;
        return height * parseFloat(percentValue) / 100.0;
    }


    public convertValue(value : string) : number {
        let endValue : number = 0;
        if(this.isVwValue(value)) {
            value = value.replace("vw", "");
            endValue = this.pxFromVw(parseFloat(value));
        }
        else if(this.isVhValue(value)) {
            value = value.replace("vh", "");
            endValue = this.pxFromVh(parseFloat(value));
        }
        else if(this.isPxValue(value)) {
            endValue = parseFloat(value.replace("px", ""));
        }
    
        return endValue;
    }
}
export var converterUnits : ConverterUnits = new ConverterUnits();



/* ANIMATIONS */
var number_of_oscillation = 2;
export class AnimationCurves  {
    none: string = 'none';
    exponentialsincos: string = 'exponentialsincos';
    exponential: string = 'exponential';
    linear: string = 'linear';
    exponentialsincosReversed: string = 'exponentialsincos-reversed';
    exponentialReversed: string = 'exponential-reversed';
    square: string = 'square';
    squareReversed: string = 'square-reversed';
    cubic: string = 'cubic';
};
var curves : AnimationCurves = new AnimationCurves();
export class AnimationMultiplier {
    private expCurve(t : number, timeToStable : number, useSinCos : boolean) : number {
        let realTimeToStable : number = timeToStable / 0.924;
    
        if(t < 0)
            return 0;
        else if(t >= timeToStable)
            return 1;
    
    
        let lamda : number = 5 / realTimeToStable; 										// tau = 1/lamda is the abs of e exponent: e^(-lamda * t). 5tau from t = 0 means that the effect has ended
    
    
        let k : number = 1.01;
        let factExp : number = k*(Math.pow(Math.E, -lamda*t)-1)+1;
        let result : number = 1 -  factExp;
        if(useSinCos) {
            let omega : number = number_of_oscillation * 0.4 * Math.PI * lamda;		// 1 sola oscillazione. Il tempo impiegato deve essere identico al tempo di assestamento (fattore esponenziale)
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
    private expCurveReversed(t : number, timeToStable : number, useSinCos : boolean) : number {
        if(t < 0)
            return 0;
        else if(t >= timeToStable)
            return 1;
    
        let realTimeToStable : number = timeToStable/0.924;
        let lamda : number = 5 / realTimeToStable; 										// tau = 1/lamda is the abs of e exponent: e^(-lamda * t). 5tau from t = 0 means that the effect has ended
    
        let k : number = 1.01;
        t = realTimeToStable - t;
    
        let result : number = k*(Math.pow(Math.E, -lamda*t)-1)+1;
        if(useSinCos) {
            let omega : number = number_of_oscillation * 0.4 * Math.PI * lamda;		// 1 sola oscillazione. Il tempo impiegato deve essere identico al tempo di assestamento (fattore esponenziale)
            // quindi T = 5tau => f = lamda/5. Pulsation is 2pi*f -> 0.4*Math.PI * lamda
            // number_of_oscillation are the number of "rounds" it does
            // inoltre animationObject.stepTime < 1/(2f) dove f = 0.2*lambda*number_of_oscillation. animationObject.stepTime < 1/12 = 0.083
            result  *= (Math.cos(omega*t-Math.PI/4) - Math.sin(omega*t-Math.PI/4))/Math.sqrt(2);
        }
    
        return result;
    }

    private linearCurve(t : number, timeToStable : number) : number {
        if(t >= (timeToStable))
            return 1;
        if(t < 0)
            return 0;
    
        return t/(timeToStable);
    }
    private squareCurve(t : number, timeToStable : number) : number {
        if(t <= 0)
            return 0;
        else if(t >= timeToStable)
            return 1;
    
        return Math.pow((t/timeToStable), 2);
    }
    private squareCurveReversed(t : number, timeToStable : number) : number {
        if(t <= 0)
            return 0;
        else if(t >= timeToStable)
            return 1;
    
        return -Math.pow(((t-timeToStable)/timeToStable), 2) + 1;
    }

    private cubicCurve(t : number, timeToStable : number) : number {
        if(t <= 0)
            return 0;
        else if(t >= timeToStable)
            return 1;
    
        let x : number =(t-timeToStable/2)*2/(timeToStable*Math.pow(2,1/3));             // cambio di variabile che scala la curva per rispettare il tempo di animazione e trasla l'asse per avere simmetria rispetto a y
        return Math.pow(x, 3)+0.5;
    }
    private noneCurve(t : number) : number {
        if (t < 0) 	return 0;
        else 		return 1;
    }

    public dimensionMultiplier(t : number, timeToStable : number, typeOfCurve : string) : number {
        if(typeOfCurve.toLowerCase() === curves.exponential)
            return this.expCurve(t, timeToStable, false);
        else if(typeOfCurve.toLowerCase() === curves.exponentialsincos)
            return this.expCurve(t, timeToStable, true);
        else if(typeOfCurve.toLowerCase() === curves.linear)
            return this.linearCurve(t, timeToStable);
        else if(typeOfCurve.toLowerCase() === curves.none)
            return this.noneCurve(t);
        else if(typeOfCurve.toLowerCase() === curves.square)
            return this.squareCurve(t, timeToStable);
        else if(typeOfCurve.toLowerCase() === curves.cubic)
            return this.cubicCurve(t, timeToStable);
        else if(typeOfCurve.toLowerCase() === curves.exponentialReversed)
            return this.expCurveReversed(t, timeToStable, false);
        else if(typeOfCurve.toLowerCase() === curves.exponentialsincosReversed)
            return this.expCurveReversed(t, timeToStable, true);
        else if(typeOfCurve.toLowerCase() === curves.squareReversed)
            return this.squareCurveReversed(t, timeToStable);
    
    
        return 0;
    }
}
var animationMultiplier : AnimationMultiplier = new AnimationMultiplier();

export class GraphicMethods  {
    getStyle(elem : HTMLElement, styleProp : string) : string {
        let value, defaultView = elem.ownerDocument.defaultView;
        // W3C standard way:
        if (defaultView && defaultView.getComputedStyle) {
            // sanitize property name to css notation (hypen separated words eg. font-Size)
            styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
            return defaultView.getComputedStyle(elem, null).getPropertyValue(styleProp);
        }
    }
    setBackroundSize(elem : HTMLElement, sizeProperty : string) : void {
        try {
            elem.style.backgroundSize = sizeProperty;
        } catch(err) {}
    }
    setBackgroundColor(elem : HTMLElement, color : string) : void {
        try {
            elem.style.backgroundColor = color;
        } catch(err) {}
    }
    setBackgroundColorRGBA(animationObj : Animation, elem : HTMLElement, R : number, G : number, B : number, A : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        let colorString : string = "rgba(" + R + ", " + G + ", " + B + ", " + A + ")";
        this.setBackgroundColor(elem, colorString);
    }
    setBackgroundColorHSLA(animationObj : Animation, elem : HTMLElement, H : number, S : number, L : number, A : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        
        let colorString : string = "hsla(" + H + ", " + S + "%, " + L + "%, " + A + ")";
        this.setBackgroundColor(elem, colorString);
    }
    setTextColor(elem : HTMLElement, color : string) : void {
        try {
            elem.style.color = color;
        } catch(err) {}
    }
    setTextColorRGBA(animationObj : Animation, elem : HTMLElement, R : number, G : number, B : number, A : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        let colorString : string = "rgba(" + R + ", " + G + ", " + B + ", " + A + ")";
        this.setTextColor(elem, colorString);
    }
    setZIndex(elem : HTMLElement, index : number|string) : void {
        if(elem == null)
            return;

        elem.style.zIndex = index+"";
    }
    /*rotateX(elem : HTMLElement, deg : number) {
        if(elem == null)
            return;

        if(deg == null)
            return;

        elem.rotateX(deg % 1080);
    }
    rotateY(elem, deg) {
        if(elem == null)
            return;

        if(deg == null)
            return;

        elem.rotateY(deg % 1080);
    }
    rotateZ(elem, deg) {
        if(elem == null)
            return;

        if(deg == null)
            return;

        elem.rotateZ(deg % 1080);
    }
    rotate(animationObj, elem, axis, deg) {
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

    }
    doRotateFunction(animationObject, elem, axis, deg, initialDeg, timeToStable, typeOfCurve) {
        initialDeg = toInt(getInitialAxisDeg(axis, elem));
        for(let t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let finalDeg = Math.floor(deg*multiplier + initialDeg);


            animationObject.timeouts.push(
                setTimeout( function(finalDeg) {
                    GraphicMethods.rotate(animationObject, elem, axis, finalDeg);
                } t*1000, finalDeg)
            );
        }
        finalDeg = initialDeg+deg;
        setTimeout( function(finalDeg) {
            GraphicMethods.rotate(animationObject, elem, axis, finalDeg);
            animationObject.stop();
        } timeToStable*1000, finalDeg);
    }
    setRotateFunctionX(animationObject, elem, deg, timetoStable, typeOfCurve) {
        if(elem == null || deg == null || timetoStable == null || timetoStable < 0 || typeOfCurve == null)
            return;

        let currentRotation = elem.rotationX();
        GraphicMethods.doRotateFunction(animationObject, elem, "x", deg, currentRotation, timetoStable, typeOfCurve);
    }
    setRotateFunctionY(animationObject, elem, deg, timetoStable, typeOfCurve) {
        if(elem == null || deg == null || timetoStable == null || timetoStable < 0 || typeOfCurve == null)
            return;

        let currentRotation = elem.rotationY();
        GraphicMethods.doRotateFunction(animationObject, elem, "y", deg, currentRotation, timetoStable, typeOfCurve);
    }
    setRotateFunctionZ(animationObject, elem, deg, timetoStable, typeOfCurve) {
        if(elem == null || deg == null || timetoStable == null || timetoStable < 0 || typeOfCurve == null)
            return;

        let currentRotation = elem.rotationZ();
        GraphicMethods.doRotateFunction(animationObject, elem, "z", deg, currentRotation, timetoStable, typeOfCurve);
    }*/
    setOpacity(animationObj : Animation, elem : HTMLElement, opacityPercent : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.filter = "alpha(opacity=" + opacityPercent + ")";
        elem.style.opacity= (opacityPercent/100.0) + "";
    }
    setHeight(animationObj : Animation, elem : HTMLElement, height : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.height = height + 'px';
    }
    setWidth(animationObj : Animation, elem : HTMLElement, width : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.width = width + 'px';
    }
    setLeft(animationObj : Animation, elem : HTMLElement, left : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.left = left + 'px';
    }
    setTop(animationObj : Animation, elem : HTMLElement, top : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.top = top + 'px';
    }
    setScrollTop(animationObj : Animation, elem : HTMLElement, top : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.scrollBy(0, top);
    }
    setScrollToTop(animationObj : Animation, elem : HTMLElement, top : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;


        elem.scrollTop = top;
    }
    setBottom(animationObj : Animation, elem : HTMLElement, bottom : number) : void {
        if(!animationObj || animationObj == null || !animationObj.isExecuting()) {
            return;
        }
        if(elem == null)
            return;

        elem.style.bottom = bottom + 'px';
    }
    getBackgroundColor(elem : HTMLElement) : Array<number> {
        let rgbString = this.getStyle(elem, "background-color");
        let RGBAArray = [];
        let openParIndex = rgbString.toString().indexOf("(");
        let closedParIndex = rgbString.toString().indexOf(")");

        if(openParIndex < 0 || closedParIndex <= openParIndex)
            return [0,0,0,0];

        let insideParenthesis = rgbString.toString().substring(openParIndex+1, closedParIndex)
        let values = insideParenthesis.split(",");
        for(let i = 0; i < 3; i++) {
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
    }
    /*
	Questo metodo è un'animazione che descrive la transizione tra un colore di Sfondo e un altro di un certo elemento.

	fromColor: è un'array di 4 byte, ciascun byte identifica il valore di un colore primario, mentre l'ultimo della trasparenza, secondo l'ordine RGBA
	toColor: come fromColor, ma è il colore di "destinazione"
	elemID: tipo Stringa, è l'id dell'elemento a cui applicare l'effetto
	timeToStable: è il tempo che ci mette l'animazione a copletarsi, espresso in secondi
	typeOfCurve: può eseere "exponential", "exponentialsincos", "linear", "none", "gauss". l'ultima è disponibile solo se viene abilitata all'inizio di questo file e nel metodo dimensionMultiplier.
*/
    /*setBackgroundColorFunction(animationObject, elem : HTMLElement, timeToStable : number, typeOfCurve : string, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        let t = 0;
        let fromColor = GraphicMethods.getBackgroundColor(elem);
        let fc_alpha = fromColor[3];
        fromColor = rgbtohsl(fromColor[0], fromColor[1], fromColor[2]);
        fromColor.push(fc_alpha);

        let toColor = args[0];
        let tc_alpha = toColor[3];
        toColor = rgbtohsl(toColor[0], toColor[1], toColor[2]);
        toColor.push(tc_alpha);

        // adjusting hue for gray scale colors
        if(fromColor[1] === 0) {
            fromColor[0] = toColor[0];
        }
        if(toColor[1] === 0) {
            toColor[0] = fromColor[0];
        }

        let deltaColor = {
            H: toColor[0] - fromColor[0],
            S: toColor[1] - fromColor[1],
            L: toColor[2] - fromColor[2],
            A: toColor[3] - fromColor[3]
        };


        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offH = Math.floor(deltaColor.H*multiplier);
            let offS = Math.floor(deltaColor.S*multiplier);
            let offL = Math.floor(deltaColor.L*multiplier);
            let offA = Math.round(deltaColor.A*multiplier*10000)/10000;

            let tarH = parseFloat(fromColor[0]) + offH;
            let tarS = parseFloat(fromColor[1]) + offS;
            let tarL = parseFloat(fromColor[2]) + offL;
            let tarA = parseFloat(fromColor[3]) + offA;


            let timeID = setTimeout(
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

    }*/
    /*
        Vedere setBackgroundColorFunction
    */
    /*setTextColorFunction(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 2) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        let t = 0;
        let fromColor = args[0];
        let toColor = args[1];
        let deltaColor = {
            R: toColor[0] - fromColor[0],
            G: toColor[1] - fromColor[1],
            B: toColor[2] - fromColor[2],
            A: toColor[3] - fromColor[3]
        };

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offR = Math.floor(deltaColor.R*multiplier);
            let offG = Math.floor(deltaColor.G*multiplier);
            let offB = Math.floor(deltaColor.B*multiplier);
            let offA = Math.round(deltaColor.A*multiplier*10000)/10000;

            let tarR = parseFloat(fromColor[0]) + offR;
            let tarG = parseFloat(fromColor[1]) + offB;
            let tarB = parseFloat(fromColor[2]) + offG;
            let tarA = parseFloat(fromColor[3]) + offA;


            let timeID = setTimeout(
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
    }*/
    /*
        Vedere setBackgroundColorFunction
    */
    setHeightFunction(animationObject : Animation, elem : HTMLElement, timeToStable : number, typeOfCurve : string, args : Array<string>) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", "true");

        let height : string = args[0];
        let nHeight : number = 0;
        let t = 0;
        let currentHeight = Math.floor(propertyReader.getHeightInt(elem));
        if(currentHeight < 0)
            return;										// Error: see getHeight(elemID) method

        if(converterUnits.isVwValue(height)) {
            height = height.replace("vw", "");
            nHeight = converterUnits.pxFromVw(parseFloat(height));
        }
        else if(converterUnits.isVhValue(height)) {
            height = height.replace("vh", "");
            nHeight = converterUnits.pxFromVh(parseFloat(height));
        }
        else if(converterUnits.isPercentValue(height)) {
            height = height.replace("%", "");
            nHeight = converterUnits.pxFromPercentageHeight(height, elem);
        }
        else if(converterUnits.isPxValue(height)) {
            nHeight = parseFloat(height.replace("px", ""));
        }
        else {
            // not a valid format
            return;
        }

        let delta : number = nHeight - currentHeight;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier : number = animationMultiplier.dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset : number = Math.floor(delta*multiplier);
            let result : number = currentHeight + offset;

            animationObject.timeouts.push(
                setTimeout((animationObj, elem, height) => {
                    graphicFunction.setHeight(animationObj,elem, height);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout((animationObj, elem, height) => {
                graphicFunction.setHeight(animationObj,elem, height);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, height)
        );
    }
    /*
        Vedere setBackgroundColorFunction
    */
    setWidthFunction(animationObject : Animation, elem : HTMLElement, timeToStable : number, typeOfCurve : string, args : Array<string>) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", "true");

        let width : string = args[0];
        let nWidth : number = 0;
        let t : number = 0;
        let currentWidth : number = Math.floor(propertyReader.getWidthInt(elem));
        if(currentWidth < 0)
            return;										// Error: see getWidth(elemID) method

        if(converterUnits.isVwValue(width)) {
            width = width.replace("vw", "");
            nWidth = converterUnits.pxFromVw(parseFloat(width));
        }
        else if(converterUnits.isVhValue(width)) {
            width = width.replace("vh", "");
            nWidth = converterUnits.pxFromVh(parseFloat(width));
        }
        else if(converterUnits.isPercentValue(width)) {
            width = width.replace("%", "");
            nWidth = converterUnits.pxFromPercentageHeight(width, elem);
        }
        else if(converterUnits.isPxValue(width)) {
            nWidth = parseFloat(width.replace("px", ""));
        }
        else {
            // not a valid format
            return;
        }

        let delta : number = nWidth - currentWidth;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = animationMultiplier.dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = Math.floor(delta*multiplier);
            let result = currentWidth + offset;

            animationObject.timeouts.push(
                setTimeout((animationObj, elem, width) => {
                    graphicFunction.setWidth(animationObj,elem, width);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout((animationObj, elem, width) => {
                graphicFunction.setWidth(animationObj,elem, width);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, width)
        );

    }
    /* vedere setBackgroundColorFunction */
    setLeftFunction(animationObject : Animation, elem : HTMLElement, timeToStable : number, typeOfCurve : string, args : Array<string>) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", "true");

        let left : string = args[0];
        let nLeft : number = 0;
        let t : number;
        let currentLeft : number = Math.floor(propertyReader.getLeftInt(elem));

        if(converterUnits.isVwValue(left)) {
            left = left.replace("vw", "");
            nLeft = converterUnits.pxFromVw(parseFloat(left));
        }
        else if(converterUnits.isVhValue(left)) {
            left = left.replace("vh", "");
            nLeft = converterUnits.pxFromVh(parseFloat(left));
        }
        else if(converterUnits.isPercentValue(left)) {
            left = left.replace("%", "");
            nLeft = converterUnits.pxFromPercentageHeight(left, elem);
        }
        else if(converterUnits.isPxValue(left)) {
            nLeft = parseFloat(left.replace("px", ""));
        }
        else {
            // not a valid format
            return;
        }

        let delta = nLeft - currentLeft;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = animationMultiplier.dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = Math.floor(delta*multiplier);
            let result = currentLeft + offset;

            animationObject.timeouts.push(
                setTimeout((animationObj, elem, left) => {
                    graphicFunction.setLeft(animationObj,elem, left);
                }, t*1000, animationObject, elem, result)
            );

        }
        animationObject.timeouts.push(
            setTimeout((animationObj, elem, left) => {
                graphicFunction.setLeft(animationObj,elem, left);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, left)
        );

    }
/* vedere setBackgroundColorFunction */
    setTopFunction(animationObject : Animation, elem : HTMLElement, timeToStable : number, typeOfCurve : string, args : Array<string>) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", "true");

        let top : string = args[0];
        let nTop : number = 0;
        let t : number;
        let currentTop : number = Math.floor(propertyReader.getTopInt(elem));

        if(converterUnits.isVwValue(top)) {
            top = top.replace("vw", "");
            nTop = converterUnits.pxFromVw(parseFloat(top));
        }
        else if(converterUnits.isVhValue(top)) {
            top = top.replace("vh", "");
            nTop = converterUnits.pxFromVh(parseFloat(top));
        }
        else if(converterUnits.isPercentValue(top)) {
            top = top.replace("%", "");
            nTop = converterUnits.pxFromPercentageHeight(top, elem);
        }
        else if(converterUnits.isPxValue(top)) {
            nTop = parseFloat(top.replace("px", ""));
        }
        else {
            // not a valid format
            return;
        }

        let delta = nTop - currentTop;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = animationMultiplier.dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = Math.floor(delta*multiplier);
            let result = currentTop + offset;

            animationObject.timeouts.push(
                setTimeout((animationObj, elem, top) => {
                    graphicFunction.setTop(animationObj,elem, top);
                }, t*1000, animationObject, elem, result)
            );
        }
        animationObject.timeouts.push(
            setTimeout((animationObj, elem, top) => {
                graphicFunction.setTop(animationObj,elem, top);
                animationObject.stop();
            }, timeToStable*1000, animationObject, elem, top)
        );
    }
    /*setBottomFunction(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        let bottom = args[0];
        let t;
        let currentBottom = Math.floor(getBottomInt(elem));

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

        let delta = bottom - currentBottom;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = Math.floor(delta*multiplier);
            let result = currentBottom + offset;

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
    }
    setScrollTopFunction(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        let top = args[0];
        let t;

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

        let delta = top;
        let oldMultiplier = 0;
        let finalOffset = 0;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = delta*(multiplier-oldMultiplier);
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
    }
    setScrollToTopFunction(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        let top = args[0];
        let t;

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

        let initialScrollTop = elem.scrollTop;
        let delta = top - initialScrollTop;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = delta*multiplier + initialScrollTop;

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
    }
    setBorderRadiusFunction(animationObject, elem, timeToStable, typeOfCurve, args) {
        // args è un vettore che contiene un solo elemento, anch'esso un vettore.
        // v = args[0]
        // v può avere lunghezza letiabile 1, 2 o 4 e i valori crrispondono ai 4 lati secondo lo standard css

        if(args == null || args.length != 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        let t;
        args = args[0];

        let current = [elem.borderRadius.getTopLeft(elem), elem.borderRadius.getTopRight(elem), elem.borderRadius.getBottomLeft(elem), elem.borderRadius.getBottomRight(elem)];
        args = translateFourDimensionSyntaxes(args);
        for(let i = 0; i < args.length; i++)
            args[i] = convertValue(args[i]);
        
        // currents are all in px values withous 'px'

        let delta = [args[0]-current[0], args[1] - current[1], args[2] - current[2], args[3] - current[3]];

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = [(delta[0]*multiplier), (delta[1]*multiplier), (delta[2]*multiplier), (delta[3]*multiplier)];
            let result = [0,0,0,0];
            for(let z = 0; z < 4; z++) {
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
    }
    setRotateFunction(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 2) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);


        let axis = args[0];
        let deg = args[1];

        if(elem == null || axis == null || axis.toString().length === 0 || deg == null || timeToStable == null || timeToStable < 0 || typeOfCurve == null)
            return;

        let a = axis.toString().toLowerCase().substring(0, 1);
        if(a === "x")
            GraphicMethods.setRotateFunctionX(animationObject, elem, deg, timeToStable, typeOfCurve);
        else if(a === "y")
            GraphicMethods.setRotateFunctionY(animationObject, elem, deg, timeToStable, typeOfCurve);
        else if(a === "z")
            GraphicMethods.setRotateFunctionZ(animationObject, elem, deg, timeToStable, typeOfCurve);

    }
    setOpacityFunction : function(animationObject, elem, timeToStable, typeOfCurve, args) {
        if(args.length !== 1) {
            return;
        }
        elem.setAttribute("AnimaAnimation", true);

        let opacityTargetPercent = args[0];
        let t;
        let currentOpacity = Math.floor(getOpacity(elem)*100);

        let delta = opacityTargetPercent - currentOpacity;

        for(t = 0; t < timeToStable; t += animationObject.stepTime) {
            let multiplier = dimensionMultiplier(t, timeToStable, typeOfCurve);
            let offset = Math.floor(delta*multiplier);
            let result = currentOpacity + offset;


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
    }*/
};
var graphicFunction : GraphicMethods = new GraphicMethods();


class PropertyReader {
    private getValue(elem : HTMLElement, property : string) {
        if(elem == null) {
            return null;
        }
    
        return graphicFunction.getStyle(elem, property);
    }

    getHeight(elem : HTMLElement) : string {
        return this.getValue(elem, 'height');
    }
    getWidth(elem : HTMLElement) : string {
        return this.getValue(elem, 'width');
    }
    getHeightInt(elem : HTMLElement) : number {
        let ris = this.getHeight(elem);
        return parseFloat(ris.replace("px", ""));
    }
    getWidthInt(elem : HTMLElement) : number {
        let ris = this.getWidth(elem);
        return parseFloat(ris.replace("px", ""));
    }
    
    getTop(elem : HTMLElement) : string {
        return this.getValue(elem, 'top');
    }
    getBottom(elem : HTMLElement) : string {
        return this.getValue(elem, 'bottom');
    }
    getTopInt(elem : HTMLElement) : number {
        let ris = this.getTop(elem);
        return parseFloat(ris.replace("px", ""));
    }
    getBottomInt(elem : HTMLElement) : number {
        let ris = this.getBottom(elem);
        return parseFloat(ris.replace("px", ""));
    }
    getLeft(elem : HTMLElement) : string {
        return this.getValue(elem, 'left');
    }
    getLeftInt(elem : HTMLElement) : number {
        let ris = this.getLeft(elem);
        return parseFloat(ris.replace("px", ""));
    }
}
var propertyReader : PropertyReader = new PropertyReader();


class AnimationEntry  {
    private elem : HTMLElement;
    animation : Animation;

    constructor(elem : HTMLElement, animation : Animation)  {
        this.elem = elem;
        this.animation = animation;
    }
    checkElem(elem : HTMLElement) : boolean {
        return this.elem === elem;
    }
    checkAnimation(animation : Animation) : boolean {
        return this.animation.isSameTypeOfAnimation(animation);
    }
};

class AnimationRegistry {
    private entries : AnimationEntry[] = [];

    existElem(elem :HTMLElement, animation : Animation) : boolean {
        for(let i = 0; i < this.entries.length; i++) {
            let entry = this.entries[i];
            if(entry.checkElem(elem) && entry.checkAnimation(animation))
                return true;
        }

        return false;
    }
    indexOfElem(elem : HTMLElement, animation : Animation) : number {
        return this.entries.findIndex(e => e.checkElem(elem) && e.checkAnimation(animation));
    }
    getAnimationOf(elem : HTMLElement, animation : Animation) {
        let index = this.indexOfElem(elem, animation);
        if(index == -1)
            return null;

        return this.entries[index].animation;
    }
    push(elem : HTMLElement, animation : Animation) : void {
        let entry = new AnimationEntry(elem, animation);
        if(!this.existElem(elem, animation))
            this.entries.push(entry);
    }
    remove(elem : HTMLElement, animation : Animation) : void {
        let index = this.indexOfElem(elem, animation);
        if(index == -1)
            return;

        this.entries.splice(index, 1);
    }
};
var registry : AnimationRegistry = new AnimationRegistry();

export class Animation {
    element : HTMLElement = null;
    animationTime : number = null;
    animationCurve : string = null;
    animationFunction : Function = null;
    timeouts = [];
    animationFunctionArguments : Array<any> = [];
    isStopping : boolean = false;
    isStopped : boolean = true;
    isValid : boolean = false;
    animationID : string;
    differentSamplingsByDevices : boolean = true;
    stepTime : number = 0.022;					// 22 ms ad aggiornamento -> f = 1000/22 = 45Hz (molto buona)
    mobileStepTime : number = 0.035;            // 35 ms ad aggiornamento -> f = 1000/35 = 28Hz (sufficiente)
    desktopStepTime : number = 0.012;           // 12 ms ad aggiornamento -> f = 1000/12 = 83Hz (molto buona)
    priority : number = 1;                      // Default priority is set to 1
    onEndAnimation : Function = null;             // this is called once animation ended, through a timeout of animationTime seconds
    onStartAnimation : Function = null;           // this is called once animation starts.
    
    setSamplingFrequency(frequency : number) : void {
        this.stepTime = 1 / frequency;
    }
    setSamplingTime(time : number) : void {
        this.stepTime = time;
    }

    isAlive() : boolean {return !this.isStopped;}                           // Animation can be executing or stopping
    isExecuting() : boolean {return !this.isStopping && !this.isStopped;}    // True if animation is executing

    // reading arguments
    constructor(...args : any[]) {
        if(args.length < 7)
            this.isValid = false;
        else {
            this.isValid = true;
            this.animationID = args[1];
            this.element = args[2];
            this.animationTime = args[3];
            this.animationCurve = args[4];
            this.animationFunction = args[5];
            let i : number;
            for(i = 6; i < args.length; i++) {
                this.animationFunctionArguments.push(args[i]);
            }
        }
    }
    

    isSameTypeOfAnimation(animation : Animation) : boolean {
        return this.animationID == animation.animationID;
    };
    start() : void {
        if(!this.isValid || this.isAlive())
            return;

        let oldAnimation : Animation;
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
        //this.stepTime = (this.differentSamplingsByDevices && isMobile()) ? this.mobileStepTime : this.desktopStepTime;
        this.stepTime = this.desktopStepTime;

        if(this.onStartAnimation)
            this.onStartAnimation.apply(this);

        this.animationFunction.apply(this, [this, this.element, this.animationTime, this.animationCurve, this.animationFunctionArguments]);
    };
    stop(...args : boolean[]) {
        if(!this.isExecuting())
            return;

        this.isStopping = true;
        this.isStopped = false;
        let shouldDisposeAnimation : boolean = (args.length >= 1 && args[0]);
        let lastIndex : number = this.timeouts.length - 1;
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
            if(this.onEndAnimation)
                this.onEndAnimation.apply(this);
        }

        this.isStopped = true;
        this.isStopping = false;
    }
};

export class AnimationFactory {
    AnimationLeft(element : HTMLElement, animationTime : number, animationCurve : string, leftValue : any) : Animation {
        return new Animation(this, 'left', element, animationTime, animationCurve, graphicFunction.setLeftFunction, leftValue);
    }
    AnimationTop(element : HTMLElement, animationTime : number, animationCurve : string, topValue : any) : Animation {
        return new Animation(this, 'top', element, animationTime, animationCurve, graphicFunction.setTopFunction, topValue);
    }
    

    startAfter (animation : Animation, seconds : number) : void {
        let millis = seconds*1000;
        animation.priority = 0;                                 // Lowest priority by default
        setTimeout(() => {animation.start();}, millis);
    }
};
var animationFactory : AnimationFactory = new AnimationFactory();
/* ANIMATIONS */




















@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    extendedDocument : ExtendedDocument;
    converterUnits : ConverterUnits;
    animationFactory : AnimationFactory;


    constructor() {
        this.extendedDocument = extendedDocument;
        this.converterUnits = converterUnits;
        this.animationFactory = animationFactory;
    }
    
    preload(element : HTMLElement) {
        (new PreloadEngine(element)).preload();
    }

    createTypingManager(typingTarget : HTMLElement) : TypingManager {
        return new TypingManager(typingTarget);
    }

}
/* PRELOAD MODULE */

