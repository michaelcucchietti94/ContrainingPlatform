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


@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    extendedDocument : ExtendedDocument;
    
    preload(element : HTMLElement) {
        (new PreloadEngine(element)).preload();
    }

}
/* PRELOAD MODULE */