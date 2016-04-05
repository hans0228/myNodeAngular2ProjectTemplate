/// <reference path="../../../typings/browser.d.ts" />

import {Component} from 'angular2/core';
@Component({
    selector: 'my-app',
    template: `
        <h1>My First Angular 2 App</h1>
        <button (click)="showGreet('Bibby')">showGreet</button>
    `
})
export class HomeComponent {

    showGreet(name: string) {

        var wording = `Hello, ${name}`;
        console.log(wording);

    }

}