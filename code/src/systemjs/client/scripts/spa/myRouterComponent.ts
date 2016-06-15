/// <reference path="../../../../../typings/index.d.ts" />
import {Component, Inject} from "@angular/core";
import {ROUTER_DIRECTIVES, Routes} from '@angular/router';

import {AppHelper} from "../../../../shareware/appHelper";

import {page1Component} from "./page1Component";
import {page2Component} from "./page2Component";
import {defaultPage} from "./defaultPage";

@Component({
    selector: 'my-app',
    template: `
    <h1>Component Router</h1>
    <nav>
      <a [routerLink]="['/page1']">page1</a>
      <a [routerLink]="['/page2/defaultsearchvalue']">page2</a>
    </nav>
    <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    { path: '/page1', component: page1Component },
    { path: '/page2/:searchQuery', component: page2Component },
    { path: '*', component: defaultPage }
])

export class myRouterComponent {

    constructor() {

        AppHelper.consoleWrite("spa", "spa test");

    }

}

