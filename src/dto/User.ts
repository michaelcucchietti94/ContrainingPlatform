import { Usertype } from './Usertype';

export class User {
    username : String;
    password : String;
    nome : String;
    cognome : String;
    email : String;
    dataNascita : Date;
    livello : number;
    usertype : Usertype;
    firstAccess : Boolean;
}