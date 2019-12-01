import { Test } from './Test';
import { RispostaDomanda } from './RispostaDomanda';

export class DomandaDecorated {
    id : number;
    testo : String;
    level : number;
    spiegazione : String;
    last : boolean;
    risposte : RispostaDomanda[] = [];
}