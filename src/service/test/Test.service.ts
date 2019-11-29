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

    private cmd_countTest : string = 'countTest';
    private cmd_countTestLevel : string = 'countTest_level_{level}'
    private cmd_completedByUser : string = 'user_{username}/testDone';
    private cmd_completedByUserLevel : string = 'user_{username}/testDone_level_{level}';
    private cmd_notCompletedByUser : string = 'user_{username}/testNotDone';
    private cmd_notCompletedByUserLevel : string = 'user_{username}/testNotDone_level_{level}';
    private cmd_countTestOfUser : string = 'user_{username}/countTestDone';
    private cmd_countTestOfUserLevel : string = 'user_{username}/countTestDone_level_{level}';

    private cmd_startest : string = 'test/user_{username}/start_test_{idTest}';
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


    countTest() : Observable<Number> {
        return this.http.get<Number>(this.getServerCommand(this.cmd_countTest));
    }
    countLevelTest(level : number) : Observable<Number> {
        return this.http.get<Number>(
            this.getServerCommand(
                this.cmd_countTestLevel,
                new KeyField('level', level.toString()
                )
            )
        );
    }
    getTestCompletedBy(username : string) : Observable<Test[]> {
        return this.http.get<Test[]>(this.getServerCommand(this.cmd_completedByUser, new KeyField('username', username)));
    }
    getLevelTestCompletedBy(username : string, level : number) : Observable<Test[]> {
        return this.http.get<Test[]>(
            this.getServerCommand(
                this.cmd_completedByUserLevel,
                new KeyField('username', username),
                new KeyField('level', level.toString()
                )
            )
        );
    }

    getTestNotCompletedBy(username : string) : Observable<Test[]> {
        return this.http.get<Test[]>(this.getServerCommand(this.cmd_notCompletedByUser, new KeyField('username', username)));
    }
    getLevelTestNotCompletedBy(username : string, level : number) : Observable<Test[]> {
        return this.http.get<Test[]>(
            this.getServerCommand(
                this.cmd_notCompletedByUserLevel,
                new KeyField('username', username),
                new KeyField('level', level.toString()
                )
            )
        );
    }
    countTestCompletedBy(username : string) : Observable<Number> {
        return this.http.get<Number>(this.getServerCommand(this.cmd_countTestOfUser, new KeyField('username', username)));
    }
    countLevelTestCompletedBy(username : string, level : number) : Observable<Number> {
        return this.http.get<Number>(
            this.getServerCommand(
                this.cmd_countTestOfUserLevel,
                new KeyField('username', username),
                new KeyField('level', level.toString()
                )
            )
        );
    }

    startTest(username : string, idTest : number) : any {
        return this.http.get<void>(
            this.getServerCommand(
                this.cmd_startest,
                new KeyField('username', username),
                new KeyField('idTest', idTest.toString())
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
