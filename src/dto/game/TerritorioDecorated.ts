import { Categoria } from '../testing/Categoria';

export class TerritorioDecorated {
    id : number;
    category : Categoria;
    armate : number;
    owner : string;

    constructor() {
        this.category = new Categoria();
    }
}