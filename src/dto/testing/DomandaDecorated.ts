import { Test } from './Test';
import { RispostaDomanda } from './RispostaDomanda';

export class DomandaDecorated {
    id : number;
    testo : String;
    spiegazione : String;
    test : Test;
    last : boolean;
    risposte : RispostaDomanda[];
}