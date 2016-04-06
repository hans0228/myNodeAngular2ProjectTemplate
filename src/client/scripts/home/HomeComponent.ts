/// <reference path="../../../../typings/browser.d.ts" />

import {Component} from 'angular2/core';
@Component({
    selector: 'my-app',
    template: `
        <h1>My First Angular 2 App</h1>
        <button (click)="showGreetLog('Bibby')">showGreet</button>
        <br />
        <p>{{Wording}}</p>
    `
})
export class HomeComponent {

    public Wording: string = "";

    showGreetLog(name: string) {

        var wording = `Hello, ${name}`;
        this.Wording = wording;

    }

}