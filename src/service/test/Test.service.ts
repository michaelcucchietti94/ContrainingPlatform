import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from 'src/dto/testing/Test';
import { DomandaDecorated } from 'src/dto/testing/DomandaDecorated';
import { UserTestScore } from 'src/dto/testing/UserTestScore';
import { RispostaUtente } from 'src/dto/testing/RispostaUtente';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private serverMapping : string = 'http://localhost:8080/game/';


    private cmd_startest : string = 'test/user_{username}/start_test_{category}/lv_{level}';
    private cmd_nextquestion : string = 'test/user_{username}/getNextQuestion';
    private cmd_addresponse : string = 'test/user/addResponse';
    private cmd_endtest : string = 'test/user_{username}/end_test';
    private cmd_hasMoreQuestion : string = 'test/user_{username}/hasMoreQuestion';



    constructor(protected http : HttpClient) {}

    private getServerCommand(command : string, ...keys : KeyField[]) : string {
        keys.forEach(k => {
            command = command.replace('{' + k.key + '}', k.value);
        })
        return this.serverMapping + command;
    }


    

    startTest(username : string, category : string, level : number|string) : any {
        return this.http.get<void>(
            this.getServerCommand(
                this.cmd_startest,
                new KeyField('username', username),
                new KeyField('category', category),
                new KeyField('level', level.toString())
            )
        )
    }

    getNextQuestion(username : string) : Observable<DomandaDecorated> {
        return this.http.get<DomandaDecorated>(
            this.getServerCommand(
                this.cmd_nextquestion,
                new KeyField('username', username)
            )
        )
    }

    addResponse(risposta : RispostaUtente) : any {
        return this.http.post<void>(this.getServerCommand(
            this.cmd_addresponse
        ), risposta);
    }

    endTest(username : string) : Observable<UserTestScore> {
        return this.http.get<UserTestScore>(this.getServerCommand(
            this.cmd_endtest,
            new KeyField('username', username)
        ))
    }

    hasMoreQuestion(username : string) : Observable<Boolean> {
        return this.http.get<Boolean>(this.getServerCommand(
            this.cmd_hasMoreQuestion,
            new KeyField('username', username)
        ));
    }
}

class KeyField {
    key : string;
    value : string;

    constructor(key : string, value : string) {
        this.key = key;
        this.value = value;
    }
}
