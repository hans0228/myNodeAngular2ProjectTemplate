/// <reference path="../../../../../typings/index.d.ts" />
import {Component, Inject, forwardRef} from "@angular/core";

import {AppHelper} from "../../../../shareware/appHelper";

@Component({
    selector: 'my-app',
    template: `
        <h1>spa1</h1>
        <hr />
    `
})
export class SPAComponent {
   
    constructor() { 
        
        AppHelper.consoleWrite("spa","spa test");
        
    }

}

