/// <reference path="../../../../../typings/browser.d.ts" />
import {Component, Inject, forwardRef} from "@angular/core";
import {HomeService} from "../_requireSystemjs";
import {AppHelper} from "../../../../common/_requireCommon";

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

    constructor( @Inject(forwardRef(() => HomeService)) private homeSer) { }

    showGreetLog(name: string) {

        this.Wording = `Hello, ${name}`;

        //AppHelper.consoleWrite("date:", new Date());

    }

    async showGreetLogAsync() {

        var wording = await this.homeSer.getNameAsync();
        this.AsyncWording = await `Hello, ${wording} async`;;

    }

}

