/// <reference path="../../../../typings/index.d.ts" />
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {myRouterComponent} from "./spa/myRouterComponent";

bootstrap(myRouterComponent,[
	ROUTER_PROVIDERS
]);
