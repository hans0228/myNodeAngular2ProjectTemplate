/// <reference path="../../../../../typings/index.d.ts" />
import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {AppHelper} from "../../../../shareware/appHelper";

@Component({

	template: `
	<h2>Page1</h2>
	<p>date: {{date}}</p>
	searchQuery: <input type="text" [(ngModel)]="searchQuery" /> 
	<button (click)="search()">search</button>
	<hr />
	{{searchQuery}}
	`

})

export class page1Component {

	date: Date;
	searchQuery: string
	constructor(private router: Router) {
		this.date = new Date();
	}

	search() {

		this.router.navigate(["/page2", this.searchQuery])

	}

}