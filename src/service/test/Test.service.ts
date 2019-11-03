import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from 'src/dto/testing/Test';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private serverMapping : string = 'http://localhost:8080/game/';

    private cmd_countTest : string = 'countTest';
    private cmd_countTestLevel : string = 'countTest_level_{level}'
    private cmd_completedByUser : string = 'user_{username}/testDone';
    private cmd_completedByUserLevel : string = 'user_{username}/testDone_level_{level}';
    private cmd_countTestOfUser : string = 'user_{username}/countTestDone';
    private cmd_countTestOfUserLevel : string = 'user_{username}/countTestDone_level_{level}';
    

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
    getTestCompletedBy(username : string) : Observable<Test> {
        return this.http.get<Test>(this.getServerCommand(this.cmd_completedByUser, new KeyField('username', username)));
    }
    getLevelTestCompletedBy(username : string, level : number) : Observable<Test> {
        return this.http.get<Test>(
            this.getServerCommand(
                this.cmd_completedByUserLevel, 
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
        console.log(this.getServerCommand(
            this.cmd_countTestOfUserLevel, 
            new KeyField('username', username), 
            new KeyField('level', level.toString()
            )
        ));
        return this.http.get<Number>(
            this.getServerCommand(
                this.cmd_countTestOfUserLevel, 
                new KeyField('username', username), 
                new KeyField('level', level.toString()
                )
            )
        );
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