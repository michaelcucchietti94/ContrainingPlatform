import { Domain } from 'domain';
import { DomandaDecorated } from './DomandaDecorated';

export class RispostaDomanda {
    id : number;
    testo : String;
    corretta : Boolean;
    domanda : DomandaDecorated;
}