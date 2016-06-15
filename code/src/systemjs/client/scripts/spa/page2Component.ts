/// <reference path="../../../../../typings/index.d.ts" />
import {Component} from "@angular/core";
import {OnActivate, Router, RouteSegment, RouteTree} from '@angular/router';

import {AppHelper} from "../../../../shareware/appHelper";


@Component({

	templateUrl: "/scripts/systemjs/client/scripts/spa/page2.html"

})

export class page2Component implements OnActivate {

	searchQuery: string;

	constructor(private router: Router) { }

	routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree) {

		this.searchQuery = curr.getParam("searchQuery");
		AppHelper.consoleWrite("searchQuery", this.searchQuery);

	}

	navigateToPage1() {

		this.router.navigate(['/page1']);

	}

}