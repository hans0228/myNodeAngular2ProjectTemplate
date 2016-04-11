/// <reference path="../../../../typings/browser.d.ts" />

import {Component} from "angular2/core";
import {HomeService} from "./HomeService";
import {AppHelper} from "../../../core/appHelper";

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

        AppHelper.consoleWrite("date:", new Date());

    }

    async showGreetLogAsync() {

        var wording = await this.homeSer.getNameAsync();
        this.AsyncWording = await `Hello, ${wording} async`;;

    }

}

