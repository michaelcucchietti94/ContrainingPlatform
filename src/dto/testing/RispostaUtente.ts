import { RispostaDomanda } from './RispostaDomanda';
import { User } from '../User';

export class RispostaUtente {
    Id: number;
    risposta : RispostaDomanda;
    user : User;
    questionScore : number;
    insertDate : Date;
    secondsForAnswering : number;
}