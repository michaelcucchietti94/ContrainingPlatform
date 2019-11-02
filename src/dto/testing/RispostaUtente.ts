import { RispostaDomanda } from './RispostaDomanda';

export class RispostaUtente {
    Id: number;
    risposta : RispostaDomanda;
    questionScore : number;
    insertDate : Date;
    secondsForAnswering : number;
}