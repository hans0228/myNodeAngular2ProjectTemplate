/// <reference path="../../../../../typings/index.d.ts" />
import {Component, Inject, forwardRef} from "@angular/core";

import {HomeService} from "../../../../systemjs/client/scripts/home/HomeService";
import {AppHelper} from "../../../../shareware/appHelper";

@Component({
    selector: 'my-app',
    providers: [HomeService],
    template: `
        <h1>My First Angular 2 App</h1>
        <button (click)="showGreetLog('Bibby')">showGreet</button>
        <br />
        <p>sync: {{Wording}}</p>
        <hr />
        <button (click)="showGreetLogAsync('Bibby')">showGreetAsync</button>
        <br />
        <p>async: {{AsyncWording}}</p>
    `
})
export class HomeComponent {

    public Wording: string = "";
    public AsyncWording: string = "";

    constructor(private homeSer: HomeService) { }

    showGreetLog(name: string) {

        this.Wording = `Hello, ${name}`;

        //AppHelper.consoleWrite("date:", new Date());

    }

    async showGreetLogAsync() {

        var wording = await this.homeSer.getNameAsync();
        this.AsyncWording = await `Hello, ${wording} async`;;

    }

}

