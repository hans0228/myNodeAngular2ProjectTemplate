/// <reference path="../../../../typings/browser.d.ts" />

import {Component} from "angular2/core";
import {HomeService} from "./HomeService";

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

    public Wording = "";
    public AsyncWording = "";

    constructor(private homeSer: HomeService) { }

    showGreetLog(name: string) {

        this.Wording = `Hello, ${name}`;

    }

    async showGreetLogAsync() {

        var wording = await this.homeSer.getNameAsync();
        this.AsyncWording = `Hello, ${wording} async`;

        // console.log("async start...");
        // var dt = new Date();
        // this.AsyncWording = await `Hello, ${wording} ${dt} async`;

    }

}

